import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-resources',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './resources.component.html',
})
export class ResourcesComponent {}
