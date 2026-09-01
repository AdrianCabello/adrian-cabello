from __future__ import annotations

import os
import re
from datetime import date

from reportlab.lib import colors
from reportlab.lib.enums import TA_CENTER, TA_LEFT
from reportlab.lib.pagesizes import A4
from reportlab.lib.styles import ParagraphStyle, getSampleStyleSheet
from reportlab.lib.units import mm
from reportlab.pdfbase.ttfonts import TTFont
from reportlab.pdfbase import pdfmetrics
from reportlab.platypus import (
    BaseDocTemplate, Frame, PageTemplate, Paragraph, Spacer, PageBreak,
    KeepTogether, Table, TableStyle, Preformatted, HRFlowable,
)
from reportlab.platypus.tableofcontents import TableOfContents

ROOT = os.path.abspath(os.path.join(os.path.dirname(__file__), ".."))
OUT = os.path.join(ROOT, "output", "pdf", "guia_entrevista_angular_senior.pdf")
os.makedirs(os.path.dirname(OUT), exist_ok=True)

PAGE_W, PAGE_H = A4
INK = colors.HexColor("#172033")
MUTED = colors.HexColor("#5E6B82")
PURPLE = colors.HexColor("#6D3DF5")
PURPLE_DARK = colors.HexColor("#4520A8")
LILAC = colors.HexColor("#F1EDFF")
CYAN = colors.HexColor("#16B8C7")
PALE = colors.HexColor("#F6F8FC")
GREEN = colors.HexColor("#1D8A63")
ORANGE = colors.HexColor("#C66A16")
RED = colors.HexColor("#B5364A")


def font_setup():
    candidates = [
        ("/System/Library/Fonts/Supplemental/Arial.ttf", "Arial"),
        ("/System/Library/Fonts/Supplemental/Arial Bold.ttf", "Arial-Bold"),
        ("/System/Library/Fonts/Supplemental/Arial Italic.ttf", "Arial-Italic"),
        ("/System/Library/Fonts/Supplemental/Courier New.ttf", "CourierNew"),
    ]
    for path, name in candidates:
        if os.path.exists(path):
            pdfmetrics.registerFont(TTFont(name, path))


font_setup()
BODY_FONT = "Arial" if "Arial" in pdfmetrics.getRegisteredFontNames() else "Helvetica"
BOLD_FONT = "Arial-Bold" if "Arial-Bold" in pdfmetrics.getRegisteredFontNames() else "Helvetica-Bold"
ITALIC_FONT = "Arial-Italic" if "Arial-Italic" in pdfmetrics.getRegisteredFontNames() else "Helvetica-Oblique"
CODE_FONT = "CourierNew" if "CourierNew" in pdfmetrics.getRegisteredFontNames() else "Courier"


styles = getSampleStyleSheet()
S = {
    "cover_kicker": ParagraphStyle("cover_kicker", fontName=BOLD_FONT, fontSize=10, leading=13, textColor=CYAN, alignment=TA_CENTER, spaceAfter=8),
    "cover_title": ParagraphStyle("cover_title", fontName=BOLD_FONT, fontSize=29, leading=34, textColor=colors.white, alignment=TA_CENTER, spaceAfter=12),
    "cover_sub": ParagraphStyle("cover_sub", fontName=BODY_FONT, fontSize=12, leading=18, textColor=colors.HexColor("#E7E3FF"), alignment=TA_CENTER),
    "h1": ParagraphStyle("h1", fontName=BOLD_FONT, fontSize=21, leading=25, textColor=PURPLE_DARK, spaceBefore=4, spaceAfter=10, keepWithNext=True),
    "h2": ParagraphStyle("h2", fontName=BOLD_FONT, fontSize=14, leading=18, textColor=INK, spaceBefore=12, spaceAfter=6, keepWithNext=True),
    "h3": ParagraphStyle("h3", fontName=BOLD_FONT, fontSize=11, leading=14, textColor=PURPLE_DARK, spaceBefore=8, spaceAfter=4, keepWithNext=True),
    "body": ParagraphStyle("body", fontName=BODY_FONT, fontSize=9.2, leading=13.1, textColor=INK, spaceAfter=5),
    "small": ParagraphStyle("small", fontName=BODY_FONT, fontSize=7.8, leading=10.5, textColor=MUTED),
    "cell": ParagraphStyle("cell", fontName=BODY_FONT, fontSize=7.4, leading=9.4, textColor=INK),
    "cell_head": ParagraphStyle("cell_head", fontName=BOLD_FONT, fontSize=7.4, leading=9.4, textColor=colors.white),
    "bullet": ParagraphStyle("bullet", fontName=BODY_FONT, fontSize=8.9, leading=12.5, textColor=INK, leftIndent=12, firstLineIndent=-7, bulletIndent=4, spaceAfter=3),
    "bullet_dense": ParagraphStyle("bullet_dense", fontName=BODY_FONT, fontSize=8.15, leading=10.8, textColor=INK, leftIndent=12, firstLineIndent=-7, bulletIndent=4, spaceAfter=1.7),
    "qa_q": ParagraphStyle("qa_q", fontName=BOLD_FONT, fontSize=9.2, leading=12.5, textColor=PURPLE_DARK, spaceBefore=5, spaceAfter=2, keepWithNext=True),
    "qa_a": ParagraphStyle("qa_a", fontName=BODY_FONT, fontSize=8.8, leading=12.4, textColor=INK, leftIndent=8, borderColor=colors.HexColor("#D9D1F9"), borderWidth=0.8, borderPadding=(4, 6, 4, 7), borderRadius=2, backColor=colors.HexColor("#FAF9FF"), spaceAfter=5),
    "qa_q_dense": ParagraphStyle("qa_q_dense", fontName=BOLD_FONT, fontSize=8.6, leading=10.8, textColor=PURPLE_DARK, spaceBefore=3, spaceAfter=1, keepWithNext=True),
    "qa_a_dense": ParagraphStyle("qa_a_dense", fontName=BODY_FONT, fontSize=8.05, leading=10.5, textColor=INK, leftIndent=8, borderColor=colors.HexColor("#D9D1F9"), borderWidth=0.8, borderPadding=(3, 5, 3, 6), borderRadius=2, backColor=colors.HexColor("#FAF9FF"), spaceAfter=3),
    "code": ParagraphStyle("code", fontName=CODE_FONT, fontSize=7.3, leading=10.1, textColor=colors.HexColor("#EAF1FF"), backColor=colors.HexColor("#1C2538"), borderPadding=8, leftIndent=0, rightIndent=0, spaceBefore=4, spaceAfter=7),
    "callout": ParagraphStyle("callout", fontName=BODY_FONT, fontSize=8.8, leading=12.5, textColor=INK, backColor=LILAC, borderColor=PURPLE, borderWidth=1, borderPadding=8, spaceBefore=5, spaceAfter=7),
    "warning": ParagraphStyle("warning", fontName=BODY_FONT, fontSize=8.8, leading=12.5, textColor=INK, backColor=colors.HexColor("#FFF5E8"), borderColor=ORANGE, borderWidth=1, borderPadding=8, spaceBefore=5, spaceAfter=7),
    "toc": ParagraphStyle("toc", fontName=BODY_FONT, fontSize=9, leading=13, textColor=INK),
}


def esc(text: str) -> str:
    return (text.replace("&", "&amp;").replace("<", "&lt;").replace(">", "&gt;"))


def P(text, style="body"):
    return Paragraph(text, S[style])


def bullets(items):
    return [Paragraph("• " + item, S["bullet"]) for item in items]


def code(text):
    block = Preformatted(text.strip("\n"), S["code"], maxLineLength=100)
    table = Table([[block]], colWidths=[158*mm])
    table.setStyle(TableStyle([
        ("BACKGROUND", (0, 0), (-1, -1), colors.HexColor("#1C2538")),
        ("BOX", (0, 0), (-1, -1), 0.6, colors.HexColor("#303C55")),
        ("LEFTPADDING", (0, 0), (-1, -1), 8),
        ("RIGHTPADDING", (0, 0), (-1, -1), 8),
        ("TOPPADDING", (0, 0), (-1, -1), 7),
        ("BOTTOMPADDING", (0, 0), (-1, -1), 7),
    ]))
    return table


class GuideDoc(BaseDocTemplate):
    def __init__(self, filename):
        super().__init__(filename, pagesize=A4, leftMargin=18*mm, rightMargin=18*mm, topMargin=18*mm, bottomMargin=18*mm,
                         title="Guía de estudio para entrevista Angular Senior", author="Adrii Cabello")
        frame = Frame(self.leftMargin, self.bottomMargin, self.width, self.height, id="normal")
        self.addPageTemplates(PageTemplate(id="main", frames=frame, onPage=self.draw_page))

    def draw_page(self, canvas, doc):
        canvas.saveState()
        if doc.page == 1:
            canvas.setFillColor(INK)
            canvas.rect(0, 0, PAGE_W, PAGE_H, fill=1, stroke=0)
            canvas.setFillColor(PURPLE)
            canvas.circle(PAGE_W-10*mm, PAGE_H-12*mm, 55*mm, fill=1, stroke=0)
            canvas.setFillColor(CYAN)
            canvas.circle(8*mm, 18*mm, 30*mm, fill=1, stroke=0)
        else:
            canvas.setStrokeColor(colors.HexColor("#DDE2EC"))
            canvas.line(18*mm, PAGE_H-12*mm, PAGE_W-18*mm, PAGE_H-12*mm)
            canvas.setFont(BODY_FONT, 7.5)
            canvas.setFillColor(MUTED)
            canvas.drawString(18*mm, PAGE_H-9.5*mm, "ANGULAR SENIOR · GUÍA DE ENTREVISTA")
            canvas.drawRightString(PAGE_W-18*mm, 9*mm, f"{doc.page}")
        canvas.restoreState()

    def afterFlowable(self, flowable):
        if isinstance(flowable, Paragraph) and flowable.style.name == "h1":
            text = flowable.getPlainText()
            key = "chapter-" + re.sub(r"[^a-z0-9]+", "-", text.lower()).strip("-")
            self.canv.bookmarkPage(key)
            self.canv.addOutlineEntry(text, key, level=0, closed=False)
            self.notify("TOCEntry", (0, text, self.page, key))


