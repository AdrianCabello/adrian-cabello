import { DOCUMENT, NgClass, isPlatformBrowser } from '@angular/common';
import {
  DestroyRef,
  PLATFORM_ID,
  ChangeDetectorRef,
  Component,
  afterNextRender,
  computed,
  inject,
  signal,
} from '@angular/core';
import { RouterLink } from '@angular/router';
import { LanguageService } from '../../i18n/language.service';
import { LanguageSwitcherComponent } from '../../shared/components/language-switcher/language-switcher.component';
import { GuideShareService } from '../../services/guide-share.service';
import { CodeChallengePrepComponent } from './code-challenge-prep.component';
import { PomodoroTimerComponent } from './pomodoro-timer.component';
import {
  CODE_CHALLENGE_DRILLS,
  PRACTICE_CASES,
  STUDY_GROUPS,
  STUDY_REFERENCES,
  STUDY_TOPICS,
  StudyTopic,
} from './angular-senior-guide.data';

type CollectionId = 'all' | 'practice' | string;

type TheorySegmentKind = 'text' | 'important' | 'code' | 'match';

type ReviewLevel = 'review' | 'practice' | 'confident';

interface TopicReview {
  readonly level: ReviewLevel;
  readonly reviewedAt: string;
}

interface TopicAudio {
  readonly src: string;
  readonly duration: string;
  readonly language: string;
}

interface LifecycleInitializationStep {
  readonly label: string;
  readonly detail: string;
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
  'LLM',
  'Transformer',
  'tokens',
  'context window',
  'prompt',
  'Structured Outputs',
  'embeddings',
  'RAG',
  'vector search',
  'reranking',
  'tool calling',
  'workflow',
  'agent',
  'MCP',
  'skills',
  'plugins',
  'automatización',
  'evals',
  'prompt injection',
  'human-in-the-loop',
  'guardrails',
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
  imports: [
    RouterLink,
    NgClass,
    LanguageSwitcherComponent,
    CodeChallengePrepComponent,
    PomodoroTimerComponent,
  ],
  templateUrl: './angular-senior-guide.component.html',
  styleUrl: './angular-senior-guide.component.scss',
})
export class AngularSeniorGuideComponent {
  private readonly platformId = inject(PLATFORM_ID);
  private readonly document = inject(DOCUMENT);
  private readonly destroyRef = inject(DestroyRef);
  private readonly changeDetectorRef = inject(ChangeDetectorRef);
  private readonly guideShareService = inject(GuideShareService);
  protected readonly languageService = inject(LanguageService);

