"""Worked examples rendered by the Angular senior guide."""

PRACTICE_CASES = [
    {
        "id": "buscador-cancelable",
        "stack": ["Angular", "RxJS", "Testing"],
        "title": "Buscador cancelable",
        "brief": "Buscador con debounce, cancelación, estados de UI, caché y tests con tiempo controlado.",
        "approach": "Modelá la pantalla como un único stream de estados. `switchMap` desuscribe la búsqueda anterior; con `HttpClient` también aborta la request del navegador. Si el servidor no cancela trabajo, igual evita que una respuesta vieja pise la UI.",
        "code_title": "search.store.ts",
        "code": """type State =
  | { status: 'idle' | 'loading'; items: readonly Result[] }
  | { status: 'success'; items: readonly Result[] }
  | { status: 'error'; items: []; message: string };

readonly state$ = this.query.valueChanges.pipe(
  map(value => value.trim()),
  debounceTime(300),
  distinctUntilChanged(),
  switchMap(query => !query
    ? of<State>({ status: 'idle', items: [] })
    : concat(
        of<State>({ status: 'loading', items: [] }),
        this.api.find(query).pipe(
          map(items => ({ status: 'success', items }) as const),
          catchError(() => of({
            status: 'error', items: [], message: 'No pudimos buscar'
          } as const))
        )
      )
  ),
  shareReplay({ bufferSize: 1, refCount: true })
);""",
        "checks": [
            "Con `fakeAsync`, a los 299 ms no hay request y a los 300 ms sí.",
            "Dos queries rápidas producen un solo resultado visible: el de la última.",
            "La clave de caché se normaliza y tiene una política explícita de expiración.",
        ],
    },
    {
        "id": "formularios-dinamicos",
        "stack": ["Angular", "Reactive Forms", "CVA"],
        "title": "Motor de formularios dinámicos",
        "brief": "Schema tipado para validación, layout, visibilidad, permisos, persistencia y evolución.",
        "approach": "Separá el contrato serializable del renderer. Una discriminated union vuelve exhaustivos los tipos de campo y un registry conecta cada tipo con su componente. Las reglas recibidas del servidor describen condiciones; nunca ejecutan código.",
        "code_title": "form-schema.ts",
        "code": """type Field =
  | { kind: 'text'; key: string; label: string; required?: boolean }
  | { kind: 'select'; key: string; label: string; options: Option[] }
  | { kind: 'date'; key: string; label: string; min?: string };

interface FormSchema {
  version: 3;
  fields: readonly Field[];
}

function buildForm(schema: FormSchema): FormGroup {
  return new FormGroup(Object.fromEntries(
    schema.fields.map(field => [
      field.key,
      new FormControl(null, field.required ? Validators.required : [])
    ])
  ));
}

const renderers: Record<Field['kind'], Type<ControlValueAccessor>> = {
  text: TextFieldComponent,
  select: SelectFieldComponent,
  date: DateFieldComponent
};""",
        "checks": [
            "Versioná schema y draft juntos; migrá `v1 → v2 → v3` con funciones puras.",
            "Cancelá validadores asíncronos obsoletos y representá el estado `pending`.",
            "El backend vuelve a validar permisos y valores aunque la UI oculte campos.",
        ],
    },
    {
        "id": "dashboard-tiempo-real",
        "stack": ["Angular", "RxJS", "WebSocket"],
        "title": "Dashboard en tiempo real",
        "brief": "Seis widgets con ritmos distintos, reconexión, backpressure y pausa fuera del viewport.",
        "approach": "Usá una conexión por sesión y multiplexá topics. Separá el ritmo de recepción del de render: eventos críticos pasan inmediatamente; métricas frecuentes se agrupan por intervalo para proteger el main thread.",
        "code_title": "live-metrics.service.ts",
        "code": """readonly connection$ = defer(() => this.connect()).pipe(
  retry({
    count: 8,
    delay: (_, attempt) =>
      timer(Math.min(1_000 * 2 ** attempt, 30_000))
  }),
  share({
    connector: () => new ReplaySubject<MetricEvent>(1),
    resetOnRefCountZero: true
  })
);

metric$(widget: Widget, visible$: Observable<boolean>) {
  return visible$.pipe(
    switchMap(visible => visible ? this.connection$ : EMPTY),
    filter(event => event.topic === widget.topic),
    auditTime(widget.renderEveryMs),
    distinctUntilChanged((a, b) => a.version === b.version)
  );
}""",
        "checks": [
            "Pausá consumidores invisibles con `IntersectionObserver`.",
            "Deduplicá eventos por id y versión después de reconectar.",
            "Medí INP y long tasks por widget, no solo latencia de red.",
        ],
    },
    {
        "id": "migracion-angular",
        "stack": ["Angular", "Signals", "Zoneless"],
        "title": "Migración entre cinco versiones mayores",
        "brief": "Upgrade incremental con pruebas, métricas, canary, feature flags y rollback.",
        "approach": "Actualizá una major por vez y separá la actualización mecánica de los cambios arquitectónicos. Cada etapa produce un artefacto desplegable y conserva compatibilidad temporal con la API y los assets anteriores.",
        "code_title": "migration-plan.ts",
        "code": """const stages: readonly MigrationStage[] = [
  { from: 17, to: 18, work: ['ng update', 'fix deprecations'] },
  { from: 18, to: 19, work: ['standalone routes'] },
  { from: 19, to: 20, work: ['built-in control flow'] },
  { from: 20, to: 21, work: ['signals at feature boundaries'] },
  { from: 21, to: 22, work: ['zoneless canary'] }
];

for (const stage of stages) {
  await runTypecheckAndTests();
  await compareBudgets(['initial-js', 'INP', 'error-rate']);
  await deployCanary({ percentage: 5, featureFlag: stage.to });
  // Promote only if the observation window stays inside the SLO.
}""",
        "checks": [
            "No mezcles upgrade, Signals y zoneless en el mismo PR.",
            "Probá rutas críticas, SSR, hydration y lazy loading en cada major.",
            "Rollback exige bundles previos y contratos de API compatibles.",
        ],
    },
    {
        "id": "lista-100k",
        "stack": ["Angular", "CDK", "Signals"],
        "title": "Lista de 100.000 filas",
        "brief": "Paginación y filtros remotos, virtual scroll, caché y navegación accesible.",
        "approach": "No lleves 100.000 registros al browser. El servidor pagina, ordena y filtra; virtual scroll limita el DOM. La query completa forma la clave de caché para no mezclar páginas de filtros distintos.",
        "code_title": "people-table.store.ts",
        "code": """interface PeopleQuery {
  cursor?: string;
  sort: 'name' | 'createdAt';
  direction: 'asc' | 'desc';
  filter: string;
}

readonly page = resource({
  params: () => this.query(),
  loader: ({ params, abortSignal }) =>
    firstValueFrom(this.api.list(params, { signal: abortSignal }))
});

trackRow(_: number, row: Person) {
  return row.id;
}

// Use cdk-virtual-scroll-viewport with a stable itemSize.
// aria-rowindex keeps the absolute position returned by the API.""",
        "checks": [
            "Medí nodos DOM, heap, scripting y layout con datos de producción.",
            "Conservá el foco por id cuando una fila sale del viewport.",
            "Anunciá carga, cantidad de resultados y cambios de página.",
        ],
    },
    {
        "id": "refresh-autenticacion",
        "stack": ["Angular", "HttpClient", "RxJS"],
        "title": "Carrera de refresh de autenticación",
        "brief": "Un solo refresh para varios 401 simultáneos, con cola, retry y logout seguro.",
        "approach": "Compartí un único refresh en vuelo. Las requests esperan ese resultado y reintentan una vez. El endpoint de refresh queda fuera del interceptor para evitar recursión.",
        "code_title": "auth.interceptor.ts",
        "code": """let refreshInFlight$: Observable<string> | undefined;

function refreshOnce(): Observable<string> {
  return refreshInFlight$ ??= auth.refresh().pipe(
    map(session => session.accessToken),
    shareReplay({ bufferSize: 1, refCount: false }),
    finalize(() => refreshInFlight$ = undefined)
  );
}

return next(request).pipe(
  catchError(error => {
    if (error.status !== 401 || request.context.get(IS_RETRY)) {
      return throwError(() => error);
    }
    return refreshOnce().pipe(
      switchMap(token => next(withToken(request, token, true))),
      catchError(refreshError => logoutAndFail(refreshError))
    );
  })
);""",
        "checks": [
            "Tres 401 simultáneos producen un refresh y tres reintentos.",
            "Si refresh falla, cancelá la cola, limpiá memoria y navegá una vez.",
            "No registres tokens; correlacioná el incidente con request ids.",
        ],
    },
    {
        "id": "event-loop",
        "stack": ["JavaScript", "Browser"],
        "title": "Event loop",
        "brief": "Predicción verificable de stack, microtasks y tasks.",
        "approach": "Ejecutá primero todo el stack síncrono. Al vaciarse, drená microtasks en orden FIFO; recién después el browser puede renderizar y tomar la siguiente task, como el timer.",
        "code_title": "event-loop.exercise.ts",
        "code": """console.log('A');
setTimeout(() => console.log('B'), 0);

Promise.resolve().then(() => {
  console.log('C');
  queueMicrotask(() => console.log('D'));
});

queueMicrotask(() => console.log('E'));

async function run() {
  console.log('F');
  await null;
  console.log('G');
}

run();
console.log('H');

// Resultado: A, F, H, C, E, G, D, B""",
        "checks": [
            "Explicá por qué `await` agenda la continuación como microtask.",
            "Una microtask puede encolar otra antes de pasar al timer.",
            "Verificá en browser; Node.js agrega fases y APIs propias.",
        ],
    },
    {
        "id": "tabla-accesible",
        "stack": ["Angular", "HTML", "ARIA"],
        "title": "Tabla accesible",
        "brief": "Tabla ordenable y paginada con semántica, foco y anuncios correctos.",
        "approach": "Conservá la semántica nativa y convertí el encabezado ordenable en un botón. `aria-sort` vive en el `th`; los resultados se anuncian sin mover el foco automáticamente.",
        "code_title": "people-table.component.html",
        "code": """<table>
  <caption>Personas del equipo</caption>
  <thead>
    <tr>
      <th scope="col" [attr.aria-sort]="nameSort()">
        <button type="button" (click)="sortBy('name')">
          Nombre <span aria-hidden="true">↕</span>
        </button>
      </th>
      <th scope="col">Rol</th>
    </tr>
  </thead>
  <tbody>
    @for (person of people(); track person.id) {
      <tr><th scope="row">{{ person.name }}</th><td>{{ person.role }}</td></tr>
    }
  </tbody>
</table>
<p aria-live="polite">{{ resultSummary() }}</p>""",
        "checks": [
            "Probá Tab, Enter, orden y paginación solo con teclado.",
            "Loading conserva caption y headers; empty state indica cómo seguir.",
            "Validá con VoiceOver o NVDA, además de axe.",
        ],
    },
    {
        "id": "layout-sin-cls",
        "stack": ["CSS", "Browser", "Core Web Vitals"],
        "title": "Layout responsive sin CLS",
        "brief": "Card con container queries, medios dimensionados y movimiento opcional.",
        "approach": "La card responde al espacio asignado, no al viewport. Reservá la proporción de la imagen antes de descargarla y animá propiedades que no provoquen layout.",
        "code_title": "product-card.scss",
        "code": """.card-shell { container: product / inline-size; }

.card {
  display: grid;
  gap: 1rem;
  overflow: clip;
}

.card img {
  width: 100%;
  aspect-ratio: 16 / 9;
  object-fit: cover;
}

@container product (min-width: 36rem) {
  .card { grid-template-columns: minmax(12rem, 2fr) 3fr; }
}

@media (prefers-reduced-motion: no-preference) {
  .card { transition: transform 180ms ease; }
  .card:hover { transform: translateY(-2px); }
}""",
        "checks": [
            "Reservá espacio para imágenes, fuentes y contenido tardío.",
            "No uses `container-type: size` si el contenido define la altura.",
            "Medí CLS durante el recorrido completo, no solo al cargar.",
        ],
    },
    {
        "id": "cache-offline",
        "stack": ["Browser", "IndexedDB", "Service Worker"],
        "title": "Caché offline",
        "brief": "HTTP, Service Worker e IndexedDB con invalidación y logout seguro.",
        "approach": "Cada capa tiene un rol: HTTP revalida, Service Worker conserva shell y recursos seguros, IndexedDB guarda datos estructurados. No caches por defecto respuestas privadas ni credenciales.",
        "code_title": "article.repository.ts",
        "code": """async function getArticle(id: string): Promise<Article> {
  const cached = await db.articles.get(id);

  try {
    const response = await fetch(`/api/articles/${id}`, {
      headers: cached?.etag ? { 'If-None-Match': cached.etag } : {}
    });
    if (response.status === 304 && cached) return cached.value;
    if (!response.ok) throw new Error(`HTTP ${response.status}`);

    const value = await response.json() as Article;
    await db.articles.put({
      id, value, etag: response.headers.get('ETag'), savedAt: Date.now()
    });
    return value;
  } catch (error) {
    if (cached) return cached.value;
    throw error;
  }
}""",
        "checks": [
            "Definí TTL, ETag y versión de schema; no uses caché eterna.",
            "En logout borrá IndexedDB, Cache Storage y memoria del usuario.",
            "Indicá que el dato es offline y cuándo se actualizó.",
        ],
    },
]