chapters = [
    {
        "title": "1. Cómo razonar y responder como Senior",
        "intro": "Esta sección convierte conocimiento técnico en respuestas claras. La meta es demostrar qué ocurre, qué decisión tomarías, por qué la tomarías y cómo comprobarías que funcionó.",
        "master": [
            "Respondé primero qué es el concepto en una frase. Después explicá el mecanismo que produce su comportamiento, elegí una aplicación concreta y cerrá con el límite de esa elección. Ejemplo: `switchMap` reemplaza la suscripción interna anterior; lo elegiría en un buscador porque sólo interesa la consulta más reciente, pero no para guardar acciones que deben completarse todas.",
            "Separá mecanismo de decisión. «OnPush reduce comprobaciones» describe un efecto. «Uso OnPush con estado inmutable porque los cambios llegan por inputs y signals» explica una decisión. La segunda respuesta permite evaluar si entendés cuándo la herramienta encaja.",
            "Nombrá las restricciones que cambian la solución: volumen de datos, frecuencia de actualización, SEO, latencia, accesibilidad, seguridad, soporte de navegadores y capacidad del equipo. Si la pregunta no las informa, declaralas como supuestos en vez de inventar un escenario silenciosamente.",
            "Compará alternativas con el mismo criterio. Para cada opción indicá beneficio, costo y modo de falla. Por ejemplo, SSR mejora el HTML inicial y el SEO, pero agrega infraestructura y exige código compatible con servidor; CSR simplifica la operación, pero depende más de JavaScript para el primer contenido.",
            "Explicá cómo validarías la decisión. Rendimiento se comprueba con métricas como LCP, INP, tamaño de bundle o tiempo de tarea; una migración se valida con tests, telemetría, despliegue gradual y rollback; una mejora de equipo se valida con lead time, defectos o carga operativa.",
            "Una respuesta débil enumera herramientas: «usaría Signals, OnPush y lazy loading». Una respuesta sólida conecta problema y evidencia: «el perfil mostró demasiadas vistas comprobadas; moví el estado local a Signals, mantuve referencias inmutables y medí menos scripting sin cambiar el comportamiento».",
            "Si no recordás una API exacta, no inventes. Explicá el modelo que sí conocés, aislá el detalle dudoso y decí cómo lo verificarías en la documentación o con una prueba mínima. El razonamiento correcto es más valioso que una firma memorizada incorrectamente.",
            "Para una experiencia real usá Contexto, Decisión, Acción y Resultado. El resultado debe incluir una señal verificable: latencia, errores, conversión, tiempo de entrega, incidentes evitados o feedback del equipo. Si no hubo medición, decí qué observaste y qué medirías hoy.",
        ],
        "qa": [
            ("¿Qué diferencia una respuesta Senior?", "No es la cantidad de APIs nombradas. Es poder explicar el mecanismo, elegir según restricciones, comparar alternativas y proponer una forma de validar el resultado. Por ejemplo, no basta con decir «uso `switchMap`»: hay que explicar que conserva sólo la operación interna más reciente y por qué esa política coincide con el problema."),
            ("¿Qué hacés si no sabés una API exacta?", "Decí qué parte conocés, razoná desde el modelo de Angular y explicá cómo verificarías el detalle. Inventar una firma daña más que reconocer un borde."),
            ("¿Cómo evitás responder «depende» sin tomar una posición?", "Nombrá dos o tres condiciones decisivas, fijá un escenario razonable y elegí. Por ejemplo: «si la página necesita SEO y contenido inicial rápido, elegiría SSR; si es una herramienta interna autenticada, empezaría con CSR». Después explicá qué dato haría cambiar la decisión."),
            ("¿Cómo convertís una opinión en una decisión técnica defendible?", "Definí el objetivo, compará alternativas con los mismos criterios y acordá una señal de éxito. «Prefiero Signals» es una opinión; «uso Signals para estado local síncrono porque simplifica derivaciones y verifico el impacto con legibilidad, tests y profiling» es una decisión discutible y medible."),
        ],
    },
    {
        "title": "2. Angular moderno y estrategia de versiones",
        "intro": "La guía toma Angular 22 como referencia. Angular 22 está activo desde junio de 2026; Angular 21 y 20 siguen en LTS. Un Senior distingue APIs estables, migraciones y compatibilidad.",
        "master": [
            "Angular alinea las versiones mayores de core y CLI. Revisá `ng version`, la tabla Node/TypeScript/RxJS y el Update Guide antes de migrar.",
            "Las aplicaciones nuevas usan componentes standalone. NgModules siguen siendo relevantes en bases antiguas y bibliotecas, pero ya no deben dirigir un diseño nuevo sin motivo.",
            "Angular 21+ usa change detection zoneless por defecto. El código debe notificar cambios mediante signals, listeners, `AsyncPipe`, `setInput` o `markForCheck`.",
            "El control flow moderno usa `@if`, `@for`, `@switch` y `@empty`. `track` necesita una identidad estable; usar el índice en listas mutables crea errores visuales y trabajo DOM.",
            "`@defer` separa código y admite triggers, prefetch, placeholder, loading y error. Medí LCP y CLS antes de diferir contenido visible.",
            "Tratamiento de APIs nuevas: confirmá estabilidad, soporte del equipo y costo de fallback. `resource`, `httpResource` y Signal Forms merecen una discusión de madurez.",
        ],
        "qa": [
            ("¿Migrarías todo a la última versión?", "Migraría por incrementos soportados, con tests, presupuestos de bundle y observabilidad. Priorizo seguridad, compatibilidad y APIs deprecadas; después adopto sintaxis nueva."),
            ("¿Standalone elimina los módulos?", "Elimina la necesidad de NgModules para declarar componentes. Los módulos todavía pueden agrupar APIs heredadas o librerías. Standalone simplifica dependencias y lazy loading."),
        ],
    },
    {
        "title": "3. TypeScript avanzado",
        "intro": "Angular amplifica TypeScript. Una base débil en el lenguaje produce templates inseguros, estado mutable y RxJS difícil de mantener.",
        "master": [
            "Explicá scope y hoisting de `var`, `let` y `const`; closures; event loop; microtasks frente a macrotasks; coerción; igualdad; prototipos y `this`.",
            "Usá `unknown` para datos sin validar, `never` para exhaustividad y generics para preservar tipos. Evitá `any` porque corta el análisis estático.",
            "Modelá estados con discriminated unions: `idle | loading | success | error`. Un `@switch` exhaustivo detecta casos nuevos.",
            "Preferí inmutabilidad por referencia en inputs y estado. Copiar objetos superficialmente no protege estructuras anidadas.",
            "Conocé `satisfies`, utility types, type guards, optional chaining, nullish coalescing, decorators y configuración estricta.",
            "`Promise` representa un resultado; `Observable` representa cero o más valores, permite cancelación por unsubscribe y composición mediante operadores.",
        ],
        "qa": [
            ("¿Por qué `unknown` supera a `any`?", "`unknown` obliga a validar o estrechar el tipo antes de usarlo. `any` permite operaciones inválidas y propaga huecos por toda la aplicación."),
            ("¿`interface` o `type`?", "Ambos describen formas de objetos. `interface` admite declaration merging y extensión orientada a contratos; `type` también representa unions, intersections, tuplas y tipos calculados. La consistencia del código y la capacidad necesaria deciden la elección."),
        ],
        "code": """type LoadState<T> =
  | { kind: 'idle' }
  | { kind: 'loading' }
  | { kind: 'success'; data: T }
  | { kind: 'error'; error: Error };

function assertNever(value: never): never {
  throw new Error(`Unhandled state: ${JSON.stringify(value)}`);
}""",
    },
    {
        "title": "4. Componentes, templates y composición",
        "intro": "Un componente Senior mantiene una API pequeña, estado local explícito y un template legible. La composición supera a la herencia para reutilizar UI.",
        "master": [
            "Conocé metadata, selector, host bindings, styles, encapsulación, change detection, imports y providers locales.",
            "Usá signal inputs `input()` y outputs `output()` cuando la versión del proyecto lo soporte. `model()` crea entrada y salida para two-way binding; reservá esa API para controles con semántica clara.",
            "La proyección con `ng-content` define slots estáticos. `TemplateRef`, `ng-template`, `ViewContainerRef` y creación dinámica cubren composición avanzada.",
            "Las queries `viewChild`, `viewChildren`, `contentChild` y `contentChildren` pueden exponer signals. Marcá `required` solo cuando el contrato garantice el hijo.",
            "Una directiva añade comportamiento; un componente añade comportamiento y vista. Una pipe pura debe transformar sin efectos y devolver el mismo resultado para las mismas entradas.",
            "Mantené expresiones de template baratas. Mové derivaciones a `computed`; evitá invocar funciones costosas durante cada render.",
        ],
        "qa": [
            ("¿Input o servicio de estado?", "Un input expresa dependencia del padre y mantiene el componente reutilizable. Un servicio sirve para estado compartido por ramas distantes o un dominio. No ocultes datos de presentación globalizando todo."),
            ("¿Content projection o input TemplateRef?", "`ng-content` funciona para slots fijos y ergonomía declarativa. `TemplateRef` permite repetir, parametrizar o elegir plantillas en tiempo de ejecución."),
        ],
    },
    {
        "title": "5. Ciclo de vida y render hooks",
        "intro": "El orden importa cuando un componente coordina inputs, queries, DOM y recursos externos.",
        "master": [
            "El constructor configura dependencias y estado barato. `ngOnInit` usa inputs inicializados. `ngOnChanges` reacciona a cambios de inputs y corre antes de `ngOnInit` en la primera pasada.",
            "`ngAfterContentInit/Checked` se relacionan con contenido proyectado. `ngAfterViewInit/Checked` se relacionan con la vista propia y queries.",
            "`afterNextRender` y `afterEveryRender` sirven para trabajo DOM después del render. Separá fases de lectura y escritura para evitar layout thrashing.",
            "`DestroyRef` y `takeUntilDestroyed` colocan la limpieza cerca de la creación del recurso. Limpiá subscriptions manuales, observers, timers y listeners externos.",
            "`ExpressionChangedAfterItHasBeenCheckedError` señala una mutación durante una verificación que dejó el árbol inconsistente. Corregí el flujo de datos; un timer suele esconder la causa.",
        ],
        "qa": [
            ("¿Constructor o `ngOnInit`?", "El constructor pertenece a TypeScript y DI. `ngOnInit` pertenece al ciclo de Angular y recibe inputs listos. Evitá I/O en ambos si un resolver, store o recurso expresa mejor la carga."),
            ("¿Cómo evitás leaks?", "Uso `AsyncPipe`, signals o `takeUntilDestroyed`; limpio APIs externas con `DestroyRef.onDestroy`. Después verifico navegación repetida con profiler y tests."),
        ],
    },
    {
        "title": "6. Change detection, Signals y zoneless",
        "intro": "Esta sección suele separar experiencia reciente de conocimiento heredado. Explicá quién notifica a Angular, qué vista queda dirty y cuándo se recalcula una derivación.",
        "master": [
            "Default verifica un subárbol con mayor frecuencia. OnPush permite saltar subárboles cuando no reciben nuevos inputs ni notificaciones.",
            "Un signal writable usa `set` o `update`; `computed` deriva estado, memoriza y rastrea dependencias dinámicas; `effect` conecta estado reactivo con una API no reactiva.",
            "No copies estado derivado con `effect`. Usá `computed` para evitar ciclos, escrituras redundantes y `ExpressionChanged`.",
            "Signals comparan por `Object.is` salvo función de igualdad. Una mutación profunda conserva la referencia y puede ocultar el cambio.",
            "`untracked` lee un signal sin registrar dependencia. Usalo cuando la lectura sea incidental, no para tapar un grafo mal diseñado.",
            "Zoneless reduce parches y checks innecesarios. Requiere que las actualizaciones lleguen mediante APIs que notifican a Angular.",
            "Signals y RxJS se complementan: signals para estado síncrono leído por la vista; RxJS para flujos asíncronos, cancelación, concurrencia y eventos.",
        ],
        "qa": [
            ("¿OnPush vuelve inmutable la app?", "No. OnPush cambia cuándo Angular verifica la vista. La inmutabilidad facilita detectar cambios por referencia y evita estado compartido corrupto."),
            ("¿Cuándo usar `effect`?", "Para logging, almacenamiento, canvas, APIs del navegador o integración externa. Las derivaciones de UI pertenecen a `computed`."),
            ("¿Qué rompe al quitar ZoneJS?", "Código que muta campos sin emitir una notificación compatible, además de dependencias en eventos de `NgZone`. Migraría estado a signals o marcaría la vista."),
        ],
        "code": """private readonly query = signal('');
readonly normalizedQuery = computed(() => this.query().trim().toLowerCase());
readonly results = computed(() =>
  this.items().filter(x => x.name.toLowerCase().includes(this.normalizedQuery()))
);""",
    },
    {
        "title": "7. Dependency Injection en profundidad",
        "intro": "Angular resuelve dependencias en jerarquías. La ubicación del provider define vida útil, visibilidad y aislamiento.",
        "master": [
            "`providedIn: 'root'` crea un singleton por root EnvironmentInjector y permite tree shaking. Un provider de componente crea una instancia por componente.",
            "La resolución busca primero ElementInjectors y después EnvironmentInjectors. Lazy routes pueden crear contextos e instancias separadas.",
            "Dominá `useClass`, `useValue`, `useExisting`, `useFactory`, multi providers e `InjectionToken` para contratos no representados por clases.",
            "`providers` es visible para vista y contenido descendiente; `viewProviders` oculta el provider al contenido proyectado.",
            "`self`, `skipSelf`, `host` y `optional` limitan la búsqueda. Usalos para contratos intencionales, no como parche.",
            "`inject()` necesita injection context: inicializador, constructor administrado por DI, factory o `runInInjectionContext`.",
        ],
        "qa": [
            ("¿Un servicio Angular es siempre singleton?", "Es singleton dentro del injector que lo provee. Dos injectors pueden crear dos instancias. La frase 'singleton global' omite el scope."),
            ("¿Por qué usar InjectionToken?", "Permite inyectar configuración, funciones o interfaces borradas en runtime. El token conserva identidad y puede definir factory y tipo."),
        ],
    },
    {
        "title": "8. RxJS y concurrencia",
        "intro": "La entrevista Senior suele plantear búsquedas, guardado, polling o eventos concurrentes. Elegí el operador a partir de la política de concurrencia.",
        "master": [
            "Cold observables crean el productor por subscription; hot observables comparten un productor externo. `share` y `shareReplay` cambian esa relación.",
            "`switchMap` cancela el inner anterior; sirve para búsqueda. `concatMap` serializa; sirve para preservar orden. `mergeMap` permite concurrencia. `exhaustMap` ignora disparos mientras uno está activo.",
            "`map` transforma valores; `tap` ejecuta efectos; `filter` decide emisiones; `scan` acumula; `catchError` define el límite del error.",
            "Colocá `catchError` dentro del flattening operator si querés que el stream exterior sobreviva al fallo de una petición.",
            "`combineLatest` reacciona a últimos valores; `forkJoin` espera que todos completen; `withLatestFrom` toma contexto cuando la fuente emite.",
            "`Subject`, `BehaviorSubject` y `ReplaySubject` tienen contratos distintos. No expongas un subject writable; exponé `asObservable()`.",
            "`shareReplay({bufferSize: 1, refCount: true})` puede cachear, pero necesitás invalidación, manejo de error y semántica de vida útil.",
        ],
        "qa": [
            ("¿Por qué no subscribirse dentro de subscribe?", "Anida ciclos de vida y errores, complica cancelación y crea carreras. Un operador de flattening expresa la política y devuelve una sola subscription."),
            ("¿Cómo cancelás una búsqueda anterior?", "Debounceo, elimino duplicados y uso `switchMap`. El unsubscribe cancela la petición XHR/fetch cuando el backend y el cliente lo permiten."),
        ],
        "code": """results$ = this.query.valueChanges.pipe(
  debounceTime(250),
  distinctUntilChanged(),
  switchMap(query => this.api.search(query).pipe(
    catchError(error => of({ items: [], error }))
  )),
  shareReplay({ bufferSize: 1, refCount: true })
);""",
    },
    {
        "title": "9. Estado: local, servicios, Signals y NgRx",
        "intro": "No existe una herramienta única. Un Senior reduce el alcance del estado y aumenta la estructura cuando la complejidad lo exige.",
        "master": [
            "Estado local de componente: UI efímera. Servicio de feature: coordinación de una rama. Store global: datos compartidos, flujos complejos, auditoría o herramientas de desarrollo.",
            "Separá server state de client state. Cache, stale time, invalidación y reintentos pertenecen al acceso remoto; selección y filtros pertenecen a UI.",
            "En NgRx dominá actions como eventos, reducers puros, selectors memorizados, effects para I/O y Entity para colecciones normalizadas.",
            "Evitá guardar estado derivado; creá selectors o computed. Evitá actions que describen comandos de UI si un evento de dominio expresa mejor el hecho.",
            "ComponentStore o SignalStore cubren features sin pagar toda la ceremonia global. Evaluá estabilidad, ecosistema y experiencia del equipo.",
            "Planificá optimistic update con rollback, idempotencia y resolución de conflictos. Un spinner no resuelve consistencia.",
        ],
        "qa": [
            ("¿Cuándo elegir NgRx?", "Cuando varios flujos comparten estado, necesitás trazabilidad, efectos coordinados o reglas complejas. Para un formulario aislado, un store global aumenta costo sin beneficio."),
            ("¿Qué nunca guardarías en el store?", "Derivaciones recalculables, objetos no serializables sin necesidad y estado DOM efímero. Guardaría la fuente mínima de verdad."),
        ],
    },
    {
        "title": "10. Routing y navegación",
        "intro": "El router define fronteras de carga, autorización y datos. Diseñá rutas como parte de la arquitectura.",
        "master": [
            "Usá lazy loading por feature con `loadComponent` o `loadChildren`. Evitá un chunk por componente diminuto que aumente requests sin beneficio.",
            "Guards controlan navegación en el cliente; el servidor debe repetir autorización. `CanMatch` evita seleccionar rutas; `CanActivate` decide activación.",
            "Resolvers reducen estados intermedios cuando la ruta necesita datos antes de mostrar. Para pantallas tolerantes al loading, una carga dentro de la feature mejora percepción.",
            "Dominá params, query params, fragment, nested routes, outlets, redirects, title y route data.",
            "Una reuse strategy conserva componentes, pero también subscriptions y memoria. Definí invalidación.",
            "Probá navegación con `RouterTestingHarness`, incluyendo params inválidos, rechazo de guards y errores de resolver.",
        ],
        "qa": [
            ("¿Guard equivale a seguridad?", "No. Un usuario controla el cliente. El guard mejora UX y evita navegación accidental; la API autoriza cada operación."),
            ("¿Resolver o carga en componente?", "Resolver cuando la vista no tiene sentido sin el dato o necesitás coherencia antes de activar. Carga en componente para streaming, skeletons o contenido parcial."),
        ],
    },
    {
        "title": "11. Formularios complejos",
        "intro": "Los formularios Senior incluyen tipado, composición, validación asíncrona, accesibilidad y rendimiento.",
        "master": [
            "Reactive Forms modela el formulario en TypeScript; template-driven sirve para casos pequeños. Typed Forms reduce casts y errores.",
            "`FormControl`, `FormGroup`, `FormArray` y `FormRecord` cubren formas fijas, listas y claves dinámicas.",
            "Un validador síncrono devuelve `ValidationErrors | null`; uno asíncrono devuelve Promise u Observable y necesita cancelación o debounce según el caso.",
            "`ControlValueAccessor` integra un control propio con la API de forms. Implementá value, disabled, touched y change sin loops.",
            "No uses `valueChanges` para copiar cada campo a otro objeto. Elegí una fuente de verdad y derivá lo demás.",
            "Mostrá errores después de interacción o submit; asociá mensajes con el control y mantené foco y lector de pantalla.",
            "Signal Forms ofrece un modelo nuevo en versiones recientes. Presentalo como opción a evaluar, no como reemplazo automático de Reactive Forms.",
        ],
        "qa": [
            ("¿Cómo diseñarías 60 formularios dinámicos?", "Defino un schema tipado, componentes por tipo de campo, reglas de visibilidad derivadas y validadores registrables. Separo datos, layout y comportamiento; pruebo el motor con casos de contrato."),
            ("¿Qué falla en un CVA?", "Emitir durante `writeValue`, olvidar estado disabled o no marcar touched. Eso crea loops y rompe la semántica del formulario."),
        ],
    },
    {
        "title": "12. HTTP, APIs, errores y caché",
        "intro": "El cliente debe modelar contratos, cancelación y fallos. Los interceptors resuelven preocupaciones transversales, no lógica de dominio.",
        "master": [
            "Configurá `provideHttpClient` y functional interceptors. Encapsulá endpoints detrás de servicios o repositorios de feature.",
            "TypeScript no valida JSON en runtime. Validá fronteras con schema cuando el riesgo lo justifique y mapeá DTOs a modelos internos.",
            "Interceptors: auth, correlation ID, logging técnico, métricas y normalización de errores. Evitá loaders globales frágiles sin contador de requests.",
            "Diseñá retry solo para operaciones idempotentes o con clave de idempotencia. Aplicá backoff y límite; no reintentes 4xx funcionales.",
            "Diferenciá timeout, cancelación, offline, error de red, 401/403, 404, validación y 5xx. La UI necesita acciones distintas.",
            "`httpResource` conecta HttpClient con signals y estados de carga. Evaluá cache e invalidación antes de adoptarlo en un dominio grande.",
            "Caché: definí clave, vida útil, invalidación, deduplicación de requests, stale data y aislamiento por usuario.",
        ],
        "qa": [
            ("¿Dónde refrescarías un token?", "En una capa de autenticación coordinada por interceptor, con una sola renovación en vuelo y cola controlada. Evito loops y limpio sesión si falla el refresh."),
            ("¿Cómo tipar una respuesta HTTP?", "El generic de HttpClient expresa la expectativa, no valida el servidor. En una frontera crítica valido y transformo el DTO antes de exponerlo."),
        ],
    },
    {
        "title": "13. Arquitectura de aplicaciones Angular",
        "intro": "Una arquitectura útil reduce acoplamiento y hace visibles los límites del dominio.",
        "master": [
            "Organizá por feature y dominio, no por tipo técnico global. Cada feature contiene UI, acceso a datos, modelos y rutas que le pertenecen.",
            "Separá componentes presentacionales de orquestadores cuando la separación simplifique pruebas o reutilización. No conviertas la regla en capas vacías.",
            "Aplicá dependency inversion con tokens y adapters en fronteras que cambian: analytics, storage, pagos, APIs externas.",
            "Definí public APIs para librerías y features. Evitá imports profundos que salten límites y hacen imposible refactorizar.",
            "Un monorepo mejora sharing y refactors coordinados; agrega costo de tooling y ownership. Nx puede imponer boundaries y cachear tareas.",
            "Micro-frontends sirven para despliegue y ownership independientes. Aumentan duplicación, integración, observabilidad y consistencia visual.",
            "Documentá decisiones con ADRs: contexto, opciones, elección, consecuencias y fecha de revisión.",
        ],
        "qa": [
            ("¿Clean Architecture en frontend?", "Uso sus límites y dependency inversion donde protegen reglas de negocio. Evito copiar capas backend si solo agregan archivos y mapeos."),
            ("¿Cuándo extraer una librería?", "Cuando existe un contrato estable y más de un consumidor real, o cuando el límite necesita ownership y tests propios. Extraer por anticipación congela APIs inmaduras."),
        ],
    },
    {
        "title": "14. Patrones, SOLID y calidad de diseño",
        "intro": "Los patrones nombran soluciones recurrentes. Una entrevista Senior espera contexto y costo, no una lista memorizada.",
        "master": [
            "Strategy para políticas intercambiables; Adapter para integrar contratos externos; Facade para reducir superficie; Factory para construcción variable.",
            "Observer aparece en RxJS; Decorator en metadata e interceptors; Command y event patterns aparecen en stores. Singleton depende del injector.",
            "SRP separa motivos de cambio. OCP favorece extensión por contratos. LSP exige sustitución válida. ISP mantiene contratos pequeños. DIP invierte dependencias hacia abstracciones.",
            "Composition over inheritance evita jerarquías rígidas. Las directivas, providers y content projection forman mecanismos de composición.",
            "Detectá god services, shared modules masivos, barrel cycles, boolean flags acumulados, subscriptions anidadas y lógica de negocio en templates.",
        ],
        "qa": [
            ("¿Cómo implementar Singleton?", "En Angular proveo el servicio en un injector compartido. La garantía vale dentro de ese scope; providers locales o múltiples aplicaciones crean otras instancias."),
            ("¿Facade sobre NgRx?", "Puede estabilizar la API de la feature y ocultar detalles del store. También puede esconder capacidades y duplicar nombres. La uso cuando protege un límite real."),
        ],
    },
    {
        "title": "15. Rendimiento y Core Web Vitals",
        "intro": "Optimizar sin medir cambia complejidad por intuición. Un Senior identifica la métrica, captura un perfil y verifica el resultado.",
        "master": [
            "Medí LCP, INP y CLS, tamaño de bundles, long tasks, memoria y frecuencia de renders. Lighthouse orienta; DevTools y RUM muestran el producto real.",
            "Reducí JavaScript inicial con lazy routes y `@defer`. Controlá waterfalls, preloading, prefetch y caché HTTP.",
            "Usá `OnPush`, signals y `track` estable para limitar trabajo. Virtualizá listas grandes; paginá cuando el dominio lo permita.",
            "Evitá pipes impuras, funciones costosas en template, listeners globales sin cleanup, imágenes sin dimensiones y paquetes pesados.",
            "AOT, tree shaking, budgets y source-map analysis detectan regresiones. Un import pequeño puede arrastrar una dependencia grande.",
            "Separá lectura y escritura DOM, debounceá eventos de alta frecuencia y mové CPU intenso a Web Worker si el costo de comunicación lo permite.",
        ],
        "qa": [
            ("La app está lenta, ¿por dónde empezás?", "Defino la interacción lenta, reproduzco con datos reales y grabo performance. Identifico red, scripting, layout o memoria; cambio una causa y vuelvo a medir."),
            ("¿`trackBy` sigue existiendo?", "En `*ngFor` sí. El control flow moderno usa `track`. Ambos preservan identidad DOM; una clave inestable anula el beneficio."),
        ],
    },
    {
        "title": "16. SSR, SSG, hidratación y rendering híbrido",
        "intro": "Elegí estrategia por ruta. SEO, personalización, costo de servidor y tiempo de interacción empujan decisiones distintas.",
        "master": [
            "CSR simplifica aplicaciones privadas. SSG sirve contenido estable. SSR sirve HTML fresco y SEO. Hybrid combina estrategias por ruta.",
            "Hydration reutiliza el HTML del servidor. El cliente debe producir una estructura compatible; DOM inválido o manipulación directa rompe el proceso.",
            "Incremental hydration activa sectores cuando se necesitan y trabaja con `@defer`. Event replay conserva interacciones previas a la hidratación.",
            "Protegé acceso a `window`, `document`, storage y APIs de navegador. Usá platform checks, DI o render hooks.",
            "Transfer cache evita repetir en cliente ciertas peticiones hechas en servidor. Revisá privacidad para no mezclar datos por usuario.",
            "Controlá CLS con placeholders de igual tamaño. El contenido above-the-fold necesita una estrategia distinta al contenido secundario.",
        ],
        "qa": [
            ("¿SSR mejora todo el rendimiento?", "Mejora entrega de HTML y SEO, pero agrega servidor e hidratación. Puede empeorar TTFB o interacción si el backend y el bundle no acompañan."),
            ("¿Qué causa hydration mismatch?", "HTML diferente entre servidor y cliente, fechas o random no deterministas, DOM manipulado antes de hidratar y markup inválido."),
        ],
    },
    {
        "title": "17. Testing y estrategia de calidad",
        "intro": "Una suite Senior protege comportamiento y contratos. Evitá tests que copian la implementación.",
        "master": [
            "Pirámide práctica: muchas pruebas de lógica, componentes para comportamiento DOM, integración en fronteras y pocos E2E de journeys críticos.",
            "Angular moderno documenta Vitest junto con TestBed. Bases existentes pueden usar Jasmine/Jest; la estrategia importa más que la sintaxis.",
            "Probá componentes mediante DOM, roles y eventos. Evitá acceder a métodos privados o afirmar detalles internos.",
            "`HttpTestingController` verifica método, URL, body, headers y errores. Cerrá con `verify()`.",
            "`RouterTestingHarness` simplifica navegación. Los component harnesses crean APIs de prueba estables para UI reutilizable.",
            "Para RxJS, controlá tiempo con fake timers o marble tests cuando la secuencia lo justifique. No uses sleeps reales.",
            "Definí qué no mockear. Mocks excesivos pueden permitir una integración imposible. Contract tests protegen DTOs y adapters.",
        ],
        "qa": [
            ("¿Qué test escribirías primero?", "El riesgo más caro: regla de dominio, permiso, pago, migración o interacción que ya falló. La cobertura porcentual no reemplaza esa priorización."),
            ("¿Unit test de un componente con servicio?", "Sustituyo la frontera del servicio, ejecuto la interacción por el DOM y verifico el resultado visible y la llamada relevante. No pruebo Angular."),
        ],
    },
    {
        "title": "18. Seguridad web en Angular",
        "intro": "Angular escapa y sanitiza varios bindings, pero el equipo todavía controla autenticación, autorización, dependencias y datos peligrosos.",
        "master": [
            "Interpolación y property binding tratan valores como datos. `[innerHTML]` pasa por sanitización; URLs de recursos y bypass APIs requieren revisión estricta.",
            "`DomSanitizer.bypassSecurityTrust*` no limpia datos. Declara que el desarrollador ya confía en ellos. Centralizá y auditá su uso.",
            "CSP y Trusted Types reducen impacto de XSS. Evitá `eval`, HTML construido a mano y scripts inline.",
            "CSRF afecta autenticación basada en cookies; usá SameSite, tokens XSRF y validación server-side. Un bearer token tiene otros riesgos de almacenamiento y exfiltración.",
            "Nunca confíes en guards para autorización. Validá permisos y ownership en la API.",
            "Evitá guardar secretos en el bundle. Variables de entorno frontend son configuración pública.",
            "Mantené Angular y dependencias soportadas; auditá supply chain, lockfile y paquetes abandonados.",
        ],
        "qa": [
            ("¿Angular evita XSS?", "Reduce XSS al escapar y sanitizar contextos conocidos. DOM APIs directas, bypass, librerías y HTML externo reabren el riesgo."),
            ("¿LocalStorage o cookies para tokens?", "Depende del modelo de amenaza. Cookies HttpOnly reducen lectura por XSS y exigen CSRF controls. LocalStorage simplifica headers pero expone el token a JavaScript comprometido."),
        ],
    },
    {
        "title": "19. Accesibilidad, HTML y CSS",
        "intro": "La accesibilidad forma parte del contrato de UI. Un Senior la integra en componentes y Definition of Done.",
        "master": [
            "Preferí HTML semántico: button para acciones, anchor para navegación, headings ordenados, labels asociados y landmarks.",
            "Mantené navegación por teclado, foco visible y orden lógico. Un modal debe atrapar foco, anunciarse y devolver foco al disparador.",
            "ARIA complementa semántica; no corrige un elemento incorrecto. Usá nombre, rol y estado que las tecnologías asistivas puedan leer.",
            "Anunciá errores y cambios asíncronos con relación al control o live regions cuando corresponda.",
            "CSS: cascade, specificity, stacking contexts, box model, Flexbox, Grid, container/media queries y responsive images.",
            "Diseñá componentes para zoom, texto largo, contraste, reduced motion, high contrast y localización.",
        ],
        "qa": [
            ("¿Div con click o button?", "Button aporta teclado, foco, rol y activación sin recrear comportamiento. Un div exige implementar y mantener todo eso."),
            ("¿Cómo probás accesibilidad?", "Combino lint y axe con teclado real, lector de pantalla en flujos críticos y revisión de foco, contraste y nombres accesibles."),
        ],
    },
    {
        "title": "20. Build, CI/CD, configuración y upgrades",
        "intro": "El frontend llega a producción mediante una cadena que también necesita diseño y ownership.",
        "master": [
            "Separá configuración de build de secretos. Validá configuración al arrancar y evitá divergencias entre entornos.",
            "CI ejecuta typecheck, lint, unit tests, build con budgets y pruebas críticas. Cacheá dependencias y tareas con claves correctas.",
            "Publicá assets con hash y caché larga; HTML con política corta. Planeá rollback y compatibilidad entre frontend nuevo y API anterior.",
            "Usá feature flags con owner, fecha de retiro y métricas. Un flag permanente duplica caminos y tests.",
            "`ng update` y schematics automatizan migraciones. Actualizá una major por vez, leé deprecations y medí bundle y runtime.",
            "Source maps de producción necesitan acceso restringido. Asociá release, commit y errores para depurar.",
        ],
        "qa": [
            ("¿Cómo desplegás sin romper usuarios con pestañas abiertas?", "Mantengo compatibilidad temporal de API, manejo chunk-load errors, uso assets versionados y evito borrar archivos previos antes de que expire su caché."),
            ("¿Qué mirás después de un upgrade?", "Errores, tests, bundle, Web Vitals, warnings, cambios de browser support y dependencias pares. Después retiro compatibilidad obsoleta."),
        ],
    },
    {
        "title": "21. Observabilidad, errores y debugging",
        "intro": "Un Senior diseña cómo detectar y explicar fallos antes de que aparezca el incidente.",
        "master": [
            "Capturá errores no manejados en la frontera, conservá causa y contexto, y evitá mostrar stack o datos sensibles al usuario.",
            "Agregá release, ruta, acción, correlation ID, usuario anonimizado y breadcrumbs. El backend debe propagar el mismo identificador.",
            "Medí tasa de error, latencia por endpoint, Web Vitals y éxito de journeys. Logs sin preguntas operativas crean ruido.",
            "Angular DevTools muestra árbol, DI y profiling. Chrome Performance, Network, Memory y Coverage completan el diagnóstico.",
            "Para memory leaks, repetí navegación, tomá heap snapshots y buscá detached nodes, listeners, timers y caches sin límite.",
            "Diseñá error boundaries de feature: retry, fallback, estado parcial y soporte. Un toast genérico pierde la acción recuperable.",
        ],
        "qa": [
            ("¿Cómo investigás un bug que no reproducís?", "Aumento contexto observable, comparo versión, navegador y ruta de datos, y creo una hipótesis verificable. Evito cambios especulativos sin señal."),
            ("¿Qué reportarías en un error HTTP?", "Endpoint normalizado, status, duración, correlation ID y operación. Redacto o elimino body, tokens y datos personales."),
        ],
    },
    {
        "title": "22. System design frontend",
        "intro": "En una entrevista de diseño, empezá por requisitos y recorré datos, límites, fallos, rendimiento y operación.",
        "master": [
            "Aclará usuarios, flujos críticos, SEO, offline, tiempo real, volumen, permisos, localización y objetivos de rendimiento.",
            "Dibujá features, router, estado, API layer, componentes compartidos y fronteras de dominio. Identificá dueño de cada dato.",
            "Explicá cache y consistencia: key, TTL, invalidación, optimistic updates, conflictos y paginación.",
            "Para tiempo real, compará WebSocket, SSE y polling. Planificá reconexión, ordering, deduplicación y backpressure.",
            "Definí seguridad, accesibilidad, observabilidad, estrategia de pruebas, despliegue y migración. El diseño termina en producción.",
            "Proponé una primera versión y el punto donde cambiarías de estrategia. Evitá diseñar para una escala imaginaria.",
        ],
        "qa": [
            ("Diseñá un dashboard con datos en vivo", "Agrupo widgets por frecuencia y ownership, uso un servicio de conexión con multiplexing, normalizo eventos, aplico backpressure y renderizo con signals. Pauso streams invisibles y mido INP."),
            ("Diseñá una librería de componentes", "Defino tokens de diseño, accesibilidad y APIs pequeñas; publico harnesses, documentación y semver. Pruebo keyboard, themes, SSR y breaking changes."),
        ],
    },
    {
        "title": "23. Liderazgo técnico y trabajo en equipo",
        "intro": "El nivel Senior incluye decisiones compartidas, mentoring, manejo de incidentes y entrega predecible.",
        "master": [
            "En code review priorizá corrección, seguridad, diseño y tests. Separá bloqueantes de sugerencias y explicá el motivo.",
            "Una decisión técnica necesita contexto, alternativas y consecuencias. Registrá acuerdos importantes y fecha de revisión.",
            "Mentoring: hacé visible el modelo mental, graduá dificultad y devolvé ownership. Evitá convertirte en cuello de botella.",
            "Durante un incidente, estabilizá, comunicá impacto, asigná roles y guardá evidencia. El postmortem corrige sistema y proceso.",
            "Negociá alcance con datos: riesgo, dependencia, costo de demora y opción incremental. No escondas incertidumbre.",
            "Medí salud técnica con tiempo de entrega, defectos, mantenimiento, adopción y carga cognitiva; contar líneas o tickets distorsiona.",
        ],
        "qa": [
            ("¿Cómo resolvés un desacuerdo técnico?", "Alineo restricciones, comparo opciones con criterios, hago un spike si falta evidencia y documento la decisión. Después apoyo la opción acordada."),
            ("¿Cómo manejaste feedback negativo?", "Describí el caso de modularización de formularios: escuchaste, revisaste estándares, refactorizaste por responsabilidad, pediste otra revisión y aplicaste el aprendizaje."),
        ],
    },
    {
        "title": "24. Preparación personal y respuestas conductuales",
        "intro": "Tu experiencia ofrece material sólido. Convertí cada proyecto en evidencia medible y ajustá la introducción al rol.",
        "master": [
            "Pitch de 60-90 segundos: especialidad, años, dominios, dos logros y motivo de interés. Evitá recorrer el CV línea por línea.",
            "STAR: situación y tarea breves; acción centrada en tus decisiones; resultado con métrica, aprendizaje o reducción de riesgo.",
            "Prepará historias sobre conflicto, error, feedback, liderazgo, deadline, incertidumbre, incidente, mejora de rendimiento y decisión arquitectónica.",
            "Tu caso de formularios dinámicos puede demostrar arquitectura, Redux/NgRx, escalabilidad y coordinación. Cuantificá cantidad, tiempos y defectos si tenés datos.",
            "Tu experiencia Angular 2-actualidad permite explicar migraciones y evolución del framework. Elegí dos cambios que hayas adoptado y uno que hayas rechazado.",
            "Terminá con preguntas sobre arquitectura, calidad, equipo, roadmap, incidentes, autonomía y criterio de éxito del rol.",
        ],
        "qa": [
            ("Contame sobre vos", "Soy Frontend Developer especializado en Angular, con experiencia desde Angular 2 y equipos distribuidos. He diseñado formularios dinámicos a escala y productos de datos. Busco un rol donde pueda combinar arquitectura, entrega y mentoring."),
            ("¿Por qué querés cambiar?", "Enfocá crecimiento, alcance técnico y tipo de producto. Evitá hablar mal del equipo actual o usar una respuesta genérica."),
        ],
    },
]


