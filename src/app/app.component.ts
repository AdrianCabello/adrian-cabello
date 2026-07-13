import { Component, DestroyRef, OnInit, inject } from '@angular/core';
import { MetaService } from './services/meta.service';
import { CommonModule } from '@angular/common';
import { NavigationEnd, Router, RouterOutlet } from '@angular/router';
import { filter } from 'rxjs';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

@Component({
  selector: 'app-root',
  imports: [CommonModule, RouterOutlet],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
  standalone: true,
})
export class AppComponent implements OnInit {
  private readonly router = inject(Router);
  private readonly destroyRef = inject(DestroyRef);

  constructor(private readonly metaService: MetaService) {}

  ngOnInit(): void {
    this.metaService.updateForUrl(this.router.url);
    this.router.events
      .pipe(
        filter(
          (event): event is NavigationEnd => event instanceof NavigationEnd
        ),
        takeUntilDestroyed(this.destroyRef)
      )
      .subscribe(event =>
        this.metaService.updateForUrl(event.urlAfterRedirects)
      );
  }

  title = 'Adrian Cabello';
}
