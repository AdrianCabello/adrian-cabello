import { Injectable } from '@angular/core';
import { Meta, Title } from '@angular/platform-browser';

@Injectable({
  providedIn: 'root',
})
export class MetaService {
  private readonly baseUrl = 'https://adriancabello.dev';
  private readonly imageUrl =
    'https://adriancabello.dev/assets/images/ghibli.png';
  private readonly pageTitle =
    'Adrian Cabello | Senior Angular Engineer & Tech Lead';
  private readonly pageDescription =
    'Senior Angular Engineer and Tech Lead with 9+ years building enterprise platforms, AI-enabled products and founder-led operational software.';

  constructor(
    private meta: Meta,
    private title: Title
  ) {}

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
        'Frontend Developer, Angular, TypeScript, JavaScript, AI Automation, LLM, MCP, Agent Skills, Jira Automation, Tech Leader, Web Development',
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
      content: 'image/png',
    });
    this.meta.updateTag({
      property: 'og:image:width',
      content: '1024',
    });
    this.meta.updateTag({
      property: 'og:image:height',
      content: '1024',
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
    this.meta.updateTag({ name: 'robots', content: 'index, follow' });
    this.meta.updateTag({ name: 'language', content: 'English' });
    this.meta.updateTag({ name: 'revisit-after', content: '7 days' });
    this.meta.updateTag({ name: 'generator', content: 'Angular' });

    // WhatsApp specific
    this.meta.updateTag({
      property: 'og:image:secure_url',
      content: this.imageUrl,
    });
    this.meta.updateTag({
      property: 'og:image:type',
      content: 'image/png',
    });
  }
}