foundation_chapters = [
    {
        "title": "JavaScript: tipos, coerción, scope y funciones",
        "intro": "Estas preguntas aparecen en entrevistas frontend de cualquier nivel. Una respuesta Senior explica la regla del lenguaje, muestra un caso que falla y propone una forma de escribir código predecible.",
        "master": [
            "JavaScript tiene tipos primitivos `undefined`, `null`, `boolean`, `number`, `bigint`, `string` y `symbol`. Los objetos se comparan por referencia. `typeof null` devuelve `object` por una decisión histórica.",
            "`var` posee function scope, permite redeclaración y su declaración se eleva. `let` y `const` poseen block scope y permanecen en temporal dead zone hasta la inicialización. `const` fija la referencia, no vuelve inmutable el objeto.",
            "La coerción implícita aplica reglas distintas según el operador. `+` concatena si aparece un string; otros operadores numéricos convierten operandos. Preferí conversiones explícitas en fronteras.",
            "`===` compara tipo y valor sin coerción. `Object.is` difiere en `NaN` y `-0`. `==` tiene casos útiles, como `value == null`, pero exige conocer su tabla de coerción.",
            "Falsy incluye `false`, `0`, `-0`, `0n`, cadena vacía, `null`, `undefined` y `NaN`. Un array u objeto vacío es truthy.",
            "Una declaración de función se eleva con su cuerpo. Una function expression sigue las reglas de su variable. Las arrow functions capturan `this`, `arguments` y `super` del entorno; no sirven como constructor.",
            "`this` depende de cómo se invoca una función: method call, `call/apply/bind`, constructor con `new` o binding léxico de arrow. Extraer un método puede perder el receiver.",
            "Un closure conserva acceso al entorno léxico. Sirve para encapsular estado, factories y callbacks; también puede retener memoria si una referencia mantiene vivo un grafo grande.",
            "El spread copia un nivel y enumera propiedades. `structuredClone` cubre muchos valores y ciclos, pero no funciones ni todos los objetos host. Un JSON round-trip pierde fechas, `undefined`, `BigInt` y prototipos.",
            "Destructuring extrae valores y admite defaults. El default corre solo para `undefined`, no para `null`. Rest agrupa el remanente y debe ocupar la última posición.",
        ],
        "qa": [
            ("¿Cuál es la diferencia entre `var`, `let` y `const`?", "`var` usa scope de función y permite redeclaración. `let` y `const` usan scope de bloque y temporal dead zone. `const` impide reasignar la variable, pero el valor referenciado puede mutar."),
            ("¿Por qué `[] == false` da true?", "`==` convierte el array a primitivo, produce una cadena vacía y después convierte ambos lados a número: cero y cero. Con `===` el resultado es false porque los tipos difieren."),
            ("¿Arrow function o función normal?", "Uso arrow para callbacks que necesitan el `this` exterior. Uso función normal para métodos dinámicos, constructores o APIs que asignan receiver."),
            ("¿Shallow copy o deep copy?", "Una shallow copy crea un objeto o array nuevo, pero copia por referencia los valores anidados. Por ejemplo, con `const original = { user: { name: 'Ana' } }; const copy = { ...original };`, se cumple `copy !== original`, pero `copy.user === original.user`; por eso `copy.user.name = 'Luis'` también modifica `original.user.name`. Spread, `Object.assign`, `Array.from` y `slice` hacen copias superficiales. Una deep copy duplica recursivamente la estructura para que los objetos anidados no compartan identidad. `structuredClone(original)` sirve para muchos datos nativos y ciclos, pero no clona funciones, elementos DOM ni conserva el comportamiento de todas las instancias de clases. No hago una copia profunda por defecto: cuesta CPU y memoria, y puede romper identidades que la aplicación necesita. Para actualizar estado prefiero copiar sólo el camino modificado, por ejemplo `{ ...state, user: { ...state.user, name: 'Luis' } }`; así mantengo inmutabilidad y structural sharing sin duplicar todo el grafo."),
        ],
        "code": """const profile = { name: 'Adrii', address: { city: 'Tandil' } };
const copy = { ...profile };
copy.address.city = 'Bali';

console.log(profile.address.city); // 'Bali': address comparte referencia

const deep = structuredClone(profile);""",
    },
    {
        "title": "JavaScript: objetos, prototipos, arrays y programación funcional",
        "intro": "JavaScript usa delegación prototípica. Las clases ofrecen sintaxis, pero los objetos todavía resuelven propiedades a través de una cadena de prototipos.",
        "master": [
            "`Object.create(proto)` fija el prototipo. `new C()` crea un objeto, enlaza `C.prototype`, ejecuta `C` con ese `this` y devuelve el objeto salvo retorno explícito de otro objeto.",
            "Una propiedad puede ser own o heredada. `Object.hasOwn` comprueba ownership; `in` recorre la cadena. `Object.keys` devuelve claves enumerables propias.",
            "Los property descriptors controlan `writable`, `enumerable` y `configurable`; getters y setters forman accessors. Cambiar descriptores afecta serialización y copia.",
            "Arrays son objetos con índices y `length`. `for...of` recorre valores de un iterable; `for...in` recorre claves enumerables y no conviene para arrays.",
            "`map` transforma, `filter` selecciona, `reduce` acumula, `find` devuelve el primer elemento y `some/every` evalúan predicados. Elegí el método que expresa la intención.",
            "`sort` muta y convierte a string sin comparator. `toSorted`, `toReversed`, `toSpliced` y `with` devuelven copias en runtimes modernos.",
            "Una pure function depende de sus argumentos y no produce efectos observables. La pureza mejora tests y composición, pero una aplicación necesita efectos en fronteras controladas.",
            "Currying transforma una función de varios argumentos en una secuencia de funciones. Partial application fija algunos argumentos; no son conceptos idénticos.",
            "Memoization cachea por argumentos. Definí igualdad, tamaño, invalidación y costo de memoria antes de aplicarla.",
            "Big O describe crecimiento. Acceso por índice de array suele ser O(1); búsqueda lineal O(n); sort comparativo O(n log n); acceso promedio a Map O(1). Las constantes todavía afectan al usuario.",
        ],
        "qa": [
            ("¿Clase o prototipo?", "`class` organiza herencia y métodos con sintaxis más clara; el runtime resuelve métodos mediante prototipos. Conocer el modelo explica `instanceof`, shadowing y métodos compartidos."),
            ("¿`map` o `forEach`?", "`map` crea una colección transformada y exige usar el retorno. `forEach` expresa un efecto por elemento y devuelve `undefined`."),
            ("¿`Map` o objeto?", "`Map` acepta cualquier clave, preserva orden de inserción y ofrece size e iteración directa. Un objeto encaja en records con claves string/symbol y serialización JSON."),
            ("¿Qué muta un array?", "`push`, `pop`, `shift`, `unshift`, `splice`, `sort`, `reverse`, `fill` y `copyWithin`. `map`, `filter`, `slice`, `concat` y los métodos `to*` crean otro array."),
        ],
    },
    {
        "title": "JavaScript asíncrono: event loop, Promises y errores",
        "intro": "El event loop coordina el stack con colas y APIs del host. Una entrevista Senior suele pedir el orden exacto de logs, cancelación y manejo de carreras.",
        "master": [
            "El motor ejecuta una tarea hasta vaciar el stack. Después drena microtasks, permite render y toma otra task. Promises y `queueMicrotask` usan microtasks; timers y eventos entran como tasks.",
            "Una cadena de Promises adopta el estado del valor retornado. Lanzar dentro de `then` rechaza la siguiente Promise. Omitir `return` rompe la cadena y crea errores no observados.",
            "`async` siempre devuelve una Promise. `await` suspende esa función y programa la continuación como microtask; no bloquea el thread.",
            "`Promise.all` falla rápido y conserva orden; `allSettled` espera todos; `race` toma el primer settlement; `any` toma el primer fulfillment o lanza AggregateError.",
            "Promise no ofrece cancelación propia. `AbortController` transmite una señal a `fetch` y otras APIs compatibles. El servidor puede seguir procesando aun cuando el cliente abandona.",
            "`try/catch` captura errores síncronos y awaits rechazados dentro del bloque. No captura un callback asíncrono que corre después fuera de la cadena.",
            "Clasificá errores por dominio, validación, autenticación, red, timeout, cancelación y bug. Preservá `cause` y evitá tragarlos con un log sin recuperación.",
            "Debounce espera una pausa; throttle limita frecuencia. Definí leading, trailing y cleanup. Angular/RxJS ofrecen operadores que expresan mejor estos flujos.",
            "Races aparecen cuando respuestas llegan fuera de orden. Cancelá, versioná la solicitud o ignorá resultados obsoletos.",
            "CPU intenso bloquea input y render. Dividí trabajo, usá scheduler adecuado o Web Worker; async/await no mueve CPU a otro thread.",
        ],
        "qa": [
            ("¿En qué orden imprime este código?", "Ejecutá primero el stack síncrono, después todas las microtasks creadas, y recién entonces timers. Cada callback puede encolar más microtasks antes de la siguiente task."),
            ("¿Promise u Observable?", "Promise representa un settlement y empieza al crearse. Observable puede producir varios valores, suele ser lazy y permite unsubscribe y operadores de concurrencia."),
            ("¿Cómo cancelás fetch?", "Creo un AbortController, paso `signal` a fetch y llamo `abort`. Trato `AbortError` como cancelación, no como fallo del producto."),
            ("¿Qué diferencia hay entre syntax error y runtime error?", "El parser detecta un syntax error antes de ejecutar esa unidad. Un runtime error aparece al evaluar una operación válida en sintaxis con un estado inválido."),
        ],
        "code": """console.log('A');
setTimeout(() => console.log('B'), 0);
Promise.resolve().then(() => console.log('C'));
queueMicrotask(() => console.log('D'));
console.log('E');

// A, E, C, D, B""",
    },
    {
        "title": "Browser internals, DOM, storage y red",
        "intro": "Angular corre sobre la plataforma web. Un Senior entiende el costo de DOM, layout, almacenamiento, navegación y protocolos.",
        "master": [
            "DOM representa el documento; BOM agrupa APIs del navegador como `window`, history, location, navigator y screen. Angular abstrae parte del DOM, pero no reemplaza la plataforma.",
            "Selección: `querySelector`, `querySelectorAll`, `getElementById`. Eventos atraviesan capture, target y bubble. Delegation aprovecha bubbling para manejar listas dinámicas.",
            "`preventDefault` evita la acción por defecto; `stopPropagation` detiene propagación. Usarlos sin entender semántica rompe formularios, enlaces y accesibilidad.",
            "El navegador parsea HTML y CSS, construye DOM y CSSOM, calcula estilos y layout, pinta y compone capas. Leer layout después de escribir estilos puede forzar reflow.",
            "`localStorage` persiste por origin y ofrece API síncrona; `sessionStorage` vive por pestaña; IndexedDB almacena datos estructurados de forma asíncrona. Cookies viajan según sus atributos y reglas de request.",
            "Same-origin combina scheme, host y port. CORS permite que un servidor autorice lecturas cross-origin; la preflight OPTIONS valida ciertos métodos y headers.",
            "HTTP cache usa `Cache-Control`, validators como ETag y claves que pueden variar. Service Worker puede interceptar requests y agrega otra capa de cache e invalidación.",
            "DNS resuelve host; TLS autentica y cifra; HTTP transporta requests. HTTP/2 multiplexa streams; HTTP/3 usa QUIC sobre UDP.",
            "SPA actualiza vistas sin recargar documento. History API mantiene URL; el servidor debe redirigir rutas de app al HTML o renderizarlas.",
            "Web Worker ejecuta JavaScript fuera del main thread y se comunica por mensajes. No accede al DOM. Service Worker opera como proxy de red y ciclo separado.",
        ],
        "qa": [
            ("¿DOM y BOM?", "DOM modela el documento. BOM reúne objetos y APIs del entorno del navegador, como history, location y navigator."),
            ("¿localStorage, sessionStorage o IndexedDB?", "Elijo localStorage para pocas preferencias no sensibles, sessionStorage para vida de pestaña e IndexedDB para volumen, queries y trabajo asíncrono."),
            ("¿Qué es CORS?", "Una política del navegador que permite al servidor declarar qué origins pueden leer una respuesta. No protege endpoints de clientes no navegador ni reemplaza autorización."),
            ("¿Reflow y repaint?", "Layout recalcula geometría; paint genera píxeles; compositing combina capas. Cambios y lecturas intercaladas pueden forzar trabajo síncrono."),
        ],
    },
    {
        "title": "HTML completo: semántica, formularios, medios y SEO",
        "intro": "HTML define significado, navegación por teclado, formularios y la base que consumen buscadores y tecnologías asistivas.",
        "master": [
            "`head` contiene metadata, title, links, preload y scripts. `body` contiene el documento visible. Un title y description claros mejoran navegación y presentación en resultados.",
            "Usá `header`, `nav`, `main`, `article`, `section`, `aside` y `footer` según significado. Un `div` agrupa sin semántica; un `span` es inline genérico.",
            "Block e inline describen comportamiento de formatting context, que CSS puede cambiar. La semántica del elemento no cambia al modificar `display`.",
            "`a` navega y necesita `href`; `button` ejecuta una acción. `target=_blank` requiere una política de `rel` apropiada para reducir acceso a opener.",
            "Imágenes necesitan `alt` según función. `picture`, `srcset` y `sizes` permiten formatos y resoluciones. Width y height reservan espacio y reducen CLS.",
            "Video y audio admiten múltiples `source`, `track` para subtítulos y controles. Un iframe crea otro contexto; restringilo con `sandbox`, permisos y origen confiable.",
            "Form asocia `label` con control, usa `name` para submission y aprovecha tipos nativos. GET codifica en URL; POST envía body. El servidor valida todos los campos.",
            "`button` dentro de form usa submit por defecto. Marcá `type=button` para acciones auxiliares. Enter y validación nativa dependen de esta semántica.",
            "Tablas usan caption, thead, tbody, th y scope para datos tabulares. No uses tablas para layout.",
            "`br` crea salto de línea dentro de contenido; `hr` representa un cambio temático. Para espaciado usá CSS.",
            "Scripts con `defer` descargan en paralelo y ejecutan tras parsear, en orden. `async` ejecuta cuando descarga y no conserva orden. Modules difieren y usan defer por defecto.",
            "SEO técnico incluye HTML rastreable, canonical, robots, structured data, status correctos, sitemap y rendering compatible con el contenido.",
        ],
        "qa": [
            ("¿Etiqueta y atributo?", "La etiqueta define el elemento; el atributo configura información o comportamiento en su start tag. Una property DOM representa el estado vivo y puede diferir del atributo inicial."),
            ("¿`id` o `class`?", "`id` identifica un elemento dentro del documento y sirve para relaciones, fragmentos y labels. `class` agrupa elementos para estilos o comportamiento."),
            ("¿Cómo crear un formulario accesible?", "Asocio labels, agrupo opciones con fieldset/legend, uso tipos y autocomplete, explico errores y muevo foco cuando el flujo lo requiere."),
            ("¿`ol` o `ul`?", "`ol` comunica que el orden modifica el significado; `ul` agrupa elementos sin secuencia semántica."),
        ],
        "code": """<form (ngSubmit)="save()" [formGroup]="profileForm">
  <label for="email">Correo</label>
  <input id="email" type="email" autocomplete="email"
         formControlName="email" aria-describedby="email-error">
  <p id="email-error" role="alert">Ingresá un correo válido.</p>
  <button type="submit">Guardar</button>
</form>""",
    },
    {
        "title": "CSS completo: cascade, layout, responsive y rendimiento",
        "intro": "CSS resuelve una cascada antes de calcular layout y paint. Las preguntas clásicas empiezan con selectores; las Senior llegan a stacking contexts, containment y estabilidad visual.",
        "master": [
            "La cascada considera origen, importancia, layers, specificity, scope y orden. `!important` altera el orden dentro del origen y crea costo de mantenimiento.",
            "Specificity cuenta IDs, clases/atributos/pseudo-clases y tipos/pseudo-elementos. `:where()` aporta especificidad cero; `:is()` y `:not()` toman la del argumento más específico.",
            "Box model suma content, padding, border y margin. `box-sizing: border-box` incluye padding y border dentro del tamaño declarado.",
            "Margin separa cajas; padding amplía el interior y el área de fondo. Márgenes verticales pueden colapsar en block formatting context.",
            "`display: none` quita la caja y el árbol de accesibilidad; `visibility: hidden` conserva espacio y oculta; `opacity: 0` conserva layout y puede conservar interacción si no la controlás.",
            "Position static sigue flujo; relative conserva espacio y crea referencia; absolute sale del flujo y usa containing block; fixed se relaciona con viewport salvo transform ancestors; sticky cambia según scroll container.",
            "Flexbox organiza una dimensión y distribuye espacio; Grid controla filas y columnas. `min-width: 0` suele resolver overflow de hijos flex.",
            "Responsive design combina unidades fluidas, media/container queries, imágenes responsivas y límites de contenido. Evitá breakpoints atados a dispositivos concretos.",
            "Overflow puede clippear, scrollear o crear formatting context. `text-overflow: ellipsis` necesita restricciones de overflow y white-space.",
            "`z-index` solo compara dentro del mismo stacking context. Transform, opacity, positioned elements y isolation pueden crear contextos nuevos.",
            "Transitions interpolan cambios de estado; animations usan keyframes. Preferí transform y opacity para animaciones y respetá `prefers-reduced-motion`.",
            "BEM nombra Block, Element y Modifier; CSS Modules, Shadow DOM y Angular encapsulation resuelven scopes con modelos distintos.",
            "Preprocesadores agregan sintaxis en build; frameworks entregan utilidades o componentes. Ninguno reemplaza cascade, layout ni accesibilidad.",
            "Containment y `content-visibility` pueden reducir trabajo de render en contenido grande. Medí memoria, layout y accesibilidad antes de aplicarlos.",
        ],
        "qa": [
            ("¿Flexbox o Grid?", "Flexbox distribuye elementos a lo largo de un eje y permite wrapping. Grid define una estructura bidimensional. Una interfaz puede usar ambos en niveles distintos."),
            ("¿Por qué `z-index: 9999` no funciona?", "El elemento puede vivir dentro de un stacking context que queda debajo de otro. Comparo contextos ancestros antes de subir el número."),
            ("¿`display:none` o `visibility:hidden`?", "`display:none` elimina la caja; `visibility:hidden` conserva su espacio. Si necesitás ocultar solo visualmente y mantener lectura, uso un patrón visually-hidden probado."),
            ("¿Cómo evitás CSS frágil?", "Reduzco especificidad, defino tokens y layers, limito alcance, documento variantes y pruebo estados, tamaños, temas y contenido real."),
        ],
        "code": """@layer reset, base, components, utilities;

@layer components {
  .card { container-type: inline-size; }
  @container (min-width: 36rem) {
    .card__body { display: grid; grid-template-columns: 2fr 1fr; }
  }
}

@media (prefers-reduced-motion: reduce) {
  *, *::before, *::after { animation-duration: 0.01ms !important; }
}""",
    },
]


