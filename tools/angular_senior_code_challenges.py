"""Practice prompts and evaluation criteria for a Senior Angular code challenge."""

CODE_CHALLENGE_FORMATS = [
    {
        "id": "live-coding",
        "time": "45–60 min",
        "title": "Live coding",
        "description": "Compartís pantalla, aclarás requisitos y construís una solución incremental mientras explicás decisiones.",
    },
    {
        "id": "debugging",
        "time": "30–45 min",
        "title": "Debugging y code review",
        "description": "Recibís una feature rota o un PR y tenés que encontrar carreras, leaks, errores de estado y problemas de accesibilidad.",
    },
    {
        "id": "pairing",
        "time": "45–75 min",
        "title": "Pair programming",
        "description": "Implementás o refactorizás con el entrevistador. Evalúan colaboración, navegación del código y respuesta al feedback.",
    },
    {
        "id": "take-home",
        "time": "2–4 h",
        "title": "Take-home acotado",
        "description": "Entregás una pequeña aplicación con README, tests y commits. Importa más el alcance defendible que agregar features sin terminar.",
    },
]


CODE_CHALLENGE_DRILLS = [
    {
        "id": "typescript-transformations",
        "priority": "Calentamiento",
        "time": "25 min",
        "title": "Transformación de datos con TypeScript",
        "prompt": "Dado un array de transacciones, eliminá duplicados por `id`, agrupá por moneda, calculá totales y devolvé los tres clientes con mayor gasto sin mutar la entrada.",
        "deliverables": [
            "Tipos estrictos y retorno explícito.",
            "Complejidad temporal explicada.",
            "Tests para duplicados, array vacío, importes negativos y empates.",
        ],
        "watch_for": "No encadenes cinco recorridos si un `Map` resuelve agrupación y deduplicación en una pasada. Aclará qué significa una transacción negativa.",
        "solution": "Recorro la entrada una vez para deduplicar y acumular. Mantengo totales por moneda y por cliente; después ordeno únicamente los clientes únicos. La entrada nunca se modifica y el criterio de empate queda explícito.",
        "solution_code_title": "transaction-summary.ts",
        "solution_code": """interface Transaction {
  readonly id: string;
  readonly customerId: string;
  readonly currency: string;
  readonly amount: number;
}

interface Summary {
  readonly totalsByCurrency: Readonly<Record<string, number>>;
  readonly topCustomers: readonly { customerId: string; total: number }[];
}

export function summarize(input: readonly Transaction[]): Summary {
  const seen = new Set<string>();
  const currencyTotals = new Map<string, number>();
  const customerTotals = new Map<string, number>();

  for (const transaction of input) {
    if (seen.has(transaction.id)) continue;
    seen.add(transaction.id);

    currencyTotals.set(
      transaction.currency,
      (currencyTotals.get(transaction.currency) ?? 0) + transaction.amount
    );
    customerTotals.set(
      transaction.customerId,
      (customerTotals.get(transaction.customerId) ?? 0) + transaction.amount
    );
  }

  const topCustomers = [...customerTotals]
    .map(([customerId, total]) => ({ customerId, total }))
    .sort((a, b) => b.total - a.total || a.customerId.localeCompare(b.customerId))
    .slice(0, 3);

  return {
    totalsByCurrency: Object.fromEntries(currencyTotals),
    topCustomers
  };
}""",
        "test_code_title": "transaction-summary.spec.ts",
        "test_code": """describe('summarize', () => {
  it('deduplicates, aggregates and does not mutate the input', () => {
    const input = Object.freeze([
      { id: '1', customerId: 'ana', currency: 'USD', amount: 10 },
      { id: '1', customerId: 'ana', currency: 'USD', amount: 10 },
      { id: '2', customerId: 'bob', currency: 'USD', amount: 25 },
      { id: '3', customerId: 'ana', currency: 'EUR', amount: -2 }
    ]);

    expect(summarize(input)).toEqual({
      totalsByCurrency: { USD: 35, EUR: -2 },
      topCustomers: [
        { customerId: 'bob', total: 25 },
        { customerId: 'ana', total: 8 }
      ]
    });
    expect(input).toHaveLength(4);
  });

  it('returns empty collections for empty input', () => {
    expect(summarize([])).toEqual({ totalsByCurrency: {}, topCustomers: [] });
  });
});""",
        "decisions": [
            "Complejidad: `O(n + c log c)`, donde `c` es la cantidad de clientes únicos.",
            "Un importe negativo se interpreta como devolución; si el dominio dice otra cosa, se valida antes de agregar.",
            "El empate se resuelve por `customerId` para que el resultado sea determinista.",
        ],
    },
    {
        "id": "rxjs-search",
        "priority": "Muy probable",
        "time": "45 min",
        "title": "Buscador Angular con RxJS",
        "prompt": "Completá un buscador con debounce, cancelación de requests anteriores, loading, error, empty state y caché por query. Evitá resultados fuera de orden.",
        "deliverables": [
            "`debounceTime`, `distinctUntilChanged` y política de flattening defendida.",
            "Estados representables sin booleanos contradictorios.",
            "Test con tiempo controlado y dos respuestas fuera de orden.",
        ],
        "watch_for": "El entrevistador puede preguntar por qué `switchMap` y qué cambia si cada operación debe completarse. No anides `subscribe`.",
        "solution": "El input produce una query normalizada. `switchMap` conserva solo la búsqueda más reciente y `concat` emite loading antes del resultado. Un estado discriminado evita combinaciones como loading y error simultáneos.",
        "solution_code_title": "search.store.ts",
        "solution_code": """type SearchState =
  | { status: 'idle'; results: readonly Result[] }
  | { status: 'loading'; results: readonly Result[] }
  | { status: 'success'; results: readonly Result[] }
  | { status: 'error'; results: readonly Result[]; message: string };

@Injectable()
export class SearchStore {
  private readonly api = inject(SearchApi);
  private readonly querySubject = new Subject<string>();
  private readonly cache = new Map<string, readonly Result[]>();

  readonly state$ = this.querySubject.pipe(
    map(query => query.trim().toLocaleLowerCase()),
    debounceTime(300),
    distinctUntilChanged(),
    switchMap(query => {
      if (!query) return of<SearchState>({ status: 'idle', results: [] });
      const cached = this.cache.get(query);
      if (cached) return of<SearchState>({ status: 'success', results: cached });

      return concat(
        of<SearchState>({ status: 'loading', results: [] }),
        this.api.search(query).pipe(
          tap(results => this.cache.set(query, results)),
          map(results => ({ status: 'success', results }) as const),
          catchError(() => of({
            status: 'error', results: [], message: 'No pudimos buscar'
          } as const))
        )
      );
    }),
    shareReplay({ bufferSize: 1, refCount: true })
  );

  search(query: string): void {
    this.querySubject.next(query);
  }
}""",
        "test_code_title": "search.store.spec.ts",
        "test_code": """it('debounces and ignores the stale request', fakeAsync(() => {
  const first = new Subject<readonly Result[]>();
  const second = new Subject<readonly Result[]>();
  api.search.mockReturnValueOnce(first).mockReturnValueOnce(second);
  const states: SearchState[] = [];
  store.state$.subscribe(state => states.push(state));

  store.search('angular');
  tick(299);
  expect(api.search).not.toHaveBeenCalled();
  tick(1);

  store.search('signals');
  tick(300);
  first.next([{ id: 'old' }]);
  second.next([{ id: 'new' }]);

  expect(api.search).toHaveBeenCalledTimes(2);
  expect(states.at(-1)).toEqual({
    status: 'success', results: [{ id: 'new' }]
  });
}));""",
        "decisions": [
            "`switchMap` es correcto porque una query anterior deja de interesar; para guardar acciones usaría `concatMap` o `mergeMap` según el contrato.",
            "La caché necesita TTL o invalidación en una aplicación real.",
            "Desuscribir `HttpClient` aborta la request del browser, aunque el servidor podría continuar procesándola.",
        ],
    },
    {
        "id": "angular-feature",
        "priority": "Muy probable",
        "time": "60 min",
        "title": "Feature Angular de punta a punta",
        "prompt": "Construí una lista de productos desde una API: búsqueda, filtro de categoría, orden, favorito optimista y estados loading/error/empty. La URL debe conservar los filtros.",
        "deliverables": [
            "Componente standalone con límites claros entre UI, estado y API.",
            "Signals/computed o RxJS usados con un criterio consistente.",
            "HTML semántico, teclado, `track` estable y tests de interacción.",
        ],
        "watch_for": "No diseñes una arquitectura de diez archivos antes del primer resultado visible. Entregá un vertical slice y extraé cuando aparezca una responsabilidad real.",
        "solution": "Mantengo filtros como signals y derivo la query en un `computed`. El store conserva la frontera HTTP y expone un único estado. El favorito aplica actualización optimista, guarda el snapshot y revierte ante error.",
        "solution_code_title": "product-explorer.component.ts",
        "solution_code": """@Component({
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './product-explorer.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ProductExplorer {
  private readonly api = inject(ProductApi);
  private readonly route = inject(ActivatedRoute);
  private readonly router = inject(Router);

  readonly search = new FormControl('', { nonNullable: true });
  readonly category = signal<string | null>(
    this.route.snapshot.queryParamMap.get('category')
  );
  readonly sort = signal<ProductSort>('name');
  readonly retry = signal(0);

  private readonly searchValue = toSignal(this.search.valueChanges.pipe(
    startWith(this.search.value), debounceTime(300), distinctUntilChanged()
  ), { initialValue: '' });

  readonly query = computed(() => ({
    search: this.searchValue().trim(),
    category: this.category(),
    sort: this.sort(),
    retry: this.retry()
  }));

  readonly products = resource({
    params: () => this.query(),
    loader: ({ params, abortSignal }) =>
      firstValueFrom(this.api.list(params, abortSignal))
  });

  updateCategory(category: string | null): void {
    this.category.set(category);
    void this.router.navigate([], {
      queryParams: { category }, queryParamsHandling: 'merge', replaceUrl: true
    });
  }

  retryLoad(): void {
    this.retry.update(value => value + 1);
  }
}""",
        "test_code_title": "product-explorer.spec.ts",
        "test_code": """it('keeps filters in the URL and renders an empty state', async () => {
  api.list.mockReturnValue(of([]));
  const fixture = TestBed.createComponent(ProductExplorer);
  fixture.detectChanges();

  fixture.componentInstance.updateCategory('books');
  await fixture.whenStable();
  fixture.detectChanges();

  expect(router.navigate).toHaveBeenCalledWith([], expect.objectContaining({
    queryParams: { category: 'books' }, replaceUrl: true
  }));
  expect(fixture.nativeElement.textContent).toContain('Sin productos');
});

it('tracks cards by product id', () => {
  api.list.mockReturnValue(of([{ id: 'p1', name: 'Keyboard', price: 90 }]));
  const fixture = TestBed.createComponent(ProductExplorer);
  fixture.detectChanges();
  expect(fixture.nativeElement.querySelector('[data-product-id="p1"]')).not.toBeNull();
});""",
        "decisions": [
            "Un vertical slice puede vivir en un componente; extraigo store o facade cuando estado y efectos necesitan otro ciclo de vida.",
            "`resource` recibe `AbortSignal`, por lo que una query nueva puede cancelar la carga anterior.",
            "La mutación optimista debe revertir desde un snapshot y anunciar el error sin perder foco.",
        ],
    },
    {
        "id": "debug-race",
        "priority": "Muy probable",
        "time": "35 min",
        "title": "Encontrar una carrera y un memory leak",
        "prompt": "Un componente hace `subscribe` dentro de otro `subscribe`, duplica requests al navegar y a veces muestra el usuario anterior. Diagnosticá, corregí y agregá una prueba que reproduzca la carrera.",
        "deliverables": [
            "Causa explicada antes de editar.",
            "Cancelación o teardown ligado al ciclo de vida.",
            "Prueba que falla antes del fix y pasa después.",
        ],
        "watch_for": "No tapes el síntoma con más flags. Buscá ownership de la suscripción, identidad de la request y orden temporal de las respuestas.",
        "solution": "La ruta se transforma en un stream de ids y `switchMap` reemplaza la carga anterior. `takeUntilDestroyed` ata la suscripción al componente. `distinctUntilChanged` evita repetir la misma request.",
        "solution_code_title": "user-detail.component.ts",
        "solution_code": """@Component({
  standalone: true,
  template: `
    @if (user(); as current) {
      <h1>{{ current.name }}</h1>
    } @else {
      <p>Seleccioná un usuario</p>
    }
  `
})
export class UserDetailComponent {
  private readonly route = inject(ActivatedRoute);
  private readonly api = inject(UserApi);
  private readonly destroyRef = inject(DestroyRef);

  readonly user = toSignal(
    this.route.paramMap.pipe(
      map(params => params.get('id')),
      filter((id): id is string => id !== null),
      distinctUntilChanged(),
      switchMap(id => this.api.get(id).pipe(
        catchError(() => of(null))
      )),
      takeUntilDestroyed(this.destroyRef)
    ),
    { initialValue: null }
  );
}""",
        "test_code_title": "user-detail.component.spec.ts",
        "test_code": """it('never renders a stale response', () => {
  const params$ = new Subject<ParamMap>();
  const first$ = new Subject<User>();
  const second$ = new Subject<User>();
  api.get.mockReturnValueOnce(first$).mockReturnValueOnce(second$);
  route.paramMap = params$;

  const fixture = TestBed.createComponent(UserDetailComponent);
  params$.next(convertToParamMap({ id: '1' }));
  params$.next(convertToParamMap({ id: '2' }));
  first$.next({ id: '1', name: 'Old user' });
  second$.next({ id: '2', name: 'Current user' });
  fixture.detectChanges();

  expect(fixture.nativeElement.textContent).toContain('Current user');
  expect(fixture.nativeElement.textContent).not.toContain('Old user');
});""",
        "decisions": [
            "El leak nace porque la suscripción exterior sobrevive al componente y crea suscripciones interiores adicionales.",
            "`switchMap` resuelve identidad temporal; un booleano loading no puede hacerlo.",
            "La prueba controla ambas respuestas para reproducir determinísticamente la carrera.",
        ],
    },
    {
        "id": "reactive-form",
        "priority": "Probable",
        "time": "50 min",
        "title": "Formulario reactivo real",
        "prompt": "Implementá alta de usuario con validación cruzada, username asíncrono, campos condicionales, errores accesibles y protección contra doble submit.",
        "deliverables": [
            "Formulario tipado y validadores testeables.",
            "Manejo correcto de `pending`, submit y errores del servidor.",
            "Foco o resumen de errores sin depender solo del color.",
        ],
        "watch_for": "La validación asíncrona necesita cancelación y debounce. El backend sigue siendo la autoridad aunque el control sea válido.",
        "solution": "El formulario es non-nullable y tipado. La confirmación se valida a nivel de grupo; el username usa un validador asíncrono que espera antes de consultar. El submit se bloquea durante `pending`, envío o invalidez.",
        "solution_code_title": "signup.component.ts",
        "solution_code": """const passwordsMatch: ValidatorFn = control => {
  const password = control.get('password')?.value;
  const confirmation = control.get('confirmation')?.value;
  return password === confirmation ? null : { passwordsMismatch: true };
};

function usernameAvailable(api: UsersApi): AsyncValidatorFn {
  return control => timer(300).pipe(
    switchMap(() => api.usernameExists(control.value)),
    map(exists => exists ? { usernameTaken: true } : null),
    catchError(() => of({ usernameCheckFailed: true })),
    first()
  );
}

@Component({ standalone: true, imports: [ReactiveFormsModule] })
export class SignupComponent {
  private readonly api = inject(UsersApi);
  private readonly builder = inject(NonNullableFormBuilder);
  readonly submitting = signal(false);
  readonly serverError = signal<string | null>(null);

  readonly form = this.builder.group({
    username: this.builder.control('', {
      validators: [Validators.required, Validators.minLength(3)],
      asyncValidators: [usernameAvailable(this.api)],
      updateOn: 'blur'
    }),
    password: ['', [Validators.required, Validators.minLength(12)]],
    confirmation: ['', Validators.required],
    companyAccount: false,
    companyName: ''
  }, { validators: passwordsMatch });

  submit(): void {
    if (this.form.invalid || this.form.pending || this.submitting()) {
      this.form.markAllAsTouched();
      return;
    }
    this.submitting.set(true);
    this.api.create(this.form.getRawValue()).pipe(
      finalize(() => this.submitting.set(false))
    ).subscribe({ error: () => this.serverError.set('No pudimos crear la cuenta') });
  }
}""",
        "test_code_title": "signup.component.spec.ts",
        "test_code": """it('rejects mismatched passwords and prevents submit', () => {
  const fixture = TestBed.createComponent(SignupComponent);
  const component = fixture.componentInstance;
  component.form.patchValue({
    username: 'adrii', password: 'very-secure-1', confirmation: 'different-123'
  });

  component.submit();

  expect(component.form.hasError('passwordsMismatch')).toBe(true);
  expect(api.create).not.toHaveBeenCalled();
});

it('marks a username reported by the API as taken', fakeAsync(() => {
  api.usernameExists.mockReturnValue(of(true));
  const control = TestBed.createComponent(SignupComponent)
    .componentInstance.form.controls.username;
  control.setValue('adrii');
  control.markAsTouched();
  control.updateValueAndValidity();
  tick(300);

  expect(control.hasError('usernameTaken')).toBe(true);
}));""",
        "decisions": [
            "`updateOn: 'blur'` evita consultar disponibilidad en cada tecla; para feedback en vivo usaría un stream externo con debounce.",
            "Los errores se asocian con `aria-describedby` y el submit inválido lleva foco al primer control con error.",
            "La respuesta del servidor se mapea nuevamente al campo aunque el validador previo haya pasado.",
        ],
    },
    {
        "id": "http-testing",
        "priority": "Probable",
        "time": "45 min",
        "title": "Interceptor funcional y tests HTTP",
        "prompt": "Agregá correlation id y token solo a la API propia. Ante 401, reintentá una vez después de un refresh compartido. Probá éxito, error y requests concurrentes.",
        "deliverables": [
            "Interceptor funcional y bypass explícito para refresh.",
            "Inmutabilidad de `HttpRequest` respetada.",
            "Tests con `provideHttpClientTesting()` y verificación de requests pendientes.",
        ],
        "watch_for": "La prueba difícil son varios 401 simultáneos: debe existir un solo refresh. Evitá loops y no registres credenciales.",
        "solution": "El interceptor agrega headers solo a la API propia y marca el reintento en `HttpContext`. Un observable compartido representa el refresh en vuelo; todas las requests esperan la misma emisión y reintentan una sola vez.",
        "solution_code_title": "auth.interceptor.ts",
        "solution_code": """const RETRIED = new HttpContextToken(() => false);
let refreshInFlight$: Observable<string> | null = null;

function sharedRefresh(auth: AuthService): Observable<string> {
  if (!refreshInFlight$) {
    refreshInFlight$ = auth.refresh().pipe(
      map(session => session.accessToken),
      shareReplay({ bufferSize: 1, refCount: false }),
      finalize(() => refreshInFlight$ = null)
    );
  }
  return refreshInFlight$;
}

export const authInterceptor: HttpInterceptorFn = (request, next) => {
  const auth = inject(AuthService);
  const isOwnApi = request.url.startsWith(environment.apiUrl);
  const isRefresh = request.url.endsWith('/auth/refresh');
  if (!isOwnApi || isRefresh) return next(request);

  const correlationId = crypto.randomUUID();
  const authenticated = request.clone({
    setHeaders: {
      'X-Correlation-ID': correlationId,
      ...(auth.token() ? { Authorization: `Bearer ${auth.token()}` } : {})
    }
  });

  return next(authenticated).pipe(
    catchError(error => {
      if (error.status !== 401 || request.context.get(RETRIED)) {
        return throwError(() => error);
      }
      return sharedRefresh(auth).pipe(
        switchMap(token => next(request.clone({
          context: request.context.set(RETRIED, true),
          setHeaders: { Authorization: `Bearer ${token}`, 'X-Correlation-ID': correlationId }
        }))),
        catchError(refreshError => {
          auth.logout();
          return throwError(() => refreshError);
        })
      );
    })
  );
};""",
        "test_code_title": "auth.interceptor.spec.ts",
        "test_code": """it('shares one refresh across concurrent 401 responses', () => {
  service.load('/a').subscribe();
  service.load('/b').subscribe();
  const initial = http.match(req => ['/a', '/b'].some(path => req.url.endsWith(path)));
  initial.forEach(req => req.flush(null, { status: 401, statusText: 'Unauthorized' }));

  const refresh = http.expectOne(`${apiUrl}/auth/refresh`);
  refresh.flush({ accessToken: 'fresh-token' });

  const retried = http.match(req =>
    req.headers.get('Authorization') === 'Bearer fresh-token'
  );
  expect(retried).toHaveLength(2);
  retried.forEach(req => req.flush({ ok: true }));
  http.verify();
});

it('does not send credentials to a third-party URL', () => {
  service.loadExternal().subscribe();
  const request = http.expectOne('https://images.example/avatar');
  expect(request.request.headers.has('Authorization')).toBe(false);
  request.flush(new Blob());
});""",
        "decisions": [
            "Los interceptores funcionales ofrecen un orden de ejecución predecible.",
            "El `HttpContextToken` impide un segundo retry y el endpoint refresh evita interceptarse a sí mismo.",
            "La telemetría registra correlation id y estado, nunca access o refresh tokens.",
        ],
    },
    {
        "id": "component-tests",
        "priority": "Probable",
        "time": "40 min",
        "title": "Completar tests de un componente",
        "prompt": "Recibís un componente con tests vacíos. Cubrí render, interacción, dependencia HTTP, error, navegación por teclado y un caso límite elegido por vos.",
        "deliverables": [
            "Tests de comportamiento observable, no de implementación privada.",
            "Dobles en la frontera correcta y datos legibles.",
            "Nombres que describen escenario, acción y resultado.",
        ],
        "watch_for": "`should create` no alcanza. Priorizá el contrato que rompería una regresión real y explicá qué dejarías para integración o E2E.",
        "solution": "Primero identifico el contrato visible: carga inicial, render, acción principal, error y teclado. Doblo el servicio en su API pública y uso el DOM para comprobar la integración entre clase y template.",
        "solution_code_title": "team-list.component.ts",
        "solution_code": """@Component({
  standalone: true,
  template: `
    <h1>Equipo</h1>
    @if (error()) {
      <p role="alert">No pudimos cargar el equipo</p>
      <button type="button" (click)="load()">Reintentar</button>
    } @else {
      <ul aria-label="Miembros del equipo">
        @for (member of members(); track member.id) {
          <li>{{ member.name }} — {{ member.role }}</li>
        } @empty {
          <li>No hay miembros</li>
        }
      </ul>
    }
  `
})
export class TeamListComponent {
  private readonly api = inject(TeamApi);
  readonly members = signal<readonly Member[]>([]);
  readonly error = signal(false);

  constructor() { this.load(); }

  load(): void {
    this.error.set(false);
    this.api.list().subscribe({
      next: members => this.members.set(members),
      error: () => this.error.set(true)
    });
  }
}""",
        "test_code_title": "team-list.component.spec.ts",
        "test_code": """describe('TeamListComponent', () => {
  const response$ = new Subject<readonly Member[]>();

  beforeEach(() => TestBed.configureTestingModule({
    providers: [{ provide: TeamApi, useValue: { list: vi.fn(() => response$) } }]
  }));

  it('renders members returned by the public service contract', () => {
    const fixture = TestBed.createComponent(TeamListComponent);
    response$.next([{ id: '1', name: 'Ada', role: 'Lead' }]);
    fixture.detectChanges();

    expect(fixture.nativeElement.querySelector(
      'ul[aria-label="Miembros del equipo"]'
    )).not.toBeNull();
    expect(fixture.nativeElement.textContent).toContain('Ada — Lead');
  });

  it('shows an alert and retries after an error', () => {
    const api = TestBed.inject(TeamApi) as { list: Mock };
    api.list.mockReturnValueOnce(throwError(() => new Error('offline')))
      .mockReturnValueOnce(of([]));
    const fixture = TestBed.createComponent(TeamListComponent);
    fixture.detectChanges();
    expect(fixture.nativeElement.querySelector('[role="alert"]')).not.toBeNull();

    fixture.nativeElement.querySelector('button').click();
    expect(api.list).toHaveBeenCalledTimes(2);
  });
});""",
        "decisions": [
            "Una prueba de clase pura sirve para lógica; una interacción del template necesita fixture y DOM.",
            "Mockeo `TeamApi`, no detalles internos del componente.",
            "Dejaría navegación real, backend y recorrido entre pantallas para integración o E2E.",
        ],
    },
    {
        "id": "accessible-table",
        "priority": "Diferenciador Senior",
        "time": "45 min",
        "title": "Tabla accesible y performante",
        "prompt": "Construí una tabla ordenable y paginada. Debe funcionar con teclado, anunciar cambios, conservar foco y evitar render innecesario con cientos de filas.",
        "deliverables": [
            "Semántica nativa, botones reales y `aria-sort`.",
            "Identidad estable de filas y paginación remota defendida.",
            "Prueba de teclado y estrategia de medición.",
        ],
        "watch_for": "No conviertas la tabla en una grilla ARIA sin necesidad. Virtual scroll puede entrar en tensión con la semántica y debe justificarse.",
        "solution": "Uso una tabla HTML nativa y un botón dentro del encabezado ordenable. El `th` comunica `aria-sort`; un live region anuncia el resultado. La paginación remota limita datos y DOM sin romper la semántica.",
        "solution_code_title": "people-table.component.html",
        "solution_code": """<table>
  <caption>Personas del equipo</caption>
  <thead>
    <tr>
      <th scope="col" [attr.aria-sort]="nameSort()">
        <button type="button" (click)="sortByName()">
          Nombre <span aria-hidden="true">{{ sortIcon() }}</span>
        </button>
      </th>
      <th scope="col">Rol</th>
    </tr>
  </thead>
  <tbody>
    @for (person of page().items; track person.id; let index = $index) {
      <tr [attr.data-person-id]="person.id">
        <th scope="row">{{ person.name }}</th>
        <td>{{ person.role }}</td>
      </tr>
    }
  </tbody>
</table>

<nav aria-label="Paginación del equipo">
  <button type="button" [disabled]="page().number === 1" (click)="previous()">
    Anterior
  </button>
  <span>Página {{ page().number }} de {{ page().totalPages }}</span>
  <button type="button" [disabled]="page().number === page().totalPages" (click)="next()">
    Siguiente
  </button>
</nav>

<p class="sr-only" aria-live="polite">{{ resultAnnouncement() }}</p>""",
        "test_code_title": "people-table.component.spec.ts",
        "test_code": """it('sorts from the keyboard and exposes the current direction', async () => {
  const fixture = TestBed.createComponent(PeopleTableComponent);
  fixture.detectChanges();
  const header = fixture.nativeElement.querySelector('th[scope="col"]');
  const button = header.querySelector('button');

  button.focus();
  button.dispatchEvent(new KeyboardEvent('keydown', { key: 'Enter', bubbles: true }));
  button.click();
  fixture.detectChanges();

  expect(document.activeElement).toBe(button);
  expect(header.getAttribute('aria-sort')).toBe('ascending');
});

it('keeps row identity stable when a person changes', () => {
  const fixture = TestBed.createComponent(PeopleTableComponent);
  fixture.detectChanges();
  const before = fixture.nativeElement.querySelector('[data-person-id="p1"]');
  fixture.componentInstance.rename('p1', 'Ada Lovelace');
  fixture.detectChanges();
  const after = fixture.nativeElement.querySelector('[data-person-id="p1"]');
  expect(after).toBe(before);
});""",
        "decisions": [
            "No agrego roles ARIA cuando la semántica nativa ya expresa tabla, encabezados y botones.",
            "La paginación conserva foco en el control activado y anuncia página y cantidad de resultados.",
            "Con 100.000 filas prefiero paginación remota; virtual scroll se evalúa contra requisitos de lector de pantalla.",
        ],
    },
]


