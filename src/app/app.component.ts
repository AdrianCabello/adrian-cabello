import { Component, OnInit } from '@angular/core';
import { MetaService } from './services/meta.service';

import { HomeComponent } from './sections/home/home.component';
import { HeaderComponent } from './shared/components/header/header.component';
import { ExperienceComponent } from './sections/experience/experience.component';
import { AcademicComponent } from './sections/academic/academic.component';
import { FooterComponent } from './sections/footer/footer.component';
@Component({
  selector: 'app-root',
  imports: [HomeComponent, HeaderComponent, ExperienceComponent, AcademicComponent, FooterComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
  standalone: true,
})
export class AppComponent implements OnInit {
  constructor(private metaService: MetaService) { }

  ngOnInit() {
    this.metaService.updateMetaTags();
  }

  title = 'Adrian Cabello';
}
