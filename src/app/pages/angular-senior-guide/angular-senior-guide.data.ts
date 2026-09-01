// Generated from tools/build_angular_senior_guide.py. Do not edit by hand.

export interface StudyGroup {
  readonly id: string;
  readonly index: string;
  readonly title: string;
  readonly description: string;
}

export interface StudyQuestion {
  readonly id?: string;
  readonly question: string;
  readonly answer: string;
}

export interface StudyTopic {
  readonly id: string;
  readonly number: string;
  readonly groupId: string;
  readonly title: string;
  readonly intro: string;
  readonly theory: readonly string[];
  readonly questions: readonly StudyQuestion[];
  readonly code?: string;
}

export interface PracticeCase {
  readonly title: string;
  readonly brief: string;
}

export interface StudyReference {
  readonly label: string;
  readonly url: string;
}

export const STUDY_GROUPS: readonly StudyGroup[] = [
  {
    id: 'fundamentos-web',
    index: '01',
    title: 'Fundamentos web',
    description:
      'HTML, CSS, JavaScript y TypeScript, desde la base hasta preguntas avanzadas.',
  },
  {
    id: 'angular-core',
    index: '02',
    title: 'Angular moderno',
    description: 'Componentes, reactividad, DI, RxJS, routing, forms y HTTP.',
  },
  {
    id: 'arquitectura',
    index: '03',
    title: 'Plataforma y arquitectura',
    description:
      'Browser, DOM, red, límites, patrones, SOLID y evolución del código.',
  },
  {
    id: 'calidad-operacion',
    index: '04',
    title: 'Calidad y operación',
    description:
      'Performance, rendering, testing, seguridad, CI/CD y observabilidad.',
  },
  {
    id: 'criterio-senior',
    index: '05',
    title: 'Criterio Senior',
    description: 'System design, liderazgo y conversaciones de entrevista.',
  },
];

