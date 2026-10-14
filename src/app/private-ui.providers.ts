import { inject, provideEnvironmentInitializer } from '@angular/core';
import { provideAnimations } from '@angular/platform-browser/animations';
import { definePreset } from '@primeuix/themes';
import Aura from '@primeuix/themes/aura';
import { PrimeNG } from 'primeng/config';

const BlueAura = definePreset(Aura, {
  semantic: {
    primary: {
      50: '{blue.50}',
      100: '{blue.100}',
      200: '{blue.200}',
      300: '{blue.300}',
      400: '{blue.400}',
      500: '{blue.500}',
      600: '{blue.600}',
      700: '{blue.700}',
      800: '{blue.800}',
      900: '{blue.900}',
      950: '{blue.950}',
    },
  },
});

export const privateUiProviders = [
  provideAnimations(),
  // providePrimeNG() applies its config through an app initializer, which
  // never runs when provided on a lazy route, so set it on route activation.
  provideEnvironmentInitializer(() =>
    inject(PrimeNG).setConfig({
      theme: {
        preset: BlueAura,
        options: {
          darkModeSelector: '.app-dark',
        },
      },
      ripple: true,
    })
  ),
];
