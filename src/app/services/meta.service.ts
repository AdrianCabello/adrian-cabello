import { DOCUMENT } from '@angular/common';
import { Inject, Injectable } from '@angular/core';
import { Meta, Title } from '@angular/platform-browser';
import { LanguageService } from '../i18n/language.service';

@Injectable({
  providedIn: 'root',
})
export class MetaService {
  private readonly baseUrl = 'https://adriancabello.dev';
  private readonly imageUrl =
    'https://adriancabello.dev/assets/images/portfolio-social-card.jpg';
  private readonly pageTitle = 'Adrian Cabello | Full-Stack Product Engineer';
  private readonly pageDescription =
    'Full-stack product engineer and Tech Lead with 9+ years building Angular and Ionic applications, leading enterprise migrations, and shipping Go, Node.js and AI-enabled products.';

  constructor(
    private meta: Meta,
    private title: Title,
    private languageService: LanguageService,
    @Inject(DOCUMENT) private document: Document
  ) {}

  updateForUrl(url: string): void {
    const path = url.split(/[?#]/)[0];
    if (path === '' || path === '/') {
      this.updateMetaTags();
      return;
    }

    if (path === '/angular-senior') {
      this.updateAngularSeniorMetaTags();
      return;
    }

    this.title.setTitle('Private workspace | Adrian Cabello');
    this.updateCanonical(`${this.baseUrl}${path}`);
    this.document.documentElement.lang = this.languageService.language();
    this.meta.updateTag({ name: 'robots', content: 'noindex, nofollow' });
    this.meta.updateTag({
      name: 'description',
      content: 'Private workspace for Adrian Cabello.',
    });
  }

  updateMetaTags() {
    const spanish = this.languageService.language() === 'es';
    const title = spanish
      ? 'Adrian Cabello | Ingeniero de Producto Full-Stack'
      : this.pageTitle;
    const description = spanish
      ? 'Ingeniero de producto Full-Stack y Tech Lead con más de 9 años creando aplicaciones Angular e Ionic, liderando migraciones empresariales y entregando productos con Go, Node.js e inteligencia artificial.'
      : this.pageDescription;
    this.updateCanonical(`${this.baseUrl}/`);
    this.document.documentElement.lang = this.languageService.language();
    // Title
    this.title.setTitle(title);

    // Primary Meta Tags
    this.meta.updateTag({
      name: 'title',
      content: title,
    });
    this.meta.updateTag({
      name: 'description',
      content: description,
    });
    this.meta.updateTag({
      name: 'keywords',
      content:
        'Full-Stack Product Engineer, Angular, Ionic, TypeScript, Go, Node.js, PostgreSQL, AI Engineering, LLM, MCP, Tech Lead, Web Development',
    });
    this.meta.updateTag({ name: 'author', content: 'Adrian Cabello' });

    // Open Graph / Facebook
    this.meta.updateTag({ property: 'og:type', content: 'website' });
    this.meta.updateTag({
      property: 'og:url',
      content: this.baseUrl,
    });
    this.meta.updateTag({
      property: 'og:title',
      content: title,
    });
    this.meta.updateTag({
      property: 'og:description',
      content: description,
    });
    this.meta.updateTag({
      property: 'og:image',
      content: this.imageUrl,
    });
    this.meta.updateTag({
      property: 'og:image:type',
      content: 'image/jpeg',
    });
    this.meta.updateTag({
      property: 'og:image:width',
      content: '1200',
    });
    this.meta.updateTag({
      property: 'og:image:height',
      content: '630',
    });
    this.meta.updateTag({
      property: 'og:image:alt',
      content: title,
    });
    this.meta.updateTag({
      property: 'og:site_name',
      content: 'Adrian Cabello Portfolio',
    });

    // Twitter
    this.meta.updateTag({
      name: 'twitter:card',
      content: 'summary_large_image',
    });
    this.meta.updateTag({
      name: 'twitter:url',
      content: this.baseUrl,
    });
    this.meta.updateTag({
      name: 'twitter:title',
      content: title,
    });
    this.meta.updateTag({
      name: 'twitter:description',
      content: description,
    });
    this.meta.updateTag({
      name: 'twitter:image',
      content: this.imageUrl,
    });
    this.meta.updateTag({
      name: 'twitter:image:alt',
      content: title,
    });

    // Additional Meta Tags
    this.meta.updateTag({ name: 'theme-color', content: '#050b16' });
    this.meta.updateTag({
      name: 'robots',
      content: 'index, follow, max-image-preview:large',
    });
    this.meta.updateTag({
      name: 'language',
      content: spanish ? 'Spanish' : 'English',
    });
    this.meta.updateTag({ name: 'generator', content: 'Angular' });

    // WhatsApp specific
    this.meta.updateTag({
      property: 'og:image:secure_url',
      content: this.imageUrl,
    });
    this.meta.updateTag({
      property: 'og:image:type',
      content: 'image/jpeg',
    });
  }

  private updateAngularSeniorMetaTags(): void {
    const spanish = this.languageService.language() === 'es';
    const title = spanish
      ? 'Guía completa de entrevista Angular Senior | Adrian Cabello'
      : 'Complete Senior Angular Interview Guide | Adrian Cabello';
    const description = spanish
      ? 'Teoría, ejemplos y preguntas con respuesta sobre HTML, CSS, JavaScript, TypeScript, Angular, RxJS, arquitectura, testing, seguridad y system design frontend.'
      : 'Theory, examples and answered interview questions on HTML, CSS, JavaScript, TypeScript, Angular, RxJS, architecture, testing, security and frontend system design.';
    const url = `${this.baseUrl}/angular-senior`;

    this.title.setTitle(title);
    this.updateCanonical(url);
    this.document.documentElement.lang = this.languageService.language();
    this.meta.updateTag({ name: 'title', content: title });
    this.meta.updateTag({ name: 'description', content: description });
    this.meta.updateTag({
      name: 'keywords',
      content:
        'Angular Senior, entrevista Angular, TypeScript, JavaScript, RxJS, Signals, frontend system design',
    });
    this.meta.updateTag({ name: 'author', content: 'Adrian Cabello' });
    this.meta.updateTag({ name: 'robots', content: 'index, follow' });
    this.meta.updateTag({
      name: 'language',
      content: spanish ? 'Spanish' : 'English',
    });
    this.meta.updateTag({ name: 'theme-color', content: '#07101f' });
    this.meta.updateTag({ property: 'og:type', content: 'article' });
    this.meta.updateTag({ property: 'og:url', content: url });
    this.meta.updateTag({ property: 'og:title', content: title });
    this.meta.updateTag({ property: 'og:description', content: description });
    this.meta.updateTag({ property: 'og:image', content: this.imageUrl });
    this.meta.updateTag({
      name: 'twitter:card',
      content: 'summary_large_image',
    });
    this.meta.updateTag({ name: 'twitter:url', content: url });
    this.meta.updateTag({ name: 'twitter:title', content: title });
    this.meta.updateTag({ name: 'twitter:description', content: description });
    this.meta.updateTag({ name: 'twitter:image', content: this.imageUrl });
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
