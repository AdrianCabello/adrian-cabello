import { DOCUMENT } from '@angular/common';
import { Inject, Injectable } from '@angular/core';
import { Meta, Title } from '@angular/platform-browser';
import { AppLanguage } from '../i18n/language.service';

type PublicPageKind = 'home' | 'guide';

interface PublicPage {
  readonly language: AppLanguage;
  readonly kind: PublicPageKind;
  readonly canonicalPath: string;
}

@Injectable({ providedIn: 'root' })
export class MetaService {
  private readonly baseUrl = 'https://adriancabello.dev';
  private readonly imageUrl = `${this.baseUrl}/assets/images/portfolio-social-card.jpg`;

  constructor(
    private readonly meta: Meta,
    private readonly title: Title,
    @Inject(DOCUMENT) private readonly document: Document
  ) {}

  updateForUrl(url: string): void {
    const path = url.split(/[?#]/)[0].replace(/\/$/, '') || '/';
    const publicPage = this.resolvePublicPage(path);
    if (publicPage) {
      this.updatePublicPage(publicPage);
      return;
    }

    this.title.setTitle('Private workspace | Adrian Cabello');
    this.document.documentElement.lang = 'es';
    this.updateCanonical(`${this.baseUrl}${path}`);
    this.removeAlternateLinks();
    this.removeStructuredData();
    this.meta.updateTag({ name: 'robots', content: 'noindex, nofollow' });
    this.meta.updateTag({
      name: 'description',
      content: 'Private workspace for Adrian Cabello.',
    });
  }

  private resolvePublicPage(path: string): PublicPage | null {
    if (path === '/' || path === '/en') {
      return { language: 'en', kind: 'home', canonicalPath: '/en' };
    }
    if (path === '/es') {
      return { language: 'es', kind: 'home', canonicalPath: '/es' };
    }
    if (path === '/angular-senior' || path === '/en/angular-senior') {
      return {
        language: 'en',
        kind: 'guide',
        canonicalPath: '/en/angular-senior',
      };
    }
    if (path === '/es/angular-senior') {
      return {
        language: 'es',
        kind: 'guide',
        canonicalPath: '/es/angular-senior',
      };
    }
    return null;
  }

  private updatePublicPage(page: PublicPage): void {
    const spanish = page.language === 'es';
    const isGuide = page.kind === 'guide';
    const title = isGuide
      ? spanish
        ? 'Guía completa de entrevista Angular Senior | Adrian Cabello'
        : 'Complete Senior Angular Interview Guide | Adrian Cabello'
      : spanish
        ? 'Adrian Cabello | Ingeniero de Producto Full-Stack'
        : 'Adrian Cabello | Full-Stack Product Engineer';
    const description = isGuide
      ? spanish
        ? 'Teoría, ejemplos y preguntas con respuesta sobre HTML, CSS, JavaScript, TypeScript, Angular, RxJS, arquitectura, testing, seguridad y system design frontend.'
        : 'Theory, examples and answered interview questions on HTML, CSS, JavaScript, TypeScript, Angular, RxJS, architecture, testing, security and frontend system design.'
      : spanish
        ? 'Ingeniero de producto Full-Stack y Tech Lead con más de 9 años creando aplicaciones Angular e Ionic, liderando migraciones empresariales y entregando productos con Go, Node.js e inteligencia artificial.'
        : 'Full-stack product engineer and Tech Lead with 9+ years building Angular and Ionic applications, leading enterprise migrations, and shipping Go, Node.js and AI-enabled products.';
    const canonicalUrl = `${this.baseUrl}${page.canonicalPath}`;

    this.document.documentElement.lang = page.language;
    this.title.setTitle(title);
    this.updateCanonical(canonicalUrl);
    this.updateAlternateLinks(page.kind);

    this.meta.updateTag({ name: 'title', content: title });
    this.meta.updateTag({ name: 'description', content: description });
    this.meta.updateTag({
      name: 'keywords',
      content: isGuide
        ? spanish
          ? 'Angular Senior, entrevista Angular, TypeScript, JavaScript, RxJS, Signals, arquitectura frontend, system design'
          : 'Senior Angular, Angular interview, TypeScript, JavaScript, RxJS, Signals, frontend architecture, system design'
        : 'Full-Stack Product Engineer, Angular, Ionic, TypeScript, Go, Node.js, PostgreSQL, AI Engineering, LLM, MCP, Tech Lead, Web Development',
    });
    this.meta.updateTag({ name: 'author', content: 'Adrian Cabello' });
    this.meta.updateTag({
      name: 'robots',
      content: 'index, follow, max-image-preview:large',
    });
    this.meta.updateTag({
      name: 'language',
      content: spanish ? 'Spanish' : 'English',
    });
    this.meta.updateTag({
      name: 'theme-color',
      content: isGuide ? '#07101f' : '#050b16',
    });
    this.meta.updateTag({ name: 'generator', content: 'Angular' });

    this.meta.updateTag({
      property: 'og:type',
      content: isGuide ? 'article' : 'website',
    });
    this.meta.updateTag({ property: 'og:url', content: canonicalUrl });
    this.meta.updateTag({ property: 'og:title', content: title });
    this.meta.updateTag({ property: 'og:description', content: description });
    this.meta.updateTag({ property: 'og:image', content: this.imageUrl });
    this.meta.updateTag({
      property: 'og:image:secure_url',
      content: this.imageUrl,
    });
    this.meta.updateTag({ property: 'og:image:type', content: 'image/jpeg' });
    this.meta.updateTag({ property: 'og:image:width', content: '1200' });
    this.meta.updateTag({ property: 'og:image:height', content: '630' });
    this.meta.updateTag({ property: 'og:image:alt', content: title });
    this.meta.updateTag({
      property: 'og:site_name',
      content: 'Adrian Cabello Portfolio',
    });
    this.meta.updateTag({
      property: 'og:locale',
      content: spanish ? 'es_ES' : 'en_US',
    });
    this.meta.updateTag({
      property: 'og:locale:alternate',
      content: spanish ? 'en_US' : 'es_ES',
    });

    this.meta.updateTag({
      name: 'twitter:card',
      content: 'summary_large_image',
    });
    this.meta.updateTag({ name: 'twitter:url', content: canonicalUrl });
    this.meta.updateTag({ name: 'twitter:title', content: title });
    this.meta.updateTag({ name: 'twitter:description', content: description });
    this.meta.updateTag({ name: 'twitter:image', content: this.imageUrl });
    this.meta.updateTag({ name: 'twitter:image:alt', content: title });

    this.updateStructuredData(page, title, description, canonicalUrl);
  }

  private updateAlternateLinks(kind: PublicPageKind): void {
    this.removeAlternateLinks();
    const suffix = kind === 'guide' ? '/angular-senior' : '';
    const alternatives = [
      { language: 'en', href: `${this.baseUrl}/en${suffix}` },
      { language: 'es', href: `${this.baseUrl}/es${suffix}` },
      {
        language: 'x-default',
        href: `${this.baseUrl}${kind === 'guide' ? '/angular-senior' : '/'}`,
      },
    ];

    for (const alternative of alternatives) {
      const link = this.document.createElement('link');
      link.rel = 'alternate';
      link.hreflang = alternative.language;
      link.href = alternative.href;
      link.setAttribute('data-seo-alternate', 'true');
      this.document.head.appendChild(link);
    }
  }

  private removeAlternateLinks(): void {
    this.document
      .querySelectorAll('link[data-seo-alternate="true"]')
      .forEach(link => link.remove());
  }

  private updateStructuredData(
    page: PublicPage,
    title: string,
    description: string,
    canonicalUrl: string
  ): void {
    this.removeStructuredData();
    const spanish = page.language === 'es';
    const person = {
      '@type': 'Person',
      '@id': `${this.baseUrl}/#person`,
      name: 'Adrian Cabello',
      url: `${this.baseUrl}/`,
      image: `${this.baseUrl}/assets/images/adrian-profile.webp`,
      jobTitle: spanish
        ? 'Ingeniero de Producto Full-Stack y Tech Lead'
        : 'Full-Stack Product Engineer and Tech Lead',
      sameAs: [
        'https://www.linkedin.com/in/adrian-cabello-b07290b8/',
        'https://github.com/adriancabello',
      ],
      knowsAbout: [
        'Angular',
        'Ionic',
        'TypeScript',
        'Go',
        'Node.js',
        'PostgreSQL',
        'AI-assisted software engineering',
        'Technical leadership',
      ],
    };
    const graph: object[] = [person];

    if (page.kind === 'home') {
      graph.push({
        '@type': 'WebSite',
        '@id': `${canonicalUrl}#website`,
        url: canonicalUrl,
        name: title,
        description,
        inLanguage: page.language,
        author: { '@id': `${this.baseUrl}/#person` },
      });
    } else {
      graph.push(
        {
          '@type': 'TechArticle',
          '@id': `${canonicalUrl}#article`,
          headline: title,
          description,
          url: canonicalUrl,
          mainEntityOfPage: canonicalUrl,
          inLanguage: page.language,
          image: this.imageUrl,
          datePublished: '2026-09-02',
          dateModified: '2026-09-02',
          author: { '@id': `${this.baseUrl}/#person` },
        },
        {
          '@type': 'BreadcrumbList',
          '@id': `${canonicalUrl}#breadcrumb`,
          itemListElement: [
            {
              '@type': 'ListItem',
              position: 1,
              name: 'Portfolio',
              item: `${this.baseUrl}/${page.language}`,
            },
            {
              '@type': 'ListItem',
              position: 2,
              name: spanish ? 'Guía Angular Senior' : 'Senior Angular Guide',
              item: canonicalUrl,
            },
          ],
        }
      );
    }

    const script = this.document.createElement('script');
    script.id = 'seo-structured-data';
    script.type = 'application/ld+json';
    script.textContent = JSON.stringify({
      '@context': 'https://schema.org',
      '@graph': graph,
    });
    this.document.head.appendChild(script);
  }

  private removeStructuredData(): void {
    this.document.getElementById('seo-structured-data')?.remove();
  }

  private updateCanonical(url: string): void {
    let canonical = this.document.querySelector<HTMLLinkElement>(
      'link[rel="canonical"]'
    );
    if (!canonical) {
      canonical = this.document.createElement('link');
      canonical.rel = 'canonical';
      this.document.head.appendChild(canonical);
    }
    canonical.href = url;
  }
}
