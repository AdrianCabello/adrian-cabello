import { Injectable } from '@angular/core';
import { Meta, Title } from '@angular/platform-browser';

@Injectable({
  providedIn: 'root'
})
export class MetaService {
  constructor(
    private meta: Meta,
    private title: Title
  ) {}

  updateMetaTags() {
    // Title
    this.title.setTitle('Adrian Cabello - Senior Frontend Developer');

    // Primary Meta Tags
    this.meta.updateTag({ name: 'title', content: 'Adrian Cabello - Senior Frontend Developer' });
    this.meta.updateTag({ name: 'description', content: 'Senior Frontend Developer specializing in Angular with 8+ years of experience. Expert in building scalable web applications with clean architecture and high performance.' });
    this.meta.updateTag({ name: 'keywords', content: 'Frontend Developer, Angular, TypeScript, JavaScript, Tech Leader, Web Development' });
    this.meta.updateTag({ name: 'author', content: 'Adrian Cabello' });

    // Open Graph / Facebook
    this.meta.updateTag({ property: 'og:type', content: 'website' });
    this.meta.updateTag({ property: 'og:url', content: 'https://adriancabello.com/' });
    this.meta.updateTag({ property: 'og:title', content: 'Adrian Cabello - Senior Frontend Developer' });
    this.meta.updateTag({ property: 'og:description', content: 'Senior Frontend Developer specializing in Angular with 8+ years of experience. Expert in building scalable web applications with clean architecture and high performance.' });
    this.meta.updateTag({ property: 'og:image', content: 'assets/images/ghibli.jpeg' });

    // Twitter
    this.meta.updateTag({ property: 'twitter:card', content: 'summary_large_image' });
    this.meta.updateTag({ property: 'twitter:url', content: 'https://adriancabello.com/' });
    this.meta.updateTag({ property: 'twitter:title', content: 'Adrian Cabello - Senior Frontend Developer' });
    this.meta.updateTag({ property: 'twitter:description', content: 'Senior Frontend Developer specializing in Angular with 8+ years of experience. Expert in building scalable web applications with clean architecture and high performance.' });
    this.meta.updateTag({ property: 'twitter:image', content: 'assets/images/ghibli.jpeg' });

    // Additional Meta Tags
    this.meta.updateTag({ name: 'theme-color', content: '#1f2937' });
    this.meta.updateTag({ name: 'robots', content: 'index, follow' });
    this.meta.updateTag({ name: 'language', content: 'English' });
    this.meta.updateTag({ name: 'revisit-after', content: '7 days' });
    this.meta.updateTag({ name: 'generator', content: 'Angular' });
  }
} 