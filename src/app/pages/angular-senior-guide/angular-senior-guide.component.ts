import { DOCUMENT, isPlatformBrowser } from '@angular/common';
import {
  DestroyRef,
  PLATFORM_ID,
  Component,
  afterNextRender,
  computed,
  inject,
  signal,
} from '@angular/core';
import { RouterLink } from '@angular/router';
import { LanguageService } from '../../i18n/language.service';
import { LanguageSwitcherComponent } from '../../shared/components/language-switcher/language-switcher.component';
import {
  PRACTICE_CASES,
  RAPID_QUESTIONS,
  STUDY_GROUPS,
  STUDY_REFERENCES,
  STUDY_TOPICS,
  StudyTopic,
} from './angular-senior-guide.data';

type CollectionId = 'all' | 'rapid' | 'practice' | string;

type TheorySegmentKind = 'text' | 'important' | 'code' | 'match';

type ReviewLevel = 'review' | 'practice' | 'confident';

interface TopicReview {
  readonly level: ReviewLevel;
  readonly reviewedAt: string;
}

interface TheorySegment {
  readonly text: string;
  readonly kind: TheorySegmentKind;
}

const IMPORTANT_THEORY_TERMS = [
  'Core Web Vitals',
  'Dependency Injection',
  'discriminated union',
  'progressive enhancement',
  'server state',
  'client state',
  'change detection',
  'container queries',
  'stacking context',
  'event loop',
  'main thread',
  'Temporal Dead Zone',
  'type guard',
  'lazy loading',
  'content projection',
  'route guard',
  'feature flag',
  'correlation ID',
  'memory leak',
  'contract test',
  'source maps',
  'tree shaking',
  'backpressure',
  'optimistic update',
  'critical rendering path',
  'Angular',
  'TypeScript',
  'JavaScript',
  'Signals',
  'signal',
  'computed',
  'effect',
  'OnPush',
  'zoneless',
  'ZoneJS',
  'RxJS',
  'Observable',
  'Promise',
  'microtask',
  'macrotask',
  'closure',
  'hoisting',
  'scope',
  'coerción',
  'prototipo',
  'inmutabilidad',
  'generic',
  'exhaustividad',
  'DOM',
  'CSSOM',
  'CORS',
  'same-origin',
  'HTML semántico',
  'accesibilidad',
  'ARIA',
  'WCAG',
  'cascade',
  'specificity',
  'Flexbox',
  'Grid',
  'responsive',
  'layout',
  'reflow',
  'standalone',
  'injector',
  'provider',
  'subscription',
  'cancelación',
  'concurrencia',
  'NgRx',
  'Router',
  'resolver',
  'Reactive Forms',
  'ControlValueAccessor',
  'validación',
  'HttpClient',
  'interceptor',
  'caché',
  'idempotencia',
  'SOLID',
  'SSR',
  'SSG',
  'hidratación',
  'hydration',
  'rendering',
  'performance',
  'LCP',
  'CLS',
  'INP',
  'testing',
  'XSS',
  'CSRF',
  'CSP',
  'Trusted Types',
  'CI/CD',
  'observabilidad',
  'telemetría',
  'system design',
  'trade-off',
  'arquitectura',
  'ownership',
  'ADR',
] as const;

const IMPORTANT_THEORY_PATTERN = new RegExp(
  `((?<![\\p{L}\\p{N}_])(?:${[...IMPORTANT_THEORY_TERMS]
    .sort((first, second) => second.length - first.length)
    .map(term => term.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'))
    .join('|')})(?:s)?(?![\\p{L}\\p{N}_]))`,
  'giu'
);

@Component({
  selector: 'app-angular-senior-guide',
  standalone: true,
  imports: [RouterLink, LanguageSwitcherComponent],
  templateUrl: './angular-senior-guide.component.html',
  styleUrl: './angular-senior-guide.component.scss',
})
export class AngularSeniorGuideComponent {
  private readonly platformId = inject(PLATFORM_ID);
  private readonly document = inject(DOCUMENT);
  private readonly destroyRef = inject(DestroyRef);
  protected readonly languageService = inject(LanguageService);

