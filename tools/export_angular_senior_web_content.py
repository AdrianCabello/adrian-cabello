from __future__ import annotations

import json
import re
import unicodedata
from pathlib import Path

from build_angular_senior_guide import (
    chapters,
    foundation_chapters,
    foundation_rapid_fire,
    rapid_fire,
)
from angular_senior_ai_chapters import AI_CHAPTERS
from angular_senior_practice_cases import PRACTICE_CASES
from angular_senior_code_challenges import (
    CODE_CHALLENGE_DRILLS,
    CODE_CHALLENGE_FORMATS,
    CODE_CHALLENGE_MOCK,
    CODE_CHALLENGE_RUBRIC,
)


ROOT = Path(__file__).resolve().parents[1]
OUTPUT = ROOT / "src/app/pages/angular-senior-guide/angular-senior-guide.data.ts"


GROUPS = [
    {
        "id": "fundamentos-web",
        "index": "01",
        "title": "Fundamentos web",
        "description": "HTML, CSS, JavaScript y TypeScript, desde la base hasta preguntas avanzadas.",
    },
    {
        "id": "angular-core",
        "index": "02",
        "title": "Angular moderno",
        "description": "Componentes, reactividad, DI, RxJS, routing, forms y HTTP.",
    },
    {
        "id": "arquitectura",
        "index": "03",
        "title": "Plataforma y arquitectura",
        "description": "Browser, DOM, red, límites, patrones, SOLID y evolución del código.",
    },
    {
        "id": "calidad-operacion",
        "index": "04",
        "title": "Calidad y operación",
        "description": "Performance, rendering, testing, seguridad, CI/CD y observabilidad.",
    },
    {
        "id": "criterio-senior",
        "index": "05",
        "title": "Criterio Senior",
        "description": "System design, liderazgo y conversaciones de entrevista.",
    },
    {
        "id": "inteligencia-artificial",
        "index": "06",
        "title": "Inteligencia artificial",
        "description": "Modelos, RAG, agentes, MCP, evals, seguridad y productos con IA.",
    },
]


RAPID_TOPIC_ASSIGNMENTS = [
    (range(1, 14), "JavaScript: tipos, coerción, scope y funciones"),
    (range(14, 23), "JavaScript: objetos, prototipos, arrays y programación funcional"),
    (range(23, 29), "JavaScript asíncrono: event loop, Promises y errores"),
    (range(29, 41), "Browser internals, DOM, storage y red"),
    (range(41, 48), "HTML completo: semántica, formularios, medios y SEO"),
    (range(48, 61), "CSS completo: cascade, layout, responsive y rendimiento"),
    (range(61, 64), "Componentes, templates y composición"),
    (range(66, 73), "RxJS y concurrencia"),
    (range(73, 77), "Dependency Injection en profundidad"),
    (range(77, 81), "Change detection, Signals y zoneless"),
    (range(82, 85), "Routing y navegación"),
    (range(85, 88), "Formularios complejos"),
    (range(88, 90), "HTTP, APIs, errores y caché"),
    (range(90, 94), "Seguridad web en Angular"),
    (range(94, 98), "SSR, SSG, hidratación y rendering híbrido"),
    (range(98, 101), "Rendimiento y Core Web Vitals"),
    (range(101, 103), "Build, CI/CD, configuración y upgrades"),
    (range(103, 107), "Estado: local, servicios, Signals y NgRx"),
    (range(107, 112), "Patrones, SOLID y calidad de diseño"),
    (range(112, 114), "TypeScript avanzado"),
    (range(118, 122), "Testing y estrategia de calidad"),
    (range(122, 124), "Observabilidad, errores y debugging"),
]

RAPID_TOPIC_OVERRIDES = {
    64: "Change detection, Signals y zoneless",
    65: "Estado: local, servicios, Signals y NgRx",
    81: "Angular: fundamentos, renderizado y versiones",
    114: "JavaScript asíncrono: event loop, Promises y errores",
    115: "JavaScript: tipos, coerción, scope y funciones",
    116: "JavaScript: objetos, prototipos, arrays y programación funcional",
    117: "JavaScript: objetos, prototipos, arrays y programación funcional",
    124: "Build, CI/CD, configuración y upgrades",
    125: "Arquitectura de aplicaciones Angular",
    126: "Arquitectura de aplicaciones Angular",
}

REDUNDANT_RAPID_QUESTIONS = {
    "¿Media o container query?",
    "¿Shallow copy?",
    "¿Cold observable?",
}


REFERENCES = [
    {"label": "Angular · Releases", "url": "https://angular.dev/reference/releases"},
    {"label": "Angular · Signals", "url": "https://angular.dev/guide/signals"},
    {"label": "Angular · Zoneless", "url": "https://angular.dev/guide/zoneless"},
    {"label": "Angular · Control flow", "url": "https://angular.dev/guide/templates/control-flow"},
    {"label": "Angular · Rendering strategies", "url": "https://angular.dev/guide/routing/rendering-strategies"},
    {"label": "Angular · Testing", "url": "https://angular.dev/guide/testing"},
    {"label": "Angular · Security", "url": "https://angular.dev/best-practices/security"},
    {"label": "MDN · Web platform", "url": "https://developer.mozilla.org/"},
    {"label": "OpenAI · API documentation", "url": "https://platform.openai.com/docs/overview"},
    {"label": "Anthropic · Claude documentation", "url": "https://docs.anthropic.com/"},
    {"label": "Google · Gemini API", "url": "https://ai.google.dev/gemini-api/docs"},
    {"label": "Model Context Protocol", "url": "https://modelcontextprotocol.io/docs/getting-started/intro"},
]


