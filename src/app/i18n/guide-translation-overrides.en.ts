export const GUIDE_ENGLISH_TRANSLATION_OVERRIDES: Readonly<
  Record<string, string>
> = {
  temas: 'topics',
  tema: 'topic',
  'Angular moderno': 'Modern Angular',
  'Criterio Senior': 'Senior judgment',
  'TypeScript avanzado': 'Advanced TypeScript',
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
  'Banco rápido': 'Quick-fire questions',
  'Abrir tema': 'Open topic',
  'Cerrar tema': 'Collapse topic',
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
};