  protected portfolioPath(): string {
    return `/${this.languageService.language()}`;
  }
  private readonly storageKey = 'angular-senior-guide-completed';
  private readonly collapsedStorageKey = 'angular-senior-guide-collapsed';
  private readonly reviewStorageKey = 'angular-senior-guide-review-levels';
  private readonly theorySegmentCache = new Map<
    string,
    readonly TheorySegment[]
  >();
  private observerRefreshTimer?: number;
  private scrollSpyFrame?: number;
  private readonly handleViewportChange = (): void => {
    const browserWindow = this.document.defaultView;
    if (!browserWindow || this.scrollSpyFrame !== undefined) {
      return;
    }
    this.scrollSpyFrame = browserWindow.requestAnimationFrame(() => {
      this.scrollSpyFrame = undefined;
      this.syncNavigationWithScroll();
    });
  };

  protected readonly groups = STUDY_GROUPS;
  protected readonly topics = STUDY_TOPICS;
  protected readonly navigationGroups = this.groups.map(group => ({
    ...group,
    topics: this.topics.filter(topic => topic.groupId === group.id),
  }));
  protected readonly references = STUDY_REFERENCES;
  protected readonly query = signal('');
  protected readonly selectedCollection = signal<CollectionId>('all');
  protected readonly activeSectionId = signal<string | null>(null);
  protected readonly activeTopicId = signal<string | null>(null);
  protected readonly mobileNavigationOpen = signal(false);
  protected readonly completedTopicIds = signal<ReadonlySet<string>>(new Set());
  protected readonly collapsedTopicIds = signal<ReadonlySet<string>>(new Set());
  protected readonly topicReviews = signal<
    Readonly<Record<string, TopicReview>>
  >({});

  protected readonly activeNavigationLabel = computed(() => {
    const activeTopic = this.topics.find(
      topic => topic.id === this.activeTopicId()
    );
    if (activeTopic) {
      return `${activeTopic.number} · ${this.translate(activeTopic.title)}`;
    }

    const sectionId = this.activeSectionId();
    const activeGroup = this.groups.find(group => group.id === sectionId);
    if (activeGroup) {
      return this.translate(activeGroup.title);
    }
    if (sectionId === 'rapid') {
      return this.translate('Banco rápido');
    }
    if (sectionId === 'practice') {
      return this.translate('Casos prácticos');
    }
    return this.translate('Contenido completo');
  });

  protected readonly theoryCount = this.topics.reduce(
    (total, topic) => total + topic.theory.length,
    0
  );
  protected readonly questionCount =
    this.topics.reduce((total, topic) => total + topic.questions.length, 0) +
    RAPID_QUESTIONS.length;

  protected readonly completedCount = computed(
    () => this.completedTopicIds().size
  );
  protected readonly progressPercentage = computed(() =>
    Math.round((this.completedCount() / this.topics.length) * 100)
  );

  protected readonly visibleSections = computed(() => {
    const selected = this.selectedCollection();
    if (selected === 'rapid' || selected === 'practice') {
      return [];
    }

    const normalizedQuery = this.normalize(this.query());
    return this.groups
      .filter(group => selected === 'all' || group.id === selected)
      .map(group => ({
        ...group,
        topics: this.topics.filter(
          topic =>
            topic.groupId === group.id &&
            this.topicMatches(topic, normalizedQuery)
        ),
      }))
      .filter(section => section.topics.length > 0);
  });

  protected readonly visibleRapidQuestions = computed(() => {
    const selected = this.selectedCollection();
    if (selected !== 'all' && selected !== 'rapid') {
      return [];
    }
    const normalizedQuery = this.normalize(this.query());
    const terms = this.queryTerms(normalizedQuery);
    return RAPID_QUESTIONS.filter(item =>
      this.matchesTerms(
        `${item.question} ${item.answer} ${this.translate(item.question)} ${this.translate(item.answer)}`,
        terms
      )
    );
  });