TOPIC_REFERENCES: dict[str, list[dict[str, str]]] = {
    "HTML completo: semántica, formularios, medios y SEO": [
        {"label": "MDN · HTML", "url": "https://developer.mozilla.org/docs/Web/HTML"},
    ],
    "CSS completo: cascade, layout, responsive y rendimiento": [
        {"label": "MDN · CSS", "url": "https://developer.mozilla.org/docs/Web/CSS"},
    ],
    "JavaScript: tipos, coerción, scope y funciones": [
        {"label": "MDN · JavaScript", "url": "https://developer.mozilla.org/docs/Web/JavaScript"},
    ],
    "JavaScript: objetos, prototipos, arrays y programación funcional": [
        {"label": "MDN · JavaScript objects", "url": "https://developer.mozilla.org/docs/Web/JavaScript/Guide/Working_with_objects"},
    ],
    "JavaScript asíncrono: event loop, Promises y errores": [
        {"label": "MDN · Asynchronous JavaScript", "url": "https://developer.mozilla.org/docs/Learn_web_development/Extensions/Async_JS"},
        {"label": "RxJS · Observable", "url": "https://rxjs.dev/guide/observable"},
    ],
    "TypeScript avanzado": [
        {"label": "TypeScript · Handbook", "url": "https://www.typescriptlang.org/docs/handbook/intro.html"},
    ],
    "Angular: fundamentos, renderizado y versiones": [
        {"label": "Angular · Essentials", "url": "https://angular.dev/essentials"},
        {"label": "Angular · Releases", "url": "https://angular.dev/reference/releases"},
        {"label": "Angular · Version compatibility", "url": "https://angular.dev/reference/versions"},
    ],
    "Componentes, templates y composición": [
        {"label": "Angular · Templates", "url": "https://angular.dev/guide/templates"},
        {"label": "Angular · Programmatic rendering", "url": "https://angular.dev/guide/components/programmatic-rendering"},
        {"label": "Angular · Internationalization", "url": "https://angular.dev/guide/i18n"},
        {"label": "Angular · Animations", "url": "https://angular.dev/guide/animations"},
    ],
    "Ciclo de vida y render hooks": [
        {"label": "Angular · Lifecycle", "url": "https://angular.dev/guide/components/lifecycle"},
    ],
    "Change detection, Signals y zoneless": [
        {"label": "Angular · Signals", "url": "https://angular.dev/guide/signals"},
        {"label": "Angular · Zoneless", "url": "https://angular.dev/guide/zoneless"},
        {"label": "Angular · RxJS interop", "url": "https://angular.dev/ecosystem/rxjs-interop"},
    ],
    "Dependency Injection en profundidad": [
        {"label": "Angular · Dependency Injection", "url": "https://angular.dev/guide/di"},
    ],
    "RxJS y concurrencia": [
        {"label": "RxJS · Operator decision tree", "url": "https://rxjs.dev/operator-decision-tree"},
    ],
    "Estado: local, servicios, Signals y NgRx": [
        {"label": "Angular · Signals", "url": "https://angular.dev/guide/signals"},
        {"label": "NgRx · Guide", "url": "https://ngrx.io/guide/store"},
    ],
    "Routing y navegación": [
        {"label": "Angular · Routing", "url": "https://angular.dev/guide/routing"},
    ],
    "Formularios complejos": [
        {"label": "Angular · Forms", "url": "https://angular.dev/guide/forms"},
        {"label": "Angular · Signal Forms", "url": "https://angular.dev/guide/forms/signals/overview"},
    ],
    "HTTP, APIs, errores y caché": [
        {"label": "Angular · HTTP", "url": "https://angular.dev/guide/http"},
    ],
    "Rendimiento y Core Web Vitals": [
        {"label": "web.dev · Web Vitals", "url": "https://web.dev/articles/vitals"},
        {"label": "Angular · Optimizing images", "url": "https://angular.dev/guide/image-optimization"},
    ],
    "SSR, SSG, hidratación y rendering híbrido": [
        {"label": "Angular · SSR", "url": "https://angular.dev/guide/ssr"},
        {"label": "Angular · Hydration", "url": "https://angular.dev/guide/hydration"},
    ],
    "Testing y estrategia de calidad": [
        {"label": "Angular · Testing", "url": "https://angular.dev/guide/testing"},
    ],
    "Seguridad web en Angular": [
        {"label": "Angular · Security", "url": "https://angular.dev/best-practices/security"},
        {"label": "OWASP · Cheat sheets", "url": "https://cheatsheetseries.owasp.org/"},
    ],
    "Accesibilidad, HTML y CSS": [
        {"label": "WAI · ARIA Practices", "url": "https://www.w3.org/WAI/ARIA/apg/"},
        {"label": "W3C · WCAG 2.2", "url": "https://www.w3.org/TR/WCAG22/"},
    ],
    "Build, CI/CD, configuración y upgrades": [
        {"label": "Angular · Build", "url": "https://angular.dev/tools/cli/build"},
        {"label": "Angular · Build system migration", "url": "https://angular.dev/tools/cli/build-system-migration"},
    ],
    "IA generativa y panorama de modelos": [
        {"label": "OpenAI · Models", "url": "https://platform.openai.com/docs/models"},
        {"label": "Anthropic · Models overview", "url": "https://docs.anthropic.com/en/docs/about-claude/models/overview"},
        {"label": "Google · Gemini models", "url": "https://ai.google.dev/gemini-api/docs/models"},
    ],
    "Tokens, contexto, prompting y salidas estructuradas": [
        {"label": "OpenAI · Prompt engineering", "url": "https://platform.openai.com/docs/guides/prompt-engineering"},
        {"label": "OpenAI · Structured Outputs", "url": "https://platform.openai.com/docs/guides/structured-outputs"},
        {"label": "Anthropic · Prompt engineering", "url": "https://docs.anthropic.com/en/docs/build-with-claude/prompt-engineering/overview"},
    ],
    "Embeddings, búsqueda semántica y RAG": [
        {"label": "OpenAI · Retrieval", "url": "https://platform.openai.com/docs/guides/retrieval"},
        {"label": "Google · Embeddings", "url": "https://ai.google.dev/gemini-api/docs/embeddings"},
    ],
    "Tool calling, agentes y memoria": [
        {"label": "OpenAI · Function calling", "url": "https://platform.openai.com/docs/guides/function-calling"},
        {"label": "Anthropic · Tool use", "url": "https://docs.anthropic.com/en/docs/agents-and-tools/tool-use/overview"},
    ],
    "Skills, automatizaciones, plugins y MCP": [
        {"label": "MCP · Architecture", "url": "https://modelcontextprotocol.io/specification/latest/architecture"},
        {"label": "MCP · Server concepts", "url": "https://modelcontextprotocol.io/docs/learn/server-concepts"},
    ],
    "Arquitectura de productos con IA y Angular": [
        {"label": "OpenAI · Streaming", "url": "https://platform.openai.com/docs/guides/streaming-responses"},
        {"label": "Angular · Security", "url": "https://angular.dev/best-practices/security"},
    ],
    "Evals, observabilidad, costo y operación": [
        {"label": "OpenAI · Evaluation best practices", "url": "https://platform.openai.com/docs/guides/evaluation-best-practices"},
        {"label": "OpenAI · Evals", "url": "https://platform.openai.com/docs/guides/evals"},
    ],
    "Seguridad, privacidad y uso responsable de IA": [
        {"label": "OWASP · LLM Top 10", "url": "https://genai.owasp.org/llm-top-10/"},
        {"label": "MCP · Security best practices", "url": "https://modelcontextprotocol.io/specification/latest/basic/security_best_practices"},
    ],
    "Entrevista y system design para AI Engineer": [
        {"label": "OpenAI · Production best practices", "url": "https://platform.openai.com/docs/guides/production-best-practices"},
        {"label": "Google · Responsible generative AI", "url": "https://ai.google.dev/responsible"},
    ],
}


