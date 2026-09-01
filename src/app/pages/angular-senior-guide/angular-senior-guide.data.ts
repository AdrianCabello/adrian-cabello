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

export interface StudyReference {
  readonly label: string;
  readonly url: string;
}

export interface TheorySection {
  readonly title: string;
  readonly items: readonly string[];
}

export interface StudyTopic {
  readonly id: string;
  readonly number: string;
  readonly groupId: string;
  readonly title: string;
  readonly intro: string;
  readonly theory: readonly string[];
  readonly theorySections: readonly TheorySection[];
  readonly questions: readonly StudyQuestion[];
  readonly code?: string;
  readonly references: readonly StudyReference[];
}

export interface CodeChallengeFormat {
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
  readonly timeline: readonly {
    readonly time: string;
    readonly task: string;
  }[];
  readonly starter_code: string;
}

export interface PracticeCase {
  readonly id: string;
  readonly stack: readonly string[];
  readonly title: string;
  readonly brief: string;
  readonly approach: string;
  readonly code_title: string;
  readonly code: string;
  readonly checks: readonly string[];
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
    theorySections: [
      {
        title: 'Documento y semántica',
        items: [
          '`head` contiene metadata, title, links, preload y scripts. `body` contiene el documento visible. Un title y description claros mejoran navegación y presentación en resultados.',
          '`header`, `nav`, `main`, `article`, `section`, `aside` y `footer` describen la función de cada región. Navegadores y tecnologías asistivas usan esa estructura para crear landmarks. `div` y `span` agrupan contenido sin añadir significado.',
          'Block e inline describen comportamiento de formatting context, que CSS puede cambiar. La semántica del elemento no cambia al modificar `display`.',
          '`a` navega y necesita `href`; `button` ejecuta una acción. `target=_blank` requiere una política de `rel` apropiada para reducir acceso a opener.',
        ],
      },
      {
        title: 'Formularios y contenido',
        items: [
          'Imágenes necesitan `alt` según función. `picture`, `srcset` y `sizes` permiten formatos y resoluciones. Width y height reservan espacio y reducen CLS.',
          'Video y audio admiten múltiples `source`, `track` para subtítulos y controles. Un iframe crea otro contexto; restringilo con `sandbox`, permisos y origen confiable.',
          'Form asocia `label` con control, usa `name` para submission y aprovecha tipos nativos. GET codifica en URL; POST envía body. El servidor valida todos los campos.',
          'Un `button` dentro de un formulario tiene tipo `submit` por defecto. `type=button` representa una acción auxiliar y evita envíos accidentales. La semántica de submit también permite enviar con Enter y ejecutar la validación nativa.',
        ],
      },
      {
        title: 'Carga, SEO y accesibilidad',
        items: [
          'Una tabla de datos se compone con `caption`, `thead`, `tbody`, celdas `th` y relaciones `scope`. Esa estructura permite asociar cada dato con sus encabezados. Las tablas usadas para layout comunican relaciones inexistentes y dificultan el responsive design.',
          '`br` introduce un salto dentro del mismo contenido, como una dirección o un poema. `hr` marca un cambio temático entre bloques. El espacio visual entre elementos pertenece a margin, padding o gap en CSS.',
          'Scripts con `defer` descargan en paralelo y ejecutan tras parsear, en orden. `async` ejecuta cuando descarga y no conserva orden. Modules difieren y usan defer por defecto.',
          'SEO técnico incluye HTML rastreable, canonical, robots, structured data, status correctos, sitemap y rendering compatible con el contenido.',
        ],
      },
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
      {
        id: 'topic-041-etiqueta-semantica',
        question: '¿Etiqueta semántica?',
        answer:
          'Elemento cuyo nombre comunica rol y estructura al navegador y tecnologías asistivas.',
      },
      {
        id: 'topic-042-head',
        question: '¿`head`?',
        answer:
          'Metadata y recursos del documento, no contenido principal visible.',
      },
      {
        id: 'topic-043-alt',
        question: '¿`alt`?',
        answer:
          'Alternativa textual que depende de la función de la imagen; decorativas usan alt vacío.',
      },
      {
        id: 'topic-044-iframe-sandbox',
        question: '¿`iframe sandbox`?',
        answer:
          'Restringe capacidades del documento embebido y se abre con tokens explícitos.',
      },
      {
        id: 'topic-045-get-o-post-en-form',
        question: '¿GET o POST en form?',
        answer:
          'GET expresa consulta y deja datos en URL; POST envía body para una operación.',
      },
      {
        id: 'topic-046-submit-default',
        question: '¿Submit default?',
        answer: 'Un button dentro de form usa submit si no declarás type.',
      },
      {
        id: 'topic-047-defer-o-async-script',
        question: '¿`defer` o `async` script?',
        answer:
          'Defer preserva orden y espera parseo; async ejecuta al descargar.',
      },
    ],
    code: '<form (ngSubmit)="save()" [formGroup]="profileForm">\n  <label for="email">Correo</label>\n  <input id="email" type="email" autocomplete="email"\n         formControlName="email" aria-describedby="email-error">\n  <p id="email-error" role="alert">Ingresá un correo válido.</p>\n  <button type="submit">Guardar</button>\n</form>',
    references: [
      {
        label: 'MDN · HTML',
        url: 'https://developer.mozilla.org/docs/Web/HTML',
      },
    ],
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
    theorySections: [
      {
        title: 'Cascada y box model',
        items: [
          'La cascada considera origen, importancia, layers, specificity, scope y orden. `!important` altera el orden dentro del origen y crea costo de mantenimiento.',
          'Specificity cuenta IDs, clases/atributos/pseudo-clases y tipos/pseudo-elementos. `:where()` aporta especificidad cero; `:is()` y `:not()` toman la del argumento más específico.',
          'Box model suma content, padding, border y margin. `box-sizing: border-box` incluye padding y border dentro del tamaño declarado.',
          'Margin separa cajas; padding amplía el interior y el área de fondo. Márgenes verticales pueden colapsar en block formatting context.',
          '`display: none` quita la caja y el árbol de accesibilidad; `visibility: hidden` conserva espacio y oculta; `opacity: 0` conserva layout y puede conservar interacción si no la controlás.',
        ],
      },
      {
        title: 'Layout y responsive',
        items: [
          'Position static sigue flujo; relative conserva espacio y crea referencia; absolute sale del flujo y usa containing block; fixed se relaciona con viewport salvo transform ancestors; sticky cambia según scroll container.',
          'Flexbox organiza una dimensión y distribuye espacio; Grid controla filas y columnas. `min-width: 0` suele resolver overflow de hijos flex.',
          'Responsive design combina tamaños fluidos, media queries, container queries, imágenes adaptativas y límites de ancho. Los breakpoints basados en el punto donde el contenido deja de funcionar resisten mejor cambios de dispositivos y layout.',
          'Overflow puede clippear, scrollear o crear formatting context. `text-overflow: ellipsis` necesita restricciones de overflow y white-space.',
          '`z-index` solo compara dentro del mismo stacking context. Transform, opacity, positioned elements y isolation pueden crear contextos nuevos.',
        ],
      },
      {
        title: 'Composición y rendimiento',
        items: [
          'Una transition interpola el cambio entre dos estados; una animation recorre keyframes aunque no cambie una propiedad por interacción. `transform` y `opacity` suelen ejecutarse en composición y evitan layout, mientras `prefers-reduced-motion` permite reducir movimiento no esencial.',
          'BEM nombra Block, Element y Modifier; CSS Modules, Shadow DOM y Angular encapsulation resuelven scopes con modelos distintos.',
          'Preprocesadores agregan sintaxis en build; frameworks entregan utilidades o componentes. Ninguno reemplaza cascade, layout ni accesibilidad.',
          '`contain` limita qué partes del árbol pueden afectar layout, paint o style fuera de un elemento. `content-visibility: auto` permite omitir el render de contenido fuera del viewport. Ambas herramientas reducen trabajo, pero cambian mediciones, foco y accesibilidad si se aplican sin comprobar el resultado.',
        ],
      },
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
      {
        id: 'topic-048-box-model',
        question: '¿Box model?',
        answer: 'Content, padding, border y margin.',
      },
      {
        id: 'topic-049-specificity',
        question: '¿Specificity?',
        answer:
          'Peso de un selector dentro de la cascada después de origen, importancia y layer.',
      },
      {
        id: 'topic-050-box-sizing-border-box',
        question: '¿`box-sizing:border-box`?',
        answer: 'El width declarado incluye padding y border.',
      },
      {
        id: 'topic-051-margin-o-padding',
        question: '¿Margin o padding?',
        answer: 'Margin separa cajas; padding agrega espacio dentro del borde.',
      },
      {
        id: 'topic-052-position-absolute',
        question: '¿Position absolute?',
        answer:
          'Sale del flujo y se posiciona respecto de su containing block.',
      },
      {
        id: 'topic-053-position-sticky',
        question: '¿Position sticky?',
        answer:
          'Participa en flujo y se fija dentro de su scroll container al cruzar un umbral.',
      },
      {
        id: 'topic-054-stacking-context',
        question: '¿Stacking context?',
        answer:
          'Ámbito que limita la comparación de z-index entre descendientes.',
      },
      {
        id: 'topic-055-pseudo-clase-o-pseudo-elemento',
        question: '¿Pseudo-clase o pseudo-elemento?',
        answer:
          'Pseudo-clase selecciona estado; pseudo-elemento representa una parte generada o conceptual.',
      },
      {
        id: 'topic-056-bem',
        question: '¿BEM?',
        answer: 'Convención Block, Element, Modifier para nombres de clases.',
      },
      {
        id: 'topic-057-preprocesador-o-framework',
        question: '¿Preprocesador o framework?',
        answer:
          'Preprocesador extiende sintaxis; framework aporta reglas, utilidades o componentes.',
      },
      {
        id: 'topic-058-media-o-container-query',
        question: '¿Media o container query?',
        answer:
          'Media consulta viewport/dispositivo; container consulta tamaño o estilo del contenedor.',
      },
      {
        id: 'topic-059-reflow',
        question: '¿Reflow?',
        answer:
          'Recalculo de geometría provocado por cambios o lecturas que requieren layout.',
      },
      {
        id: 'topic-060-cls',
        question: '¿CLS?',
        answer:
          'Movimiento inesperado de contenido; reservá espacio para imágenes y contenido asíncrono.',
      },
    ],
    code: '@layer reset, base, components, utilities;\n\n@layer components {\n  .card { container-type: inline-size; }\n  @container (min-width: 36rem) {\n    .card__body { display: grid; grid-template-columns: 2fr 1fr; }\n  }\n}\n\n@media (prefers-reduced-motion: reduce) {\n  *, *::before, *::after { animation-duration: 0.01ms !important; }\n}',
    references: [
      {
        label: 'MDN · CSS',
        url: 'https://developer.mozilla.org/docs/Web/CSS',
      },
    ],
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
    theorySections: [
      {
        title: 'Tipos y conversiones',
        items: [
          'JavaScript tiene tipos primitivos `undefined`, `null`, `boolean`, `number`, `bigint`, `string` y `symbol`. Los objetos se comparan por referencia. `typeof null` devuelve `object` por una decisión histórica.',
          '`var` posee function scope, permite redeclaración y su declaración se eleva. `let` y `const` poseen block scope y permanecen en temporal dead zone hasta la inicialización. `const` fija la referencia, no vuelve inmutable el objeto.',
          'La coerción es la conversión de un valor de un tipo a otro. Es explícita cuando el código llama a `Number(value)`, `String(value)` o `Boolean(value)`, e implícita cuando el lenguaje convierte porque un operador o contexto necesita otro tipo. Formularios, query params, atributos DOM y storage entregan strings aunque representen números o booleanos; convertir y validar en esa frontera evita que la coerción se propague al dominio.',
          "Cuando un operador necesita convertir un objeto a primitivo, JavaScript ejecuta la operación abstracta `ToPrimitive`. Primero respeta `Symbol.toPrimitive` y, según el hint, consulta `valueOf` y `toString` hasta obtener un primitivo. Por eso `[]` se convierte en `''`, `[1, 2]` en `'1,2'` y un objeto común suele producir `'[object Object]'`; después el operador continúa con la conversión numérica o textual que corresponda.",
          "El operador `+` es especial: después de convertir objetos a primitivos, concatena si alguno de los operandos es string; si no, realiza suma numérica. `1 + '2'` produce `'12'`, mientras `'5' - 2`, `'5' * 2` y `'5' / 2` convierten a número. Los template literals fuerzan string y los contextos de `if`, `!`, `&&` y `||` usan conversión booleana.",
          "Las conversiones tienen bordes que conviene conocer: `Number('')` y `Number(null)` producen `0`, `Number(undefined)` produce `NaN`, y `Boolean('false')` es `true` porque cualquier string no vacío es truthy. `Number` exige que toda la cadena represente un número; `parseInt('10px', 10)` acepta el prefijo numérico. Ninguna de las dos reemplaza validar rango, formato y finitud con `Number.isFinite`.",
        ],
      },
      {
        title: 'Scope, hoisting y closures',
        items: [
          '`===` compara tipo y valor sin coerción. `Object.is` difiere en `NaN` y `-0`. `==` tiene casos útiles, como `value == null`, pero exige conocer su tabla de coerción.',
          'Falsy incluye `false`, `0`, `-0`, `0n`, cadena vacía, `null`, `undefined` y `NaN`. Un array u objeto vacío es truthy.',
          'Una declaración de función se eleva con su cuerpo. Una function expression sigue las reglas de su variable. Las arrow functions capturan `this`, `arguments` y `super` del entorno; no sirven como constructor.',
          '`this` depende de cómo se invoca una función: method call, `call/apply/bind`, constructor con `new` o binding léxico de arrow. Extraer un método puede perder el receiver.',
          'Un closure es la combinación de una función con el entorno léxico donde fue creada. La función puede ejecutarse después de que terminó la llamada exterior y seguir resolviendo parámetros y variables de ese entorno. `makeCounter` puede declarar `let count = 0` y devolver una función que incrementa `count`; cada llamada a `makeCounter()` crea un binding privado e independiente.',
        ],
      },
      {
        title: 'Funciones, this y decisiones',
        items: [
          'El closure conserva bindings, no una fotografía de sus valores. Si el binding cambia, las funciones que lo cerraron observan el valor actual. Esto permite estado privado y callbacks coordinados, pero también explica bugs cuando varias funciones comparten accidentalmente una misma variable mutable.',
          'En un loop, `var` crea un único binding con scope de función, por lo que callbacks diferidos suelen leer el valor final. `let` crea un binding nuevo por iteración. Antes de `let`, una IIFE o una factory recibía el valor de cada vuelta y creaba un entorno distinto.',
          'Closures sostienen factories, currying, memoization, event handlers y callbacks asíncronos. El entorno permanece vivo mientras una función alcanzable lo necesite: no es una fuga por sí mismo, pero puede retener DOM, caches o respuestas grandes. El cleanup debe remover listeners, cancelar timers o suscripciones y evitar capturar objetos completos cuando alcanza con un identificador o un dato pequeño.',
          'El spread copia un nivel y enumera propiedades. `structuredClone` cubre muchos valores y ciclos, pero no funciones ni todos los objetos host. Un JSON round-trip pierde fechas, `undefined`, `BigInt` y prototipos.',
          'Destructuring extrae valores y admite defaults. El default corre solo para `undefined`, no para `null`. Rest agrupa el remanente y debe ocupar la última posición.',
        ],
      },
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
      {
        id: 'topic-001-tipos-primitivos',
        question: '¿Tipos primitivos?',
        answer: 'undefined, null, boolean, number, bigint, string y symbol.',
      },
      {
        id: 'topic-002-typeof-null',
        question: '¿`typeof null`?',
        answer:
          'Devuelve `object` por compatibilidad histórica; verificá null de forma explícita.',
      },
      {
        id: 'topic-003-nan-nan',
        question: '¿`NaN === NaN`?',
        answer: 'False. Usá `Number.isNaN` u `Object.is`.',
      },
      {
        id: 'topic-004-null-y-undefined',
        question: '¿`null` y `undefined`?',
        answer:
          'Null suele expresar ausencia intencional; undefined expresa falta de valor o propiedad.',
      },
      {
        id: 'topic-005-truthy-y-falsy',
        question: '¿Truthy y falsy?',
        answer:
          'La conversión booleana determina branches; objetos y arrays vacíos son truthy.',
      },
      {
        id: 'topic-006-temporal-dead-zone',
        question: '¿Temporal Dead Zone?',
        answer:
          'Es el tramo entre la entrada al bloque y la inicialización de un binding `let`, `const` o `class`. El binding ya pertenece al scope, pero leerlo lanza `ReferenceError`; por ejemplo, `console.log(total); let total = 1;`.',
      },
      {
        id: 'topic-007-hoisting',
        question: '¿Hoisting?',
        answer:
          'El entorno registra declaraciones antes de ejecutar; la disponibilidad depende del tipo de declaración.',
      },
      {
        id: 'topic-008-this',
        question: '¿`this`?',
        answer:
          'Receiver de una llamada según call-site, salvo arrow que captura el binding exterior.',
      },
      {
        id: 'topic-009-call-apply-bind',
        question: '¿`call`, `apply`, `bind`?',
        answer:
          'Call invoca con argumentos; apply con array-like; bind crea otra función con receiver o argumentos fijados.',
      },
      {
        id: 'topic-010-coercion',
        question: '¿Coerción?',
        answer:
          'Conversión entre tipos. Puede ser explícita con `Number`, `String` o `Boolean`, o implícita cuando un operador o contexto necesita otro tipo.',
      },
      {
        id: 'topic-011-closure',
        question: '¿Closure?',
        answer:
          'Una función conserva los bindings del entorno léxico donde fue creada, incluso si se ejecuta después de que terminó la función exterior. Conserva bindings vivos, no una copia congelada de sus valores.',
      },
      {
        id: 'topic-012-spread-y-rest',
        question: '¿Spread y rest?',
        answer: 'Misma sintaxis: spread expande; rest reúne valores restantes.',
      },
      {
        id: 'topic-013-destructuring-default',
        question: '¿Destructuring default?',
        answer: 'Se aplica ante undefined, no ante null.',
      },
    ],
    code: "function makeCounter() {\n  let count = 0;\n  return () => ++count;\n}\n\nconst first = makeCounter();\nconst second = makeCounter();\nconsole.log(first(), first(), second()); // 1, 2, 1\n\nconsole.log(1 + '2');       // '12'\nconsole.log('5' - 2);       // 3\nconsole.log(Number('42'));  // 42\nconsole.log(Boolean(''));   // false\nconsole.log([] == false);   // true\nconsole.log([] === false);  // false",
    references: [
      {
        label: 'MDN · JavaScript',
        url: 'https://developer.mozilla.org/docs/Web/JavaScript',
      },
    ],
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
    theorySections: [
      {
        title: 'Fundamentos',
        items: [
          '`Object.create(proto)` fija el prototipo. `new C()` crea un objeto, enlaza `C.prototype`, ejecuta `C` con ese `this` y devuelve el objeto salvo retorno explícito de otro objeto.',
          'Una propiedad puede ser own o heredada. `Object.hasOwn` comprueba ownership; `in` recorre la cadena. `Object.keys` devuelve claves enumerables propias.',
          'Los property descriptors controlan `writable`, `enumerable` y `configurable`; getters y setters forman accessors. Cambiar descriptores afecta serialización y copia.',
          'Arrays son objetos con índices y `length`. `for...of` recorre valores de un iterable; `for...in` recorre claves enumerables y no conviene para arrays.',
        ],
      },
      {
        title: 'Mecanismo y aplicación',
        items: [
          '`map` crea una colección transformada, `filter` conserva elementos, `reduce` acumula, `find` devuelve la primera coincidencia y `some` o `every` evalúan predicados. Cada método comunica una intención distinta y evita acumular efectos dentro de un loop genérico.',
          '`sort` muta y convierte a string sin comparator. `toSorted`, `toReversed`, `toSpliced` y `with` devuelven copias en runtimes modernos.',
          'Una pure function depende de sus argumentos y no produce efectos observables. La pureza mejora tests y composición, pero una aplicación necesita efectos en fronteras controladas.',
        ],
      },
      {
        title: 'Decisiones y límites',
        items: [
          'Currying transforma una función de varios argumentos en una secuencia de funciones. Partial application fija algunos argumentos; no son conceptos idénticos.',
          'Memoization guarda resultados asociados a sus argumentos. La estrategia necesita una regla de igualdad, un límite de tamaño y una política de invalidación; sin esos límites, la caché puede devolver datos obsoletos o retener memoria sin control.',
          'Big O describe crecimiento. Acceso por índice de array suele ser O(1); búsqueda lineal O(n); sort comparativo O(n log n); acceso promedio a Map O(1). Las constantes todavía afectan al usuario.',
        ],
      },
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
      {
        id: 'topic-014-shallow-copy',
        question: '¿Shallow copy?',
        answer:
          'Crea un contenedor nuevo y conserva las mismas referencias anidadas. Con `const copy = { ...original }`, `copy !== original`, pero `copy.user === original.user` si `user` es un objeto.',
      },
      {
        id: 'topic-015-structuredclone',
        question: '¿`structuredClone`?',
        answer: 'Clona estructuras soportadas y ciclos; no clona funciones.',
      },
      {
        id: 'topic-016-prototipo',
        question: '¿Prototipo?',
        answer:
          'Objeto delegado que JavaScript consulta cuando una propiedad falta en el receiver.',
      },
      {
        id: 'topic-017-own-property',
        question: '¿Own property?',
        answer:
          'Propiedad definida en el objeto, comprobable con Object.hasOwn.',
      },
      {
        id: 'topic-018-for-in-o-for-of',
        question: '¿`for...in` o `for...of`?',
        answer:
          'In recorre claves enumerables; of recorre valores de un iterable.',
      },
      {
        id: 'topic-019-metodos-de-array-mutables',
        question: '¿Métodos de array mutables?',
        answer:
          'Push, pop, shift, unshift, splice, sort, reverse, fill y copyWithin.',
      },
      {
        id: 'topic-020-find-o-filter',
        question: '¿`find` o `filter`?',
        answer:
          'Find devuelve el primer match; filter crea un array con todos.',
      },
      {
        id: 'topic-021-pure-function',
        question: '¿Pure function?',
        answer:
          'Mismo resultado para mismas entradas y sin efectos observables.',
      },
      {
        id: 'topic-022-currying',
        question: '¿Currying?',
        answer:
          'Convierte una función de varios argumentos en una secuencia de funciones.',
      },
      {
        id: 'topic-116-inmutabilidad',
        question: '¿Inmutabilidad?',
        answer:
          'Crear nuevas referencias en lugar de mutar estado compartido; mejora previsibilidad y detección.',
      },
      {
        id: 'topic-117-object-freeze',
        question: '¿`Object.freeze`?',
        answer:
          'Congelación superficial; no protege objetos anidados sin trabajo adicional.',
      },
    ],
    references: [
      {
        label: 'MDN · JavaScript objects',
        url: 'https://developer.mozilla.org/docs/Web/JavaScript/Guide/Working_with_objects',
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
    theorySections: [
      {
        title: 'Modelo de ejecución',
        items: [
          'El código síncrono termina una instrucción antes de comenzar la siguiente. JavaScript usa un solo call stack para ejecutar ese código en el main thread del navegador. Una función lenta ocupa el stack y retrasa clicks, input, layout y paint.',
          'Una operación asíncrona inicia un trabajo cuyo resultado llegará después. El navegador puede encargarse de un timer, una petición de red o un evento mientras el stack continúa con otras instrucciones. Asincronía describe coordinación en el tiempo; no significa que dos fragmentos de JavaScript se ejecuten al mismo tiempo en el mismo thread.',
          'El event loop coordina el call stack con el entorno del navegador y sus colas. Toma una task, ejecuta su callback hasta vaciar el stack, drena todas las microtasks pendientes, permite que el navegador renderice y después avanza a otra task. `setTimeout`, eventos y mensajes generan tasks; continuaciones de Promises y `queueMicrotask` generan microtasks.',
          'Una `Promise` es un objeto que representa el resultado futuro de una sola operación. Nace en estado `pending` y termina como `fulfilled` con un valor o `rejected` con una razón. `fulfilled` y `rejected` forman el estado `settled`. Una Promise settled no puede cambiar de estado ni volver a emitir otro resultado.',
          'El constructor `new Promise(executor)` ejecuta el executor de inmediato y de forma síncrona. Las funciones `resolve` y `reject` fijan el resultado eventual; no vuelven asíncrono el trabajo que se ejecuta dentro del executor. La asincronía proviene de la API usada, como `fetch`, un timer o IndexedDB. Si una API ya devuelve una Promise, envolverla en otra suele agregar código y errores sin aportar control.',
        ],
      },
      {
        title: 'Promise y async/await',
        items: [
          '`then` registra el camino de éxito, `catch` registra el de rechazo y `finally` ejecuta cleanup sin recibir ni reemplazar el resultado salvo que lance un error. Cada método devuelve una Promise nueva. Por eso una cadena no modifica la Promise anterior: cada eslabón describe cómo obtener el resultado siguiente.',
          'El valor que retorna un callback decide el siguiente eslabón. Un valor común cumple la Promise siguiente con ese valor; una Promise o thenable hace que la siguiente adopte su estado; un `throw` la rechaza. Omitir `return` entrega `undefined` y deja fuera de la cadena cualquier operación iniciada dentro del callback.',
          'Los handlers de `then`, `catch` y `finally` no corren durante el stack actual, aunque la Promise ya esté settled. JavaScript los encola como microtasks. El navegador drena esa cola antes de tomar otra task, por eso una cadena que crea microtasks sin terminar puede retrasar timers, eventos y render.',
          'Una función declarada con `async` devuelve una Promise. Un `return value` produce una Promise fulfilled con `value`; un `throw error` produce una Promise rejected. `await promise` pausa sólo la ejecución de esa función, libera el stack y reanuda su continuación como microtask cuando la Promise termina. `await` no bloquea el thread ni mueve trabajo de CPU a otro thread.',
          'Dos `await` consecutivos suelen ejecutar operaciones en secuencia cuando la segunda comienza después de resolver la primera. Si ambas son independientes, iniciarlas antes y esperar `Promise.all` reduce el tiempo total. La concurrencia empieza al crear o invocar las operaciones, no al escribir `Promise.all`.',
        ],
      },
      {
        title: 'Observable y streams',
        items: [
          'Los combinadores expresan políticas distintas. `Promise.all` cumple cuando todas cumplen, conserva el orden de entrada y rechaza ante el primer rechazo observado. `Promise.allSettled` espera todos los resultados. `Promise.race` adopta el primer settlement. `Promise.any` toma el primer fulfillment y, si todos rechazan, devuelve un `AggregateError`.',
          'Un `Observable` representa una fuente que puede enviar cero, uno o varios valores a lo largo del tiempo. Una suscripción conecta un observer con esa fuente. El observer puede recibir notificaciones `next`, una única notificación terminal `error` o una única notificación terminal `complete`. Después de `error` o `complete` no llegan más valores.',
          'La mayoría de los Observables de RxJS son lazy: el producer comienza para cada `subscribe`. Un Observable cold crea una ejecución independiente por suscriptor, como una request HTTP. Un Observable hot comparte una fuente que ya produce, como eventos del usuario o un Subject. Operadores como `map`, `filter`, `switchMap` y `catchError` crean Observables nuevos y describen el flujo sin mutar la fuente.',
          '`unsubscribe` ejecuta el teardown registrado por el Observable y deja de entregar notificaciones a ese suscriptor. Detener el trabajo subyacente depende de que el producer implemente ese teardown. Angular `HttpClient` aborta la request al desuscribirse; un Observable propio que inicia un timer debe cancelarlo en su función de cleanup. Desuscribirse no deshace efectos que ya ocurrieron.',
          'Promise y Observable modelan contratos distintos. Una Promise comparte un único resultado settled y se consume con `then` o `await`. Un Observable modela una secuencia, puede ser lazy, permite composición temporal y ofrece teardown por suscripción. Convertir entre ambos puede perder información: `firstValueFrom` toma el primer valor y necesita que la fuente emita o termine; convertir una Promise a Observable no vuelve cancelable la operación original.',
        ],
      },
      {
        title: 'Cancelación, errores y rendimiento',
        items: [
          '`try/catch` captura errores síncronos del bloque y rechazos que atraviesan un `await`. No captura un error lanzado más tarde por un callback desconectado, como un `setTimeout`. Ese callback necesita su propio manejo o debe formar parte de una Promise que el flujo retorne y espere.',
          'Una Promise no define cancelación. `AbortController` permite pedirle a `fetch` y a otras APIs compatibles que detengan su trabajo mediante una `signal`. Cancelar el cliente evita procesar una respuesta innecesaria, aunque el servidor puede continuar si ya recibió y empezó la operación.',
          'Una race condition aparece cuando varias operaciones compiten por actualizar el mismo estado y terminan en otro orden. Un buscador puede mostrar una respuesta vieja si la primera petición tarda más que la última. Abortá la anterior, asigná una versión a cada solicitud o aceptá el resultado sólo si todavía corresponde a la consulta vigente.',
          'Debounce espera un período sin eventos antes de ejecutar; sirve para búsquedas mientras el usuario escribe. Throttle impone una frecuencia máxima; sirve para scroll o resize. Ambos necesitan cleanup para cancelar timers o trabajo pendiente cuando se destruye el consumidor.',
          '`async/await` organiza espera de I/O, pero no reduce el costo del código síncrono. Dividí CPU intenso en tareas pequeñas cuando necesitás devolver control al navegador. Usá un Web Worker cuando el cálculo merece otro thread y el costo de copiar datos y enviar mensajes resulta aceptable.',
        ],
      },
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
      {
        id: 'topic-023-debounce-o-throttle',
        question: '¿Debounce o throttle?',
        answer:
          'Debounce espera silencio; throttle limita ejecuciones por intervalo.',
      },
      {
        id: 'topic-024-promise-all',
        question: '¿`Promise.all`?',
        answer: 'Conserva orden y rechaza al primer rechazo observado.',
      },
      {
        id: 'topic-025-allsettled',
        question: '¿`allSettled`?',
        answer: 'Espera todos y devuelve el estado de cada operación.',
      },
      {
        id: 'topic-026-abortcontroller',
        question: '¿AbortController?',
        answer:
          'Emite una señal de cancelación que consumen fetch y otras APIs.',
      },
      {
        id: 'topic-027-async-bloquea-el-thread',
        question: '¿Async bloquea el thread?',
        answer:
          'No. Await cede la continuación; CPU síncrono sigue bloqueando.',
      },
      {
        id: 'topic-028-unhandled-rejection',
        question: '¿Unhandled rejection?',
        answer:
          'Promise rechazada sin handler; registrala y corregí la cadena, no la ocultes.',
      },
      {
        id: 'topic-114-microtask',
        question: '¿Microtask?',
        answer:
          'Cola de promesas que se drena antes de la siguiente macrotask.',
      },
    ],
    code: "function delay(ms, value) {\n  return new Promise((resolve) => {\n    setTimeout(() => resolve(value), ms);\n  });\n}\n\nasync function loadDashboard() {\n  const userRequest = delay(300, { id: 7 });\n  const settingsRequest = delay(200, { theme: 'dark' });\n\n  try {\n    const [user, settings] = await Promise.all([\n      userRequest,\n      settingsRequest,\n    ]);\n    return { user, settings };\n  } catch (error) {\n    throw new Error('No se pudo cargar el dashboard', { cause: error });\n  }\n}\n\nconsole.log('A');\nsetTimeout(() => console.log('B'), 0);\nPromise.resolve().then(() => console.log('C'));\nqueueMicrotask(() => console.log('D'));\nconsole.log('E');\n\n// A, E, C, D, B\nloadDashboard().then(console.log).catch(console.error);",
    references: [
      {
        label: 'MDN · Asynchronous JavaScript',
        url: 'https://developer.mozilla.org/docs/Learn_web_development/Extensions/Async_JS',
      },
      {
        label: 'RxJS · Observable',
        url: 'https://rxjs.dev/guide/observable',
      },
    ],
  },
  {
    id: 'typescript-avanzado',
    number: '06',
    groupId: 'fundamentos-web',
    title: 'TypeScript avanzado',
    intro:
      'Angular amplifica TypeScript. Una base débil en el lenguaje produce templates inseguros, estado mutable y RxJS difícil de mantener.',
    theory: [
      'TypeScript agrega un sistema de tipos estático sobre JavaScript. El compilador comprueba el programa y elimina los tipos al emitir JavaScript; por eso un tipo no valida datos que llegan en runtime.',
      'La inferencia deduce tipos a partir de valores y contexto. El tipado estructural considera compatibles dos valores cuando su forma satisface el contrato, aunque no compartan una clase o declaración nominal.',
      'Una unión expresa alternativas y el narrowing descarta posibilidades mediante `typeof`, `in`, `instanceof`, discriminantes o type guards. Un `switch` que entrega el caso restante a `never` detecta variantes nuevas durante la compilación.',
      '`interface` describe contratos extensibles y admite declaration merging. `type` también representa unions, tuplas, primitivas y tipos calculados. La capacidad que necesita el modelo decide la elección.',
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
    theorySections: [
      {
        title: 'Sistema de tipos',
        items: [
          'TypeScript agrega un sistema de tipos estático sobre JavaScript. El compilador comprueba el programa y elimina los tipos al emitir JavaScript; por eso un tipo no valida datos que llegan en runtime.',
          'La inferencia deduce tipos a partir de valores y contexto. El tipado estructural considera compatibles dos valores cuando su forma satisface el contrato, aunque no compartan una clase o declaración nominal.',
          'Una unión expresa alternativas y el narrowing descarta posibilidades mediante `typeof`, `in`, `instanceof`, discriminantes o type guards. Un `switch` que entrega el caso restante a `never` detecta variantes nuevas durante la compilación.',
          '`interface` describe contratos extensibles y admite declaration merging. `type` también representa unions, tuplas, primitivas y tipos calculados. La capacidad que necesita el modelo decide la elección.',
          'TypeScript extiende JavaScript con un sistema de tipos estático. El compilador comprueba el programa y elimina los tipos al emitir JavaScript; por eso una anotación no valida por sí sola los datos que llegan en runtime.',
        ],
      },
      {
        title: 'Narrowing y modelado',
        items: [
          "La inferencia obtiene un tipo desde el valor y su contexto. Una anotación fija el contrato de forma explícita. `as const` conserva literales y vuelve readonly la estructura inferida, mientras una anotación amplia puede convertir un literal como `'open'` en `string`.",
          'TypeScript usa tipado estructural: dos valores son compatibles cuando su forma cumple las propiedades requeridas, aunque sus clases o nombres sean distintos. El exceso de propiedades se comprueba con más rigor en object literals que en variables intermedias.',
          'Una `interface` describe contratos de objetos y admite declaration merging. Un `type` también puede representar unions, intersections, primitivas, tuplas y transformaciones calculadas. Ambos pueden expresar muchos contratos de objetos.',
          'Una union `A | B` acepta cualquiera de sus miembros y sólo permite operaciones comunes hasta estrechar el tipo. Una intersection `A & B` exige que el valor cumpla ambos contratos al mismo tiempo.',
          'Las firmas de funciones tipan parámetros y retorno. Los overloads publican varias formas válidas de llamada sobre una implementación, mientras los parámetros opcionales, rest y valores por defecto modelan variaciones dentro de una misma firma.',
        ],
      },
      {
        title: 'Tipos calculados y generics',
        items: [
          '`any` desactiva la comprobación para el valor y permite que el hueco de tipos se propague. `unknown` acepta cualquier valor, pero exige comprobar su tipo antes de operar con él.',
          '`never` representa un valor que no puede existir. Aparece en funciones que no retornan y en ramas exhaustivas de una unión, donde permite detectar variantes sin manejar durante la compilación.',
          'Un generic introduce parámetros de tipo. La relación entre entrada y salida se conserva sin reemplazarla por `any`; por ejemplo, una función `identity<T>(value: T): T` devuelve el mismo tipo que recibió.',
          'Una discriminated union reúne variantes que comparten una propiedad literal, como `kind`. Al comprobar esa propiedad, TypeScript estrecha el tipo y habilita únicamente los campos de la variante activa. Un caso `default` asignado a `never` detecta estados nuevos que todavía no tienen manejo.',
          'El operador `satisfies` comprueba que una expresión cumple un tipo sin reemplazar el tipo inferido de la expresión. Una anotación puede ensanchar el valor y un type assertion sólo le pide al compilador que confíe en el programador.',
        ],
      },
      {
        title: 'Runtime y configuración',
        items: [
          'Los utility types transforman tipos existentes. `Partial` vuelve opcionales sus propiedades, `Required` hace lo contrario, `Pick` y `Omit` seleccionan claves, y `Record` modela un mapa de claves a valores.',
          'Un type guard estrecha un tipo dentro de una rama. `typeof`, `instanceof`, el operador `in`, predicados `value is T` y funciones de assertion permiten demostrarle al compilador qué variante existe en runtime.',
          'Optional chaining (`?.`) corta una cadena sólo ante `null` o `undefined`. Nullish coalescing (`??`) usa el valor alternativo únicamente para esos dos casos, mientras que `||` también reemplaza `0`, `false` y la cadena vacía.',
          'Los decorators reciben metadata sobre clases o miembros y pueden reemplazar o complementar su definición según la propuesta y configuración usada. Angular los emplea para registrar componentes, directivas, pipes e inyectables.',
          'La configuración `strict` activa un conjunto de comprobaciones, entre ellas nullability, parámetros de funciones y propiedades inicializadas. El compilador encuentra estados inválidos antes de que lleguen al template o al runtime.',
        ],
      },
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
      {
        question: '¿TypeScript valida una respuesta HTTP?',
        answer:
          'No. Los tipos desaparecen al compilar y una assertion sólo cambia lo que cree el compilador. Valido el JSON con un schema o type guard en la frontera y recién entonces lo convierto al modelo interno.',
      },
      {
        question: '¿Qué significa que TypeScript sea estructural?',
        answer:
          'La compatibilidad depende de la forma del valor. Si un objeto posee las propiedades requeridas con tipos compatibles, puede satisfacer el contrato aunque provenga de otra declaración. Esto facilita composición, pero exige cuidado con exceso de propiedades y tipos demasiado amplios.',
      },
      {
        question: '¿Cómo funciona un conditional type con `infer`?',
        answer:
          'Un conditional type elige un resultado según una relación `T extends U`. `infer` declara una variable de tipo dentro del patrón: `type Result<T> = T extends Promise<infer R> ? R : T` extrae el valor resuelto de una Promise.',
      },
      {
        question: '¿Cuándo usarías un mapped type?',
        answer:
          'Cuando un contrato deriva de otro de forma mecánica. `type Flags<T> = { [K in keyof T]: boolean }` conserva las keys y cambia sus valores. Esto evita duplicar modelos que luego divergen.',
      },
      {
        id: 'topic-112-unknown',
        question: '¿`unknown`?',
        answer:
          'Tipo seguro para valor no validado; obliga a estrechar antes de usar.',
      },
      {
        id: 'topic-113-never',
        question: '¿`never`?',
        answer: 'Representa estados imposibles y permite checks exhaustivos.',
      },
    ],
    code: "type LoadState<T> =\n  | { kind: 'idle' }\n  | { kind: 'loading' }\n  | { kind: 'success'; data: T }\n  | { kind: 'error'; error: Error };\n\nfunction assertNever(value: never): never {\n  throw new Error(`Unhandled state: ${JSON.stringify(value)}`);\n}",
    references: [
      {
        label: 'TypeScript · Handbook',
        url: 'https://www.typescriptlang.org/docs/handbook/intro.html',
      },
    ],
  },
  {
    id: 'angular-fundamentos-renderizado-y-versiones',
    number: '07',
    groupId: 'angular-core',
    title: 'Angular: fundamentos, renderizado y versiones',
    intro:
      'Angular organiza la aplicación como un árbol de componentes, compila templates, inyecta dependencias y actualiza el DOM mediante change detection. Desde esa base se entienden standalone, Signals, zoneless y las migraciones entre versiones.',
    theory: [
      'Angular es un framework para construir aplicaciones web a partir de un árbol de componentes. Cada componente une una clase TypeScript, una plantilla, estilos y un host element. El router, la inyección de dependencias, forms y HttpClient completan la plataforma.',
      '`bootstrapApplication` crea el environment injector, instancia el componente raíz y conecta su host view al DOM. Desde esa raíz Angular recorre views, evalúa bindings y actualiza sólo las propiedades del DOM cuyo valor cambió.',
      'Una plantilla combina HTML con expresiones y bindings. `{{ value }}` interpola texto, `[property]` escribe una propiedad, `[attr.name]` escribe un atributo, `(event)` escucha un evento y `[(value)]` combina entrada y salida bajo un contrato de two-way binding.',
      'Angular compila las plantillas y conoce de antemano qué nodos y bindings debe crear. Change detection vuelve a evaluar esos bindings cuando una notificación marca una vista para comprobar; Signals permiten registrar dependencias reactivas precisas.',
      'Angular publica las versiones mayores de core y CLI de forma alineada. Cada versión admite rangos concretos de Node.js, TypeScript y RxJS; `ng version`, la tabla de compatibilidad y el Update Guide permiten comprobarlos antes de una migración.',
      'Las aplicaciones nuevas usan componentes standalone. NgModules siguen siendo relevantes en bases antiguas y bibliotecas, pero ya no deben dirigir un diseño nuevo sin motivo.',
      'Angular 21+ usa change detection zoneless por defecto. El código debe notificar cambios mediante signals, listeners, `AsyncPipe`, `setInput` o `markForCheck`.',
      'El control flow moderno usa `@if`, `@for`, `@switch` y `@empty`. `track` necesita una identidad estable; usar el índice en listas mutables crea errores visuales y trabajo DOM.',
      '`@defer` separa las dependencias de una vista en otro chunk y las carga mediante triggers como viewport, idle o interaction. LCP y CLS muestran si diferir contenido visible empeora la carga principal o provoca saltos de layout.',
      'La adopción de una API nueva depende de su estabilidad, soporte, capacidad del equipo y costo de fallback. APIs como `resource`, `httpResource` o Signal Forms requieren revisar su estado antes de incorporarlas a una base de producción.',
    ],
    theorySections: [
      {
        title: 'Modelo de Angular',
        items: [
          'Angular es un framework para construir aplicaciones web a partir de un árbol de componentes. Cada componente une una clase TypeScript, una plantilla, estilos y un host element. El router, la inyección de dependencias, forms y HttpClient completan la plataforma.',
          '`bootstrapApplication` crea el environment injector, instancia el componente raíz y conecta su host view al DOM. Desde esa raíz Angular recorre views, evalúa bindings y actualiza sólo las propiedades del DOM cuyo valor cambió.',
          'Una plantilla combina HTML con expresiones y bindings. `{{ value }}` interpola texto, `[property]` escribe una propiedad, `[attr.name]` escribe un atributo, `(event)` escucha un evento y `[(value)]` combina entrada y salida bajo un contrato de two-way binding.',
        ],
      },
      {
        title: 'Templates y actualización del DOM',
        items: [
          'Angular compila las plantillas y conoce de antemano qué nodos y bindings debe crear. Change detection vuelve a evaluar esos bindings cuando una notificación marca una vista para comprobar; Signals permiten registrar dependencias reactivas precisas.',
          'Angular publica las versiones mayores de core y CLI de forma alineada. Cada versión admite rangos concretos de Node.js, TypeScript y RxJS; `ng version`, la tabla de compatibilidad y el Update Guide permiten comprobarlos antes de una migración.',
          'Las aplicaciones nuevas usan componentes standalone. NgModules siguen siendo relevantes en bases antiguas y bibliotecas, pero ya no deben dirigir un diseño nuevo sin motivo.',
        ],
      },
      {
        title: 'Angular moderno',
        items: [
          'Angular 21+ usa change detection zoneless por defecto. El código debe notificar cambios mediante signals, listeners, `AsyncPipe`, `setInput` o `markForCheck`.',
          'El control flow moderno usa `@if`, `@for`, `@switch` y `@empty`. `track` necesita una identidad estable; usar el índice en listas mutables crea errores visuales y trabajo DOM.',
        ],
      },
      {
        title: 'Versiones y migraciones',
        items: [
          '`@defer` separa las dependencias de una vista en otro chunk y las carga mediante triggers como viewport, idle o interaction. LCP y CLS muestran si diferir contenido visible empeora la carga principal o provoca saltos de layout.',
          'La adopción de una API nueva depende de su estabilidad, soporte, capacidad del equipo y costo de fallback. APIs como `resource`, `httpResource` o Signal Forms requieren revisar su estado antes de incorporarlas a una base de producción.',
        ],
      },
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
      {
        question:
          '¿Qué ocurre desde `bootstrapApplication` hasta ver el primer componente?',
        answer:
          'Angular crea el environment injector con los providers de la aplicación, instancia el componente raíz, crea su host view y ejecuta el primer render. La plantilla compilada crea nodos, evalúa bindings y conecta listeners antes de que los cambios posteriores entren en change detection.',
      },
      {
        question: '¿Interpolación, property binding o attribute binding?',
        answer:
          'Interpolación produce texto. Property binding escribe una propiedad runtime del elemento o componente. Attribute binding escribe el atributo, por ejemplo ARIA o SVG. Elijo según el destino real del valor, no según una preferencia de sintaxis.',
      },
      {
        question: '¿Cómo actualiza Angular el DOM?',
        answer:
          'La plantilla compilada contiene instrucciones para cada binding. Durante change detection Angular evalúa la expresión, compara el resultado con el valor anterior y escribe sólo el destino que cambió. No vuelve a construir todo el HTML del componente.',
      },
      {
        question:
          '¿Qué adoptarías primero al modernizar una aplicación antigua?',
        answer:
          'Actualizo majors soportadas y estabilizo tests. Después reduzco NgModules con standalone, migro control flow y recién introduzco Signals o zoneless donde el modelo de estado lo justifique. Cada etapa conserva una forma de medir y revertir.',
      },
      {
        id: 'topic-081-standalone',
        question: '¿Standalone?',
        answer:
          'Componente que declara dependencias en imports y no necesita declaración en NgModule.',
      },
    ],
    code: "bootstrapApplication(AppComponent, {\n  providers: [provideRouter(routes), provideHttpClient()],\n});\n\n@Component({\n  selector: 'app-root',\n  template: `\n    <button [disabled]=\"saving()\" (click)=\"save()\">\n      {{ saving() ? 'Guardando…' : 'Guardar' }}\n    </button>\n  `,\n})\nexport class AppComponent {\n  saving = signal(false);\n}",
    references: [
      {
        label: 'Angular · Essentials',
        url: 'https://angular.dev/essentials',
      },
      {
        label: 'Angular · Releases',
        url: 'https://angular.dev/reference/releases',
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
      'Cada componente renderiza dentro de un host element. La propiedad `host` de la metadata declara clases, atributos, propiedades y listeners del host en un solo lugar; una binding del consumidor puede colisionar con una binding del componente y Angular resuelve la prioridad según cuál sea estática o dinámica.',
      '`@let` declara un valor local que Angular mantiene actualizado. Una template reference variable como `#input` referencia un elemento, componente, directiva exportada o `TemplateRef`, y sólo existe dentro del scope de la view donde se declaró.',
      '`ng-container` agrupa bindings sin crear un nodo DOM. `ng-template` declara un fragmento que no se renderiza por sí solo; Angular lo representa con `TemplateRef` y puede instanciarlo mediante `NgTemplateOutlet` o `ViewContainerRef.createEmbeddedView`.',
      '`NgComponentOutlet` y `ViewContainerRef.createComponent` crean componentes conocidos en runtime. Los helpers `inputBinding`, `outputBinding` y `twoWayBinding` conectan su API al crearlos y evitan asignaciones o subscriptions manuales dispersas.',
      'La metadata de un componente conecta una clase con su selector, template, estilos, estrategia de encapsulación, change detection, imports y providers. Los host bindings aplican propiedades, atributos o listeners al elemento anfitrión del componente.',
      '`input()` declara un signal de entrada y `output()` crea un emisor tipado hacia el padre. `model()` combina una entrada con su salida `nombreChange`, lo que habilita two-way binding para controles cuyo valor forma parte de su contrato público.',
      'La proyección con `ng-content` define slots estáticos. `TemplateRef`, `ng-template`, `ViewContainerRef` y creación dinámica cubren composición avanzada.',
      '`viewChild` y `viewChildren` consultan la vista propia; `contentChild` y `contentChildren` consultan contenido proyectado. Las queries basadas en signals cambian cuando cambia el árbol. Una query `required` falla si el contrato no encuentra el hijo esperado.',
      'Una directiva añade comportamiento; un componente añade comportamiento y vista. Una pipe pura debe transformar sin efectos y devolver el mismo resultado para las mismas entradas.',
      'Angular puede evaluar una expresión de template durante cada comprobación de la vista. Una función costosa invocada desde el template repite ese trabajo. `computed` memoriza una derivación y sólo la recalcula cuando cambia alguno de los signals leídos.',
    ],
    theorySections: [
      {
        title: 'Contrato del componente',
        items: [
          'Cada componente renderiza dentro de un host element. La propiedad `host` de la metadata declara clases, atributos, propiedades y listeners del host en un solo lugar; una binding del consumidor puede colisionar con una binding del componente y Angular resuelve la prioridad según cuál sea estática o dinámica.',
          '`@let` declara un valor local que Angular mantiene actualizado. Una template reference variable como `#input` referencia un elemento, componente, directiva exportada o `TemplateRef`, y sólo existe dentro del scope de la view donde se declaró.',
          '`ng-container` agrupa bindings sin crear un nodo DOM. `ng-template` declara un fragmento que no se renderiza por sí solo; Angular lo representa con `TemplateRef` y puede instanciarlo mediante `NgTemplateOutlet` o `ViewContainerRef.createEmbeddedView`.',
        ],
      },
      {
        title: 'Templates y fragmentos',
        items: [
          '`NgComponentOutlet` y `ViewContainerRef.createComponent` crean componentes conocidos en runtime. Los helpers `inputBinding`, `outputBinding` y `twoWayBinding` conectan su API al crearlos y evitan asignaciones o subscriptions manuales dispersas.',
          'La metadata de un componente conecta una clase con su selector, template, estilos, estrategia de encapsulación, change detection, imports y providers. Los host bindings aplican propiedades, atributos o listeners al elemento anfitrión del componente.',
          '`input()` declara un signal de entrada y `output()` crea un emisor tipado hacia el padre. `model()` combina una entrada con su salida `nombreChange`, lo que habilita two-way binding para controles cuyo valor forma parte de su contrato público.',
        ],
      },
      {
        title: 'Composición y render dinámico',
        items: [
          'La proyección con `ng-content` define slots estáticos. `TemplateRef`, `ng-template`, `ViewContainerRef` y creación dinámica cubren composición avanzada.',
          '`viewChild` y `viewChildren` consultan la vista propia; `contentChild` y `contentChildren` consultan contenido proyectado. Las queries basadas en signals cambian cuando cambia el árbol. Una query `required` falla si el contrato no encuentra el hijo esperado.',
        ],
      },
      {
        title: 'Rendimiento del template',
        items: [
          'Una directiva añade comportamiento; un componente añade comportamiento y vista. Una pipe pura debe transformar sin efectos y devolver el mismo resultado para las mismas entradas.',
          'Angular puede evaluar una expresión de template durante cada comprobación de la vista. Una función costosa invocada desde el template repite ese trabajo. `computed` memoriza una derivación y sólo la recalcula cuando cambia alguno de los signals leídos.',
        ],
      },
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
      {
        question: '¿Property binding o attribute binding?',
        answer:
          'Una property binding escribe en la propiedad runtime del elemento o componente, por ejemplo `[disabled]`. Una attribute binding escribe el atributo HTML con `[attr.aria-expanded]`. Uso atributos para ARIA, SVG o metadata sin una propiedad DOM equivalente.',
      },
      {
        question: '¿Qué representa una template reference variable?',
        answer:
          'Depende del nodo: en un elemento nativo referencia el HTMLElement, en un componente su instancia, con `exportAs` una directiva y sobre `ng-template` un TemplateRef. Su scope pertenece a la view que la declara.',
      },
      {
        question: '¿Por qué `ng-template` no aparece en el DOM?',
        answer:
          'Declara una receta de view. Angular sólo crea sus nodos cuando una directiva, `NgTemplateOutlet` o `ViewContainerRef` instancia su TemplateRef. Esto permite repetir el fragmento y pasarle contexto.',
      },
      {
        question: '¿Cómo crearías un componente dinámico con bindings?',
        answer:
          'Uso `ViewContainerRef.createComponent` si debe formar parte de esa view y paso `bindings` con `inputBinding`, `outputBinding` o `twoWayBinding`. Para un caso declarativo puedo usar `NgComponentOutlet`; para lazy loading visual prefiero evaluar `@defer`.',
      },
      {
        id: 'topic-061-componente-o-directiva',
        question: '¿Componente o directiva?',
        answer:
          'El componente posee vista; la directiva agrega comportamiento a un host.',
      },
      {
        id: 'topic-062-pipe-pura',
        question: '¿Pipe pura?',
        answer:
          'Angular puede reutilizar el resultado mientras no cambien las referencias de entrada.',
      },
      {
        id: 'topic-063-for-track',
        question: '¿`@for track`?',
        answer:
          'Asocia identidad de datos con nodos DOM para minimizar creación y conservar estado.',
      },
    ],
    code: "@Component({\n  selector: 'user-picker',\n  host: { '[class.disabled]': 'disabled()' },\n  template: `\n    @let selected = selectedUser();\n    <button #trigger (click)=\"open.set(true)\">{{ selected?.name ?? 'Elegir' }}</button>\n    <ng-template #row let-user>\n      <button (click)=\"select(user)\">{{ user.name }}</button>\n    </ng-template>\n  `,\n})\nexport class UserPicker {\n  disabled = input(false);\n  selectedUser = model<User | null>(null);\n  open = signal(false);\n}",
    references: [
      {
        label: 'Angular · Templates',
        url: 'https://angular.dev/guide/templates',
      },
      {
        label: 'Angular · Programmatic rendering',
        url: 'https://angular.dev/guide/components/programmatic-rendering',
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
      'Angular crea una instancia, asigna inputs, ejecuta el primer change detection, inicializa contenido y vista, y luego repite los hooks de check en cada recorrido. Cada hook corresponde a un punto concreto de ese proceso y no funciona como un evento genérico.',
      'Los hooks de render no se ejecutan durante SSR. `afterNextRender` sirve para una operación DOM posterior al próximo render y `afterEveryRender` para una integración que debe acompañar renders sucesivos; ambos requieren cleanup si crean recursos persistentes.',
      'El constructor configura dependencias y estado barato. `ngOnInit` usa inputs inicializados. `ngOnChanges` reacciona a cambios de inputs y corre antes de `ngOnInit` en la primera pasada.',
      '`ngAfterContentInit/Checked` se relacionan con contenido proyectado. `ngAfterViewInit/Checked` se relacionan con la vista propia y queries.',
      '`afterNextRender` ejecuta un callback después del siguiente render completo; `afterEveryRender` lo hace tras cada render. Agrupar escrituras DOM antes de lecturas geométricas evita alternar style recalculation y layout forzado.',
      '`DestroyRef` registra cleanup en el mismo contexto donde nace un recurso. `takeUntilDestroyed` completa una suscripción cuando ese contexto se destruye. Observers, timers y listeners creados fuera de Angular requieren también su función explícita de limpieza.',
      '`ExpressionChangedAfterItHasBeenCheckedError` aparece en desarrollo cuando una expresión cambia después de que Angular ya verificó esa vista dentro del mismo ciclo. La causa suele ser un flujo de datos que escribe hacia un ancestro o modifica estado durante un hook tardío; diferir con un timer oculta la inconsistencia.',
    ],
    theorySections: [
      {
        title: 'Modelo mental',
        items: [
          'Angular crea una instancia, asigna inputs, ejecuta el primer change detection, inicializa contenido y vista, y luego repite los hooks de check en cada recorrido. Cada hook corresponde a un punto concreto de ese proceso y no funciona como un evento genérico.',
          'Los hooks de render no se ejecutan durante SSR. `afterNextRender` sirve para una operación DOM posterior al próximo render y `afterEveryRender` para una integración que debe acompañar renders sucesivos; ambos requieren cleanup si crean recursos persistentes.',
          'El constructor configura dependencias y estado barato. `ngOnInit` usa inputs inicializados. `ngOnChanges` reacciona a cambios de inputs y corre antes de `ngOnInit` en la primera pasada.',
        ],
      },
      {
        title: 'Funcionamiento y APIs',
        items: [
          '`ngAfterContentInit/Checked` se relacionan con contenido proyectado. `ngAfterViewInit/Checked` se relacionan con la vista propia y queries.',
          '`afterNextRender` ejecuta un callback después del siguiente render completo; `afterEveryRender` lo hace tras cada render. Agrupar escrituras DOM antes de lecturas geométricas evita alternar style recalculation y layout forzado.',
        ],
      },
      {
        title: 'Decisiones, riesgos y verificación',
        items: [
          '`DestroyRef` registra cleanup en el mismo contexto donde nace un recurso. `takeUntilDestroyed` completa una suscripción cuando ese contexto se destruye. Observers, timers y listeners creados fuera de Angular requieren también su función explícita de limpieza.',
          '`ExpressionChangedAfterItHasBeenCheckedError` aparece en desarrollo cuando una expresión cambia después de que Angular ya verificó esa vista dentro del mismo ciclo. La causa suele ser un flujo de datos que escribe hacia un ancestro o modifica estado durante un hook tardío; diferir con un timer oculta la inconsistencia.',
        ],
      },
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
      {
        question: '¿En qué orden corre la primera inicialización?',
        answer:
          'Angular asigna inputs, ejecuta `ngOnChanges`, `ngOnInit`, hooks de content, hooks de view y completa el render. Los hooks `Checked` vuelven a correr en recorridos posteriores; los `Init` corren una vez.',
      },
      {
        question: '¿`afterNextRender` funciona durante SSR?',
        answer:
          'No. Los render callbacks dependen del navegador. Los uso para medir o integrar DOM después del render y mantengo el camino SSR libre de esa API.',
      },
      {
        question: '¿Cuándo usarías `ngOnChanges` frente a `computed`?',
        answer:
          '`ngOnChanges` sirve cuando necesito comparar cambios de inputs o ejecutar una adaptación imperativa. Un `computed` expresa mejor una derivación pura de signal inputs porque mantiene la relación sin sincronización manual.',
      },
      {
        question:
          '¿Por qué un `setTimeout` puede esconder un ExpressionChanged?',
        answer:
          'Mueve la mutación a otra task y evita la comprobación actual, pero conserva un flujo de datos mal ubicado. Corrijo quién posee el estado o muevo el trabajo al hook y fase adecuados.',
      },
    ],
    references: [
      {
        label: 'Angular · Lifecycle',
        url: 'https://angular.dev/guide/components/lifecycle',
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
      'Change detection recorre las views que Angular considera necesarias, evalúa sus bindings y compara el resultado con el valor anterior. Una notificación marca una view y sus ancestros para que el próximo recorrido incluya esa rama.',
      'OnPush puede saltar un subárbol limpio. Un input con referencia nueva, un evento manejado en la view, una lectura de signal que cambia, `AsyncPipe`, `setInput` o `markForCheck` vuelven a marcar trabajo.',
      '`linkedSignal` conserva un estado editable que se reinicia o adapta cuando cambia una dependencia. `resource` y `httpResource` modelan carga asíncrona reactiva; su conveniencia no reemplaza una política explícita de caché, invalidación y errores.',
      'Default verifica un subárbol con mayor frecuencia. OnPush permite saltar subárboles cuando no reciben nuevos inputs ni notificaciones.',
      'Un signal writable usa `set` o `update`; `computed` deriva estado, memoriza y rastrea dependencias dinámicas; `effect` conecta estado reactivo con una API no reactiva.',
      '`computed` representa estado derivado: lee otros signals, memoriza el resultado y permanece libre de efectos. `effect` ejecuta una operación cuando cambian sus dependencias. Copiar una derivación mediante `effect` crea dos fuentes de verdad y puede producir ciclos o escrituras redundantes.',
      'Signals comparan por `Object.is` salvo función de igualdad. Una mutación profunda conserva la referencia y puede ocultar el cambio.',
      '`untracked` lee un signal sin registrar dependencia. Usalo cuando la lectura sea incidental, no para tapar un grafo mal diseñado.',
      'Zoneless reduce parches y checks innecesarios. Requiere que las actualizaciones lleguen mediante APIs que notifican a Angular.',
      'Signals y RxJS se complementan: signals para estado síncrono leído por la vista; RxJS para flujos asíncronos, cancelación, concurrencia y eventos.',
    ],
    theorySections: [
      {
        title: 'Recorrido y notificaciones',
        items: [
          'Change detection recorre las views que Angular considera necesarias, evalúa sus bindings y compara el resultado con el valor anterior. Una notificación marca una view y sus ancestros para que el próximo recorrido incluya esa rama.',
          'OnPush puede saltar un subárbol limpio. Un input con referencia nueva, un evento manejado en la view, una lectura de signal que cambia, `AsyncPipe`, `setInput` o `markForCheck` vuelven a marcar trabajo.',
          '`linkedSignal` conserva un estado editable que se reinicia o adapta cuando cambia una dependencia. `resource` y `httpResource` modelan carga asíncrona reactiva; su conveniencia no reemplaza una política explícita de caché, invalidación y errores.',
        ],
      },
      {
        title: 'Signals y estado derivado',
        items: [
          'Default verifica un subárbol con mayor frecuencia. OnPush permite saltar subárboles cuando no reciben nuevos inputs ni notificaciones.',
          'Un signal writable usa `set` o `update`; `computed` deriva estado, memoriza y rastrea dependencias dinámicas; `effect` conecta estado reactivo con una API no reactiva.',
          '`computed` representa estado derivado: lee otros signals, memoriza el resultado y permanece libre de efectos. `effect` ejecuta una operación cuando cambian sus dependencias. Copiar una derivación mediante `effect` crea dos fuentes de verdad y puede producir ciclos o escrituras redundantes.',
        ],
      },
      {
        title: 'OnPush y zoneless',
        items: [
          'Signals comparan por `Object.is` salvo función de igualdad. Una mutación profunda conserva la referencia y puede ocultar el cambio.',
          '`untracked` lee un signal sin registrar dependencia. Usalo cuando la lectura sea incidental, no para tapar un grafo mal diseñado.',
        ],
      },
      {
        title: 'Diagnóstico y rendimiento',
        items: [
          'Zoneless reduce parches y checks innecesarios. Requiere que las actualizaciones lleguen mediante APIs que notifican a Angular.',
          'Signals y RxJS se complementan: signals para estado síncrono leído por la vista; RxJS para flujos asíncronos, cancelación, concurrencia y eventos.',
        ],
      },
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
      {
        question: '¿Qué marca una view OnPush como dirty?',
        answer:
          'Una referencia nueva en un input, un evento manejado dentro de la view, un signal leído por la plantilla que cambia, AsyncPipe, `setInput` o `markForCheck`. Una mutación interna de un objeto sin notificación conserva la misma referencia y puede dejar la UI vieja.',
      },
      {
        question: '¿`markForCheck` o `detectChanges`?',
        answer:
          '`markForCheck` agenda la view para el próximo recorrido y mantiene el flujo normal. `detectChanges` ejecuta una comprobación inmediata de esa view y sus hijos; lo reservo para integraciones controladas porque puede introducir trabajo y orden inesperados.',
      },
      {
        question: '¿Qué resuelve `linkedSignal`?',
        answer:
          'Modela un estado editable que depende de otra señal y necesita reajustarse cuando cambia esa fuente, como una selección que debe seguir siendo válida al reemplazar la lista. Evita un effect dedicado a copiar y corregir estado.',
      },
      {
        question: '¿Cómo investigás demasiados renders?',
        answer:
          'Grabo una interacción con Angular DevTools y el Performance panel, identifico qué notificación marcó la rama y reviso referencias, funciones de template y efectos. Cambio una causa y vuelvo a medir scripting e INP.',
      },
      {
        id: 'topic-064-computed-o-effect',
        question: '¿`computed` o `effect`?',
        answer:
          '`computed` deriva estado; `effect` sincroniza con una API externa.',
      },
      {
        id: 'topic-077-onpush',
        question: '¿OnPush?',
        answer:
          'Permite saltar subárboles hasta que una notificación relevante marca la vista.',
      },
      {
        id: 'topic-078-zoneless',
        question: '¿Zoneless?',
        answer:
          'Angular recibe notificaciones explícitas y evita usar ZoneJS para inferir cambios.',
      },
      {
        id: 'topic-079-markforcheck',
        question: '¿`markForCheck`?',
        answer: 'Marca la vista para una próxima verificación.',
      },
      {
        id: 'topic-080-detectchanges',
        question: '¿`detectChanges`?',
        answer:
          'Ejecuta verificación local; su uso frecuente suele indicar un flujo defectuoso.',
      },
    ],
    code: "private readonly query = signal('');\nreadonly normalizedQuery = computed(() => this.query().trim().toLowerCase());\nreadonly results = computed(() =>\n  this.items().filter(x => x.name.toLowerCase().includes(this.normalizedQuery()))\n);",
    references: [
      {
        label: 'Angular · Signals',
        url: 'https://angular.dev/guide/signals',
      },
      {
        label: 'Angular · Zoneless',
        url: 'https://angular.dev/guide/zoneless',
      },
    ],
  },
  {
    id: 'dependency-injection-en-profundidad',
    number: '11',
    groupId: 'angular-core',
    title: 'Dependency Injection en profundidad',
    intro:
      'Angular resuelve dependencias en jerarquías. La ubicación del provider define vida útil, visibilidad y aislamiento.',
    theory: [
      'Dependency Injection separa la creación de una dependencia de su consumo. Angular busca un provider para un token, ejecuta su factory cuando corresponde y conserva la instancia según el injector que la posee.',
      "La resolución comienza en el injector asociado al nodo o environment actual y asciende por la jerarquía. Un provider de componente crea una instancia por subárbol; uno de ruta vive con ese entorno lazy; `providedIn: 'root'` comparte la instancia en la aplicación.",
      '`useClass`, `useValue`, `useFactory` y `useExisting` expresan distintas formas de producir un token. Los multi providers acumulan varios valores bajo el mismo token y sirven para pipelines extensibles.',
      "`providedIn: 'root'` crea un singleton por root EnvironmentInjector y permite tree shaking. Un provider de componente crea una instancia por componente.",
      'La resolución busca primero ElementInjectors y después EnvironmentInjectors. Lazy routes pueden crear contextos e instancias separadas.',
      '`useClass` crea una clase para un token; `useValue` entrega un valor existente; `useExisting` crea un alias; `useFactory` calcula la dependencia con otras inyecciones. Los multi providers acumulan varios valores bajo un token e `InjectionToken` representa contratos que no existen como clase en runtime.',
      '`providers` es visible para vista y contenido descendiente; `viewProviders` oculta el provider al contenido proyectado.',
      '`self`, `skipSelf`, `host` y `optional` limitan la búsqueda. Usalos para contratos intencionales, no como parche.',
      '`inject()` necesita injection context: inicializador, constructor administrado por DI, factory o `runInInjectionContext`.',
    ],
    theorySections: [
      {
        title: 'Modelo mental',
        items: [
          'Dependency Injection separa la creación de una dependencia de su consumo. Angular busca un provider para un token, ejecuta su factory cuando corresponde y conserva la instancia según el injector que la posee.',
          "La resolución comienza en el injector asociado al nodo o environment actual y asciende por la jerarquía. Un provider de componente crea una instancia por subárbol; uno de ruta vive con ese entorno lazy; `providedIn: 'root'` comparte la instancia en la aplicación.",
          '`useClass`, `useValue`, `useFactory` y `useExisting` expresan distintas formas de producir un token. Los multi providers acumulan varios valores bajo el mismo token y sirven para pipelines extensibles.',
        ],
      },
      {
        title: 'Funcionamiento y APIs',
        items: [
          "`providedIn: 'root'` crea un singleton por root EnvironmentInjector y permite tree shaking. Un provider de componente crea una instancia por componente.",
          'La resolución busca primero ElementInjectors y después EnvironmentInjectors. Lazy routes pueden crear contextos e instancias separadas.',
          '`useClass` crea una clase para un token; `useValue` entrega un valor existente; `useExisting` crea un alias; `useFactory` calcula la dependencia con otras inyecciones. Los multi providers acumulan varios valores bajo un token e `InjectionToken` representa contratos que no existen como clase en runtime.',
        ],
      },
      {
        title: 'Decisiones, riesgos y verificación',
        items: [
          '`providers` es visible para vista y contenido descendiente; `viewProviders` oculta el provider al contenido proyectado.',
          '`self`, `skipSelf`, `host` y `optional` limitan la búsqueda. Usalos para contratos intencionales, no como parche.',
          '`inject()` necesita injection context: inicializador, constructor administrado por DI, factory o `runInInjectionContext`.',
        ],
      },
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
      {
        question: '¿Cómo busca Angular un provider?',
        answer:
          'Empieza en el injector del contexto actual, consulta providers del nodo y environment, y asciende hasta encontrar el token. Los modificadores de resolución cambian ese recorrido; si ningún provider existe y no es optional, Angular lanza un error.',
      },
      {
        question: '¿Provider de componente o de ruta?',
        answer:
          'El provider de componente crea una instancia asociada a ese subárbol y se destruye con él. El provider de ruta comparte estado entre componentes de la feature lazy y vive con su environment injector.',
      },
      {
        question: '¿Para qué sirve un multi provider?',
        answer:
          'Permite que varias partes registren valores bajo el mismo token y que el consumidor reciba un array. Lo uso para plugins, validadores o pipelines extensibles donde cada feature aporta una implementación.',
      },
      {
        question: "¿Qué riesgo tiene `providedIn: 'root'`?",
        answer:
          'Convierte el servicio en singleton de aplicación. Si guarda estado de pantalla o usuario sin una política de reset, puede mezclar ciclos de navegación y sesiones. El scope debe coincidir con la vida útil del dato.',
      },
      {
        id: 'topic-073-providedin-root',
        question: '¿`providedIn: root`?',
        answer: 'Provider tree-shakeable en el root EnvironmentInjector.',
      },
      {
        id: 'topic-074-providers-local',
        question: '¿`providers` local?',
        answer:
          'Nueva instancia en el ElementInjector del componente y sus descendientes visibles.',
      },
      {
        id: 'topic-075-viewproviders',
        question: '¿`viewProviders`?',
        answer: 'Oculta esos providers al contenido proyectado.',
      },
      {
        id: 'topic-076-injectiontoken',
        question: '¿InjectionToken?',
        answer: 'Token runtime tipado para valores, funciones o interfaces.',
      },
    ],
    code: "export const ANALYTICS = new InjectionToken<Analytics>('analytics');\n\nexport const appConfig: ApplicationConfig = {\n  providers: [\n    { provide: ANALYTICS, useClass: BrowserAnalytics },\n    { provide: HTTP_INTERCEPTORS, useClass: AuditInterceptor, multi: true },\n  ],\n};",
    references: [
      {
        label: 'Angular · Dependency Injection',
        url: 'https://angular.dev/guide/di',
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
      'Una subscription representa la ejecución y su teardown. `complete` y `error` cierran el contrato; `unsubscribe` lo termina desde el consumidor. El producer debe registrar cleanup para liberar timers, listeners, sockets o requests cancelables.',
      'La ubicación de `catchError` cambia el alcance del fallo. Dentro de un flattening operator recupera una operación interna y mantiene viva la fuente; afuera termina o reemplaza el flujo completo.',
      '`shareReplay` comparte una subscription y conserva emisiones para suscriptores tardíos. Antes de usarlo como caché hay que decidir tamaño de buffer, refCount, reset, errores, vida útil y aislamiento por usuario.',
      'Cold observables crean el productor por subscription; hot observables comparten un productor externo. `share` y `shareReplay` cambian esa relación.',
      '`switchMap` cancela el inner anterior; sirve para búsqueda. `concatMap` serializa; sirve para preservar orden. `mergeMap` permite concurrencia. `exhaustMap` ignora disparos mientras uno está activo.',
      '`map` transforma valores; `tap` ejecuta efectos; `filter` decide emisiones; `scan` acumula; `catchError` define el límite del error.',
      'La ubicación de `catchError` define qué stream termina. Dentro de `switchMap` o de otro flattening operator, el error se reemplaza sólo para esa petición y el stream exterior puede seguir escuchando. Fuera del operador, el error finaliza la cadena completa salvo que se retorne otro observable.',
      '`combineLatest` reacciona a últimos valores; `forkJoin` espera que todos completen; `withLatestFrom` toma contexto cuando la fuente emite.',
      '`Subject` no conserva un valor, `BehaviorSubject` guarda el último y exige uno inicial, y `ReplaySubject` reproduce una cantidad o ventana de emisiones. Exponer sólo `asObservable()` impide que consumidores externos escriban en el estado del productor.',
      '`shareReplay({bufferSize: 1, refCount: true})` puede cachear, pero necesitás invalidación, manejo de error y semántica de vida útil.',
    ],
    theorySections: [
      {
        title: 'Contrato Observable',
        items: [
          'Una subscription representa la ejecución y su teardown. `complete` y `error` cierran el contrato; `unsubscribe` lo termina desde el consumidor. El producer debe registrar cleanup para liberar timers, listeners, sockets o requests cancelables.',
          'La ubicación de `catchError` cambia el alcance del fallo. Dentro de un flattening operator recupera una operación interna y mantiene viva la fuente; afuera termina o reemplaza el flujo completo.',
          '`shareReplay` comparte una subscription y conserva emisiones para suscriptores tardíos. Antes de usarlo como caché hay que decidir tamaño de buffer, refCount, reset, errores, vida útil y aislamiento por usuario.',
        ],
      },
      {
        title: 'Operadores y concurrencia',
        items: [
          'Cold observables crean el productor por subscription; hot observables comparten un productor externo. `share` y `shareReplay` cambian esa relación.',
          '`switchMap` cancela el inner anterior; sirve para búsqueda. `concatMap` serializa; sirve para preservar orden. `mergeMap` permite concurrencia. `exhaustMap` ignora disparos mientras uno está activo.',
          '`map` transforma valores; `tap` ejecuta efectos; `filter` decide emisiones; `scan` acumula; `catchError` define el límite del error.',
        ],
      },
      {
        title: 'Errores y teardown',
        items: [
          'La ubicación de `catchError` define qué stream termina. Dentro de `switchMap` o de otro flattening operator, el error se reemplaza sólo para esa petición y el stream exterior puede seguir escuchando. Fuera del operador, el error finaliza la cadena completa salvo que se retorne otro observable.',
          '`combineLatest` reacciona a últimos valores; `forkJoin` espera que todos completen; `withLatestFrom` toma contexto cuando la fuente emite.',
        ],
      },
      {
        title: 'Sharing y caché',
        items: [
          '`Subject` no conserva un valor, `BehaviorSubject` guarda el último y exige uno inicial, y `ReplaySubject` reproduce una cantidad o ventana de emisiones. Exponer sólo `asObservable()` impide que consumidores externos escriban en el estado del productor.',
          '`shareReplay({bufferSize: 1, refCount: true})` puede cachear, pero necesitás invalidación, manejo de error y semántica de vida útil.',
        ],
      },
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
      {
        question: '¿Dónde colocás `catchError` dentro de `switchMap`?',
        answer:
          'Dentro si cada request puede fallar y la fuente debe seguir escuchando búsquedas. Fuera si cualquier error termina o reemplaza el flujo completo. La posición determina qué subscription se cierra.',
      },
      {
        question: '¿Qué debe hacer el teardown de un Observable?',
        answer:
          'Detiene el recurso creado por esa suscripción: remueve listeners, limpia timers, cierra sockets o aborta I/O compatible. También debe tolerar llamadas repetidas sin producir efectos inválidos.',
      },
      {
        question: '¿Cuándo `shareReplay(1)` puede producir un leak?',
        answer:
          'Cuando mantiene la fuente suscripta después de irse el último consumidor o conserva un valor pesado sin política de reset. Configuro `refCount` y resets según si necesito una caché persistente o sólo compartir consumidores simultáneos.',
      },
      {
        question: '¿Cómo elegir entre los cuatro flattening operators?',
        answer:
          'Elijo la política de concurrencia: `switchMap` reemplaza, `concatMap` encola, `mergeMap` permite paralelismo y `exhaustMap` ignora nuevas entradas mientras una sigue activa. La semántica del negocio decide cuál pérdida u orden resulta válido.',
      },
      {
        id: 'topic-066-switchmap',
        question: '¿`switchMap`?',
        answer: 'Cancela el inner anterior al llegar una nueva emisión.',
      },
      {
        id: 'topic-067-concatmap',
        question: '¿`concatMap`?',
        answer: 'Encola inner observables y conserva orden.',
      },
      {
        id: 'topic-068-exhaustmap',
        question: '¿`exhaustMap`?',
        answer: 'Ignora nuevos disparos mientras el inner sigue activo.',
      },
      {
        id: 'topic-069-mergemap',
        question: '¿`mergeMap`?',
        answer:
          'Ejecuta inner observables en paralelo con concurrencia configurable.',
      },
      {
        id: 'topic-070-forkjoin',
        question: '¿`forkJoin`?',
        answer:
          'Emite una vez cuando todos completan; falla si alguno falla y no sirve para streams infinitos.',
      },
      {
        id: 'topic-071-cold-observable',
        question: '¿Cold observable?',
        answer: 'Cada subscription crea su propio productor.',
      },
      {
        id: 'topic-072-sharereplay',
        question: '¿`shareReplay`?',
        answer:
          'Comparte y reproduce valores; necesita política de refCount, error e invalidación.',
      },
    ],
    code: 'results$ = this.query.valueChanges.pipe(\n  debounceTime(250),\n  distinctUntilChanged(),\n  switchMap(query => this.api.search(query).pipe(\n    catchError(error => of({ items: [], error }))\n  )),\n  shareReplay({ bufferSize: 1, refCount: true })\n);',
    references: [
      {
        label: 'RxJS · Operator decision tree',
        url: 'https://rxjs.dev/operator-decision-tree',
      },
    ],
  },
  {
    id: 'estado-local-servicios-signals-y-ngrx',
    number: '13',
    groupId: 'angular-core',
    title: 'Estado: local, servicios, Signals y NgRx',
    intro:
      'No existe una herramienta única. Un Senior reduce el alcance del estado y aumenta la estructura cuando la complejidad lo exige.',
    theory: [
      'El estado pertenece al dueño más cercano que necesita escribirlo. Un componente resuelve estado efímero; un servicio de feature coordina varias vistas; un store formaliza eventos y efectos cuando muchas partes modifican el mismo dominio.',
      'Estado fuente y estado derivado deben estar separados. Signals `computed` y selectors calculan vistas del mismo dato; copiar el resultado a otra variable exige sincronización y permite inconsistencias.',
      'Estado local de componente: UI efímera. Servicio de feature: coordinación de una rama. Store global: datos compartidos, flujos complejos, auditoría o herramientas de desarrollo.',
      'Server state es una copia local de datos remotos y necesita caché, stale time, invalidación, deduplicación y reintentos. Client state nace en la interfaz, como selección, filtros o un wizard, y su ciclo de vida depende de la navegación y del alcance de la feature.',
      'En NgRx, una action describe un evento, un reducer calcula el siguiente estado sin efectos, un selector deriva y memoriza consultas, y un effect conecta eventos con I/O. Entity normaliza colecciones como un diccionario de ids más una lista ordenada.',
      'El estado derivado se calcula desde la fuente mediante selectors o `computed`; almacenarlo por separado exige sincronizar copias. Las actions expresadas como hechos de dominio, por ejemplo `invoiceSubmitted`, permiten que varios efectos reaccionen sin acoplarse al botón que originó el evento.',
      'ComponentStore y SignalStore encapsulan estado de una feature sin crear un store global. La elección depende de la estabilidad de la API, el ecosistema disponible y la experiencia del equipo con el modelo reactivo.',
      'Una actualización optimista modifica la UI antes de recibir confirmación. El diseño necesita rollback o reconciliación cuando falla, una clave idempotente para evitar duplicados y una regla para conflictos entre la versión local y la remota.',
    ],
    theorySections: [
      {
        title: 'Modelo mental',
        items: [
          'El estado pertenece al dueño más cercano que necesita escribirlo. Un componente resuelve estado efímero; un servicio de feature coordina varias vistas; un store formaliza eventos y efectos cuando muchas partes modifican el mismo dominio.',
          'Estado fuente y estado derivado deben estar separados. Signals `computed` y selectors calculan vistas del mismo dato; copiar el resultado a otra variable exige sincronización y permite inconsistencias.',
          'Estado local de componente: UI efímera. Servicio de feature: coordinación de una rama. Store global: datos compartidos, flujos complejos, auditoría o herramientas de desarrollo.',
        ],
      },
      {
        title: 'Funcionamiento y APIs',
        items: [
          'Server state es una copia local de datos remotos y necesita caché, stale time, invalidación, deduplicación y reintentos. Client state nace en la interfaz, como selección, filtros o un wizard, y su ciclo de vida depende de la navegación y del alcance de la feature.',
          'En NgRx, una action describe un evento, un reducer calcula el siguiente estado sin efectos, un selector deriva y memoriza consultas, y un effect conecta eventos con I/O. Entity normaliza colecciones como un diccionario de ids más una lista ordenada.',
          'El estado derivado se calcula desde la fuente mediante selectors o `computed`; almacenarlo por separado exige sincronizar copias. Las actions expresadas como hechos de dominio, por ejemplo `invoiceSubmitted`, permiten que varios efectos reaccionen sin acoplarse al botón que originó el evento.',
        ],
      },
      {
        title: 'Decisiones, riesgos y verificación',
        items: [
          'ComponentStore y SignalStore encapsulan estado de una feature sin crear un store global. La elección depende de la estabilidad de la API, el ecosistema disponible y la experiencia del equipo con el modelo reactivo.',
          'Una actualización optimista modifica la UI antes de recibir confirmación. El diseño necesita rollback o reconciliación cuando falla, una clave idempotente para evitar duplicados y una regla para conflictos entre la versión local y la remota.',
        ],
      },
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
      {
        question: '¿Cuándo un servicio con Signals deja de alcanzar?',
        answer:
          'Cuando varias features escriben el mismo dominio, necesito historial claro de eventos, efectos coordinados, herramientas de inspección o reglas consistentes de actualización. En ese punto un store formal reduce caminos implícitos.',
      },
      {
        question: '¿Qué es estado derivado?',
        answer:
          'Es un valor calculable desde estado fuente, como el total de un carrito. Lo expreso con `computed` o un selector y no lo guardo por separado, porque dos copias pueden divergir.',
      },
      {
        question: '¿Cómo modelás una optimistic update?',
        answer:
          'Aplico un cambio local con un identificador de operación, envío la request y confirmo o revierto según el resultado. Resuelvo concurrencia, duplicados y mensajes de error sin perder una edición posterior.',
      },
      {
        question: '¿Qué pondrías en el store global?',
        answer:
          'Estado de dominio compartido cuya vida cruza rutas y necesita coordinación. Estados de foco, accordion o formulario temporal permanecen cerca del componente salvo que otra parte de la aplicación deba controlarlos.',
      },
      {
        id: 'topic-065-signal-o-behaviorsubject',
        question: '¿Signal o BehaviorSubject?',
        answer:
          'Signal para estado síncrono de UI; BehaviorSubject cuando necesitás semántica y operadores RxJS.',
      },
      {
        id: 'topic-103-ngrx-reducer',
        question: '¿NgRx reducer?',
        answer: 'Función pura que calcula nuevo estado desde estado y action.',
      },
      {
        id: 'topic-104-ngrx-effect',
        question: '¿NgRx effect?',
        answer: 'Reacciona a eventos y coordina I/O u otros efectos.',
      },
      {
        id: 'topic-105-selector',
        question: '¿Selector?',
        answer: 'Consulta derivada y memorizada sobre el store.',
      },
      {
        id: 'topic-106-optimistic-update',
        question: '¿Optimistic update?',
        answer:
          'Actualiza UI antes de confirmar y define rollback o reconciliación.',
      },
    ],
    references: [
      {
        label: 'Angular · Signals',
        url: 'https://angular.dev/guide/signals',
      },
      {
        label: 'NgRx · Guide',
        url: 'https://ngrx.io/guide/store',
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
      'El Router compara la URL con un árbol de rutas, ejecuta redirects, guards y resolvers, activa componentes en outlets y conserva snapshots más streams de cambios. La navegación puede cancelarse o redirigirse antes de crear la vista.',
      '`loadComponent` y `loadChildren` crean fronteras lazy. Los providers declarados en una ruta pertenecen a su environment injector y permiten aislar servicios por feature.',
      'Component input binding puede llevar params, query params, datos estáticos y resolvers a inputs del componente. Esa API reduce subscriptions manuales, pero el nombre y la ausencia de cada valor siguen formando parte del contrato de ruta.',
      '`loadComponent` y `loadChildren` crean fronteras de lazy loading que descargan una feature al navegar. Un chunk por componente pequeño aumenta requests y overhead; una frontera por capacidad de producto suele equilibrar carga inicial y reutilización.',
      'Guards controlan navegación en el cliente; el servidor debe repetir autorización. `CanMatch` evita seleccionar rutas; `CanActivate` decide activación.',
      'Resolvers reducen estados intermedios cuando la ruta necesita datos antes de mostrar. Para pantallas tolerantes al loading, una carga dentro de la feature mejora percepción.',
      'Los path params identifican recursos dentro de la ruta; los query params representan filtros o estado compartible; el fragment apunta a una sección del documento. Rutas hijas componen layouts, outlets muestran árboles paralelos, redirects normalizan URLs y route data aporta metadata estática.',
      'Una `RouteReuseStrategy` puede conservar la instancia y el DOM de una ruta al navegar. También conserva memoria, estado y suscripciones; una política de invalidación decide cuándo destruir ese snapshot.',
      '`RouterTestingHarness` crea un router de prueba, navega por URL y expone el componente activado. Permite comprobar parámetros inválidos, redirects, guards rechazados y errores de resolvers desde el comportamiento observable.',
    ],
    theorySections: [
      {
        title: 'Modelo mental',
        items: [
          'El Router compara la URL con un árbol de rutas, ejecuta redirects, guards y resolvers, activa componentes en outlets y conserva snapshots más streams de cambios. La navegación puede cancelarse o redirigirse antes de crear la vista.',
          '`loadComponent` y `loadChildren` crean fronteras lazy. Los providers declarados en una ruta pertenecen a su environment injector y permiten aislar servicios por feature.',
          'Component input binding puede llevar params, query params, datos estáticos y resolvers a inputs del componente. Esa API reduce subscriptions manuales, pero el nombre y la ausencia de cada valor siguen formando parte del contrato de ruta.',
        ],
      },
      {
        title: 'Funcionamiento y APIs',
        items: [
          '`loadComponent` y `loadChildren` crean fronteras de lazy loading que descargan una feature al navegar. Un chunk por componente pequeño aumenta requests y overhead; una frontera por capacidad de producto suele equilibrar carga inicial y reutilización.',
          'Guards controlan navegación en el cliente; el servidor debe repetir autorización. `CanMatch` evita seleccionar rutas; `CanActivate` decide activación.',
          'Resolvers reducen estados intermedios cuando la ruta necesita datos antes de mostrar. Para pantallas tolerantes al loading, una carga dentro de la feature mejora percepción.',
        ],
      },
      {
        title: 'Decisiones, riesgos y verificación',
        items: [
          'Los path params identifican recursos dentro de la ruta; los query params representan filtros o estado compartible; el fragment apunta a una sección del documento. Rutas hijas componen layouts, outlets muestran árboles paralelos, redirects normalizan URLs y route data aporta metadata estática.',
          'Una `RouteReuseStrategy` puede conservar la instancia y el DOM de una ruta al navegar. También conserva memoria, estado y suscripciones; una política de invalidación decide cuándo destruir ese snapshot.',
          '`RouterTestingHarness` crea un router de prueba, navega por URL y expone el componente activado. Permite comprobar parámetros inválidos, redirects, guards rechazados y errores de resolvers desde el comportamiento observable.',
        ],
      },
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
      {
        question: '¿En qué orden intervienen guards y resolvers?',
        answer:
          'Angular reconoce la ruta, evalúa guards y, si permiten continuar, ejecuta resolvers antes de activar el componente. Un redirect o cancelación corta la navegación; los errores necesitan una política de navegación o error handler.',
      },
      {
        question: '¿Un guard protege datos?',
        answer:
          'No. Controla la navegación del cliente y mejora la experiencia. La API debe autenticar y autorizar cada operación porque un usuario puede llamar el endpoint sin pasar por el Router.',
      },
      {
        question: '¿Cuándo usarías un resolver?',
        answer:
          'Cuando la ruta no tiene sentido sin un dato pequeño y crítico o necesito decidir antes de activarla. Para contenido secundario prefiero cargar dentro de la vista y mostrar estados parciales, porque un resolver largo retrasa toda la navegación.',
      },
      {
        question: '¿Cómo probás el Router?',
        answer:
          'Uso RouterTestingHarness con rutas reales, navego una URL y compruebo componente, redirects y estado visible. Tests aislados cubren la lógica de guards o resolvers y los de integración cubren el orden de navegación.',
      },
      {
        id: 'topic-082-lazy-route',
        question: '¿Lazy route?',
        answer:
          'Carga código al navegar a la feature, reduciendo el bundle inicial.',
      },
      {
        id: 'topic-083-guard',
        question: '¿Guard?',
        answer:
          'Control de navegación en cliente; no reemplaza autorización del servidor.',
      },
      {
        id: 'topic-084-resolver',
        question: '¿Resolver?',
        answer: 'Obtiene datos antes de activar la ruta.',
      },
    ],
    code: "export const routes: Routes = [{\n  path: 'users/:id',\n  loadComponent: () => import('./user.page').then(m => m.UserPage),\n  canActivate: [authGuard],\n  resolve: { user: userResolver },\n  providers: [UserFeatureStore],\n}];",
    references: [
      {
        label: 'Angular · Routing',
        url: 'https://angular.dev/guide/routing',
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
      'Reactive Forms crea un árbol de controles en TypeScript. Cada control conserva valor, estado de validación, interacción y disabled; el grupo agrega los estados de sus hijos y emite cuando cambia el modelo.',
      "`updateOn: 'blur'` o `'submit'` reduce validaciones y requests durante escritura. Un validador de grupo compara campos relacionados y devuelve el error en el nivel que posee la regla.",
      'Un validador asíncrono debe completar y resolver carreras. Debounce, `switchMap` y una caché corta evitan requests innecesarias; la UI distingue `PENDING`, error de red y valor inválido.',
      'Reactive Forms modela el formulario en TypeScript; template-driven sirve para casos pequeños. Typed Forms reduce casts y errores.',
      '`FormControl`, `FormGroup`, `FormArray` y `FormRecord` cubren formas fijas, listas y claves dinámicas.',
      'Un validador síncrono devuelve `ValidationErrors | null`; uno asíncrono devuelve Promise u Observable y necesita cancelación o debounce según el caso.',
      '`ControlValueAccessor` conecta un control propio con Angular Forms mediante cuatro operaciones: escribir un valor, registrar cambios, registrar touched y aplicar disabled. El control no debe volver a emitir como cambio el valor que Forms acaba de escribirle, porque eso crea un loop.',
      'Copiar cada emisión de `valueChanges` a otro objeto crea dos representaciones del formulario que pueden divergir. El `FormGroup` puede ser la fuente de verdad durante la edición y el submit puede mapear su valor a un comando o DTO.',
      'Los errores se muestran después de interacción o submit para evitar ruido antes de que el usuario actúe. `aria-describedby` asocia el mensaje con el control; el foco debe llegar al primer campo inválido cuando un submit no puede continuar.',
      'Signal Forms ofrece un modelo nuevo en versiones recientes. Presentalo como opción a evaluar, no como reemplazo automático de Reactive Forms.',
    ],
    theorySections: [
      {
        title: 'Modelo mental',
        items: [
          'Reactive Forms crea un árbol de controles en TypeScript. Cada control conserva valor, estado de validación, interacción y disabled; el grupo agrega los estados de sus hijos y emite cuando cambia el modelo.',
          "`updateOn: 'blur'` o `'submit'` reduce validaciones y requests durante escritura. Un validador de grupo compara campos relacionados y devuelve el error en el nivel que posee la regla.",
          'Un validador asíncrono debe completar y resolver carreras. Debounce, `switchMap` y una caché corta evitan requests innecesarias; la UI distingue `PENDING`, error de red y valor inválido.',
          'Reactive Forms modela el formulario en TypeScript; template-driven sirve para casos pequeños. Typed Forms reduce casts y errores.',
        ],
      },
      {
        title: 'Funcionamiento y APIs',
        items: [
          '`FormControl`, `FormGroup`, `FormArray` y `FormRecord` cubren formas fijas, listas y claves dinámicas.',
          'Un validador síncrono devuelve `ValidationErrors | null`; uno asíncrono devuelve Promise u Observable y necesita cancelación o debounce según el caso.',
          '`ControlValueAccessor` conecta un control propio con Angular Forms mediante cuatro operaciones: escribir un valor, registrar cambios, registrar touched y aplicar disabled. El control no debe volver a emitir como cambio el valor que Forms acaba de escribirle, porque eso crea un loop.',
        ],
      },
      {
        title: 'Decisiones, riesgos y verificación',
        items: [
          'Copiar cada emisión de `valueChanges` a otro objeto crea dos representaciones del formulario que pueden divergir. El `FormGroup` puede ser la fuente de verdad durante la edición y el submit puede mapear su valor a un comando o DTO.',
          'Los errores se muestran después de interacción o submit para evitar ruido antes de que el usuario actúe. `aria-describedby` asocia el mensaje con el control; el foco debe llegar al primer campo inválido cuando un submit no puede continuar.',
          'Signal Forms ofrece un modelo nuevo en versiones recientes. Presentalo como opción a evaluar, no como reemplazo automático de Reactive Forms.',
        ],
      },
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
      {
        question: '¿Dónde ubicarías una validación entre dos campos?',
        answer:
          'En el FormGroup que posee ambos controles. El validador devuelve un error del grupo y la presentación decide en qué campos anunciarlo sin mutar errores ajenos.',
      },
      {
        question: "¿Qué cambia con `updateOn: 'blur'`?",
        answer:
          'El control actualiza valor y validación al perder foco. Reduce trabajo y requests mientras se escribe, pero cambia cuándo valueChanges emite y cuándo la UI puede mostrar el resultado.',
      },
      {
        question: '¿Cómo tipás un FormArray?',
        answer:
          'Declaro el tipo del control repetido, por ejemplo `FormArray<FormGroup<AddressControls>>`. El tipo describe controles, mientras `getRawValue` produce el valor incluyendo controles disabled.',
      },
      {
        question: '¿Cómo enfocás el primer error al enviar?',
        answer:
          'Marco controles como touched, localizo el primer elemento inválido siguiendo el orden visual, lo enfoco y conecto el mensaje con `aria-describedby`. Un resumen de errores puede enlazar cada campo en formularios largos.',
      },
      {
        id: 'topic-085-reactive-form',
        question: '¿Reactive Form?',
        answer:
          'Modelo explícito y observable en TypeScript, apto para composición y validación compleja.',
      },
      {
        id: 'topic-086-cva',
        question: '¿CVA?',
        answer: 'Contrato que conecta un control custom con Angular Forms.',
      },
      {
        id: 'topic-087-async-validator',
        question: '¿Async validator?',
        answer:
          'Validador que completa con errores o null; controlá cancelación y frecuencia.',
      },
    ],
    code: "readonly form = new FormGroup({\n  email: new FormControl('', {\n    nonNullable: true,\n    validators: [Validators.required, Validators.email],\n    asyncValidators: [uniqueEmailValidator(this.http)],\n    updateOn: 'blur',\n  }),\n  addresses: new FormArray<FormGroup<AddressControls>>([]),\n});",
    references: [
      {
        label: 'Angular · Forms',
        url: 'https://angular.dev/guide/forms',
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
      '`HttpRequest` y `HttpHeaders` son inmutables. Un interceptor usa `request.clone` para cambiar URL, headers, params o body y luego entrega la request al siguiente handler.',
      'Los interceptors funcionales se ejecutan en el orden de registro para la request y en orden inverso para la response. `HttpContextToken` permite activar políticas por request sin convertirlas en headers de red.',
      "`observe: 'events'` expone progreso, headers y respuesta final. El progreso de upload requiere un backend que lo soporte; fetch no informa progreso de subida del mismo modo que XHR.",
      '`provideHttpClient` registra el cliente HTTP y los interceptors funcionales forman una cadena alrededor de cada request. Los servicios o repositorios de feature encapsulan URLs, DTOs y reglas de acceso para que los componentes dependan del dominio.',
      'Los tipos de TypeScript desaparecen al compilar y no validan el JSON recibido. Un schema runtime comprueba datos externos antes de usarlos; un mapper traduce el DTO del servidor a un modelo interno estable.',
      'Un interceptor puede agregar autenticación, correlation IDs y telemetría, o normalizar errores. Un loader global necesita contar requests concurrentes: un booleano se apaga cuando termina la primera aunque otras sigan activas.',
      'Un retry repite una operación que falló. Los métodos idempotentes pueden repetirse sin cambiar el resultado; una escritura necesita una clave de idempotencia si existe riesgo de duplicación. Backoff, jitter y un límite evitan amplificar una caída, y los errores funcionales 4xx requieren otra acción.',
      'Timeout, cancelación, offline, fallo de red, 401/403, 404, validación y 5xx representan estados distintos. La interfaz puede ofrecer reintento para red o timeout, login para 401, corrección de campos para validación y un fallback ante errores del servidor.',
      '`httpResource` conecta `HttpClient` con una API de signals para request, valor, loading y error. En dominios grandes, la estrategia todavía necesita claves de caché, invalidación, aislamiento por usuario y coordinación con otras escrituras.',
      'Una caché se define por su clave, vida útil, política de invalidación y aislamiento. La deduplicación comparte una petición en curso; stale-while-revalidate entrega el valor anterior mientras actualiza. Incluir el usuario o tenant en la clave evita mezclar datos privados.',
    ],
    theorySections: [
      {
        title: 'Modelo mental',
        items: [
          '`HttpRequest` y `HttpHeaders` son inmutables. Un interceptor usa `request.clone` para cambiar URL, headers, params o body y luego entrega la request al siguiente handler.',
          'Los interceptors funcionales se ejecutan en el orden de registro para la request y en orden inverso para la response. `HttpContextToken` permite activar políticas por request sin convertirlas en headers de red.',
          "`observe: 'events'` expone progreso, headers y respuesta final. El progreso de upload requiere un backend que lo soporte; fetch no informa progreso de subida del mismo modo que XHR.",
          '`provideHttpClient` registra el cliente HTTP y los interceptors funcionales forman una cadena alrededor de cada request. Los servicios o repositorios de feature encapsulan URLs, DTOs y reglas de acceso para que los componentes dependan del dominio.',
        ],
      },
      {
        title: 'Funcionamiento y APIs',
        items: [
          'Los tipos de TypeScript desaparecen al compilar y no validan el JSON recibido. Un schema runtime comprueba datos externos antes de usarlos; un mapper traduce el DTO del servidor a un modelo interno estable.',
          'Un interceptor puede agregar autenticación, correlation IDs y telemetría, o normalizar errores. Un loader global necesita contar requests concurrentes: un booleano se apaga cuando termina la primera aunque otras sigan activas.',
          'Un retry repite una operación que falló. Los métodos idempotentes pueden repetirse sin cambiar el resultado; una escritura necesita una clave de idempotencia si existe riesgo de duplicación. Backoff, jitter y un límite evitan amplificar una caída, y los errores funcionales 4xx requieren otra acción.',
        ],
      },
      {
        title: 'Decisiones, riesgos y verificación',
        items: [
          'Timeout, cancelación, offline, fallo de red, 401/403, 404, validación y 5xx representan estados distintos. La interfaz puede ofrecer reintento para red o timeout, login para 401, corrección de campos para validación y un fallback ante errores del servidor.',
          '`httpResource` conecta `HttpClient` con una API de signals para request, valor, loading y error. En dominios grandes, la estrategia todavía necesita claves de caché, invalidación, aislamiento por usuario y coordinación con otras escrituras.',
          'Una caché se define por su clave, vida útil, política de invalidación y aislamiento. La deduplicación comparte una petición en curso; stale-while-revalidate entrega el valor anterior mientras actualiza. Incluir el usuario o tenant en la clave evita mezclar datos privados.',
        ],
      },
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
      {
        question: '¿Por qué una request de HttpClient se clona?',
        answer:
          'HttpRequest es inmutable. `clone` crea una request con los cambios y conserva el objeto original para que la cadena de interceptors pueda razonar sin mutaciones compartidas.',
      },
      {
        question: '¿En qué orden corren los interceptors?',
        answer:
          'La request atraviesa la lista en el orden de registro. La response vuelve por la cadena en orden inverso, como capas anidadas. El orden afecta auth, cache, retry, loaders y telemetría.',
      },
      {
        question: '¿Para qué sirve HttpContext?',
        answer:
          'Transporta configuración local dentro del pipeline sin enviarla al servidor. Un interceptor puede leer un HttpContextToken para omitir auth, activar cache o cambiar tratamiento de errores para una request concreta.',
      },
      {
        question: '¿Cómo evitás dos refresh de token simultáneos?',
        answer:
          'Comparto una única operación de refresh mientras esté activa, encolo o reintento las requests originales después del nuevo token y limpio el estado al terminar. Si el refresh falla, cierro sesión una sola vez.',
      },
      {
        id: 'topic-088-interceptor',
        question: '¿Interceptor?',
        answer:
          'Middleware de requests y responses para preocupaciones transversales.',
      },
      {
        id: 'topic-089-retry',
        question: '¿Retry?',
        answer: 'Solo con política, límite y seguridad de idempotencia.',
      },
    ],
    code: 'export const authInterceptor: HttpInterceptorFn = (request, next) => {\n  const token = inject(AuthStore).token();\n  const authenticated = request.clone({\n    setHeaders: { Authorization: `Bearer ${token}` },\n  });\n  return next(authenticated);\n};',
    references: [
      {
        label: 'Angular · HTTP',
        url: 'https://angular.dev/guide/http',
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
    theorySections: [
      {
        title: 'Fundamentos',
        items: [
          'DOM representa el documento; BOM agrupa APIs del navegador como `window`, history, location, navigator y screen. Angular abstrae parte del DOM, pero no reemplaza la plataforma.',
          'Selección: `querySelector`, `querySelectorAll`, `getElementById`. Eventos atraviesan capture, target y bubble. Delegation aprovecha bubbling para manejar listas dinámicas.',
          '`preventDefault` evita la acción por defecto; `stopPropagation` detiene propagación. Usarlos sin entender semántica rompe formularios, enlaces y accesibilidad.',
          'El navegador parsea HTML y CSS, construye DOM y CSSOM, calcula estilos y layout, pinta y compone capas. Leer layout después de escribir estilos puede forzar reflow.',
        ],
      },
      {
        title: 'Mecanismo y aplicación',
        items: [
          '`localStorage` persiste por origin y ofrece API síncrona; `sessionStorage` vive por pestaña; IndexedDB almacena datos estructurados de forma asíncrona. Cookies viajan según sus atributos y reglas de request.',
          'Same-origin combina scheme, host y port. CORS permite que un servidor autorice lecturas cross-origin; la preflight OPTIONS valida ciertos métodos y headers.',
          'HTTP cache usa `Cache-Control`, validators como ETag y claves que pueden variar. Service Worker puede interceptar requests y agrega otra capa de cache e invalidación.',
        ],
      },
      {
        title: 'Decisiones y límites',
        items: [
          'DNS resuelve host; TLS autentica y cifra; HTTP transporta requests. HTTP/2 multiplexa streams; HTTP/3 usa QUIC sobre UDP.',
          'SPA actualiza vistas sin recargar documento. History API mantiene URL; el servidor debe redirigir rutas de app al HTML o renderizarlas.',
          'Web Worker ejecuta JavaScript fuera del main thread y se comunica por mensajes. No accede al DOM. Service Worker opera como proxy de red y ciclo separado.',
        ],
      },
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
      {
        id: 'topic-029-dom',
        question: '¿DOM?',
        answer: 'Árbol de nodos y APIs que representan el documento.',
      },
      {
        id: 'topic-030-bom',
        question: '¿BOM?',
        answer:
          'APIs del navegador fuera del documento, como history, location y navigator.',
      },
      {
        id: 'topic-031-event-bubbling',
        question: '¿Event bubbling?',
        answer:
          'El evento asciende desde el target por ancestros que participan.',
      },
      {
        id: 'topic-032-event-delegation',
        question: '¿Event delegation?',
        answer:
          'Listener en un ancestro que decide según el target; reduce listeners y cubre hijos dinámicos.',
      },
      {
        id: 'topic-033-preventdefault',
        question: '¿preventDefault?',
        answer: 'Evita la acción predeterminada si el evento es cancelable.',
      },
      {
        id: 'topic-034-localstorage',
        question: '¿localStorage?',
        answer: 'Almacenamiento síncrono string por origin y persistente.',
      },
      {
        id: 'topic-035-indexeddb',
        question: '¿IndexedDB?',
        answer:
          'Base asíncrona del navegador para datos estructurados y mayor volumen.',
      },
      {
        id: 'topic-036-same-origin',
        question: '¿Same-origin?',
        answer: 'Coincidencia de scheme, host y port.',
      },
      {
        id: 'topic-037-preflight',
        question: '¿Preflight?',
        answer:
          'Request OPTIONS con la que el navegador consulta permiso CORS.',
      },
      {
        id: 'topic-038-etag',
        question: '¿ETag?',
        answer: 'Validador de representación para revalidación condicional.',
      },
      {
        id: 'topic-039-service-worker',
        question: '¿Service Worker?',
        answer:
          'Worker con lifecycle que intercepta red y habilita offline/push.',
      },
      {
        id: 'topic-040-web-worker',
        question: '¿Web Worker?',
        answer: 'Thread para JavaScript sin acceso directo al DOM.',
      },
    ],
    references: [
      {
        label: 'Angular · Style guide',
        url: 'https://angular.dev/style-guide',
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
    theorySections: [
      {
        title: 'Fundamentos',
        items: [
          'La organización por feature agrupa UI, acceso a datos, modelos y rutas que cambian por la misma capacidad de producto. Una organización global por tipo técnico dispersa una modificación entre carpetas distantes y debilita los límites de dominio.',
          'Un componente presentacional recibe datos y emite eventos; un orquestador coordina estado, navegación y servicios. La separación reduce dependencias cuando varias vistas reutilizan la presentación, pero añade capas vacías si ambas piezas cambian siempre juntas.',
          'Dependency inversion hace que el dominio dependa de un contrato estable y que el detalle implemente ese contrato. En Angular, un `InjectionToken` más un adapter permite cambiar analytics, storage, pagos o una API externa sin modificar consumidores.',
        ],
      },
      {
        title: 'Mecanismo y aplicación',
        items: [
          'La public API de una librería o feature declara qué símbolos pueden consumir otros módulos. Los imports profundos atraviesan ese límite, acoplan al árbol interno de archivos y convierten un refactor local en un cambio global.',
          'Un monorepo mejora sharing y refactors coordinados; agrega costo de tooling y ownership. Nx puede imponer boundaries y cachear tareas.',
        ],
      },
      {
        title: 'Decisiones y límites',
        items: [
          'Micro-frontends sirven para despliegue y ownership independientes. Aumentan duplicación, integración, observabilidad y consistencia visual.',
          'Un Architecture Decision Record conserva el contexto, las alternativas evaluadas, la decisión, sus consecuencias y una fecha de revisión. El registro explica por qué existe una restricción cuando cambia el equipo o el contexto original.',
        ],
      },
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
      {
        question: '¿Cómo evitás que una feature dependa de detalles de otra?',
        answer:
          'Expongo una public API pequeña y contratos de dominio. La feature consumidora no importa componentes internos, stores privados ni rutas de archivos profundas; se comunica mediante servicios, eventos o modelos publicados.',
      },
      {
        question: '¿Cuándo una capa facade agrega valor?',
        answer:
          'Cuando concentra varios stores o servicios, traduce modelos y ofrece casos de uso estables a la UI. Si sólo reenvía cada método con el mismo nombre y tipo, agrega navegación sin reducir acoplamiento.',
      },
      {
        id: 'topic-125-micro-frontend',
        question: '¿Micro-frontend?',
        answer:
          'Unidad de frontend con ownership y despliegue independiente, a cambio de integración y duplicación.',
      },
      {
        id: 'topic-126-adr',
        question: '¿ADR?',
        answer: 'Registro corto de una decisión, alternativas y consecuencias.',
      },
    ],
    references: [
      {
        label: 'Angular · Style guide',
        url: 'https://angular.dev/style-guide',
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
    theorySections: [
      {
        title: 'Fundamentos',
        items: [
          'Strategy para políticas intercambiables; Adapter para integrar contratos externos; Facade para reducir superficie; Factory para construcción variable.',
          'Observer aparece en RxJS; Decorator en metadata e interceptors; Command y event patterns aparecen en stores. Singleton depende del injector.',
        ],
      },
      {
        title: 'Mecanismo y aplicación',
        items: [
          'SRP separa motivos de cambio. OCP favorece extensión por contratos. LSP exige sustitución válida. ISP mantiene contratos pequeños. DIP invierte dependencias hacia abstracciones.',
          'Composition over inheritance evita jerarquías rígidas. Las directivas, providers y content projection forman mecanismos de composición.',
        ],
      },
      {
        title: 'Decisiones y límites',
        items: [
          'Un god service acumula motivos de cambio; un shared module masivo crea dependencias implícitas; los barrel cycles ocultan ciclos; los boolean flags multiplican estados; las subscriptions anidadas pierden control de concurrencia y la lógica de negocio en templates se repite y resulta difícil de probar.',
        ],
      },
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
      {
        question: '¿Cómo aplicarías Strategy en Angular?',
        answer:
          'Defino un contrato para la operación, registro implementaciones mediante DI y selecciono la estrategia por configuración o contexto. El consumidor conoce la capacidad, mientras cada algoritmo conserva tests y dependencias propias.',
      },
      {
        question:
          '¿Qué señal indica que una abstracción llegó demasiado pronto?',
        answer:
          'La interfaz tiene una sola implementación, replica todos sus métodos y cambia junto con el detalle. Espero casos de variación concretos y extraigo la frontera que esos casos comparten.',
      },
      {
        id: 'topic-107-facade',
        question: '¿Facade?',
        answer:
          'API estable que reduce superficie de un subsistema; puede ocultar demasiado si no protege un límite.',
      },
      {
        id: 'topic-108-adapter',
        question: '¿Adapter?',
        answer: 'Traduce un contrato externo al modelo interno.',
      },
      {
        id: 'topic-109-strategy',
        question: '¿Strategy?',
        answer: 'Encapsula políticas intercambiables detrás de un contrato.',
      },
      {
        id: 'topic-110-srp',
        question: '¿SRP?',
        answer:
          'Una unidad concentra responsabilidades que cambian por el mismo motivo.',
      },
      {
        id: 'topic-111-dip',
        question: '¿DIP?',
        answer:
          'El código de alto nivel depende de abstracciones, no de detalles concretos.',
      },
    ],
    references: [
      {
        label: 'Angular · Style guide',
        url: 'https://angular.dev/style-guide',
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
    theorySections: [
      {
        title: 'Fundamentos',
        items: [
          'LCP mide cuándo aparece el mayor elemento visible, INP observa la latencia de las interacciones y CLS acumula desplazamientos inesperados. Bundle size, long tasks, memoria y frecuencia de renders explican sus causas. Lighthouse usa un entorno sintético; RUM registra dispositivos y redes reales.',
          'Lazy routes y `@defer` sacan JavaScript del bundle inicial. El beneficio depende del waterfall de chunks, preloading, prefetch y caché HTTP: demasiadas fronteras pequeñas pueden intercambiar bytes iniciales por latencia de red.',
        ],
      },
      {
        title: 'Mecanismo y aplicación',
        items: [
          '`OnPush` permite saltar subárboles sin notificaciones, signals marcan consumidores precisos y un `track` estable conserva nodos de una lista. Virtual scroll limita el DOM visible; la paginación reduce además datos transferidos y trabajo del servidor.',
          'Una pipe impura y una función costosa en template pueden ejecutarse en cada check. Listeners globales sin cleanup retienen vistas, las imágenes sin dimensiones causan CLS y una dependencia grande aumenta parse, compile y ejecución además de transferencia.',
        ],
      },
      {
        title: 'Decisiones y límites',
        items: [
          'AOT, tree shaking, budgets y source-map analysis detectan regresiones. Un import pequeño puede arrastrar una dependencia grande.',
          'Las escrituras DOM invalidan estilos y las lecturas geométricas pueden forzar su cálculo. Agrupar ambas fases evita layout thrashing. Debounce reduce eventos de alta frecuencia; un Web Worker descarga CPU cuando el costo de serializar mensajes resulta menor que bloquear el main thread.',
        ],
      },
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
      {
        question: '¿Cómo investigarías un INP alto?',
        answer:
          'Reproduzco la interacción con Performance panel y RUM, localizo long tasks y separo scripting, style, layout y paint. Después reduzco trabajo de la ruta crítica, divido CPU o limita renders y vuelvo a medir en dispositivos reales.',
      },
      {
        question: '¿Cuándo virtual scroll no alcanza?',
        answer:
          'Virtual scroll reduce nodos DOM, pero no reduce datos descargados, filtros costosos ni memoria del modelo completo. Con cientos de miles de filas combino paginación server-side, consultas remotas y una ventana visible accesible.',
      },
      {
        id: 'topic-098-lcp',
        question: '¿LCP?',
        answer: 'Tiempo hasta renderizar el mayor elemento visible.',
      },
      {
        id: 'topic-099-inp',
        question: '¿INP?',
        answer: 'Latencia observada de interacciones durante la sesión.',
      },
      {
        id: 'topic-100-cls',
        question: '¿CLS?',
        answer: 'Suma de cambios inesperados de layout.',
      },
    ],
    references: [
      {
        label: 'web.dev · Web Vitals',
        url: 'https://web.dev/articles/vitals',
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
      'La hidratación reutiliza el DOM producido por el servidor y conecta las views del cliente sin reconstruir la página. El HTML del servidor y el primer render del cliente deben producir la misma estructura.',
      '`Date.now`, `Math.random`, locale, datos privados y condiciones distintas entre servidor y navegador pueden crear mismatches. El servidor debe transferir el dato determinista o el cliente debe calcularlo después de hidratar.',
      'Incremental hydration conserva bloques `@defer` deshidratados hasta un trigger `hydrate on ...`. Event replay registra interacciones previas y las reproduce cuando la sección ya puede responder.',
      'CSR simplifica aplicaciones privadas. SSG sirve contenido estable. SSR sirve HTML fresco y SEO. Hybrid combina estrategias por ruta.',
      'Hydration reutiliza el HTML del servidor. El cliente debe producir una estructura compatible; DOM inválido o manipulación directa rompe el proceso.',
      'Incremental hydration activa sectores cuando se necesitan y trabaja con `@defer`. Event replay conserva interacciones previas a la hidratación.',
      '`window`, `document`, storage y otras APIs del navegador no existen durante SSR. Platform checks, tokens inyectables y render hooks aíslan ese código para que el servidor pueda construir el HTML sin acceder al entorno cliente.',
      'Transfer cache reutiliza en el cliente ciertas respuestas obtenidas durante SSR y evita una segunda petición inmediata. La clave y el HTML generado deben aislar datos por usuario para impedir que una respuesta privada termine en otra sesión.',
      'Un placeholder con las mismas dimensiones que el contenido final reserva espacio y reduce CLS. El contenido above-the-fold participa en LCP y suele cargarse antes; los bloques secundarios admiten lazy loading o hidratación diferida.',
    ],
    theorySections: [
      {
        title: 'Fundamentos',
        items: [
          'La hidratación reutiliza el DOM producido por el servidor y conecta las views del cliente sin reconstruir la página. El HTML del servidor y el primer render del cliente deben producir la misma estructura.',
          '`Date.now`, `Math.random`, locale, datos privados y condiciones distintas entre servidor y navegador pueden crear mismatches. El servidor debe transferir el dato determinista o el cliente debe calcularlo después de hidratar.',
          'Incremental hydration conserva bloques `@defer` deshidratados hasta un trigger `hydrate on ...`. Event replay registra interacciones previas y las reproduce cuando la sección ya puede responder.',
        ],
      },
      {
        title: 'Mecanismo y aplicación',
        items: [
          'CSR simplifica aplicaciones privadas. SSG sirve contenido estable. SSR sirve HTML fresco y SEO. Hybrid combina estrategias por ruta.',
          'Hydration reutiliza el HTML del servidor. El cliente debe producir una estructura compatible; DOM inválido o manipulación directa rompe el proceso.',
          'Incremental hydration activa sectores cuando se necesitan y trabaja con `@defer`. Event replay conserva interacciones previas a la hidratación.',
        ],
      },
      {
        title: 'Decisiones y límites',
        items: [
          '`window`, `document`, storage y otras APIs del navegador no existen durante SSR. Platform checks, tokens inyectables y render hooks aíslan ese código para que el servidor pueda construir el HTML sin acceder al entorno cliente.',
          'Transfer cache reutiliza en el cliente ciertas respuestas obtenidas durante SSR y evita una segunda petición inmediata. La clave y el HTML generado deben aislar datos por usuario para impedir que una respuesta privada termine en otra sesión.',
          'Un placeholder con las mismas dimensiones que el contenido final reserva espacio y reduce CLS. El contenido above-the-fold participa en LCP y suele cargarse antes; los bloques secundarios admiten lazy loading o hidratación diferida.',
        ],
      },
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
      {
        question: '¿Qué produce un hydration mismatch?',
        answer:
          'El servidor y el primer render del cliente generan estructuras diferentes. Fechas, random, locale, acceso temprano al DOM o condiciones browser-only son causas comunes. Transfiero datos deterministas y pospongo efectos de navegador hasta después de hidratar.',
      },
      {
        question: '¿Qué hace event replay?',
        answer:
          'Captura interacciones que ocurren sobre HTML SSR antes de que Angular conecte listeners y las reproduce al terminar la hidratación correspondiente. Evita que un click temprano parezca perdido.',
      },
      {
        question: '¿Qué diferencia full e incremental hydration?',
        answer:
          'Full hydration activa la aplicación completa. Incremental hydration conserva límites `@defer` deshidratados y los activa por triggers como viewport o interaction, reduciendo JavaScript inicial a cambio de más estados y decisiones de carga.',
      },
      {
        question:
          '¿Por qué evitarías cambiar el árbol con `isPlatformBrowser`?',
        answer:
          'La condición puede hacer que servidor y cliente creen nodos distintos durante la hidratación. Mantengo la misma estructura y ejecuto sólo la integración browser después del render, o excluyo de hidratación un caso aislado como último recurso.',
      },
      {
        id: 'topic-094-ssr',
        question: '¿SSR?',
        answer:
          'Render por request en servidor; ayuda SEO y HTML inicial, agrega costo operativo.',
      },
      {
        id: 'topic-095-ssg',
        question: '¿SSG?',
        answer: 'HTML generado en build para contenido estable.',
      },
      {
        id: 'topic-096-hydration',
        question: '¿Hydration?',
        answer:
          'Angular reutiliza HTML de servidor y conecta comportamiento cliente.',
      },
      {
        id: 'topic-097-defer',
        question: '¿`@defer`?',
        answer:
          'Divide dependencias y carga una vista según trigger o condición.',
      },
    ],
    code: 'bootstrapApplication(AppComponent, {\n  providers: [provideClientHydration()],\n});\n\n// La estructura renderizada debe coincidir en servidor y cliente.\n@defer (on viewport; hydrate on interaction) {\n  <reviews-panel />\n} @placeholder {\n  <reviews-skeleton />\n}',
    references: [
      {
        label: 'Angular · SSR',
        url: 'https://angular.dev/guide/ssr',
      },
      {
        label: 'Angular · Hydration',
        url: 'https://angular.dev/guide/hydration',
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
      'Un test útil prepara estado, ejecuta una acción observable y comprueba el resultado. Vitest aporta runner, assertions, spies y fake timers; TestBed agrega el entorno de inyección, compilación y render de Angular.',
      'Los component harnesses encapsulan la forma de operar un componente y permiten que los tests usen una API estable. RouterTestingHarness navega rutas reales dentro del test y verifica guards, params, resolvers y componentes activados.',
      'Pirámide práctica: muchas pruebas de lógica, componentes para comportamiento DOM, integración en fronteras y pocos E2E de journeys críticos.',
      'Angular moderno documenta Vitest junto con TestBed. Bases existentes pueden usar Jasmine/Jest; la estrategia importa más que la sintaxis.',
      'Un test de componente interactúa con el DOM mediante roles, labels y eventos, y comprueba el resultado visible. Los métodos privados y la estructura interna son detalles de implementación; afirmar sobre ellos vuelve frágil el test ante refactors sin cambio de comportamiento.',
      '`HttpTestingController` intercepta requests de `HttpClient` y permite afirmar método, URL, body y headers antes de responder con éxito o error. `verify()` comprueba al final que ninguna petición haya quedado pendiente.',
      '`RouterTestingHarness` simplifica navegación. Los component harnesses crean APIs de prueba estables para UI reutilizable.',
      'Fake timers controlan el reloj de debounce, retry y delays sin esperar tiempo real. Los marble tests representan emisiones RxJS sobre una línea temporal virtual y sirven cuando el orden y la concurrencia forman parte del contrato.',
      'Un mock reemplaza una frontera y permite aislar la unidad, pero demasiados mocks pueden describir una integración que ningún proveedor real soporta. Los contract tests verifican que DTOs, adapters y clientes respeten el mismo contrato.',
    ],
    theorySections: [
      {
        title: 'Fundamentos',
        items: [
          'Un test útil prepara estado, ejecuta una acción observable y comprueba el resultado. Vitest aporta runner, assertions, spies y fake timers; TestBed agrega el entorno de inyección, compilación y render de Angular.',
          'Los component harnesses encapsulan la forma de operar un componente y permiten que los tests usen una API estable. RouterTestingHarness navega rutas reales dentro del test y verifica guards, params, resolvers y componentes activados.',
          'Pirámide práctica: muchas pruebas de lógica, componentes para comportamiento DOM, integración en fronteras y pocos E2E de journeys críticos.',
        ],
      },
      {
        title: 'Mecanismo y aplicación',
        items: [
          'Angular moderno documenta Vitest junto con TestBed. Bases existentes pueden usar Jasmine/Jest; la estrategia importa más que la sintaxis.',
          'Un test de componente interactúa con el DOM mediante roles, labels y eventos, y comprueba el resultado visible. Los métodos privados y la estructura interna son detalles de implementación; afirmar sobre ellos vuelve frágil el test ante refactors sin cambio de comportamiento.',
          '`HttpTestingController` intercepta requests de `HttpClient` y permite afirmar método, URL, body y headers antes de responder con éxito o error. `verify()` comprueba al final que ninguna petición haya quedado pendiente.',
        ],
      },
      {
        title: 'Decisiones y límites',
        items: [
          '`RouterTestingHarness` simplifica navegación. Los component harnesses crean APIs de prueba estables para UI reutilizable.',
          'Fake timers controlan el reloj de debounce, retry y delays sin esperar tiempo real. Los marble tests representan emisiones RxJS sobre una línea temporal virtual y sirven cuando el orden y la concurrencia forman parte del contrato.',
          'Un mock reemplaza una frontera y permite aislar la unidad, pero demasiados mocks pueden describir una integración que ningún proveedor real soporta. Los contract tests verifican que DTOs, adapters y clientes respeten el mismo contrato.',
        ],
      },
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
      {
        question: '¿Qué aporta Vitest y qué aporta TestBed?',
        answer:
          'Vitest ejecuta suites, assertions, spies y timers. TestBed crea el entorno Angular de providers, componentes y change detection. Un servicio puro puede no necesitar TestBed; un componente con DI y template sí suele beneficiarse.',
      },
      {
        question: '¿Cuándo usarías un component harness?',
        answer:
          'Cuando varias pruebas o consumidores necesitan operar un componente complejo sin depender de su DOM interno. El harness ofrece acciones y consultas estables y reduce roturas por cambios de markup.',
      },
      {
        question: '¿Cómo probás debounce y retry?',
        answer:
          'Uso fake timers o el scheduler virtual, avanzo el reloj de forma explícita y compruebo emisiones, cancelaciones y número de intentos. El test no espera tiempo real ni depende de la velocidad de la máquina.',
      },
      {
        question: '¿Qué debe verificar un test de HttpClient?',
        answer:
          'Método, URL, params, headers y body que forman parte del contrato; luego responde con éxito o error y comprueba el resultado visible. `verify()` asegura que no quedaron requests sin resolver.',
      },
      {
        id: 'topic-118-unit-test',
        question: '¿Unit test?',
        answer:
          'Prueba una unidad con fronteras controladas y feedback rápido.',
      },
      {
        id: 'topic-119-integration-test',
        question: '¿Integration test?',
        answer:
          'Verifica colaboración entre varias unidades o una frontera real.',
      },
      {
        id: 'topic-120-e2e',
        question: '¿E2E?',
        answer:
          'Prueba un recorrido del usuario a través del sistema desplegado o equivalente.',
      },
      {
        id: 'topic-121-harness',
        question: '¿Harness?',
        answer:
          'API estable para interactuar con un componente en tests sin depender de su DOM interno.',
      },
    ],
    code: "it('shows the resolved user', async () => {\n  const harness = await RouterTestingHarness.create('/users/7');\n  const request = http.expectOne('/api/users/7');\n  request.flush({ id: 7, name: 'Ada' });\n  await harness.fixture.whenStable();\n  expect(harness.routeNativeElement?.textContent).toContain('Ada');\n});",
    references: [
      {
        label: 'Angular · Testing',
        url: 'https://angular.dev/guide/testing',
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
    theorySections: [
      {
        title: 'Fundamentos',
        items: [
          'Interpolación y property binding tratan valores como datos. `[innerHTML]` pasa por sanitización; URLs de recursos y bypass APIs requieren revisión estricta.',
          '`DomSanitizer.bypassSecurityTrust*` no limpia contenido: crea un valor que omite la sanitización de Angular. Su uso concentra una decisión de confianza y necesita una fuente controlada, revisión y auditoría.',
          'Content Security Policy limita los orígenes y tipos de recursos que puede ejecutar el navegador. Trusted Types obliga a que sinks DOM peligrosos reciban valores creados por políticas registradas. Juntas reducen el impacto de una inyección que llega al DOM.',
        ],
      },
      {
        title: 'Mecanismo y aplicación',
        items: [
          'CSRF aprovecha credenciales que el navegador adjunta de forma automática, como cookies. SameSite, un token XSRF y la validación del servidor prueban que la petición salió de la aplicación esperada. Un bearer token evita ese mecanismo, pero puede ser robado por XSS según dónde se almacene.',
          'Un guard decide navegación en el cliente y mejora la experiencia, pero el usuario puede omitirlo o llamar la API de forma directa. La API debe comprobar permisos y ownership para cada operación.',
        ],
      },
      {
        title: 'Decisiones y límites',
        items: [
          'El bundle frontend y sus variables de entorno llegan al navegador y cualquier usuario puede inspeccionarlos. Claves privadas, credenciales de servicio y secretos pertenecen al servidor o a un gestor de secretos.',
          'Las versiones soportadas de Angular reciben correcciones; el lockfile fija el grafo instalado. Una auditoría de supply chain revisa vulnerabilidades, paquetes abandonados, scripts de instalación y cambios inesperados de mantenedor.',
        ],
      },
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
      {
        question: '¿Cómo mostrarías HTML proporcionado por usuarios?',
        answer:
          'Lo sanitizo con una política y librería adecuada en el servidor o una frontera auditada, conservo CSP y evito `bypassSecurityTrustHtml`. Si el producto admite un subconjunto, permito sólo tags y atributos explícitos.',
      },
      {
        question: '¿Dónde guardarías un token de sesión?',
        answer:
          'Depende del modelo de amenazas. Una cookie HttpOnly reduce robo directo por XSS y requiere protección CSRF; memoria evita persistencia pero se pierde al recargar. No presento localStorage como opción segura por defecto para credenciales de larga vida.',
      },
      {
        id: 'topic-090-xss',
        question: '¿XSS?',
        answer:
          'Ejecución de script no confiable; evitá sinks peligrosos y mantené sanitización y CSP.',
      },
      {
        id: 'topic-091-csrf',
        question: '¿CSRF?',
        answer:
          'Petición autenticada inducida desde otro origen; afecta sobre todo credenciales automáticas como cookies.',
      },
      {
        id: 'topic-092-csp',
        question: '¿CSP?',
        answer:
          'Política del navegador que limita fuentes de scripts, estilos y otros recursos.',
      },
      {
        id: 'topic-093-trusted-types',
        question: '¿Trusted Types?',
        answer:
          'Restringe asignaciones a sinks DOM peligrosos a valores creados por políticas confiables.',
      },
    ],
    references: [
      {
        label: 'Angular · Security',
        url: 'https://angular.dev/best-practices/security',
      },
      {
        label: 'OWASP · Cheat sheets',
        url: 'https://cheatsheetseries.owasp.org/',
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
    theorySections: [
      {
        title: 'Fundamentos',
        items: [
          'HTML semántico aporta nombre, rol y comportamiento nativo. `button` ejecuta acciones, `a` con `href` navega, los headings forman el índice, `label` nombra controles y los landmarks permiten saltar entre regiones.',
          'La navegación por teclado necesita un orden de foco que siga la lectura y un indicador visible. Un modal mueve el foco a su interior, impide escapar al contenido de fondo, anuncia su nombre y devuelve el foco al elemento que lo abrió.',
        ],
      },
      {
        title: 'Mecanismo y aplicación',
        items: [
          'ARIA añade nombre, rol, estado o relaciones cuando HTML nativo no alcanza. No incorpora por sí sola teclado ni comportamiento; un `div role=button` todavía necesita foco y activación con Enter y Space.',
          'Los errores asociados mediante `aria-describedby` se leen junto al control. Una live region anuncia cambios asíncronos que no reciben foco, como el resultado de una operación o una validación remota.',
        ],
      },
      {
        title: 'Decisiones y límites',
        items: [
          'CSS: cascade, specificity, stacking contexts, box model, Flexbox, Grid, container/media queries y responsive images.',
          'Zoom, texto largo y localización cambian las dimensiones del contenido; contraste y high contrast cambian su percepción; reduced motion limita animaciones. Un componente flexible conserva lectura, foco y controles sin depender de alturas fijas.',
        ],
      },
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
      {
        question: '¿Cómo probarías un modal accesible?',
        answer:
          'Lo abro sólo con teclado, compruebo nombre accesible, foco inicial, ciclo de Tab, Escape y retorno del foco. Después valido el fondo inerte y escucho el flujo con VoiceOver o NVDA.',
      },
      {
        question: '¿Cuándo usarías una live region?',
        answer:
          'Para anunciar un cambio asíncrono relevante que no recibe foco, como un resultado guardado o un error remoto. Evito anunciar cada pulsación o cambio visual porque interrumpe y satura al lector de pantalla.',
      },
    ],
    references: [
      {
        label: 'WAI · ARIA Practices',
        url: 'https://www.w3.org/WAI/ARIA/apg/',
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
    theorySections: [
      {
        title: 'Fundamentos',
        items: [
          'La configuración de build contiene valores públicos que pueden quedar embebidos en los bundles. Los secretos permanecen fuera del frontend. Validar la configuración al arrancar detecta URLs o flags faltantes y evita que cada entorno interprete defaults distintos.',
          'Un pipeline de CI ejecuta typecheck, lint, unit tests, build con budgets y recorridos críticos antes de publicar. Una caché usa el lockfile y la configuración como parte de su clave para no reutilizar dependencias o resultados incompatibles.',
        ],
      },
      {
        title: 'Mecanismo y aplicación',
        items: [
          'Los assets con hash pueden usar caché larga porque una modificación cambia su URL. El HTML conserva una política corta para descubrir el release nuevo. Un rollback necesita artefactos anteriores y compatibilidad temporal entre el frontend nuevo y la versión previa de la API.',
          'Un feature flag separa despliegue de exposición. Owner, métricas y fecha de retiro controlan su ciclo de vida; un flag permanente mantiene dos caminos de código y duplica combinaciones de prueba.',
        ],
      },
      {
        title: 'Decisiones y límites',
        items: [
          '`ng update` y los schematics transforman configuración y código para una versión nueva. Actualizar una major por vez reduce combinaciones no soportadas; las deprecations, el bundle y las métricas runtime muestran qué trabajo queda después de compilar.',
          'Los source maps relacionan el bundle minificado con el TypeScript original. En producción requieren acceso restringido porque revelan estructura y código; asociarlos con release, commit y evento permite reconstruir el stack correcto.',
        ],
      },
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
      {
        question: '¿Cómo diseñás un rollback de frontend?',
        answer:
          'Conservo artefactos inmutables por release, mantengo compatibilidad temporal con la API y puedo volver a apuntar el hosting al build anterior. Base de datos y contratos nuevos necesitan una estrategia forward-compatible para que el bundle viejo siga funcionando.',
      },
      {
        question: '¿Qué presupuesto pondrías en CI?',
        answer:
          'Límites de bundle inicial y chunks críticos, typecheck, tests y métricas del recorrido principal. Un presupuesto debe fallar cerca de la causa y tener owner; una cifra ignorada en cada pipeline no protege rendimiento.',
      },
      {
        id: 'topic-101-tree-shaking',
        question: '¿Tree shaking?',
        answer:
          'El bundler elimina código no alcanzable cuando el formato y las dependencias lo permiten.',
      },
      {
        id: 'topic-102-aot',
        question: '¿AOT?',
        answer:
          'Compila templates en build, reduce trabajo runtime y detecta errores antes.',
      },
      {
        id: 'topic-124-feature-flag',
        question: '¿Feature flag?',
        answer:
          'Control temporal de exposición con owner, métricas y plan de retiro.',
      },
    ],
    references: [
      {
        label: 'web.dev · Learn performance',
        url: 'https://web.dev/learn/performance',
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
    theorySections: [
      {
        title: 'Fundamentos',
        items: [
          'La frontera global captura errores que ninguna feature manejó. El registro conserva tipo, causa y contexto técnico sin exponer stack traces, tokens ni datos personales en la interfaz.',
          'Release, ruta, acción, correlation ID, usuario anonimizado y breadcrumbs permiten reconstruir una falla. El mismo correlation ID propagado por gateway y backend conecta el error del navegador con logs y traces del servidor.',
        ],
      },
      {
        title: 'Mecanismo y aplicación',
        items: [
          'La tasa de errores indica frecuencia, la latencia por endpoint localiza esperas, Web Vitals describe experiencia de render e interacción y el éxito de journeys mide tareas completas. Un log sin una pregunta operativa ni una acción asociada añade volumen sin diagnóstico.',
          'Angular DevTools muestra árbol, DI y profiling. Chrome Performance, Network, Memory y Coverage completan el diagnóstico.',
        ],
      },
      {
        title: 'Decisiones y límites',
        items: [
          'Un leak se vuelve visible al repetir navegación y comparar heap snapshots. Detached DOM nodes, listeners, timers y caches sin límite muestran qué referencia mantiene viva una vista que Angular ya destruyó.',
          'Un error boundary de feature contiene el fallo y ofrece una salida: retry, fallback, estado parcial o contacto de soporte. Un toast genérico desaparece y no conserva la operación que el usuario necesita recuperar.',
        ],
      },
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
      {
        question: '¿Cómo distinguís un error del frontend de uno de API?',
        answer:
          'Relaciono el evento del navegador con request, status, correlation ID y trace del backend. Si la API respondió bien, reviso parsing y render; si falló, el mismo identificador permite seguir la operación por gateway y servicio.',
      },
      {
        question: '¿Qué datos evitarías enviar a telemetría?',
        answer:
          'Tokens, passwords, bodies sensibles, datos personales sin necesidad y HTML completo. Defino una allowlist, anonimizo identificadores y aplico sampling y retención según el propósito operativo.',
      },
      {
        id: 'topic-122-memory-leak-tipico',
        question: '¿Memory leak típico?',
        answer:
          'Subscription, listener, timer, observer o cache que conserva una vista destruida.',
      },
      {
        id: 'topic-123-correlation-id',
        question: '¿Correlation ID?',
        answer:
          'Identificador que conecta eventos frontend, gateway y backend de una operación.',
      },
    ],
    references: [
      {
        label: 'web.dev · Learn performance',
        url: 'https://web.dev/learn/performance',
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
    theorySections: [
      {
        title: 'Fundamentos',
        items: [
          'Los usuarios, flujos críticos, SEO, offline, tiempo real, volumen, permisos, localización y objetivos de rendimiento forman las restricciones del diseño. Cada restricción modifica las fronteras, la estrategia de datos o el modo de rendering.',
          'Un diagrama frontend ubica features, router, estado, API layer, componentes compartidos y fronteras de dominio. La propiedad de cada dato determina quién puede escribirlo, quién lo deriva y cuánto tiempo debe vivir.',
        ],
      },
      {
        title: 'Mecanismo y aplicación',
        items: [
          'Una estrategia de caché define key, TTL e invalidación. La consistencia establece cuándo aceptar datos stale, cómo reconciliar optimistic updates, qué hacer ante conflictos y cómo mantener cursores o páginas al cambiar la colección.',
          'WebSocket ofrece comunicación bidireccional persistente, SSE envía un stream unidireccional sobre HTTP y polling repite requests. La solución necesita reconexión, orden, deduplicación y backpressure para no procesar eventos más rápido de lo que la UI puede consumirlos.',
        ],
      },
      {
        title: 'Decisiones y límites',
        items: [
          'Un diseño completo incluye autorización, accesibilidad, telemetría, niveles de prueba, estrategia de despliegue y migración. Esas fronteras determinan si el sistema puede operarse y evolucionar después del primer release.',
          'La primera versión cubre la escala y los riesgos conocidos con el menor número de piezas. Umbrales observables, como latencia, volumen o frecuencia de incidentes, indican cuándo una estrategia deja de servir y justifican el siguiente cambio.',
        ],
      },
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
      {
        question: '¿Cómo diseñarías datos en tiempo real sin saturar la UI?',
        answer:
          'Defino frecuencia útil por widget, agrupo eventos, deduplico por versión y aplico backpressure. Pauso consumidores fuera del viewport y separo el ritmo de recepción del ritmo de render.',
      },
      {
        question:
          '¿Qué incluirías en una propuesta de system design además del diagrama?',
        answer:
          'Contratos de datos, ownership, estrategia de caché, errores, seguridad, accesibilidad, métricas y rollout. También dejo umbrales que indiquen cuándo la primera solución necesita otra arquitectura.',
      },
    ],
    references: [
      {
        label: 'Google · Engineering practices',
        url: 'https://google.github.io/eng-practices/',
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
    theorySections: [
      {
        title: 'Fundamentos',
        items: [
          'Un code review evalúa corrección, seguridad, diseño y tests. Un comentario bloqueante describe un defecto que impide integrar; una sugerencia propone una mejora opcional. Explicar el motivo permite que el autor aplique el criterio en código futuro.',
          'Una decisión técnica documentada contiene contexto, alternativas y consecuencias. La fecha de revisión evita tratar como permanente una elección tomada bajo restricciones que pueden cambiar.',
        ],
      },
      {
        title: 'Mecanismo y aplicación',
        items: [
          'Mentoring hace visible el modelo mental, aumenta la dificultad de forma gradual y devuelve la decisión a quien aprende. Resolver cada problema por la otra persona concentra conocimiento y convierte al mentor en cuello de botella.',
          'Durante un incidente, el equipo primero estabiliza el servicio, comunica impacto, asigna roles y conserva evidencia. El postmortem reconstruye causas y cambia código, alertas o proceso sin buscar culpables.',
        ],
      },
      {
        title: 'Decisiones y límites',
        items: [
          'La negociación de alcance compara riesgo, dependencias, costo de demora y una entrega incremental. Exponer incertidumbre permite reservar tiempo, instrumentar el resultado o reducir el alcance antes de comprometer una fecha.',
          'Lead time, defectos, costo de mantenimiento, adopción y carga cognitiva describen salud técnica desde resultados. Líneas de código y cantidad de tickets premian volumen aunque el sistema sea más complejo o menos estable.',
        ],
      },
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
      {
        question: '¿Cómo resolvés un desacuerdo de arquitectura?',
        answer:
          'Acordamos objetivo y restricciones, escribimos alternativas con el mismo criterio y ejecutamos un spike si la incertidumbre lo requiere. La decisión queda registrada con consecuencias y fecha de revisión.',
      },
      {
        question:
          '¿Cómo elevás la calidad sin convertirte en cuello de botella?',
        answer:
          'Automatizo reglas repetibles, documento ejemplos y distribuyo ownership. En reviews explico el criterio y permito que otras personas tomen decisiones con límites claros.',
      },
    ],
    references: [
      {
        label: 'Google · Engineering practices',
        url: 'https://google.github.io/eng-practices/',
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
    theorySections: [
      {
        title: 'Fundamentos',
        items: [
          'Respondé primero qué es el concepto en una frase. Después explicá el mecanismo que produce su comportamiento, elegí una aplicación concreta y cerrá con el límite de esa elección. Ejemplo: `switchMap` reemplaza la suscripción interna anterior; lo elegiría en un buscador porque sólo interesa la consulta más reciente, pero no para guardar acciones que deben completarse todas.',
          'Separá mecanismo de decisión. «OnPush reduce comprobaciones» describe un efecto. «Uso OnPush con estado inmutable porque los cambios llegan por inputs y signals» explica una decisión. La segunda respuesta permite evaluar si entendés cuándo la herramienta encaja.',
          'Nombrá las restricciones que cambian la solución: volumen de datos, frecuencia de actualización, SEO, latencia, accesibilidad, seguridad, soporte de navegadores y capacidad del equipo. Si la pregunta no las informa, declaralas como supuestos en vez de inventar un escenario silenciosamente.',
        ],
      },
      {
        title: 'Mecanismo y aplicación',
        items: [
          'Compará alternativas con el mismo criterio. Para cada opción indicá beneficio, costo y modo de falla. Por ejemplo, SSR mejora el HTML inicial y el SEO, pero agrega infraestructura y exige código compatible con servidor; CSR simplifica la operación, pero depende más de JavaScript para el primer contenido.',
          'Explicá cómo validarías la decisión. Rendimiento se comprueba con métricas como LCP, INP, tamaño de bundle o tiempo de tarea; una migración se valida con tests, telemetría, despliegue gradual y rollback; una mejora de equipo se valida con lead time, defectos o carga operativa.',
          'Una respuesta débil enumera herramientas: «usaría Signals, OnPush y lazy loading». Una respuesta sólida conecta problema y evidencia: «el perfil mostró demasiadas vistas comprobadas; moví el estado local a Signals, mantuve referencias inmutables y medí menos scripting sin cambiar el comportamiento».',
        ],
      },
      {
        title: 'Decisiones y límites',
        items: [
          'Si no recordás una API exacta, no inventes. Explicá el modelo que sí conocés, aislá el detalle dudoso y decí cómo lo verificarías en la documentación o con una prueba mínima. El razonamiento correcto es más valioso que una firma memorizada incorrectamente.',
          'Para una experiencia real usá Contexto, Decisión, Acción y Resultado. El resultado debe incluir una señal verificable: latencia, errores, conversión, tiempo de entrega, incidentes evitados o feedback del equipo. Si no hubo medición, decí qué observaste y qué medirías hoy.',
        ],
      },
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
    references: [
      {
        label: 'Google · Engineering practices',
        url: 'https://google.github.io/eng-practices/',
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
    theorySections: [
      {
        title: 'Fundamentos',
        items: [
          'Un pitch de 60 a 90 segundos conecta especialidad, años de experiencia, dominios, dos logros y motivación para el rol. Recorrer cada empleo del CV consume tiempo sin mostrar el criterio que une la trayectoria.',
          'STAR: situación y tarea breves; acción centrada en tus decisiones; resultado con métrica, aprendizaje o reducción de riesgo.',
        ],
      },
      {
        title: 'Mecanismo y aplicación',
        items: [
          'Un banco conductual cubre conflicto, error, feedback, liderazgo, deadlines, incertidumbre, incidentes, rendimiento y arquitectura. Cada historia puede responder varias preguntas si identifica con precisión la decisión y el resultado.',
          'El caso de formularios dinámicos demuestra arquitectura, Redux o NgRx, escalabilidad y coordinación. Cantidad de formularios, tiempo de entrega y defectos antes y después convierten la historia en evidencia medible.',
        ],
      },
      {
        title: 'Decisiones y límites',
        items: [
          'La experiencia desde Angular 2 permite comparar cambios del framework a través del tiempo. Una adopción acertada muestra beneficio y migración; una API rechazada muestra restricciones y costo que superaban ese beneficio.',
          'Las preguntas al entrevistador revelan arquitectura, prácticas de calidad, organización del equipo, roadmap, manejo de incidentes, autonomía y criterio de éxito. Las respuestas permiten evaluar el alcance real del rol.',
        ],
      },
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
      {
        question: '¿Cómo respondés sobre un conflicto técnico?',
        answer:
          'Describo la restricción, la posición de cada parte y cómo llevé la discusión a evidencia. Explico la decisión final, mi contribución y qué cambió en el producto o en la forma de trabajar.',
      },
      {
        question: '¿Cómo hablás de un proyecto sin métricas históricas?',
        answer:
          'Uso señales verificables como incidentes, tiempo de entrega, defectos o feedback, y aclaro qué no se midió. Cierro con la métrica que instrumentaría hoy en lugar de inventar un número.',
      },
    ],
    references: [
      {
        label: 'Google · Engineering practices',
        url: 'https://google.github.io/eng-practices/',
      },
    ],
  },
];

export const PRACTICE_CASES: readonly PracticeCase[] = [
  {
    id: 'buscador-cancelable',
    stack: ['Angular', 'RxJS', 'Testing'],
    title: 'Buscador cancelable',
    brief:
      'Buscador con debounce, cancelación, estados de UI, caché y tests con tiempo controlado.',
    approach:
      'Modelá la pantalla como un único stream de estados. `switchMap` desuscribe la búsqueda anterior; con `HttpClient` también aborta la request del navegador. Si el servidor no cancela trabajo, igual evita que una respuesta vieja pise la UI.',
    code_title: 'search.store.ts',
    code: "type State =\n  | { status: 'idle' | 'loading'; items: readonly Result[] }\n  | { status: 'success'; items: readonly Result[] }\n  | { status: 'error'; items: []; message: string };\n\nreadonly state$ = this.query.valueChanges.pipe(\n  map(value => value.trim()),\n  debounceTime(300),\n  distinctUntilChanged(),\n  switchMap(query => !query\n    ? of<State>({ status: 'idle', items: [] })\n    : concat(\n        of<State>({ status: 'loading', items: [] }),\n        this.api.find(query).pipe(\n          map(items => ({ status: 'success', items }) as const),\n          catchError(() => of({\n            status: 'error', items: [], message: 'No pudimos buscar'\n          } as const))\n        )\n      )\n  ),\n  shareReplay({ bufferSize: 1, refCount: true })\n);",
    checks: [
      'Con `fakeAsync`, a los 299 ms no hay request y a los 300 ms sí.',
      'Dos queries rápidas producen un solo resultado visible: el de la última.',
      'La clave de caché se normaliza y tiene una política explícita de expiración.',
    ],
  },
  {
    id: 'formularios-dinamicos',
    stack: ['Angular', 'Reactive Forms', 'CVA'],
    title: 'Motor de formularios dinámicos',
    brief:
      'Schema tipado para validación, layout, visibilidad, permisos, persistencia y evolución.',
    approach:
      'Separá el contrato serializable del renderer. Una discriminated union vuelve exhaustivos los tipos de campo y un registry conecta cada tipo con su componente. Las reglas recibidas del servidor describen condiciones; nunca ejecutan código.',
    code_title: 'form-schema.ts',
    code: "type Field =\n  | { kind: 'text'; key: string; label: string; required?: boolean }\n  | { kind: 'select'; key: string; label: string; options: Option[] }\n  | { kind: 'date'; key: string; label: string; min?: string };\n\ninterface FormSchema {\n  version: 3;\n  fields: readonly Field[];\n}\n\nfunction buildForm(schema: FormSchema): FormGroup {\n  return new FormGroup(Object.fromEntries(\n    schema.fields.map(field => [\n      field.key,\n      new FormControl(null, field.required ? Validators.required : [])\n    ])\n  ));\n}\n\nconst renderers: Record<Field['kind'], Type<ControlValueAccessor>> = {\n  text: TextFieldComponent,\n  select: SelectFieldComponent,\n  date: DateFieldComponent\n};",
    checks: [
      'Versioná schema y draft juntos; migrá `v1 → v2 → v3` con funciones puras.',
      'Cancelá validadores asíncronos obsoletos y representá el estado `pending`.',
      'El backend vuelve a validar permisos y valores aunque la UI oculte campos.',
    ],
  },
  {
    id: 'dashboard-tiempo-real',
    stack: ['Angular', 'RxJS', 'WebSocket'],
    title: 'Dashboard en tiempo real',
    brief:
      'Seis widgets con ritmos distintos, reconexión, backpressure y pausa fuera del viewport.',
    approach:
      'Usá una conexión por sesión y multiplexá topics. Separá el ritmo de recepción del de render: eventos críticos pasan inmediatamente; métricas frecuentes se agrupan por intervalo para proteger el main thread.',
    code_title: 'live-metrics.service.ts',
    code: 'readonly connection$ = defer(() => this.connect()).pipe(\n  retry({\n    count: 8,\n    delay: (_, attempt) =>\n      timer(Math.min(1_000 * 2 ** attempt, 30_000))\n  }),\n  share({\n    connector: () => new ReplaySubject<MetricEvent>(1),\n    resetOnRefCountZero: true\n  })\n);\n\nmetric$(widget: Widget, visible$: Observable<boolean>) {\n  return visible$.pipe(\n    switchMap(visible => visible ? this.connection$ : EMPTY),\n    filter(event => event.topic === widget.topic),\n    auditTime(widget.renderEveryMs),\n    distinctUntilChanged((a, b) => a.version === b.version)\n  );\n}',
    checks: [
      'Pausá consumidores invisibles con `IntersectionObserver`.',
      'Deduplicá eventos por id y versión después de reconectar.',
      'Medí INP y long tasks por widget, no solo latencia de red.',
    ],
  },
  {
    id: 'migracion-angular',
    stack: ['Angular', 'Signals', 'Zoneless'],
    title: 'Migración entre cinco versiones mayores',
    brief:
      'Upgrade incremental con pruebas, métricas, canary, feature flags y rollback.',
    approach:
      'Actualizá una major por vez y separá la actualización mecánica de los cambios arquitectónicos. Cada etapa produce un artefacto desplegable y conserva compatibilidad temporal con la API y los assets anteriores.',
    code_title: 'migration-plan.ts',
    code: "const stages: readonly MigrationStage[] = [\n  { from: 17, to: 18, work: ['ng update', 'fix deprecations'] },\n  { from: 18, to: 19, work: ['standalone routes'] },\n  { from: 19, to: 20, work: ['built-in control flow'] },\n  { from: 20, to: 21, work: ['signals at feature boundaries'] },\n  { from: 21, to: 22, work: ['zoneless canary'] }\n];\n\nfor (const stage of stages) {\n  await runTypecheckAndTests();\n  await compareBudgets(['initial-js', 'INP', 'error-rate']);\n  await deployCanary({ percentage: 5, featureFlag: stage.to });\n  // Promote only if the observation window stays inside the SLO.\n}",
    checks: [
      'No mezcles upgrade, Signals y zoneless en el mismo PR.',
      'Probá rutas críticas, SSR, hydration y lazy loading en cada major.',
      'Rollback exige bundles previos y contratos de API compatibles.',
    ],
  },
  {
    id: 'lista-100k',
    stack: ['Angular', 'CDK', 'Signals'],
    title: 'Lista de 100.000 filas',
    brief:
      'Paginación y filtros remotos, virtual scroll, caché y navegación accesible.',
    approach:
      'No lleves 100.000 registros al browser. El servidor pagina, ordena y filtra; virtual scroll limita el DOM. La query completa forma la clave de caché para no mezclar páginas de filtros distintos.',
    code_title: 'people-table.store.ts',
    code: "interface PeopleQuery {\n  cursor?: string;\n  sort: 'name' | 'createdAt';\n  direction: 'asc' | 'desc';\n  filter: string;\n}\n\nreadonly page = resource({\n  params: () => this.query(),\n  loader: ({ params, abortSignal }) =>\n    firstValueFrom(this.api.list(params, { signal: abortSignal }))\n});\n\ntrackRow(_: number, row: Person) {\n  return row.id;\n}\n\n// Use cdk-virtual-scroll-viewport with a stable itemSize.\n// aria-rowindex keeps the absolute position returned by the API.",
    checks: [
      'Medí nodos DOM, heap, scripting y layout con datos de producción.',
      'Conservá el foco por id cuando una fila sale del viewport.',
      'Anunciá carga, cantidad de resultados y cambios de página.',
    ],
  },
  {
    id: 'refresh-autenticacion',
    stack: ['Angular', 'HttpClient', 'RxJS'],
    title: 'Carrera de refresh de autenticación',
    brief:
      'Un solo refresh para varios 401 simultáneos, con cola, retry y logout seguro.',
    approach:
      'Compartí un único refresh en vuelo. Las requests esperan ese resultado y reintentan una vez. El endpoint de refresh queda fuera del interceptor para evitar recursión.',
    code_title: 'auth.interceptor.ts',
    code: 'let refreshInFlight$: Observable<string> | undefined;\n\nfunction refreshOnce(): Observable<string> {\n  return refreshInFlight$ ??= auth.refresh().pipe(\n    map(session => session.accessToken),\n    shareReplay({ bufferSize: 1, refCount: false }),\n    finalize(() => refreshInFlight$ = undefined)\n  );\n}\n\nreturn next(request).pipe(\n  catchError(error => {\n    if (error.status !== 401 || request.context.get(IS_RETRY)) {\n      return throwError(() => error);\n    }\n    return refreshOnce().pipe(\n      switchMap(token => next(withToken(request, token, true))),\n      catchError(refreshError => logoutAndFail(refreshError))\n    );\n  })\n);',
    checks: [
      'Tres 401 simultáneos producen un refresh y tres reintentos.',
      'Si refresh falla, cancelá la cola, limpiá memoria y navegá una vez.',
      'No registres tokens; correlacioná el incidente con request ids.',
    ],
  },
  {
    id: 'event-loop',
    stack: ['JavaScript', 'Browser'],
    title: 'Event loop',
    brief: 'Predicción verificable de stack, microtasks y tasks.',
    approach:
      'Ejecutá primero todo el stack síncrono. Al vaciarse, drená microtasks en orden FIFO; recién después el browser puede renderizar y tomar la siguiente task, como el timer.',
    code_title: 'event-loop.exercise.ts',
    code: "console.log('A');\nsetTimeout(() => console.log('B'), 0);\n\nPromise.resolve().then(() => {\n  console.log('C');\n  queueMicrotask(() => console.log('D'));\n});\n\nqueueMicrotask(() => console.log('E'));\n\nasync function run() {\n  console.log('F');\n  await null;\n  console.log('G');\n}\n\nrun();\nconsole.log('H');\n\n// Resultado: A, F, H, C, E, G, D, B",
    checks: [
      'Explicá por qué `await` agenda la continuación como microtask.',
      'Una microtask puede encolar otra antes de pasar al timer.',
      'Verificá en browser; Node.js agrega fases y APIs propias.',
    ],
  },
  {
    id: 'tabla-accesible',
    stack: ['Angular', 'HTML', 'ARIA'],
    title: 'Tabla accesible',
    brief:
      'Tabla ordenable y paginada con semántica, foco y anuncios correctos.',
    approach:
      'Conservá la semántica nativa y convertí el encabezado ordenable en un botón. `aria-sort` vive en el `th`; los resultados se anuncian sin mover el foco automáticamente.',
    code_title: 'people-table.component.html',
    code: '<table>\n  <caption>Personas del equipo</caption>\n  <thead>\n    <tr>\n      <th scope="col" [attr.aria-sort]="nameSort()">\n        <button type="button" (click)="sortBy(\'name\')">\n          Nombre <span aria-hidden="true">↕</span>\n        </button>\n      </th>\n      <th scope="col">Rol</th>\n    </tr>\n  </thead>\n  <tbody>\n    @for (person of people(); track person.id) {\n      <tr><th scope="row">{{ person.name }}</th><td>{{ person.role }}</td></tr>\n    }\n  </tbody>\n</table>\n<p aria-live="polite">{{ resultSummary() }}</p>',
    checks: [
      'Probá Tab, Enter, orden y paginación solo con teclado.',
      'Loading conserva caption y headers; empty state indica cómo seguir.',
      'Validá con VoiceOver o NVDA, además de axe.',
    ],
  },
  {
    id: 'layout-sin-cls',
    stack: ['CSS', 'Browser', 'Core Web Vitals'],
    title: 'Layout responsive sin CLS',
    brief:
      'Card con container queries, medios dimensionados y movimiento opcional.',
    approach:
      'La card responde al espacio asignado, no al viewport. Reservá la proporción de la imagen antes de descargarla y animá propiedades que no provoquen layout.',
    code_title: 'product-card.scss',
    code: '.card-shell { container: product / inline-size; }\n\n.card {\n  display: grid;\n  gap: 1rem;\n  overflow: clip;\n}\n\n.card img {\n  width: 100%;\n  aspect-ratio: 16 / 9;\n  object-fit: cover;\n}\n\n@container product (min-width: 36rem) {\n  .card { grid-template-columns: minmax(12rem, 2fr) 3fr; }\n}\n\n@media (prefers-reduced-motion: no-preference) {\n  .card { transition: transform 180ms ease; }\n  .card:hover { transform: translateY(-2px); }\n}',
    checks: [
      'Reservá espacio para imágenes, fuentes y contenido tardío.',
      'No uses `container-type: size` si el contenido define la altura.',
      'Medí CLS durante el recorrido completo, no solo al cargar.',
    ],
  },
  {
    id: 'cache-offline',
    stack: ['Browser', 'IndexedDB', 'Service Worker'],
    title: 'Caché offline',
    brief: 'HTTP, Service Worker e IndexedDB con invalidación y logout seguro.',
    approach:
      'Cada capa tiene un rol: HTTP revalida, Service Worker conserva shell y recursos seguros, IndexedDB guarda datos estructurados. No caches por defecto respuestas privadas ni credenciales.',
    code_title: 'article.repository.ts',
    code: "async function getArticle(id: string): Promise<Article> {\n  const cached = await db.articles.get(id);\n\n  try {\n    const response = await fetch(`/api/articles/${id}`, {\n      headers: cached?.etag ? { 'If-None-Match': cached.etag } : {}\n    });\n    if (response.status === 304 && cached) return cached.value;\n    if (!response.ok) throw new Error(`HTTP ${response.status}`);\n\n    const value = await response.json() as Article;\n    await db.articles.put({\n      id, value, etag: response.headers.get('ETag'), savedAt: Date.now()\n    });\n    return value;\n  } catch (error) {\n    if (cached) return cached.value;\n    throw error;\n  }\n}",
    checks: [
      'Definí TTL, ETag y versión de schema; no uses caché eterna.',
      'En logout borrá IndexedDB, Cache Storage y memoria del usuario.',
      'Indicá que el dato es offline y cuándo se actualizó.',
    ],
  },
];

export const CODE_CHALLENGE_FORMATS: readonly CodeChallengeFormat[] = [
  {
    id: 'live-coding',
    time: '45–60 min',
    title: 'Live coding',
    description:
      'Compartís pantalla, aclarás requisitos y construís una solución incremental mientras explicás decisiones.',
  },
  {
    id: 'debugging',
    time: '30–45 min',
    title: 'Debugging y code review',
    description:
      'Recibís una feature rota o un PR y tenés que encontrar carreras, leaks, errores de estado y problemas de accesibilidad.',
  },
  {
    id: 'pairing',
    time: '45–75 min',
    title: 'Pair programming',
    description:
      'Implementás o refactorizás con el entrevistador. Evalúan colaboración, navegación del código y respuesta al feedback.',
  },
  {
    id: 'take-home',
    time: '2–4 h',
    title: 'Take-home acotado',
    description:
      'Entregás una pequeña aplicación con README, tests y commits. Importa más el alcance defendible que agregar features sin terminar.',
  },
];

export const CODE_CHALLENGE_DRILLS: readonly CodeChallengeDrill[] = [
  {
    id: 'typescript-transformations',
    priority: 'Calentamiento',
    time: '25 min',
    title: 'Transformación de datos con TypeScript',
    prompt:
      'Dado un array de transacciones, eliminá duplicados por `id`, agrupá por moneda, calculá totales y devolvé los tres clientes con mayor gasto sin mutar la entrada.',
    deliverables: [
      'Tipos estrictos y retorno explícito.',
      'Complejidad temporal explicada.',
      'Tests para duplicados, array vacío, importes negativos y empates.',
    ],
    watch_for:
      'No encadenes cinco recorridos si un `Map` resuelve agrupación y deduplicación en una pasada. Aclará qué significa una transacción negativa.',
    solution:
      'Recorro la entrada una vez para deduplicar y acumular. Mantengo totales por moneda y por cliente; después ordeno únicamente los clientes únicos. La entrada nunca se modifica y el criterio de empate queda explícito.',
    solution_code_title: 'transaction-summary.ts',
    solution_code:
      'interface Transaction {\n  readonly id: string;\n  readonly customerId: string;\n  readonly currency: string;\n  readonly amount: number;\n}\n\ninterface Summary {\n  readonly totalsByCurrency: Readonly<Record<string, number>>;\n  readonly topCustomers: readonly { customerId: string; total: number }[];\n}\n\nexport function summarize(input: readonly Transaction[]): Summary {\n  const seen = new Set<string>();\n  const currencyTotals = new Map<string, number>();\n  const customerTotals = new Map<string, number>();\n\n  for (const transaction of input) {\n    if (seen.has(transaction.id)) continue;\n    seen.add(transaction.id);\n\n    currencyTotals.set(\n      transaction.currency,\n      (currencyTotals.get(transaction.currency) ?? 0) + transaction.amount\n    );\n    customerTotals.set(\n      transaction.customerId,\n      (customerTotals.get(transaction.customerId) ?? 0) + transaction.amount\n    );\n  }\n\n  const topCustomers = [...customerTotals]\n    .map(([customerId, total]) => ({ customerId, total }))\n    .sort((a, b) => b.total - a.total || a.customerId.localeCompare(b.customerId))\n    .slice(0, 3);\n\n  return {\n    totalsByCurrency: Object.fromEntries(currencyTotals),\n    topCustomers\n  };\n}',
    test_code_title: 'transaction-summary.spec.ts',
    test_code:
      "describe('summarize', () => {\n  it('deduplicates, aggregates and does not mutate the input', () => {\n    const input = Object.freeze([\n      { id: '1', customerId: 'ana', currency: 'USD', amount: 10 },\n      { id: '1', customerId: 'ana', currency: 'USD', amount: 10 },\n      { id: '2', customerId: 'bob', currency: 'USD', amount: 25 },\n      { id: '3', customerId: 'ana', currency: 'EUR', amount: -2 }\n    ]);\n\n    expect(summarize(input)).toEqual({\n      totalsByCurrency: { USD: 35, EUR: -2 },\n      topCustomers: [\n        { customerId: 'bob', total: 25 },\n        { customerId: 'ana', total: 8 }\n      ]\n    });\n    expect(input).toHaveLength(4);\n  });\n\n  it('returns empty collections for empty input', () => {\n    expect(summarize([])).toEqual({ totalsByCurrency: {}, topCustomers: [] });\n  });\n});",
    decisions: [
      'Complejidad: `O(n + c log c)`, donde `c` es la cantidad de clientes únicos.',
      'Un importe negativo se interpreta como devolución; si el dominio dice otra cosa, se valida antes de agregar.',
      'El empate se resuelve por `customerId` para que el resultado sea determinista.',
    ],
  },
  {
    id: 'rxjs-search',
    priority: 'Muy probable',
    time: '45 min',
    title: 'Buscador Angular con RxJS',
    prompt:
      'Completá un buscador con debounce, cancelación de requests anteriores, loading, error, empty state y caché por query. Evitá resultados fuera de orden.',
    deliverables: [
      '`debounceTime`, `distinctUntilChanged` y política de flattening defendida.',
      'Estados representables sin booleanos contradictorios.',
      'Test con tiempo controlado y dos respuestas fuera de orden.',
    ],
    watch_for:
      'El entrevistador puede preguntar por qué `switchMap` y qué cambia si cada operación debe completarse. No anides `subscribe`.',
    solution:
      'El input produce una query normalizada. `switchMap` conserva solo la búsqueda más reciente y `concat` emite loading antes del resultado. Un estado discriminado evita combinaciones como loading y error simultáneos.',
    solution_code_title: 'search.store.ts',
    solution_code:
      "type SearchState =\n  | { status: 'idle'; results: readonly Result[] }\n  | { status: 'loading'; results: readonly Result[] }\n  | { status: 'success'; results: readonly Result[] }\n  | { status: 'error'; results: readonly Result[]; message: string };\n\n@Injectable()\nexport class SearchStore {\n  private readonly api = inject(SearchApi);\n  private readonly querySubject = new Subject<string>();\n  private readonly cache = new Map<string, readonly Result[]>();\n\n  readonly state$ = this.querySubject.pipe(\n    map(query => query.trim().toLocaleLowerCase()),\n    debounceTime(300),\n    distinctUntilChanged(),\n    switchMap(query => {\n      if (!query) return of<SearchState>({ status: 'idle', results: [] });\n      const cached = this.cache.get(query);\n      if (cached) return of<SearchState>({ status: 'success', results: cached });\n\n      return concat(\n        of<SearchState>({ status: 'loading', results: [] }),\n        this.api.search(query).pipe(\n          tap(results => this.cache.set(query, results)),\n          map(results => ({ status: 'success', results }) as const),\n          catchError(() => of({\n            status: 'error', results: [], message: 'No pudimos buscar'\n          } as const))\n        )\n      );\n    }),\n    shareReplay({ bufferSize: 1, refCount: true })\n  );\n\n  search(query: string): void {\n    this.querySubject.next(query);\n  }\n}",
    test_code_title: 'search.store.spec.ts',
    test_code:
      "it('debounces and ignores the stale request', fakeAsync(() => {\n  const first = new Subject<readonly Result[]>();\n  const second = new Subject<readonly Result[]>();\n  api.search.mockReturnValueOnce(first).mockReturnValueOnce(second);\n  const states: SearchState[] = [];\n  store.state$.subscribe(state => states.push(state));\n\n  store.search('angular');\n  tick(299);\n  expect(api.search).not.toHaveBeenCalled();\n  tick(1);\n\n  store.search('signals');\n  tick(300);\n  first.next([{ id: 'old' }]);\n  second.next([{ id: 'new' }]);\n\n  expect(api.search).toHaveBeenCalledTimes(2);\n  expect(states.at(-1)).toEqual({\n    status: 'success', results: [{ id: 'new' }]\n  });\n}));",
    decisions: [
      '`switchMap` es correcto porque una query anterior deja de interesar; para guardar acciones usaría `concatMap` o `mergeMap` según el contrato.',
      'La caché necesita TTL o invalidación en una aplicación real.',
      'Desuscribir `HttpClient` aborta la request del browser, aunque el servidor podría continuar procesándola.',
    ],
  },
  {
    id: 'angular-feature',
    priority: 'Muy probable',
    time: '60 min',
    title: 'Feature Angular de punta a punta',
    prompt:
      'Construí una lista de productos desde una API: búsqueda, filtro de categoría, orden, favorito optimista y estados loading/error/empty. La URL debe conservar los filtros.',
    deliverables: [
      'Componente standalone con límites claros entre UI, estado y API.',
      'Signals/computed o RxJS usados con un criterio consistente.',
      'HTML semántico, teclado, `track` estable y tests de interacción.',
    ],
    watch_for:
      'No diseñes una arquitectura de diez archivos antes del primer resultado visible. Entregá un vertical slice y extraé cuando aparezca una responsabilidad real.',
    solution:
      'Mantengo filtros como signals y derivo la query en un `computed`. El store conserva la frontera HTTP y expone un único estado. El favorito aplica actualización optimista, guarda el snapshot y revierte ante error.',
    solution_code_title: 'product-explorer.component.ts',
    solution_code:
      "@Component({\n  standalone: true,\n  imports: [ReactiveFormsModule],\n  templateUrl: './product-explorer.html',\n  changeDetection: ChangeDetectionStrategy.OnPush\n})\nexport class ProductExplorer {\n  private readonly api = inject(ProductApi);\n  private readonly route = inject(ActivatedRoute);\n  private readonly router = inject(Router);\n\n  readonly search = new FormControl('', { nonNullable: true });\n  readonly category = signal<string | null>(\n    this.route.snapshot.queryParamMap.get('category')\n  );\n  readonly sort = signal<ProductSort>('name');\n  readonly retry = signal(0);\n\n  private readonly searchValue = toSignal(this.search.valueChanges.pipe(\n    startWith(this.search.value), debounceTime(300), distinctUntilChanged()\n  ), { initialValue: '' });\n\n  readonly query = computed(() => ({\n    search: this.searchValue().trim(),\n    category: this.category(),\n    sort: this.sort(),\n    retry: this.retry()\n  }));\n\n  readonly products = resource({\n    params: () => this.query(),\n    loader: ({ params, abortSignal }) =>\n      firstValueFrom(this.api.list(params, abortSignal))\n  });\n\n  updateCategory(category: string | null): void {\n    this.category.set(category);\n    void this.router.navigate([], {\n      queryParams: { category }, queryParamsHandling: 'merge', replaceUrl: true\n    });\n  }\n\n  retryLoad(): void {\n    this.retry.update(value => value + 1);\n  }\n}",
    test_code_title: 'product-explorer.spec.ts',
    test_code:
      "it('keeps filters in the URL and renders an empty state', async () => {\n  api.list.mockReturnValue(of([]));\n  const fixture = TestBed.createComponent(ProductExplorer);\n  fixture.detectChanges();\n\n  fixture.componentInstance.updateCategory('books');\n  await fixture.whenStable();\n  fixture.detectChanges();\n\n  expect(router.navigate).toHaveBeenCalledWith([], expect.objectContaining({\n    queryParams: { category: 'books' }, replaceUrl: true\n  }));\n  expect(fixture.nativeElement.textContent).toContain('Sin productos');\n});\n\nit('tracks cards by product id', () => {\n  api.list.mockReturnValue(of([{ id: 'p1', name: 'Keyboard', price: 90 }]));\n  const fixture = TestBed.createComponent(ProductExplorer);\n  fixture.detectChanges();\n  expect(fixture.nativeElement.querySelector('[data-product-id=\"p1\"]')).not.toBeNull();\n});",
    decisions: [
      'Un vertical slice puede vivir en un componente; extraigo store o facade cuando estado y efectos necesitan otro ciclo de vida.',
      '`resource` recibe `AbortSignal`, por lo que una query nueva puede cancelar la carga anterior.',
      'La mutación optimista debe revertir desde un snapshot y anunciar el error sin perder foco.',
    ],
  },
  {
    id: 'debug-race',
    priority: 'Muy probable',
    time: '35 min',
    title: 'Encontrar una carrera y un memory leak',
    prompt:
      'Un componente hace `subscribe` dentro de otro `subscribe`, duplica requests al navegar y a veces muestra el usuario anterior. Diagnosticá, corregí y agregá una prueba que reproduzca la carrera.',
    deliverables: [
      'Causa explicada antes de editar.',
      'Cancelación o teardown ligado al ciclo de vida.',
      'Prueba que falla antes del fix y pasa después.',
    ],
    watch_for:
      'No tapes el síntoma con más flags. Buscá ownership de la suscripción, identidad de la request y orden temporal de las respuestas.',
    solution:
      'La ruta se transforma en un stream de ids y `switchMap` reemplaza la carga anterior. `takeUntilDestroyed` ata la suscripción al componente. `distinctUntilChanged` evita repetir la misma request.',
    solution_code_title: 'user-detail.component.ts',
    solution_code:
      "@Component({\n  standalone: true,\n  template: `\n    @if (user(); as current) {\n      <h1>{{ current.name }}</h1>\n    } @else {\n      <p>Seleccioná un usuario</p>\n    }\n  `\n})\nexport class UserDetailComponent {\n  private readonly route = inject(ActivatedRoute);\n  private readonly api = inject(UserApi);\n  private readonly destroyRef = inject(DestroyRef);\n\n  readonly user = toSignal(\n    this.route.paramMap.pipe(\n      map(params => params.get('id')),\n      filter((id): id is string => id !== null),\n      distinctUntilChanged(),\n      switchMap(id => this.api.get(id).pipe(\n        catchError(() => of(null))\n      )),\n      takeUntilDestroyed(this.destroyRef)\n    ),\n    { initialValue: null }\n  );\n}",
    test_code_title: 'user-detail.component.spec.ts',
    test_code:
      "it('never renders a stale response', () => {\n  const params$ = new Subject<ParamMap>();\n  const first$ = new Subject<User>();\n  const second$ = new Subject<User>();\n  api.get.mockReturnValueOnce(first$).mockReturnValueOnce(second$);\n  route.paramMap = params$;\n\n  const fixture = TestBed.createComponent(UserDetailComponent);\n  params$.next(convertToParamMap({ id: '1' }));\n  params$.next(convertToParamMap({ id: '2' }));\n  first$.next({ id: '1', name: 'Old user' });\n  second$.next({ id: '2', name: 'Current user' });\n  fixture.detectChanges();\n\n  expect(fixture.nativeElement.textContent).toContain('Current user');\n  expect(fixture.nativeElement.textContent).not.toContain('Old user');\n});",
    decisions: [
      'El leak nace porque la suscripción exterior sobrevive al componente y crea suscripciones interiores adicionales.',
      '`switchMap` resuelve identidad temporal; un booleano loading no puede hacerlo.',
      'La prueba controla ambas respuestas para reproducir determinísticamente la carrera.',
    ],
  },
  {
    id: 'reactive-form',
    priority: 'Probable',
    time: '50 min',
    title: 'Formulario reactivo real',
    prompt:
      'Implementá alta de usuario con validación cruzada, username asíncrono, campos condicionales, errores accesibles y protección contra doble submit.',
    deliverables: [
      'Formulario tipado y validadores testeables.',
      'Manejo correcto de `pending`, submit y errores del servidor.',
      'Foco o resumen de errores sin depender solo del color.',
    ],
    watch_for:
      'La validación asíncrona necesita cancelación y debounce. El backend sigue siendo la autoridad aunque el control sea válido.',
    solution:
      'El formulario es non-nullable y tipado. La confirmación se valida a nivel de grupo; el username usa un validador asíncrono que espera antes de consultar. El submit se bloquea durante `pending`, envío o invalidez.',
    solution_code_title: 'signup.component.ts',
    solution_code:
      "const passwordsMatch: ValidatorFn = control => {\n  const password = control.get('password')?.value;\n  const confirmation = control.get('confirmation')?.value;\n  return password === confirmation ? null : { passwordsMismatch: true };\n};\n\nfunction usernameAvailable(api: UsersApi): AsyncValidatorFn {\n  return control => timer(300).pipe(\n    switchMap(() => api.usernameExists(control.value)),\n    map(exists => exists ? { usernameTaken: true } : null),\n    catchError(() => of({ usernameCheckFailed: true })),\n    first()\n  );\n}\n\n@Component({ standalone: true, imports: [ReactiveFormsModule] })\nexport class SignupComponent {\n  private readonly api = inject(UsersApi);\n  private readonly builder = inject(NonNullableFormBuilder);\n  readonly submitting = signal(false);\n  readonly serverError = signal<string | null>(null);\n\n  readonly form = this.builder.group({\n    username: this.builder.control('', {\n      validators: [Validators.required, Validators.minLength(3)],\n      asyncValidators: [usernameAvailable(this.api)],\n      updateOn: 'blur'\n    }),\n    password: ['', [Validators.required, Validators.minLength(12)]],\n    confirmation: ['', Validators.required],\n    companyAccount: false,\n    companyName: ''\n  }, { validators: passwordsMatch });\n\n  submit(): void {\n    if (this.form.invalid || this.form.pending || this.submitting()) {\n      this.form.markAllAsTouched();\n      return;\n    }\n    this.submitting.set(true);\n    this.api.create(this.form.getRawValue()).pipe(\n      finalize(() => this.submitting.set(false))\n    ).subscribe({ error: () => this.serverError.set('No pudimos crear la cuenta') });\n  }\n}",
    test_code_title: 'signup.component.spec.ts',
    test_code:
      "it('rejects mismatched passwords and prevents submit', () => {\n  const fixture = TestBed.createComponent(SignupComponent);\n  const component = fixture.componentInstance;\n  component.form.patchValue({\n    username: 'adrii', password: 'very-secure-1', confirmation: 'different-123'\n  });\n\n  component.submit();\n\n  expect(component.form.hasError('passwordsMismatch')).toBe(true);\n  expect(api.create).not.toHaveBeenCalled();\n});\n\nit('marks a username reported by the API as taken', fakeAsync(() => {\n  api.usernameExists.mockReturnValue(of(true));\n  const control = TestBed.createComponent(SignupComponent)\n    .componentInstance.form.controls.username;\n  control.setValue('adrii');\n  control.markAsTouched();\n  control.updateValueAndValidity();\n  tick(300);\n\n  expect(control.hasError('usernameTaken')).toBe(true);\n}));",
    decisions: [
      "`updateOn: 'blur'` evita consultar disponibilidad en cada tecla; para feedback en vivo usaría un stream externo con debounce.",
      'Los errores se asocian con `aria-describedby` y el submit inválido lleva foco al primer control con error.',
      'La respuesta del servidor se mapea nuevamente al campo aunque el validador previo haya pasado.',
    ],
  },
  {
    id: 'http-testing',
    priority: 'Probable',
    time: '45 min',
    title: 'Interceptor funcional y tests HTTP',
    prompt:
      'Agregá correlation id y token solo a la API propia. Ante 401, reintentá una vez después de un refresh compartido. Probá éxito, error y requests concurrentes.',
    deliverables: [
      'Interceptor funcional y bypass explícito para refresh.',
      'Inmutabilidad de `HttpRequest` respetada.',
      'Tests con `provideHttpClientTesting()` y verificación de requests pendientes.',
    ],
    watch_for:
      'La prueba difícil son varios 401 simultáneos: debe existir un solo refresh. Evitá loops y no registres credenciales.',
    solution:
      'El interceptor agrega headers solo a la API propia y marca el reintento en `HttpContext`. Un observable compartido representa el refresh en vuelo; todas las requests esperan la misma emisión y reintentan una sola vez.',
    solution_code_title: 'auth.interceptor.ts',
    solution_code:
      "const RETRIED = new HttpContextToken(() => false);\nlet refreshInFlight$: Observable<string> | null = null;\n\nfunction sharedRefresh(auth: AuthService): Observable<string> {\n  if (!refreshInFlight$) {\n    refreshInFlight$ = auth.refresh().pipe(\n      map(session => session.accessToken),\n      shareReplay({ bufferSize: 1, refCount: false }),\n      finalize(() => refreshInFlight$ = null)\n    );\n  }\n  return refreshInFlight$;\n}\n\nexport const authInterceptor: HttpInterceptorFn = (request, next) => {\n  const auth = inject(AuthService);\n  const isOwnApi = request.url.startsWith(environment.apiUrl);\n  const isRefresh = request.url.endsWith('/auth/refresh');\n  if (!isOwnApi || isRefresh) return next(request);\n\n  const correlationId = crypto.randomUUID();\n  const authenticated = request.clone({\n    setHeaders: {\n      'X-Correlation-ID': correlationId,\n      ...(auth.token() ? { Authorization: `Bearer ${auth.token()}` } : {})\n    }\n  });\n\n  return next(authenticated).pipe(\n    catchError(error => {\n      if (error.status !== 401 || request.context.get(RETRIED)) {\n        return throwError(() => error);\n      }\n      return sharedRefresh(auth).pipe(\n        switchMap(token => next(request.clone({\n          context: request.context.set(RETRIED, true),\n          setHeaders: { Authorization: `Bearer ${token}`, 'X-Correlation-ID': correlationId }\n        }))),\n        catchError(refreshError => {\n          auth.logout();\n          return throwError(() => refreshError);\n        })\n      );\n    })\n  );\n};",
    test_code_title: 'auth.interceptor.spec.ts',
    test_code:
      "it('shares one refresh across concurrent 401 responses', () => {\n  service.load('/a').subscribe();\n  service.load('/b').subscribe();\n  const initial = http.match(req => ['/a', '/b'].some(path => req.url.endsWith(path)));\n  initial.forEach(req => req.flush(null, { status: 401, statusText: 'Unauthorized' }));\n\n  const refresh = http.expectOne(`${apiUrl}/auth/refresh`);\n  refresh.flush({ accessToken: 'fresh-token' });\n\n  const retried = http.match(req =>\n    req.headers.get('Authorization') === 'Bearer fresh-token'\n  );\n  expect(retried).toHaveLength(2);\n  retried.forEach(req => req.flush({ ok: true }));\n  http.verify();\n});\n\nit('does not send credentials to a third-party URL', () => {\n  service.loadExternal().subscribe();\n  const request = http.expectOne('https://images.example/avatar');\n  expect(request.request.headers.has('Authorization')).toBe(false);\n  request.flush(new Blob());\n});",
    decisions: [
      'Los interceptores funcionales ofrecen un orden de ejecución predecible.',
      'El `HttpContextToken` impide un segundo retry y el endpoint refresh evita interceptarse a sí mismo.',
      'La telemetría registra correlation id y estado, nunca access o refresh tokens.',
    ],
  },
  {
    id: 'component-tests',
    priority: 'Probable',
    time: '40 min',
    title: 'Completar tests de un componente',
    prompt:
      'Recibís un componente con tests vacíos. Cubrí render, interacción, dependencia HTTP, error, navegación por teclado y un caso límite elegido por vos.',
    deliverables: [
      'Tests de comportamiento observable, no de implementación privada.',
      'Dobles en la frontera correcta y datos legibles.',
      'Nombres que describen escenario, acción y resultado.',
    ],
    watch_for:
      '`should create` no alcanza. Priorizá el contrato que rompería una regresión real y explicá qué dejarías para integración o E2E.',
    solution:
      'Primero identifico el contrato visible: carga inicial, render, acción principal, error y teclado. Doblo el servicio en su API pública y uso el DOM para comprobar la integración entre clase y template.',
    solution_code_title: 'team-list.component.ts',
    solution_code:
      '@Component({\n  standalone: true,\n  template: `\n    <h1>Equipo</h1>\n    @if (error()) {\n      <p role="alert">No pudimos cargar el equipo</p>\n      <button type="button" (click)="load()">Reintentar</button>\n    } @else {\n      <ul aria-label="Miembros del equipo">\n        @for (member of members(); track member.id) {\n          <li>{{ member.name }} — {{ member.role }}</li>\n        } @empty {\n          <li>No hay miembros</li>\n        }\n      </ul>\n    }\n  `\n})\nexport class TeamListComponent {\n  private readonly api = inject(TeamApi);\n  readonly members = signal<readonly Member[]>([]);\n  readonly error = signal(false);\n\n  constructor() { this.load(); }\n\n  load(): void {\n    this.error.set(false);\n    this.api.list().subscribe({\n      next: members => this.members.set(members),\n      error: () => this.error.set(true)\n    });\n  }\n}',
    test_code_title: 'team-list.component.spec.ts',
    test_code:
      "describe('TeamListComponent', () => {\n  const response$ = new Subject<readonly Member[]>();\n\n  beforeEach(() => TestBed.configureTestingModule({\n    providers: [{ provide: TeamApi, useValue: { list: vi.fn(() => response$) } }]\n  }));\n\n  it('renders members returned by the public service contract', () => {\n    const fixture = TestBed.createComponent(TeamListComponent);\n    response$.next([{ id: '1', name: 'Ada', role: 'Lead' }]);\n    fixture.detectChanges();\n\n    expect(fixture.nativeElement.querySelector(\n      'ul[aria-label=\"Miembros del equipo\"]'\n    )).not.toBeNull();\n    expect(fixture.nativeElement.textContent).toContain('Ada — Lead');\n  });\n\n  it('shows an alert and retries after an error', () => {\n    const api = TestBed.inject(TeamApi) as { list: Mock };\n    api.list.mockReturnValueOnce(throwError(() => new Error('offline')))\n      .mockReturnValueOnce(of([]));\n    const fixture = TestBed.createComponent(TeamListComponent);\n    fixture.detectChanges();\n    expect(fixture.nativeElement.querySelector('[role=\"alert\"]')).not.toBeNull();\n\n    fixture.nativeElement.querySelector('button').click();\n    expect(api.list).toHaveBeenCalledTimes(2);\n  });\n});",
    decisions: [
      'Una prueba de clase pura sirve para lógica; una interacción del template necesita fixture y DOM.',
      'Mockeo `TeamApi`, no detalles internos del componente.',
      'Dejaría navegación real, backend y recorrido entre pantallas para integración o E2E.',
    ],
  },
  {
    id: 'accessible-table',
    priority: 'Diferenciador Senior',
    time: '45 min',
    title: 'Tabla accesible y performante',
    prompt:
      'Construí una tabla ordenable y paginada. Debe funcionar con teclado, anunciar cambios, conservar foco y evitar render innecesario con cientos de filas.',
    deliverables: [
      'Semántica nativa, botones reales y `aria-sort`.',
      'Identidad estable de filas y paginación remota defendida.',
      'Prueba de teclado y estrategia de medición.',
    ],
    watch_for:
      'No conviertas la tabla en una grilla ARIA sin necesidad. Virtual scroll puede entrar en tensión con la semántica y debe justificarse.',
    solution:
      'Uso una tabla HTML nativa y un botón dentro del encabezado ordenable. El `th` comunica `aria-sort`; un live region anuncia el resultado. La paginación remota limita datos y DOM sin romper la semántica.',
    solution_code_title: 'people-table.component.html',
    solution_code:
      '<table>\n  <caption>Personas del equipo</caption>\n  <thead>\n    <tr>\n      <th scope="col" [attr.aria-sort]="nameSort()">\n        <button type="button" (click)="sortByName()">\n          Nombre <span aria-hidden="true">{{ sortIcon() }}</span>\n        </button>\n      </th>\n      <th scope="col">Rol</th>\n    </tr>\n  </thead>\n  <tbody>\n    @for (person of page().items; track person.id; let index = $index) {\n      <tr [attr.data-person-id]="person.id">\n        <th scope="row">{{ person.name }}</th>\n        <td>{{ person.role }}</td>\n      </tr>\n    }\n  </tbody>\n</table>\n\n<nav aria-label="Paginación del equipo">\n  <button type="button" [disabled]="page().number === 1" (click)="previous()">\n    Anterior\n  </button>\n  <span>Página {{ page().number }} de {{ page().totalPages }}</span>\n  <button type="button" [disabled]="page().number === page().totalPages" (click)="next()">\n    Siguiente\n  </button>\n</nav>\n\n<p class="sr-only" aria-live="polite">{{ resultAnnouncement() }}</p>',
    test_code_title: 'people-table.component.spec.ts',
    test_code:
      "it('sorts from the keyboard and exposes the current direction', async () => {\n  const fixture = TestBed.createComponent(PeopleTableComponent);\n  fixture.detectChanges();\n  const header = fixture.nativeElement.querySelector('th[scope=\"col\"]');\n  const button = header.querySelector('button');\n\n  button.focus();\n  button.dispatchEvent(new KeyboardEvent('keydown', { key: 'Enter', bubbles: true }));\n  button.click();\n  fixture.detectChanges();\n\n  expect(document.activeElement).toBe(button);\n  expect(header.getAttribute('aria-sort')).toBe('ascending');\n});\n\nit('keeps row identity stable when a person changes', () => {\n  const fixture = TestBed.createComponent(PeopleTableComponent);\n  fixture.detectChanges();\n  const before = fixture.nativeElement.querySelector('[data-person-id=\"p1\"]');\n  fixture.componentInstance.rename('p1', 'Ada Lovelace');\n  fixture.detectChanges();\n  const after = fixture.nativeElement.querySelector('[data-person-id=\"p1\"]');\n  expect(after).toBe(before);\n});",
    decisions: [
      'No agrego roles ARIA cuando la semántica nativa ya expresa tabla, encabezados y botones.',
      'La paginación conserva foco en el control activado y anuncia página y cantidad de resultados.',
      'Con 100.000 filas prefiero paginación remota; virtual scroll se evalúa contra requisitos de lector de pantalla.',
    ],
  },
];

export const CODE_CHALLENGE_RUBRIC: readonly CodeChallengeRubricItem[] = [
  {
    label: 'Correctitud y casos límite',
    weight: '25%',
  },
  {
    label: 'Descomposición, tipos y legibilidad',
    weight: '20%',
  },
  {
    label: 'Tests y capacidad de verificar',
    weight: '20%',
  },
  {
    label: 'Angular, RxJS y plataforma',
    weight: '15%',
  },
  {
    label: 'Comunicación y manejo del tiempo',
    weight: '10%',
  },
  {
    label: 'Accesibilidad y performance',
    weight: '10%',
  },
];

export const CODE_CHALLENGE_MOCK: CodeChallengeMock = {
  title: 'Product Explorer',
  time: '75 minutos',
  brief:
    'Construí una feature standalone que consulta `/api/products`, permite buscar y filtrar, sincroniza la query con la URL y muestra estados idle, loading, error, empty y success.',
  requirements: [
    'Debounce de 300 ms y cancelación de la búsqueda anterior.',
    'Filtro por categoría y orden por precio o nombre.',
    'Retry manual; no reintentes automáticamente errores 4xx.',
    'Template accesible, navegación por teclado y `track` por id.',
    'Tests de debounce, carrera de respuestas, error y empty state.',
  ],
  timeline: [
    {
      time: '00–08',
      task: 'Preguntar, fijar supuestos y ordenar prioridades.',
    },
    {
      time: '08–18',
      task: 'Definir tipos, estados y frontera del API.',
    },
    {
      time: '18–45',
      task: 'Entregar el recorrido principal funcionando.',
    },
    {
      time: '45–58',
      task: 'Agregar error, empty, URL y accesibilidad.',
    },
    {
      time: '58–68',
      task: 'Escribir los tests de mayor riesgo.',
    },
    {
      time: '68–75',
      task: 'Refactor mínimo y explicar trade-offs pendientes.',
    },
  ],
  starter_code:
    "export type ProductSort = 'name' | 'price';\n\nexport interface ProductQuery {\n  search: string;\n  category: string | null;\n  sort: ProductSort;\n}\n\nexport type ProductState =\n  | { status: 'idle'; products: readonly Product[] }\n  | { status: 'loading'; products: readonly Product[] }\n  | { status: 'success'; products: readonly Product[] }\n  | { status: 'error'; products: readonly Product[]; message: string };\n\n// TODO: implementá ProductApi, el estado de la feature,\n// la sincronización con query params, el template y los tests.",
};

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