  protected readonly visiblePracticeCases = computed(() => {
    const selected = this.selectedCollection();
    if (selected !== 'all' && selected !== 'practice') {
      return [];
    }
    const normalizedQuery = this.normalize(this.query());
    const terms = this.queryTerms(normalizedQuery);
    return PRACTICE_CASES.filter(item =>
      this.matchesTerms(
        `${item.title} ${item.brief} ${this.translate(item.title)} ${this.translate(item.brief)}`,
        terms
      )
    );
  });

  protected readonly hasResults = computed(
    () =>
      this.visibleSections().length > 0 ||
      this.visibleRapidQuestions().length > 0 ||
      this.visiblePracticeCases().length > 0
  );

  constructor() {
    afterNextRender(() => {
      this.restoreProgress();
      this.restoreCollapsedTopics();
      this.restoreTopicReviews();
      this.setupScrollSpy();
    });

    this.destroyRef.onDestroy(() => {
      const browserWindow = this.document.defaultView;
      if (browserWindow) {
        browserWindow.removeEventListener('scroll', this.handleViewportChange);
        browserWindow.removeEventListener('resize', this.handleViewportChange);
        if (this.observerRefreshTimer !== undefined) {
          browserWindow.clearTimeout(this.observerRefreshTimer);
        }
        if (this.scrollSpyFrame !== undefined) {
          browserWindow.cancelAnimationFrame(this.scrollSpyFrame);
        }
      }
    });
  }

  protected updateQuery(event: Event): void {
    this.query.set((event.target as HTMLInputElement).value);
    this.theorySegmentCache.clear();
    this.activeSectionId.set(null);
    this.activeTopicId.set(null);
    this.scheduleScrollSpyRefresh();
  }

  protected selectCollection(collection: CollectionId): void {
    this.query.set('');
    this.selectedCollection.set('all');
    this.activeSectionId.set(collection === 'all' ? null : collection);
    this.activeTopicId.set(null);
    this.mobileNavigationOpen.set(false);
    this.scheduleScrollSpyRefresh();
    if (isPlatformBrowser(this.platformId)) {
      const targetId =
        collection === 'all'
          ? 'study-content'
          : collection === 'rapid'
            ? 'banco-rapido'
            : collection === 'practice'
              ? 'casos-practicos'
              : collection;
      setTimeout(() => {
        this.document.getElementById(targetId)?.scrollIntoView({
          behavior: 'instant' as ScrollBehavior,
          block: 'start',
        });
      });
    }
  }

  protected navigateToTopic(event: Event, topic: StudyTopic): void {
    event.preventDefault();
    this.query.set('');
    this.selectedCollection.set('all');
    this.activeSectionId.set(topic.groupId);
    this.activeTopicId.set(topic.id);
    this.mobileNavigationOpen.set(false);
    this.setTopicCollapsed(topic.id, false);
    this.scheduleScrollSpyRefresh();

    if (isPlatformBrowser(this.platformId)) {
      setTimeout(() => {
        this.document.getElementById(topic.id)?.scrollIntoView({
          behavior: 'instant' as ScrollBehavior,
          block: 'start',
        });
      });
    }
  }

  protected clearFilters(): void {
    this.query.set('');
    this.selectedCollection.set('all');
    this.activeSectionId.set(null);
    this.activeTopicId.set(null);
    this.scheduleScrollSpyRefresh();
  }

  protected toggleMobileNavigation(): void {
    this.mobileNavigationOpen.update(isOpen => !isOpen);
  }

  protected translate(value: string): string {
    return this.languageService.translate(value);
  }