GROUP_REFERENCES: dict[str, list[dict[str, str]]] = {
    "fundamentos-web": [
        {"label": "MDN · Web platform", "url": "https://developer.mozilla.org/"},
    ],
    "angular-core": [
        {"label": "Angular · Documentation", "url": "https://angular.dev/overview"},
    ],
    "arquitectura": [
        {"label": "Angular · Style guide", "url": "https://angular.dev/style-guide"},
    ],
    "calidad-operacion": [
        {"label": "web.dev · Learn performance", "url": "https://web.dev/learn/performance"},
    ],
    "criterio-senior": [
        {"label": "Google · Engineering practices", "url": "https://google.github.io/eng-practices/"},
    ],
    "inteligencia-artificial": [
        {"label": "OpenAI · API documentation", "url": "https://platform.openai.com/docs/overview"},
        {"label": "Anthropic · Claude documentation", "url": "https://docs.anthropic.com/"},
        {"label": "Google · Gemini API", "url": "https://ai.google.dev/gemini-api/docs"},
        {"label": "Model Context Protocol", "url": "https://modelcontextprotocol.io/docs/getting-started/intro"},
    ],
}


CUSTOM_SECTION_TITLES: dict[str, list[str]] = {
    "HTML completo: semántica, formularios, medios y SEO": ["Documento y semántica", "Formularios y contenido", "Carga, SEO y accesibilidad"],
    "CSS completo: cascade, layout, responsive y rendimiento": ["Cascada y box model", "Layout y responsive", "Composición y rendimiento"],
    "JavaScript: tipos, coerción, scope y funciones": ["Tipos y conversiones", "Scope, hoisting y closures", "Funciones, this y decisiones"],
    "JavaScript asíncrono: event loop, Promises y errores": ["Modelo de ejecución", "Promise y async/await", "Observable y streams", "Cancelación, errores y rendimiento"],
    "TypeScript avanzado": ["Sistema de tipos", "Narrowing y modelado", "Tipos calculados y generics", "Runtime y configuración"],
    "Angular: fundamentos, renderizado y versiones": ["Modelo de Angular", "Templates y actualización del DOM", "Angular moderno", "Versiones y migraciones"],
    "Componentes, templates y composición": ["Contrato del componente", "Templates y fragmentos", "Composición y render dinámico", "Rendimiento del template"],
    "Change detection, Signals y zoneless": ["Recorrido y notificaciones", "Signals y estado derivado", "OnPush y zoneless", "Diagnóstico y rendimiento"],
    "RxJS y concurrencia": ["Contrato Observable", "Operadores y concurrencia", "Errores y teardown", "Sharing y caché"],
    "IA generativa y panorama de modelos": ["Fundamentos", "Familias y capacidades", "Selección y trade-offs"],
    "Tokens, contexto, prompting y salidas estructuradas": ["Tokens y ventana de contexto", "Diseño de prompts", "Contratos y operación"],
    "Embeddings, búsqueda semántica y RAG": ["Indexación y recuperación", "Calidad del contexto", "Evaluación y seguridad"],
    "Tool calling, agentes y memoria": ["Tools y workflows", "Loops agentic y memoria", "Control y confiabilidad"],
    "Skills, automatizaciones, plugins y MCP": ["Capas de extensibilidad", "Arquitectura MCP", "Diseño, permisos y evaluación"],
    "Arquitectura de productos con IA y Angular": ["Fronteras y estado", "Streaming y experiencia", "Seguridad, costo y resiliencia"],
    "Evals, observabilidad, costo y operación": ["Diseño de evals", "Métricas y experimentos", "Trazas, costo y fallos"],
    "Seguridad, privacidad y uso responsable de IA": ["Amenazas y autorización", "Datos y outputs", "Safety y control humano"],
    "Entrevista y system design para AI Engineer": ["Discovery y arquitectura", "Escala, fallos y rollout", "Preparación de entrevista"],
}

CUSTOM_SECTION_SIZES: dict[str, list[int]] = {
    "RxJS y concurrencia": [3, 7, 2, 2],
}


