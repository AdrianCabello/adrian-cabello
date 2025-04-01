import { Injectable } from '@angular/core';
import { Meta, Title } from '@angular/platform-browser';

@Injectable({
  providedIn: 'root',
})
export class MetaService {
  private readonly baseUrl = 'https://adriancabello.dev';
  private readonly imageUrl = 'https://adriancabello.dev/assets/images/ghibli.jpeg';

  constructor(
    private meta: Meta,
    private title: Title
  ) {}

  updateMetaTags() {
    // Title
    this.title.setTitle('Adrian Cabello - Senior Frontend Developer');

    // Primary Meta Tags
    this.meta.updateTag({
      name: 'title',
      content: 'Adrian Cabello - Senior Frontend Developer',
    });
    this.meta.updateTag({
      name: 'description',
      content:
        'Senior Frontend Developer specializing in Angular with 8+ years of experience. Expert in building scalable web applications with clean architecture and high performance.',
    });
    this.meta.updateTag({
      name: 'keywords',
      content:
        'Frontend Developer, Angular, TypeScript, JavaScript, Tech Leader, Web Development',
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
      content: 'Adrian Cabello - Senior Frontend Developer',
    });
    this.meta.updateTag({
      property: 'og:description',
      content:
        'Senior Frontend Developer specializing in Angular with 8+ years of experience. Expert in building scalable web applications with clean architecture and high performance.',
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
      content: 'Adrian Cabello - Senior Frontend Developer',
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
      content: 'Adrian Cabello - Senior Frontend Developer',
    });
    this.meta.updateTag({
      name: 'twitter:description',
      content:
        'Senior Frontend Developer specializing in Angular with 8+ years of experience. Expert in building scalable web applications with clean architecture and high performance.',
    });
    this.meta.updateTag({
      name: 'twitter:image',
      content: this.imageUrl,
    });
    this.meta.updateTag({
      name: 'twitter:image:alt',
      content: 'Adrian Cabello - Senior Frontend Developer',
    });

    // Additional Meta Tags
    this.meta.updateTag({ name: 'theme-color', content: '#1f2937' });
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
      content: 'image/jpeg',
    });
  }
}
