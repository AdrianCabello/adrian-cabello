import { bootstrapApplication } from '@angular/platform-browser';
import { provideAnimations } from '@angular/platform-browser/animations';
import { AppComponent } from './app/app.component';
import { NgParticlesModule } from 'ng-particles';

bootstrapApplication(AppComponent, {
  providers: [
    provideAnimations(),
    NgParticlesModule
  ],
});