TOPIC_THEORY_EXAMPLES: dict[str, dict[str, list[dict[str, str]]]] = {
    "JavaScript asíncrono: event loop, Promises y errores": {
        "Modelo de ejecución": [
            {
                "title": "Event loop: task, microtasks y render",
                "description": "El stack síncrono termina primero; después se vacían todas las microtasks y recién entonces puede ejecutarse otra task. El orden esperado es A, D, C, B.",
                "code": """console.log('A');

setTimeout(() => console.log('B'), 0);

Promise.resolve().then(() => console.log('C'));

console.log('D');

// A
// D
// C  ← microtask
// B  ← siguiente task""",
            },
        ],
        "Promise y async/await": [
            {
                "title": "await secuencial frente a Promise.all",
                "description": "Si ambas operaciones son independientes, iniciarlas juntas evita sumar sus latencias. La versión secuencial sigue siendo correcta cuando la segunda necesita el resultado de la primera.",
                "code": """// Secuencial: ~800 ms + ~600 ms
const user = await loadUser();
const permissions = await loadPermissions();

// Concurrente: aproximadamente la operación más lenta
const [user, permissions] = await Promise.all([
  loadUser(),
  loadPermissions(),
]);""",
            },
        ],
        "Observable y streams": [
            {
                "title": "Observable con teardown real",
                "description": "Desuscribirse sólo detiene el trabajo cuando el producer registra cómo limpiarlo. Aquí cada suscripción crea y destruye su propio intervalo.",
                "code": """const ticks$ = new Observable<number>(subscriber => {
  let value = 0;
  const timerId = setInterval(() => subscriber.next(value++), 1000);

  return () => clearInterval(timerId);
});

const subscription = ticks$.subscribe(console.log);
setTimeout(() => subscription.unsubscribe(), 3500);""",
            },
        ],
        "Cancelación, errores y rendimiento": [
            {
                "title": "Evitar una respuesta obsoleta con AbortController",
                "description": "Cada búsqueda cancela la request anterior. También se verifica la respuesta porque cancelar es una petición cooperativa y el trabajo remoto podría haber avanzado.",
                "code": """let activeController: AbortController | undefined;

async function search(query: string) {
  activeController?.abort();
  const controller = new AbortController();
  activeController = controller;

  try {
    const response = await fetch(`/api/search?q=${encodeURIComponent(query)}`, {
      signal: controller.signal,
    });
    return await response.json();
  } catch (error) {
    if (controller.signal.aborted) return [];
    throw error;
  }
}""",
            },
        ],
    },
    "TypeScript avanzado": {
        "Sistema de tipos": [
            {
                "title": "unknown obliga a validar; any propaga el riesgo",
                "description": "Los datos externos siguen siendo unknown hasta demostrar su forma en runtime. Una anotación TypeScript no transforma ni valida la respuesta recibida.",
                "code": """function readUser(value: unknown): User {
  if (
    typeof value !== 'object' ||
    value === null ||
    !('id' in value) ||
    typeof value.id !== 'string' ||
    !('name' in value) ||
    typeof value.name !== 'string'
  ) {
    throw new Error('Invalid user payload');
  }

  return { id: value.id, name: value.name };
}""",
            },
        ],
        "Narrowing y modelado": [
            {
                "title": "Discriminated union sin estados imposibles",
                "description": "El discriminante status habilita únicamente los campos válidos para cada estado y evita combinar loading, data y error como booleanos independientes.",
                "code": """type LoadState<T> =
  | { status: 'idle' }
  | { status: 'loading' }
  | { status: 'success'; data: T }
  | { status: 'error'; error: string };

function message(state: LoadState<User[]>): string {
  switch (state.status) {
    case 'idle': return 'Sin iniciar';
    case 'loading': return 'Cargando';
    case 'success': return `${state.data.length} usuarios`;
    case 'error': return state.error;
  }
}""",
            },
        ],
        "Tipos calculados y generics": [
            {
                "title": "Generic que conserva la relación entre key y valor",
                "description": "El parámetro K relaciona la clave elegida con el tipo exacto de esa propiedad. Con string y unknown esa relación se perdería.",
                "code": """function updateField<T, K extends keyof T>(
  source: T,
  key: K,
  value: T[K]
): T {
  return { ...source, [key]: value };
}

const user = { id: 1, name: 'Ana' };
updateField(user, 'name', 'Luis'); // correcto
updateField(user, 'id', 'oops');  // error de compilación""",
            },
        ],
        "Runtime y configuración": [
            {
                "title": "satisfies valida sin ensanchar los literales",
                "description": "satisfies comprueba el contrato completo y conserva las claves y valores concretos inferidos, algo útil para configuración tipada.",
                "code": """type RouteConfig = Record<
  string,
  { path: `/${string}`; requiresAuth: boolean }
>;

const routes = {
  home: { path: '/home', requiresAuth: false },
  admin: { path: '/admin', requiresAuth: true },
} satisfies RouteConfig;

// Se conserva el literal '/admin', no sólo string.
const adminPath = routes.admin.path;""",
            },
        ],
    },
    "Ciclo de vida y render hooks": {
        "Modelo mental": [
            {
                "title": "Input derivado con computed en lugar de sincronización manual",
                "description": "Cuando el resultado depende únicamente de un signal input, computed conserva una sola fuente de verdad. ngOnChanges queda para comparar transiciones o coordinar trabajo imperativo.",
                "code": """@Component({
  selector: 'app-price',
  template: `<strong>{{ formattedPrice() }}</strong>`,
})
export class PriceComponent {
  readonly amount = input.required<number>();
  readonly currency = input('EUR');

  readonly formattedPrice = computed(() =>
    new Intl.NumberFormat('es-AR', {
      style: 'currency',
      currency: this.currency(),
    }).format(this.amount())
  );
}""",
            },
        ],
        "Funcionamiento y APIs": [
            {
                "title": "afterNextRender separa escritura y lectura del layout",
                "description": "Primero se modifica el DOM y después se mide. Separar las fases evita intercalar escrituras con lecturas geométricas que fuerzan layout repetidamente.",
                "code": """private readonly panel = viewChild.required<ElementRef>('panel');

constructor() {
  afterNextRender({
    write: () => {
      this.panel().nativeElement.classList.add('is-ready');
      return true;
    },
    read: didWrite => {
      if (didWrite) {
        this.height.set(this.panel().nativeElement.getBoundingClientRect().height);
      }
    },
  });
}""",
            },
        ],
        "Decisiones, riesgos y verificación": [
            {
                "title": "DestroyRef mantiene el cleanup junto al recurso",
                "description": "El observer nace y se destruye en el mismo bloque conceptual. Esto evita dejar listeners vivos cuando el componente desaparece.",
                "code": """private readonly host = inject(ElementRef<HTMLElement>);
private readonly destroyRef = inject(DestroyRef);

constructor() {
  const observer = new ResizeObserver(entries => {
    this.width.set(entries[0].contentRect.width);
  });

  observer.observe(this.host.nativeElement);
  this.destroyRef.onDestroy(() => observer.disconnect());
}""",
            },
        ],
    },
    "Estado: local, servicios, Signals y NgRx": {
        "Modelo mental": [
            {
                "title": "Estado efímero cerca del componente",
                "description": "La apertura del panel sólo le importa a esta vista. Llevarla a un store global añadiría acciones, selectors y coordinación sin aportar un consumidor real.",
                "code": """@Component({
  template: `
    <button type="button" (click)="toggle()">Filtros</button>
    @if (filtersOpen()) { <app-filters /> }
  `,
})
export class ProductPage {
  readonly filtersOpen = signal(false);

  toggle() {
    this.filtersOpen.update(open => !open);
  }
}""",
            },
        ],
        "Funcionamiento y APIs": [
            {
                "title": "Servicio de feature con escritura encapsulada",
                "description": "Las vistas leen signals readonly y sólo el servicio modifica la fuente. El total sigue siendo una derivación, no una copia sincronizada.",
                "code": """@Injectable()
export class CartStore {
  private readonly itemsState = signal<CartItem[]>([]);

  readonly items = this.itemsState.asReadonly();
  readonly total = computed(() =>
    this.items().reduce((sum, item) => sum + item.price, 0)
  );

  add(item: CartItem) {
    this.itemsState.update(items => [...items, item]);
  }
}""",
            },
        ],
        "Decisiones, riesgos y verificación": [
            {
                "title": "Cuándo el mismo flujo justifica NgRx",
                "description": "Cuando varias pantallas reaccionan al mismo hecho, una action de dominio permite coordinar reducer y effects de forma observable. Para un único componente sería complejidad innecesaria.",
                "code": """export const orderSubmitted = createAction(
  '[Checkout] Order Submitted',
  props<{ order: Order }>()
);

export const checkoutReducer = createReducer(
  initialState,
  on(orderSubmitted, state => ({ ...state, status: 'submitting' }))
);

submitOrder$ = createEffect(() =>
  this.actions$.pipe(
    ofType(orderSubmitted),
    concatMap(({ order }) => this.api.submit(order))
  )
);""",
            },
        ],
    },
    "Formularios complejos": {
        "Modelo mental": [
            {
                "title": "Formulario tipado con contrato explícito",
                "description": "NonNullableFormBuilder evita que controles requeridos produzcan null. El tipo de los controles queda separado del DTO que finalmente se envía.",
                "code": """private readonly fb = inject(NonNullableFormBuilder);

readonly form = this.fb.group({
  name: ['', [Validators.required, Validators.maxLength(80)]],
  email: ['', [Validators.required, Validators.email]],
  notifications: this.fb.group({
    product: [true],
    marketing: [false],
  }),
});

submit() {
  if (this.form.invalid) return;
  const value = this.form.getRawValue();
  this.api.save(value);
}""",
            },
        ],
        "Funcionamiento y APIs": [
            {
                "title": "Validator cruzado colocado en el grupo",
                "description": "La regla compara dos controles, por eso pertenece al FormGroup. El error describe la relación sin marcar individualmente como inválido un valor correcto.",
                "code": """const passwordsMatch: ValidatorFn = control => {
  const password = control.get('password')?.value;
  const confirmation = control.get('confirmation')?.value;
  return password === confirmation ? null : { passwordsMismatch: true };
};

readonly form = this.fb.group(
  {
    password: ['', Validators.required],
    confirmation: ['', Validators.required],
  },
  { validators: passwordsMatch }
);""",
            },
        ],
        "Decisiones, riesgos y verificación": [
            {
                "title": "FormArray tipado para filas dinámicas",
                "description": "Cada fila conserva su estructura de controles y una identidad de dominio. El índice sirve para acceder al control, no como identidad persistente del dato.",
                "code": """type AddressControls = {
  id: FormControl<string>;
  street: FormControl<string>;
};

readonly addresses = new FormArray<FormGroup<AddressControls>>([]);

addAddress() {
  this.addresses.push(
    this.fb.group({
      id: crypto.randomUUID(),
      street: ['', Validators.required],
    })
  );
}""",
            },
        ],
    },
    "HTTP, APIs, errores y caché": {
        "Modelo mental": [
            {
                "title": "Interceptor funcional que no filtra credenciales",
                "description": "El token se agrega sólo a la API propia. Clonar toda request sin comprobar destino podría enviar autorización a URLs de terceros.",
                "code": """export const authInterceptor: HttpInterceptorFn = (request, next) => {
  const session = inject(SessionService);
  const apiUrl = inject(API_URL);

  if (!request.url.startsWith(apiUrl)) {
    return next(request);
  }

  return next(request.clone({
    setHeaders: { Authorization: `Bearer ${session.token()}` },
  }));
};""",
            },
        ],
        "Funcionamiento y APIs": [
            {
                "title": "switchMap cancela la búsqueda HTTP anterior",
                "description": "Cada consulta nueva desuscribe la request anterior de HttpClient. catchError está dentro para que un fallo puntual no termine el buscador completo.",
                "code": """readonly results$ = this.query.valueChanges.pipe(
  debounceTime(250),
  distinctUntilChanged(),
  switchMap(query =>
    this.http.get<Result[]>('/api/search', {
      params: { q: query },
    }).pipe(
      catchError(() => of([]))
    )
  )
);""",
            },
        ],
        "Decisiones, riesgos y verificación": [
            {
                "title": "Caché con invalidación explícita después de escribir",
                "description": "La lectura se comparte, pero guardar invalida deliberadamente el valor anterior. La caché tiene un evento de renovación en lugar de depender de una duración accidental.",
                "code": """private readonly refresh$ = new BehaviorSubject<void>(undefined);

readonly products$ = this.refresh$.pipe(
  switchMap(() => this.http.get<Product[]>('/api/products')),
  shareReplay({ bufferSize: 1, refCount: true })
);

save(product: Product) {
  return this.http.post('/api/products', product).pipe(
    tap(() => this.refresh$.next())
  );
}""",
            },
        ],
    },
    "Dependency Injection en profundidad": {
        "Modelo mental": [
            {
                "title": "El lugar del provider define la instancia",
                "description": "Un provider root comparte estado en toda la aplicación. Declararlo en el componente crea una instancia aislada para cada subárbol.",
                "code": """@Injectable({ providedIn: 'root' })
export class GlobalSession {}

@Component({
  selector: 'app-editor',
  providers: [DraftStore],
  template: `<app-toolbar /><app-canvas />`,
})
export class Editor {
  // Toolbar y Canvas descendientes comparten este DraftStore.
  // Otro <app-editor> recibe una instancia diferente.
}""",
            },
        ],
        "Funcionamiento y APIs": [
            {
                "title": "useExisting reutiliza; useClass crea otra instancia",
                "description": "useExisting crea un alias al mismo objeto. Reemplazarlo por useClass construiría una segunda instancia y separaría accidentalmente el estado.",
                "code": """abstract class Logger {
  abstract log(message: string): void;
}

@Injectable()
class JsonLogger implements Logger {
  log(message: string) { /* ... */ }
}

const providers = [
  JsonLogger,
  { provide: Logger, useExisting: JsonLogger },
];

// inject(Logger) === inject(JsonLogger)""",
            },
        ],
        "Decisiones, riesgos y verificación": [
            {
                "title": "skipSelf para extender un contrato del ancestro",
                "description": "El componente obtiene la configuración superior y publica una versión especializada para sus descendientes sin intentar inyectarse a sí mismo.",
                "code": """const FEATURE_CONFIG = new InjectionToken<FeatureConfig>('FEATURE_CONFIG');

@Component({
  providers: [
    {
      provide: FEATURE_CONFIG,
      useFactory: () => {
        const parent = inject(FEATURE_CONFIG, { skipSelf: true });
        return { ...parent, pageSize: 20 };
      },
    },
  ],
})
export class ResultsPage {}""",
            },
        ],
    },
    "RxJS y concurrencia": {
        "Contrato Observable": [
            {
                "title": "catchError interno conserva vivo el buscador",
                "description": "El error se recupera dentro de switchMap, por lo que una request fallida no termina valueChanges y la siguiente consulta todavía funciona.",
                "code": """readonly results$ = this.search.valueChanges.pipe(
  debounceTime(250),
  distinctUntilChanged(),
  switchMap(query =>
    this.api.search(query).pipe(
      catchError(() => of([]))
    )
  )
);

// Si catchError estuviera después de switchMap,
// el reemplazo completaría el flujo exterior.""",
            },
        ],
        "Operadores y concurrencia": [
            {
                "title": "Cuatro flattening operators, cuatro políticas",
                "description": "La elección depende de qué hacer con trabajos solapados: reemplazar, ordenar, ejecutar juntos o ignorar nuevos intentos.",
                "code": """query$.pipe(switchMap(q => search(q)));       // reemplaza la búsqueda
drafts$.pipe(concatMap(d => save(d)));       // guarda en orden
files$.pipe(mergeMap(f => upload(f), 3));    // hasta 3 concurrentes
submit$.pipe(exhaustMap(() => checkout()));  // ignora doble submit""",
            },
            {
                "title": "map transforma valores; switchMap aplana Observables",
                "description": "map sirve cuando la proyección devuelve un valor común. Si devuelve un Observable, switchMap gestiona la suscripción interna y evita el subscribe anidado.",
                "code": """// Observable<string>
const normalized$ = query$.pipe(
  map(query => query.trim().toLowerCase())
);

// Observable<Result[]>: aplana la request interna
const results$ = query$.pipe(
  map(query => query.trim()),
  filter(query => query.length >= 2),
  switchMap(query => api.search(query))
);

// Anti-patrón: subscribe dentro de subscribe
// query$.subscribe(q => api.search(q).subscribe(render));""",
            },
            {
                "title": "La misma secuencia produce comportamientos distintos",
                "description": "Si A tarda más que B y C, switchMap conserva C; concatMap entrega A, B y C en orden; mergeMap entrega según finalización; exhaustMap conserva A e ignora B y C mientras A siga activo.",
                "code": """// Fuente:     A────B────C
// Duración:   A────────|
//               B──|
//                    C─|

// switchMap:          C─|       (latest wins)
// concatMap:  A────────|B──|C─| (cola y orden)
// mergeMap:     B──|    C─| A|  (concurrencia)
// exhaustMap: A────────|         (ignora B y C)""",
            },
        ],
        "Errores y teardown": [
            {
                "title": "takeUntilDestroyed vincula el flujo al componente",
                "description": "La suscripción se completa al destruir el contexto de inyección. Los efectos externos siguen concentrados en tap y el pipeline conserva su teardown.",
                "code": """private readonly destroyRef = inject(DestroyRef);

ngOnInit() {
  fromEvent(window, 'resize')
    .pipe(
      auditTime(100),
      takeUntilDestroyed(this.destroyRef)
    )
    .subscribe(() => this.measureLayout());
}""",
            },
        ],
        "Sharing y caché": [
            {
                "title": "shareReplay no reemplaza una política de caché",
                "description": "El observable comparte una request entre consumidores activos, pero la invalidación continúa siendo explícita mediante refresh.",
                "code": """private readonly refresh$ = new Subject<void>();

readonly profile$ = this.refresh$.pipe(
  startWith(undefined),
  switchMap(() => this.http.get<Profile>('/api/profile')),
  shareReplay({ bufferSize: 1, refCount: true })
);

refreshProfile() {
  this.refresh$.next();
}""",
            },
        ],
    },
    "Change detection, Signals y zoneless": {
        "Recorrido y notificaciones": [
            {
                "title": "OnPush: nueva referencia frente a mutación",
                "description": "El hijo vuelve a comprobarse cuando recibe una referencia nueva. Mutar el mismo objeto conserva la identidad y puede dejar la vista desactualizada.",
                "code": """// Padre\nuser = { name: 'Ana' };\n\nrenameWrong() {\n  this.user.name = 'Luis';       // misma referencia\n}\n\nrenameCorrectly() {\n  this.user = { ...this.user, name: 'Luis' }; // nuevo input\n}\n\n// Hijo\n@Component({\n  changeDetection: ChangeDetectionStrategy.OnPush,\n  template: `<p>{{ user().name }}</p>`,\n})\nexport class UserCard {\n  user = input.required<User>();\n}""",
            },
        ],
        "Signals y estado derivado": [
            {
                "title": "Estado writable y derivación con computed",
                "description": "La consulta y los productos son fuentes de verdad. La lista visible se calcula sólo cuando alguna dependencia leída cambia.",
                "code": """readonly query = signal('');\nreadonly products = signal<Product[]>([]);\n\nreadonly visibleProducts = computed(() => {\n  const term = this.query().trim().toLowerCase();\n  if (!term) return this.products();\n\n  return this.products().filter(product =>\n    product.name.toLowerCase().includes(term)\n  );\n});\n\nclearQuery() {\n  this.query.set('');\n}\n\naddProduct(product: Product) {\n  this.products.update(products => [...products, product]);\n}""",
            },
            {
                "title": "computed para derivar; effect para una frontera externa",
                "description": "El total no se copia en otro signal. El efecto se reserva para sincronizar el valor final con una API no reactiva como localStorage.",
                "code": """readonly items = signal<CartItem[]>([]);\nreadonly total = computed(() =>\n  this.items().reduce((sum, item) => sum + item.price * item.quantity, 0)\n);\n\nconstructor() {\n  effect(() => {\n    localStorage.setItem('cart-total', String(this.total()));\n  });\n}\n\n// Anti-patrón: dos fuentes de verdad\n// effect(() => this.storedTotal.set(this.calculateTotal()));""",
            },
            {
                "title": "Dependencias dinámicas en computed",
                "description": "Cuando showDetails es false, el computed no lee details. Los cambios de details dejan de invalidar esa derivación hasta que la rama vuelva a leerlos.",
                "code": """readonly showDetails = signal(false);\nreadonly details = signal('Información costosa');\n\nreadonly label = computed(() => {\n  if (!this.showDetails()) return 'Detalles ocultos';\n  return this.details();\n});""",
            },
        ],
        "OnPush y zoneless": [
            {
                "title": "Object.is: mutación profunda frente a update inmutable",
                "description": "El primer método reutiliza exactamente el mismo objeto y no publica un cambio. El segundo crea una referencia nueva que el signal puede notificar.",
                "code": """readonly profile = signal({ name: 'Ana', online: false });\n\nsetOnlineWrong() {\n  this.profile().online = true;\n  this.profile.set(this.profile()); // Object.is: true, no notifica\n}\n\nsetOnlineCorrectly() {\n  this.profile.update(profile => ({ ...profile, online: true }));\n}""",
            },
            {
                "title": "untracked para una lectura incidental",
                "description": "El efecto depende del usuario actual. El contador sólo aporta contexto al log y no debe volver a ejecutar el efecto por sí solo.",
                "code": """readonly currentUser = signal<User | null>(null);\nreadonly counter = signal(0);\n\nconstructor() {\n  effect(() => {\n    const user = this.currentUser();\n    const clicksAtLogin = untracked(() => this.counter());\n\n    this.analytics.identify(user?.id, { clicksAtLogin });\n  });\n}""",
            },
        ],
        "Diagnóstico y rendimiento": [
            {
                "title": "Zoneless: actualizar mediante una API que notifica",
                "description": "Aunque la callback venga de una librería externa, escribir el valor en un signal leído por la plantilla agenda la actualización de la vista.",
                "code": """@Component({\n  changeDetection: ChangeDetectionStrategy.OnPush,\n  template: `<output>{{ progress() }}%</output>`,\n})\nexport class UploadProgress {\n  readonly progress = signal(0);\n\n  constructor(uploader: ExternalUploader) {\n    uploader.onProgress(value => this.progress.set(value));\n  }\n}""",
            },
            {
                "title": "RxJS para concurrencia; signal para la vista",
                "description": "RxJS resuelve debounce y cancelación de requests. toSignal entrega a la plantilla un estado síncrono con valor inicial.",
                "code": """readonly results = toSignal(\n  this.searchControl.valueChanges.pipe(\n    debounceTime(250),\n    distinctUntilChanged(),\n    switchMap(query => this.api.search(query))\n  ),\n  { initialValue: [] }\n);""",
            },
        ],
    },
}