export const STUDY_TOPICS: readonly StudyTopic[] = [
  {
    id: 'html-completo-semantica-formularios-medios-y-seo',
    number: '01',
    groupId: 'fundamentos-web',
    title: 'HTML completo: semántica, formularios, medios y SEO',
    intro:
      'HTML define significado, navegación por teclado, formularios y la base que consumen buscadores y tecnologías asistivas.',
    theory: [
      '`head` contiene metadata, title, links, preload y scripts. `body` contiene el documento visible. Un title y description claros mejoran navegación y presentación en resultados.',
      '`header`, `nav`, `main`, `article`, `section`, `aside` y `footer` describen la función de cada región. Navegadores y tecnologías asistivas usan esa estructura para crear landmarks. `div` y `span` agrupan contenido sin añadir significado.',
      'Block e inline describen comportamiento de formatting context, que CSS puede cambiar. La semántica del elemento no cambia al modificar `display`.',
      '`a` navega y necesita `href`; `button` ejecuta una acción. `target=_blank` requiere una política de `rel` apropiada para reducir acceso a opener.',
      'Imágenes necesitan `alt` según función. `picture`, `srcset` y `sizes` permiten formatos y resoluciones. Width y height reservan espacio y reducen CLS.',
      'Video y audio admiten múltiples `source`, `track` para subtítulos y controles. Un iframe crea otro contexto; restringilo con `sandbox`, permisos y origen confiable.',
      'Form asocia `label` con control, usa `name` para submission y aprovecha tipos nativos. GET codifica en URL; POST envía body. El servidor valida todos los campos.',
      'Un `button` dentro de un formulario tiene tipo `submit` por defecto. `type=button` representa una acción auxiliar y evita envíos accidentales. La semántica de submit también permite enviar con Enter y ejecutar la validación nativa.',
      'Una tabla de datos se compone con `caption`, `thead`, `tbody`, celdas `th` y relaciones `scope`. Esa estructura permite asociar cada dato con sus encabezados. Las tablas usadas para layout comunican relaciones inexistentes y dificultan el responsive design.',
      '`br` introduce un salto dentro del mismo contenido, como una dirección o un poema. `hr` marca un cambio temático entre bloques. El espacio visual entre elementos pertenece a margin, padding o gap en CSS.',
      'Scripts con `defer` descargan en paralelo y ejecutan tras parsear, en orden. `async` ejecuta cuando descarga y no conserva orden. Modules difieren y usan defer por defecto.',
      'SEO técnico incluye HTML rastreable, canonical, robots, structured data, status correctos, sitemap y rendering compatible con el contenido.',
    ],
    questions: [
      {
        question: '¿Etiqueta y atributo?',
        answer:
          'La etiqueta define el elemento; el atributo configura información o comportamiento en su start tag. Una property DOM representa el estado vivo y puede diferir del atributo inicial.',
      },
      {
        question: '¿`id` o `class`?',
        answer:
          '`id` identifica un elemento dentro del documento y sirve para relaciones, fragmentos y labels. `class` agrupa elementos para estilos o comportamiento.',
      },
      {
        question: '¿Cómo crear un formulario accesible?',
        answer:
          'Asocio labels, agrupo opciones con fieldset/legend, uso tipos y autocomplete, explico errores y muevo foco cuando el flujo lo requiere.',
      },
      {
        question: '¿`ol` o `ul`?',
        answer:
          '`ol` comunica que el orden modifica el significado; `ul` agrupa elementos sin secuencia semántica.',
      },
      {
        question: '¿Cuándo usás un enlace y cuándo un botón?',
        answer:
          'Un enlace con `href` cambia ubicación y conserva acciones nativas como abrir en otra pestaña. Un botón ejecuta una acción en la interfaz. Elegir el elemento correcto aporta teclado, rol y expectativas sin recrearlos con JavaScript.',
      },
      {
        question: '¿Qué aporta la validación nativa de formularios?',
        answer:
          'Atributos como `required`, `type`, `min`, `max` y `pattern` expresan restricciones y permiten feedback del navegador. La aplicación puede personalizar mensajes, pero el servidor debe repetir la validación porque el cliente se puede modificar.',
      },
    ],
    code: '<form (ngSubmit)="save()" [formGroup]="profileForm">\n  <label for="email">Correo</label>\n  <input id="email" type="email" autocomplete="email"\n         formControlName="email" aria-describedby="email-error">\n  <p id="email-error" role="alert">Ingresá un correo válido.</p>\n  <button type="submit">Guardar</button>\n</form>',
  },
  {
    id: 'css-completo-cascade-layout-responsive-y-rendimiento',
    number: '02',
    groupId: 'fundamentos-web',
    title: 'CSS completo: cascade, layout, responsive y rendimiento',
    intro:
      'CSS resuelve una cascada antes de calcular layout y paint. Las preguntas clásicas empiezan con selectores; las Senior llegan a stacking contexts, containment y estabilidad visual.',
    theory: [
      'La cascada considera origen, importancia, layers, specificity, scope y orden. `!important` altera el orden dentro del origen y crea costo de mantenimiento.',
      'Specificity cuenta IDs, clases/atributos/pseudo-clases y tipos/pseudo-elementos. `:where()` aporta especificidad cero; `:is()` y `:not()` toman la del argumento más específico.',
      'Box model suma content, padding, border y margin. `box-sizing: border-box` incluye padding y border dentro del tamaño declarado.',
      'Margin separa cajas; padding amplía el interior y el área de fondo. Márgenes verticales pueden colapsar en block formatting context.',
      '`display: none` quita la caja y el árbol de accesibilidad; `visibility: hidden` conserva espacio y oculta; `opacity: 0` conserva layout y puede conservar interacción si no la controlás.',
      'Position static sigue flujo; relative conserva espacio y crea referencia; absolute sale del flujo y usa containing block; fixed se relaciona con viewport salvo transform ancestors; sticky cambia según scroll container.',
      'Flexbox organiza una dimensión y distribuye espacio; Grid controla filas y columnas. `min-width: 0` suele resolver overflow de hijos flex.',
      'Responsive design combina tamaños fluidos, media queries, container queries, imágenes adaptativas y límites de ancho. Los breakpoints basados en el punto donde el contenido deja de funcionar resisten mejor cambios de dispositivos y layout.',
      'Overflow puede clippear, scrollear o crear formatting context. `text-overflow: ellipsis` necesita restricciones de overflow y white-space.',
      '`z-index` solo compara dentro del mismo stacking context. Transform, opacity, positioned elements y isolation pueden crear contextos nuevos.',
      'Una transition interpola el cambio entre dos estados; una animation recorre keyframes aunque no cambie una propiedad por interacción. `transform` y `opacity` suelen ejecutarse en composición y evitan layout, mientras `prefers-reduced-motion` permite reducir movimiento no esencial.',
      'BEM nombra Block, Element y Modifier; CSS Modules, Shadow DOM y Angular encapsulation resuelven scopes con modelos distintos.',
      'Preprocesadores agregan sintaxis en build; frameworks entregan utilidades o componentes. Ninguno reemplaza cascade, layout ni accesibilidad.',
      '`contain` limita qué partes del árbol pueden afectar layout, paint o style fuera de un elemento. `content-visibility: auto` permite omitir el render de contenido fuera del viewport. Ambas herramientas reducen trabajo, pero cambian mediciones, foco y accesibilidad si se aplican sin comprobar el resultado.',
    ],
    questions: [
      {
        question: '¿Flexbox o Grid?',
        answer:
          'Flexbox distribuye elementos a lo largo de un eje y permite wrapping. Grid define una estructura bidimensional. Una interfaz puede usar ambos en niveles distintos.',
      },
      {
        question: '¿Por qué `z-index: 9999` no funciona?',
        answer:
          'El elemento puede vivir dentro de un stacking context que queda debajo de otro. Comparo contextos ancestros antes de subir el número.',
      },
      {
        question: '¿`display:none` o `visibility:hidden`?',
        answer:
          '`display:none` elimina la caja; `visibility:hidden` conserva su espacio. Si necesitás ocultar solo visualmente y mantener lectura, uso un patrón visually-hidden probado.',
      },
      {
        question: '¿Cómo evitás CSS frágil?',
        answer:
          'Reduzco especificidad, defino tokens y layers, limito alcance, documento variantes y pruebo estados, tamaños, temas y contenido real.',
      },
      {
        question: '¿Cómo diagnosticás un problema de `z-index`?',
        answer:
          'Identifico los stacking contexts de ambos elementos y comparo sus ancestros, no sólo sus números. `transform`, `opacity`, `isolation` y ciertos elementos posicionados crean contextos que limitan dónde compite un descendiente.',
      },
      {
        question: '¿Media query o container query?',
        answer:
          'Una media query responde al viewport o a preferencias del usuario. Una container query responde al espacio disponible para el componente. La segunda permite reutilizar la misma pieza en layouts distintos sin conocer la página que la contiene.',
      },
    ],
    code: '@layer reset, base, components, utilities;\n\n@layer components {\n  .card { container-type: inline-size; }\n  @container (min-width: 36rem) {\n    .card__body { display: grid; grid-template-columns: 2fr 1fr; }\n  }\n}\n\n@media (prefers-reduced-motion: reduce) {\n  *, *::before, *::after { animation-duration: 0.01ms !important; }\n}',
  },
  {
    id: 'javascript-tipos-coercion-scope-y-funciones',
    number: '03',
    groupId: 'fundamentos-web',
    title: 'JavaScript: tipos, coerción, scope y funciones',
    intro:
      'Estas preguntas aparecen en entrevistas frontend de cualquier nivel. Una respuesta Senior explica la regla del lenguaje, muestra un caso que falla y propone una forma de escribir código predecible.',
    theory: [
      'JavaScript tiene tipos primitivos `undefined`, `null`, `boolean`, `number`, `bigint`, `string` y `symbol`. Los objetos se comparan por referencia. `typeof null` devuelve `object` por una decisión histórica.',
      '`var` posee function scope, permite redeclaración y su declaración se eleva. `let` y `const` poseen block scope y permanecen en temporal dead zone hasta la inicialización. `const` fija la referencia, no vuelve inmutable el objeto.',
      'La coerción es la conversión de un valor de un tipo a otro. Es explícita cuando el código llama a `Number(value)`, `String(value)` o `Boolean(value)`, e implícita cuando el lenguaje convierte porque un operador o contexto necesita otro tipo. Formularios, query params, atributos DOM y storage entregan strings aunque representen números o booleanos; convertir y validar en esa frontera evita que la coerción se propague al dominio.',
      "Cuando un operador necesita convertir un objeto a primitivo, JavaScript ejecuta la operación abstracta `ToPrimitive`. Primero respeta `Symbol.toPrimitive` y, según el hint, consulta `valueOf` y `toString` hasta obtener un primitivo. Por eso `[]` se convierte en `''`, `[1, 2]` en `'1,2'` y un objeto común suele producir `'[object Object]'`; después el operador continúa con la conversión numérica o textual que corresponda.",
      "El operador `+` es especial: después de convertir objetos a primitivos, concatena si alguno de los operandos es string; si no, realiza suma numérica. `1 + '2'` produce `'12'`, mientras `'5' - 2`, `'5' * 2` y `'5' / 2` convierten a número. Los template literals fuerzan string y los contextos de `if`, `!`, `&&` y `||` usan conversión booleana.",
      "Las conversiones tienen bordes que conviene conocer: `Number('')` y `Number(null)` producen `0`, `Number(undefined)` produce `NaN`, y `Boolean('false')` es `true` porque cualquier string no vacío es truthy. `Number` exige que toda la cadena represente un número; `parseInt('10px', 10)` acepta el prefijo numérico. Ninguna de las dos reemplaza validar rango, formato y finitud con `Number.isFinite`.",
      '`===` compara tipo y valor sin coerción. `Object.is` difiere en `NaN` y `-0`. `==` tiene casos útiles, como `value == null`, pero exige conocer su tabla de coerción.',
      'Falsy incluye `false`, `0`, `-0`, `0n`, cadena vacía, `null`, `undefined` y `NaN`. Un array u objeto vacío es truthy.',
      'Una declaración de función se eleva con su cuerpo. Una function expression sigue las reglas de su variable. Las arrow functions capturan `this`, `arguments` y `super` del entorno; no sirven como constructor.',
      '`this` depende de cómo se invoca una función: method call, `call/apply/bind`, constructor con `new` o binding léxico de arrow. Extraer un método puede perder el receiver.',
      'Un closure es la combinación de una función con el entorno léxico donde fue creada. La función puede ejecutarse después de que terminó la llamada exterior y seguir resolviendo parámetros y variables de ese entorno. `makeCounter` puede declarar `let count = 0` y devolver una función que incrementa `count`; cada llamada a `makeCounter()` crea un binding privado e independiente.',
      'El closure conserva bindings, no una fotografía de sus valores. Si el binding cambia, las funciones que lo cerraron observan el valor actual. Esto permite estado privado y callbacks coordinados, pero también explica bugs cuando varias funciones comparten accidentalmente una misma variable mutable.',
      'En un loop, `var` crea un único binding con scope de función, por lo que callbacks diferidos suelen leer el valor final. `let` crea un binding nuevo por iteración. Antes de `let`, una IIFE o una factory recibía el valor de cada vuelta y creaba un entorno distinto.',
      'Closures sostienen factories, currying, memoization, event handlers y callbacks asíncronos. El entorno permanece vivo mientras una función alcanzable lo necesite: no es una fuga por sí mismo, pero puede retener DOM, caches o respuestas grandes. El cleanup debe remover listeners, cancelar timers o suscripciones y evitar capturar objetos completos cuando alcanza con un identificador o un dato pequeño.',
      'El spread copia un nivel y enumera propiedades. `structuredClone` cubre muchos valores y ciclos, pero no funciones ni todos los objetos host. Un JSON round-trip pierde fechas, `undefined`, `BigInt` y prototipos.',
      'Destructuring extrae valores y admite defaults. El default corre solo para `undefined`, no para `null`. Rest agrupa el remanente y debe ocupar la última posición.',
    ],
    questions: [
      {
        question: '¿Cuál es la diferencia entre `var`, `let` y `const`?',
        answer:
          '`var` usa scope de función y permite redeclaración. `let` y `const` usan scope de bloque y temporal dead zone. `const` impide reasignar la variable, pero el valor referenciado puede mutar.',
      },
      {
        question: '¿Por qué `[] == false` da true?',
        answer:
          "La igualdad abstracta no compara directamente array y boolean. Primero convierte `false` a número: `0`. Después aplica `ToPrimitive` al array: `[].toString()` produce `''`. Como ahora compara string con number, convierte `''` a `0`; el resultado final es `0 == 0`, que es `true`. En cambio, `[] === false` es `false` porque los tipos son distintos y no existe coerción. No memorizaría solamente este resultado: seguir los pasos boolean → number, object → primitive y string → number permite explicar también casos como `[0] == false`. En código de producto uso `===` y conversiones explícitas para que esa secuencia no quede escondida.",
      },
      {
        question: '¿Arrow function o función normal?',
        answer:
          'Uso arrow para callbacks que necesitan el `this` exterior. Uso función normal para métodos dinámicos, constructores o APIs que asignan receiver.',
      },
      {
        question: '¿Shallow copy o deep copy?',
        answer:
          "Una shallow copy crea un objeto o array nuevo, pero copia por referencia los valores anidados. Por ejemplo, con `const original = { user: { name: 'Ana' } }; const copy = { ...original };`, se cumple `copy !== original`, pero `copy.user === original.user`; por eso `copy.user.name = 'Luis'` también modifica `original.user.name`. Spread, `Object.assign`, `Array.from` y `slice` hacen copias superficiales. Una deep copy duplica recursivamente la estructura para que los objetos anidados no compartan identidad. `structuredClone(original)` sirve para muchos datos nativos y ciclos, pero no clona funciones, elementos DOM ni conserva el comportamiento de todas las instancias de clases. No hago una copia profunda por defecto: cuesta CPU y memoria, y puede romper identidades que la aplicación necesita. Para actualizar estado prefiero copiar sólo el camino modificado, por ejemplo `{ ...state, user: { ...state.user, name: 'Luis' } }`; así mantengo inmutabilidad y structural sharing sin duplicar todo el grafo.",
      },
      {
        question: '¿Qué es un closure y cuándo se crea?',
        answer:
          'Un closure es una función junto con las referencias a los bindings de su entorno léxico. Se determina cuando la función se crea, no cuando se invoca. Por ejemplo, `function makeCounter() { let count = 0; return () => ++count; }` devuelve una función que sigue accediendo a `count` después de que `makeCounter` terminó. `const a = makeCounter(); const b = makeCounter();` crea dos entornos: `a()` devuelve `1`, luego `2`, mientras `b()` comienza en `1`. El runtime conserva sólo los entornos que todavía son alcanzables; por eso un closure permite estado privado sin convertir `count` en una variable global.',
      },
      {
        question: '¿Un closure captura el valor o el binding?',
        answer:
          'Captura el binding, es decir, la celda donde vive el valor, no una fotografía inmutable. Con `let rate = 1; const price = value => value * rate; rate = 2;`, `price(10)` devuelve `20` porque lee el valor actual de `rate`. Varias funciones pueden compartir el mismo binding y observar sus cambios. Si necesito congelar el valor de un momento, creo otro binding pasando el dato a una factory: `const withRate = rate => value => value * rate`. Cada llamada recibe su propio parámetro `rate`.',
      },
      {
        question:
          '¿Por qué un loop con `var` y callbacks suele imprimir el valor final?',
        answer:
          '`var` tiene scope de función, así que todas las callbacks cierran sobre un único binding `i`. Cuando ejecuta el timer, el loop ya terminó y ese binding vale `3`: `for (var i = 0; i < 3; i++) setTimeout(() => console.log(i));` imprime `3, 3, 3`. Con `let`, la especificación crea un binding nuevo en cada iteración y el resultado es `0, 1, 2`. Otra solución es una factory o IIFE que reciba `i` y genere un parámetro distinto por vuelta. El punto importante no es el timer: es cuántos bindings existen y cuál captura cada función.',
      },
      {
        question: '¿Cómo puede un closure retener memoria innecesariamente?',
        answer:
          'Mientras una función sea alcanzable, también permanecen alcanzables los valores de su entorno que necesita. Un listener global que captura el componente, un timer que captura una respuesta grande o una cache sin límite pueden mantener vivo ese grafo después de retirar la vista. No todo closure es un leak: se vuelve problema cuando la vida de la referencia supera la vida útil del dato. Remuevo listeners, limpio timers y suscripciones, limito caches y capturo sólo el identificador o valor pequeño necesario. En Angular asocio el cleanup a `DestroyRef` o `takeUntilDestroyed` cuando corresponde.',
      },
      {
        question:
          '¿Qué diferencia hay entre coerción implícita y conversión explícita?',
        answer:
          "En una conversión explícita el código declara la intención: `Number(input.value)`, `String(id)` o `Boolean(flag)`. La coerción implícita ocurre dentro de un operador o contexto: `'5' - 1` produce `4`, `1 + '2'` produce `'12'` y `if ('false')` entra porque el string no está vacío. La coerción no es automáticamente un error; templates, comparaciones y operadores dependen de ella. El riesgo aparece cuando oculta un contrato. En fronteras externas convierto, valido y conservo desde allí un tipo estable.",
      },
      {
        question: '¿Qué es `ToPrimitive` y por qué importa?',
        answer:
          "`ToPrimitive` es la operación abstracta que convierte un objeto en un valor primitivo antes de que otro algoritmo continúe. Si existe, llama a `Symbol.toPrimitive`; en caso contrario prueba `valueOf` y `toString` en un orden que depende del hint. Deben devolver un primitivo o la conversión falla con `TypeError`. Por eso `[] + 1` produce `'1'`: el array se vuelve `''` y `+` concatena. Un objeto puede personalizar el resultado con `[Symbol.toPrimitive](hint)`, pero hacerlo de forma sorprendente vuelve los operadores difíciles de razonar; normalmente prefiero métodos explícitos de dominio.",
      },
      {
        question: '¿Por qué existe la Temporal Dead Zone?',
        answer:
          'Al entrar en un bloque, JavaScript crea los bindings de `let`, `const` y `class`, pero los deja sin inicializar hasta ejecutar su declaración. Ese intervalo es la Temporal Dead Zone. Leer el binding durante ese tramo lanza `ReferenceError`: `console.log(total); let total = 1;`. Incluso `typeof total` falla si `total` está en la TDZ, a diferencia de una variable que no existe. Con `var`, en cambio, el binding se inicializa con `undefined`, por lo que el acceso prematuro no falla y puede ocultar un error de orden. La TDZ existe para que una variable con scope de bloque no se use antes de tener el valor que su declaración promete. No significa que `let` y `const` no tengan hoisting: sus bindings se crean al entrar al scope, pero todavía no son accesibles.',
      },
      {
        question: '¿Usarías alguna vez `==`?',
        answer:
          "Sí, pero sólo usaría deliberadamente `value == null` cuando quiero aceptar exactamente `null` o `undefined`. La comparación es verdadera para esos dos valores y falsa para `0`, `false`, `''` y `NaN`; por ejemplo, `if (response.middleName == null)` detecta que el campo opcional no llegó sin rechazar una cadena vacía válida. Es una excepción conocida de Abstract Equality y conviene permitirla explícitamente con una regla como `eqeqeq: ['error', 'always', { null: 'ignore' }]`. En el resto del código uso `===` y `!==`, porque `==` aplica coerciones difíciles de leer: `'' == 0`, `'0' == false` y `[] == false` son verdaderas. Si el equipo prioriza máxima explicitud, escribo `value === null || value === undefined`; comunica el mismo contrato sin depender de conocer la excepción.",
      },
    ],
    code: "function makeCounter() {\n  let count = 0;\n  return () => ++count;\n}\n\nconst first = makeCounter();\nconst second = makeCounter();\nconsole.log(first(), first(), second()); // 1, 2, 1\n\nconsole.log(1 + '2');       // '12'\nconsole.log('5' - 2);       // 3\nconsole.log(Number('42'));  // 42\nconsole.log(Boolean(''));   // false\nconsole.log([] == false);   // true\nconsole.log([] === false);  // false",
  },
  {
    id: 'javascript-objetos-prototipos-arrays-y-programacion-funcional',
    number: '04',
    groupId: 'fundamentos-web',
    title: 'JavaScript: objetos, prototipos, arrays y programación funcional',
    intro:
      'JavaScript usa delegación prototípica. Las clases ofrecen sintaxis, pero los objetos todavía resuelven propiedades a través de una cadena de prototipos.',
    theory: [
      '`Object.create(proto)` fija el prototipo. `new C()` crea un objeto, enlaza `C.prototype`, ejecuta `C` con ese `this` y devuelve el objeto salvo retorno explícito de otro objeto.',
      'Una propiedad puede ser own o heredada. `Object.hasOwn` comprueba ownership; `in` recorre la cadena. `Object.keys` devuelve claves enumerables propias.',
      'Los property descriptors controlan `writable`, `enumerable` y `configurable`; getters y setters forman accessors. Cambiar descriptores afecta serialización y copia.',
      'Arrays son objetos con índices y `length`. `for...of` recorre valores de un iterable; `for...in` recorre claves enumerables y no conviene para arrays.',
      '`map` crea una colección transformada, `filter` conserva elementos, `reduce` acumula, `find` devuelve la primera coincidencia y `some` o `every` evalúan predicados. Cada método comunica una intención distinta y evita acumular efectos dentro de un loop genérico.',
      '`sort` muta y convierte a string sin comparator. `toSorted`, `toReversed`, `toSpliced` y `with` devuelven copias en runtimes modernos.',
      'Una pure function depende de sus argumentos y no produce efectos observables. La pureza mejora tests y composición, pero una aplicación necesita efectos en fronteras controladas.',
      'Currying transforma una función de varios argumentos en una secuencia de funciones. Partial application fija algunos argumentos; no son conceptos idénticos.',
      'Memoization guarda resultados asociados a sus argumentos. La estrategia necesita una regla de igualdad, un límite de tamaño y una política de invalidación; sin esos límites, la caché puede devolver datos obsoletos o retener memoria sin control.',
      'Big O describe crecimiento. Acceso por índice de array suele ser O(1); búsqueda lineal O(n); sort comparativo O(n log n); acceso promedio a Map O(1). Las constantes todavía afectan al usuario.',
    ],
    questions: [
      {
        question: '¿Clase o prototipo?',
        answer:
          '`class` organiza herencia y métodos con sintaxis más clara; el runtime resuelve métodos mediante prototipos. Conocer el modelo explica `instanceof`, shadowing y métodos compartidos.',
      },
      {
        question: '¿`map` o `forEach`?',
        answer:
          '`map` crea una colección transformada y exige usar el retorno. `forEach` expresa un efecto por elemento y devuelve `undefined`.',
      },
      {
        question: '¿`Map` o objeto?',
        answer:
          '`Map` acepta cualquier clave, preserva orden de inserción y ofrece size e iteración directa. Un objeto encaja en records con claves string/symbol y serialización JSON.',
      },
      {
        question: '¿Qué muta un array?',
        answer:
          '`push`, `pop`, `shift`, `unshift`, `splice`, `sort`, `reverse`, `fill` y `copyWithin`. `map`, `filter`, `slice`, `concat` y los métodos `to*` crean otro array.',
      },
      {
        question: '¿Qué pierde una copia con spread?',
        answer:
          'Spread copia propiedades enumerables propias del primer nivel. Las referencias anidadas siguen compartidas y la copia no conserva descriptores completos ni comportamiento interno de todos los objetos. Primero defino qué parte del modelo necesita una nueva identidad.',
      },
      {
        question: '¿Cuándo evitás `map`, `filter` y `reduce` encadenados?',
        answer:
          'Cada operador puede recorrer y asignar otra colección. En una ruta caliente o una lista grande, un solo loop puede reducir memoria y trabajo. Mantengo la cadena cuando su claridad pesa más que ese costo medido.',
      },
    ],
  },
  {
    id: 'javascript-asincrono-event-loop-promises-y-errores',
    number: '05',
    groupId: 'fundamentos-web',
    title: 'JavaScript asíncrono: event loop, Promises y errores',
    intro:
      'JavaScript ejecuta código en un solo call stack y delega timers, red y eventos al entorno. Promises, async/await y el event loop permiten coordinar cuándo continúa cada operación sin bloquear la interfaz.',
    theory: [
      'El código síncrono termina una instrucción antes de comenzar la siguiente. JavaScript usa un solo call stack para ejecutar ese código en el main thread del navegador. Una función lenta ocupa el stack y retrasa clicks, input, layout y paint.',
      'Una operación asíncrona inicia un trabajo cuyo resultado llegará después. El navegador puede encargarse de un timer, una petición de red o un evento mientras el stack continúa con otras instrucciones. Asincronía describe coordinación en el tiempo; no significa que dos fragmentos de JavaScript se ejecuten al mismo tiempo en el mismo thread.',
      'El event loop coordina el call stack con el entorno del navegador y sus colas. Toma una task, ejecuta su callback hasta vaciar el stack, drena todas las microtasks pendientes, permite que el navegador renderice y después avanza a otra task. `setTimeout`, eventos y mensajes generan tasks; continuaciones de Promises y `queueMicrotask` generan microtasks.',
      'Una `Promise` es un objeto que representa el resultado futuro de una sola operación. Nace en estado `pending` y termina como `fulfilled` con un valor o `rejected` con una razón. `fulfilled` y `rejected` forman el estado `settled`. Una Promise settled no puede cambiar de estado ni volver a emitir otro resultado.',
      'El constructor `new Promise(executor)` ejecuta el executor de inmediato y de forma síncrona. Las funciones `resolve` y `reject` fijan el resultado eventual; no vuelven asíncrono el trabajo que se ejecuta dentro del executor. La asincronía proviene de la API usada, como `fetch`, un timer o IndexedDB. Si una API ya devuelve una Promise, envolverla en otra suele agregar código y errores sin aportar control.',
      '`then` registra el camino de éxito, `catch` registra el de rechazo y `finally` ejecuta cleanup sin recibir ni reemplazar el resultado salvo que lance un error. Cada método devuelve una Promise nueva. Por eso una cadena no modifica la Promise anterior: cada eslabón describe cómo obtener el resultado siguiente.',
      'El valor que retorna un callback decide el siguiente eslabón. Un valor común cumple la Promise siguiente con ese valor; una Promise o thenable hace que la siguiente adopte su estado; un `throw` la rechaza. Omitir `return` entrega `undefined` y deja fuera de la cadena cualquier operación iniciada dentro del callback.',
      'Los handlers de `then`, `catch` y `finally` no corren durante el stack actual, aunque la Promise ya esté settled. JavaScript los encola como microtasks. El navegador drena esa cola antes de tomar otra task, por eso una cadena que crea microtasks sin terminar puede retrasar timers, eventos y render.',
      'Una función declarada con `async` devuelve una Promise. Un `return value` produce una Promise fulfilled con `value`; un `throw error` produce una Promise rejected. `await promise` pausa sólo la ejecución de esa función, libera el stack y reanuda su continuación como microtask cuando la Promise termina. `await` no bloquea el thread ni mueve trabajo de CPU a otro thread.',
      'Dos `await` consecutivos suelen ejecutar operaciones en secuencia cuando la segunda comienza después de resolver la primera. Si ambas son independientes, iniciarlas antes y esperar `Promise.all` reduce el tiempo total. La concurrencia empieza al crear o invocar las operaciones, no al escribir `Promise.all`.',
      'Los combinadores expresan políticas distintas. `Promise.all` cumple cuando todas cumplen, conserva el orden de entrada y rechaza ante el primer rechazo observado. `Promise.allSettled` espera todos los resultados. `Promise.race` adopta el primer settlement. `Promise.any` toma el primer fulfillment y, si todos rechazan, devuelve un `AggregateError`.',
      'Un `Observable` representa una fuente que puede enviar cero, uno o varios valores a lo largo del tiempo. Una suscripción conecta un observer con esa fuente. El observer puede recibir notificaciones `next`, una única notificación terminal `error` o una única notificación terminal `complete`. Después de `error` o `complete` no llegan más valores.',
      'La mayoría de los Observables de RxJS son lazy: el producer comienza para cada `subscribe`. Un Observable cold crea una ejecución independiente por suscriptor, como una request HTTP. Un Observable hot comparte una fuente que ya produce, como eventos del usuario o un Subject. Operadores como `map`, `filter`, `switchMap` y `catchError` crean Observables nuevos y describen el flujo sin mutar la fuente.',
      '`unsubscribe` ejecuta el teardown registrado por el Observable y deja de entregar notificaciones a ese suscriptor. Detener el trabajo subyacente depende de que el producer implemente ese teardown. Angular `HttpClient` aborta la request al desuscribirse; un Observable propio que inicia un timer debe cancelarlo en su función de cleanup. Desuscribirse no deshace efectos que ya ocurrieron.',
      'Promise y Observable modelan contratos distintos. Una Promise comparte un único resultado settled y se consume con `then` o `await`. Un Observable modela una secuencia, puede ser lazy, permite composición temporal y ofrece teardown por suscripción. Convertir entre ambos puede perder información: `firstValueFrom` toma el primer valor y necesita que la fuente emita o termine; convertir una Promise a Observable no vuelve cancelable la operación original.',
      '`try/catch` captura errores síncronos del bloque y rechazos que atraviesan un `await`. No captura un error lanzado más tarde por un callback desconectado, como un `setTimeout`. Ese callback necesita su propio manejo o debe formar parte de una Promise que el flujo retorne y espere.',
      'Una Promise no define cancelación. `AbortController` permite pedirle a `fetch` y a otras APIs compatibles que detengan su trabajo mediante una `signal`. Cancelar el cliente evita procesar una respuesta innecesaria, aunque el servidor puede continuar si ya recibió y empezó la operación.',
      'Una race condition aparece cuando varias operaciones compiten por actualizar el mismo estado y terminan en otro orden. Un buscador puede mostrar una respuesta vieja si la primera petición tarda más que la última. Abortá la anterior, asigná una versión a cada solicitud o aceptá el resultado sólo si todavía corresponde a la consulta vigente.',
      'Debounce espera un período sin eventos antes de ejecutar; sirve para búsquedas mientras el usuario escribe. Throttle impone una frecuencia máxima; sirve para scroll o resize. Ambos necesitan cleanup para cancelar timers o trabajo pendiente cuando se destruye el consumidor.',
      '`async/await` organiza espera de I/O, pero no reduce el costo del código síncrono. Dividí CPU intenso en tareas pequeñas cuando necesitás devolver control al navegador. Usá un Web Worker cuando el cálculo merece otro thread y el costo de copiar datos y enviar mensajes resulta aceptable.',
    ],
    questions: [
      {
        question: '¿Qué es una Promise?',
        answer:
          "Una Promise representa un único resultado que todavía puede no estar disponible. Empieza `pending` y termina `fulfilled` con un valor o `rejected` con un error. Por ejemplo, `fetch('/users')` devuelve de inmediato una Promise; el objeto permite registrar qué hacer cuando lleguen la respuesta o el fallo. La Promise no contiene un thread ni ejecuta dos resultados: modela la finalización de una operación.",
      },
      {
        question: '¿El executor de `new Promise` es asíncrono?',
        answer:
          "No. `new Promise((resolve) => { console.log('executor'); resolve(1); })` imprime `executor` durante el stack actual. Lo que corre después como microtask es el callback registrado con `then`. Poner un loop pesado dentro del executor bloquea la interfaz igual que cualquier otro código síncrono.",
      },
      {
        question: '¿Qué devuelve `then`?',
        answer:
          '`then` devuelve una Promise nueva. Si el callback retorna `42`, la nueva Promise cumple con `42`; si retorna `fetch(...)`, adopta el estado de esa Promise; si lanza un error, queda rechazada. Este contrato permite encadenar transformaciones y propagar errores hasta un `catch`.',
      },
      {
        question: '¿Qué pasa si olvidás `return` dentro de un `then`?',
        answer:
          'El callback retorna `undefined`, así que el siguiente `then` continúa sin esperar la operación interna. En `loadUser().then(user => { saveUser(user); }).then(showSuccess)`, `showSuccess` puede ejecutarse antes de que termine `saveUser`. La corrección es `return saveUser(user)` o usar `await saveUser(user)` dentro de una función `async`.',
      },
      {
        question: '¿En qué orden imprime el ejemplo?',
        answer:
          'Primero corre el stack síncrono: `A` y `E`. Después se procesan las microtasks en el orden en que fueron encoladas: `C` y `D`. Al final corre la task del timer y aparece `B`. El resultado es `A, E, C, D, B`. Un timer con demora cero indica una demora mínima; no salta por delante del stack ni de las microtasks.',
      },
      {
        question: '¿`await` bloquea JavaScript?',
        answer:
          '`await` pausa la función `async` que lo contiene y devuelve el control al caller. El main thread puede procesar otras tareas. Cuando la Promise termina, JavaScript encola la continuación de la función como microtask. Un cálculo pesado antes o después del `await` sigue bloqueando porque `await` no crea otro thread.',
      },
      {
        question: '¿Cuándo usar ejecución secuencial y cuándo concurrente?',
        answer:
          'Usá secuencia cuando una operación depende del resultado anterior, como cargar un usuario y después consultar sus permisos. Para trabajos independientes, iniciá ambos antes: `const userRequest = loadUser(); const settingsRequest = loadSettings(); const [user, settings] = await Promise.all([userRequest, settingsRequest]);`. Así el tiempo total se aproxima a la operación más lenta en lugar de sumar ambas esperas.',
      },
      {
        question: '¿Promise u Observable?',
        answer:
          'Una Promise entrega un único resultado y no incorpora cancelación. Empieza cuando la operación que la creó ya fue iniciada. Un Observable puede emitir cero, uno o varios valores; suele comenzar al suscribirse, permite `unsubscribe` y compone tiempo, cancelación y concurrencia mediante operadores. Para una request HTTP aislada una Promise puede alcanzar; para eventos, streams o flujos cancelables, un Observable expresa mejor el contrato.',
      },
      {
        question: '¿Qué es un Observable y qué hace `subscribe`?',
        answer:
          'Un Observable describe cómo producir y entregar una secuencia de notificaciones. `subscribe` inicia o conecta esa producción y devuelve una `Subscription`. El observer recibe `next(value)` mientras hay datos y después puede recibir `complete()` o `error(reason)` como final excluyente. Ejemplo: `interval(1000)` emite valores hasta que el consumidor se desuscribe; `http.get()` suele emitir una respuesta y completar.',
      },
      {
        question: '¿Observable cold u hot?',
        answer:
          "Un cold Observable crea una ejecución por suscriptor. Dos suscripciones a `http.get('/users')` suelen crear dos requests. Un hot Observable comparte una fuente externa o una ejecución entre suscriptores, como clicks o un Subject. `share` y `shareReplay` pueden compartir una fuente cold, pero requieren definir replay, refCount y reset para no conservar datos o conexiones más tiempo del previsto.",
      },
      {
        question: '¿`unsubscribe` siempre cancela el trabajo?',
        answer:
          '`unsubscribe` deja de entregar valores y ejecuta el teardown del producer. Cancela el trabajo sólo si ese teardown sabe detenerlo. `HttpClient` puede abortar la request; un Observable creado con `new Observable` debe retornar cleanup, por ejemplo `return () => clearInterval(id)`. Una Promise convertida con `from(promise)` seguirá resolviéndose porque la Promise original no conoce la suscripción.',
      },
      {
        question:
          '¿Cuándo convertir una Promise a Observable o un Observable a Promise?',
        answer:
          '`from(promise)` integra un resultado único en un pipeline RxJS, pero no agrega cancelación a la Promise. `firstValueFrom(source$)` resuelve con la primera emisión y se desuscribe; `lastValueFrom(source$)` espera que la fuente complete y usa la última. Si la fuente no emite o no completa, la Promise puede rechazar o quedar pendiente, por lo que la conversión necesita un contrato de finalización claro.',
      },
      {
        question: '¿Cómo cancelás `fetch`?',
        answer:
          'Creo `const controller = new AbortController()`, paso `controller.signal` a `fetch` y llamo `controller.abort()` cuando la respuesta deja de ser útil. El rechazo resultante representa cancelación y no un error funcional. También limpio el controller al destruir el componente o al iniciar una solicitud que reemplaza la anterior.',
      },
      {
        question: '¿Por qué `try/catch` no captura un error de `setTimeout`?',
        answer:
          "El callback del timer corre en otra task, después de que el bloque `try` terminó. `try { setTimeout(() => { throw new Error('boom'); }); } catch {}` no lo captura. El callback necesita manejar su error o la API debe envolver el resultado en una Promise que el caller pueda retornar y esperar.",
      },
      {
        question: '¿Cómo evitás que una respuesta vieja reemplace una nueva?',
        answer:
          'Guardo la identidad de la solicitud vigente, cancelo la anterior o comparo una versión antes de escribir estado. En un buscador, la consulta `ang` puede responder después de `angular`; sin esa protección, la UI muestra resultados que ya no coinciden con el input. En RxJS, `switchMap` expresa la política de conservar sólo la operación más reciente.',
      },
      {
        question: '¿Cómo puede una cadena de microtasks bloquear la interfaz?',
        answer:
          'El navegador vacía la cola de microtasks antes de avanzar al siguiente task y al render. Una cadena que agenda otra microtask puede retrasar input y pintura. Divido el trabajo y cedo al scheduler cuando necesito que el navegador procese otra tarea.',
      },
      {
        question: '¿Qué ocurre si falla una promesa dentro de `Promise.all`?',
        answer:
          '`Promise.all` rechaza al recibir el primer rechazo observable, pero las operaciones restantes continúan salvo que su API admita cancelación. Uso `allSettled` cuando necesito el resultado de cada operación y `AbortController` cuando debo detener I/O compatible.',
      },
    ],
    code: "function delay(ms, value) {\n  return new Promise((resolve) => {\n    setTimeout(() => resolve(value), ms);\n  });\n}\n\nasync function loadDashboard() {\n  const userRequest = delay(300, { id: 7 });\n  const settingsRequest = delay(200, { theme: 'dark' });\n\n  try {\n    const [user, settings] = await Promise.all([\n      userRequest,\n      settingsRequest,\n    ]);\n    return { user, settings };\n  } catch (error) {\n    throw new Error('No se pudo cargar el dashboard', { cause: error });\n  }\n}\n\nconsole.log('A');\nsetTimeout(() => console.log('B'), 0);\nPromise.resolve().then(() => console.log('C'));\nqueueMicrotask(() => console.log('D'));\nconsole.log('E');\n\n// A, E, C, D, B\nloadDashboard().then(console.log).catch(console.error);",
  },
  {
    id: 'typescript-avanzado',
    number: '06',
    groupId: 'fundamentos-web',
    title: 'TypeScript avanzado',
    intro:
      'Angular amplifica TypeScript. Una base débil en el lenguaje produce templates inseguros, estado mutable y RxJS difícil de mantener.',
    theory: [
      'TypeScript extiende JavaScript con un sistema de tipos estático. El compilador comprueba el programa y elimina los tipos al emitir JavaScript; por eso una anotación no valida por sí sola los datos que llegan en runtime.',
      "La inferencia obtiene un tipo desde el valor y su contexto. Una anotación fija el contrato de forma explícita. `as const` conserva literales y vuelve readonly la estructura inferida, mientras una anotación amplia puede convertir un literal como `'open'` en `string`.",
      'TypeScript usa tipado estructural: dos valores son compatibles cuando su forma cumple las propiedades requeridas, aunque sus clases o nombres sean distintos. El exceso de propiedades se comprueba con más rigor en object literals que en variables intermedias.',
      'Una `interface` describe contratos de objetos y admite declaration merging. Un `type` también puede representar unions, intersections, primitivas, tuplas y transformaciones calculadas. Ambos pueden expresar muchos contratos de objetos.',
      'Una union `A | B` acepta cualquiera de sus miembros y sólo permite operaciones comunes hasta estrechar el tipo. Una intersection `A & B` exige que el valor cumpla ambos contratos al mismo tiempo.',
      'Las firmas de funciones tipan parámetros y retorno. Los overloads publican varias formas válidas de llamada sobre una implementación, mientras los parámetros opcionales, rest y valores por defecto modelan variaciones dentro de una misma firma.',
      '`any` desactiva la comprobación para el valor y permite que el hueco de tipos se propague. `unknown` acepta cualquier valor, pero exige comprobar su tipo antes de operar con él.',
      '`never` representa un valor que no puede existir. Aparece en funciones que no retornan y en ramas exhaustivas de una unión, donde permite detectar variantes sin manejar durante la compilación.',
      'Un generic introduce parámetros de tipo. La relación entre entrada y salida se conserva sin reemplazarla por `any`; por ejemplo, una función `identity<T>(value: T): T` devuelve el mismo tipo que recibió.',
      'Una discriminated union reúne variantes que comparten una propiedad literal, como `kind`. Al comprobar esa propiedad, TypeScript estrecha el tipo y habilita únicamente los campos de la variante activa. Un caso `default` asignado a `never` detecta estados nuevos que todavía no tienen manejo.',
      'El operador `satisfies` comprueba que una expresión cumple un tipo sin reemplazar el tipo inferido de la expresión. Una anotación puede ensanchar el valor y un type assertion sólo le pide al compilador que confíe en el programador.',
      'Los utility types transforman tipos existentes. `Partial` vuelve opcionales sus propiedades, `Required` hace lo contrario, `Pick` y `Omit` seleccionan claves, y `Record` modela un mapa de claves a valores.',
      'Un type guard estrecha un tipo dentro de una rama. `typeof`, `instanceof`, el operador `in`, predicados `value is T` y funciones de assertion permiten demostrarle al compilador qué variante existe en runtime.',
      'Optional chaining (`?.`) corta una cadena sólo ante `null` o `undefined`. Nullish coalescing (`??`) usa el valor alternativo únicamente para esos dos casos, mientras que `||` también reemplaza `0`, `false` y la cadena vacía.',
      'Los decorators reciben metadata sobre clases o miembros y pueden reemplazar o complementar su definición según la propuesta y configuración usada. Angular los emplea para registrar componentes, directivas, pipes e inyectables.',
      'La configuración `strict` activa un conjunto de comprobaciones, entre ellas nullability, parámetros de funciones y propiedades inicializadas. El compilador encuentra estados inválidos antes de que lleguen al template o al runtime.',
    ],
    questions: [
      {
        question: '¿Por qué `unknown` supera a `any`?',
        answer:
          '`unknown` obliga a validar o estrechar el tipo antes de usarlo. `any` permite operaciones inválidas y propaga huecos por toda la aplicación.',
      },
      {
        question: '¿`interface` o `type`?',
        answer:
          'Ambos describen formas de objetos. `interface` admite declaration merging y extensión orientada a contratos; `type` también representa unions, intersections, tuplas y tipos calculados. La consistencia del código y la capacidad necesaria deciden la elección.',
      },
      {
        question: '¿Qué diferencia existe entre `satisfies` y `as`?',
        answer:
          '`satisfies` comprueba que el valor cumple un contrato y conserva su inferencia. `as` fuerza una interpretación del tipo y puede ocultar una incompatibilidad. Uso assertions sólo cuando el runtime aporta una garantía que el compilador no puede demostrar.',
      },
      {
        question: '¿Cómo diseñás un generic útil?',
        answer:
          'El generic debe conservar una relación entre valores, por ejemplo entre entrada y salida o entre una key y su propiedad. Si el parámetro de tipo aparece una sola vez, quizá una unión o un tipo concreto comunique mejor el contrato.',
      },
    ],
    code: "type LoadState<T> =\n  | { kind: 'idle' }\n  | { kind: 'loading' }\n  | { kind: 'success'; data: T }\n  | { kind: 'error'; error: Error };\n\nfunction assertNever(value: never): never {\n  throw new Error(`Unhandled state: ${JSON.stringify(value)}`);\n}",
  },
  {
    id: 'angular-moderno-y-estrategia-de-versiones',
    number: '07',
    groupId: 'angular-core',
    title: 'Angular moderno y estrategia de versiones',
    intro:
      'La guía toma Angular 22 como referencia. Angular 22 está activo desde junio de 2026; Angular 21 y 20 siguen en LTS. Un Senior distingue APIs estables, migraciones y compatibilidad.',
    theory: [
      'Angular publica las versiones mayores de core y CLI de forma alineada. Cada versión admite rangos concretos de Node.js, TypeScript y RxJS; `ng version`, la tabla de compatibilidad y el Update Guide permiten comprobarlos antes de una migración.',
      'Las aplicaciones nuevas usan componentes standalone. NgModules siguen siendo relevantes en bases antiguas y bibliotecas, pero ya no deben dirigir un diseño nuevo sin motivo.',
      'Angular 21+ usa change detection zoneless por defecto. El código debe notificar cambios mediante signals, listeners, `AsyncPipe`, `setInput` o `markForCheck`.',
      'El control flow moderno usa `@if`, `@for`, `@switch` y `@empty`. `track` necesita una identidad estable; usar el índice en listas mutables crea errores visuales y trabajo DOM.',
      '`@defer` separa las dependencias de una vista en otro chunk y las carga mediante triggers como viewport, idle o interaction. LCP y CLS muestran si diferir contenido visible empeora la carga principal o provoca saltos de layout.',
      'La adopción de una API nueva depende de su estabilidad, soporte, capacidad del equipo y costo de fallback. APIs como `resource`, `httpResource` o Signal Forms requieren revisar su estado antes de incorporarlas a una base de producción.',
    ],
    questions: [
      {
        question: '¿Migrarías todo a la última versión?',
        answer:
          'Migraría por incrementos soportados, con tests, presupuestos de bundle y observabilidad. Priorizo seguridad, compatibilidad y APIs deprecadas; después adopto sintaxis nueva.',
      },
      {
        question: '¿Standalone elimina los módulos?',
        answer:
          'Elimina la necesidad de NgModules para declarar componentes. Los módulos todavía pueden agrupar APIs heredadas o librerías. Standalone simplifica dependencias y lazy loading.',
      },
      {
        question: '¿Qué revisarías antes de activar zoneless?',
        answer:
          'Busco mutaciones que dependen de ZoneJS, librerías que actualizan campos sin notificar y usos directos de APIs externas. Migro el estado visible a signals, `AsyncPipe` o marcas explícitas y comparo tests y métricas antes de retirar ZoneJS.',
      },
      {
        question: '¿Cómo decidís qué contenido cargar con `@defer`?',
        answer:
          'Difiero contenido costoso que no participa del primer objetivo visual. Elijo trigger y prefetch según la probabilidad de uso, reservo espacio para evitar CLS y mido LCP, transferencia e interacción en una build de producción.',
      },
    ],
  },
  {
    id: 'componentes-templates-y-composicion',
    number: '08',
    groupId: 'angular-core',
    title: 'Componentes, templates y composición',
    intro:
      'Un componente Senior mantiene una API pequeña, estado local explícito y un template legible. La composición supera a la herencia para reutilizar UI.',
    theory: [
      'La metadata de un componente conecta una clase con su selector, template, estilos, estrategia de encapsulación, change detection, imports y providers. Los host bindings aplican propiedades, atributos o listeners al elemento anfitrión del componente.',
      '`input()` declara un signal de entrada y `output()` crea un emisor tipado hacia el padre. `model()` combina una entrada con su salida `nombreChange`, lo que habilita two-way binding para controles cuyo valor forma parte de su contrato público.',
      'La proyección con `ng-content` define slots estáticos. `TemplateRef`, `ng-template`, `ViewContainerRef` y creación dinámica cubren composición avanzada.',
      '`viewChild` y `viewChildren` consultan la vista propia; `contentChild` y `contentChildren` consultan contenido proyectado. Las queries basadas en signals cambian cuando cambia el árbol. Una query `required` falla si el contrato no encuentra el hijo esperado.',
      'Una directiva añade comportamiento; un componente añade comportamiento y vista. Una pipe pura debe transformar sin efectos y devolver el mismo resultado para las mismas entradas.',
      'Angular puede evaluar una expresión de template durante cada comprobación de la vista. Una función costosa invocada desde el template repite ese trabajo. `computed` memoriza una derivación y sólo la recalcula cuando cambia alguno de los signals leídos.',
    ],
    questions: [
      {
        question: '¿Input o servicio de estado?',
        answer:
          'Un input expresa dependencia del padre y mantiene el componente reutilizable. Un servicio sirve para estado compartido por ramas distantes o un dominio. No ocultes datos de presentación globalizando todo.',
      },
      {
        question: '¿Content projection o input TemplateRef?',
        answer:
          '`ng-content` funciona para slots fijos y ergonomía declarativa. `TemplateRef` permite repetir, parametrizar o elegir plantillas en tiempo de ejecución.',
      },
      {
        question:
          '¿Qué debería formar parte de la API pública de un componente?',
        answer:
          'Sólo inputs, outputs y slots que representan variaciones reales del producto. Si una opción expone detalles internos o combina estados inválidos, prefiero dividir responsabilidades o modelar una unión más precisa.',
      },
      {
        question: '¿Cuándo crearías una directiva en lugar de un componente?',
        answer:
          'Creo una directiva cuando necesito añadir comportamiento a un elemento existente sin imponer markup. Creo un componente cuando la unidad posee estructura visual, estado y una API que deben evolucionar juntos.',
      },
    ],
  },
  {
    id: 'ciclo-de-vida-y-render-hooks',
    number: '09',
    groupId: 'angular-core',
    title: 'Ciclo de vida y render hooks',
    intro:
      'El orden importa cuando un componente coordina inputs, queries, DOM y recursos externos.',
    theory: [
      'El constructor configura dependencias y estado barato. `ngOnInit` usa inputs inicializados. `ngOnChanges` reacciona a cambios de inputs y corre antes de `ngOnInit` en la primera pasada.',
      '`ngAfterContentInit/Checked` se relacionan con contenido proyectado. `ngAfterViewInit/Checked` se relacionan con la vista propia y queries.',
      '`afterNextRender` ejecuta un callback después del siguiente render completo; `afterEveryRender` lo hace tras cada render. Agrupar escrituras DOM antes de lecturas geométricas evita alternar style recalculation y layout forzado.',
      '`DestroyRef` registra cleanup en el mismo contexto donde nace un recurso. `takeUntilDestroyed` completa una suscripción cuando ese contexto se destruye. Observers, timers y listeners creados fuera de Angular requieren también su función explícita de limpieza.',
      '`ExpressionChangedAfterItHasBeenCheckedError` aparece en desarrollo cuando una expresión cambia después de que Angular ya verificó esa vista dentro del mismo ciclo. La causa suele ser un flujo de datos que escribe hacia un ancestro o modifica estado durante un hook tardío; diferir con un timer oculta la inconsistencia.',
    ],
    questions: [
      {
        question: '¿Constructor o `ngOnInit`?',
        answer:
          'El constructor pertenece a TypeScript y DI. `ngOnInit` pertenece al ciclo de Angular y recibe inputs listos. Evitá I/O en ambos si un resolver, store o recurso expresa mejor la carga.',
      },
      {
        question: '¿Cómo evitás leaks?',
        answer:
          'Uso `AsyncPipe`, signals o `takeUntilDestroyed`; limpio APIs externas con `DestroyRef.onDestroy`. Después verifico navegación repetida con profiler y tests.',
      },
      {
        question: '¿`ngAfterViewInit` o `afterNextRender` para medir DOM?',
        answer:
          '`ngAfterViewInit` confirma que Angular inicializó la vista, pero una medición puede depender de un render posterior. `afterNextRender` ejecuta trabajo después del siguiente render del árbol y permite separar fases de escritura y lectura.',
      },
      {
        question: '¿Qué ventaja aporta `DestroyRef`?',
        answer:
          'Coloca la limpieza junto al recurso que la necesita y evita concentrar teardown sin contexto en `ngOnDestroy`. Lo uso con listeners, observers y `takeUntilDestroyed` para vincular su vida al contexto de inyección.',
      },
    ],
  },
  {
    id: 'change-detection-signals-y-zoneless',
    number: '10',
    groupId: 'angular-core',
    title: 'Change detection, Signals y zoneless',
    intro:
      'Esta sección suele separar experiencia reciente de conocimiento heredado. Explicá quién notifica a Angular, qué vista queda dirty y cuándo se recalcula una derivación.',
    theory: [
      'Default verifica un subárbol con mayor frecuencia. OnPush permite saltar subárboles cuando no reciben nuevos inputs ni notificaciones.',
      'Un signal writable usa `set` o `update`; `computed` deriva estado, memoriza y rastrea dependencias dinámicas; `effect` conecta estado reactivo con una API no reactiva.',
      '`computed` representa estado derivado: lee otros signals, memoriza el resultado y permanece libre de efectos. `effect` ejecuta una operación cuando cambian sus dependencias. Copiar una derivación mediante `effect` crea dos fuentes de verdad y puede producir ciclos o escrituras redundantes.',
      'Signals comparan por `Object.is` salvo función de igualdad. Una mutación profunda conserva la referencia y puede ocultar el cambio.',
      '`untracked` lee un signal sin registrar dependencia. Usalo cuando la lectura sea incidental, no para tapar un grafo mal diseñado.',
      'Zoneless reduce parches y checks innecesarios. Requiere que las actualizaciones lleguen mediante APIs que notifican a Angular.',
      'Signals y RxJS se complementan: signals para estado síncrono leído por la vista; RxJS para flujos asíncronos, cancelación, concurrencia y eventos.',
    ],
    questions: [
      {
        question: '¿OnPush vuelve inmutable la app?',
        answer:
          'No. OnPush cambia cuándo Angular verifica la vista. La inmutabilidad facilita detectar cambios por referencia y evita estado compartido corrupto.',
      },
      {
        question: '¿Cuándo usar `effect`?',
        answer:
          'Para logging, almacenamiento, canvas, APIs del navegador o integración externa. Las derivaciones de UI pertenecen a `computed`.',
      },
      {
        question: '¿Qué rompe al quitar ZoneJS?',
        answer:
          'Código que muta campos sin emitir una notificación compatible, además de dependencias en eventos de `NgZone`. Migraría estado a signals o marcaría la vista.',
      },
      {
        question:
          '¿Por qué una mutación profunda puede no actualizar la vista?',
        answer:
          'Un signal compara el valor nuevo con el anterior mediante `Object.is` por defecto. Mutar una propiedad conserva la referencia y no publica otro valor. Creo una nueva referencia o modelo el campo como un signal independiente.',
      },
      {
        question: '¿Cómo elegís entre `computed` y `effect`?',
        answer:
          '`computed` calcula estado derivado y sólo depende de otros signals. `effect` sincroniza el grafo reactivo con una frontera externa como storage, logging o canvas. No copio estado derivado mediante efectos.',
      },
    ],
    code: "private readonly query = signal('');\nreadonly normalizedQuery = computed(() => this.query().trim().toLowerCase());\nreadonly results = computed(() =>\n  this.items().filter(x => x.name.toLowerCase().includes(this.normalizedQuery()))\n);",
  },
  {
    id: 'dependency-injection-en-profundidad',
    number: '11',
    groupId: 'angular-core',
    title: 'Dependency Injection en profundidad',
    intro:
      'Angular resuelve dependencias en jerarquías. La ubicación del provider define vida útil, visibilidad y aislamiento.',
    theory: [
      "`providedIn: 'root'` crea un singleton por root EnvironmentInjector y permite tree shaking. Un provider de componente crea una instancia por componente.",
      'La resolución busca primero ElementInjectors y después EnvironmentInjectors. Lazy routes pueden crear contextos e instancias separadas.',
      '`useClass` crea una clase para un token; `useValue` entrega un valor existente; `useExisting` crea un alias; `useFactory` calcula la dependencia con otras inyecciones. Los multi providers acumulan varios valores bajo un token e `InjectionToken` representa contratos que no existen como clase en runtime.',
      '`providers` es visible para vista y contenido descendiente; `viewProviders` oculta el provider al contenido proyectado.',
      '`self`, `skipSelf`, `host` y `optional` limitan la búsqueda. Usalos para contratos intencionales, no como parche.',
      '`inject()` necesita injection context: inicializador, constructor administrado por DI, factory o `runInInjectionContext`.',
    ],
    questions: [
      {
        question: '¿Un servicio Angular es siempre singleton?',
        answer:
          "Es singleton dentro del injector que lo provee. Dos injectors pueden crear dos instancias. La frase 'singleton global' omite el scope.",
      },
      {
        question: '¿Por qué usar InjectionToken?',
        answer:
          'Permite inyectar configuración, funciones o interfaces borradas en runtime. El token conserva identidad y puede definir factory y tipo.',
      },
      {
        question: '¿Qué diferencia hay entre `useClass` y `useExisting`?',
        answer:
          '`useClass` pide al injector que construya otra instancia de la clase indicada. `useExisting` crea un alias hacia una instancia registrada. Uso el alias cuando dos tokens deben compartir identidad y estado.',
      },
      {
        question: '¿Cómo afecta el lugar del provider a una feature?',
        answer:
          'El injector que registra el provider define su alcance y vida útil. Un provider de componente aísla instancias por subárbol; uno de ruta puede vivir con la feature lazy; root comparte la instancia en la aplicación.',
      },
    ],
  },
  {
    id: 'rxjs-y-concurrencia',
    number: '12',
    groupId: 'angular-core',
    title: 'RxJS y concurrencia',
    intro:
      'La entrevista Senior suele plantear búsquedas, guardado, polling o eventos concurrentes. Elegí el operador a partir de la política de concurrencia.',
    theory: [
      'Cold observables crean el productor por subscription; hot observables comparten un productor externo. `share` y `shareReplay` cambian esa relación.',
      '`switchMap` cancela el inner anterior; sirve para búsqueda. `concatMap` serializa; sirve para preservar orden. `mergeMap` permite concurrencia. `exhaustMap` ignora disparos mientras uno está activo.',
      '`map` transforma valores; `tap` ejecuta efectos; `filter` decide emisiones; `scan` acumula; `catchError` define el límite del error.',
      'La ubicación de `catchError` define qué stream termina. Dentro de `switchMap` o de otro flattening operator, el error se reemplaza sólo para esa petición y el stream exterior puede seguir escuchando. Fuera del operador, el error finaliza la cadena completa salvo que se retorne otro observable.',
      '`combineLatest` reacciona a últimos valores; `forkJoin` espera que todos completen; `withLatestFrom` toma contexto cuando la fuente emite.',
      '`Subject` no conserva un valor, `BehaviorSubject` guarda el último y exige uno inicial, y `ReplaySubject` reproduce una cantidad o ventana de emisiones. Exponer sólo `asObservable()` impide que consumidores externos escriban en el estado del productor.',
      '`shareReplay({bufferSize: 1, refCount: true})` puede cachear, pero necesitás invalidación, manejo de error y semántica de vida útil.',
    ],
    questions: [
      {
        question: '¿Por qué no subscribirse dentro de subscribe?',
        answer:
          'Anida ciclos de vida y errores, complica cancelación y crea carreras. Un operador de flattening expresa la política y devuelve una sola subscription.',
      },
      {
        question: '¿Cómo cancelás una búsqueda anterior?',
        answer:
          'Debounceo, elimino duplicados y uso `switchMap`. El unsubscribe cancela la petición XHR/fetch cuando el backend y el cliente lo permiten.',
      },
      {
        question: '¿`switchMap` cancela el trabajo en el servidor?',
        answer:
          'Unsubscribe detiene la observación y puede abortar el request si la fuente integra cancelación, como `HttpClient`. El servidor puede haber iniciado el trabajo. Las operaciones con efectos necesitan idempotencia o un protocolo de cancelación propio.',
      },
      {
        question: '¿Qué riesgo tiene `shareReplay`?',
        answer:
          'Puede retener el último valor y mantener viva la suscripción más tiempo del esperado. Defino buffer, `refCount` y política de reset según el ciclo de vida. También decido cómo invalidar errores y datos stale.',
      },
    ],
    code: 'results$ = this.query.valueChanges.pipe(\n  debounceTime(250),\n  distinctUntilChanged(),\n  switchMap(query => this.api.search(query).pipe(\n    catchError(error => of({ items: [], error }))\n  )),\n  shareReplay({ bufferSize: 1, refCount: true })\n);',
  },
  {
    id: 'estado-local-servicios-signals-y-ngrx',
    number: '13',
    groupId: 'angular-core',
    title: 'Estado: local, servicios, Signals y NgRx',
    intro:
      'No existe una herramienta única. Un Senior reduce el alcance del estado y aumenta la estructura cuando la complejidad lo exige.',
    theory: [
      'Estado local de componente: UI efímera. Servicio de feature: coordinación de una rama. Store global: datos compartidos, flujos complejos, auditoría o herramientas de desarrollo.',
      'Server state es una copia local de datos remotos y necesita caché, stale time, invalidación, deduplicación y reintentos. Client state nace en la interfaz, como selección, filtros o un wizard, y su ciclo de vida depende de la navegación y del alcance de la feature.',
      'En NgRx, una action describe un evento, un reducer calcula el siguiente estado sin efectos, un selector deriva y memoriza consultas, y un effect conecta eventos con I/O. Entity normaliza colecciones como un diccionario de ids más una lista ordenada.',
      'El estado derivado se calcula desde la fuente mediante selectors o `computed`; almacenarlo por separado exige sincronizar copias. Las actions expresadas como hechos de dominio, por ejemplo `invoiceSubmitted`, permiten que varios efectos reaccionen sin acoplarse al botón que originó el evento.',
      'ComponentStore y SignalStore encapsulan estado de una feature sin crear un store global. La elección depende de la estabilidad de la API, el ecosistema disponible y la experiencia del equipo con el modelo reactivo.',
      'Una actualización optimista modifica la UI antes de recibir confirmación. El diseño necesita rollback o reconciliación cuando falla, una clave idempotente para evitar duplicados y una regla para conflictos entre la versión local y la remota.',
    ],
    questions: [
      {
        question: '¿Cuándo elegir NgRx?',
        answer:
          'Cuando varios flujos comparten estado, necesitás trazabilidad, efectos coordinados o reglas complejas. Para un formulario aislado, un store global aumenta costo sin beneficio.',
      },
      {
        question: '¿Qué nunca guardarías en el store?',
        answer:
          'Derivaciones recalculables, objetos no serializables sin necesidad y estado DOM efímero. Guardaría la fuente mínima de verdad.',
      },
      {
        question: '¿Cómo separás server state de client state?',
        answer:
          'Server state es una copia de datos remotos y requiere stale time, caché e invalidación. Client state nace en la interacción, por ejemplo filtros o pasos de un wizard. Separarlos evita que un store trate ambos ciclos de vida con la misma política.',
      },
      {
        question: '¿Qué señales justifican introducir NgRx?',
        answer:
          'Lo considero cuando varios flujos escriben el mismo dominio, necesito trazabilidad de eventos, efectos coordinados o reglas de actualización compartidas. Un formulario local o una pantalla aislada no justifican ese costo por sí solos.',
      },
    ],
  },
  {
    id: 'routing-y-navegacion',
    number: '14',
    groupId: 'angular-core',
    title: 'Routing y navegación',
    intro:
      'El router define fronteras de carga, autorización y datos. Diseñá rutas como parte de la arquitectura.',
    theory: [
      '`loadComponent` y `loadChildren` crean fronteras de lazy loading que descargan una feature al navegar. Un chunk por componente pequeño aumenta requests y overhead; una frontera por capacidad de producto suele equilibrar carga inicial y reutilización.',
      'Guards controlan navegación en el cliente; el servidor debe repetir autorización. `CanMatch` evita seleccionar rutas; `CanActivate` decide activación.',
      'Resolvers reducen estados intermedios cuando la ruta necesita datos antes de mostrar. Para pantallas tolerantes al loading, una carga dentro de la feature mejora percepción.',
      'Los path params identifican recursos dentro de la ruta; los query params representan filtros o estado compartible; el fragment apunta a una sección del documento. Rutas hijas componen layouts, outlets muestran árboles paralelos, redirects normalizan URLs y route data aporta metadata estática.',
      'Una `RouteReuseStrategy` puede conservar la instancia y el DOM de una ruta al navegar. También conserva memoria, estado y suscripciones; una política de invalidación decide cuándo destruir ese snapshot.',
      '`RouterTestingHarness` crea un router de prueba, navega por URL y expone el componente activado. Permite comprobar parámetros inválidos, redirects, guards rechazados y errores de resolvers desde el comportamiento observable.',
    ],
    questions: [
      {
        question: '¿Guard equivale a seguridad?',
        answer:
          'No. Un usuario controla el cliente. El guard mejora UX y evita navegación accidental; la API autoriza cada operación.',
      },
      {
        question: '¿Resolver o carga en componente?',
        answer:
          'Resolver cuando la vista no tiene sentido sin el dato o necesitás coherencia antes de activar. Carga en componente para streaming, skeletons o contenido parcial.',
      },
      {
        question: '¿Qué diferencia hay entre `CanMatch` y `CanActivate`?',
        answer:
          '`CanMatch` decide si una configuración de ruta puede participar del matching y permite probar otra ruta. `CanActivate` actúa después de elegirla y decide si se activa. Ninguno reemplaza la autorización del servidor.',
      },
      {
        question: '¿Cuándo evitarías un resolver?',
        answer:
          'Evito bloquear navegación para datos secundarios o lentos. La pantalla puede mostrar estructura, loading y recuperación parcial. Uso resolver cuando el dato define si la ruta tiene sentido o cuando entrar sin él produciría un estado inválido.',
      },
    ],
  },
  {
    id: 'formularios-complejos',
    number: '15',
    groupId: 'angular-core',
    title: 'Formularios complejos',
    intro:
      'Los formularios Senior incluyen tipado, composición, validación asíncrona, accesibilidad y rendimiento.',
    theory: [
      'Reactive Forms modela el formulario en TypeScript; template-driven sirve para casos pequeños. Typed Forms reduce casts y errores.',
      '`FormControl`, `FormGroup`, `FormArray` y `FormRecord` cubren formas fijas, listas y claves dinámicas.',
      'Un validador síncrono devuelve `ValidationErrors | null`; uno asíncrono devuelve Promise u Observable y necesita cancelación o debounce según el caso.',
      '`ControlValueAccessor` conecta un control propio con Angular Forms mediante cuatro operaciones: escribir un valor, registrar cambios, registrar touched y aplicar disabled. El control no debe volver a emitir como cambio el valor que Forms acaba de escribirle, porque eso crea un loop.',
      'Copiar cada emisión de `valueChanges` a otro objeto crea dos representaciones del formulario que pueden divergir. El `FormGroup` puede ser la fuente de verdad durante la edición y el submit puede mapear su valor a un comando o DTO.',
      'Los errores se muestran después de interacción o submit para evitar ruido antes de que el usuario actúe. `aria-describedby` asocia el mensaje con el control; el foco debe llegar al primer campo inválido cuando un submit no puede continuar.',
      'Signal Forms ofrece un modelo nuevo en versiones recientes. Presentalo como opción a evaluar, no como reemplazo automático de Reactive Forms.',
    ],
    questions: [
      {
        question: '¿Cómo diseñarías 60 formularios dinámicos?',
        answer:
          'Defino un schema tipado, componentes por tipo de campo, reglas de visibilidad derivadas y validadores registrables. Separo datos, layout y comportamiento; pruebo el motor con casos de contrato.',
      },
      {
        question: '¿Qué falla en un CVA?',
        answer:
          'Emitir durante `writeValue`, olvidar estado disabled o no marcar touched. Eso crea loops y rompe la semántica del formulario.',
      },
      {
        question: '¿Qué contrato debe cumplir un `ControlValueAccessor`?',
        answer:
          'Debe escribir el valor externo sin emitir un cambio de usuario, registrar callbacks de cambio y touched, y respetar el estado disabled. También necesita una representación clara para null y valores parciales.',
      },
      {
        question: '¿Cómo evitás carreras en validación asíncrona?',
        answer:
          'Modelo la validación como un flujo que cancela la consulta anterior al cambiar el valor. Aplico debounce cuando corresponde y distingo error de transporte, valor inválido y estado pendiente en la interfaz.',
      },
    ],
  },
  {
    id: 'http-apis-errores-y-cache',
    number: '16',
    groupId: 'angular-core',
    title: 'HTTP, APIs, errores y caché',
    intro:
      'El cliente debe modelar contratos, cancelación y fallos. Los interceptors resuelven preocupaciones transversales, no lógica de dominio.',
    theory: [
      '`provideHttpClient` registra el cliente HTTP y los interceptors funcionales forman una cadena alrededor de cada request. Los servicios o repositorios de feature encapsulan URLs, DTOs y reglas de acceso para que los componentes dependan del dominio.',
      'Los tipos de TypeScript desaparecen al compilar y no validan el JSON recibido. Un schema runtime comprueba datos externos antes de usarlos; un mapper traduce el DTO del servidor a un modelo interno estable.',
      'Un interceptor puede agregar autenticación, correlation IDs y telemetría, o normalizar errores. Un loader global necesita contar requests concurrentes: un booleano se apaga cuando termina la primera aunque otras sigan activas.',
      'Un retry repite una operación que falló. Los métodos idempotentes pueden repetirse sin cambiar el resultado; una escritura necesita una clave de idempotencia si existe riesgo de duplicación. Backoff, jitter y un límite evitan amplificar una caída, y los errores funcionales 4xx requieren otra acción.',
      'Timeout, cancelación, offline, fallo de red, 401/403, 404, validación y 5xx representan estados distintos. La interfaz puede ofrecer reintento para red o timeout, login para 401, corrección de campos para validación y un fallback ante errores del servidor.',
      '`httpResource` conecta `HttpClient` con una API de signals para request, valor, loading y error. En dominios grandes, la estrategia todavía necesita claves de caché, invalidación, aislamiento por usuario y coordinación con otras escrituras.',
      'Una caché se define por su clave, vida útil, política de invalidación y aislamiento. La deduplicación comparte una petición en curso; stale-while-revalidate entrega el valor anterior mientras actualiza. Incluir el usuario o tenant en la clave evita mezclar datos privados.',
    ],
    questions: [
      {
        question: '¿Dónde refrescarías un token?',
        answer:
          'En una capa de autenticación coordinada por interceptor, con una sola renovación en vuelo y cola controlada. Evito loops y limpio sesión si falla el refresh.',
      },
      {
        question: '¿Cómo tipar una respuesta HTTP?',
        answer:
          'El generic de HttpClient expresa la expectativa, no valida el servidor. En una frontera crítica valido y transformo el DTO antes de exponerlo.',
      },
      {
        question: '¿Por qué importa el orden de los interceptors?',
        answer:
          'Cada interceptor envuelve al siguiente. El request avanza en el orden registrado y la respuesta vuelve en orden inverso. Autenticación, retry, caché y logging pueden cambiar su comportamiento según esa composición.',
      },
      {
        question: '¿Cómo invalidás una caché después de una mutación?',
        answer:
          'Relaciono cada escritura con las keys afectadas. Puedo invalidar, actualizar de forma optimista o reemplazar con la respuesta del servidor. La política incluye rollback y evita borrar datos de dominios no relacionados.',
      },
    ],
  },
  {
    id: 'browser-internals-dom-storage-y-red',
    number: '17',
    groupId: 'arquitectura',
    title: 'Browser internals, DOM, storage y red',
    intro:
      'Angular corre sobre la plataforma web. Un Senior entiende el costo de DOM, layout, almacenamiento, navegación y protocolos.',
    theory: [
      'DOM representa el documento; BOM agrupa APIs del navegador como `window`, history, location, navigator y screen. Angular abstrae parte del DOM, pero no reemplaza la plataforma.',
      'Selección: `querySelector`, `querySelectorAll`, `getElementById`. Eventos atraviesan capture, target y bubble. Delegation aprovecha bubbling para manejar listas dinámicas.',
      '`preventDefault` evita la acción por defecto; `stopPropagation` detiene propagación. Usarlos sin entender semántica rompe formularios, enlaces y accesibilidad.',
      'El navegador parsea HTML y CSS, construye DOM y CSSOM, calcula estilos y layout, pinta y compone capas. Leer layout después de escribir estilos puede forzar reflow.',
      '`localStorage` persiste por origin y ofrece API síncrona; `sessionStorage` vive por pestaña; IndexedDB almacena datos estructurados de forma asíncrona. Cookies viajan según sus atributos y reglas de request.',
      'Same-origin combina scheme, host y port. CORS permite que un servidor autorice lecturas cross-origin; la preflight OPTIONS valida ciertos métodos y headers.',
      'HTTP cache usa `Cache-Control`, validators como ETag y claves que pueden variar. Service Worker puede interceptar requests y agrega otra capa de cache e invalidación.',
      'DNS resuelve host; TLS autentica y cifra; HTTP transporta requests. HTTP/2 multiplexa streams; HTTP/3 usa QUIC sobre UDP.',
      'SPA actualiza vistas sin recargar documento. History API mantiene URL; el servidor debe redirigir rutas de app al HTML o renderizarlas.',
      'Web Worker ejecuta JavaScript fuera del main thread y se comunica por mensajes. No accede al DOM. Service Worker opera como proxy de red y ciclo separado.',
    ],
    questions: [
      {
        question: '¿DOM y BOM?',
        answer:
          'DOM modela el documento. BOM reúne objetos y APIs del entorno del navegador, como history, location y navigator.',
      },
      {
        question: '¿localStorage, sessionStorage o IndexedDB?',
        answer:
          'Elijo localStorage para pocas preferencias no sensibles, sessionStorage para vida de pestaña e IndexedDB para volumen, queries y trabajo asíncrono.',
      },
      {
        question: '¿Qué es CORS?',
        answer:
          'Una política del navegador que permite al servidor declarar qué origins pueden leer una respuesta. No protege endpoints de clientes no navegador ni reemplaza autorización.',
      },
      {
        question: '¿Reflow y repaint?',
        answer:
          'Layout recalcula geometría; paint genera píxeles; compositing combina capas. Cambios y lecturas intercaladas pueden forzar trabajo síncrono.',
      },
      {
        question: '¿Qué produce un forced synchronous layout?',
        answer:
          'Una escritura invalida estilos o layout y una lectura geométrica posterior, como `getBoundingClientRect`, obliga al navegador a calcular el resultado en ese momento. Agrupo lecturas y escrituras para evitar repetir ese trabajo dentro de un loop.',
      },
      {
        question: '¿CORS protege una API contra clientes no autorizados?',
        answer:
          'No. CORS controla qué respuestas puede leer JavaScript desde otro origin en un navegador. Un script de servidor puede llamar al endpoint. La API todavía necesita autenticación, autorización y validación.',
      },
    ],
  },
  {
    id: 'arquitectura-de-aplicaciones-angular',
    number: '18',
    groupId: 'arquitectura',
    title: 'Arquitectura de aplicaciones Angular',
    intro:
      'Una arquitectura útil reduce acoplamiento y hace visibles los límites del dominio.',
    theory: [
      'La organización por feature agrupa UI, acceso a datos, modelos y rutas que cambian por la misma capacidad de producto. Una organización global por tipo técnico dispersa una modificación entre carpetas distantes y debilita los límites de dominio.',
      'Un componente presentacional recibe datos y emite eventos; un orquestador coordina estado, navegación y servicios. La separación reduce dependencias cuando varias vistas reutilizan la presentación, pero añade capas vacías si ambas piezas cambian siempre juntas.',
      'Dependency inversion hace que el dominio dependa de un contrato estable y que el detalle implemente ese contrato. En Angular, un `InjectionToken` más un adapter permite cambiar analytics, storage, pagos o una API externa sin modificar consumidores.',
      'La public API de una librería o feature declara qué símbolos pueden consumir otros módulos. Los imports profundos atraviesan ese límite, acoplan al árbol interno de archivos y convierten un refactor local en un cambio global.',
      'Un monorepo mejora sharing y refactors coordinados; agrega costo de tooling y ownership. Nx puede imponer boundaries y cachear tareas.',
      'Micro-frontends sirven para despliegue y ownership independientes. Aumentan duplicación, integración, observabilidad y consistencia visual.',
      'Un Architecture Decision Record conserva el contexto, las alternativas evaluadas, la decisión, sus consecuencias y una fecha de revisión. El registro explica por qué existe una restricción cuando cambia el equipo o el contexto original.',
    ],
    questions: [
      {
        question: '¿Clean Architecture en frontend?',
        answer:
          'Uso sus límites y dependency inversion donde protegen reglas de negocio. Evito copiar capas backend si solo agregan archivos y mapeos.',
      },
      {
        question: '¿Cuándo extraer una librería?',
        answer:
          'Cuando existe un contrato estable y más de un consumidor real, o cuando el límite necesita ownership y tests propios. Extraer por anticipación congela APIs inmaduras.',
      },
      {
        question: '¿Cómo detectás una frontera de feature incorrecta?',
        answer:
          'Aparecen imports circulares, cambios coordinados entre carpetas supuestamente independientes y servicios compartidos que conocen todos los dominios. Reubico el comportamiento según ownership y expongo una API pequeña por frontera.',
      },
      {
        question: '¿Qué problema genera una carpeta `shared` sin reglas?',
        answer:
          'Recibe componentes, modelos y servicios de dominios distintos hasta convertirse en una dependencia global. Separo primitives reutilizables de contratos de negocio y dejo cada modelo cerca de la feature que lo posee.',
      },
    ],
  },
  {
    id: 'patrones-solid-y-calidad-de-diseno',
    number: '19',
    groupId: 'arquitectura',
    title: 'Patrones, SOLID y calidad de diseño',
    intro:
      'Los patrones nombran soluciones recurrentes. Una entrevista Senior espera contexto y costo, no una lista memorizada.',
    theory: [
      'Strategy para políticas intercambiables; Adapter para integrar contratos externos; Facade para reducir superficie; Factory para construcción variable.',
      'Observer aparece en RxJS; Decorator en metadata e interceptors; Command y event patterns aparecen en stores. Singleton depende del injector.',
      'SRP separa motivos de cambio. OCP favorece extensión por contratos. LSP exige sustitución válida. ISP mantiene contratos pequeños. DIP invierte dependencias hacia abstracciones.',
      'Composition over inheritance evita jerarquías rígidas. Las directivas, providers y content projection forman mecanismos de composición.',
      'Un god service acumula motivos de cambio; un shared module masivo crea dependencias implícitas; los barrel cycles ocultan ciclos; los boolean flags multiplican estados; las subscriptions anidadas pierden control de concurrencia y la lógica de negocio en templates se repite y resulta difícil de probar.',
    ],
    questions: [
      {
        question: '¿Cómo implementar Singleton?',
        answer:
          'En Angular proveo el servicio en un injector compartido. La garantía vale dentro de ese scope; providers locales o múltiples aplicaciones crean otras instancias.',
      },
      {
        question: '¿Facade sobre NgRx?',
        answer:
          'Puede estabilizar la API de la feature y ocultar detalles del store. También puede esconder capacidades y duplicar nombres. La uso cuando protege un límite real.',
      },
      {
        question: '¿Cómo aplicás Dependency Inversion en Angular?',
        answer:
          'El consumidor depende de un contrato expresado por una clase abstracta o `InjectionToken`. La configuración conecta ese contrato con una implementación. Puedo cambiar la frontera en tests o por entorno sin enseñar detalles al consumidor.',
      },
      {
        question: '¿Cuándo una facade empeora el diseño?',
        answer:
          'Una facade que sólo renombra cada método añade navegación sin reducir acoplamiento. La uso cuando concentra un caso de uso, oculta coordinación entre dependencias o protege a la UI de cambios del subsistema.',
      },
    ],
  },
  {
    id: 'rendimiento-y-core-web-vitals',
    number: '20',
    groupId: 'calidad-operacion',
    title: 'Rendimiento y Core Web Vitals',
    intro:
      'Optimizar sin medir cambia complejidad por intuición. Un Senior identifica la métrica, captura un perfil y verifica el resultado.',
    theory: [
      'LCP mide cuándo aparece el mayor elemento visible, INP observa la latencia de las interacciones y CLS acumula desplazamientos inesperados. Bundle size, long tasks, memoria y frecuencia de renders explican sus causas. Lighthouse usa un entorno sintético; RUM registra dispositivos y redes reales.',
      'Lazy routes y `@defer` sacan JavaScript del bundle inicial. El beneficio depende del waterfall de chunks, preloading, prefetch y caché HTTP: demasiadas fronteras pequeñas pueden intercambiar bytes iniciales por latencia de red.',
      '`OnPush` permite saltar subárboles sin notificaciones, signals marcan consumidores precisos y un `track` estable conserva nodos de una lista. Virtual scroll limita el DOM visible; la paginación reduce además datos transferidos y trabajo del servidor.',
      'Una pipe impura y una función costosa en template pueden ejecutarse en cada check. Listeners globales sin cleanup retienen vistas, las imágenes sin dimensiones causan CLS y una dependencia grande aumenta parse, compile y ejecución además de transferencia.',
      'AOT, tree shaking, budgets y source-map analysis detectan regresiones. Un import pequeño puede arrastrar una dependencia grande.',
      'Las escrituras DOM invalidan estilos y las lecturas geométricas pueden forzar su cálculo. Agrupar ambas fases evita layout thrashing. Debounce reduce eventos de alta frecuencia; un Web Worker descarga CPU cuando el costo de serializar mensajes resulta menor que bloquear el main thread.',
    ],
    questions: [
      {
        question: 'La app está lenta, ¿por dónde empezás?',
        answer:
          'Defino la interacción lenta, reproduzco con datos reales y grabo performance. Identifico red, scripting, layout o memoria; cambio una causa y vuelvo a medir.',
      },
      {
        question: '¿`trackBy` sigue existiendo?',
        answer:
          'En `*ngFor` sí. El control flow moderno usa `track`. Ambos preservan identidad DOM; una clave inestable anula el beneficio.',
      },
      {
        question: '¿Cómo empezás una investigación de rendimiento?',
        answer:
          'Defino una interacción y una métrica, reproduzco con una build de producción y capturo un perfil. Después separo red, scripting, render y memoria. Optimizo el cuello medido y vuelvo a comparar bajo las mismas condiciones.',
      },
      {
        question: '¿OnPush corrige una tarea larga de JavaScript?',
        answer:
          'No. OnPush puede reducir verificaciones de vistas, pero una función que ocupa el main thread sigue bloqueando input y render. Divido el trabajo, reduzco su complejidad o lo muevo a un Worker si el costo de mensajes lo permite.',
      },
    ],
  },
  {
    id: 'ssr-ssg-hidratacion-y-rendering-hibrido',
    number: '21',
    groupId: 'calidad-operacion',
    title: 'SSR, SSG, hidratación y rendering híbrido',
    intro:
      'Elegí estrategia por ruta. SEO, personalización, costo de servidor y tiempo de interacción empujan decisiones distintas.',
    theory: [
      'CSR simplifica aplicaciones privadas. SSG sirve contenido estable. SSR sirve HTML fresco y SEO. Hybrid combina estrategias por ruta.',
      'Hydration reutiliza el HTML del servidor. El cliente debe producir una estructura compatible; DOM inválido o manipulación directa rompe el proceso.',
      'Incremental hydration activa sectores cuando se necesitan y trabaja con `@defer`. Event replay conserva interacciones previas a la hidratación.',
      '`window`, `document`, storage y otras APIs del navegador no existen durante SSR. Platform checks, tokens inyectables y render hooks aíslan ese código para que el servidor pueda construir el HTML sin acceder al entorno cliente.',
      'Transfer cache reutiliza en el cliente ciertas respuestas obtenidas durante SSR y evita una segunda petición inmediata. La clave y el HTML generado deben aislar datos por usuario para impedir que una respuesta privada termine en otra sesión.',
      'Un placeholder con las mismas dimensiones que el contenido final reserva espacio y reduce CLS. El contenido above-the-fold participa en LCP y suele cargarse antes; los bloques secundarios admiten lazy loading o hidratación diferida.',
    ],
    questions: [
      {
        question: '¿SSR mejora todo el rendimiento?',
        answer:
          'Mejora entrega de HTML y SEO, pero agrega servidor e hidratación. Puede empeorar TTFB o interacción si el backend y el bundle no acompañan.',
      },
      {
        question: '¿Qué causa hydration mismatch?',
        answer:
          'HTML diferente entre servidor y cliente, fechas o random no deterministas, DOM manipulado antes de hidratar y markup inválido.',
      },
      {
        question: '¿Cómo elegís estrategia de rendering por ruta?',
        answer:
          'Uso SSG para contenido estable, SSR para HTML dependiente de la request y CSR para áreas privadas donde el shell aporta poco al servidor. Evalúo SEO, personalización, latencia, caché y costo operativo por ruta.',
      },
      {
        question: '¿Qué causa un hydration mismatch?',
        answer:
          'El cliente produce un árbol distinto al HTML del servidor por datos no deterministas, acceso al navegador o markup condicional. Comparto el estado inicial, aíslo APIs del browser y mantengo estable la estructura hasta hidratar.',
      },
    ],
  },
  {
    id: 'testing-y-estrategia-de-calidad',
    number: '22',
    groupId: 'calidad-operacion',
    title: 'Testing y estrategia de calidad',
    intro:
      'Una suite Senior protege comportamiento y contratos. Evitá tests que copian la implementación.',
    theory: [
      'Pirámide práctica: muchas pruebas de lógica, componentes para comportamiento DOM, integración en fronteras y pocos E2E de journeys críticos.',
      'Angular moderno documenta Vitest junto con TestBed. Bases existentes pueden usar Jasmine/Jest; la estrategia importa más que la sintaxis.',
      'Un test de componente interactúa con el DOM mediante roles, labels y eventos, y comprueba el resultado visible. Los métodos privados y la estructura interna son detalles de implementación; afirmar sobre ellos vuelve frágil el test ante refactors sin cambio de comportamiento.',
      '`HttpTestingController` intercepta requests de `HttpClient` y permite afirmar método, URL, body y headers antes de responder con éxito o error. `verify()` comprueba al final que ninguna petición haya quedado pendiente.',
      '`RouterTestingHarness` simplifica navegación. Los component harnesses crean APIs de prueba estables para UI reutilizable.',
      'Fake timers controlan el reloj de debounce, retry y delays sin esperar tiempo real. Los marble tests representan emisiones RxJS sobre una línea temporal virtual y sirven cuando el orden y la concurrencia forman parte del contrato.',
      'Un mock reemplaza una frontera y permite aislar la unidad, pero demasiados mocks pueden describir una integración que ningún proveedor real soporta. Los contract tests verifican que DTOs, adapters y clientes respeten el mismo contrato.',
    ],
    questions: [
      {
        question: '¿Qué test escribirías primero?',
        answer:
          'El riesgo más caro: regla de dominio, permiso, pago, migración o interacción que ya falló. La cobertura porcentual no reemplaza esa priorización.',
      },
      {
        question: '¿Unit test de un componente con servicio?',
        answer:
          'Sustituyo la frontera del servicio, ejecuto la interacción por el DOM y verifico el resultado visible y la llamada relevante. No pruebo Angular.',
      },
      {
        question: '¿Qué probás en una unidad y qué dejás para integración?',
        answer:
          'Una unidad cubre reglas puras y estados con pocas fronteras. Un test de integración comprueba template, DI, router o HTTP cuando su composición forma parte del comportamiento. Elijo el nivel más bajo que todavía puede detectar el fallo real.',
      },
      {
        question: '¿Cómo eliminás un test asíncrono flaky?',
        answer:
          'Controlo reloj, scheduler y respuestas externas. Espero una condición observable en lugar de usar delays arbitrarios, cierro requests pendientes y elimino estado compartido entre casos.',
      },
    ],
  },
  {
    id: 'seguridad-web-en-angular',
    number: '23',
    groupId: 'calidad-operacion',
    title: 'Seguridad web en Angular',
    intro:
      'Angular escapa y sanitiza varios bindings, pero el equipo todavía controla autenticación, autorización, dependencias y datos peligrosos.',
    theory: [
      'Interpolación y property binding tratan valores como datos. `[innerHTML]` pasa por sanitización; URLs de recursos y bypass APIs requieren revisión estricta.',
      '`DomSanitizer.bypassSecurityTrust*` no limpia contenido: crea un valor que omite la sanitización de Angular. Su uso concentra una decisión de confianza y necesita una fuente controlada, revisión y auditoría.',
      'Content Security Policy limita los orígenes y tipos de recursos que puede ejecutar el navegador. Trusted Types obliga a que sinks DOM peligrosos reciban valores creados por políticas registradas. Juntas reducen el impacto de una inyección que llega al DOM.',
      'CSRF aprovecha credenciales que el navegador adjunta de forma automática, como cookies. SameSite, un token XSRF y la validación del servidor prueban que la petición salió de la aplicación esperada. Un bearer token evita ese mecanismo, pero puede ser robado por XSS según dónde se almacene.',
      'Un guard decide navegación en el cliente y mejora la experiencia, pero el usuario puede omitirlo o llamar la API de forma directa. La API debe comprobar permisos y ownership para cada operación.',
      'El bundle frontend y sus variables de entorno llegan al navegador y cualquier usuario puede inspeccionarlos. Claves privadas, credenciales de servicio y secretos pertenecen al servidor o a un gestor de secretos.',
      'Las versiones soportadas de Angular reciben correcciones; el lockfile fija el grafo instalado. Una auditoría de supply chain revisa vulnerabilidades, paquetes abandonados, scripts de instalación y cambios inesperados de mantenedor.',
    ],
    questions: [
      {
        question: '¿Angular evita XSS?',
        answer:
          'Reduce XSS al escapar y sanitizar contextos conocidos. DOM APIs directas, bypass, librerías y HTML externo reabren el riesgo.',
      },
      {
        question: '¿LocalStorage o cookies para tokens?',
        answer:
          'Depende del modelo de amenaza. Cookies HttpOnly reducen lectura por XSS y exigen CSRF controls. LocalStorage simplifica headers pero expone el token a JavaScript comprometido.',
      },
      {
        question: '¿Qué implica usar `bypassSecurityTrustHtml`?',
        answer:
          'La llamada no sanitiza el contenido. Declara que la aplicación confía en esa fuente y evita la protección de Angular para ese sink. La restrinjo a una frontera revisada y prefiero transformar datos antes de producir HTML.',
      },
      {
        question: '¿Por qué un route guard no autoriza una operación?',
        answer:
          'El usuario controla el cliente y puede omitir la navegación o llamar la API de forma directa. El guard mejora la experiencia. El servidor verifica identidad, permisos y ownership en cada operación.',
      },
    ],
  },
  {
    id: 'accesibilidad-html-y-css',
    number: '24',
    groupId: 'calidad-operacion',
    title: 'Accesibilidad, HTML y CSS',
    intro:
      'La accesibilidad forma parte del contrato de UI. Un Senior la integra en componentes y Definition of Done.',
    theory: [
      'HTML semántico aporta nombre, rol y comportamiento nativo. `button` ejecuta acciones, `a` con `href` navega, los headings forman el índice, `label` nombra controles y los landmarks permiten saltar entre regiones.',
      'La navegación por teclado necesita un orden de foco que siga la lectura y un indicador visible. Un modal mueve el foco a su interior, impide escapar al contenido de fondo, anuncia su nombre y devuelve el foco al elemento que lo abrió.',
      'ARIA añade nombre, rol, estado o relaciones cuando HTML nativo no alcanza. No incorpora por sí sola teclado ni comportamiento; un `div role=button` todavía necesita foco y activación con Enter y Space.',
      'Los errores asociados mediante `aria-describedby` se leen junto al control. Una live region anuncia cambios asíncronos que no reciben foco, como el resultado de una operación o una validación remota.',
      'CSS: cascade, specificity, stacking contexts, box model, Flexbox, Grid, container/media queries y responsive images.',
      'Zoom, texto largo y localización cambian las dimensiones del contenido; contraste y high contrast cambian su percepción; reduced motion limita animaciones. Un componente flexible conserva lectura, foco y controles sin depender de alturas fijas.',
    ],
    questions: [
      {
        question: '¿Div con click o button?',
        answer:
          'Button aporta teclado, foco, rol y activación sin recrear comportamiento. Un div exige implementar y mantener todo eso.',
      },
      {
        question: '¿Cómo probás accesibilidad?',
        answer:
          'Combino lint y axe con teclado real, lector de pantalla en flujos críticos y revisión de foco, contraste y nombres accesibles.',
      },
      {
        question: '¿Cuándo ARIA empeora un componente?',
        answer:
          'ARIA puede contradecir la semántica nativa o anunciar un estado que el comportamiento no implementa. Empiezo por el elemento HTML correcto y agrego nombre, estado o relaciones sólo cuando falta información.',
      },
      {
        question: '¿Cómo manejás el foco de un modal?',
        answer:
          'Muevo el foco a un punto útil dentro del diálogo, mantengo la navegación en su contenido, cierro con Escape cuando corresponde y devuelvo el foco al disparador. El diálogo también necesita nombre y fondo inerte.',
      },
    ],
  },
  {
    id: 'build-ci-cd-configuracion-y-upgrades',
    number: '25',
    groupId: 'calidad-operacion',
    title: 'Build, CI/CD, configuración y upgrades',
    intro:
      'El frontend llega a producción mediante una cadena que también necesita diseño y ownership.',
    theory: [
      'La configuración de build contiene valores públicos que pueden quedar embebidos en los bundles. Los secretos permanecen fuera del frontend. Validar la configuración al arrancar detecta URLs o flags faltantes y evita que cada entorno interprete defaults distintos.',
      'Un pipeline de CI ejecuta typecheck, lint, unit tests, build con budgets y recorridos críticos antes de publicar. Una caché usa el lockfile y la configuración como parte de su clave para no reutilizar dependencias o resultados incompatibles.',
      'Los assets con hash pueden usar caché larga porque una modificación cambia su URL. El HTML conserva una política corta para descubrir el release nuevo. Un rollback necesita artefactos anteriores y compatibilidad temporal entre el frontend nuevo y la versión previa de la API.',
      'Un feature flag separa despliegue de exposición. Owner, métricas y fecha de retiro controlan su ciclo de vida; un flag permanente mantiene dos caminos de código y duplica combinaciones de prueba.',
      '`ng update` y los schematics transforman configuración y código para una versión nueva. Actualizar una major por vez reduce combinaciones no soportadas; las deprecations, el bundle y las métricas runtime muestran qué trabajo queda después de compilar.',
      'Los source maps relacionan el bundle minificado con el TypeScript original. En producción requieren acceso restringido porque revelan estructura y código; asociarlos con release, commit y evento permite reconstruir el stack correcto.',
    ],
    questions: [
      {
        question: '¿Cómo desplegás sin romper usuarios con pestañas abiertas?',
        answer:
          'Mantengo compatibilidad temporal de API, manejo chunk-load errors, uso assets versionados y evito borrar archivos previos antes de que expire su caché.',
      },
      {
        question: '¿Qué mirás después de un upgrade?',
        answer:
          'Errores, tests, bundle, Web Vitals, warnings, cambios de browser support y dependencias pares. Después retiro compatibilidad obsoleta.',
      },
      {
        question: '¿Cómo diseñás un feature flag seguro?',
        answer:
          'Defino owner, audiencia, fallback, métricas y fecha de retiro. El backend mantiene las reglas de autorización. Los dos caminos permanecen probados mientras el flag exista y retiro el código cuando termina el rollout.',
      },
      {
        question: '¿Publicarías source maps en producción?',
        answer:
          'Los genero para relacionar errores minificados con el TypeScript, pero restrinjo su acceso al sistema de observabilidad. Asocio cada mapa con release y commit para simbolizar el stack correcto.',
      },
    ],
  },
  {
    id: 'observabilidad-errores-y-debugging',
    number: '26',
    groupId: 'calidad-operacion',
    title: 'Observabilidad, errores y debugging',
    intro:
      'Un Senior diseña cómo detectar y explicar fallos antes de que aparezca el incidente.',
    theory: [
      'La frontera global captura errores que ninguna feature manejó. El registro conserva tipo, causa y contexto técnico sin exponer stack traces, tokens ni datos personales en la interfaz.',
      'Release, ruta, acción, correlation ID, usuario anonimizado y breadcrumbs permiten reconstruir una falla. El mismo correlation ID propagado por gateway y backend conecta el error del navegador con logs y traces del servidor.',
      'La tasa de errores indica frecuencia, la latencia por endpoint localiza esperas, Web Vitals describe experiencia de render e interacción y el éxito de journeys mide tareas completas. Un log sin una pregunta operativa ni una acción asociada añade volumen sin diagnóstico.',
      'Angular DevTools muestra árbol, DI y profiling. Chrome Performance, Network, Memory y Coverage completan el diagnóstico.',
      'Un leak se vuelve visible al repetir navegación y comparar heap snapshots. Detached DOM nodes, listeners, timers y caches sin límite muestran qué referencia mantiene viva una vista que Angular ya destruyó.',
      'Un error boundary de feature contiene el fallo y ofrece una salida: retry, fallback, estado parcial o contacto de soporte. Un toast genérico desaparece y no conserva la operación que el usuario necesita recuperar.',
    ],
    questions: [
      {
        question: '¿Cómo investigás un bug que no reproducís?',
        answer:
          'Aumento contexto observable, comparo versión, navegador y ruta de datos, y creo una hipótesis verificable. Evito cambios especulativos sin señal.',
      },
      {
        question: '¿Qué reportarías en un error HTTP?',
        answer:
          'Endpoint normalizado, status, duración, correlation ID y operación. Redacto o elimino body, tokens y datos personales.',
      },
      {
        question: '¿Cómo usás un correlation ID desde el frontend?',
        answer:
          'Propago un identificador permitido en requests y lo registro junto con ruta, release y acción. Backend y gateway conservan el mismo valor para unir el fallo visible con logs y traces sin guardar datos personales.',
      },
      {
        question: '¿Cómo confirmás un memory leak de navegación?',
        answer:
          'Repito el recorrido, fuerzo garbage collection en un entorno de diagnóstico y comparo heap snapshots. Busco componentes retenidos, detached DOM nodes, listeners, timers y caches que conservan referencias.',
      },
    ],
  },
  {
    id: 'system-design-frontend',
    number: '27',
    groupId: 'criterio-senior',
    title: 'System design frontend',
    intro:
      'En una entrevista de diseño, empezá por requisitos y recorré datos, límites, fallos, rendimiento y operación.',
    theory: [
      'Los usuarios, flujos críticos, SEO, offline, tiempo real, volumen, permisos, localización y objetivos de rendimiento forman las restricciones del diseño. Cada restricción modifica las fronteras, la estrategia de datos o el modo de rendering.',
      'Un diagrama frontend ubica features, router, estado, API layer, componentes compartidos y fronteras de dominio. La propiedad de cada dato determina quién puede escribirlo, quién lo deriva y cuánto tiempo debe vivir.',
      'Una estrategia de caché define key, TTL e invalidación. La consistencia establece cuándo aceptar datos stale, cómo reconciliar optimistic updates, qué hacer ante conflictos y cómo mantener cursores o páginas al cambiar la colección.',
      'WebSocket ofrece comunicación bidireccional persistente, SSE envía un stream unidireccional sobre HTTP y polling repite requests. La solución necesita reconexión, orden, deduplicación y backpressure para no procesar eventos más rápido de lo que la UI puede consumirlos.',
      'Un diseño completo incluye autorización, accesibilidad, telemetría, niveles de prueba, estrategia de despliegue y migración. Esas fronteras determinan si el sistema puede operarse y evolucionar después del primer release.',
      'La primera versión cubre la escala y los riesgos conocidos con el menor número de piezas. Umbrales observables, como latencia, volumen o frecuencia de incidentes, indican cuándo una estrategia deja de servir y justifican el siguiente cambio.',
    ],
    questions: [
      {
        question: 'Diseñá un dashboard con datos en vivo',
        answer:
          'Agrupo widgets por frecuencia y ownership, uso un servicio de conexión con multiplexing, normalizo eventos, aplico backpressure y renderizo con signals. Pauso streams invisibles y mido INP.',
      },
      {
        question: 'Diseñá una librería de componentes',
        answer:
          'Defino tokens de diseño, accesibilidad y APIs pequeñas; publico harnesses, documentación y semver. Pruebo keyboard, themes, SSR y breaking changes.',
      },
      {
        question: '¿Cómo elegís entre WebSocket, SSE y polling?',
        answer:
          'WebSocket sirve para comunicación bidireccional, SSE para un stream servidor a cliente sobre HTTP y polling para cambios poco frecuentes o infraestructura simple. Comparo reconexión, proxies, orden, volumen y soporte del backend.',
      },
      {
        question: '¿Qué debe definir una estrategia de caché?',
        answer:
          'Define key, TTL, invalidación, deduplicación y comportamiento stale. También explica cómo reconciliar optimistic updates, conflictos y cambios de paginación sin mezclar datos de usuarios o filtros distintos.',
      },
    ],
  },
  {
    id: 'liderazgo-tecnico-y-trabajo-en-equipo',
    number: '28',
    groupId: 'criterio-senior',
    title: 'Liderazgo técnico y trabajo en equipo',
    intro:
      'El nivel Senior incluye decisiones compartidas, mentoring, manejo de incidentes y entrega predecible.',
    theory: [
      'Un code review evalúa corrección, seguridad, diseño y tests. Un comentario bloqueante describe un defecto que impide integrar; una sugerencia propone una mejora opcional. Explicar el motivo permite que el autor aplique el criterio en código futuro.',
      'Una decisión técnica documentada contiene contexto, alternativas y consecuencias. La fecha de revisión evita tratar como permanente una elección tomada bajo restricciones que pueden cambiar.',
      'Mentoring hace visible el modelo mental, aumenta la dificultad de forma gradual y devuelve la decisión a quien aprende. Resolver cada problema por la otra persona concentra conocimiento y convierte al mentor en cuello de botella.',
      'Durante un incidente, el equipo primero estabiliza el servicio, comunica impacto, asigna roles y conserva evidencia. El postmortem reconstruye causas y cambia código, alertas o proceso sin buscar culpables.',
      'La negociación de alcance compara riesgo, dependencias, costo de demora y una entrega incremental. Exponer incertidumbre permite reservar tiempo, instrumentar el resultado o reducir el alcance antes de comprometer una fecha.',
      'Lead time, defectos, costo de mantenimiento, adopción y carga cognitiva describen salud técnica desde resultados. Líneas de código y cantidad de tickets premian volumen aunque el sistema sea más complejo o menos estable.',
    ],
    questions: [
      {
        question: '¿Cómo resolvés un desacuerdo técnico?',
        answer:
          'Alineo restricciones, comparo opciones con criterios, hago un spike si falta evidencia y documento la decisión. Después apoyo la opción acordada.',
      },
      {
        question: '¿Cómo manejaste feedback negativo?',
        answer:
          'Describí el caso de modularización de formularios: escuchaste, revisaste estándares, refactorizaste por responsabilidad, pediste otra revisión y aplicaste el aprendizaje.',
      },
      {
        question: '¿Qué convierte un comentario de review en bloqueante?',
        answer:
          'Bloqueo por corrección, seguridad, pérdida de datos, contrato roto o una deuda que impide operar el cambio. Marco preferencias como sugerencias y explico el riesgo para que el autor pueda aplicar el criterio.',
      },
      {
        question: '¿Qué incluís en un ADR?',
        answer:
          'Registro contexto, restricciones, opciones consideradas, decisión y consecuencias. Añado owner y fecha de revisión cuando las condiciones pueden cambiar. El documento permite discutir la elección sin depender de memoria oral.',
      },
    ],
  },
  {
    id: 'como-razonar-y-responder-como-senior',
    number: '29',
    groupId: 'criterio-senior',
    title: 'Cómo razonar y responder como Senior',
    intro:
      'Esta sección convierte conocimiento técnico en respuestas claras. La meta es demostrar qué ocurre, qué decisión tomarías, por qué la tomarías y cómo comprobarías que funcionó.',
    theory: [
      'Respondé primero qué es el concepto en una frase. Después explicá el mecanismo que produce su comportamiento, elegí una aplicación concreta y cerrá con el límite de esa elección. Ejemplo: `switchMap` reemplaza la suscripción interna anterior; lo elegiría en un buscador porque sólo interesa la consulta más reciente, pero no para guardar acciones que deben completarse todas.',
      'Separá mecanismo de decisión. «OnPush reduce comprobaciones» describe un efecto. «Uso OnPush con estado inmutable porque los cambios llegan por inputs y signals» explica una decisión. La segunda respuesta permite evaluar si entendés cuándo la herramienta encaja.',
      'Nombrá las restricciones que cambian la solución: volumen de datos, frecuencia de actualización, SEO, latencia, accesibilidad, seguridad, soporte de navegadores y capacidad del equipo. Si la pregunta no las informa, declaralas como supuestos en vez de inventar un escenario silenciosamente.',
      'Compará alternativas con el mismo criterio. Para cada opción indicá beneficio, costo y modo de falla. Por ejemplo, SSR mejora el HTML inicial y el SEO, pero agrega infraestructura y exige código compatible con servidor; CSR simplifica la operación, pero depende más de JavaScript para el primer contenido.',
      'Explicá cómo validarías la decisión. Rendimiento se comprueba con métricas como LCP, INP, tamaño de bundle o tiempo de tarea; una migración se valida con tests, telemetría, despliegue gradual y rollback; una mejora de equipo se valida con lead time, defectos o carga operativa.',
      'Una respuesta débil enumera herramientas: «usaría Signals, OnPush y lazy loading». Una respuesta sólida conecta problema y evidencia: «el perfil mostró demasiadas vistas comprobadas; moví el estado local a Signals, mantuve referencias inmutables y medí menos scripting sin cambiar el comportamiento».',
      'Si no recordás una API exacta, no inventes. Explicá el modelo que sí conocés, aislá el detalle dudoso y decí cómo lo verificarías en la documentación o con una prueba mínima. El razonamiento correcto es más valioso que una firma memorizada incorrectamente.',
      'Para una experiencia real usá Contexto, Decisión, Acción y Resultado. El resultado debe incluir una señal verificable: latencia, errores, conversión, tiempo de entrega, incidentes evitados o feedback del equipo. Si no hubo medición, decí qué observaste y qué medirías hoy.',
    ],
    questions: [
      {
        question: '¿Qué diferencia una respuesta Senior?',
        answer:
          'No es la cantidad de APIs nombradas. Es poder explicar el mecanismo, elegir según restricciones, comparar alternativas y proponer una forma de validar el resultado. Por ejemplo, no basta con decir «uso `switchMap`»: hay que explicar que conserva sólo la operación interna más reciente y por qué esa política coincide con el problema.',
      },
      {
        question: '¿Qué hacés si no sabés una API exacta?',
        answer:
          'Decí qué parte conocés, razoná desde el modelo de Angular y explicá cómo verificarías el detalle. Inventar una firma daña más que reconocer un borde.',
      },
      {
        question: '¿Cómo evitás responder «depende» sin tomar una posición?',
        answer:
          'Nombrá dos o tres condiciones decisivas, fijá un escenario razonable y elegí. Por ejemplo: «si la página necesita SEO y contenido inicial rápido, elegiría SSR; si es una herramienta interna autenticada, empezaría con CSR». Después explicá qué dato haría cambiar la decisión.',
      },
      {
        question:
          '¿Cómo convertís una opinión en una decisión técnica defendible?',
        answer:
          'Definí el objetivo, compará alternativas con los mismos criterios y acordá una señal de éxito. «Prefiero Signals» es una opinión; «uso Signals para estado local síncrono porque simplifica derivaciones y verifico el impacto con legibilidad, tests y profiling» es una decisión discutible y medible.',
      },
      {
        question: '¿Cómo estructurás una respuesta técnica extensa?',
        answer:
          'Empiezo con una definición de una frase, explico el mecanismo y tomo una decisión para un escenario concreto. Cierro con el costo, la alternativa y cómo comprobaría el resultado. Si la pregunta es amplia, aviso esa estructura para que el entrevistador pueda profundizar donde le interese.',
      },
      {
        question:
          '¿Qué hacés cuando la pregunta no incluye suficiente contexto?',
        answer:
          'Pido las restricciones que realmente cambian la respuesta: volumen, frecuencia de cambio, SEO, latencia, consistencia, seguridad y capacidad del equipo. Si no están disponibles, declaro un supuesto, elijo bajo ese escenario y digo qué dato me haría cambiar de opción.',
      },
    ],
  },
  {
    id: 'preparacion-personal-y-respuestas-conductuales',
    number: '30',
    groupId: 'criterio-senior',
    title: 'Preparación personal y respuestas conductuales',
    intro:
      'Tu experiencia ofrece material sólido. Convertí cada proyecto en evidencia medible y ajustá la introducción al rol.',
    theory: [
      'Un pitch de 60 a 90 segundos conecta especialidad, años de experiencia, dominios, dos logros y motivación para el rol. Recorrer cada empleo del CV consume tiempo sin mostrar el criterio que une la trayectoria.',
      'STAR: situación y tarea breves; acción centrada en tus decisiones; resultado con métrica, aprendizaje o reducción de riesgo.',
      'Un banco conductual cubre conflicto, error, feedback, liderazgo, deadlines, incertidumbre, incidentes, rendimiento y arquitectura. Cada historia puede responder varias preguntas si identifica con precisión la decisión y el resultado.',
      'El caso de formularios dinámicos demuestra arquitectura, Redux o NgRx, escalabilidad y coordinación. Cantidad de formularios, tiempo de entrega y defectos antes y después convierten la historia en evidencia medible.',
      'La experiencia desde Angular 2 permite comparar cambios del framework a través del tiempo. Una adopción acertada muestra beneficio y migración; una API rechazada muestra restricciones y costo que superaban ese beneficio.',
      'Las preguntas al entrevistador revelan arquitectura, prácticas de calidad, organización del equipo, roadmap, manejo de incidentes, autonomía y criterio de éxito. Las respuestas permiten evaluar el alcance real del rol.',
    ],
    questions: [
      {
        question: 'Contame sobre vos',
        answer:
          'Soy Frontend Developer especializado en Angular, con experiencia desde Angular 2 y equipos distribuidos. He diseñado formularios dinámicos a escala y productos de datos. Busco un rol donde pueda combinar arquitectura, entrega y mentoring.',
      },
      {
        question: '¿Por qué querés cambiar?',
        answer:
          'Enfocá crecimiento, alcance técnico y tipo de producto. Evitá hablar mal del equipo actual o usar una respuesta genérica.',
      },
      {
        question:
          '¿Cómo evitás que una respuesta STAR se vuelva demasiado larga?',
        answer:
          'Resumo situación y tarea en pocas frases. Dedico la mayor parte a mis decisiones, alternativas y coordinación. Cierro con un resultado medible y el aprendizaje que cambió mi trabajo posterior.',
      },
      {
        question: '¿Cómo contás un error sin debilitar tu perfil?',
        answer:
          'Elijo un error real, explico la decisión que lo produjo y asumo mi parte. Describo cómo limité el impacto, qué señal agregué y qué cambio de código o proceso evitó repetirlo.',
      },
    ],
  },
];

