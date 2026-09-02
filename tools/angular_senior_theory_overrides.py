from __future__ import annotations

from collections.abc import Iterable


Replacement = str | list[str]


THEORY_OVERRIDES: dict[str, dict[int, Replacement]] = {
    "2. Angular moderno y estrategia de versiones": {
        0: "Angular publica las versiones mayores de core y CLI de forma alineada. Cada versión admite rangos concretos de Node.js, TypeScript y RxJS; `ng version`, la tabla de compatibilidad y el Update Guide permiten comprobarlos antes de una migración.",
        4: "`@defer` separa las dependencias de una vista en otro chunk y las carga mediante triggers como viewport, idle o interaction. LCP y CLS muestran si diferir contenido visible empeora la carga principal o provoca saltos de layout.",
        5: "La adopción de una API nueva depende de su estabilidad, soporte, capacidad del equipo y costo de fallback. APIs como `resource`, `httpResource` o Signal Forms requieren revisar su estado antes de incorporarlas a una base de producción.",
    },
    "3. TypeScript avanzado": {
        0: [
            "TypeScript extiende JavaScript con un sistema de tipos estático. El compilador comprueba el programa y elimina los tipos al emitir JavaScript; por eso una anotación no valida por sí sola los datos que llegan en runtime.",
            "La inferencia obtiene un tipo desde el valor y su contexto. Una anotación fija el contrato de forma explícita. `as const` conserva literales y vuelve readonly la estructura inferida, mientras una anotación amplia puede convertir un literal como `'open'` en `string`.",
            "TypeScript usa tipado estructural: dos valores son compatibles cuando su forma cumple las propiedades requeridas, aunque sus clases o nombres sean distintos. El exceso de propiedades se comprueba con más rigor en object literals que en variables intermedias.",
            "Una `interface` describe contratos de objetos y admite declaration merging. Un `type` también puede representar unions, intersections, primitivas, tuplas y transformaciones calculadas. Ambos pueden expresar muchos contratos de objetos.",
            "Una union `A | B` acepta cualquiera de sus miembros y sólo permite operaciones comunes hasta estrechar el tipo. Una intersection `A & B` exige que el valor cumpla ambos contratos al mismo tiempo.",
            "Las firmas de funciones tipan parámetros y retorno. Los overloads publican varias formas válidas de llamada sobre una implementación, mientras los parámetros opcionales, rest y valores por defecto modelan variaciones dentro de una misma firma.",
        ],
        1: [
            "`any` desactiva la comprobación para el valor y permite que el hueco de tipos se propague. `unknown` acepta cualquier valor, pero exige comprobar su tipo antes de operar con él.",
            "`never` representa un valor que no puede existir. Aparece en funciones que no retornan y en ramas exhaustivas de una unión, donde permite detectar variantes sin manejar durante la compilación.",
            "Un generic introduce parámetros de tipo. La relación entre entrada y salida se conserva sin reemplazarla por `any`; por ejemplo, una función `identity<T>(value: T): T` devuelve el mismo tipo que recibió.",
        ],
        2: "Una discriminated union reúne variantes que comparten una propiedad literal, como `kind`. Al comprobar esa propiedad, TypeScript estrecha el tipo y habilita únicamente los campos de la variante activa. Un caso `default` asignado a `never` detecta estados nuevos que todavía no tienen manejo.",
        3: [],
        4: [
            "El operador `satisfies` comprueba que una expresión cumple un tipo sin reemplazar el tipo inferido de la expresión. Una anotación puede ensanchar el valor y un type assertion sólo le pide al compilador que confíe en el programador.",
            "Los utility types transforman tipos existentes. `Partial` vuelve opcionales sus propiedades, `Required` hace lo contrario, `Pick` y `Omit` seleccionan claves, y `Record` modela un mapa de claves a valores.",
            "Un type guard estrecha un tipo dentro de una rama. `typeof`, `instanceof`, el operador `in`, predicados `value is T` y funciones de assertion permiten demostrarle al compilador qué variante existe en runtime.",
            "Optional chaining (`?.`) corta una cadena sólo ante `null` o `undefined`. Nullish coalescing (`??`) usa el valor alternativo únicamente para esos dos casos, mientras que `||` también reemplaza `0`, `false` y la cadena vacía.",
            "Los decorators reciben metadata sobre clases o miembros y pueden reemplazar o complementar su definición según la propuesta y configuración usada. Angular los emplea para registrar componentes, directivas, pipes e inyectables.",
            "La configuración `strict` activa un conjunto de comprobaciones, entre ellas nullability, parámetros de funciones y propiedades inicializadas. El compilador encuentra estados inválidos antes de que lleguen al template o al runtime.",
        ],
        5: [],
    },
    "JavaScript: tipos, coerción, scope y funciones": {
        2: [
            "La coerción es la conversión de un valor de un tipo a otro. Es explícita cuando el código llama a `Number(value)`, `String(value)` o `Boolean(value)`, e implícita cuando el lenguaje convierte porque un operador o contexto necesita otro tipo. Formularios, query params, atributos DOM y storage entregan strings aunque representen números o booleanos; convertir y validar en esa frontera evita que la coerción se propague al dominio.",
            "Cuando un operador necesita convertir un objeto a primitivo, JavaScript ejecuta la operación abstracta `ToPrimitive`. Primero respeta `Symbol.toPrimitive` y, según el hint, consulta `valueOf` y `toString` hasta obtener un primitivo. Por eso `[]` se convierte en `''`, `[1, 2]` en `'1,2'` y un objeto común suele producir `'[object Object]'`; después el operador continúa con la conversión numérica o textual que corresponda.",
            "El operador `+` es especial: después de convertir objetos a primitivos, concatena si alguno de los operandos es string; si no, realiza suma numérica. `1 + '2'` produce `'12'`, mientras `'5' - 2`, `'5' * 2` y `'5' / 2` convierten a número. Los template literals fuerzan string y los contextos de `if`, `!`, `&&` y `||` usan conversión booleana.",
            "Las conversiones tienen bordes que conviene conocer: `Number('')` y `Number(null)` producen `0`, `Number(undefined)` produce `NaN`, y `Boolean('false')` es `true` porque cualquier string no vacío es truthy. `Number` exige que toda la cadena represente un número; `parseInt('10px', 10)` acepta el prefijo numérico. Ninguna de las dos reemplaza validar rango, formato y finitud con `Number.isFinite`.",
        ],
        7: [
            "Un closure es la combinación de una función con el entorno léxico donde fue creada. La función puede ejecutarse después de que terminó la llamada exterior y seguir resolviendo parámetros y variables de ese entorno. `makeCounter` puede declarar `let count = 0` y devolver una función que incrementa `count`; cada llamada a `makeCounter()` crea un binding privado e independiente.",
            "El closure conserva bindings, no una fotografía de sus valores. Si el binding cambia, las funciones que lo cerraron observan el valor actual. Esto permite estado privado y callbacks coordinados, pero también explica bugs cuando varias funciones comparten accidentalmente una misma variable mutable.",
            "En un loop, `var` crea un único binding con scope de función, por lo que callbacks diferidos suelen leer el valor final. `let` crea un binding nuevo por iteración. Antes de `let`, una IIFE o una factory recibía el valor de cada vuelta y creaba un entorno distinto.",
            "Closures sostienen factories, currying, memoization, event handlers y callbacks asíncronos. El entorno permanece vivo mientras una función alcanzable lo necesite: no es una fuga por sí mismo, pero puede retener DOM, caches o respuestas grandes. El cleanup debe remover listeners, cancelar timers o suscripciones y evitar capturar objetos completos cuando alcanza con un identificador o un dato pequeño.",
        ],
    },
    "JavaScript: objetos, prototipos, arrays y programación funcional": {
        4: "`map` crea una colección transformada, `filter` conserva elementos, `reduce` acumula, `find` devuelve la primera coincidencia y `some` o `every` evalúan predicados. Cada método comunica una intención distinta y evita acumular efectos dentro de un loop genérico.",
        8: "Memoization guarda resultados asociados a sus argumentos. La estrategia necesita una regla de igualdad, un límite de tamaño y una política de invalidación; sin esos límites, la caché puede devolver datos obsoletos o retener memoria sin control.",
    },
    "HTML completo: semántica, formularios, medios y SEO": {
        1: "`header`, `nav`, `main`, `article`, `section`, `aside` y `footer` describen la función de cada región. Navegadores y tecnologías asistivas usan esa estructura para crear landmarks. `div` y `span` agrupan contenido sin añadir significado.",
        7: "Un `button` dentro de un formulario tiene tipo `submit` por defecto. `type=button` representa una acción auxiliar y evita envíos accidentales. La semántica de submit también permite enviar con Enter y ejecutar la validación nativa.",
        8: "Una tabla de datos se compone con `caption`, `thead`, `tbody`, celdas `th` y relaciones `scope`. Esa estructura permite asociar cada dato con sus encabezados. Las tablas usadas para layout comunican relaciones inexistentes y dificultan el responsive design.",
        9: "`br` introduce un salto dentro del mismo contenido, como una dirección o un poema. `hr` marca un cambio temático entre bloques. El espacio visual entre elementos pertenece a margin, padding o gap en CSS.",
    },
    "CSS completo: cascade, layout, responsive y rendimiento": {
        7: "Responsive design combina tamaños fluidos, media queries, container queries, imágenes adaptativas y límites de ancho. Los breakpoints basados en el punto donde el contenido deja de funcionar resisten mejor cambios de dispositivos y layout.",
        10: "Una transition interpola el cambio entre dos estados; una animation recorre keyframes aunque no cambie una propiedad por interacción. `transform` y `opacity` suelen ejecutarse en composición y evitan layout, mientras `prefers-reduced-motion` permite reducir movimiento no esencial.",
        13: "`contain` limita qué partes del árbol pueden afectar layout, paint o style fuera de un elemento. `content-visibility: auto` permite omitir el render de contenido fuera del viewport. Ambas herramientas reducen trabajo, pero cambian mediciones, foco y accesibilidad si se aplican sin comprobar el resultado.",
    },
    "4. Componentes, templates y composición": {
        0: "La metadata de un componente conecta una clase con su selector, template, estilos, estrategia de encapsulación, change detection, imports y providers. Los host bindings aplican propiedades, atributos o listeners al elemento anfitrión del componente.",
        1: "`input()` declara un signal de entrada y `output()` crea un emisor tipado hacia el padre. `model()` combina una entrada con su salida `nombreChange`, lo que habilita two-way binding para controles cuyo valor forma parte de su contrato público.",
        3: "`viewChild` y `viewChildren` consultan la vista propia; `contentChild` y `contentChildren` consultan contenido proyectado. Las queries basadas en signals cambian cuando cambia el árbol. Una query `required` falla si el contrato no encuentra el hijo esperado.",
        5: "Angular puede evaluar una expresión de template durante cada comprobación de la vista. Una función costosa invocada desde el template repite ese trabajo. `computed` memoriza una derivación y sólo la recalcula cuando cambia alguno de los signals leídos.",
    },
    "5. Ciclo de vida y render hooks": {
        2: "`afterNextRender` ejecuta un callback después del siguiente render completo; `afterEveryRender` lo hace tras cada render. Agrupar escrituras DOM antes de lecturas geométricas evita alternar style recalculation y layout forzado.",
        3: "`DestroyRef` registra cleanup en el mismo contexto donde nace un recurso. `takeUntilDestroyed` completa una suscripción cuando ese contexto se destruye. Observers, timers y listeners creados fuera de Angular requieren también su función explícita de limpieza.",
        4: "`ExpressionChangedAfterItHasBeenCheckedError` aparece en desarrollo cuando una expresión cambia después de que Angular ya verificó esa vista dentro del mismo ciclo. La causa suele ser un flujo de datos que escribe hacia un ancestro o modifica estado durante un hook tardío; diferir con un timer oculta la inconsistencia.",
    },
    "6. Change detection, Signals y zoneless": {
        2: "`computed` representa estado derivado: lee otros signals, memoriza el resultado y permanece libre de efectos. `effect` ejecuta una operación cuando cambian sus dependencias. Copiar una derivación mediante `effect` crea dos fuentes de verdad y puede producir ciclos o escrituras redundantes.",
    },
    "7. Dependency Injection en profundidad": {
        2: "`useClass` crea una clase para un token; `useValue` entrega un valor existente; `useExisting` crea un alias; `useFactory` calcula la dependencia con otras inyecciones. Los multi providers acumulan varios valores bajo un token e `InjectionToken` representa contratos que no existen como clase en runtime.",
    },
    "8. RxJS y concurrencia": {
        7: "La ubicación de `catchError` define qué stream termina. Dentro de `switchMap` o de otro flattening operator, el error se reemplaza sólo para esa petición y el stream exterior puede seguir escuchando. Fuera del operador, el error finaliza la cadena completa salvo que se retorne otro observable.",
        9: "`Subject` no conserva un valor, `BehaviorSubject` guarda el último y exige uno inicial, y `ReplaySubject` reproduce una cantidad o ventana de emisiones. Exponer sólo `asObservable()` impide que consumidores externos escriban en el estado del productor.",
    },
    "9. Estado: local, servicios, Signals y NgRx": {
        1: "Server state es una copia local de datos remotos y necesita caché, stale time, invalidación, deduplicación y reintentos. Client state nace en la interfaz, como selección, filtros o un wizard, y su ciclo de vida depende de la navegación y del alcance de la feature.",
        2: "En NgRx, una action describe un evento, un reducer calcula el siguiente estado sin efectos, un selector deriva y memoriza consultas, y un effect conecta eventos con I/O. Entity normaliza colecciones como un diccionario de ids más una lista ordenada.",
        3: "El estado derivado se calcula desde la fuente mediante selectors o `computed`; almacenarlo por separado exige sincronizar copias. Las actions expresadas como hechos de dominio, por ejemplo `invoiceSubmitted`, permiten que varios efectos reaccionen sin acoplarse al botón que originó el evento.",
        4: "ComponentStore y SignalStore encapsulan estado de una feature sin crear un store global. La elección depende de la estabilidad de la API, el ecosistema disponible y la experiencia del equipo con el modelo reactivo.",
        5: "Una actualización optimista modifica la UI antes de recibir confirmación. El diseño necesita rollback o reconciliación cuando falla, una clave idempotente para evitar duplicados y una regla para conflictos entre la versión local y la remota.",
    },
    "10. Routing y navegación": {
        0: "`loadComponent` y `loadChildren` crean fronteras de lazy loading que descargan una feature al navegar. Un chunk por componente pequeño aumenta requests y overhead; una frontera por capacidad de producto suele equilibrar carga inicial y reutilización.",
        3: "Los path params identifican recursos dentro de la ruta; los query params representan filtros o estado compartible; el fragment apunta a una sección del documento. Rutas hijas componen layouts, outlets muestran árboles paralelos, redirects normalizan URLs y route data aporta metadata estática.",
        4: "Una `RouteReuseStrategy` puede conservar la instancia y el DOM de una ruta al navegar. También conserva memoria, estado y suscripciones; una política de invalidación decide cuándo destruir ese snapshot.",
        5: "`RouterTestingHarness` crea un router de prueba, navega por URL y expone el componente activado. Permite comprobar parámetros inválidos, redirects, guards rechazados y errores de resolvers desde el comportamiento observable.",
    },
    "11. Formularios complejos": {
        3: "`ControlValueAccessor` conecta un control propio con Angular Forms mediante cuatro operaciones: escribir un valor, registrar cambios, registrar touched y aplicar disabled. El control no debe volver a emitir como cambio el valor que Forms acaba de escribirle, porque eso crea un loop.",
        4: "Copiar cada emisión de `valueChanges` a otro objeto crea dos representaciones del formulario que pueden divergir. El `FormGroup` puede ser la fuente de verdad durante la edición y el submit puede mapear su valor a un comando o DTO.",
        5: "Los errores se muestran después de interacción o submit para evitar ruido antes de que el usuario actúe. `aria-describedby` asocia el mensaje con el control; el foco debe llegar al primer campo inválido cuando un submit no puede continuar.",
    },
    "12. HTTP, APIs, errores y caché": {
        0: "`provideHttpClient` registra el cliente HTTP y los interceptors funcionales forman una cadena alrededor de cada request. Los servicios o repositorios de feature encapsulan URLs, DTOs y reglas de acceso para que los componentes dependan del dominio.",
        1: "Los tipos de TypeScript desaparecen al compilar y no validan el JSON recibido. Un schema runtime comprueba datos externos antes de usarlos; un mapper traduce el DTO del servidor a un modelo interno estable.",
        2: "Un interceptor puede agregar autenticación, correlation IDs y telemetría, o normalizar errores. Un loader global necesita contar requests concurrentes: un booleano se apaga cuando termina la primera aunque otras sigan activas.",
        3: "Un retry repite una operación que falló. Los métodos idempotentes pueden repetirse sin cambiar el resultado; una escritura necesita una clave de idempotencia si existe riesgo de duplicación. Backoff, jitter y un límite evitan amplificar una caída, y los errores funcionales 4xx requieren otra acción.",
        4: "Timeout, cancelación, offline, fallo de red, 401/403, 404, validación y 5xx representan estados distintos. La interfaz puede ofrecer reintento para red o timeout, login para 401, corrección de campos para validación y un fallback ante errores del servidor.",
        5: "`httpResource` conecta `HttpClient` con una API de signals para request, valor, loading y error. En dominios grandes, la estrategia todavía necesita claves de caché, invalidación, aislamiento por usuario y coordinación con otras escrituras.",
        6: "Una caché se define por su clave, vida útil, política de invalidación y aislamiento. La deduplicación comparte una petición en curso; stale-while-revalidate entrega el valor anterior mientras actualiza. Incluir el usuario o tenant en la clave evita mezclar datos privados.",
    },
    "13. Arquitectura de aplicaciones Angular": {
        0: "La organización por feature agrupa UI, acceso a datos, modelos y rutas que cambian por la misma capacidad de producto. Una organización global por tipo técnico dispersa una modificación entre carpetas distantes y debilita los límites de dominio.",
        1: "Un componente presentacional recibe datos y emite eventos; un orquestador coordina estado, navegación y servicios. La separación reduce dependencias cuando varias vistas reutilizan la presentación, pero añade capas vacías si ambas piezas cambian siempre juntas.",
        2: "Dependency inversion hace que el dominio dependa de un contrato estable y que el detalle implemente ese contrato. En Angular, un `InjectionToken` más un adapter permite cambiar analytics, storage, pagos o una API externa sin modificar consumidores.",
        3: "La public API de una librería o feature declara qué símbolos pueden consumir otros módulos. Los imports profundos atraviesan ese límite, acoplan al árbol interno de archivos y convierten un refactor local en un cambio global.",
        6: "Un Architecture Decision Record conserva el contexto, las alternativas evaluadas, la decisión, sus consecuencias y una fecha de revisión. El registro explica por qué existe una restricción cuando cambia el equipo o el contexto original.",
    },
    "14. Patrones, SOLID y calidad de diseño": {
        4: "Un god service acumula motivos de cambio; un shared module masivo crea dependencias implícitas; los barrel cycles ocultan ciclos; los boolean flags multiplican estados; las subscriptions anidadas pierden control de concurrencia y la lógica de negocio en templates se repite y resulta difícil de probar.",
    },
    "15. Rendimiento y Core Web Vitals": {
        0: "LCP mide cuándo aparece el mayor elemento visible, INP observa la latencia de las interacciones y CLS acumula desplazamientos inesperados. Bundle size, long tasks, memoria y frecuencia de renders explican sus causas. Lighthouse usa un entorno sintético; RUM registra dispositivos y redes reales.",
        1: "Lazy routes y `@defer` sacan JavaScript del bundle inicial. El beneficio depende del waterfall de chunks, preloading, prefetch y caché HTTP: demasiadas fronteras pequeñas pueden intercambiar bytes iniciales por latencia de red.",
        2: "`OnPush` permite saltar subárboles sin notificaciones, signals marcan consumidores precisos y un `track` estable conserva nodos de una lista. Virtual scroll limita el DOM visible; la paginación reduce además datos transferidos y trabajo del servidor.",
        3: "Una pipe impura y una función costosa en template pueden ejecutarse en cada check. Listeners globales sin cleanup retienen vistas, las imágenes sin dimensiones causan CLS y una dependencia grande aumenta parse, compile y ejecución además de transferencia.",
        5: "Las escrituras DOM invalidan estilos y las lecturas geométricas pueden forzar su cálculo. Agrupar ambas fases evita layout thrashing. Debounce reduce eventos de alta frecuencia; un Web Worker descarga CPU cuando el costo de serializar mensajes resulta menor que bloquear el main thread.",
    },
    "16. SSR, SSG, hidratación y rendering híbrido": {
        3: "`window`, `document`, storage y otras APIs del navegador no existen durante SSR. Platform checks, tokens inyectables y render hooks aíslan ese código para que el servidor pueda construir el HTML sin acceder al entorno cliente.",
        4: "Transfer cache reutiliza en el cliente ciertas respuestas obtenidas durante SSR y evita una segunda petición inmediata. La clave y el HTML generado deben aislar datos por usuario para impedir que una respuesta privada termine en otra sesión.",
        5: "Un placeholder con las mismas dimensiones que el contenido final reserva espacio y reduce CLS. El contenido above-the-fold participa en LCP y suele cargarse antes; los bloques secundarios admiten lazy loading o hidratación diferida.",
    },
    "17. Testing y estrategia de calidad": {
        2: "Un test de componente interactúa con el DOM mediante roles, labels y eventos, y comprueba el resultado visible. Los métodos privados y la estructura interna son detalles de implementación; afirmar sobre ellos vuelve frágil el test ante refactors sin cambio de comportamiento.",
        3: "`HttpTestingController` intercepta requests de `HttpClient` y permite afirmar método, URL, body y headers antes de responder con éxito o error. `verify()` comprueba al final que ninguna petición haya quedado pendiente.",
        5: "Fake timers controlan el reloj de debounce, retry y delays sin esperar tiempo real. Los marble tests representan emisiones RxJS sobre una línea temporal virtual y sirven cuando el orden y la concurrencia forman parte del contrato.",
        6: "Un mock reemplaza una frontera y permite aislar la unidad, pero demasiados mocks pueden describir una integración que ningún proveedor real soporta. Los contract tests verifican que DTOs, adapters y clientes respeten el mismo contrato.",
    },
    "18. Seguridad web en Angular": {
        1: "`DomSanitizer.bypassSecurityTrust*` no limpia contenido: crea un valor que omite la sanitización de Angular. Su uso concentra una decisión de confianza y necesita una fuente controlada, revisión y auditoría.",
        2: "Content Security Policy limita los orígenes y tipos de recursos que puede ejecutar el navegador. Trusted Types obliga a que sinks DOM peligrosos reciban valores creados por políticas registradas. Juntas reducen el impacto de una inyección que llega al DOM.",
        3: "CSRF aprovecha credenciales que el navegador adjunta de forma automática, como cookies. SameSite, un token XSRF y la validación del servidor prueban que la petición salió de la aplicación esperada. Un bearer token evita ese mecanismo, pero puede ser robado por XSS según dónde se almacene.",
        4: "Un guard decide navegación en el cliente y mejora la experiencia, pero el usuario puede omitirlo o llamar la API de forma directa. La API debe comprobar permisos y ownership para cada operación.",
        5: "El bundle frontend y sus variables de entorno llegan al navegador y cualquier usuario puede inspeccionarlos. Claves privadas, credenciales de servicio y secretos pertenecen al servidor o a un gestor de secretos.",
        6: "Las versiones soportadas de Angular reciben correcciones; el lockfile fija el grafo instalado. Una auditoría de supply chain revisa vulnerabilidades, paquetes abandonados, scripts de instalación y cambios inesperados de mantenedor.",
    },
    "19. Accesibilidad, HTML y CSS": {
        0: "HTML semántico aporta nombre, rol y comportamiento nativo. `button` ejecuta acciones, `a` con `href` navega, los headings forman el índice, `label` nombra controles y los landmarks permiten saltar entre regiones.",
        1: "La navegación por teclado necesita un orden de foco que siga la lectura y un indicador visible. Un modal mueve el foco a su interior, impide escapar al contenido de fondo, anuncia su nombre y devuelve el foco al elemento que lo abrió.",
        2: "ARIA añade nombre, rol, estado o relaciones cuando HTML nativo no alcanza. No incorpora por sí sola teclado ni comportamiento; un `div role=button` todavía necesita foco y activación con Enter y Space.",
        3: "Los errores asociados mediante `aria-describedby` se leen junto al control. Una live region anuncia cambios asíncronos que no reciben foco, como el resultado de una operación o una validación remota.",
        5: "Zoom, texto largo y localización cambian las dimensiones del contenido; contraste y high contrast cambian su percepción; reduced motion limita animaciones. Un componente flexible conserva lectura, foco y controles sin depender de alturas fijas.",
    },
    "20. Build, CI/CD, configuración y upgrades": {
        0: "La configuración de build contiene valores públicos que pueden quedar embebidos en los bundles. Los secretos permanecen fuera del frontend. Validar la configuración al arrancar detecta URLs o flags faltantes y evita que cada entorno interprete defaults distintos.",
        1: "Un pipeline de CI ejecuta typecheck, lint, unit tests, build con budgets y recorridos críticos antes de publicar. Una caché usa el lockfile y la configuración como parte de su clave para no reutilizar dependencias o resultados incompatibles.",
        2: "Los assets con hash pueden usar caché larga porque una modificación cambia su URL. El HTML conserva una política corta para descubrir el release nuevo. Un rollback necesita artefactos anteriores y compatibilidad temporal entre el frontend nuevo y la versión previa de la API.",
        3: "Un feature flag separa despliegue de exposición. Owner, métricas y fecha de retiro controlan su ciclo de vida; un flag permanente mantiene dos caminos de código y duplica combinaciones de prueba.",
        4: "`ng update` y los schematics transforman configuración y código para una versión nueva. Actualizar una major por vez reduce combinaciones no soportadas; las deprecations, el bundle y las métricas runtime muestran qué trabajo queda después de compilar.",
        5: "Los source maps relacionan el bundle minificado con el TypeScript original. En producción requieren acceso restringido porque revelan estructura y código; asociarlos con release, commit y evento permite reconstruir el stack correcto.",
    },
    "21. Observabilidad, errores y debugging": {
        0: "La frontera global captura errores que ninguna feature manejó. El registro conserva tipo, causa y contexto técnico sin exponer stack traces, tokens ni datos personales en la interfaz.",
        1: "Release, ruta, acción, correlation ID, usuario anonimizado y breadcrumbs permiten reconstruir una falla. El mismo correlation ID propagado por gateway y backend conecta el error del navegador con logs y traces del servidor.",
        2: "La tasa de errores indica frecuencia, la latencia por endpoint localiza esperas, Web Vitals describe experiencia de render e interacción y el éxito de journeys mide tareas completas. Un log sin una pregunta operativa ni una acción asociada añade volumen sin diagnóstico.",
        4: "Un leak se vuelve visible al repetir navegación y comparar heap snapshots. Detached DOM nodes, listeners, timers y caches sin límite muestran qué referencia mantiene viva una vista que Angular ya destruyó.",
        5: "Un error boundary de feature contiene el fallo y ofrece una salida: retry, fallback, estado parcial o contacto de soporte. Un toast genérico desaparece y no conserva la operación que el usuario necesita recuperar.",
    },
    "22. System design frontend": {
        0: "Los usuarios, flujos críticos, SEO, offline, tiempo real, volumen, permisos, localización y objetivos de rendimiento forman las restricciones del diseño. Cada restricción modifica las fronteras, la estrategia de datos o el modo de rendering.",
        1: "Un diagrama frontend ubica features, router, estado, API layer, componentes compartidos y fronteras de dominio. La propiedad de cada dato determina quién puede escribirlo, quién lo deriva y cuánto tiempo debe vivir.",
        2: "Una estrategia de caché define key, TTL e invalidación. La consistencia establece cuándo aceptar datos stale, cómo reconciliar optimistic updates, qué hacer ante conflictos y cómo mantener cursores o páginas al cambiar la colección.",
        3: "WebSocket ofrece comunicación bidireccional persistente, SSE envía un stream unidireccional sobre HTTP y polling repite requests. La solución necesita reconexión, orden, deduplicación y backpressure para no procesar eventos más rápido de lo que la UI puede consumirlos.",
        4: "Un diseño completo incluye autorización, accesibilidad, telemetría, niveles de prueba, estrategia de despliegue y migración. Esas fronteras determinan si el sistema puede operarse y evolucionar después del primer release.",
        5: "La primera versión cubre la escala y los riesgos conocidos con el menor número de piezas. Umbrales observables, como latencia, volumen o frecuencia de incidentes, indican cuándo una estrategia deja de servir y justifican el siguiente cambio.",
    },
    "23. Liderazgo técnico y trabajo en equipo": {
        0: "Un code review evalúa corrección, seguridad, diseño y tests. Un comentario bloqueante describe un defecto que impide integrar; una sugerencia propone una mejora opcional. Explicar el motivo permite que el autor aplique el criterio en código futuro.",
        1: "Una decisión técnica documentada contiene contexto, alternativas y consecuencias. La fecha de revisión evita tratar como permanente una elección tomada bajo restricciones que pueden cambiar.",
        2: "Mentoring hace visible el modelo mental, aumenta la dificultad de forma gradual y devuelve la decisión a quien aprende. Resolver cada problema por la otra persona concentra conocimiento y convierte al mentor en cuello de botella.",
        3: "Durante un incidente, el equipo primero estabiliza el servicio, comunica impacto, asigna roles y conserva evidencia. El postmortem reconstruye causas y cambia código, alertas o proceso sin buscar culpables.",
        4: "La negociación de alcance compara riesgo, dependencias, costo de demora y una entrega incremental. Exponer incertidumbre permite reservar tiempo, instrumentar el resultado o reducir el alcance antes de comprometer una fecha.",
        5: "Lead time, defectos, costo de mantenimiento, adopción y carga cognitiva describen salud técnica desde resultados. Líneas de código y cantidad de tickets premian volumen aunque el sistema sea más complejo o menos estable.",
    },
    "24. Preparación personal y respuestas conductuales": {
        0: "Un pitch de 60 a 90 segundos conecta especialidad, años de experiencia, dominios, dos logros y motivación para el rol. Recorrer cada empleo del CV consume tiempo sin mostrar el criterio que une la trayectoria.",
        2: "Un banco conductual cubre conflicto, error, feedback, liderazgo, deadlines, incertidumbre, incidentes, rendimiento y arquitectura. Cada historia puede responder varias preguntas si identifica con precisión la decisión y el resultado.",
        3: "El caso de formularios dinámicos demuestra arquitectura, Redux o NgRx, escalabilidad y coordinación. Cantidad de formularios, tiempo de entrega y defectos antes y después convierten la historia en evidencia medible.",
        4: "La experiencia desde Angular 2 permite comparar cambios del framework a través del tiempo. Una adopción acertada muestra beneficio y migración; una API rechazada muestra restricciones y costo que superaban ese beneficio.",
        5: "Las preguntas al entrevistador revelan arquitectura, prácticas de calidad, organización del equipo, roadmap, manejo de incidentes, autonomía y criterio de éxito. Las respuestas permiten evaluar el alcance real del rol.",
    },
}


def apply_theory_overrides(chapters: Iterable[dict]) -> None:
    for chapter in chapters:
        chapter_overrides = THEORY_OVERRIDES.get(chapter["title"])
        if not chapter_overrides:
            continue

        rewritten: list[str] = []
        for index, item in enumerate(chapter["master"]):
            replacement = chapter_overrides.get(index, item)
            if isinstance(replacement, list):
                rewritten.extend(replacement)
            else:
                rewritten.append(replacement)
        chapter["master"] = rewritten