def build_theory_sections(title: str, items: list[str], group_id: str) -> list[dict]:
    labels = CUSTOM_SECTION_TITLES.get(title)
    if labels is None:
        labels = (
            ["Modelo mental", "Funcionamiento y APIs", "Decisiones, riesgos y verificación"]
            if group_id == "angular-core"
            else ["Fundamentos", "Mecanismo y aplicación", "Decisiones y límites"]
        )
    section_count = min(len(labels), max(1, len(items)))
    custom_sizes = CUSTOM_SECTION_SIZES.get(title)
    if custom_sizes and sum(custom_sizes) != len(items):
        raise ValueError(
            f"Section sizes for {title!r} total {sum(custom_sizes)}, expected {len(items)}"
        )
    base, extra = divmod(len(items), section_count)
    sections = []
    cursor = 0
    for index in range(section_count):
        size = (
            custom_sizes[index]
            if custom_sizes
            else base + (1 if index < extra else 0)
        )
        section_title = labels[index]
        section = {"title": section_title, "items": items[cursor:cursor + size]}
        examples = TOPIC_THEORY_EXAMPLES.get(title, {}).get(section_title)
        if examples:
            section["examples"] = examples
        sections.append(section)
        cursor += size
    return sections


def clean_title(title: str) -> str:
    title = re.sub(r"^\d+\.\s*", "", title)
    return title