export const RAPID_QUESTIONS: readonly StudyQuestion[] = [
  {
    id: 'rapid-001-tipos-primitivos',
    question: '¿Tipos primitivos?',
    answer: 'undefined, null, boolean, number, bigint, string y symbol.',
  },
  {
    id: 'rapid-002-typeof-null',
    question: '¿`typeof null`?',
    answer:
      'Devuelve `object` por compatibilidad histórica; verificá null de forma explícita.',
  },
  {
    id: 'rapid-003-nan-nan',
    question: '¿`NaN === NaN`?',
    answer: 'False. Usá `Number.isNaN` u `Object.is`.',
  },
  {
    id: 'rapid-004-null-y-undefined',
    question: '¿`null` y `undefined`?',
    answer:
      'Null suele expresar ausencia intencional; undefined expresa falta de valor o propiedad.',
  },
  {
    id: 'rapid-005-truthy-y-falsy',
    question: '¿Truthy y falsy?',
    answer:
      'La conversión booleana determina branches; objetos y arrays vacíos son truthy.',
  },
  {
    id: 'rapid-006-temporal-dead-zone',
    question: '¿Temporal Dead Zone?',
    answer:
      'Es el tramo entre la entrada al bloque y la inicialización de un binding `let`, `const` o `class`. El binding ya pertenece al scope, pero leerlo lanza `ReferenceError`; por ejemplo, `console.log(total); let total = 1;`.',
  },
  {
    id: 'rapid-007-hoisting',
    question: '¿Hoisting?',
    answer:
      'El entorno registra declaraciones antes de ejecutar; la disponibilidad depende del tipo de declaración.',
  },
  {
    id: 'rapid-008-this',
    question: '¿`this`?',
    answer:
      'Receiver de una llamada según call-site, salvo arrow que captura el binding exterior.',
  },
  {
    id: 'rapid-009-call-apply-bind',
    question: '¿`call`, `apply`, `bind`?',
    answer:
      'Call invoca con argumentos; apply con array-like; bind crea otra función con receiver o argumentos fijados.',
  },
  {
    id: 'rapid-010-coercion',
    question: '¿Coerción?',
    answer:
      'Conversión entre tipos. Puede ser explícita con `Number`, `String` o `Boolean`, o implícita cuando un operador o contexto necesita otro tipo.',
  },
  {
    id: 'rapid-011-closure',
    question: '¿Closure?',
    answer:
      'Una función conserva los bindings del entorno léxico donde fue creada, incluso si se ejecuta después de que terminó la función exterior. Conserva bindings vivos, no una copia congelada de sus valores.',
  },
  {
    id: 'rapid-012-spread-y-rest',
    question: '¿Spread y rest?',
    answer: 'Misma sintaxis: spread expande; rest reúne valores restantes.',
  },
  {
    id: 'rapid-013-destructuring-default',
    question: '¿Destructuring default?',
    answer: 'Se aplica ante undefined, no ante null.',
  },
  {
    id: 'rapid-014-shallow-copy',
    question: '¿Shallow copy?',
    answer:
      'Crea un contenedor nuevo y conserva las mismas referencias anidadas. Con `const copy = { ...original }`, `copy !== original`, pero `copy.user === original.user` si `user` es un objeto.',
  },
  {
    id: 'rapid-015-structuredclone',
    question: '¿`structuredClone`?',
    answer: 'Clona estructuras soportadas y ciclos; no clona funciones.',
  },
  {
    id: 'rapid-016-prototipo',
    question: '¿Prototipo?',
    answer:
      'Objeto delegado que JavaScript consulta cuando una propiedad falta en el receiver.',
  },
  {
    id: 'rapid-017-own-property',
    question: '¿Own property?',
    answer: 'Propiedad definida en el objeto, comprobable con Object.hasOwn.',
  },
  {
    id: 'rapid-018-for-in-o-for-of',
    question: '¿`for...in` o `for...of`?',
    answer: 'In recorre claves enumerables; of recorre valores de un iterable.',
  },
  {
    id: 'rapid-019-metodos-de-array-mutables',
    question: '¿Métodos de array mutables?',
    answer:
      'Push, pop, shift, unshift, splice, sort, reverse, fill y copyWithin.',
  },
  {
    id: 'rapid-020-find-o-filter',
    question: '¿`find` o `filter`?',
    answer: 'Find devuelve el primer match; filter crea un array con todos.',
  },
  {
    id: 'rapid-021-pure-function',
    question: '¿Pure function?',
    answer: 'Mismo resultado para mismas entradas y sin efectos observables.',
  },
  {
    id: 'rapid-022-currying',
    question: '¿Currying?',
    answer:
      'Convierte una función de varios argumentos en una secuencia de funciones.',
  },
  {
    id: 'rapid-023-debounce-o-throttle',
    question: '¿Debounce o throttle?',
    answer:
      'Debounce espera silencio; throttle limita ejecuciones por intervalo.',
  },
  {
    id: 'rapid-024-promise-all',
    question: '¿`Promise.all`?',
    answer: 'Conserva orden y rechaza al primer rechazo observado.',
  },
  {
    id: 'rapid-025-allsettled',
    question: '¿`allSettled`?',
    answer: 'Espera todos y devuelve el estado de cada operación.',
  },
  {
    id: 'rapid-026-abortcontroller',
    question: '¿AbortController?',
    answer: 'Emite una señal de cancelación que consumen fetch y otras APIs.',
  },
  {
    id: 'rapid-027-async-bloquea-el-thread',
    question: '¿Async bloquea el thread?',
    answer: 'No. Await cede la continuación; CPU síncrono sigue bloqueando.',
  },
  {
    id: 'rapid-028-unhandled-rejection',
    question: '¿Unhandled rejection?',
    answer:
      'Promise rechazada sin handler; registrala y corregí la cadena, no la ocultes.',
  },
  {
    id: 'rapid-029-dom',
    question: '¿DOM?',
    answer: 'Árbol de nodos y APIs que representan el documento.',
  },
  {
    id: 'rapid-030-bom',
    question: '¿BOM?',
    answer:
      'APIs del navegador fuera del documento, como history, location y navigator.',
  },
  {
    id: 'rapid-031-event-bubbling',
    question: '¿Event bubbling?',
    answer: 'El evento asciende desde el target por ancestros que participan.',
  },
  {
    id: 'rapid-032-event-delegation',
    question: '¿Event delegation?',
    answer:
      'Listener en un ancestro que decide según el target; reduce listeners y cubre hijos dinámicos.',
  },
  {
    id: 'rapid-033-preventdefault',
    question: '¿preventDefault?',
    answer: 'Evita la acción predeterminada si el evento es cancelable.',
  },
  {
    id: 'rapid-034-localstorage',
    question: '¿localStorage?',
    answer: 'Almacenamiento síncrono string por origin y persistente.',
  },
  {
    id: 'rapid-035-indexeddb',
    question: '¿IndexedDB?',
    answer:
      'Base asíncrona del navegador para datos estructurados y mayor volumen.',
  },
  {
    id: 'rapid-036-same-origin',
    question: '¿Same-origin?',
    answer: 'Coincidencia de scheme, host y port.',
  },
  {
    id: 'rapid-037-preflight',
    question: '¿Preflight?',
    answer: 'Request OPTIONS con la que el navegador consulta permiso CORS.',
  },
  {
    id: 'rapid-038-etag',
    question: '¿ETag?',
    answer: 'Validador de representación para revalidación condicional.',
  },
  {
    id: 'rapid-039-service-worker',
    question: '¿Service Worker?',
    answer: 'Worker con lifecycle que intercepta red y habilita offline/push.',
  },
  {
    id: 'rapid-040-web-worker',
    question: '¿Web Worker?',
    answer: 'Thread para JavaScript sin acceso directo al DOM.',
  },
  {
    id: 'rapid-041-etiqueta-semantica',
    question: '¿Etiqueta semántica?',
    answer:
      'Elemento cuyo nombre comunica rol y estructura al navegador y tecnologías asistivas.',
  },
  {
    id: 'rapid-042-head',
    question: '¿`head`?',
    answer:
      'Metadata y recursos del documento, no contenido principal visible.',
  },
  {
    id: 'rapid-043-alt',
    question: '¿`alt`?',
    answer:
      'Alternativa textual que depende de la función de la imagen; decorativas usan alt vacío.',
  },
  {
    id: 'rapid-044-iframe-sandbox',
    question: '¿`iframe sandbox`?',
    answer:
      'Restringe capacidades del documento embebido y se abre con tokens explícitos.',
  },
  {
    id: 'rapid-045-get-o-post-en-form',
    question: '¿GET o POST en form?',
    answer:
      'GET expresa consulta y deja datos en URL; POST envía body para una operación.',
  },
  {
    id: 'rapid-046-submit-default',
    question: '¿Submit default?',
    answer: 'Un button dentro de form usa submit si no declarás type.',
  },
  {
    id: 'rapid-047-defer-o-async-script',
    question: '¿`defer` o `async` script?',
    answer: 'Defer preserva orden y espera parseo; async ejecuta al descargar.',
  },
  {
    id: 'rapid-048-box-model',
    question: '¿Box model?',
    answer: 'Content, padding, border y margin.',
  },
  {
    id: 'rapid-049-specificity',
    question: '¿Specificity?',
    answer:
      'Peso de un selector dentro de la cascada después de origen, importancia y layer.',
  },
  {
    id: 'rapid-050-box-sizing-border-box',
    question: '¿`box-sizing:border-box`?',
    answer: 'El width declarado incluye padding y border.',
  },
  {
    id: 'rapid-051-margin-o-padding',
    question: '¿Margin o padding?',
    answer: 'Margin separa cajas; padding agrega espacio dentro del borde.',
  },
  {
    id: 'rapid-052-position-absolute',
    question: '¿Position absolute?',
    answer: 'Sale del flujo y se posiciona respecto de su containing block.',
  },
  {
    id: 'rapid-053-position-sticky',
    question: '¿Position sticky?',
    answer:
      'Participa en flujo y se fija dentro de su scroll container al cruzar un umbral.',
  },
  {
    id: 'rapid-054-stacking-context',
    question: '¿Stacking context?',
    answer: 'Ámbito que limita la comparación de z-index entre descendientes.',
  },
  {
    id: 'rapid-055-pseudo-clase-o-pseudo-elemento',
    question: '¿Pseudo-clase o pseudo-elemento?',
    answer:
      'Pseudo-clase selecciona estado; pseudo-elemento representa una parte generada o conceptual.',
  },
  {
    id: 'rapid-056-bem',
    question: '¿BEM?',
    answer: 'Convención Block, Element, Modifier para nombres de clases.',
  },
  {
    id: 'rapid-057-preprocesador-o-framework',
    question: '¿Preprocesador o framework?',
    answer:
      'Preprocesador extiende sintaxis; framework aporta reglas, utilidades o componentes.',
  },
  {
    id: 'rapid-058-media-o-container-query',
    question: '¿Media o container query?',
    answer:
      'Media consulta viewport/dispositivo; container consulta tamaño o estilo del contenedor.',
  },
  {
    id: 'rapid-059-reflow',
    question: '¿Reflow?',
    answer:
      'Recalculo de geometría provocado por cambios o lecturas que requieren layout.',
  },
  {
    id: 'rapid-060-cls',
    question: '¿CLS?',
    answer:
      'Movimiento inesperado de contenido; reservá espacio para imágenes y contenido asíncrono.',
  },
  {
    id: 'rapid-061-componente-o-directiva',
    question: '¿Componente o directiva?',
    answer:
      'El componente posee vista; la directiva agrega comportamiento a un host.',
  },
  {
    id: 'rapid-062-pipe-pura',
    question: '¿Pipe pura?',
    answer:
      'Angular puede reutilizar el resultado mientras no cambien las referencias de entrada.',
  },
  {
    id: 'rapid-063-for-track',
    question: '¿`@for track`?',
    answer:
      'Asocia identidad de datos con nodos DOM para minimizar creación y conservar estado.',
  },
  {
    id: 'rapid-064-computed-o-effect',
    question: '¿`computed` o `effect`?',
    answer:
      '`computed` deriva estado; `effect` sincroniza con una API externa.',
  },
  {
    id: 'rapid-065-signal-o-behaviorsubject',
    question: '¿Signal o BehaviorSubject?',
    answer:
      'Signal para estado síncrono de UI; BehaviorSubject cuando necesitás semántica y operadores RxJS.',
  },
  {
    id: 'rapid-066-switchmap',
    question: '¿`switchMap`?',
    answer: 'Cancela el inner anterior al llegar una nueva emisión.',
  },
  {
    id: 'rapid-067-concatmap',
    question: '¿`concatMap`?',
    answer: 'Encola inner observables y conserva orden.',
  },
  {
    id: 'rapid-068-exhaustmap',
    question: '¿`exhaustMap`?',
    answer: 'Ignora nuevos disparos mientras el inner sigue activo.',
  },
  {
    id: 'rapid-069-mergemap',
    question: '¿`mergeMap`?',
    answer:
      'Ejecuta inner observables en paralelo con concurrencia configurable.',
  },
  {
    id: 'rapid-070-forkjoin',
    question: '¿`forkJoin`?',
    answer:
      'Emite una vez cuando todos completan; falla si alguno falla y no sirve para streams infinitos.',
  },
  {
    id: 'rapid-071-cold-observable',
    question: '¿Cold observable?',
    answer: 'Cada subscription crea su propio productor.',
  },
  {
    id: 'rapid-072-sharereplay',
    question: '¿`shareReplay`?',
    answer:
      'Comparte y reproduce valores; necesita política de refCount, error e invalidación.',
  },
  {
    id: 'rapid-073-providedin-root',
    question: '¿`providedIn: root`?',
    answer: 'Provider tree-shakeable en el root EnvironmentInjector.',
  },
  {
    id: 'rapid-074-providers-local',
    question: '¿`providers` local?',
    answer:
      'Nueva instancia en el ElementInjector del componente y sus descendientes visibles.',
  },
  {
    id: 'rapid-075-viewproviders',
    question: '¿`viewProviders`?',
    answer: 'Oculta esos providers al contenido proyectado.',
  },
  {
    id: 'rapid-076-injectiontoken',
    question: '¿InjectionToken?',
    answer: 'Token runtime tipado para valores, funciones o interfaces.',
  },
  {
    id: 'rapid-077-onpush',
    question: '¿OnPush?',
    answer:
      'Permite saltar subárboles hasta que una notificación relevante marca la vista.',
  },
  {
    id: 'rapid-078-zoneless',
    question: '¿Zoneless?',
    answer:
      'Angular recibe notificaciones explícitas y evita usar ZoneJS para inferir cambios.',
  },
  {
    id: 'rapid-079-markforcheck',
    question: '¿`markForCheck`?',
    answer: 'Marca la vista para una próxima verificación.',
  },
  {
    id: 'rapid-080-detectchanges',
    question: '¿`detectChanges`?',
    answer:
      'Ejecuta verificación local; su uso frecuente suele indicar un flujo defectuoso.',
  },
  {
    id: 'rapid-081-standalone',
    question: '¿Standalone?',
    answer:
      'Componente que declara dependencias en imports y no necesita declaración en NgModule.',
  },
  {
    id: 'rapid-082-lazy-route',
    question: '¿Lazy route?',
    answer:
      'Carga código al navegar a la feature, reduciendo el bundle inicial.',
  },
  {
    id: 'rapid-083-guard',
    question: '¿Guard?',
    answer:
      'Control de navegación en cliente; no reemplaza autorización del servidor.',
  },
  {
    id: 'rapid-084-resolver',
    question: '¿Resolver?',
    answer: 'Obtiene datos antes de activar la ruta.',
  },
  {
    id: 'rapid-085-reactive-form',
    question: '¿Reactive Form?',
    answer:
      'Modelo explícito y observable en TypeScript, apto para composición y validación compleja.',
  },
  {
    id: 'rapid-086-cva',
    question: '¿CVA?',
    answer: 'Contrato que conecta un control custom con Angular Forms.',
  },
  {
    id: 'rapid-087-async-validator',
    question: '¿Async validator?',
    answer:
      'Validador que completa con errores o null; controlá cancelación y frecuencia.',
  },
  {
    id: 'rapid-088-interceptor',
    question: '¿Interceptor?',
    answer:
      'Middleware de requests y responses para preocupaciones transversales.',
  },
  {
    id: 'rapid-089-retry',
    question: '¿Retry?',
    answer: 'Solo con política, límite y seguridad de idempotencia.',
  },
  {
    id: 'rapid-090-xss',
    question: '¿XSS?',
    answer:
      'Ejecución de script no confiable; evitá sinks peligrosos y mantené sanitización y CSP.',
  },
  {
    id: 'rapid-091-csrf',
    question: '¿CSRF?',
    answer:
      'Petición autenticada inducida desde otro origen; afecta sobre todo credenciales automáticas como cookies.',
  },
  {
    id: 'rapid-092-csp',
    question: '¿CSP?',
    answer:
      'Política del navegador que limita fuentes de scripts, estilos y otros recursos.',
  },
  {
    id: 'rapid-093-trusted-types',
    question: '¿Trusted Types?',
    answer:
      'Restringe asignaciones a sinks DOM peligrosos a valores creados por políticas confiables.',
  },
  {
    id: 'rapid-094-ssr',
    question: '¿SSR?',
    answer:
      'Render por request en servidor; ayuda SEO y HTML inicial, agrega costo operativo.',
  },
  {
    id: 'rapid-095-ssg',
    question: '¿SSG?',
    answer: 'HTML generado en build para contenido estable.',
  },
  {
    id: 'rapid-096-hydration',
    question: '¿Hydration?',
    answer:
      'Angular reutiliza HTML de servidor y conecta comportamiento cliente.',
  },
  {
    id: 'rapid-097-defer',
    question: '¿`@defer`?',
    answer: 'Divide dependencias y carga una vista según trigger o condición.',
  },
  {
    id: 'rapid-098-lcp',
    question: '¿LCP?',
    answer: 'Tiempo hasta renderizar el mayor elemento visible.',
  },
  {
    id: 'rapid-099-inp',
    question: '¿INP?',
    answer: 'Latencia observada de interacciones durante la sesión.',
  },
  {
    id: 'rapid-100-cls',
    question: '¿CLS?',
    answer: 'Suma de cambios inesperados de layout.',
  },
  {
    id: 'rapid-101-tree-shaking',
    question: '¿Tree shaking?',
    answer:
      'El bundler elimina código no alcanzable cuando el formato y las dependencias lo permiten.',
  },
  {
    id: 'rapid-102-aot',
    question: '¿AOT?',
    answer:
      'Compila templates en build, reduce trabajo runtime y detecta errores antes.',
  },
  {
    id: 'rapid-103-ngrx-reducer',
    question: '¿NgRx reducer?',
    answer: 'Función pura que calcula nuevo estado desde estado y action.',
  },
  {
    id: 'rapid-104-ngrx-effect',
    question: '¿NgRx effect?',
    answer: 'Reacciona a eventos y coordina I/O u otros efectos.',
  },
  {
    id: 'rapid-105-selector',
    question: '¿Selector?',
    answer: 'Consulta derivada y memorizada sobre el store.',
  },
  {
    id: 'rapid-106-optimistic-update',
    question: '¿Optimistic update?',
    answer:
      'Actualiza UI antes de confirmar y define rollback o reconciliación.',
  },
  {
    id: 'rapid-107-facade',
    question: '¿Facade?',
    answer:
      'API estable que reduce superficie de un subsistema; puede ocultar demasiado si no protege un límite.',
  },
  {
    id: 'rapid-108-adapter',
    question: '¿Adapter?',
    answer: 'Traduce un contrato externo al modelo interno.',
  },
  {
    id: 'rapid-109-strategy',
    question: '¿Strategy?',
    answer: 'Encapsula políticas intercambiables detrás de un contrato.',
  },
  {
    id: 'rapid-110-srp',
    question: '¿SRP?',
    answer:
      'Una unidad concentra responsabilidades que cambian por el mismo motivo.',
  },
  {
    id: 'rapid-111-dip',
    question: '¿DIP?',
    answer:
      'El código de alto nivel depende de abstracciones, no de detalles concretos.',
  },
  {
    id: 'rapid-112-unknown',
    question: '¿`unknown`?',
    answer:
      'Tipo seguro para valor no validado; obliga a estrechar antes de usar.',
  },
  {
    id: 'rapid-113-never',
    question: '¿`never`?',
    answer: 'Representa estados imposibles y permite checks exhaustivos.',
  },
  {
    id: 'rapid-114-microtask',
    question: '¿Microtask?',
    answer: 'Cola de promesas que se drena antes de la siguiente macrotask.',
  },
  {
    id: 'rapid-115-closure',
    question: '¿Closure?',
    answer:
      'Función junto con su entorno léxico: puede seguir leyendo o modificando los bindings capturados cuando se ejecuta fuera de la llamada que los creó.',
  },
  {
    id: 'rapid-116-inmutabilidad',
    question: '¿Inmutabilidad?',
    answer:
      'Crear nuevas referencias en lugar de mutar estado compartido; mejora previsibilidad y detección.',
  },
  {
    id: 'rapid-117-object-freeze',
    question: '¿`Object.freeze`?',
    answer:
      'Congelación superficial; no protege objetos anidados sin trabajo adicional.',
  },
  {
    id: 'rapid-118-unit-test',
    question: '¿Unit test?',
    answer: 'Prueba una unidad con fronteras controladas y feedback rápido.',
  },
  {
    id: 'rapid-119-integration-test',
    question: '¿Integration test?',
    answer: 'Verifica colaboración entre varias unidades o una frontera real.',
  },
  {
    id: 'rapid-120-e2e',
    question: '¿E2E?',
    answer:
      'Prueba un recorrido del usuario a través del sistema desplegado o equivalente.',
  },
  {
    id: 'rapid-121-harness',
    question: '¿Harness?',
    answer:
      'API estable para interactuar con un componente en tests sin depender de su DOM interno.',
  },
  {
    id: 'rapid-122-memory-leak-tipico',
    question: '¿Memory leak típico?',
    answer:
      'Subscription, listener, timer, observer o cache que conserva una vista destruida.',
  },
  {
    id: 'rapid-123-correlation-id',
    question: '¿Correlation ID?',
    answer:
      'Identificador que conecta eventos frontend, gateway y backend de una operación.',
  },
  {
    id: 'rapid-124-feature-flag',
    question: '¿Feature flag?',
    answer:
      'Control temporal de exposición con owner, métricas y plan de retiro.',
  },
  {
    id: 'rapid-125-micro-frontend',
    question: '¿Micro-frontend?',
    answer:
      'Unidad de frontend con ownership y despliegue independiente, a cambio de integración y duplicación.',
  },
  {
    id: 'rapid-126-adr',
    question: '¿ADR?',
    answer: 'Registro corto de una decisión, alternativas y consecuencias.',
  },
];

