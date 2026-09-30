import { CommonModule } from '@angular/common';
import { Component, afterNextRender, inject } from '@angular/core';
import { LanguageScrollService } from '../../i18n/language-scroll.service';
import { AcademicComponent } from '../../sections/academic/academic.component';
import { ExperienceComponent } from '../../sections/experience/experience.component';
import { FooterComponent } from '../../sections/footer/footer.component';
import { HomeComponent } from '../../sections/home/home.component';
import { ProjectsComponent } from '../../sections/projects/projects.component';
import { ResourcesComponent } from '../../sections/resources/resources.component';
import { HeaderComponent } from '../../shared/components/header/header.component';
import { RevealDirective } from '../../shared/directives/reveal.directive';

@Component({
  selector: 'app-public-site',
  standalone: true,
  imports: [
    CommonModule,
    HeaderComponent,
    HomeComponent,
    ProjectsComponent,
    ExperienceComponent,
    AcademicComponent,
    ResourcesComponent,
    FooterComponent,
    RevealDirective,
  ],
  templateUrl: './public-site.component.html',
})
export class PublicSiteComponent {
  private readonly languageScroll = inject(LanguageScrollService);

  constructor() {
    afterNextRender(() => this.languageScroll.restorePositionAfterRender());
  }
}