def slugify(value: str) -> str:
    ascii_value = unicodedata.normalize("NFKD", value).encode("ascii", "ignore").decode()
    return re.sub(r"[^a-z0-9]+", "-", ascii_value.lower()).strip("-")


def serialize_topic(chapter: dict, group_id: str, number: int) -> dict:
    title = clean_title(chapter["title"])
    theory = chapter["master"]
    return {
        "id": slugify(title),
        "number": f"{number:02d}",
        "groupId": group_id,
        "title": title,
        "intro": chapter["intro"],
        "theory": theory,
        "theorySections": build_theory_sections(title, theory, group_id),
        "questions": [
            {"question": question, "answer": answer}
            for question, answer in chapter["qa"]
        ],
        **({"code": chapter["code"]} if chapter.get("code") else {}),
        "references": TOPIC_REFERENCES.get(title, GROUP_REFERENCES[group_id]),
    }


def build_topics() -> list[dict]:
    ordered = [
        ("fundamentos-web", foundation_chapters[4]),
        ("fundamentos-web", foundation_chapters[5]),
        *[("fundamentos-web", chapter) for chapter in foundation_chapters[0:3]],
        ("fundamentos-web", chapters[2]),
        ("angular-core", chapters[1]),
        *[("angular-core", chapter) for chapter in chapters[3:12]],
        ("arquitectura", foundation_chapters[3]),
        *[("arquitectura", chapter) for chapter in chapters[12:14]],
        *[("calidad-operacion", chapter) for chapter in chapters[14:21]],
        *[("criterio-senior", chapter) for chapter in chapters[21:23]],
        ("criterio-senior", chapters[0]),
        ("criterio-senior", chapters[23]),
        *[("inteligencia-artificial", chapter) for chapter in AI_CHAPTERS],
    ]
    topics = [
        serialize_topic(chapter, group_id, index)
        for index, (group_id, chapter) in enumerate(ordered, 1)
    ]
    topics_by_title = {topic["title"]: topic for topic in topics}
    rapid_questions = foundation_rapid_fire + rapid_fire
    existing_question_texts = {
        item["question"]
        for topic in topics
        for item in topic["questions"]
    }

    for index, (question, answer) in enumerate(rapid_questions, 1):
        if question in REDUNDANT_RAPID_QUESTIONS:
            continue
        target_title = RAPID_TOPIC_OVERRIDES.get(index)
        if target_title is None:
            target_title = next(
                (
                    title
                    for indexes, title in RAPID_TOPIC_ASSIGNMENTS
                    if index in indexes
                ),
                None,
            )
        if target_title is None:
            raise ValueError(f"Rapid question {index} has no topic assignment")

        target = topics_by_title[target_title]
        if question in existing_question_texts:
            continue
        target["questions"].append(
            {
                "id": f"topic-{index:03d}-{slugify(question)}",
                "question": question,
                "answer": answer,
            }
        )
        existing_question_texts.add(question)

    return topics