from angular_senior_theory_overrides import apply_theory_overrides
from angular_senior_qa_additions import apply_qa_additions


apply_theory_overrides([*chapters, *foundation_chapters])
apply_qa_additions([*chapters, *foundation_chapters])


foundation_rapid_fire = [
    ("¿Tipos primitivos?", "undefined, null, boolean, number, bigint, string y symbol."),
    ("¿`typeof null`?", "Devuelve `object` por compatibilidad histórica; verificá null de forma explícita."),
    ("¿`NaN === NaN`?", "False. Usá `Number.isNaN` u `Object.is`."),
    ("¿`null` y `undefined`?", "Null suele expresar ausencia intencional; undefined expresa falta de valor o propiedad."),
    ("¿Truthy y falsy?", "La conversión booleana determina branches; objetos y arrays vacíos son truthy."),
    ("¿Temporal Dead Zone?", "Es el tramo entre la entrada al bloque y la inicialización de un binding `let`, `const` o `class`. El binding ya pertenece al scope, pero leerlo lanza `ReferenceError`; por ejemplo, `console.log(total); let total = 1;`."),
    ("¿Hoisting?", "El entorno registra declaraciones antes de ejecutar; la disponibilidad depende del tipo de declaración."),
    ("¿`this`?", "Receiver de una llamada según call-site, salvo arrow que captura el binding exterior."),
    ("¿`call`, `apply`, `bind`?", "Call invoca con argumentos; apply con array-like; bind crea otra función con receiver o argumentos fijados."),
    ("¿Closure?", "Una función conserva acceso a bindings de su entorno léxico."),
    ("¿Spread y rest?", "Misma sintaxis: spread expande; rest reúne valores restantes."),
    ("¿Destructuring default?", "Se aplica ante undefined, no ante null."),
    ("¿Shallow copy?", "Crea un contenedor nuevo y conserva las mismas referencias anidadas. Con `const copy = { ...original }`, `copy !== original`, pero `copy.user === original.user` si `user` es un objeto."),
    ("¿`structuredClone`?", "Clona estructuras soportadas y ciclos; no clona funciones."),
    ("¿Prototipo?", "Objeto delegado que JavaScript consulta cuando una propiedad falta en el receiver."),
    ("¿Own property?", "Propiedad definida en el objeto, comprobable con Object.hasOwn."),
    ("¿`for...in` o `for...of`?", "In recorre claves enumerables; of recorre valores de un iterable."),
    ("¿Métodos de array mutables?", "Push, pop, shift, unshift, splice, sort, reverse, fill y copyWithin."),
    ("¿`find` o `filter`?", "Find devuelve el primer match; filter crea un array con todos."),
    ("¿Pure function?", "Mismo resultado para mismas entradas y sin efectos observables."),
    ("¿Currying?", "Convierte una función de varios argumentos en una secuencia de funciones."),
    ("¿Debounce o throttle?", "Debounce espera silencio; throttle limita ejecuciones por intervalo."),
    ("¿`Promise.all`?", "Conserva orden y rechaza al primer rechazo observado."),
    ("¿`allSettled`?", "Espera todos y devuelve el estado de cada operación."),
    ("¿AbortController?", "Emite una señal de cancelación que consumen fetch y otras APIs."),
    ("¿Async bloquea el thread?", "No. Await cede la continuación; CPU síncrono sigue bloqueando."),
    ("¿Unhandled rejection?", "Promise rechazada sin handler; registrala y corregí la cadena, no la ocultes."),
    ("¿DOM?", "Árbol de nodos y APIs que representan el documento."),
    ("¿BOM?", "APIs del navegador fuera del documento, como history, location y navigator."),
    ("¿Event bubbling?", "El evento asciende desde el target por ancestros que participan."),
    ("¿Event delegation?", "Listener en un ancestro que decide según el target; reduce listeners y cubre hijos dinámicos."),
    ("¿preventDefault?", "Evita la acción predeterminada si el evento es cancelable."),
    ("¿localStorage?", "Almacenamiento síncrono string por origin y persistente."),
    ("¿IndexedDB?", "Base asíncrona del navegador para datos estructurados y mayor volumen."),
    ("¿Same-origin?", "Coincidencia de scheme, host y port."),
    ("¿Preflight?", "Request OPTIONS con la que el navegador consulta permiso CORS."),
    ("¿ETag?", "Validador de representación para revalidación condicional."),
    ("¿Service Worker?", "Worker con lifecycle que intercepta red y habilita offline/push."),
    ("¿Web Worker?", "Thread para JavaScript sin acceso directo al DOM."),
    ("¿Etiqueta semántica?", "Elemento cuyo nombre comunica rol y estructura al navegador y tecnologías asistivas."),
    ("¿`head`?", "Metadata y recursos del documento, no contenido principal visible."),
    ("¿`alt`?", "Alternativa textual que depende de la función de la imagen; decorativas usan alt vacío."),
    ("¿`iframe sandbox`?", "Restringe capacidades del documento embebido y se abre con tokens explícitos."),
    ("¿GET o POST en form?", "GET expresa consulta y deja datos en URL; POST envía body para una operación."),
    ("¿Submit default?", "Un button dentro de form usa submit si no declarás type."),
    ("¿`defer` o `async` script?", "Defer preserva orden y espera parseo; async ejecuta al descargar."),
    ("¿Box model?", "Content, padding, border y margin."),
    ("¿Specificity?", "Peso de un selector dentro de la cascada después de origen, importancia y layer."),
    ("¿`box-sizing:border-box`?", "El width declarado incluye padding y border."),
    ("¿Margin o padding?", "Margin separa cajas; padding agrega espacio dentro del borde."),
    ("¿Position absolute?", "Sale del flujo y se posiciona respecto de su containing block."),
    ("¿Position sticky?", "Participa en flujo y se fija dentro de su scroll container al cruzar un umbral."),
    ("¿Stacking context?", "Ámbito que limita la comparación de z-index entre descendientes."),
    ("¿Pseudo-clase o pseudo-elemento?", "Pseudo-clase selecciona estado; pseudo-elemento representa una parte generada o conceptual."),
    ("¿BEM?", "Convención Block, Element, Modifier para nombres de clases."),
    ("¿Preprocesador o framework?", "Preprocesador extiende sintaxis; framework aporta reglas, utilidades o componentes."),
    ("¿Media o container query?", "Media consulta viewport/dispositivo; container consulta tamaño o estilo del contenedor."),
    ("¿Reflow?", "Recalculo de geometría provocado por cambios o lecturas que requieren layout."),
    ("¿CLS?", "Movimiento inesperado de contenido; reservá espacio para imágenes y contenido asíncrono."),
]


