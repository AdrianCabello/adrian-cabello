import { DOCUMENT } from '@angular/common';
import { Component, inject } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-resources',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './resources.component.html',
})
export class ResourcesComponent {
  private readonly document = inject(DOCUMENT);

  protected scrollToPageTop(): void {
    this.document.defaultView?.scrollTo({ top: 0, left: 0, behavior: 'auto' });
  }
}