def write_typescript() -> None:
    topics = build_topics()
    payloads = {
        "STUDY_GROUPS": GROUPS,
        "STUDY_TOPICS": topics,
        "PRACTICE_CASES": PRACTICE_CASES,
        "CODE_CHALLENGE_FORMATS": CODE_CHALLENGE_FORMATS,
        "CODE_CHALLENGE_DRILLS": CODE_CHALLENGE_DRILLS,
        "CODE_CHALLENGE_RUBRIC": CODE_CHALLENGE_RUBRIC,
        "CODE_CHALLENGE_MOCK": CODE_CHALLENGE_MOCK,
        "STUDY_REFERENCES": REFERENCES,
    }

    prelude = """// Generated from tools/build_angular_senior_guide.py. Do not edit by hand.\n\nexport interface StudyGroup {\n  readonly id: string;\n  readonly index: string;\n  readonly title: string;\n  readonly description: string;\n}\n\nexport interface StudyQuestion {\n  readonly id?: string;\n  readonly question: string;\n  readonly answer: string;\n}\n\nexport interface StudyReference {\n  readonly label: string;\n  readonly url: string;\n}\n\nexport interface TheoryExample {\n  readonly title: string;\n  readonly description: string;\n  readonly code: string;\n}\n\nexport interface TheorySection {\n  readonly title: string;\n  readonly items: readonly string[];\n  readonly examples?: readonly TheoryExample[];\n}\n\nexport interface StudyTopic {\n  readonly id: string;\n  readonly number: string;\n  readonly groupId: string;\n  readonly title: string;\n  readonly intro: string;\n  readonly theory: readonly string[];\n  readonly theorySections: readonly TheorySection[];\n  readonly questions: readonly StudyQuestion[];\n  readonly code?: string;\n  readonly references: readonly StudyReference[];\n}\n\nexport interface PracticeCase {\n  readonly title: string;\n  readonly brief: string;\n}\n\n"""
    code_challenge_types = """export interface CodeChallengeFormat {
  readonly id: string;
  readonly time: string;
  readonly title: string;
  readonly description: string;
}

export interface CodeChallengeDrill {
  readonly id: string;
  readonly priority: string;
  readonly time: string;
  readonly title: string;
  readonly prompt: string;
  readonly deliverables: readonly string[];
  readonly watch_for: string;
  readonly solution: string;
  readonly solution_code_title: string;
  readonly solution_code: string;
  readonly test_code_title: string;
  readonly test_code: string;
  readonly decisions: readonly string[];
}

export interface CodeChallengeRubricItem {
  readonly label: string;
  readonly weight: string;
}

export interface CodeChallengeMock {
  readonly title: string;
  readonly time: string;
  readonly brief: string;
  readonly requirements: readonly string[];
  readonly timeline: readonly { readonly time: string; readonly task: string }[];
  readonly starter_code: string;
}

"""
    prelude = prelude.replace(
        "export interface PracticeCase {",
        f"{code_challenge_types}export interface PracticeCase {{",
    )
    prelude = prelude.replace(
        "  readonly title: string;\n  readonly brief: string;\n}",
        "  readonly id: string;\n"
        "  readonly stack: readonly string[];\n"
        "  readonly title: string;\n"
        "  readonly brief: string;\n"
        "  readonly approach: string;\n"
        "  readonly code_title: string;\n"
        "  readonly code: string;\n"
        "  readonly checks: readonly string[];\n}",
    )
    types = {
        "STUDY_GROUPS": "readonly StudyGroup[]",
        "STUDY_TOPICS": "readonly StudyTopic[]",
        "PRACTICE_CASES": "readonly PracticeCase[]",
        "CODE_CHALLENGE_FORMATS": "readonly CodeChallengeFormat[]",
        "CODE_CHALLENGE_DRILLS": "readonly CodeChallengeDrill[]",
        "CODE_CHALLENGE_RUBRIC": "readonly CodeChallengeRubricItem[]",
        "CODE_CHALLENGE_MOCK": "CodeChallengeMock",
        "STUDY_REFERENCES": "readonly StudyReference[]",
    }
    output = [prelude]
    for name, value in payloads.items():
        output.append(
            f"export const {name}: {types[name]} = "
            + json.dumps(value, ensure_ascii=False, indent=2)
            + ";\n\n"
        )

    OUTPUT.parent.mkdir(parents=True, exist_ok=True)
    OUTPUT.write_text("".join(output).rstrip() + "\n", encoding="utf-8")
    print(OUTPUT)


if __name__ == "__main__":
    write_typescript()