rapid_fire = [
    ("¿Componente o directiva?", "El componente posee vista; la directiva agrega comportamiento a un host."),
    ("¿Pipe pura?", "Angular puede reutilizar el resultado mientras no cambien las referencias de entrada."),
    ("¿`@for track`?", "Asocia identidad de datos con nodos DOM para minimizar creación y conservar estado."),
    ("¿`computed` o `effect`?", "`computed` deriva estado; `effect` sincroniza con una API externa."),
    ("¿Signal o BehaviorSubject?", "Signal para estado síncrono de UI; BehaviorSubject cuando necesitás semántica y operadores RxJS."),
    ("¿`switchMap`?", "Cancela el inner anterior al llegar una nueva emisión."),
    ("¿`concatMap`?", "Encola inner observables y conserva orden."),
    ("¿`exhaustMap`?", "Ignora nuevos disparos mientras el inner sigue activo."),
    ("¿`mergeMap`?", "Ejecuta inner observables en paralelo con concurrencia configurable."),
    ("¿`forkJoin`?", "Emite una vez cuando todos completan; falla si alguno falla y no sirve para streams infinitos."),
    ("¿Cold observable?", "Cada subscription crea su propio productor."),
    ("¿`shareReplay`?", "Comparte y reproduce valores; necesita política de refCount, error e invalidación."),
    ("¿`providedIn: root`?", "Provider tree-shakeable en el root EnvironmentInjector."),
    ("¿`providers` local?", "Nueva instancia en el ElementInjector del componente y sus descendientes visibles."),
    ("¿`viewProviders`?", "Oculta esos providers al contenido proyectado."),
    ("¿InjectionToken?", "Token runtime tipado para valores, funciones o interfaces."),
    ("¿OnPush?", "Permite saltar subárboles hasta que una notificación relevante marca la vista."),
    ("¿Zoneless?", "Angular recibe notificaciones explícitas y evita usar ZoneJS para inferir cambios."),
    ("¿`markForCheck`?", "Marca la vista para una próxima verificación."),
    ("¿`detectChanges`?", "Ejecuta verificación local; su uso frecuente suele indicar un flujo defectuoso."),
    ("¿Standalone?", "Componente que declara dependencias en imports y no necesita declaración en NgModule."),
    ("¿Lazy route?", "Carga código al navegar a la feature, reduciendo el bundle inicial."),
    ("¿Guard?", "Control de navegación en cliente; no reemplaza autorización del servidor."),
    ("¿Resolver?", "Obtiene datos antes de activar la ruta."),
    ("¿Reactive Form?", "Modelo explícito y observable en TypeScript, apto para composición y validación compleja."),
    ("¿CVA?", "Contrato que conecta un control custom con Angular Forms."),
    ("¿Async validator?", "Validador que completa con errores o null; controlá cancelación y frecuencia."),
    ("¿Interceptor?", "Middleware de requests y responses para preocupaciones transversales."),
    ("¿Retry?", "Solo con política, límite y seguridad de idempotencia."),
    ("¿XSS?", "Ejecución de script no confiable; evitá sinks peligrosos y mantené sanitización y CSP."),
    ("¿CSRF?", "Petición autenticada inducida desde otro origen; afecta sobre todo credenciales automáticas como cookies."),
    ("¿CSP?", "Política del navegador que limita fuentes de scripts, estilos y otros recursos."),
    ("¿Trusted Types?", "Restringe asignaciones a sinks DOM peligrosos a valores creados por políticas confiables."),
    ("¿SSR?", "Render por request en servidor; ayuda SEO y HTML inicial, agrega costo operativo."),
    ("¿SSG?", "HTML generado en build para contenido estable."),
    ("¿Hydration?", "Angular reutiliza HTML de servidor y conecta comportamiento cliente."),
    ("¿`@defer`?", "Divide dependencias y carga una vista según trigger o condición."),
    ("¿LCP?", "Tiempo hasta renderizar el mayor elemento visible."),
    ("¿INP?", "Latencia observada de interacciones durante la sesión."),
    ("¿CLS?", "Suma de cambios inesperados de layout."),
    ("¿Tree shaking?", "El bundler elimina código no alcanzable cuando el formato y las dependencias lo permiten."),
    ("¿AOT?", "Compila templates en build, reduce trabajo runtime y detecta errores antes."),
    ("¿NgRx reducer?", "Función pura que calcula nuevo estado desde estado y action."),
    ("¿NgRx effect?", "Reacciona a eventos y coordina I/O u otros efectos."),
    ("¿Selector?", "Consulta derivada y memorizada sobre el store."),
    ("¿Optimistic update?", "Actualiza UI antes de confirmar y define rollback o reconciliación."),
    ("¿Facade?", "API estable que reduce superficie de un subsistema; puede ocultar demasiado si no protege un límite."),
    ("¿Adapter?", "Traduce un contrato externo al modelo interno."),
    ("¿Strategy?", "Encapsula políticas intercambiables detrás de un contrato."),
    ("¿SRP?", "Una unidad concentra responsabilidades que cambian por el mismo motivo."),
    ("¿DIP?", "El código de alto nivel depende de abstracciones, no de detalles concretos."),
    ("¿`unknown`?", "Tipo seguro para valor no validado; obliga a estrechar antes de usar."),
    ("¿`never`?", "Representa estados imposibles y permite checks exhaustivos."),
    ("¿Microtask?", "Cola de promesas que se drena antes de la siguiente macrotask."),
    ("¿Closure?", "Función que conserva acceso al entorno léxico donde se creó."),
    ("¿Inmutabilidad?", "Crear nuevas referencias en lugar de mutar estado compartido; mejora previsibilidad y detección."),
    ("¿`Object.freeze`?", "Congelación superficial; no protege objetos anidados sin trabajo adicional."),
    ("¿Unit test?", "Prueba una unidad con fronteras controladas y feedback rápido."),
    ("¿Integration test?", "Verifica colaboración entre varias unidades o una frontera real."),
    ("¿E2E?", "Prueba un recorrido del usuario a través del sistema desplegado o equivalente."),
    ("¿Harness?", "API estable para interactuar con un componente en tests sin depender de su DOM interno."),
    ("¿Memory leak típico?", "Subscription, listener, timer, observer o cache que conserva una vista destruida."),
    ("¿Correlation ID?", "Identificador que conecta eventos frontend, gateway y backend de una operación."),
    ("¿Feature flag?", "Control temporal de exposición con owner, métricas y plan de retiro."),
    ("¿Micro-frontend?", "Unidad de frontend con ownership y despliegue independiente, a cambio de integración y duplicación."),
    ("¿ADR?", "Registro corto de una decisión, alternativas y consecuencias."),
]