CODE_CHALLENGE_RUBRIC = [
    {"label": "Correctitud y casos límite", "weight": "25%"},
    {"label": "Descomposición, tipos y legibilidad", "weight": "20%"},
    {"label": "Tests y capacidad de verificar", "weight": "20%"},
    {"label": "Angular, RxJS y plataforma", "weight": "15%"},
    {"label": "Comunicación y manejo del tiempo", "weight": "10%"},
    {"label": "Accesibilidad y performance", "weight": "10%"},
]


CODE_CHALLENGE_MOCK = {
    "title": "Product Explorer",
    "time": "75 minutos",
    "brief": "Construí una feature standalone que consulta `/api/products`, permite buscar y filtrar, sincroniza la query con la URL y muestra estados idle, loading, error, empty y success.",
    "requirements": [
        "Debounce de 300 ms y cancelación de la búsqueda anterior.",
        "Filtro por categoría y orden por precio o nombre.",
        "Retry manual; no reintentes automáticamente errores 4xx.",
        "Template accesible, navegación por teclado y `track` por id.",
        "Tests de debounce, carrera de respuestas, error y empty state.",
    ],
    "timeline": [
        {"time": "00–08", "task": "Preguntar, fijar supuestos y ordenar prioridades."},
        {"time": "08–18", "task": "Definir tipos, estados y frontera del API."},
        {"time": "18–45", "task": "Entregar el recorrido principal funcionando."},
        {"time": "45–58", "task": "Agregar error, empty, URL y accesibilidad."},
        {"time": "58–68", "task": "Escribir los tests de mayor riesgo."},
        {"time": "68–75", "task": "Refactor mínimo y explicar trade-offs pendientes."},
    ],
    "starter_code": """export type ProductSort = 'name' | 'price';

export interface ProductQuery {
  search: string;
  category: string | null;
  sort: ProductSort;
}

export type ProductState =
  | { status: 'idle'; products: readonly Product[] }
  | { status: 'loading'; products: readonly Product[] }
  | { status: 'success'; products: readonly Product[] }
  | { status: 'error'; products: readonly Product[]; message: string };

// TODO: implementá ProductApi, el estado de la feature,
// la sincronización con query params, el template y los tests.""",
}
