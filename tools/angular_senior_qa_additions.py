from __future__ import annotations

import re
from collections.abc import Iterable


QA_ADDITIONS: dict[str, list[tuple[str, str]]] = {
    "Cómo razonar y responder como Senior": [
        (
            "¿Cómo estructurás una respuesta técnica extensa?",
            "Empiezo con una definición de una frase, explico el mecanismo y tomo una decisión para un escenario concreto. Cierro con el costo, la alternativa y cómo comprobaría el resultado. Si la pregunta es amplia, aviso esa estructura para que el entrevistador pueda profundizar donde le interese.",
        ),
        (
            "¿Qué hacés cuando la pregunta no incluye suficiente contexto?",
            "Pido las restricciones que realmente cambian la respuesta: volumen, frecuencia de cambio, SEO, latencia, consistencia, seguridad y capacidad del equipo. Si no están disponibles, declaro un supuesto, elijo bajo ese escenario y digo qué dato me haría cambiar de opción.",
        ),
    ],
    "TypeScript avanzado": [
        (
            "¿Qué diferencia existe entre `satisfies` y `as`?",
            "`satisfies` comprueba que el valor cumple un contrato y conserva su inferencia. `as` fuerza una interpretación del tipo y puede ocultar una incompatibilidad. Uso assertions sólo cuando el runtime aporta una garantía que el compilador no puede demostrar.",
        ),
        (
            "¿Cómo diseñás un generic útil?",
            "El generic debe conservar una relación entre valores, por ejemplo entre entrada y salida o entre una key y su propiedad. Si el parámetro de tipo aparece una sola vez, quizá una unión o un tipo concreto comunique mejor el contrato.",
        ),
    ],
    "JavaScript: tipos, coerción, scope y funciones": [
        (
            "¿Por qué existe la Temporal Dead Zone?",
            "Al entrar en un bloque, JavaScript crea los bindings de `let`, `const` y `class`, pero los deja sin inicializar hasta ejecutar su declaración. Ese intervalo es la Temporal Dead Zone. Leer el binding durante ese tramo lanza `ReferenceError`: `console.log(total); let total = 1;`. Incluso `typeof total` falla si `total` está en la TDZ, a diferencia de una variable que no existe. Con `var`, en cambio, el binding se inicializa con `undefined`, por lo que el acceso prematuro no falla y puede ocultar un error de orden. La TDZ existe para que una variable con scope de bloque no se use antes de tener el valor que su declaración promete. No significa que `let` y `const` no tengan hoisting: sus bindings se crean al entrar al scope, pero todavía no son accesibles.",
        ),
        (
            "¿Usarías alguna vez `==`?",
            "Sí, pero sólo usaría deliberadamente `value == null` cuando quiero aceptar exactamente `null` o `undefined`. La comparación es verdadera para esos dos valores y falsa para `0`, `false`, `''` y `NaN`; por ejemplo, `if (response.middleName == null)` detecta que el campo opcional no llegó sin rechazar una cadena vacía válida. Es una excepción conocida de Abstract Equality y conviene permitirla explícitamente con una regla como `eqeqeq: ['error', 'always', { null: 'ignore' }]`. En el resto del código uso `===` y `!==`, porque `==` aplica coerciones difíciles de leer: `'' == 0`, `'0' == false` y `[] == false` son verdaderas. Si el equipo prioriza máxima explicitud, escribo `value === null || value === undefined`; comunica el mismo contrato sin depender de conocer la excepción.",
        ),
    ],
    "JavaScript: objetos, prototipos, arrays y programación funcional": [
        (
            "¿Qué pierde una copia con spread?",
            "Spread copia propiedades enumerables propias del primer nivel. Las referencias anidadas siguen compartidas y la copia no conserva descriptores completos ni comportamiento interno de todos los objetos. Primero defino qué parte del modelo necesita una nueva identidad.",
        ),
        (
            "¿Cuándo evitás `map`, `filter` y `reduce` encadenados?",
            "Cada operador puede recorrer y asignar otra colección. En una ruta caliente o una lista grande, un solo loop puede reducir memoria y trabajo. Mantengo la cadena cuando su claridad pesa más que ese costo medido.",
        ),
    ],
    "JavaScript asíncrono: event loop, Promises y errores": [
        (
            "¿Cómo puede una cadena de microtasks bloquear la interfaz?",
            "El navegador vacía la cola de microtasks antes de avanzar al siguiente task y al render. Una cadena que agenda otra microtask puede retrasar input y pintura. Divido el trabajo y cedo al scheduler cuando necesito que el navegador procese otra tarea.",
        ),
        (
            "¿Qué ocurre si falla una promesa dentro de `Promise.all`?",
            "`Promise.all` rechaza al recibir el primer rechazo observable, pero las operaciones restantes continúan salvo que su API admita cancelación. Uso `allSettled` cuando necesito el resultado de cada operación y `AbortController` cuando debo detener I/O compatible.",
        ),
    ],
    "Browser internals, DOM, storage y red": [
        (
            "¿Qué produce un forced synchronous layout?",
            "Una escritura invalida estilos o layout y una lectura geométrica posterior, como `getBoundingClientRect`, obliga al navegador a calcular el resultado en ese momento. Agrupo lecturas y escrituras para evitar repetir ese trabajo dentro de un loop.",
        ),
        (
            "¿CORS protege una API contra clientes no autorizados?",
            "No. CORS controla qué respuestas puede leer JavaScript desde otro origin en un navegador. Un script de servidor puede llamar al endpoint. La API todavía necesita autenticación, autorización y validación.",
        ),
    ],
    "HTML completo: semántica, formularios, medios y SEO": [
        (
            "¿Cuándo usás un enlace y cuándo un botón?",
            "Un enlace con `href` cambia ubicación y conserva acciones nativas como abrir en otra pestaña. Un botón ejecuta una acción en la interfaz. Elegir el elemento correcto aporta teclado, rol y expectativas sin recrearlos con JavaScript.",
        ),
        (
            "¿Qué aporta la validación nativa de formularios?",
            "Atributos como `required`, `type`, `min`, `max` y `pattern` expresan restricciones y permiten feedback del navegador. La aplicación puede personalizar mensajes, pero el servidor debe repetir la validación porque el cliente se puede modificar.",
        ),
    ],
    "CSS completo: cascade, layout, responsive y rendimiento": [
        (
            "¿Cómo diagnosticás un problema de `z-index`?",
            "Identifico los stacking contexts de ambos elementos y comparo sus ancestros, no sólo sus números. `transform`, `opacity`, `isolation` y ciertos elementos posicionados crean contextos que limitan dónde compite un descendiente.",
        ),
        (
            "¿Media query o container query?",
            "Una media query responde al viewport o a preferencias del usuario. Una container query responde al espacio disponible para el componente. La segunda permite reutilizar la misma pieza en layouts distintos sin conocer la página que la contiene.",
        ),
    ],
    "Angular moderno y estrategia de versiones": [
        (
            "¿Qué revisarías antes de activar zoneless?",
            "Busco mutaciones que dependen de ZoneJS, librerías que actualizan campos sin notificar y usos directos de APIs externas. Migro el estado visible a signals, `AsyncPipe` o marcas explícitas y comparo tests y métricas antes de retirar ZoneJS.",
        ),
        (
            "¿Cómo decidís qué contenido cargar con `@defer`?",
            "Difiero contenido costoso que no participa del primer objetivo visual. Elijo trigger y prefetch según la probabilidad de uso, reservo espacio para evitar CLS y mido LCP, transferencia e interacción en una build de producción.",
        ),
    ],
    "Componentes, templates y composición": [
        (
            "¿Qué debería formar parte de la API pública de un componente?",
            "Sólo inputs, outputs y slots que representan variaciones reales del producto. Si una opción expone detalles internos o combina estados inválidos, prefiero dividir responsabilidades o modelar una unión más precisa.",
        ),
        (
            "¿Cuándo crearías una directiva en lugar de un componente?",
            "Creo una directiva cuando necesito añadir comportamiento a un elemento existente sin imponer markup. Creo un componente cuando la unidad posee estructura visual, estado y una API que deben evolucionar juntos.",
        ),
    ],
    "Ciclo de vida y render hooks": [
        (
            "¿`ngAfterViewInit` o `afterNextRender` para medir DOM?",
            "`ngAfterViewInit` confirma que Angular inicializó la vista, pero una medición puede depender de un render posterior. `afterNextRender` ejecuta trabajo después del siguiente render del árbol y permite separar fases de escritura y lectura.",
        ),
        (
            "¿Qué ventaja aporta `DestroyRef`?",
            "Coloca la limpieza junto al recurso que la necesita y evita concentrar teardown sin contexto en `ngOnDestroy`. Lo uso con listeners, observers y `takeUntilDestroyed` para vincular su vida al contexto de inyección.",
        ),
    ],
    "Change detection, Signals y zoneless": [
        (
            "¿Por qué una mutación profunda puede no actualizar la vista?",
            "Un signal compara el valor nuevo con el anterior mediante `Object.is` por defecto. Mutar una propiedad conserva la referencia y no publica otro valor. Creo una nueva referencia o modelo el campo como un signal independiente.",
        ),
        (
            "¿Cómo elegís entre `computed` y `effect`?",
            "`computed` calcula estado derivado y sólo depende de otros signals. `effect` sincroniza el grafo reactivo con una frontera externa como storage, logging o canvas. No copio estado derivado mediante efectos.",
        ),
    ],
    "Dependency Injection en profundidad": [
        (
            "¿Qué diferencia hay entre `useClass` y `useExisting`?",
            "`useClass` pide al injector que construya otra instancia de la clase indicada. `useExisting` crea un alias hacia una instancia registrada. Uso el alias cuando dos tokens deben compartir identidad y estado.",
        ),
        (
            "¿Cómo afecta el lugar del provider a una feature?",
            "El injector que registra el provider define su alcance y vida útil. Un provider de componente aísla instancias por subárbol; uno de ruta puede vivir con la feature lazy; root comparte la instancia en la aplicación.",
        ),
    ],
    "RxJS y concurrencia": [
        (
            "¿`switchMap` cancela el trabajo en el servidor?",
            "Unsubscribe detiene la observación y puede abortar el request si la fuente integra cancelación, como `HttpClient`. El servidor puede haber iniciado el trabajo. Las operaciones con efectos necesitan idempotencia o un protocolo de cancelación propio.",
        ),
        (
            "¿Qué riesgo tiene `shareReplay`?",
            "Puede retener el último valor y mantener viva la suscripción más tiempo del esperado. Defino buffer, `refCount` y política de reset según el ciclo de vida. También decido cómo invalidar errores y datos stale.",
        ),
    ],
    "Estado: local, servicios, Signals y NgRx": [
        (
            "¿Cómo separás server state de client state?",
            "Server state es una copia de datos remotos y requiere stale time, caché e invalidación. Client state nace en la interacción, por ejemplo filtros o pasos de un wizard. Separarlos evita que un store trate ambos ciclos de vida con la misma política.",
        ),
        (
            "¿Qué señales justifican introducir NgRx?",
            "Lo considero cuando varios flujos escriben el mismo dominio, necesito trazabilidad de eventos, efectos coordinados o reglas de actualización compartidas. Un formulario local o una pantalla aislada no justifican ese costo por sí solos.",
        ),
    ],
    "Routing y navegación": [
        (
            "¿Qué diferencia hay entre `CanMatch` y `CanActivate`?",
            "`CanMatch` decide si una configuración de ruta puede participar del matching y permite probar otra ruta. `CanActivate` actúa después de elegirla y decide si se activa. Ninguno reemplaza la autorización del servidor.",
        ),
        (
            "¿Cuándo evitarías un resolver?",
            "Evito bloquear navegación para datos secundarios o lentos. La pantalla puede mostrar estructura, loading y recuperación parcial. Uso resolver cuando el dato define si la ruta tiene sentido o cuando entrar sin él produciría un estado inválido.",
        ),
    ],
    "Formularios complejos": [
        (
            "¿Qué contrato debe cumplir un `ControlValueAccessor`?",
            "Debe escribir el valor externo sin emitir un cambio de usuario, registrar callbacks de cambio y touched, y respetar el estado disabled. También necesita una representación clara para null y valores parciales.",
        ),
        (
            "¿Cómo evitás carreras en validación asíncrona?",
            "Modelo la validación como un flujo que cancela la consulta anterior al cambiar el valor. Aplico debounce cuando corresponde y distingo error de transporte, valor inválido y estado pendiente en la interfaz.",
        ),
    ],
    "HTTP, APIs, errores y caché": [
        (
            "¿Por qué importa el orden de los interceptors?",
            "Cada interceptor envuelve al siguiente. El request avanza en el orden registrado y la respuesta vuelve en orden inverso. Autenticación, retry, caché y logging pueden cambiar su comportamiento según esa composición.",
        ),
        (
            "¿Cómo invalidás una caché después de una mutación?",
            "Relaciono cada escritura con las keys afectadas. Puedo invalidar, actualizar de forma optimista o reemplazar con la respuesta del servidor. La política incluye rollback y evita borrar datos de dominios no relacionados.",
        ),
    ],
    "Arquitectura de aplicaciones Angular": [
        (
            "¿Cómo detectás una frontera de feature incorrecta?",
            "Aparecen imports circulares, cambios coordinados entre carpetas supuestamente independientes y servicios compartidos que conocen todos los dominios. Reubico el comportamiento según ownership y expongo una API pequeña por frontera.",
        ),
        (
            "¿Qué problema genera una carpeta `shared` sin reglas?",
            "Recibe componentes, modelos y servicios de dominios distintos hasta convertirse en una dependencia global. Separo primitives reutilizables de contratos de negocio y dejo cada modelo cerca de la feature que lo posee.",
        ),
    ],
    "Patrones, SOLID y calidad de diseño": [
        (
            "¿Cómo aplicás Dependency Inversion en Angular?",
            "El consumidor depende de un contrato expresado por una clase abstracta o `InjectionToken`. La configuración conecta ese contrato con una implementación. Puedo cambiar la frontera en tests o por entorno sin enseñar detalles al consumidor.",
        ),
        (
            "¿Cuándo una facade empeora el diseño?",
            "Una facade que sólo renombra cada método añade navegación sin reducir acoplamiento. La uso cuando concentra un caso de uso, oculta coordinación entre dependencias o protege a la UI de cambios del subsistema.",
        ),
    ],
    "Rendimiento y Core Web Vitals": [
        (
            "¿Cómo empezás una investigación de rendimiento?",
            "Defino una interacción y una métrica, reproduzco con una build de producción y capturo un perfil. Después separo red, scripting, render y memoria. Optimizo el cuello medido y vuelvo a comparar bajo las mismas condiciones.",
        ),
        (
            "¿OnPush corrige una tarea larga de JavaScript?",
            "No. OnPush puede reducir verificaciones de vistas, pero una función que ocupa el main thread sigue bloqueando input y render. Divido el trabajo, reduzco su complejidad o lo muevo a un Worker si el costo de mensajes lo permite.",
        ),
    ],
    "SSR, SSG, hidratación y rendering híbrido": [
        (
            "¿Cómo elegís estrategia de rendering por ruta?",
            "Uso SSG para contenido estable, SSR para HTML dependiente de la request y CSR para áreas privadas donde el shell aporta poco al servidor. Evalúo SEO, personalización, latencia, caché y costo operativo por ruta.",
        ),
        (
            "¿Qué causa un hydration mismatch?",
            "El cliente produce un árbol distinto al HTML del servidor por datos no deterministas, acceso al navegador o markup condicional. Comparto el estado inicial, aíslo APIs del browser y mantengo estable la estructura hasta hidratar.",
        ),
    ],
    "Testing y estrategia de calidad": [
        (
            "¿Qué probás en una unidad y qué dejás para integración?",
            "Una unidad cubre reglas puras y estados con pocas fronteras. Un test de integración comprueba template, DI, router o HTTP cuando su composición forma parte del comportamiento. Elijo el nivel más bajo que todavía puede detectar el fallo real.",
        ),
        (
            "¿Cómo eliminás un test asíncrono flaky?",
            "Controlo reloj, scheduler y respuestas externas. Espero una condición observable en lugar de usar delays arbitrarios, cierro requests pendientes y elimino estado compartido entre casos.",
        ),
    ],
    "Seguridad web en Angular": [
        (
            "¿Qué implica usar `bypassSecurityTrustHtml`?",
            "La llamada no sanitiza el contenido. Declara que la aplicación confía en esa fuente y evita la protección de Angular para ese sink. La restrinjo a una frontera revisada y prefiero transformar datos antes de producir HTML.",
        ),
        (
            "¿Por qué un route guard no autoriza una operación?",
            "El usuario controla el cliente y puede omitir la navegación o llamar la API de forma directa. El guard mejora la experiencia. El servidor verifica identidad, permisos y ownership en cada operación.",
        ),
    ],
    "Accesibilidad, HTML y CSS": [
        (
            "¿Cuándo ARIA empeora un componente?",
            "ARIA puede contradecir la semántica nativa o anunciar un estado que el comportamiento no implementa. Empiezo por el elemento HTML correcto y agrego nombre, estado o relaciones sólo cuando falta información.",
        ),
        (
            "¿Cómo manejás el foco de un modal?",
            "Muevo el foco a un punto útil dentro del diálogo, mantengo la navegación en su contenido, cierro con Escape cuando corresponde y devuelvo el foco al disparador. El diálogo también necesita nombre y fondo inerte.",
        ),
    ],
    "Build, CI/CD, configuración y upgrades": [
        (
            "¿Cómo diseñás un feature flag seguro?",
            "Defino owner, audiencia, fallback, métricas y fecha de retiro. El backend mantiene las reglas de autorización. Los dos caminos permanecen probados mientras el flag exista y retiro el código cuando termina el rollout.",
        ),
        (
            "¿Publicarías source maps en producción?",
            "Los genero para relacionar errores minificados con el TypeScript, pero restrinjo su acceso al sistema de observabilidad. Asocio cada mapa con release y commit para simbolizar el stack correcto.",
        ),
    ],
    "Observabilidad, errores y debugging": [
        (
            "¿Cómo usás un correlation ID desde el frontend?",
            "Propago un identificador permitido en requests y lo registro junto con ruta, release y acción. Backend y gateway conservan el mismo valor para unir el fallo visible con logs y traces sin guardar datos personales.",
        ),
        (
            "¿Cómo confirmás un memory leak de navegación?",
            "Repito el recorrido, fuerzo garbage collection en un entorno de diagnóstico y comparo heap snapshots. Busco componentes retenidos, detached DOM nodes, listeners, timers y caches que conservan referencias.",
        ),
    ],
    "System design frontend": [
        (
            "¿Cómo elegís entre WebSocket, SSE y polling?",
            "WebSocket sirve para comunicación bidireccional, SSE para un stream servidor a cliente sobre HTTP y polling para cambios poco frecuentes o infraestructura simple. Comparo reconexión, proxies, orden, volumen y soporte del backend.",
        ),
        (
            "¿Qué debe definir una estrategia de caché?",
            "Define key, TTL, invalidación, deduplicación y comportamiento stale. También explica cómo reconciliar optimistic updates, conflictos y cambios de paginación sin mezclar datos de usuarios o filtros distintos.",
        ),
    ],
    "Liderazgo técnico y trabajo en equipo": [
        (
            "¿Qué convierte un comentario de review en bloqueante?",
            "Bloqueo por corrección, seguridad, pérdida de datos, contrato roto o una deuda que impide operar el cambio. Marco preferencias como sugerencias y explico el riesgo para que el autor pueda aplicar el criterio.",
        ),
        (
            "¿Qué incluís en un ADR?",
            "Registro contexto, restricciones, opciones consideradas, decisión y consecuencias. Añado owner y fecha de revisión cuando las condiciones pueden cambiar. El documento permite discutir la elección sin depender de memoria oral.",
        ),
    ],
    "Preparación personal y respuestas conductuales": [
        (
            "¿Cómo evitás que una respuesta STAR se vuelva demasiado larga?",
            "Resumo situación y tarea en pocas frases. Dedico la mayor parte a mis decisiones, alternativas y coordinación. Cierro con un resultado medible y el aprendizaje que cambió mi trabajo posterior.",
        ),
        (
            "¿Cómo contás un error sin debilitar tu perfil?",
            "Elijo un error real, explico la decisión que lo produjo y asumo mi parte. Describo cómo limité el impacto, qué señal agregué y qué cambio de código o proceso evitó repetirlo.",
        ),
    ],
}


def apply_qa_additions(chapters: Iterable[dict]) -> None:
    for chapter in chapters:
        clean_title = re.sub(r"^\d+\.\s*", "", chapter["title"])
        additions = QA_ADDITIONS.get(clean_title)
        if additions:
            chapter["qa"].extend(additions)