gap_rows = [
    ["Tema", "Cobertura previa", "Acción en esta guía"],
    ["JavaScript clásico", "Media", "Tipos, coerción, scope, this, closures, prototipos, arrays y Big O"],
    ["Asincronía y browser internals", "Escasa", "Event loop, Promises, DOM, rendering, storage, CORS, cache y workers"],
    ["HTML y CSS", "Básica", "Semántica, forms, SEO, cascade, layout, responsive, stacking y rendimiento"],
    ["Angular clásico, componentes y RxJS", "Fuerte", "Ordenar, corregir matices y sumar criterios de decisión"],
    ["Signals y RxJS interop", "Escasa", "Capítulo completo con computed, effect, recursos y límites"],
    ["Standalone y control flow", "Escasa", "Arquitectura moderna, @if/@for/@switch y track"],
    ["Zoneless", "Ausente", "Modelo de notificación, migración y fallos frecuentes"],
    ["SSR, SSG e hidratación", "Ausente", "Selección por ruta, mismatches e incremental hydration"],
    ["Testing actual", "Parcial", "Vitest/TestBed, HTTP, router, harnesses y estrategia"],
    ["Seguridad", "Parcial", "XSS, CSP, Trusted Types, CSRF, auth y supply chain"],
    ["Accesibilidad", "Ausente", "Semántica, teclado, foco, ARIA y verificación"],
    ["System design y operación", "Escasa", "Caché, tiempo real, observabilidad, CI/CD y migración"],
    ["Liderazgo Senior", "Parcial", "Reviews, ADRs, mentoring, incidentes y negociación"],
]


