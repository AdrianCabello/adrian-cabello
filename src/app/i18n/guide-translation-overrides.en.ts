export const GUIDE_ENGLISH_TRANSLATION_OVERRIDES: Readonly<
  Record<string, string>
> = {
  Pomodoro: 'Pomodoro',
  'Ritmo de estudio': 'Study rhythm',
  Foco: 'Focus',
  Descanso: 'Break',
  'Temporizador Pomodoro': 'Pomodoro timer',
  'Arrastrar Pomodoro': 'Drag Pomodoro',
  'Arrastrá para mover': 'Drag to move',
  Mover: 'Move',
  'Restaurar posición': 'Reset position',
  'Posición restaurada': 'Position reset',
  'Historial de estudio': 'Study history',
  'min hoy': 'min today',
  Hoy: 'Today',
  Total: 'Total',
  'Últimas sesiones': 'Recent sessions',
  'Completá tu primer foco para empezar el historial.':
    'Complete your first focus session to start your history.',
  'Modo del temporizador': 'Timer mode',
  Duración: 'Duration',
  'Duración del ciclo': 'Cycle duration',
  'En curso': 'Running',
  Preparado: 'Ready',
  Iniciar: 'Start',
  Pausar: 'Pause',
  Reiniciar: 'Reset',
  Cerrar: 'Close',
  'Cerrar temporizador': 'Close timer',
  'Abrir temporizador': 'Open timer',
  'Pausar temporizador': 'Pause timer',
  'Temporizador pausado': 'Timer paused',
  'Temporizador reiniciado': 'Timer reset',
  'Modo seleccionado': 'Selected mode',
  iniciado: 'started',
  sesión: 'session',
  sesiones: 'sessions',
  Sonido: 'Sound',
  Sí: 'On',
  No: 'Off',
  'Foco terminado. Es momento de descansar.':
    'Focus complete. It is time for a break.',
  'Descanso terminado. Volvé cuando estés listo.':
    'Break complete. Come back when you are ready.',
  temas: 'topics',
  tema: 'topic',
  'Angular moderno': 'Modern Angular',
  'Criterio Senior': 'Senior judgment',
  'TypeScript avanzado': 'Advanced TypeScript',
  'Compartir guía': 'Share guide',
  'Compartir la guía en LinkedIn': 'Share the guide on LinkedIn',
  'vez compartida': 'share',
  'veces compartida': 'shares',
  'Ir al contenido': 'Skip to content',
  'Adrian Cabello, Full-Stack Product Engineer y Tech Lead':
    'Adrian Cabello, Full-Stack Product Engineer and Tech Lead',
  'HTML, CSS, JavaScript, TypeScript, Angular moderno, RxJS, browser, arquitectura, performance, testing, seguridad, system design y liderazgo técnico.':
    'HTML, CSS, JavaScript, TypeScript, modern Angular, RxJS, browser internals, architecture, performance, testing, security, system design and technical leadership.',
  'Fundamentos web': 'Web fundamentals',
  'HTML, CSS, JavaScript y TypeScript, desde la base hasta preguntas avanzadas.':
    'HTML, CSS, JavaScript and TypeScript, from first principles to advanced interview questions.',
  'Plataforma y arquitectura': 'Platform and architecture',
  'Browser, DOM, red, límites, patrones, SOLID y evolución del código.':
    'Browser internals, DOM, networking, boundaries, patterns, SOLID and code evolution.',
  'Cómo razonar y responder como Senior':
    'How to reason and answer as a Senior engineer',
  'Abrir tema': 'Open topic',
  'Cerrar tema': 'Collapse topic',
  'Audio del tema': 'Topic audio',
  'Explicación narrada': 'Narrated explanation',
  Español: 'Spanish',
  'Escuchar explicación de': 'Listen to the explanation of',
  'Tu navegador no puede reproducir este audio.':
    'Your browser cannot play this audio.',
  'Descargar audio': 'Download audio',
  Velocidad: 'Speed',
  'Velocidad de reproducción': 'Playback speed',
  ' veces la velocidad normal': ' times normal speed',
  'Resumen rápido': 'Quick summary',
  'Orden de la primera inicialización': 'First initialization order',
  'Angular recorre estas etapas una sola vez al crear el componente.':
    'Angular goes through these stages once when it creates the component.',
  'Asignación de inputs': 'Input assignment',
  'Angular crea la instancia y resuelve la inyección de dependencias.':
    'Angular creates the instance and resolves dependency injection.',
  'Angular entrega los valores iniciales recibidos desde el padre.':
    'Angular assigns the initial values received from the parent.',
  'Recibe el primer SimpleChanges antes de inicializar el componente.':
    'Receives the first SimpleChanges before initializing the component.',
  'Ejecuta una vez la inicialización que necesita los inputs listos.':
    'Runs initialization that requires ready inputs once.',
  'Permite una comprobación manual durante el primer recorrido.':
    'Allows a manual check during the first traversal.',
  'Content hooks': 'Content hooks',
  'ngAfterContentInit y luego ngAfterContentChecked.':
    'ngAfterContentInit followed by ngAfterContentChecked.',
  'View hooks': 'View hooks',
  'ngAfterViewInit y luego ngAfterViewChecked.':
    'ngAfterViewInit followed by ngAfterViewChecked.',
  'Render callbacks': 'Render callbacks',
  'afterNextRender y afterEveryRender, sólo en el navegador.':
    'afterNextRender and afterEveryRender, in the browser only.',
  'Luego se repite': 'Then each check repeats',
  '¿Temporal Dead Zone?': 'Temporal Dead Zone?',
  '`var` usa scope de función y permite redeclaración. `let` y `const` usan scope de bloque y temporal dead zone. `const` impide reasignar la variable, pero el valor referenciado puede mutar.':
    '`var` has function scope and allows redeclaration. `let` and `const` have block scope and remain in the Temporal Dead Zone until initialized. `const` prevents reassignment of the binding, but the referenced value can still mutate.',
  '`header`, `nav`, `main`, `article`, `section`, `aside` y `footer` describen la función de cada región. Navegadores y tecnologías asistivas usan esa estructura para crear landmarks. `div` y `span` agrupan contenido sin añadir significado.':
    '`header`, `nav`, `main`, `article`, `section`, `aside` and `footer` describe the purpose of each region. Browsers and assistive technologies use that structure to expose landmarks. `div` and `span` group content without adding meaning.',
  '`a` navega y necesita `href`; `button` ejecuta una acción. `target=_blank` requiere una política de `rel` apropiada para reducir acceso a opener.':
    '`a` navigates and requires an `href`; `button` performs an action. `target=_blank` requires an appropriate `rel` policy to restrict opener access.',
  'Una tabla de datos se compone con `caption`, `thead`, `tbody`, celdas `th` y relaciones `scope`. Esa estructura permite asociar cada dato con sus encabezados. Las tablas usadas para layout comunican relaciones inexistentes y dificultan el responsive design.':
    'A data table uses `caption`, `thead`, `tbody`, `th` cells and `scope` relationships. This structure associates every data cell with its headers. Tables used for layout communicate relationships that do not exist and make responsive design harder.',
  'CSS resuelve una cascada antes de calcular layout y paint. Las preguntas clásicas empiezan con selectores; las Senior llegan a stacking contexts, containment y estabilidad visual.':
    'CSS resolves the cascade before computing layout and paint. Classic questions begin with selectors; Senior-level questions reach stacking contexts, containment and visual stability.',
  'Aceptaría `value == null` si el estándar del equipo permite comprobar `null` y `undefined` juntos. Para el resto prefiero `===` porque evita que quien lee tenga que reconstruir la tabla de coerción.':
    'I would accept `value == null` if the team standard allows checking `null` and `undefined` together. Otherwise I prefer `===`, because readers do not need to reconstruct the coercion table.',
  'Separá mecanismo de decisión. «OnPush reduce comprobaciones» describe un efecto. «Uso OnPush con estado inmutable porque los cambios llegan por inputs y signals» explica una decisión. La segunda respuesta permite evaluar si entendés cuándo la herramienta encaja.':
    'Separate mechanism from decision. “OnPush reduces checks” describes an effect. “I use OnPush with immutable state because changes arrive through inputs and signals” explains a decision. The second answer shows whether you understand when the tool fits.',
  'Nombrá las restricciones que cambian la solución: volumen de datos, frecuencia de actualización, SEO, latencia, accesibilidad, seguridad, soporte de navegadores y capacidad del equipo. Si la pregunta no las informa, declaralas como supuestos en vez de inventar un escenario silenciosamente.':
    'Name the constraints that change the solution: data volume, update frequency, SEO, latency, accessibility, security, browser support and team capacity. If the question omits them, state your assumptions instead of silently inventing a scenario.',
  'Explicá cómo validarías la decisión. Rendimiento se comprueba con métricas como LCP, INP, tamaño de bundle o tiempo de tarea; una migración se valida con tests, telemetría, despliegue gradual y rollback; una mejora de equipo se valida con lead time, defectos o carga operativa.':
    'Explain how you would validate the decision. Performance is checked with metrics such as LCP, INP, bundle size or task duration; a migration with tests, telemetry, gradual rollout and rollback; a team improvement with lead time, defects or operational load.',
  'Una respuesta débil enumera herramientas: «usaría Signals, OnPush y lazy loading». Una respuesta sólida conecta problema y evidencia: «el perfil mostró demasiadas vistas comprobadas; moví el estado local a Signals, mantuve referencias inmutables y medí menos scripting sin cambiar el comportamiento».':
    'A weak answer lists tools: “I would use Signals, OnPush and lazy loading.” A strong answer connects the problem to evidence: “Profiling showed too many checked views; I moved local state to Signals, kept immutable references and measured less scripting time without changing behavior.”',
  'Si no recordás una API exacta, no inventes. Explicá el modelo que sí conocés, aislá el detalle dudoso y decí cómo lo verificarías en la documentación o con una prueba mínima. El razonamiento correcto es más valioso que una firma memorizada incorrectamente.':
    'If you do not remember an exact API, do not invent it. Explain the model you do know, isolate the uncertain detail and say how you would verify it in the documentation or with a minimal test. Correct reasoning is more valuable than an incorrectly memorized signature.',
  "Una shallow copy crea un objeto o array nuevo, pero copia por referencia los valores anidados. Por ejemplo, con `const original = { user: { name: 'Ana' } }; const copy = { ...original };`, se cumple `copy !== original`, pero `copy.user === original.user`; por eso `copy.user.name = 'Luis'` también modifica `original.user.name`. Spread, `Object.assign`, `Array.from` y `slice` hacen copias superficiales. Una deep copy duplica recursivamente la estructura para que los objetos anidados no compartan identidad. `structuredClone(original)` sirve para muchos datos nativos y ciclos, pero no clona funciones, elementos DOM ni conserva el comportamiento de todas las instancias de clases. No hago una copia profunda por defecto: cuesta CPU y memoria, y puede romper identidades que la aplicación necesita. Para actualizar estado prefiero copiar sólo el camino modificado, por ejemplo `{ ...state, user: { ...state.user, name: 'Luis' } }`; así mantengo inmutabilidad y structural sharing sin duplicar todo el grafo.":
    "A shallow copy creates a new object or array, but nested values are copied by reference. For example, with `const original = { user: { name: 'Ana' } }; const copy = { ...original };`, `copy !== original`, but `copy.user === original.user`; therefore, `copy.user.name = 'Luis'` also changes `original.user.name`. Spread, `Object.assign`, `Array.from`, and `slice` make shallow copies. A deep copy recursively duplicates the structure so nested objects do not share identity. `structuredClone(original)` works for many native data types and cycles, but it does not clone functions or DOM elements, and it does not preserve the behavior of every class instance. I do not deep-clone by default: it costs CPU and memory and can break identities the application relies on. For state updates, I prefer copying only the changed path, such as `{ ...state, user: { ...state.user, name: 'Luis' } }`; this preserves immutability and structural sharing without duplicating the entire object graph.",
  'Al entrar en un bloque, JavaScript crea los bindings de `let`, `const` y `class`, pero los deja sin inicializar hasta ejecutar su declaración. Ese intervalo es la Temporal Dead Zone. Leer el binding durante ese tramo lanza `ReferenceError`: `console.log(total); let total = 1;`. Incluso `typeof total` falla si `total` está en la TDZ, a diferencia de una variable que no existe. Con `var`, en cambio, el binding se inicializa con `undefined`, por lo que el acceso prematuro no falla y puede ocultar un error de orden. La TDZ existe para que una variable con scope de bloque no se use antes de tener el valor que su declaración promete. No significa que `let` y `const` no tengan hoisting: sus bindings se crean al entrar al scope, pero todavía no son accesibles.':
    'When JavaScript enters a block, it creates the bindings for `let`, `const`, and `class`, but leaves them uninitialized until their declaration executes. That interval is the Temporal Dead Zone. Reading the binding during it throws a `ReferenceError`: `console.log(total); let total = 1;`. Even `typeof total` fails when `total` is in the TDZ, unlike a variable that does not exist. With `var`, the binding is initialized to `undefined`, so early access does not fail and can hide an ordering bug. The TDZ prevents a block-scoped variable from being used before it has the value promised by its declaration. It does not mean `let` and `const` are not hoisted: their bindings are created when entering the scope, but they are not accessible yet.',
  "Sí, pero sólo usaría deliberadamente `value == null` cuando quiero aceptar exactamente `null` o `undefined`. La comparación es verdadera para esos dos valores y falsa para `0`, `false`, `''` y `NaN`; por ejemplo, `if (response.middleName == null)` detecta que el campo opcional no llegó sin rechazar una cadena vacía válida. Es una excepción conocida de Abstract Equality y conviene permitirla explícitamente con una regla como `eqeqeq: ['error', 'always', { null: 'ignore' }]`. En el resto del código uso `===` y `!==`, porque `==` aplica coerciones difíciles de leer: `'' == 0`, `'0' == false` y `[] == false` son verdaderas. Si el equipo prioriza máxima explicitud, escribo `value === null || value === undefined`; comunica el mismo contrato sin depender de conocer la excepción.":
    "Yes, but I would deliberately use `value == null` only when I want to accept exactly `null` or `undefined`. The comparison is true for those two values and false for `0`, `false`, `''`, and `NaN`; for example, `if (response.middleName == null)` detects that an optional field is missing without rejecting a valid empty string. This is a well-known Abstract Equality exception and should be allowed explicitly with a rule such as `eqeqeq: ['error', 'always', { null: 'ignore' }]`. Everywhere else I use `===` and `!==`, because `==` applies coercions that are difficult to read: `'' == 0`, `'0' == false`, and `[] == false` are all true. If the team prioritizes maximum explicitness, I write `value === null || value === undefined`; it communicates the same contract without relying on knowledge of the exception.",
  'La coerción es la conversión de un valor de un tipo a otro. Es explícita cuando el código llama a `Number(value)`, `String(value)` o `Boolean(value)`, e implícita cuando el lenguaje convierte porque un operador o contexto necesita otro tipo. Formularios, query params, atributos DOM y storage entregan strings aunque representen números o booleanos; convertir y validar en esa frontera evita que la coerción se propague al dominio.':
    'Coercion is the conversion of a value from one type to another. It is explicit when code calls `Number(value)`, `String(value)`, or `Boolean(value)`, and implicit when the language converts because an operator or context requires another type. Forms, query parameters, DOM attributes, and storage return strings even when they represent numbers or booleans; converting and validating at that boundary prevents coercion from spreading into the domain.',
  "Cuando un operador necesita convertir un objeto a primitivo, JavaScript ejecuta la operación abstracta `ToPrimitive`. Primero respeta `Symbol.toPrimitive` y, según el hint, consulta `valueOf` y `toString` hasta obtener un primitivo. Por eso `[]` se convierte en `''`, `[1, 2]` en `'1,2'` y un objeto común suele producir `'[object Object]'`; después el operador continúa con la conversión numérica o textual que corresponda.":
    "When an operator needs to convert an object to a primitive, JavaScript runs the abstract `ToPrimitive` operation. It first honors `Symbol.toPrimitive` and, depending on the hint, checks `valueOf` and `toString` until it obtains a primitive. That is why `[]` becomes `''`, `[1, 2]` becomes `'1,2'`, and a plain object usually produces `'[object Object]'`; the operator then continues with the required numeric or string conversion.",
  "El operador `+` es especial: después de convertir objetos a primitivos, concatena si alguno de los operandos es string; si no, realiza suma numérica. `1 + '2'` produce `'12'`, mientras `'5' - 2`, `'5' * 2` y `'5' / 2` convierten a número. Los template literals fuerzan string y los contextos de `if`, `!`, `&&` y `||` usan conversión booleana.":
    "The `+` operator is special: after converting objects to primitives, it concatenates if either operand is a string; otherwise it performs numeric addition. `1 + '2'` produces `'12'`, while `'5' - 2`, `'5' * 2`, and `'5' / 2` convert to number. Template literals force string conversion, while `if`, `!`, `&&`, and `||` use boolean conversion.",
  "Las conversiones tienen bordes que conviene conocer: `Number('')` y `Number(null)` producen `0`, `Number(undefined)` produce `NaN`, y `Boolean('false')` es `true` porque cualquier string no vacío es truthy. `Number` exige que toda la cadena represente un número; `parseInt('10px', 10)` acepta el prefijo numérico. Ninguna de las dos reemplaza validar rango, formato y finitud con `Number.isFinite`.":
    "Conversions have important edge cases: `Number('')` and `Number(null)` produce `0`, `Number(undefined)` produces `NaN`, and `Boolean('false')` is `true` because every non-empty string is truthy. `Number` requires the entire string to represent a number; `parseInt('10px', 10)` accepts a numeric prefix. Neither replaces validating range, format, and finiteness with `Number.isFinite`.",
  'Un closure es la combinación de una función con el entorno léxico donde fue creada. La función puede ejecutarse después de que terminó la llamada exterior y seguir resolviendo parámetros y variables de ese entorno. `makeCounter` puede declarar `let count = 0` y devolver una función que incrementa `count`; cada llamada a `makeCounter()` crea un binding privado e independiente.':
    'A closure is the combination of a function and the lexical environment where it was created. The function can run after the outer call has finished and still resolve parameters and variables from that environment. `makeCounter` can declare `let count = 0` and return a function that increments `count`; every call to `makeCounter()` creates a private, independent binding.',
  'El closure conserva bindings, no una fotografía de sus valores. Si el binding cambia, las funciones que lo cerraron observan el valor actual. Esto permite estado privado y callbacks coordinados, pero también explica bugs cuando varias funciones comparten accidentalmente una misma variable mutable.':
    'A closure preserves bindings, not a snapshot of their values. If a binding changes, the functions that close over it observe the current value. This enables private state and coordinated callbacks, but also explains bugs when several functions accidentally share the same mutable variable.',
  'En un loop, `var` crea un único binding con scope de función, por lo que callbacks diferidos suelen leer el valor final. `let` crea un binding nuevo por iteración. Antes de `let`, una IIFE o una factory recibía el valor de cada vuelta y creaba un entorno distinto.':
    'In a loop, `var` creates one function-scoped binding, so deferred callbacks usually read the final value. `let` creates a new binding for each iteration. Before `let`, an IIFE or factory received each iteration value and created a separate environment.',
  'Closures sostienen factories, currying, memoization, event handlers y callbacks asíncronos. El entorno permanece vivo mientras una función alcanzable lo necesite: no es una fuga por sí mismo, pero puede retener DOM, caches o respuestas grandes. El cleanup debe remover listeners, cancelar timers o suscripciones y evitar capturar objetos completos cuando alcanza con un identificador o un dato pequeño.':
    'Closures support factories, currying, memoization, event handlers, and asynchronous callbacks. The environment remains alive while a reachable function needs it: that is not a leak by itself, but it can retain DOM nodes, caches, or large responses. Cleanup should remove listeners, cancel timers or subscriptions, and avoid capturing entire objects when an identifier or small value is enough.',
  '¿Qué es un closure y cuándo se crea?':
    'What is a closure, and when is it created?',
  'Un closure es una función junto con las referencias a los bindings de su entorno léxico. Se determina cuando la función se crea, no cuando se invoca. Por ejemplo, `function makeCounter() { let count = 0; return () => ++count; }` devuelve una función que sigue accediendo a `count` después de que `makeCounter` terminó. `const a = makeCounter(); const b = makeCounter();` crea dos entornos: `a()` devuelve `1`, luego `2`, mientras `b()` comienza en `1`. El runtime conserva sólo los entornos que todavía son alcanzables; por eso un closure permite estado privado sin convertir `count` en una variable global.':
    'A closure is a function together with references to the bindings in its lexical environment. It is determined when the function is created, not when it is invoked. For example, `function makeCounter() { let count = 0; return () => ++count; }` returns a function that keeps accessing `count` after `makeCounter` finishes. `const a = makeCounter(); const b = makeCounter();` creates two environments: `a()` returns `1`, then `2`, while `b()` starts at `1`. The runtime preserves only environments that remain reachable, so a closure provides private state without turning `count` into a global variable.',
  '¿Un closure captura el valor o el binding?':
    'Does a closure capture the value or the binding?',
  'Captura el binding, es decir, la celda donde vive el valor, no una fotografía inmutable. Con `let rate = 1; const price = value => value * rate; rate = 2;`, `price(10)` devuelve `20` porque lee el valor actual de `rate`. Varias funciones pueden compartir el mismo binding y observar sus cambios. Si necesito congelar el valor de un momento, creo otro binding pasando el dato a una factory: `const withRate = rate => value => value * rate`. Cada llamada recibe su propio parámetro `rate`.':
    'It captures the binding—the cell where the value lives—not an immutable snapshot. With `let rate = 1; const price = value => value * rate; rate = 2;`, `price(10)` returns `20` because it reads the current value of `rate`. Several functions can share the same binding and observe its changes. If I need to freeze a value at a point in time, I create another binding by passing the value to a factory: `const withRate = rate => value => value * rate`. Each call receives its own `rate` parameter.',
  '¿Por qué un loop con `var` y callbacks suele imprimir el valor final?':
    'Why does a loop with `var` and callbacks usually print the final value?',
  '¿Cómo puede un closure retener memoria innecesariamente?':
    'How can a closure retain unnecessary memory?',
  '¿Qué diferencia hay entre coerción implícita y conversión explícita?':
    'What is the difference between implicit coercion and explicit conversion?',
  '¿Qué es `ToPrimitive` y por qué importa?':
    'What is `ToPrimitive`, and why does it matter?',
  '¿Coerción?': 'Coercion?',
  'Conversión entre tipos. Puede ser explícita con `Number`, `String` o `Boolean`, o implícita cuando un operador o contexto necesita otro tipo.':
    'Conversion between types. It can be explicit with `Number`, `String`, or `Boolean`, or implicit when an operator or context requires another type.',
  'Una función conserva los bindings del entorno léxico donde fue creada, incluso si se ejecuta después de que terminó la función exterior. Conserva bindings vivos, no una copia congelada de sus valores.':
    'A function preserves the bindings from the lexical environment where it was created, even when it runs after the outer function has finished. It preserves live bindings, not a frozen copy of their values.',
  'Función junto con su entorno léxico: puede seguir leyendo o modificando los bindings capturados cuando se ejecuta fuera de la llamada que los creó.':
    'A function together with its lexical environment: it can keep reading or modifying captured bindings when it runs outside the call that created them.',
  "La igualdad abstracta no compara directamente array y boolean. Primero convierte `false` a número: `0`. Después aplica `ToPrimitive` al array: `[].toString()` produce `''`. Como ahora compara string con number, convierte `''` a `0`; el resultado final es `0 == 0`, que es `true`. En cambio, `[] === false` es `false` porque los tipos son distintos y no existe coerción. No memorizaría solamente este resultado: seguir los pasos boolean → number, object → primitive y string → number permite explicar también casos como `[0] == false`. En código de producto uso `===` y conversiones explícitas para que esa secuencia no quede escondida.":
    "Abstract equality does not compare the array and boolean directly. It first converts `false` to the number `0`. It then applies `ToPrimitive` to the array: `[].toString()` produces `''`. Because it is now comparing a string with a number, it converts `''` to `0`; the final result is `0 == 0`, which is `true`. In contrast, `[] === false` is `false` because the types differ and no coercion occurs. I would not memorize only this result: following boolean → number, object → primitive, and string → number also explains cases such as `[0] == false`. In production code I use `===` and explicit conversions so this sequence is not hidden.",
  '`var` tiene scope de función, así que todas las callbacks cierran sobre un único binding `i`. Cuando ejecuta el timer, el loop ya terminó y ese binding vale `3`: `for (var i = 0; i < 3; i++) setTimeout(() => console.log(i));` imprime `3, 3, 3`. Con `let`, la especificación crea un binding nuevo en cada iteración y el resultado es `0, 1, 2`. Otra solución es una factory o IIFE que reciba `i` y genere un parámetro distinto por vuelta. El punto importante no es el timer: es cuántos bindings existen y cuál captura cada función.':
    '`var` has function scope, so every callback closes over one shared `i` binding. When the timer runs, the loop has finished and that binding is `3`: `for (var i = 0; i < 3; i++) setTimeout(() => console.log(i));` prints `3, 3, 3`. With `let`, the specification creates a new binding for every iteration, producing `0, 1, 2`. Another solution is a factory or IIFE that receives `i` and creates a distinct parameter for each iteration. The important point is not the timer: it is how many bindings exist and which one each function captures.',
  'Mientras una función sea alcanzable, también permanecen alcanzables los valores de su entorno que necesita. Un listener global que captura el componente, un timer que captura una respuesta grande o una cache sin límite pueden mantener vivo ese grafo después de retirar la vista. No todo closure es un leak: se vuelve problema cuando la vida de la referencia supera la vida útil del dato. Remuevo listeners, limpio timers y suscripciones, limito caches y capturo sólo el identificador o valor pequeño necesario. En Angular asocio el cleanup a `DestroyRef` o `takeUntilDestroyed` cuando corresponde.':
    'While a function is reachable, the values it needs from its environment also remain reachable. A global listener that captures a component, a timer that captures a large response, or an unbounded cache can keep that graph alive after the view is removed. Not every closure is a leak: it becomes a problem when the reference outlives the useful lifetime of the data. I remove listeners, clear timers and subscriptions, limit caches, and capture only the necessary identifier or small value. In Angular I connect cleanup to `DestroyRef` or `takeUntilDestroyed` when appropriate.',
  "En una conversión explícita el código declara la intención: `Number(input.value)`, `String(id)` o `Boolean(flag)`. La coerción implícita ocurre dentro de un operador o contexto: `'5' - 1` produce `4`, `1 + '2'` produce `'12'` y `if ('false')` entra porque el string no está vacío. La coerción no es automáticamente un error; templates, comparaciones y operadores dependen de ella. El riesgo aparece cuando oculta un contrato. En fronteras externas convierto, valido y conservo desde allí un tipo estable.":
    "With explicit conversion, the code states its intention: `Number(input.value)`, `String(id)`, or `Boolean(flag)`. Implicit coercion occurs inside an operator or context: `'5' - 1` produces `4`, `1 + '2'` produces `'12'`, and `if ('false')` enters because the string is not empty. Coercion is not automatically an error; templates, comparisons, and operators depend on it. The risk appears when it hides a contract. At external boundaries I convert, validate, and keep a stable type from that point onward.",
  "`ToPrimitive` es la operación abstracta que convierte un objeto en un valor primitivo antes de que otro algoritmo continúe. Si existe, llama a `Symbol.toPrimitive`; en caso contrario prueba `valueOf` y `toString` en un orden que depende del hint. Deben devolver un primitivo o la conversión falla con `TypeError`. Por eso `[] + 1` produce `'1'`: el array se vuelve `''` y `+` concatena. Un objeto puede personalizar el resultado con `[Symbol.toPrimitive](hint)`, pero hacerlo de forma sorprendente vuelve los operadores difíciles de razonar; normalmente prefiero métodos explícitos de dominio.":
    "`ToPrimitive` is the abstract operation that converts an object into a primitive value before another algorithm continues. If present, it calls `Symbol.toPrimitive`; otherwise it tries `valueOf` and `toString` in an order determined by the hint. They must return a primitive or conversion fails with a `TypeError`. That is why `[] + 1` produces `'1'`: the array becomes `''` and `+` concatenates. An object can customize the result with `[Symbol.toPrimitive](hint)`, but surprising behavior makes operators difficult to reason about; I normally prefer explicit domain methods.",
  'Ejemplos prácticos': 'Practical examples',
  'Ver código': 'View code',
  'OnPush: nueva referencia frente a mutación':
    'OnPush: new reference versus mutation',
  'El hijo vuelve a comprobarse cuando recibe una referencia nueva. Mutar el mismo objeto conserva la identidad y puede dejar la vista desactualizada.':
    'The child is checked again when it receives a new reference. Mutating the same object preserves its identity and can leave the view stale.',
  'Estado writable y derivación con computed':
    'Writable state and derivation with computed',
  'La consulta y los productos son fuentes de verdad. La lista visible se calcula sólo cuando alguna dependencia leída cambia.':
    'The query and products are sources of truth. The visible list is calculated only when a dependency it reads changes.',
  'computed para derivar; effect para una frontera externa':
    'computed for derivation; effect for an external boundary',
  'El total no se copia en otro signal. El efecto se reserva para sincronizar el valor final con una API no reactiva como localStorage.':
    'The total is not copied into another signal. The effect is reserved for synchronizing the final value with a non-reactive API such as localStorage.',
  'Dependencias dinámicas en computed': 'Dynamic dependencies in computed',
  'Cuando showDetails es false, el computed no lee details. Los cambios de details dejan de invalidar esa derivación hasta que la rama vuelva a leerlos.':
    'When showDetails is false, the computed does not read details. Changes to details stop invalidating that derivation until the branch reads it again.',
  'Object.is: mutación profunda frente a update inmutable':
    'Object.is: deep mutation versus immutable update',
  'El primer método reutiliza exactamente el mismo objeto y no publica un cambio. El segundo crea una referencia nueva que el signal puede notificar.':
    'The first method reuses the exact same object and does not publish a change. The second creates a new reference that the signal can notify.',
  'untracked para una lectura incidental': 'untracked for an incidental read',
  'El efecto depende del usuario actual. El contador sólo aporta contexto al log y no debe volver a ejecutar el efecto por sí solo.':
    'The effect depends on the current user. The counter only adds context to the log and should not rerun the effect by itself.',
  'Zoneless: actualizar mediante una API que notifica':
    'Zoneless: update through a notifying API',
  'Aunque la callback venga de una librería externa, escribir el valor en un signal leído por la plantilla agenda la actualización de la vista.':
    'Even when the callback comes from an external library, writing the value to a signal read by the template schedules a view update.',
  'RxJS para concurrencia; signal para la vista':
    'RxJS for concurrency; signal for the view',
  'RxJS resuelve debounce y cancelación de requests. toSignal entrega a la plantilla un estado síncrono con valor inicial.':
    'RxJS handles debouncing and request cancellation. toSignal gives the template synchronous state with an initial value.',
  'Event loop: task, microtasks y render':
    'Event loop: task, microtasks and rendering',
  'El stack síncrono termina primero; después se vacían todas las microtasks y recién entonces puede ejecutarse otra task. El orden esperado es A, D, C, B.':
    'The synchronous stack finishes first; then every microtask is drained before another task can run. The expected order is A, D, C, B.',
  'await secuencial frente a Promise.all':
    'Sequential await versus Promise.all',
  'Si ambas operaciones son independientes, iniciarlas juntas evita sumar sus latencias. La versión secuencial sigue siendo correcta cuando la segunda necesita el resultado de la primera.':
    'When both operations are independent, starting them together avoids adding their latencies. The sequential version remains correct when the second operation needs the first result.',
  'Observable con teardown real': 'Observable with real teardown',
  'Desuscribirse sólo detiene el trabajo cuando el producer registra cómo limpiarlo. Aquí cada suscripción crea y destruye su propio intervalo.':
    'Unsubscribing only stops the work when the producer registers how to clean it up. Here each subscription creates and destroys its own interval.',
  'Evitar una respuesta obsoleta con AbortController':
    'Preventing a stale response with AbortController',
  'Cada búsqueda cancela la request anterior. También se verifica la respuesta porque cancelar es una petición cooperativa y el trabajo remoto podría haber avanzado.':
    'Each search cancels the previous request. The response is also checked because cancellation is cooperative and remote work may already have progressed.',
  'unknown obliga a validar; any propaga el riesgo':
    'unknown requires validation; any spreads the risk',
  'Los datos externos siguen siendo unknown hasta demostrar su forma en runtime. Una anotación TypeScript no transforma ni valida la respuesta recibida.':
    'External data remains unknown until its shape is proven at runtime. A TypeScript annotation neither transforms nor validates the received response.',
  'Discriminated union sin estados imposibles':
    'Discriminated union without impossible states',
  'El discriminante status habilita únicamente los campos válidos para cada estado y evita combinar loading, data y error como booleanos independientes.':
    'The status discriminant exposes only the fields valid for each state and avoids combining loading, data and error as independent booleans.',
  'Generic que conserva la relación entre key y valor':
    'Generic that preserves the relationship between key and value',
  'El parámetro K relaciona la clave elegida con el tipo exacto de esa propiedad. Con string y unknown esa relación se perdería.':
    'The K parameter relates the selected key to the exact type of that property. Using string and unknown would lose that relationship.',
  'satisfies valida sin ensanchar los literales':
    'satisfies validates without widening literals',
  'satisfies comprueba el contrato completo y conserva las claves y valores concretos inferidos, algo útil para configuración tipada.':
    'satisfies checks the full contract while preserving the inferred concrete keys and values, which is useful for typed configuration.',
  'El lugar del provider define la instancia':
    'Provider placement defines the instance',
  'Un provider root comparte estado en toda la aplicación. Declararlo en el componente crea una instancia aislada para cada subárbol.':
    'A root provider shares state across the application. Declaring it in a component creates an isolated instance for each subtree.',
  'useExisting reutiliza; useClass crea otra instancia':
    'useExisting reuses; useClass creates another instance',
  'useExisting crea un alias al mismo objeto. Reemplazarlo por useClass construiría una segunda instancia y separaría accidentalmente el estado.':
    'useExisting creates an alias to the same object. Replacing it with useClass would construct a second instance and accidentally split the state.',
  'skipSelf para extender un contrato del ancestro':
    'skipSelf to extend an ancestor contract',
  'El componente obtiene la configuración superior y publica una versión especializada para sus descendientes sin intentar inyectarse a sí mismo.':
    'The component obtains the parent configuration and publishes a specialized version to its descendants without trying to inject itself.',
  'catchError interno conserva vivo el buscador':
    'An inner catchError keeps the search stream alive',
  'El error se recupera dentro de switchMap, por lo que una request fallida no termina valueChanges y la siguiente consulta todavía funciona.':
    'The error is recovered inside switchMap, so a failed request does not terminate valueChanges and the next query still works.',
  'Cuatro flattening operators, cuatro políticas':
    'Four flattening operators, four policies',
  'La elección depende de qué hacer con trabajos solapados: reemplazar, ordenar, ejecutar juntos o ignorar nuevos intentos.':
    'The choice depends on what overlapping work should do: replace, queue, run concurrently or ignore new attempts.',
  'takeUntilDestroyed vincula el flujo al componente':
    'takeUntilDestroyed ties the stream to the component',
  'La suscripción se completa al destruir el contexto de inyección. Los efectos externos siguen concentrados en tap y el pipeline conserva su teardown.':
    'The subscription completes when the injection context is destroyed. External effects remain concentrated in tap and the pipeline preserves its teardown.',
  'shareReplay no reemplaza una política de caché':
    'shareReplay does not replace a caching policy',
  'El observable comparte una request entre consumidores activos, pero la invalidación continúa siendo explícita mediante refresh.':
    'The observable shares one request among active consumers, but invalidation remains explicit through refresh.',
  'Input derivado con computed en lugar de sincronización manual':
    'Input derived with computed instead of manual synchronization',
  'Cuando el resultado depende únicamente de un signal input, computed conserva una sola fuente de verdad. ngOnChanges queda para comparar transiciones o coordinar trabajo imperativo.':
    'When the result depends only on a signal input, computed keeps a single source of truth. ngOnChanges remains useful for comparing transitions or coordinating imperative work.',
  'afterNextRender separa escritura y lectura del layout':
    'afterNextRender separates layout writes and reads',
  'Primero se modifica el DOM y después se mide. Separar las fases evita intercalar escrituras con lecturas geométricas que fuerzan layout repetidamente.':
    'The DOM is modified first and measured afterward. Separating phases avoids interleaving writes with geometric reads that repeatedly force layout.',
  'DestroyRef mantiene el cleanup junto al recurso':
    'DestroyRef keeps cleanup next to the resource',
  'El observer nace y se destruye en el mismo bloque conceptual. Esto evita dejar listeners vivos cuando el componente desaparece.':
    'The observer is created and destroyed in the same conceptual block. This prevents listeners from remaining alive after the component disappears.',
  'Estado efímero cerca del componente':
    'Ephemeral state close to the component',
  'La apertura del panel sólo le importa a esta vista. Llevarla a un store global añadiría acciones, selectors y coordinación sin aportar un consumidor real.':
    'Only this view cares whether the panel is open. Moving it to a global store would add actions, selectors and coordination without adding a real consumer.',
  'Servicio de feature con escritura encapsulada':
    'Feature service with encapsulated writes',
  'Las vistas leen signals readonly y sólo el servicio modifica la fuente. El total sigue siendo una derivación, no una copia sincronizada.':
    'Views read readonly signals and only the service modifies the source. The total remains a derivation rather than a synchronized copy.',
  'Cuándo el mismo flujo justifica NgRx': 'When the same flow justifies NgRx',
  'Cuando varias pantallas reaccionan al mismo hecho, una action de dominio permite coordinar reducer y effects de forma observable. Para un único componente sería complejidad innecesaria.':
    'When several screens react to the same event, a domain action coordinates reducers and effects observably. It would be unnecessary complexity for a single component.',
  'Formulario tipado con contrato explícito':
    'Typed form with an explicit contract',
  'NonNullableFormBuilder evita que controles requeridos produzcan null. El tipo de los controles queda separado del DTO que finalmente se envía.':
    'NonNullableFormBuilder prevents required controls from producing null. The control type remains separate from the DTO eventually sent.',
  'Validator cruzado colocado en el grupo':
    'Cross-field validator placed on the group',
  'La regla compara dos controles, por eso pertenece al FormGroup. El error describe la relación sin marcar individualmente como inválido un valor correcto.':
    'The rule compares two controls, so it belongs on the FormGroup. The error describes the relationship without marking an individually correct value as invalid.',
  'FormArray tipado para filas dinámicas': 'Typed FormArray for dynamic rows',
  'Cada fila conserva su estructura de controles y una identidad de dominio. El índice sirve para acceder al control, no como identidad persistente del dato.':
    'Each row preserves its control structure and domain identity. The index accesses the control but is not the persistent identity of the data.',
  'Interceptor funcional que no filtra credenciales':
    'Functional interceptor that does not leak credentials',
  'El token se agrega sólo a la API propia. Clonar toda request sin comprobar destino podría enviar autorización a URLs de terceros.':
    'The token is added only to the first-party API. Cloning every request without checking its destination could send authorization to third-party URLs.',
  'switchMap cancela la búsqueda HTTP anterior':
    'switchMap cancels the previous HTTP search',
  'Cada consulta nueva desuscribe la request anterior de HttpClient. catchError está dentro para que un fallo puntual no termine el buscador completo.':
    'Each new query unsubscribes from the previous HttpClient request. catchError stays inside so one failure does not terminate the entire search stream.',
  'Caché con invalidación explícita después de escribir':
    'Cache with explicit invalidation after a write',
  'La lectura se comparte, pero guardar invalida deliberadamente el valor anterior. La caché tiene un evento de renovación en lugar de depender de una duración accidental.':
    'The read is shared, but saving deliberately invalidates the previous value. The cache has a refresh event instead of relying on an accidental lifetime.',
  'Cold observables crean el productor por subscription: dos suscriptores pueden ejecutar dos requests o dos timers independientes. Hot observables comparten un productor externo, como eventos del DOM o un WebSocket. `share` comparte la suscripción mientras corresponde y `shareReplay` además conserva emisiones para consumidores tardíos; ninguno define por sí solo invalidación, expiración ni aislamiento de caché.':
    'Cold observables create the producer per subscription: two subscribers can execute two independent requests or timers. Hot observables share an external producer, such as DOM events or a WebSocket. `share` shares the subscription while appropriate, and `shareReplay` also retains emissions for late consumers; neither defines cache invalidation, expiration or isolation by itself.',
  'Los operadores simples trabajan sobre cada emisión sin crear una suscripción interna. `map` transforma `T` en `R`; `filter` decide si una emisión continúa; `tap` observa para logging o efectos sin modificar el valor; `scan` acumula estado a lo largo del tiempo. Si una proyección devuelve un Observable, `map` produce un Observable de Observables: hace falta una política de flattening.':
    'Simple operators work on each emission without creating an inner subscription. `map` transforms `T` into `R`; `filter` decides whether an emission continues; `tap` observes for logging or effects without modifying the value; `scan` accumulates state over time. If a projection returns an Observable, `map` produces an Observable of Observables: a flattening policy is required.',
  'Los flattening operators combinan dos decisiones: transformar cada emisión exterior en un inner Observable y decidir qué hacer cuando llega otra emisión antes de que el inner anterior termine. La pregunta de entrevista no es cuál operador es mejor, sino qué política de concurrencia coincide con el caso de negocio.':
    'Flattening operators combine two decisions: transform each outer emission into an inner Observable and decide what to do when another emission arrives before the previous inner completes. The interview question is not which operator is best, but which concurrency policy matches the business case.',
  '`switchMap` aplica latest wins: se desuscribe del inner anterior y conserva sólo el más reciente. Es ideal para búsquedas, cambios de ruta o filtros donde una respuesta vieja ya no interesa. Con `HttpClient`, el unsubscribe aborta la request del navegador, pero no garantiza que el servidor revierta trabajo que ya comenzó. No lo uses para escrituras que deben completarse todas.':
    '`switchMap` applies latest wins: it unsubscribes from the previous inner and keeps only the latest one. It is ideal for searches, route changes or filters where an old response no longer matters. With `HttpClient`, unsubscribe aborts the browser request, but it does not guarantee the server will undo work already started. Do not use it for writes that must all complete.',
  '`concatMap` aplica queue and preserve order: espera que el inner actual complete antes de iniciar el siguiente. Sirve para autosaves o comandos cuyo orden importa. La contrapartida es backlog: si la fuente produce más rápido de lo que cada inner completa, la cola y la latencia crecen.':
    '`concatMap` applies queue and preserve order: it waits for the current inner to complete before starting the next one. It works for autosaves or commands where order matters. The tradeoff is backlog: if the source emits faster than each inner completes, the queue and latency grow.',
  '`mergeMap` aplica run concurrently: mantiene varios inners activos y entrega cada resultado cuando llega, sin preservar el orden de entrada. Encaja en uploads o lecturas independientes. Su parámetro de concurrencia permite limitar presión sobre red y backend; sin límite, una fuente rápida puede abrir demasiado trabajo.':
    '`mergeMap` applies run concurrently: it keeps several inners active and delivers each result as it arrives without preserving input order. It fits uploads or independent reads. Its concurrency parameter limits pressure on the network and backend; without a limit, a fast source can open too much work.',
  '`exhaustMap` aplica first wins while busy: acepta la primera emisión, ignora las siguientes mientras el inner está activo y vuelve a escuchar cuando completa. Sirve para evitar doble submit o login repetido. No encola los intentos ignorados y no conviene cuando la última intención del usuario debe reemplazar a la primera.':
    '`exhaustMap` applies first wins while busy: it accepts the first emission, ignores subsequent ones while the inner is active, and listens again after completion. It prevents duplicate submits or repeated logins. It does not queue ignored attempts and is unsuitable when the latest user intent should replace the first.',
  'map transforma valores; switchMap aplana Observables':
    'map transforms values; switchMap flattens Observables',
  'map sirve cuando la proyección devuelve un valor común. Si devuelve un Observable, switchMap gestiona la suscripción interna y evita el subscribe anidado.':
    'map works when the projection returns a regular value. If it returns an Observable, switchMap manages the inner subscription and avoids nested subscribe calls.',
  'La misma secuencia produce comportamientos distintos':
    'The same sequence produces different behaviors',
  'Si A tarda más que B y C, switchMap conserva C; concatMap entrega A, B y C en orden; mergeMap entrega según finalización; exhaustMap conserva A e ignora B y C mientras A siga activo.':
    'If A takes longer than B and C, switchMap keeps C; concatMap delivers A, B and C in order; mergeMap delivers by completion time; exhaustMap keeps A and ignores B and C while A remains active.',
  'Reiniciar progreso': 'Reset progress',
  'Borra los temas completados y los niveles de repaso guardados en este navegador.':
    'Deletes completed topics and review levels saved in this browser.',
  Cancelar: 'Cancel',
  'Confirmar reinicio': 'Confirm reset',
  'Progreso reiniciado': 'Progress reset',
};