  protected theorySegments(text: string): readonly TheorySegment[] {
    const queryKey = this.normalize(this.query());
    const cacheKey = `${queryKey}::${text}`;
    const cached = this.theorySegmentCache.get(cacheKey);
    if (cached) {
      return cached;
    }

    const segments: TheorySegment[] = [];
    for (const part of text.split(/(`[^`]+`)/g)) {
      if (!part) {
        continue;
      }
      if (part.startsWith('`') && part.endsWith('`')) {
        segments.push({ text: part.slice(1, -1), kind: 'code' });
        continue;
      }

      part.split(IMPORTANT_THEORY_PATTERN).forEach((segment, index) => {
        if (segment) {
          segments.push({
            text: segment,
            kind: index % 2 === 1 ? 'important' : 'text',
          });
        }
      });
    }

    const highlighted = this.highlightQueryMatches(segments);
    this.theorySegmentCache.set(cacheKey, highlighted);
    return highlighted;
  }

  protected visibleTheorySections(topic: StudyTopic) {
    const query = this.queryTerms();
    if (
      query.length === 0 ||
      this.matchesTerms(`${topic.title} ${topic.intro}`, query)
    ) {
      return topic.theorySections;
    }
    return topic.theorySections
      .map(section => ({
        ...section,
        items: section.items.filter(item =>
          this.matchesTerms(`${item} ${this.translate(item)}`, query)
        ),
      }))
      .filter(section => section.items.length > 0);
  }

  protected visibleQuestions(topic: StudyTopic) {
    const query = this.queryTerms();
    if (
      query.length === 0 ||
      this.matchesTerms(`${topic.title} ${topic.intro}`, query)
    ) {
      return topic.questions;
    }
    return topic.questions.filter(item =>
      this.matchesTerms(
        `${item.question} ${item.answer} ${this.translate(item.question)} ${this.translate(item.answer)}`,
        query
      )
    );
  }

  protected isCompleted(topicId: string): boolean {
    return this.completedTopicIds().has(topicId);
  }

  protected isTopicCollapsed(topicId: string): boolean {
    return this.collapsedTopicIds().has(topicId);
  }

  protected toggleTopicCollapsed(topicId: string): void {
    this.setTopicCollapsed(topicId, !this.isTopicCollapsed(topicId));
  }

  protected toggleCompleted(topicId: string): void {
    const updated = new Set(this.completedTopicIds());
    if (updated.has(topicId)) {
      updated.delete(topicId);
    } else {
      updated.add(topicId);
      this.setTopicCollapsed(topicId, true);
    }
    this.completedTopicIds.set(updated);
    this.persistProgress(updated);
  }

  protected reviewLevel(topicId: string): ReviewLevel | null {
    return this.topicReviews()[topicId]?.level ?? null;
  }

  protected reviewDate(topicId: string): string | null {
    const value = this.topicReviews()[topicId]?.reviewedAt;
    if (!value) {
      return null;
    }
    return new Intl.DateTimeFormat(
      this.languageService.language() === 'es' ? 'es-AR' : 'en-US',
      { day: '2-digit', month: 'short', year: 'numeric' }
    ).format(new Date(value));
  }

  protected setReviewLevel(topicId: string, level: ReviewLevel): void {
    const updated = {
      ...this.topicReviews(),
      [topicId]: { level, reviewedAt: new Date().toISOString() },
    } satisfies Record<string, TopicReview>;
    this.topicReviews.set(updated);
    this.persistTopicReviews(updated);
  }

  protected handleAnswerToggle(event: Event): void {
    const details = event.currentTarget as HTMLDetailsElement;
    if (!details.open || !isPlatformBrowser(this.platformId)) {
      return;
    }
    this.document.defaultView?.requestAnimationFrame(() => {
      const minimumTop = this.document.defaultView?.matchMedia(
        '(min-width: 1024px)'
      ).matches
        ? 112
        : 176;
      const top = details.getBoundingClientRect().top;
      if (top < minimumTop) {
        this.document.defaultView?.scrollBy({
          top: top - minimumTop,
          behavior: 'smooth',
        });
      }
    });
  }

  private topicMatches(topic: StudyTopic, normalizedQuery: string): boolean {
    if (!normalizedQuery) {
      return true;
    }
    const searchableText = [
      topic.title,
      topic.intro,
      ...topic.theory,
      ...topic.questions.flatMap(item => [item.question, item.answer]),
      this.translate(topic.title),
      this.translate(topic.intro),
      ...topic.theory.map(item => this.translate(item)),
      ...topic.questions.flatMap(item => [
        this.translate(item.question),
        this.translate(item.answer),
      ]),
    ].join(' ');
    return this.matchesTerms(searchableText, this.queryTerms(normalizedQuery));
  }

  private normalize(value: string): string {
    return value
      .normalize('NFD')
      .replace(/[\u0300-\u036f]/g, '')
      .toLowerCase()
      .replace(/\b(?:vs\.?|versus)\b/g, ' ')
      .replace(/\b(?:o|u)\b/g, ' ')
      .replace(/[^a-z0-9+#.]+/g, ' ')
      .replace(/\s+/g, ' ')
      .trim();
  }

  private queryTerms(
    normalizedQuery = this.normalize(this.query())
  ): readonly string[] {
    return normalizedQuery.split(' ').filter(term => term.length > 1);
  }

  private matchesTerms(value: string, terms: readonly string[]): boolean {
    if (terms.length === 0) {
      return true;
    }
    const normalized = this.normalize(value);
    return terms.every(term => normalized.includes(term));
  }

  private highlightQueryMatches(
    segments: readonly TheorySegment[]
  ): readonly TheorySegment[] {
    const terms = this.queryTerms();
    if (terms.length === 0) {
      return segments;
    }
    const pattern = new RegExp(
      `(${[...terms]
        .sort((first, second) => second.length - first.length)
        .map(term => term.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'))
        .join('|')})`,
      'giu'
    );
    return segments.flatMap(segment => {
      if (segment.kind === 'code') {
        return [segment];
      }
      return segment.text
        .split(pattern)
        .filter(Boolean)
        .map(part => ({
          text: part,
          kind: terms.some(term => this.normalize(part) === term)
            ? ('match' as const)
            : segment.kind,
        }));
    });
  }

  private restoreProgress(): void {
    if (!isPlatformBrowser(this.platformId)) {
      return;
    }
    try {
      const stored = localStorage.getItem(this.storageKey);
      const parsed: unknown = stored ? JSON.parse(stored) : [];
      if (Array.isArray(parsed)) {
        const validIds = new Set(this.topics.map(topic => topic.id));
        this.completedTopicIds.set(
          new Set(
            parsed.filter(
              (id): id is string => typeof id === 'string' && validIds.has(id)
            )
          )
        );
      }
    } catch {
      this.completedTopicIds.set(new Set());
    }
  }

  private persistProgress(topicIds: ReadonlySet<string>): void {
    if (!isPlatformBrowser(this.platformId)) {
      return;
    }
    localStorage.setItem(this.storageKey, JSON.stringify([...topicIds]));
  }

  private restoreTopicReviews(): void {
    if (!isPlatformBrowser(this.platformId)) {
      return;
    }
    try {
      const parsed: unknown = JSON.parse(
        localStorage.getItem(this.reviewStorageKey) ?? '{}'
      );
      if (parsed && typeof parsed === 'object' && !Array.isArray(parsed)) {
        this.topicReviews.set(parsed as Readonly<Record<string, TopicReview>>);
      }
    } catch {
      this.topicReviews.set({});
    }
  }

  private persistTopicReviews(
    reviews: Readonly<Record<string, TopicReview>>
  ): void {
    if (isPlatformBrowser(this.platformId)) {
      localStorage.setItem(this.reviewStorageKey, JSON.stringify(reviews));
    }
  }

  private restoreCollapsedTopics(): void {
    if (!isPlatformBrowser(this.platformId)) {
      return;
    }
    const validIds = new Set(this.topics.map(topic => topic.id));
    try {
      const stored = localStorage.getItem(this.collapsedStorageKey);
      if (stored === null) {
        this.collapsedTopicIds.set(new Set(this.completedTopicIds()));
        this.persistCollapsedTopics(this.collapsedTopicIds());
        return;
      }
      const parsed: unknown = JSON.parse(stored);
      this.collapsedTopicIds.set(
        new Set(
          Array.isArray(parsed)
            ? parsed.filter(
                (id): id is string => typeof id === 'string' && validIds.has(id)
              )
            : []
        )
      );
    } catch {
      this.collapsedTopicIds.set(new Set(this.completedTopicIds()));
    }
  }

  private setTopicCollapsed(topicId: string, collapsed: boolean): void {
    const updated = new Set(this.collapsedTopicIds());
    if (collapsed) {
      updated.add(topicId);
    } else {
      updated.delete(topicId);
    }
    this.collapsedTopicIds.set(updated);
    this.persistCollapsedTopics(updated);
    this.scheduleScrollSpyRefresh();
  }

  private persistCollapsedTopics(topicIds: ReadonlySet<string>): void {
    if (!isPlatformBrowser(this.platformId)) {
      return;
    }
    localStorage.setItem(
      this.collapsedStorageKey,
      JSON.stringify([...topicIds])
    );
  }

  private setupScrollSpy(): void {
    const browserWindow = this.document.defaultView;
    if (!isPlatformBrowser(this.platformId) || !browserWindow) {
      return;
    }
    browserWindow.addEventListener('scroll', this.handleViewportChange, {
      passive: true,
    });
    browserWindow.addEventListener('resize', this.handleViewportChange, {
      passive: true,
    });
    this.refreshScrollSpyTargets();
  }

  private activateNavigationEntry(element: HTMLElement): void {
    const sectionId = element.dataset['studySectionId'];
    const topicId = element.dataset['studyTopicId'] ?? null;
    if (!sectionId) {
      return;
    }

    const changed =
      this.activeSectionId() !== sectionId || this.activeTopicId() !== topicId;
    if (!changed) {
      return;
    }

    this.activeSectionId.set(sectionId);
    this.activeTopicId.set(topicId);
    if (topicId) {
      this.keepActiveLinkVisible(topicId);
    }
  }

  private keepActiveLinkVisible(topicId: string): void {
    const browserWindow = this.document.defaultView;
    if (!browserWindow?.matchMedia('(min-width: 1024px)').matches) {
      return;
    }

    browserWindow.requestAnimationFrame(() => {
      const sidebar = this.document.querySelector<HTMLElement>(
        '[data-testid="guide-sidebar"]'
      );
      const activeLink = this.document.querySelector<HTMLElement>(
        `[data-study-topic-link="${topicId}"]`
      );
      if (!sidebar || !activeLink) {
        return;
      }

      const sidebarBounds = sidebar.getBoundingClientRect();
      const linkBounds = activeLink.getBoundingClientRect();
      const isOutsideVisibleArea =
        linkBounds.top < sidebarBounds.top + 16 ||
        linkBounds.bottom > sidebarBounds.bottom - 16;
      if (isOutsideVisibleArea) {
        sidebar.scrollTo({
          top:
            sidebar.scrollTop +
            linkBounds.top -
            sidebarBounds.top -
            sidebar.clientHeight / 2,
          behavior: 'smooth',
        });
      }
    });
  }

  private scheduleScrollSpyRefresh(): void {
    const browserWindow = this.document.defaultView;
    if (!browserWindow) {
      return;
    }
    if (this.observerRefreshTimer !== undefined) {
      browserWindow.clearTimeout(this.observerRefreshTimer);
    }
    this.observerRefreshTimer = browserWindow.setTimeout(
      () => this.refreshScrollSpyTargets(),
      0
    );
  }

  private refreshScrollSpyTargets(): void {
    const browserWindow = this.document.defaultView;
    if (!browserWindow) {
      return;
    }
    browserWindow.requestAnimationFrame(() => this.syncNavigationWithScroll());
  }

  private syncNavigationWithScroll(): void {
    const browserWindow = this.document.defaultView;
    if (!browserWindow) {
      return;
    }

    const trackedElements = [
      ...this.document.querySelectorAll<HTMLElement>(
        '[data-study-navigation-id]'
      ),
    ];
    if (trackedElements.length === 0) {
      return;
    }

    const activationLine = browserWindow.matchMedia('(min-width: 1024px)')
      .matches
      ? 120
      : 196;
    let activeElement: HTMLElement | undefined;

    for (const element of trackedElements) {
      const top = element.getBoundingClientRect().top;
      if (top <= activationLine) {
        activeElement = element;
        continue;
      }
      if (!activeElement && top < browserWindow.innerHeight * 0.58) {
        activeElement = element;
      }
      break;
    }

    if (activeElement) {
      this.activateNavigationEntry(activeElement);
    } else {
      this.activeSectionId.set(null);
      this.activeTopicId.set(null);
    }
  }
}