sources = [
    ("Angular: versiones y soporte", "https://angular.dev/reference/releases"),
    ("Angular: compatibilidad Node, TypeScript y RxJS", "https://angular.dev/reference/versions"),
    ("Angular Signals", "https://angular.dev/guide/signals"),
    ("Angular zoneless", "https://angular.dev/guide/zoneless"),
    ("Angular control flow", "https://angular.dev/guide/templates/control-flow"),
    ("Angular @defer", "https://angular.dev/guide/templates/defer"),
    ("Angular rendering strategies", "https://angular.dev/guide/routing/rendering-strategies"),
    ("Angular incremental hydration", "https://angular.dev/guide/incremental-hydration"),
    ("Angular DI jerárquica", "https://angular.dev/guide/di/hierarchical-dependency-injection"),
    ("Angular testing", "https://angular.dev/guide/testing"),
    ("Angular security", "https://angular.dev/best-practices/security"),
    ("Drive: Frontend Questions", "https://docs.google.com/document/d/1reUcSUpyGIrCDdteRaQWxHApEWcuq_5PaoCWQ6ZymZ8/edit"),
    ("Drive: Angular interview", "https://docs.google.com/document/d/10T_AHlHLdcLcdj_B9WMnqCizoF-bPc3BkhWHQ2MPWcU/edit"),
    ("Drive: Teoría", "https://docs.google.com/document/d/1SMNLCse40jqbSmkrskJqQqcx0PPhU5VQ6JTq0K-NtVE/edit"),
    ("Drive: Client Interview", "https://docs.google.com/document/d/1Vj5xQ5TTVKEYEVVdqRxP4jy99JyOWT7mtceQZROcJT4/edit"),
    ("Drive: Preguntas RRHH 2024", "https://docs.google.com/document/d/1__dw8u-n3Ee8A6iqiy5dtBo1Sk6ApbrKs4lhtBJsrt4/edit"),
    ("Drive: Prueba Técnica Frontend Mindata", "https://drive.google.com/file/d/1CXzqmdEdMxCSvQk7hzhMNzdA5yyuBxmI/view"),
    ("Drive: Interview Preparation - Upwork", "https://drive.google.com/file/d/12b90zvmx3C9Cst7wZeLbku7jm3_9Y9Jg/view"),
    ("Drive: PreguntasJAVASCRIPT", "https://docs.google.com/document/d/19TtL9hxvzXczqkOGL-JPYY6ihcrAbGhaoZi3yHdTuws/edit"),
    ("Drive: PreguntasHTML", "https://docs.google.com/document/d/1mwN9VNcRej1kvvTvyeVLvh8pqcl9_6RuDVrD5xcWNNc/edit"),
    ("Drive: PreguntasCSS", "https://docs.google.com/document/d/1mxsazPwaCfqlnqb-kM1rrxTaMAIDDA_W8B25lh3vnCU/edit"),
    ("MDN: JavaScript", "https://developer.mozilla.org/docs/Web/JavaScript"),
    ("MDN: HTML", "https://developer.mozilla.org/docs/Web/HTML"),
    ("MDN: CSS", "https://developer.mozilla.org/docs/Web/CSS"),
]


def add_chapter(story, ch):
    story.append(P(ch["title"], "h1"))
    story.append(P(ch["intro"], "callout"))
    story.append(P("Qué tenés que dominar", "h2"))
    if ch.get("dense"):
        story.extend([Paragraph("• " + item, S["bullet_dense"]) for item in ch["master"]])
    else:
        story.extend(bullets(ch["master"]))
    if ch.get("code"):
        story.append(P("Ejemplo", "h2"))
        story.append(code(ch["code"]))
    story.append(P("Preguntas de entrevista", "h2"))
    for q, a in ch["qa"]:
        story.append(P(q, "qa_q_dense" if ch.get("dense") else "qa_q"))
        story.append(P(a, "qa_a_dense" if ch.get("dense") else "qa_a"))
    story.append(P("Chequeo Senior", "h2"))
    story.append(P("Podés explicar el mecanismo sin recitar una definición, defender una decisión con trade-offs y contar un caso real donde mediste el resultado.", "warning"))
    story.append(PageBreak())


