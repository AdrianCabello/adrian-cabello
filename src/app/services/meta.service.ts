import { Injectable } from '@angular/core';
import { Meta, Title } from '@angular/platform-browser';

@Injectable({
  providedIn: 'root',
})
export class MetaService {
  private readonly baseUrl = 'https://adriancabello.dev';
  private readonly imageUrl =
    'https://adriancabello.dev/assets/images/portfolio-social-card.jpg';
  private readonly pageTitle = 'Adrian Cabello | Full-Stack Product Engineer';
  private readonly pageDescription =
    'Full-stack product engineer and Tech Lead with 9+ years building Angular frontends, Go and Node.js backends, AI workflows and scalable digital products.';

  constructor(
    private meta: Meta,
    private title: Title
  ) {}

  updateForUrl(url: string): void {
    const path = url.split(/[?#]/)[0];
    if (path === '' || path === '/') {
      this.updateMetaTags();
      return;
    }

    this.title.setTitle('Private workspace | Adrian Cabello');
    this.meta.updateTag({ name: 'robots', content: 'noindex, nofollow' });
    this.meta.updateTag({
      name: 'description',
      content: 'Private workspace for Adrian Cabello.',
    });
  }

  updateMetaTags() {
    // Title
    this.title.setTitle(this.pageTitle);

    // Primary Meta Tags
    this.meta.updateTag({
      name: 'title',
      content: this.pageTitle,
    });
    this.meta.updateTag({
      name: 'description',
      content: this.pageDescription,
    });
    this.meta.updateTag({
      name: 'keywords',
      content:
        'Full-Stack Product Engineer, Angular, TypeScript, Go, Node.js, PostgreSQL, AI Engineering, LLM, MCP, Tech Lead, Web Development',
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
      content: this.pageTitle,
    });
    this.meta.updateTag({
      property: 'og:description',
      content: this.pageDescription,
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
      content: this.pageTitle,
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
      content: this.pageTitle,
    });
    this.meta.updateTag({
      name: 'twitter:description',
      content: this.pageDescription,
    });
    this.meta.updateTag({
      name: 'twitter:image',
      content: this.imageUrl,
    });
    this.meta.updateTag({
      name: 'twitter:image:alt',
      content: this.pageTitle,
    });

    // Additional Meta Tags
    this.meta.updateTag({ name: 'theme-color', content: '#050b16' });
    this.meta.updateTag({
      name: 'robots',
      content: 'index, follow, max-image-preview:large',
    });
    this.meta.updateTag({ name: 'language', content: 'English' });
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
}
