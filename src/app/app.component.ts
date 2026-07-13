import { Component, OnInit } from '@angular/core';
import { MetaService } from './services/meta.service';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-root',
  imports: [CommonModule, RouterOutlet],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
  standalone: true,
})
export class AppComponent implements OnInit {
  constructor(private readonly metaService: MetaService) {}

  ngOnInit(): void {
    this.metaService.updateMetaTags();
  }

  title = 'Adrian Cabello';
}
