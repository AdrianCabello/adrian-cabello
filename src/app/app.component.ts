import { Component, OnInit } from '@angular/core';
import { MetaService } from './services/meta.service';
import { ZoomPreventionService } from './services/zoom-prevention.service';

import { HomeComponent } from './sections/home/home.component';
import { HeaderComponent } from './shared/components/header/header.component';
import { ExperienceComponent } from './sections/experience/experience.component';
import { AcademicComponent } from './sections/academic/academic.component';
import { FooterComponent } from './sections/footer/footer.component';
import { ProjectsComponent } from './sections/projects/projects.component';

@Component({
  selector: 'app-root',
  imports: [
    HomeComponent,
    HeaderComponent,
    ExperienceComponent,
    AcademicComponent,
    FooterComponent,
    ProjectsComponent,
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
  standalone: true,
})
export class AppComponent implements OnInit {
  constructor(
    private metaService: MetaService,
    private zoomPreventionService: ZoomPreventionService
  ) {}

  ngOnInit() {
    this.metaService.updateMetaTags();
  }

  title = 'Adrian Cabello';
}