  protected portfolioPath(): string {
    return `/${this.languageService.language()}`;
  }
  private readonly storageKey = 'angular-senior-guide-completed';
  private readonly collapsedStorageKey = 'angular-senior-guide-collapsed';
  private readonly reviewStorageKey = 'angular-senior-guide-review-levels';
  private readonly audioRateStorageKey = 'angular-senior-guide-audio-rate';
  private readonly shareCountStorageKey = 'angular-senior-guide-share-count';
  private readonly theorySegmentCache = new Map<
    string,
    readonly TheorySegment[]
  >();
  private observerRefreshTimer?: number;
  private scrollSpyFrame?: number;
  private restoringLocationHash = false;
  private shareRecordedDuringCurrentVisit = false;
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
  protected readonly codeChallengeNavigation = CODE_CHALLENGE_DRILLS;
  protected readonly topicAudioById: Readonly<Record<string, TopicAudio>> = {
    'change-detection-signals-y-zoneless': {
      src: './assets/audio/angular-senior/change-detection-signals-zoneless.mp3',
      duration: '08:26',
      language: 'Español',
    },
  };
  protected readonly lifecycleInitializationSteps: readonly LifecycleInitializationStep[] =
    [
      {
        label: 'constructor()',
        detail:
          'Angular crea la instancia y resuelve la inyección de dependencias.',
      },
      {
        label: 'Asignación de inputs',
        detail:
          'Angular entrega los valores iniciales recibidos desde el padre.',
      },
      {
        label: 'ngOnChanges',
        detail:
          'Recibe el primer SimpleChanges antes de inicializar el componente.',
      },
      {
        label: 'ngOnInit',
        detail:
          'Ejecuta una vez la inicialización que necesita los inputs listos.',
      },
      {
        label: 'ngDoCheck',
        detail: 'Permite una comprobación manual durante el primer recorrido.',
      },
      {
        label: 'Content hooks',
        detail: 'ngAfterContentInit y luego ngAfterContentChecked.',
      },
      {
        label: 'View hooks',
        detail: 'ngAfterViewInit y luego ngAfterViewChecked.',
      },
      {
        label: 'Render callbacks',
        detail: 'afterNextRender y afterEveryRender, sólo en el navegador.',
      },
    ];
  protected readonly lifecycleSubsequentChecks =
    'ngOnChanges (si cambian inputs) → ngDoCheck → ngAfterContentChecked → ngAfterViewChecked → afterEveryRender';
  protected readonly query = signal('');
  protected readonly selectedCollection = signal<CollectionId>('all');
  protected readonly activeSectionId = signal<string | null>(null);
  protected readonly activeTopicId = signal<string | null>(null);
  protected readonly mobileNavigationOpen = signal(false);
  protected readonly copiedPracticeCaseId = signal<string | null>(null);
  protected readonly completedTopicIds = signal<ReadonlySet<string>>(new Set());
  protected readonly collapsedTopicIds = signal<ReadonlySet<string>>(new Set());
  protected readonly topicReviews = signal<
    Readonly<Record<string, TopicReview>>
  >({});
  protected readonly audioPlaybackRate = signal(1);
  protected readonly audioPlaybackRates = [1, 1.5, 2] as const;
  protected readonly shareCount = signal(0);
  protected readonly linkedInShareUrl = computed(() => {
    const guideUrl = new URL(
      `/${this.languageService.language()}/angular-senior`,
      'https://adriancabello.dev'
    );
    guideUrl.searchParams.set('utm_source', 'linkedin');
    guideUrl.searchParams.set('utm_medium', 'social');
    guideUrl.searchParams.set('utm_campaign', 'angular_senior_guide');

    const shareUrl = new URL('https://www.linkedin.com/sharing/share-offsite/');
    shareUrl.searchParams.set('url', guideUrl.toString());
    return shareUrl.toString();
  });

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
    if (sectionId === 'practice') {
      return this.translate('Casos prácticos');
    }
    return this.translate('Contenido completo');
  });

  protected readonly theoryCount = this.topics.reduce(
    (total, topic) => total + topic.theory.length,
    0
  );
  protected readonly questionCount = this.topics.reduce(
    (total, topic) => total + topic.questions.length,
    0
  );

  protected readonly completedCount = computed(
    () => this.completedTopicIds().size
  );
  protected readonly progressPercentage = computed(() =>
    Math.round((this.completedCount() / this.topics.length) * 100)
  );

  protected readonly visibleSections = computed(() => {
    const selected = this.selectedCollection();
    if (selected === 'practice') {
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

  protected readonly visiblePracticeCases = computed(() => {
    const selected = this.selectedCollection();
    if (selected !== 'all' && selected !== 'practice') {
      return [];
    }
    const normalizedQuery = this.normalize(this.query());
    const terms = this.queryTerms(normalizedQuery);
    return PRACTICE_CASES.filter(item =>
      this.matchesTerms(
        `${item.title} ${item.brief} ${item.approach} ${item.checks.join(' ')} ${this.translate(item.title)} ${this.translate(item.brief)} ${this.translate(item.approach)}`,
        terms
      )
    );
  });

  protected readonly hasResults = computed(
    () =>
      this.visibleSections().length > 0 ||
      this.visiblePracticeCases().length > 0
  );

  constructor() {
    afterNextRender(() => {
      this.restoreProgress();
      this.restoreCollapsedTopics();
      this.restoreTopicReviews();
      this.restoreAudioPlaybackRate();
      this.document.defaultView?.setTimeout(() => this.loadShareCount());
      this.restoreLocationFromHash();
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
          : collection === 'practice'
            ? 'casos-practicos'
            : collection;
      this.replaceLocationHash(targetId);
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
      this.replaceLocationHash(topic.id);
      setTimeout(() => {
        this.document.getElementById(topic.id)?.scrollIntoView({
          behavior: 'instant' as ScrollBehavior,
          block: 'start',
        });
      });
    }
  }

  protected navigateToCodeChallenge(event: Event, challengeId: string): void {
    event.preventDefault();
    const targetId = `code-challenge-${challengeId}`;
    this.query.set('');
    this.selectedCollection.set('practice');
    this.activeSectionId.set('practice');
    this.activeTopicId.set(targetId);
    this.mobileNavigationOpen.set(false);
    this.scheduleScrollSpyRefresh();

    if (isPlatformBrowser(this.platformId)) {
      this.replaceLocationHash(targetId);
      setTimeout(() => {
        const target = this.document.getElementById(targetId);
        if (target instanceof HTMLDetailsElement) {
          target.open = true;
        }
        target?.scrollIntoView({
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

  protected topicAudio(topicId: string): TopicAudio | null {
    return this.topicAudioById[topicId] ?? null;
  }

  protected setAudioPlaybackRate(
    rate: number,
    audioElement: HTMLAudioElement
  ): void {
    if (!this.audioPlaybackRates.includes(rate as 1 | 1.5 | 2)) {
      return;
    }
    this.audioPlaybackRate.set(rate);
    audioElement.playbackRate = rate;
    if (isPlatformBrowser(this.platformId)) {
      this.document.defaultView?.localStorage.setItem(
        this.audioRateStorageKey,
        rate.toString()
      );
    }
  }

  protected applyAudioPlaybackRate(event: Event): void {
    (event.currentTarget as HTMLAudioElement).playbackRate =
      this.audioPlaybackRate();
  }

  protected recordGuideShare(): void {
    if (!isPlatformBrowser(this.platformId)) {
      return;
    }
    this.shareRecordedDuringCurrentVisit = true;
    const updatedCount = this.shareCount() + 1;
    this.shareCount.set(updatedCount);
    this.document.defaultView?.localStorage.setItem(
      this.shareCountStorageKey,
      updatedCount.toString()
    );
    this.guideShareService.incrementShareCount().subscribe(globalCount => {
      if (globalCount !== null) {
        this.setShareCount(globalCount);
      }
    });
  }

  protected async copyPracticeCode(
    caseId: string,
    code: string
  ): Promise<void> {
    if (!isPlatformBrowser(this.platformId)) {
      return;
    }
    await this.document.defaultView?.navigator.clipboard.writeText(code);
    this.copiedPracticeCaseId.set(caseId);
    this.document.defaultView?.setTimeout(() => {
      if (this.copiedPracticeCaseId() === caseId) {
        this.copiedPracticeCaseId.set(null);
      }
    }, 1800);
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
        examples: section.examples?.filter(example =>
          this.matchesTerms(
            `${example.title} ${example.description} ${example.code} ${this.translate(example.title)} ${this.translate(example.description)}`,
            query
          )
        ),
      }))
      .filter(
        section => section.items.length > 0 || Boolean(section.examples?.length)
      );
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
      this.advanceToNextTopic(topicId);
    }
    this.completedTopicIds.set(updated);
    this.persistProgress(updated);
  }

  private advanceToNextTopic(topicId: string): void {
    if (!isPlatformBrowser(this.platformId)) {
      return;
    }

    const visibleTopics = this.visibleSections().flatMap(
      section => section.topics
    );
    const currentIndex = visibleTopics.findIndex(topic => topic.id === topicId);
    const nextTopic = visibleTopics[currentIndex + 1];
    const nextTargetId =
      nextTopic?.id ??
      (this.visiblePracticeCases().length > 0 ? 'casos-practicos' : null);

    if (!nextTargetId) {
      return;
    }

    if (nextTopic) {
      this.setTopicCollapsed(nextTopic.id, false);
      this.activeSectionId.set(nextTopic.groupId);
      this.activeTopicId.set(nextTopic.id);
    } else {
      this.activeSectionId.set('practice');
      this.activeTopicId.set(null);
    }

    this.document.defaultView?.requestAnimationFrame(() => {
      this.replaceLocationHash(nextTargetId);
      this.document.getElementById(nextTargetId)?.scrollIntoView({
        behavior: 'smooth',
        block: 'start',
      });
    });
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
      ...topic.theorySections.flatMap(section =>
        (section.examples ?? []).flatMap(example => [
          example.title,
          example.description,
          example.code,
        ])
      ),
      ...topic.questions.flatMap(item => [item.question, item.answer]),
      this.translate(topic.title),
      this.translate(topic.intro),
      ...topic.theory.map(item => this.translate(item)),
      ...topic.theorySections.flatMap(section =>
        (section.examples ?? []).flatMap(example => [
          this.translate(example.title),
          this.translate(example.description),
        ])
      ),
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

  private restoreAudioPlaybackRate(): void {
    if (!isPlatformBrowser(this.platformId)) {
      return;
    }
    const stored = Number(
      this.document.defaultView?.localStorage.getItem(this.audioRateStorageKey)
    );
    if (this.audioPlaybackRates.includes(stored as 1 | 1.5 | 2)) {
      this.audioPlaybackRate.set(stored);
    }
  }

  private restoreShareCount(): void {
    if (!isPlatformBrowser(this.platformId)) {
      return;
    }
    const storedCount = Number.parseInt(
      this.document.defaultView?.localStorage.getItem(
        this.shareCountStorageKey
      ) ?? '0',
      10
    );
    this.shareCount.set(
      Number.isSafeInteger(storedCount) && storedCount > 0 ? storedCount : 0
    );
    this.changeDetectorRef.detectChanges();
  }

  private loadShareCount(): void {
    this.restoreShareCount();
    this.guideShareService.getShareCount().subscribe(globalCount => {
      if (globalCount !== null && !this.shareRecordedDuringCurrentVisit) {
        this.setShareCount(globalCount);
      }
    });
  }

  private setShareCount(count: number): void {
    this.shareCount.set(count);
    this.document.defaultView?.localStorage.setItem(
      this.shareCountStorageKey,
      count.toString()
    );
    this.changeDetectorRef.detectChanges();
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
    this.replaceLocationHash(
      topicId ?? (sectionId === 'practice' ? 'casos-practicos' : sectionId)
    );
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
    if (!browserWindow || this.restoringLocationHash) {
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

  private replaceLocationHash(targetId: string): void {
    const browserWindow = this.document.defaultView;
    if (!isPlatformBrowser(this.platformId) || !browserWindow) {
      return;
    }

    const nextHash = `#${targetId}`;
    if (browserWindow.location.hash === nextHash) {
      return;
    }

    const nextUrl = `${browserWindow.location.pathname}${browserWindow.location.search}${nextHash}`;
    browserWindow.history.replaceState(
      browserWindow.history.state,
      '',
      nextUrl
    );
  }

  private restoreLocationFromHash(): void {
    const browserWindow = this.document.defaultView;
    if (!isPlatformBrowser(this.platformId) || !browserWindow) {
      return;
    }

    let targetId: string;
    try {
      targetId = decodeURIComponent(browserWindow.location.hash.slice(1));
    } catch {
      return;
    }
    if (!targetId) {
      return;
    }

    const topic = this.topics.find(item => item.id === targetId);
    const challenge = this.codeChallengeNavigation.find(
      item => `code-challenge-${item.id}` === targetId
    );
    const group = this.groups.find(item => item.id === targetId);
    const isKnownTarget =
      Boolean(topic || challenge || group) ||
      targetId === 'casos-practicos' ||
      targetId === 'study-content';
    if (!isKnownTarget) {
      return;
    }

    this.restoringLocationHash = true;
    this.query.set('');

    if (topic) {
      this.selectedCollection.set('all');
      this.activeSectionId.set(topic.groupId);
      this.activeTopicId.set(topic.id);
      this.setTopicCollapsed(topic.id, false);
    } else if (challenge) {
      this.selectedCollection.set('practice');
      this.activeSectionId.set('practice');
      this.activeTopicId.set(targetId);
    } else if (targetId === 'casos-practicos') {
      this.selectedCollection.set('all');
      this.activeSectionId.set('practice');
      this.activeTopicId.set(null);
    } else {
      this.selectedCollection.set('all');
      this.activeSectionId.set(group?.id ?? null);
      this.activeTopicId.set(null);
    }

    browserWindow.requestAnimationFrame(() => {
      browserWindow.requestAnimationFrame(() => {
        const target = this.document.getElementById(targetId);
        if (target instanceof HTMLDetailsElement) {
          target.open = true;
        }
        target?.scrollIntoView({
          behavior: 'instant' as ScrollBehavior,
          block: 'start',
        });
        this.restoringLocationHash = false;
        this.refreshScrollSpyTargets();
      });
    });
  }
}