def build_story():
    story = []
    story += [Spacer(1, 48*mm), P("GUÍA DE ESTUDIO 2026", "cover_kicker"),
              P("Entrevista<br/>Angular Senior", "cover_title"),
              P("Angular 22 · JavaScript · TypeScript · HTML · CSS · Browser · RxJS · Signals · Arquitectura · Testing · System Design", "cover_sub"),
              Spacer(1, 24*mm),
              P("Preparada a partir del material de Drive de Adrii Cabello y contrastada con la documentación oficial vigente.", "cover_sub"),
              Spacer(1, 38*mm), P("Edición 2 de septiembre de 2026", "cover_kicker"), PageBreak()]

    story += [P("Cómo usar esta guía", "h1"),
              P("Estudiá cada capítulo en tres pasadas: explicá el tema sin mirar, resolvé las preguntas y conectá una respuesta con tu experiencia. La memoria de APIs sirve; el criterio para elegirlas decide una entrevista Senior.", "body"),
              P("Prioridad", "h2")]
    priority = [
        ["Nivel", "Capítulos", "Objetivo"],
        ["Base web", "JavaScript, HTML, CSS y browser", "Resolver preguntas clásicas y explicar mecanismos de plataforma"],
        ["Angular", "Angular, Signals, RxJS, DI, forms y HTTP", "Responder APIs, diseño, rendimiento, testing y seguridad"],
        ["Senior", "Arquitectura, operación y system design", "Defender trade-offs, migraciones, incidentes y liderazgo"],
    ]
    t = Table(priority, colWidths=[27*mm, 43*mm, 88*mm], repeatRows=1)
    t.setStyle(TableStyle([('BACKGROUND',(0,0),(-1,0),PURPLE),('TEXTCOLOR',(0,0),(-1,0),colors.white),('FONTNAME',(0,0),(-1,0),BOLD_FONT),('FONTNAME',(0,1),(-1,-1),BODY_FONT),('FONTSIZE',(0,0),(-1,-1),8),('LEADING',(0,0),(-1,-1),11),('GRID',(0,0),(-1,-1),0.4,colors.HexColor('#D6DAE4')),('VALIGN',(0,0),(-1,-1),'TOP'),('BACKGROUND',(0,1),(-1,-1),PALE),('LEFTPADDING',(0,0),(-1,-1),6),('RIGHTPADDING',(0,0),(-1,-1),6),('TOPPADDING',(0,0),(-1,-1),5),('BOTTOMPADDING',(0,0),(-1,-1),5)]))
    story += [t, Spacer(1, 6*mm), P("Índice", "h1")]
    toc = TableOfContents()
    toc.levelStyles = [
        ParagraphStyle(name='TOCHeading1', fontName=BOLD_FONT, fontSize=9.2, leading=13, textColor=INK, leftIndent=0, firstLineIndent=0, spaceBefore=3),
        ParagraphStyle(name='TOCHeading2', fontName=BODY_FONT, fontSize=7.8, leading=10.5, textColor=MUTED, leftIndent=10, firstLineIndent=0),
    ]
    story += [toc, PageBreak()]

    story += [P("Diagnóstico del material existente", "h1"),
              P("Los documentos de Drive reúnen preguntas útiles y experiencia personal. Varias respuestas reflejan Angular previo a Signals, standalone y zoneless. La tabla separa cobertura fuerte de los huecos que completamos.", "body")]
    wrapped_gap_rows = [
        [P(str(cell), "cell_head" if row_index == 0 else "cell") for cell in row]
        for row_index, row in enumerate(gap_rows)
    ]
    gt = Table(wrapped_gap_rows, colWidths=[42*mm, 38*mm, 78*mm], repeatRows=1)
    gt.setStyle(TableStyle([('BACKGROUND',(0,0),(-1,0),INK),('TEXTCOLOR',(0,0),(-1,0),colors.white),('FONTNAME',(0,0),(-1,0),BOLD_FONT),('FONTNAME',(0,1),(-1,-1),BODY_FONT),('FONTSIZE',(0,0),(-1,-1),7.4),('LEADING',(0,0),(-1,-1),10),('GRID',(0,0),(-1,-1),0.35,colors.HexColor('#CCD2DE')),('VALIGN',(0,0),(-1,-1),'TOP'),('ROWBACKGROUNDS',(0,1),(-1,-1),[colors.white,PALE]),('LEFTPADDING',(0,0),(-1,-1),5),('RIGHTPADDING',(0,0),(-1,-1),5),('TOPPADDING',(0,0),(-1,-1),4),('BOTTOMPADDING',(0,0),(-1,-1),4)]))
    story += [gt, PageBreak()]

    ordered_chapters = [
        foundation_chapters[4],
        foundation_chapters[5],
        *foundation_chapters[0:3],
        chapters[2],
        chapters[1],
        *chapters[3:12],
        foundation_chapters[3],
        *chapters[12:23],
        chapters[0],
        chapters[23],
    ]
    for chapter_number, source_chapter in enumerate(ordered_chapters, 1):
        ch = dict(source_chapter)
        clean_title = re.sub(r"^\d+\.\s*", "", ch["title"])
        ch["title"] = f"{chapter_number}. {clean_title}"
        ch["dense"] = source_chapter in foundation_chapters
        add_chapter(story, ch)

    story += [P("Banco rápido de preguntas", "h1"),
              P("Respondé cada pregunta en menos de treinta segundos. Después elegí diez y ampliá con mecanismo, caso y trade-off.", "callout")]
    full_rapid_fire = foundation_rapid_fire + rapid_fire
    for i, (q, a) in enumerate(full_rapid_fire, 1):
        story.append(KeepTogether([P(f"{i}. {q}", "qa_q"), P(a, "qa_a")]))
    story.append(PageBreak())

    story += [P("Ejercicios de diseño y código", "h1"),
              P("1. Buscador cancelable", "h2"),
              P("Construí un buscador con debounce, cancelación, estado loading/error/empty, cache por query y test con tiempo controlado. Explicá por qué elegiste `switchMap` y qué cambia si el endpoint no soporta cancelación.", "body"),
              P("2. Formulario dinámico", "h2"),
              P("Diseñá un motor para decenas de formularios. El schema debe definir tipos, validación, layout, visibilidad y permisos. Agregá un CVA, validación asíncrona y persistencia parcial. Defendé cómo versionarías el schema.", "body"),
              P("3. Dashboard en vivo", "h2"),
              P("Diseñá seis widgets con frecuencias distintas. Incluí WebSocket o SSE, reconexión, backpressure, pausa fuera de viewport, cache, permisos y métricas de INP.", "body"),
              P("4. Migración Angular 17 a 22", "h2"),
              P("Proponé etapas para actualizar majors, convertir features a standalone, introducir control flow, Signals y zoneless. Definí pruebas, métricas y rollback.", "body"),
              P("5. Lista de 100.000 filas", "h2"),
              P("Compará paginación server-side, virtual scroll, filtros remotos y cache. Medí memoria, scripting, layout e interacción. Asegurá teclado y lector de pantalla.", "body"),
              P("6. Incidente de autenticación", "h2"),
              P("Varias requests reciben 401 al mismo tiempo. Diseñá un refresh único, cola, cancelación, logout seguro, telemetría y tests de carrera.", "body"),
              P("7. Event loop", "h2"),
              P("Predecí el orden de veinte logs que mezclen Promises, queueMicrotask, timers, async/await y eventos. Después verificá en navegador y explicá cada cola.", "body"),
              P("8. Tabla accesible", "h2"),
              P("Construí una tabla ordenable y paginada con caption, headers, estados de orden, teclado, foco, loading y empty state. Probala con lector de pantalla.", "body"),
              P("9. Layout responsive", "h2"),
              P("Implementá una card que cambie con container queries, respete reduced motion y no produzca CLS. Explicá stacking contexts y overflow.", "body"),
              P("10. Cache offline", "h2"),
              P("Diseñá cache HTTP, IndexedDB y Service Worker para una pantalla de lectura. Definí invalidación, conflicto, cuotas, logout y datos sensibles.", "body"),
              PageBreak()]

    story += [P("Plan intensivo de 21 días", "h1")]
    plan = [
        ["Día", "Foco", "Entrega"],
        ["1", "HTML, semántica y formularios", "Formulario accesible completo"],
        ["2", "CSS, layout y responsive", "Layout sin CLS y recorrido de cascade"],
        ["3", "JavaScript: tipos, scope, this y closures", "30 respuestas + ejercicios de coerción"],
        ["4", "Objetos, prototipos, arrays y Big O", "Implementaciones sin helpers"],
        ["5", "Event loop, Promises y errores", "Predicción de logs + cancelación"],
        ["6", "TypeScript avanzado", "Modelos con unions, generics y guards"],
        ["7", "Angular moderno y versiones", "Mapa de APIs estables y plan de actualización"],
        ["8", "Componentes, templates y lifecycle", "Componente compuesto accesible"],
        ["9", "Signals, OnPush y zoneless", "Refactor de estado + explicación"],
        ["10", "DI jerárquica", "Mapa de injectors y providers"],
        ["11", "RxJS", "Buscador con cuatro políticas de flattening"],
        ["12", "Estado y NgRx", "Diseño de store para una feature"],
        ["13", "Router y forms", "Formulario dinámico + rutas"],
        ["14", "Browser, DOM, storage, CORS y cache", "Mapa de plataforma y red"],
        ["15", "Arquitectura y patrones", "ADR de una decisión real"],
        ["16", "Performance, SSR e hidratación", "Perfil + estrategia por ruta"],
        ["17", "Testing", "Suite de componente, HTTP y router"],
        ["18", "Seguridad, accesibilidad y observabilidad", "Threat review + recorrido teclado"],
        ["19", "Build, upgrades y system design", "Diseño y plan de migración"],
        ["20", "Liderazgo e historias STAR", "Ocho historias grabadas"],
        ["21", "Repaso y simulación", "Mock interview completa"],
    ]
    pt = Table(plan, colWidths=[14*mm, 60*mm, 84*mm], repeatRows=1)
    pt.setStyle(TableStyle([('BACKGROUND',(0,0),(-1,0),PURPLE),('TEXTCOLOR',(0,0),(-1,0),colors.white),('FONTNAME',(0,0),(-1,0),BOLD_FONT),('FONTNAME',(0,1),(-1,-1),BODY_FONT),('FONTSIZE',(0,0),(-1,-1),7.8),('LEADING',(0,0),(-1,-1),10.5),('GRID',(0,0),(-1,-1),0.35,colors.HexColor('#CCD2DE')),('VALIGN',(0,0),(-1,-1),'TOP'),('ROWBACKGROUNDS',(0,1),(-1,-1),[colors.white,PALE]),('LEFTPADDING',(0,0),(-1,-1),5),('RIGHTPADDING',(0,0),(-1,-1),5),('TOPPADDING',(0,0),(-1,-1),4),('BOTTOMPADDING',(0,0),(-1,-1),4)]))
    story += [pt, Spacer(1, 5*mm), P("Regla de salida", "h2"),
              P("No marques un tema como estudiado hasta poder explicarlo sin mirar, responder una objeción y conectar la decisión con una experiencia o un ejercicio.", "warning"), PageBreak()]

    story += [P("Preguntas para hacer al entrevistador", "h1")]
    story.extend(bullets([
        "¿Qué decisiones técnicas esperan que tome esta persona durante los primeros noventa días?",
        "¿Qué versión de Angular usan y qué plan tienen para standalone, Signals y zoneless?",
        "¿Cómo miden rendimiento y calidad en producción?",
        "¿Dónde están hoy los mayores costos: entrega, deuda, incidentes, escalabilidad o coordinación?",
        "¿Cómo reparten ownership entre producto, frontend, backend, QA y plataforma?",
        "¿Qué nivel de autonomía tiene el rol para proponer arquitectura y cambiar procesos?",
        "¿Cómo funcionan code reviews, ADRs, mentoring y guardias de incidentes?",
        "¿Qué resultado haría que consideren excelente el primer semestre?",
    ]))
    story += [PageBreak(), P("Fuentes y material consolidado", "h1"),
              P("La guía sintetiza el material encontrado en Drive y agrega los temas presentes en la documentación oficial de Angular vigente al 2 de septiembre de 2026.", "body")]
    for name, url in sources:
        safe_url = url.replace('&', '&amp;')
        story.append(P(f'<link href="{safe_url}" color="#4520A8"><u>{name}</u></link><br/><font size="7" color="#5E6B82">{safe_url}</font>', "body"))
    story += [Spacer(1, 8*mm), HRFlowable(width="100%", color=colors.HexColor("#D9DEEA")), Spacer(1, 4*mm),
              P("Fin de la guía. Próximo paso: elegir una fecha de entrevista simulada y trabajar hacia atrás con el plan de 21 días.", "callout")]
    return story


if __name__ == "__main__":
    doc = GuideDoc(OUT)
    doc.multiBuild(build_story())
    print(OUT)
