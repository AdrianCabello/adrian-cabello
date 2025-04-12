import { Component, inject, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProjectsService, type Project } from '../../services/projects.service';
import { register } from 'swiper/element/bundle';

// Register Swiper custom elements
register();

@Component({
  selector: 'app-projects',
  templateUrl: './projects.component.html',
  standalone: true,
  imports: [CommonModule],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class ProjectsComponent {
  private projectsService = inject(ProjectsService);
  protected projects = this.projectsService.getProjects();

  protected swiperConfig = {
    slidesPerView: 1,
    spaceBetween: 0,
    navigation: true,
    pagination: {
      clickable: true,
      type: 'bullets',
      el: '.swiper-pagination-custom',
      renderBullet: function (index: number, className: string) {
        return '<span class="' + className + '"></span>';
      },
    },
    effect: 'fade',
    fadeEffect: {
      crossFade: true
    },
    breakpoints: {
      640: {
        slidesPerView: 1,
      },
      768: {
        slidesPerView: 1,
      },
      1024: {
        slidesPerView: 1,
      },
    },
  };
}
