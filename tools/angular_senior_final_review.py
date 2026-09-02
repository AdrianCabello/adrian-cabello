from __future__ import annotations

import re
from collections.abc import Iterable


def _clean_title(title: str) -> str:
    return re.sub(r"^\d+\.\s*", "", title)


def _replace_item(items: list[str], old: str, new: str) -> None:
    try:
        index = items.index(old)
    except ValueError as error:
        raise ValueError(f"No se encontró el contenido a reemplazar: {old}") from error
    items[index] = new


def _remove_questions(chapter: dict, questions: set[str]) -> None:
    chapter["qa"] = [item for item in chapter["qa"] if item[0] not in questions]


def _replace_question(chapter: dict, question: str, answer: str) -> None:
    for index, (candidate, _) in enumerate(chapter["qa"]):
        if candidate == question:
            chapter["qa"][index] = (question, answer)
            return
    raise ValueError(f"No se encontró la pregunta a reemplazar: {question}")


def apply_final_review(chapters: Iterable[dict]) -> None:
    """Apply the September 2026 accuracy and narration-readiness pass."""

    by_title = {_clean_title(chapter["title"]): chapter for chapter in chapters}

    html = by_title["HTML completo: semántica, formularios, medios y SEO"]
    _replace_item(
        html["master"],
        "`a` navega y necesita `href`; `button` ejecuta una acción. `target=_blank` requiere una política de `rel` apropiada para reducir acceso a opener.",
        "`a` navega y necesita `href`; `button` ejecuta una acción. Los navegadores modernos tratan `target=\"_blank\"` como `noopener`, pero conviene declarar la política de `rel` de forma explícita; `noreferrer` además evita enviar el header Referer.",
    )
    _replace_item(
        html["master"],
        "Scripts con `defer` descargan en paralelo y ejecutan tras parsear, en orden. `async` ejecuta cuando descarga y no conserva orden. Modules difieren y usan defer por defecto.",
        "Los scripts clásicos con `defer` descargan en paralelo y ejecutan después del parseo, conservando el orden. `async` ejecuta cuando termina la descarga y no conserva el orden. Los scripts `type=\"module\"` se difieren por defecto.",
    )

    typescript = by_title["TypeScript avanzado"]
    typescript["master"] = [
        "TypeScript agrega un sistema de tipos estático sobre JavaScript. El compilador comprueba el programa y elimina los tipos al emitir JavaScript; por eso una anotación no valida datos que llegan en runtime.",
        "La inferencia obtiene tipos desde valores y contexto. Una anotación hace explícito el contrato; `as const` conserva literales y vuelve readonly la estructura inferida, mientras `satisfies` comprueba compatibilidad sin reemplazar la inferencia.",
        "TypeScript usa tipado estructural: dos valores son compatibles cuando su forma satisface el contrato. Los object literals reciben además una comprobación especial de propiedades excedentes.",
        "Una `interface` describe contratos de objetos y admite declaration merging. Un `type` también representa unions, intersections, tuplas, primitivas y tipos calculados. La capacidad necesaria y la consistencia del código deciden la elección.",
        "Una union expresa alternativas; una intersection exige cumplir varios contratos. `typeof`, `in`, `instanceof`, discriminantes y type guards estrechan el tipo antes de usar propiedades específicas.",
        "Una discriminated union modela estados como `idle`, `loading`, `success` y `error`. Entregar el caso restante a `never` vuelve exhaustivo el manejo y detecta variantes nuevas al compilar.",
        "`any` desactiva la comprobación y propaga huecos. `unknown` acepta datos no validados, pero obliga a estrecharlos antes de operar. `never` representa estados imposibles o funciones que no retornan.",
        "Los generics preservan relaciones entre entrada y salida. Constraints, `keyof`, indexed access, mapped types, conditional types e `infer` permiten derivar contratos sin duplicarlos.",
        "Los overloads publican formas válidas de llamada sobre una implementación. Parámetros opcionales, rest y valores por defecto modelan variaciones más simples dentro de una misma firma.",
        "`Partial`, `Required`, `Pick`, `Omit` y `Record` transforman tipos existentes. Son útiles cuando el nuevo contrato deriva mecánicamente del original, no cuando representa otro concepto de dominio.",
        "Optional chaining corta sólo ante `null` o `undefined`. Nullish coalescing usa el fallback sólo para esos valores, mientras `||` también reemplaza `0`, `false` y la cadena vacía.",
        "Los decorators aportan metadata o transformación según la propuesta y configuración utilizada. Angular los usa para registrar componentes, directivas, pipes e inyectables.",
        "La configuración `strict` detecta nullability, parámetros incompatibles y propiedades sin inicializar. En las fronteras externas todavía hace falta validar el runtime con schemas o type guards.",
    ]

    modern = by_title["Angular: fundamentos, renderizado y versiones"]
    _replace_item(
        modern["master"],
        "La adopción de una API nueva depende de su estabilidad, soporte, capacidad del equipo y costo de fallback. APIs como `resource`, `httpResource` o Signal Forms requieren revisar su estado antes de incorporarlas a una base de producción.",
        "En Angular 22, `resource`, `httpResource` y Signal Forms son APIs estables. `resource` y `httpResource` están orientadas a lecturas reactivas; las mutaciones todavía necesitan un flujo explícito de escritura, errores, invalidación y consistencia.",
    )
    modern["master"].extend([
        "Signal Forms parte de un modelo writable, crea el formulario con `form()` y conecta controles mediante `[formField]`. Reactive Forms sigue siendo una opción madura para bases existentes y formularios complejos; la elección depende de interoperabilidad, validadores y experiencia del equipo.",
        "Los proyectos nuevos de Angular CLI usan Vitest como runner de tests. Desde Angular 22 la cadencia prevista pasa a una major por año; soporte y compatibilidad se verifican siempre en las tablas oficiales antes de migrar.",
    ])
    modern["qa"].append((
        "¿Qué cambió con Signal Forms en Angular 22?",
        "Signal Forms alcanzó estabilidad. Parte de un modelo writable, deriva el árbol de campos con `form()` y conecta la UI mediante `[formField]`. No obliga a reescribir Reactive Forms: comparo madurez del código existente, validadores, librerías y experiencia del equipo.",
    ))

    components = by_title["Componentes, templates y composición"]
    components["master"].extend([
        "La internacionalización separa mensajes del template, configura locales para fechas, números y moneda, y define cómo traducir contenido que llega desde APIs. El idioma forma parte del routing, SEO, caché y pruebas visuales, no sólo de un pipe.",
        "Angular moderno recomienda animaciones nativas con CSS y los bindings `animate.enter` y `animate.leave`. El paquete `@angular/animations` está deprecado; una migración conserva reduced motion, foco y estados intermedios antes de retirar triggers heredados.",
    ])
    components["qa"].extend([
        ("¿Qué debe definir una estrategia de i18n?", "Define extracción y traducción de mensajes, locales para formato, contenido remoto, URLs, SEO, caché y fallback. También prueba expansión de texto, pluralización, dirección y cambios de idioma sin romper el estado."),
        ("¿Cómo animarías entrada y salida en Angular moderno?", "Preferiría CSS junto con `animate.enter` y `animate.leave`, respetando `prefers-reduced-motion`. Mantendría `@angular/animations` sólo durante una migración controlada porque su API de transiciones está deprecada."),
    ])
    _remove_questions(components, {"¿Property binding o attribute binding?"})

    lifecycle = by_title["Ciclo de vida y render hooks"]
    _replace_item(
        lifecycle["master"],
        "`afterNextRender` ejecuta un callback después del siguiente render completo; `afterEveryRender` lo hace tras cada render. Agrupar escrituras DOM antes de lecturas geométricas evita alternar style recalculation y layout forzado.",
        "`afterNextRender` ejecuta trabajo después del siguiente render completo y `afterEveryRender` después de cada render; ambos corren sólo en el navegador. Sus fases `earlyRead`, `write`, `mixedReadWrite` y `read` permiten agrupar escrituras antes de lecturas y evitar layout thrashing.",
    )

    signals = by_title["Change detection, Signals y zoneless"]
    signals["master"].append("La interop oficial conecta ambos modelos: `toSignal` expone un Observable como estado síncrono, `toObservable` publica cambios de un signal y `takeUntilDestroyed` liga una subscription al ciclo de vida. Definí valor inicial, timing, errores y ownership al cruzar la frontera.")
    signals["qa"].append(("¿Cuándo usarías `toSignal` o `toObservable`?", "Uso `toSignal` cuando un flujo RxJS debe leerse de forma síncrona desde la vista, definiendo valor inicial y estrategia de error. Uso `toObservable` cuando un signal debe entrar en un pipeline con debounce, cancelación o concurrencia."))

    di = by_title["Dependency Injection en profundidad"]
    di["master"] = [
        "`providedIn: 'root'` crea una instancia por root EnvironmentInjector y permite tree shaking. Un provider de componente crea una instancia por componente; uno de ruta puede aislar el estado de una feature lazy.",
        "La resolución consulta primero la jerarquía de ElementInjectors y después la de EnvironmentInjectors. Por eso el lugar donde se registra un provider define visibilidad, vida útil y posibilidad de compartir estado.",
        "`useClass` construye una implementación, `useValue` entrega un valor, `useExisting` crea un alias y `useFactory` calcula la dependencia. Los multi providers acumulan varios valores bajo un mismo token.",
        "`InjectionToken` representa configuración, funciones o interfaces que no tienen identidad en runtime. Puede declarar tipo, factory y scope sin inventar una clase contenedora.",
        "`providers` alcanza la vista y el contenido descendiente; `viewProviders` oculta el provider al contenido proyectado. `self`, `skipSelf`, `host` y `optional` expresan límites intencionales de búsqueda.",
        "`inject()` requiere un injection context: inicializadores, constructores administrados, factories o `runInInjectionContext`. Sacarlo a una callback arbitraria produce un error aunque la función se haya creado dentro de una clase Angular.",
        "`injectAsync` es estable en Angular 22 y permite cargar e inyectar perezosamente un servicio mediante un import dinámico. La resolución ocurre en un contexto asíncrono y debe justificar el costo de otro chunk y el manejo de errores.",
    ]
    di["qa"].append(("¿Cuándo usarías `injectAsync`?", "Cuando una dependencia pesada o poco frecuente merece cargarse bajo demanda. Comparo el ahorro del bundle inicial con la latencia del chunk, manejo el rechazo y evito usarlo para servicios esenciales que todas las rutas necesitan."))

    rxjs = by_title["RxJS y concurrencia"]
    _replace_item(
        rxjs["master"],
        "`shareReplay({bufferSize: 1, refCount: true})` puede cachear, pero necesitás invalidación, manejo de error y semántica de vida útil.",
        "`shareReplay({bufferSize: 1, refCount: true})` comparte la fuente y reproduce el último valor, pero todavía requiere invalidación y una vida útil clara. Si necesitás políticas explícitas de reset por error, completion o refCount, usá `share` con un `ReplaySubject` como connector.",
    )
    _replace_question(rxjs, "¿Qué riesgo tiene `shareReplay`?", "Puede retener el último valor o mantener viva la fuente más tiempo del esperado. Defino buffer, `refCount`, invalidación y ownership. Cuando necesito controlar los resets, uso `share` con un `ReplaySubject` como connector.")
    _remove_questions(rxjs, {"¿`catchError`?"})

    routing = by_title["Routing y navegación"]
    _remove_questions(routing, {"¿Guard es seguridad?", "¿Qué hace un resolver?", "¿Resolver o carga en componente?"})

    forms = by_title["Formularios complejos"]
    forms["master"].append("Signal Forms es estable en Angular 22: el modelo writable actúa como fuente de verdad, `form()` crea el árbol de campos y `[formField]` sincroniza valor, estado y validación. Reactive Forms sigue encajando en sistemas maduros, CVAs existentes y migraciones incrementales.")
    forms["qa"].append(("¿Signal Forms o Reactive Forms?", "Signal Forms ofrece estado granular basado en signals y una API declarativa estable desde Angular 22. Reactive Forms conserva un ecosistema maduro y encaja mejor cuando ya existen CVAs, validadores y utilidades. Elegiría por interoperabilidad y costo de migración, no por novedad."))

    http = by_title["HTTP, APIs, errores y caché"]
    _remove_questions(http, {"¿En qué orden corren interceptors?"})

    performance = by_title["Rendimiento y Core Web Vitals"]
    performance["master"].insert(1, "Los umbrales de experiencia buena son LCP de hasta 2,5 segundos, INP de hasta 200 milisegundos y CLS de hasta 0,1. Se evalúan en datos de campo al percentil 75 y segmentados por tipo de dispositivo.")
    performance["master"].append("`NgOptimizedImage` aplica buenas prácticas de carga, dimensiones, prioridad y `srcset`. No reemplaza elegir el tamaño correcto, comprimir el recurso, reservar espacio ni medir cuál imagen participa del LCP.")
    _replace_question(performance, "¿`trackBy` sigue existiendo?", "Sí, dentro de `*ngFor`, pero `NgFor` está deprecado. El control flow moderno usa `@for` con `track`; en ambos casos una identidad estable conserva nodos y estado DOM.")
    _replace_question(performance, "¿Cómo investigarías un INP alto?", "Reproduzco la interacción con Performance panel y RUM, localizo long tasks y separo scripting, style, layout y paint. Después reduzco trabajo de la ruta crítica, divido el trabajo de CPU o limito renders y vuelvo a medir en dispositivos reales.")
    _remove_questions(performance, {"¿CLS?"})

    ssr = by_title["SSR, SSG, hidratación y rendering híbrido"]
    ssr["master"] = [
        "CSR renderiza principalmente en el navegador y simplifica áreas privadas. SSG genera HTML en build para contenido estable. SSR genera HTML por request para contenido fresco o personalizado. Una aplicación híbrida elige la estrategia por ruta.",
        "La hidratación reutiliza el DOM producido por el servidor y conecta las views del cliente sin reconstruir la página. El HTML del servidor y el primer render del cliente deben producir una estructura compatible.",
        "Fechas, random, locale, datos privados, DOM inválido o condiciones distintas entre servidor y navegador pueden crear mismatches. Transferí datos deterministas y posponé integraciones exclusivas del browser.",
        "`window`, `document`, storage y otras APIs del navegador no existen durante SSR. Platform checks, tokens inyectables y render hooks aíslan ese código sin cambiar prematuramente el árbol hidratado.",
        "Incremental hydration conserva bloques `@defer` deshidratados hasta un trigger `hydrate on`. Event replay captura interacciones tempranas y las reproduce cuando la sección ya puede responder.",
        "Transfer cache reutiliza en el cliente respuestas obtenidas durante SSR y evita otra petición inmediata. La clave, el HTML y cualquier caché compartida deben aislar datos por usuario o tenant.",
        "Un placeholder con las dimensiones del contenido final reduce CLS. El contenido above-the-fold suele participar del LCP; los bloques secundarios admiten lazy loading o hidratación diferida si la medición confirma el beneficio.",
    ]
    _remove_questions(ssr, {"¿Qué causa hydration mismatch?", "¿Qué produce un hydration mismatch?"})

    testing = by_title["Testing y estrategia de calidad"]
    _replace_item(testing["master"], "Angular moderno documenta Vitest junto con TestBed. Bases existentes pueden usar Jasmine/Jest; la estrategia importa más que la sintaxis.", "Los proyectos nuevos creados con Angular CLI usan Vitest por defecto. TestBed sigue aportando DI, compilación y render de Angular; bases existentes pueden conservar Jasmine o Jest mientras su estrategia de migración mantenga feedback y cobertura de riesgos.")

    accessibility = by_title["Accesibilidad, HTML y CSS"]
    _replace_item(accessibility["master"], "CSS: cascade, specificity, stacking contexts, box model, Flexbox, Grid, container/media queries y responsive images.", "El contenido debe conservar lectura y operación con zoom de texto al 200 % y reflow a 320 CSS px, sin scroll horizontal bidimensional salvo componentes que realmente lo necesiten, como tablas o diagramas.")
    accessibility["master"].extend([
        "WCAG 2.2 exige al menos 4,5:1 para texto normal y 3:1 para texto grande. Estados, iconos y límites necesarios para comprender controles requieren también contraste suficiente; el color nunca debe ser la única señal.",
        "Cada control necesita nombre, rol, valor y estado accesibles. Los errores identifican el campo, explican la corrección y no desaparecen sólo por color; un enlace para saltar al contenido evita recorrer navegación repetida.",
        "El foco debe ser visible y no quedar oculto por headers o overlays. Los targets táctiles necesitan tamaño y separación suficientes, y cualquier interacción por drag debe ofrecer una alternativa sin arrastre.",
    ])
    accessibility["qa"].extend([
        ("¿Qué mínimos de contraste recordarías?", "WCAG 2.2 pide 4,5 a 1 para texto normal y 3 a 1 para texto grande. Componentes y estados visuales relevantes necesitan 3 a 1 respecto de colores adyacentes; además, el color no puede ser la única señal."),
        ("¿Cómo verificás zoom y reflow?", "Pruebo texto al 200 por ciento y un viewport equivalente a 320 CSS px. El contenido debe conservar orden, foco y controles sin recorte ni scroll en dos dimensiones, salvo excepciones esenciales como una tabla compleja."),
    ])

    build = by_title["Build, CI/CD, configuración y upgrades"]
    build["master"].insert(1, "El builder `application` es el sistema moderno del CLI: usa esbuild para producción, integra SSR y prerender, y el servidor de desarrollo utiliza Vite. El builder webpack `browser` está deprecado; una migración revisa custom builders, polyfills, estilos y scripts.")
    build["qa"].append(("¿Qué aporta el builder `application`?", "Unifica build de navegador y servidor, usa esbuild y se integra con SSR y prerender; el dev server usa Vite. Antes de migrar reviso builders personalizados, dependencias de webpack, polyfills, assets y presupuestos de bundle."))

    personal = by_title["Preparación personal y respuestas conductuales"]
    _replace_question(personal, "Contame sobre vos", "Soy Full-Stack Product Engineer y Tech Lead, con más de nueve años construyendo productos web y mobile y una especialización fuerte en Angular desde sus primeras versiones. Lideré arquitectura, migraciones y formularios dinámicos a escala en equipos distribuidos. Busco un rol donde pueda combinar producto, entrega, calidad técnica y mentoring.")
    _replace_question(personal, "¿Por qué querés cambiar?", "Quiero ampliar el alcance de producto y arquitectura, trabajar sobre problemas con impacto medible y seguir creciendo en liderazgo técnico. En una entrevista adapto esta base a la oportunidad concreta y explico qué puedo aportar, sin hablar mal de equipos anteriores.")

    leadership = by_title["Liderazgo técnico y trabajo en equipo"]
    _replace_question(leadership, "¿Cómo manejaste feedback negativo?", "Uso una historia real: explico qué feedback recibí, qué evidencia revisé, qué decisión cambié y cómo pedí una segunda validación. Si el caso fue una modularización de formularios, sólo lo cuento cuando corresponde a mi experiencia y puedo explicar el resultado verificable.")
