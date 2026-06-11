# Implementación de Swiper en el Portfolio de Adrian Cabello

## ¿Qué es Swiper?

**Swiper** es una biblioteca moderna y gratuita para crear sliders/carousels en aplicaciones web. Es especialmente popular en el ecosistema Angular por su facilidad de integración y su API flexible.

## Versión Utilizada

- **Swiper**: `^11.2.6`
- **Angular**: `^19.0.0`

## Instalación y Configuración

### 1. Instalación de la Dependencia

```bash
npm install swiper@^11.2.6
```

### 2. Importación de Estilos

En `src/styles.scss`:

```scss
@use 'swiper/css';
@use 'swiper/css/navigation';
@use 'swiper/css/pagination';
@use 'swiper/css/effect-fade';
```

### 3. Registro de Elementos Personalizados

En `src/app/sections/projects/projects.component.ts`:

```typescript
import { register } from 'swiper/element/bundle';

// Register Swiper custom elements
register();
```

## Implementación en el Proyecto

### Ubicación
El slider se implementa en la sección de proyectos: `src/app/sections/projects/`

### Estructura del Componente

#### Template (`projects.component.html`)

```html
<div class="md:w-1/2 md:mr-6 mb-4 overflow-hidden rounded-lg relative">
    <swiper-container [config]="swiperConfig" class="project-swiper">
        @for (image of project.images; track image) {
        <swiper-slide>
            <div class="aspect-video cursor-pointer">
                <img [src]="image" [alt]="project.title" class="w-full h-full object-cover">
            </div>
        </swiper-slide>
        }
    </swiper-container>
    <div class="swiper-pagination-custom"></div>
</div>
```

#### Configuración (`projects.component.ts`)

```typescript
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
```

## Estilos Personalizados

### CSS del Slider (`styles.scss`)

```scss
.project-swiper {
  width: 100%;
  height: 100%;
  
  swiper-slide {
    width: 100%;
    height: 100%;
  }

  &::part(button-prev),
  &::part(button-next) {
    color: white;
    background: rgba(0, 0, 0, 0.5);
    width: 35px;
    height: 35px;
    border-radius: 50%;
    
    &:hover {
      background: rgba(0, 0, 0, 0.8);
    }
  }

  &::part(button-prev)::after,
  &::part(button-next)::after {
    font-size: 18px;
  }
}

.swiper-pagination-custom {
  position: absolute;
  bottom: 10px;
  left: 0;
  right: 0;
  display: flex;
  justify-content: center;
  gap: 8px;
  z-index: 10;
  
  .swiper-pagination-bullet {
    width: 10px;
    height: 10px;
    background: white;
    opacity: 0.5;
    border-radius: 50%;
    transition: all 0.3s ease;
    
    &-active {
      opacity: 1;
      background: white;
      transform: scale(1.2);
    }
  }
}
```

## Características Implementadas

### 1. **Navegación**
- Botones de anterior/siguiente personalizados
- Estilo circular con fondo semitransparente
- Efectos hover

### 2. **Paginación**
- Bullets personalizados
- Posicionamiento en la parte inferior
- Animaciones de transición

### 3. **Efecto de Transición**
- **Efecto Fade**: Transiciones suaves entre slides
- **CrossFade**: Efecto de desvanecimiento cruzado

### 4. **Responsividad**
- Breakpoints configurados para diferentes tamaños de pantalla
- 1 slide por vista en todos los breakpoints

### 5. **Accesibilidad**
- Navegación por teclado
- Indicadores visuales claros
- Textos alternativos en imágenes

## Datos del Slider

Los proyectos se obtienen del servicio `ProjectsService`:

```typescript
export interface Project {
  title: string;
  description: string;
  tech: string[];
  link: string;
  images: string[]; // Array de imágenes para el slider
  website?: string;
  clientName?: string;
  instagram?: string;
}
```

### Proyectos Actuales:
1. **Lautaro Vulcano** - 3 imágenes
2. **Eventloop** - 3 imágenes

## Ventajas de Swiper

1. **Performance**: Optimizado para rendimiento
2. **Flexibilidad**: API extensa y configurable
3. **Accesibilidad**: Soporte nativo para navegación por teclado
4. **Touch**: Soporte completo para gestos táctiles
5. **Angular Integration**: Integración nativa con Angular
6. **Customizable**: Altamente personalizable con CSS

## Consideraciones Técnicas

### Elementos Personalizados
Swiper utiliza Web Components (elementos personalizados) que requieren:
- Registro explícito con `register()`
- Schema `CUSTOM_ELEMENTS_SCHEMA` en el componente

### Optimización de Imágenes
- Las imágenes se cargan con `object-cover` para mantener proporciones
- Aspect ratio de video (16:9) para consistencia visual

### Prevención de Zoom
El proyecto incluye configuraciones para prevenir zoom en dispositivos móviles, lo que mejora la experiencia del slider táctil.

## Archivos Relacionados

- `src/app/sections/projects/projects.component.ts` - Lógica del componente
- `src/app/sections/projects/projects.component.html` - Template
- `src/app/services/projects.service.ts` - Datos de proyectos
- `src/styles.scss` - Estilos globales del slider
- `package.json` - Dependencia de Swiper

---

*Documento generado para el portfolio de Adrian Cabello - Senior Frontend Developer*