export const PRACTICE_CASES: readonly PracticeCase[] = [
  {
    title: 'Buscador cancelable',
    brief:
      'Construí un buscador con debounce, cancelación, estados loading/error/empty, caché por query y tests con tiempo controlado. Explicá por qué elegiste switchMap y qué cambia si el endpoint no soporta cancelación.',
  },
  {
    title: 'Motor de formularios dinámicos',
    brief:
      'Diseñá un schema para tipos, validación, layout, visibilidad y permisos. Sumá un CVA, validación asíncrona, persistencia parcial y una estrategia de versionado del schema.',
  },
  {
    title: 'Dashboard en tiempo real',
    brief:
      'Diseñá seis widgets con frecuencias distintas. Incluí WebSocket o SSE, reconexión, backpressure, pausa fuera del viewport, caché, permisos y métricas de INP.',
  },
  {
    title: 'Migración entre cinco versiones mayores',
    brief:
      'Proponé etapas para actualizar majors, convertir features a standalone, introducir control flow, Signals y zoneless. Definí pruebas, métricas, feature flags y rollback.',
  },
  {
    title: 'Lista de 100.000 filas',
    brief:
      'Compará paginación server-side, virtual scroll, filtros remotos y caché. Medí memoria, scripting, layout e interacción sin perder navegación por teclado ni soporte de lector de pantalla.',
  },
  {
    title: 'Carrera de refresh de autenticación',
    brief:
      'Varias requests reciben 401 al mismo tiempo. Diseñá un refresh único, cola, cancelación, logout seguro, telemetría y tests deterministas de concurrencia.',
  },
  {
    title: 'Event loop',
    brief:
      'Predecí el orden de logs que mezclen Promises, queueMicrotask, timers, async/await y eventos. Verificá el resultado en navegador y justificá cada transición entre colas.',
  },
  {
    title: 'Tabla accesible',
    brief:
      'Construí una tabla ordenable y paginada con caption, headers, estados de orden, teclado, foco, loading y empty state. Validala con lector de pantalla.',
  },
  {
    title: 'Layout responsive sin CLS',
    brief:
      'Implementá una card que cambie con container queries, respete reduced motion y no produzca saltos. Explicá cascade, stacking contexts, overflow y containment.',
  },
  {
    title: 'Caché offline',
    brief:
      'Diseñá caché HTTP, IndexedDB y Service Worker para una pantalla de lectura. Definí invalidación, conflictos, cuotas, logout y tratamiento de datos sensibles.',
  },
];

export const STUDY_REFERENCES: readonly StudyReference[] = [
  {
    label: 'Angular · Releases',
    url: 'https://angular.dev/reference/releases',
  },
  {
    label: 'Angular · Signals',
    url: 'https://angular.dev/guide/signals',
  },
  {
    label: 'Angular · Zoneless',
    url: 'https://angular.dev/guide/zoneless',
  },
  {
    label: 'Angular · Control flow',
    url: 'https://angular.dev/guide/templates/control-flow',
  },
  {
    label: 'Angular · Rendering strategies',
    url: 'https://angular.dev/guide/routing/rendering-strategies',
  },
  {
    label: 'Angular · Testing',
    url: 'https://angular.dev/guide/testing',
  },
  {
    label: 'Angular · Security',
    url: 'https://angular.dev/best-practices/security',
  },
  {
    label: 'MDN · Web platform',
    url: 'https://developer.mozilla.org/',
  },
];
