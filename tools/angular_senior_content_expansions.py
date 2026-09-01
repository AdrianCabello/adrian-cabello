from __future__ import annotations

from collections.abc import Iterable


THEORY_PREPENDS: dict[str, list[str]] = {
    "2. Angular moderno y estrategia de versiones": [
        "Angular es un framework para construir aplicaciones web a partir de un árbol de componentes. Cada componente une una clase TypeScript, una plantilla, estilos y un host element. El router, la inyección de dependencias, forms y HttpClient completan la plataforma.",
        "`bootstrapApplication` crea el environment injector, instancia el componente raíz y conecta su host view al DOM. Desde esa raíz Angular recorre views, evalúa bindings y actualiza sólo las propiedades del DOM cuyo valor cambió.",
        "Una plantilla combina HTML con expresiones y bindings. `{{ value }}` interpola texto, `[property]` escribe una propiedad, `[attr.name]` escribe un atributo, `(event)` escucha un evento y `[(value)]` combina entrada y salida bajo un contrato de two-way binding.",
        "Angular compila las plantillas y conoce de antemano qué nodos y bindings debe crear. Change detection vuelve a evaluar esos bindings cuando una notificación marca una vista para comprobar; Signals permiten registrar dependencias reactivas precisas.",
    ],
    "3. TypeScript avanzado": [
        "TypeScript agrega un sistema de tipos estático sobre JavaScript. El compilador comprueba el programa y elimina los tipos al emitir JavaScript; por eso un tipo no valida datos que llegan en runtime.",
        "La inferencia deduce tipos a partir de valores y contexto. El tipado estructural considera compatibles dos valores cuando su forma satisface el contrato, aunque no compartan una clase o declaración nominal.",
        "Una unión expresa alternativas y el narrowing descarta posibilidades mediante `typeof`, `in`, `instanceof`, discriminantes o type guards. Un `switch` que entrega el caso restante a `never` detecta variantes nuevas durante la compilación.",
        "`interface` describe contratos extensibles y admite declaration merging. `type` también representa unions, tuplas, primitivas y tipos calculados. La capacidad que necesita el modelo decide la elección.",
    ],
    "4. Componentes, templates y composición": [
        "Cada componente renderiza dentro de un host element. La propiedad `host` de la metadata declara clases, atributos, propiedades y listeners del host en un solo lugar; una binding del consumidor puede colisionar con una binding del componente y Angular resuelve la prioridad según cuál sea estática o dinámica.",
        "`@let` declara un valor local que Angular mantiene actualizado. Una template reference variable como `#input` referencia un elemento, componente, directiva exportada o `TemplateRef`, y sólo existe dentro del scope de la view donde se declaró.",
        "`ng-container` agrupa bindings sin crear un nodo DOM. `ng-template` declara un fragmento que no se renderiza por sí solo; Angular lo representa con `TemplateRef` y puede instanciarlo mediante `NgTemplateOutlet` o `ViewContainerRef.createEmbeddedView`.",
        "`NgComponentOutlet` y `ViewContainerRef.createComponent` crean componentes conocidos en runtime. Los helpers `inputBinding`, `outputBinding` y `twoWayBinding` conectan su API al crearlos y evitan asignaciones o subscriptions manuales dispersas.",
    ],
    "5. Ciclo de vida y render hooks": [
        "Angular crea una instancia, asigna inputs, ejecuta el primer change detection, inicializa contenido y vista, y luego repite los hooks de check en cada recorrido. Cada hook corresponde a un punto concreto de ese proceso y no funciona como un evento genérico.",
        "Los hooks de render no se ejecutan durante SSR. `afterNextRender` sirve para una operación DOM posterior al próximo render y `afterEveryRender` para una integración que debe acompañar renders sucesivos; ambos requieren cleanup si crean recursos persistentes.",
    ],
    "6. Change detection, Signals y zoneless": [
        "Change detection recorre las views que Angular considera necesarias, evalúa sus bindings y compara el resultado con el valor anterior. Una notificación marca una view y sus ancestros para que el próximo recorrido incluya esa rama.",
        "OnPush puede saltar un subárbol limpio. Un input con referencia nueva, un evento manejado en la view, una lectura de signal que cambia, `AsyncPipe`, `setInput` o `markForCheck` vuelven a marcar trabajo.",
        "`linkedSignal` conserva un estado editable que se reinicia o adapta cuando cambia una dependencia. `resource` y `httpResource` modelan carga asíncrona reactiva; su conveniencia no reemplaza una política explícita de caché, invalidación y errores.",
    ],
    "7. Dependency Injection en profundidad": [
        "Dependency Injection separa la creación de una dependencia de su consumo. Angular busca un provider para un token, ejecuta su factory cuando corresponde y conserva la instancia según el injector que la posee.",
        "La resolución comienza en el injector asociado al nodo o environment actual y asciende por la jerarquía. Un provider de componente crea una instancia por subárbol; uno de ruta vive con ese entorno lazy; `providedIn: 'root'` comparte la instancia en la aplicación.",
        "`useClass`, `useValue`, `useFactory` y `useExisting` expresan distintas formas de producir un token. Los multi providers acumulan varios valores bajo el mismo token y sirven para pipelines extensibles.",
    ],
    "8. RxJS y concurrencia": [
        "Una subscription representa la ejecución y su teardown. `complete` y `error` cierran el contrato; `unsubscribe` lo termina desde el consumidor. El producer debe registrar cleanup para liberar timers, listeners, sockets o requests cancelables.",
        "La ubicación de `catchError` cambia el alcance del fallo. Dentro de un flattening operator recupera una operación interna y mantiene viva la fuente; afuera termina o reemplaza el flujo completo.",
        "`shareReplay` comparte una subscription y conserva emisiones para suscriptores tardíos. Antes de usarlo como caché hay que decidir tamaño de buffer, refCount, reset, errores, vida útil y aislamiento por usuario.",
    ],
    "9. Estado: local, servicios, Signals y NgRx": [
        "El estado pertenece al dueño más cercano que necesita escribirlo. Un componente resuelve estado efímero; un servicio de feature coordina varias vistas; un store formaliza eventos y efectos cuando muchas partes modifican el mismo dominio.",
        "Estado fuente y estado derivado deben estar separados. Signals `computed` y selectors calculan vistas del mismo dato; copiar el resultado a otra variable exige sincronización y permite inconsistencias.",
    ],
    "10. Routing y navegación": [
        "El Router compara la URL con un árbol de rutas, ejecuta redirects, guards y resolvers, activa componentes en outlets y conserva snapshots más streams de cambios. La navegación puede cancelarse o redirigirse antes de crear la vista.",
        "`loadComponent` y `loadChildren` crean fronteras lazy. Los providers declarados en una ruta pertenecen a su environment injector y permiten aislar servicios por feature.",
        "Component input binding puede llevar params, query params, datos estáticos y resolvers a inputs del componente. Esa API reduce subscriptions manuales, pero el nombre y la ausencia de cada valor siguen formando parte del contrato de ruta.",
    ],
    "11. Formularios complejos": [
        "Reactive Forms crea un árbol de controles en TypeScript. Cada control conserva valor, estado de validación, interacción y disabled; el grupo agrega los estados de sus hijos y emite cuando cambia el modelo.",
        "`updateOn: 'blur'` o `'submit'` reduce validaciones y requests durante escritura. Un validador de grupo compara campos relacionados y devuelve el error en el nivel que posee la regla.",
        "Un validador asíncrono debe completar y resolver carreras. Debounce, `switchMap` y una caché corta evitan requests innecesarias; la UI distingue `PENDING`, error de red y valor inválido.",
    ],
    "12. HTTP, APIs, errores y caché": [
        "`HttpRequest` y `HttpHeaders` son inmutables. Un interceptor usa `request.clone` para cambiar URL, headers, params o body y luego entrega la request al siguiente handler.",
        "Los interceptors funcionales se ejecutan en el orden de registro para la request y en orden inverso para la response. `HttpContextToken` permite activar políticas por request sin convertirlas en headers de red.",
        "`observe: 'events'` expone progreso, headers y respuesta final. El progreso de upload requiere un backend que lo soporte; fetch no informa progreso de subida del mismo modo que XHR.",
    ],
    "16. SSR, SSG, hidratación y rendering híbrido": [
        "La hidratación reutiliza el DOM producido por el servidor y conecta las views del cliente sin reconstruir la página. El HTML del servidor y el primer render del cliente deben producir la misma estructura.",
        "`Date.now`, `Math.random`, locale, datos privados y condiciones distintas entre servidor y navegador pueden crear mismatches. El servidor debe transferir el dato determinista o el cliente debe calcularlo después de hidratar.",
        "Incremental hydration conserva bloques `@defer` deshidratados hasta un trigger `hydrate on ...`. Event replay registra interacciones previas y las reproduce cuando la sección ya puede responder.",
    ],
    "17. Testing y estrategia de calidad": [
        "Un test útil prepara estado, ejecuta una acción observable y comprueba el resultado. Vitest aporta runner, assertions, spies y fake timers; TestBed agrega el entorno de inyección, compilación y render de Angular.",
        "Los component harnesses encapsulan la forma de operar un componente y permiten que los tests usen una API estable. RouterTestingHarness navega rutas reales dentro del test y verifica guards, params, resolvers y componentes activados.",
    ],
}


QA_EXPANSIONS: dict[str, list[tuple[str, str]]] = {
    "2. Angular moderno y estrategia de versiones": [
        ("¿Qué ocurre desde `bootstrapApplication` hasta ver el primer componente?", "Angular crea el environment injector con los providers de la aplicación, instancia el componente raíz, crea su host view y ejecuta el primer render. La plantilla compilada crea nodos, evalúa bindings y conecta listeners antes de que los cambios posteriores entren en change detection."),
        ("¿Interpolación, property binding o attribute binding?", "Interpolación produce texto. Property binding escribe una propiedad runtime del elemento o componente. Attribute binding escribe el atributo, por ejemplo ARIA o SVG. Elijo según el destino real del valor, no según una preferencia de sintaxis."),
        ("¿Cómo actualiza Angular el DOM?", "La plantilla compilada contiene instrucciones para cada binding. Durante change detection Angular evalúa la expresión, compara el resultado con el valor anterior y escribe sólo el destino que cambió. No vuelve a construir todo el HTML del componente."),
        ("¿Qué adoptarías primero al modernizar una aplicación antigua?", "Actualizo majors soportadas y estabilizo tests. Después reduzco NgModules con standalone, migro control flow y recién introduzco Signals o zoneless donde el modelo de estado lo justifique. Cada etapa conserva una forma de medir y revertir."),
    ],
    "3. TypeScript avanzado": [
        ("¿TypeScript valida una respuesta HTTP?", "No. Los tipos desaparecen al compilar y una assertion sólo cambia lo que cree el compilador. Valido el JSON con un schema o type guard en la frontera y recién entonces lo convierto al modelo interno."),
        ("¿Qué significa que TypeScript sea estructural?", "La compatibilidad depende de la forma del valor. Si un objeto posee las propiedades requeridas con tipos compatibles, puede satisfacer el contrato aunque provenga de otra declaración. Esto facilita composición, pero exige cuidado con exceso de propiedades y tipos demasiado amplios."),
        ("¿Cómo funciona un conditional type con `infer`?", "Un conditional type elige un resultado según una relación `T extends U`. `infer` declara una variable de tipo dentro del patrón: `type Result<T> = T extends Promise<infer R> ? R : T` extrae el valor resuelto de una Promise."),
        ("¿Cuándo usarías un mapped type?", "Cuando un contrato deriva de otro de forma mecánica. `type Flags<T> = { [K in keyof T]: boolean }` conserva las keys y cambia sus valores. Esto evita duplicar modelos que luego divergen."),
    ],
    "4. Componentes, templates y composición": [
        ("¿Property binding o attribute binding?", "Una property binding escribe en la propiedad runtime del elemento o componente, por ejemplo `[disabled]`. Una attribute binding escribe el atributo HTML con `[attr.aria-expanded]`. Uso atributos para ARIA, SVG o metadata sin una propiedad DOM equivalente."),
        ("¿Qué representa una template reference variable?", "Depende del nodo: en un elemento nativo referencia el HTMLElement, en un componente su instancia, con `exportAs` una directiva y sobre `ng-template` un TemplateRef. Su scope pertenece a la view que la declara."),
        ("¿Por qué `ng-template` no aparece en el DOM?", "Declara una receta de view. Angular sólo crea sus nodos cuando una directiva, `NgTemplateOutlet` o `ViewContainerRef` instancia su TemplateRef. Esto permite repetir el fragmento y pasarle contexto."),
        ("¿Cómo crearías un componente dinámico con bindings?", "Uso `ViewContainerRef.createComponent` si debe formar parte de esa view y paso `bindings` con `inputBinding`, `outputBinding` o `twoWayBinding`. Para un caso declarativo puedo usar `NgComponentOutlet`; para lazy loading visual prefiero evaluar `@defer`."),
    ],
    "5. Ciclo de vida y render hooks": [
        ("¿En qué orden corre la primera inicialización?", "Angular asigna inputs, ejecuta `ngOnChanges`, `ngOnInit`, hooks de content, hooks de view y completa el render. Los hooks `Checked` vuelven a correr en recorridos posteriores; los `Init` corren una vez."),
        ("¿`afterNextRender` funciona durante SSR?", "No. Los render callbacks dependen del navegador. Los uso para medir o integrar DOM después del render y mantengo el camino SSR libre de esa API."),
        ("¿Cuándo usarías `ngOnChanges` frente a `computed`?", "`ngOnChanges` sirve cuando necesito comparar cambios de inputs o ejecutar una adaptación imperativa. Un `computed` expresa mejor una derivación pura de signal inputs porque mantiene la relación sin sincronización manual."),
        ("¿Por qué un `setTimeout` puede esconder un ExpressionChanged?", "Mueve la mutación a otra task y evita la comprobación actual, pero conserva un flujo de datos mal ubicado. Corrijo quién posee el estado o muevo el trabajo al hook y fase adecuados."),
    ],
    "6. Change detection, Signals y zoneless": [
        ("¿Qué marca una view OnPush como dirty?", "Una referencia nueva en un input, un evento manejado dentro de la view, un signal leído por la plantilla que cambia, AsyncPipe, `setInput` o `markForCheck`. Una mutación interna de un objeto sin notificación conserva la misma referencia y puede dejar la UI vieja."),
        ("¿`markForCheck` o `detectChanges`?", "`markForCheck` agenda la view para el próximo recorrido y mantiene el flujo normal. `detectChanges` ejecuta una comprobación inmediata de esa view y sus hijos; lo reservo para integraciones controladas porque puede introducir trabajo y orden inesperados."),
        ("¿Qué resuelve `linkedSignal`?", "Modela un estado editable que depende de otra señal y necesita reajustarse cuando cambia esa fuente, como una selección que debe seguir siendo válida al reemplazar la lista. Evita un effect dedicado a copiar y corregir estado."),
        ("¿Cómo investigás demasiados renders?", "Grabo una interacción con Angular DevTools y el Performance panel, identifico qué notificación marcó la rama y reviso referencias, funciones de template y efectos. Cambio una causa y vuelvo a medir scripting e INP."),
    ],
    "7. Dependency Injection en profundidad": [
        ("¿Cómo busca Angular un provider?", "Empieza en el injector del contexto actual, consulta providers del nodo y environment, y asciende hasta encontrar el token. Los modificadores de resolución cambian ese recorrido; si ningún provider existe y no es optional, Angular lanza un error."),
        ("¿Provider de componente o de ruta?", "El provider de componente crea una instancia asociada a ese subárbol y se destruye con él. El provider de ruta comparte estado entre componentes de la feature lazy y vive con su environment injector."),
        ("¿Para qué sirve un multi provider?", "Permite que varias partes registren valores bajo el mismo token y que el consumidor reciba un array. Lo uso para plugins, validadores o pipelines extensibles donde cada feature aporta una implementación."),
        ("¿Qué riesgo tiene `providedIn: 'root'`?", "Convierte el servicio en singleton de aplicación. Si guarda estado de pantalla o usuario sin una política de reset, puede mezclar ciclos de navegación y sesiones. El scope debe coincidir con la vida útil del dato."),
    ],
    "8. RxJS y concurrencia": [
        ("¿Dónde colocás `catchError` dentro de `switchMap`?", "Dentro si cada request puede fallar y la fuente debe seguir escuchando búsquedas. Fuera si cualquier error termina o reemplaza el flujo completo. La posición determina qué subscription se cierra."),
        ("¿Qué debe hacer el teardown de un Observable?", "Detiene el recurso creado por esa suscripción: remueve listeners, limpia timers, cierra sockets o aborta I/O compatible. También debe tolerar llamadas repetidas sin producir efectos inválidos."),
        ("¿Cuándo `shareReplay(1)` puede producir un leak?", "Cuando mantiene la fuente suscripta después de irse el último consumidor o conserva un valor pesado sin política de reset. Configuro `refCount` y resets según si necesito una caché persistente o sólo compartir consumidores simultáneos."),
        ("¿Cómo elegir entre los cuatro flattening operators?", "Elijo la política de concurrencia: `switchMap` reemplaza, `concatMap` encola, `mergeMap` permite paralelismo y `exhaustMap` ignora nuevas entradas mientras una sigue activa. La semántica del negocio decide cuál pérdida u orden resulta válido."),
    ],
    "9. Estado: local, servicios, Signals y NgRx": [
        ("¿Cuándo un servicio con Signals deja de alcanzar?", "Cuando varias features escriben el mismo dominio, necesito historial claro de eventos, efectos coordinados, herramientas de inspección o reglas consistentes de actualización. En ese punto un store formal reduce caminos implícitos."),
        ("¿Qué es estado derivado?", "Es un valor calculable desde estado fuente, como el total de un carrito. Lo expreso con `computed` o un selector y no lo guardo por separado, porque dos copias pueden divergir."),
        ("¿Cómo modelás una optimistic update?", "Aplico un cambio local con un identificador de operación, envío la request y confirmo o revierto según el resultado. Resuelvo concurrencia, duplicados y mensajes de error sin perder una edición posterior."),
        ("¿Qué pondrías en el store global?", "Estado de dominio compartido cuya vida cruza rutas y necesita coordinación. Estados de foco, accordion o formulario temporal permanecen cerca del componente salvo que otra parte de la aplicación deba controlarlos."),
    ],
    "10. Routing y navegación": [
        ("¿En qué orden intervienen guards y resolvers?", "Angular reconoce la ruta, evalúa guards y, si permiten continuar, ejecuta resolvers antes de activar el componente. Un redirect o cancelación corta la navegación; los errores necesitan una política de navegación o error handler."),
        ("¿Un guard protege datos?", "No. Controla la navegación del cliente y mejora la experiencia. La API debe autenticar y autorizar cada operación porque un usuario puede llamar el endpoint sin pasar por el Router."),
        ("¿Cuándo usarías un resolver?", "Cuando la ruta no tiene sentido sin un dato pequeño y crítico o necesito decidir antes de activarla. Para contenido secundario prefiero cargar dentro de la vista y mostrar estados parciales, porque un resolver largo retrasa toda la navegación."),
        ("¿Cómo probás el Router?", "Uso RouterTestingHarness con rutas reales, navego una URL y compruebo componente, redirects y estado visible. Tests aislados cubren la lógica de guards o resolvers y los de integración cubren el orden de navegación."),
    ],
    "11. Formularios complejos": [
        ("¿Dónde ubicarías una validación entre dos campos?", "En el FormGroup que posee ambos controles. El validador devuelve un error del grupo y la presentación decide en qué campos anunciarlo sin mutar errores ajenos."),
        ("¿Qué cambia con `updateOn: 'blur'`?", "El control actualiza valor y validación al perder foco. Reduce trabajo y requests mientras se escribe, pero cambia cuándo valueChanges emite y cuándo la UI puede mostrar el resultado."),
        ("¿Cómo tipás un FormArray?", "Declaro el tipo del control repetido, por ejemplo `FormArray<FormGroup<AddressControls>>`. El tipo describe controles, mientras `getRawValue` produce el valor incluyendo controles disabled."),
        ("¿Cómo enfocás el primer error al enviar?", "Marco controles como touched, localizo el primer elemento inválido siguiendo el orden visual, lo enfoco y conecto el mensaje con `aria-describedby`. Un resumen de errores puede enlazar cada campo en formularios largos."),
    ],
    "12. HTTP, APIs, errores y caché": [
        ("¿Por qué una request de HttpClient se clona?", "HttpRequest es inmutable. `clone` crea una request con los cambios y conserva el objeto original para que la cadena de interceptors pueda razonar sin mutaciones compartidas."),
        ("¿En qué orden corren los interceptors?", "La request atraviesa la lista en el orden de registro. La response vuelve por la cadena en orden inverso, como capas anidadas. El orden afecta auth, cache, retry, loaders y telemetría."),
        ("¿Para qué sirve HttpContext?", "Transporta configuración local dentro del pipeline sin enviarla al servidor. Un interceptor puede leer un HttpContextToken para omitir auth, activar cache o cambiar tratamiento de errores para una request concreta."),
        ("¿Cómo evitás dos refresh de token simultáneos?", "Comparto una única operación de refresh mientras esté activa, encolo o reintento las requests originales después del nuevo token y limpio el estado al terminar. Si el refresh falla, cierro sesión una sola vez."),
    ],
    "16. SSR, SSG, hidratación y rendering híbrido": [
        ("¿Qué produce un hydration mismatch?", "El servidor y el primer render del cliente generan estructuras diferentes. Fechas, random, locale, acceso temprano al DOM o condiciones browser-only son causas comunes. Transfiero datos deterministas y pospongo efectos de navegador hasta después de hidratar."),
        ("¿Qué hace event replay?", "Captura interacciones que ocurren sobre HTML SSR antes de que Angular conecte listeners y las reproduce al terminar la hidratación correspondiente. Evita que un click temprano parezca perdido."),
        ("¿Qué diferencia full e incremental hydration?", "Full hydration activa la aplicación completa. Incremental hydration conserva límites `@defer` deshidratados y los activa por triggers como viewport o interaction, reduciendo JavaScript inicial a cambio de más estados y decisiones de carga."),
        ("¿Por qué evitarías cambiar el árbol con `isPlatformBrowser`?", "La condición puede hacer que servidor y cliente creen nodos distintos durante la hidratación. Mantengo la misma estructura y ejecuto sólo la integración browser después del render, o excluyo de hidratación un caso aislado como último recurso."),
    ],
    "17. Testing y estrategia de calidad": [
        ("¿Qué aporta Vitest y qué aporta TestBed?", "Vitest ejecuta suites, assertions, spies y timers. TestBed crea el entorno Angular de providers, componentes y change detection. Un servicio puro puede no necesitar TestBed; un componente con DI y template sí suele beneficiarse."),
        ("¿Cuándo usarías un component harness?", "Cuando varias pruebas o consumidores necesitan operar un componente complejo sin depender de su DOM interno. El harness ofrece acciones y consultas estables y reduce roturas por cambios de markup."),
        ("¿Cómo probás debounce y retry?", "Uso fake timers o el scheduler virtual, avanzo el reloj de forma explícita y compruebo emisiones, cancelaciones y número de intentos. El test no espera tiempo real ni depende de la velocidad de la máquina."),
        ("¿Qué debe verificar un test de HttpClient?", "Método, URL, params, headers y body que forman parte del contrato; luego responde con éxito o error y comprueba el resultado visible. `verify()` asegura que no quedaron requests sin resolver."),
    ],
    "13. Arquitectura de aplicaciones Angular": [
        ("¿Cómo evitás que una feature dependa de detalles de otra?", "Expongo una public API pequeña y contratos de dominio. La feature consumidora no importa componentes internos, stores privados ni rutas de archivos profundas; se comunica mediante servicios, eventos o modelos publicados."),
        ("¿Cuándo una capa facade agrega valor?", "Cuando concentra varios stores o servicios, traduce modelos y ofrece casos de uso estables a la UI. Si sólo reenvía cada método con el mismo nombre y tipo, agrega navegación sin reducir acoplamiento."),
    ],
    "14. Patrones, SOLID y calidad de diseño": [
        ("¿Cómo aplicarías Strategy en Angular?", "Defino un contrato para la operación, registro implementaciones mediante DI y selecciono la estrategia por configuración o contexto. El consumidor conoce la capacidad, mientras cada algoritmo conserva tests y dependencias propias."),
        ("¿Qué señal indica que una abstracción llegó demasiado pronto?", "La interfaz tiene una sola implementación, replica todos sus métodos y cambia junto con el detalle. Espero casos de variación concretos y extraigo la frontera que esos casos comparten."),
    ],
    "15. Rendimiento y Core Web Vitals": [
        ("¿Cómo investigarías un INP alto?", "Reproduzco la interacción con Performance panel y RUM, localizo long tasks y separo scripting, style, layout y paint. Después reduzco trabajo de la ruta crítica, divido CPU o limita renders y vuelvo a medir en dispositivos reales."),
        ("¿Cuándo virtual scroll no alcanza?", "Virtual scroll reduce nodos DOM, pero no reduce datos descargados, filtros costosos ni memoria del modelo completo. Con cientos de miles de filas combino paginación server-side, consultas remotas y una ventana visible accesible."),
    ],
    "18. Seguridad web en Angular": [
        ("¿Cómo mostrarías HTML proporcionado por usuarios?", "Lo sanitizo con una política y librería adecuada en el servidor o una frontera auditada, conservo CSP y evito `bypassSecurityTrustHtml`. Si el producto admite un subconjunto, permito sólo tags y atributos explícitos."),
        ("¿Dónde guardarías un token de sesión?", "Depende del modelo de amenazas. Una cookie HttpOnly reduce robo directo por XSS y requiere protección CSRF; memoria evita persistencia pero se pierde al recargar. No presento localStorage como opción segura por defecto para credenciales de larga vida."),
    ],
    "19. Accesibilidad, HTML y CSS": [
        ("¿Cómo probarías un modal accesible?", "Lo abro sólo con teclado, compruebo nombre accesible, foco inicial, ciclo de Tab, Escape y retorno del foco. Después valido el fondo inerte y escucho el flujo con VoiceOver o NVDA."),
        ("¿Cuándo usarías una live region?", "Para anunciar un cambio asíncrono relevante que no recibe foco, como un resultado guardado o un error remoto. Evito anunciar cada pulsación o cambio visual porque interrumpe y satura al lector de pantalla."),
    ],
    "20. Build, CI/CD, configuración y upgrades": [
        ("¿Cómo diseñás un rollback de frontend?", "Conservo artefactos inmutables por release, mantengo compatibilidad temporal con la API y puedo volver a apuntar el hosting al build anterior. Base de datos y contratos nuevos necesitan una estrategia forward-compatible para que el bundle viejo siga funcionando."),
        ("¿Qué presupuesto pondrías en CI?", "Límites de bundle inicial y chunks críticos, typecheck, tests y métricas del recorrido principal. Un presupuesto debe fallar cerca de la causa y tener owner; una cifra ignorada en cada pipeline no protege rendimiento."),
    ],
    "21. Observabilidad, errores y debugging": [
        ("¿Cómo distinguís un error del frontend de uno de API?", "Relaciono el evento del navegador con request, status, correlation ID y trace del backend. Si la API respondió bien, reviso parsing y render; si falló, el mismo identificador permite seguir la operación por gateway y servicio."),
        ("¿Qué datos evitarías enviar a telemetría?", "Tokens, passwords, bodies sensibles, datos personales sin necesidad y HTML completo. Defino una allowlist, anonimizo identificadores y aplico sampling y retención según el propósito operativo."),
    ],
    "22. System design frontend": [
        ("¿Cómo diseñarías datos en tiempo real sin saturar la UI?", "Defino frecuencia útil por widget, agrupo eventos, deduplico por versión y aplico backpressure. Pauso consumidores fuera del viewport y separo el ritmo de recepción del ritmo de render."),
        ("¿Qué incluirías en una propuesta de system design además del diagrama?", "Contratos de datos, ownership, estrategia de caché, errores, seguridad, accesibilidad, métricas y rollout. También dejo umbrales que indiquen cuándo la primera solución necesita otra arquitectura."),
    ],
    "23. Liderazgo técnico y trabajo en equipo": [
        ("¿Cómo resolvés un desacuerdo de arquitectura?", "Acordamos objetivo y restricciones, escribimos alternativas con el mismo criterio y ejecutamos un spike si la incertidumbre lo requiere. La decisión queda registrada con consecuencias y fecha de revisión."),
        ("¿Cómo elevás la calidad sin convertirte en cuello de botella?", "Automatizo reglas repetibles, documento ejemplos y distribuyo ownership. En reviews explico el criterio y permito que otras personas tomen decisiones con límites claros."),
    ],
    "24. Preparación personal y respuestas conductuales": [
        ("¿Cómo respondés sobre un conflicto técnico?", "Describo la restricción, la posición de cada parte y cómo llevé la discusión a evidencia. Explico la decisión final, mi contribución y qué cambió en el producto o en la forma de trabajar."),
        ("¿Cómo hablás de un proyecto sin métricas históricas?", "Uso señales verificables como incidentes, tiempo de entrega, defectos o feedback, y aclaro qué no se midió. Cierro con la métrica que instrumentaría hoy en lugar de inventar un número."),
    ],
}


CODE_EXAMPLES: dict[str, str] = {
    "2. Angular moderno y estrategia de versiones": """bootstrapApplication(AppComponent, {
  providers: [provideRouter(routes), provideHttpClient()],
});

@Component({
  selector: 'app-root',
  template: `
    <button [disabled]=\"saving()\" (click)=\"save()\">
      {{ saving() ? 'Guardando…' : 'Guardar' }}
    </button>
  `,
})
export class AppComponent {
  saving = signal(false);
}""",
    "4. Componentes, templates y composición": """@Component({
  selector: 'user-picker',
  host: { '[class.disabled]': 'disabled()' },
  template: `
    @let selected = selectedUser();
    <button #trigger (click)=\"open.set(true)\">{{ selected?.name ?? 'Elegir' }}</button>
    <ng-template #row let-user>
      <button (click)=\"select(user)\">{{ user.name }}</button>
    </ng-template>
  `,
})
export class UserPicker {
  disabled = input(false);
  selectedUser = model<User | null>(null);
  open = signal(false);
}""",
    "6. Change detection, Signals y zoneless": """readonly products = input.required<readonly Product[]>();
readonly selectedId = linkedSignal(() => this.products()[0]?.id ?? null);
readonly selected = computed(() =>
  this.products().find(product => product.id === this.selectedId()) ?? null
);""",
    "7. Dependency Injection en profundidad": """export const ANALYTICS = new InjectionToken<Analytics>('analytics');

export const appConfig: ApplicationConfig = {
  providers: [
    { provide: ANALYTICS, useClass: BrowserAnalytics },
    { provide: HTTP_INTERCEPTORS, useClass: AuditInterceptor, multi: true },
  ],
};""",
    "8. RxJS y concurrencia": """const results$ = query$.pipe(
  debounceTime(250),
  distinctUntilChanged(),
  switchMap(query =>
    http.get<Result[]>('/api/search', { params: { query } }).pipe(
      catchError(error => of({ error, items: [] }))
    )
  ),
  shareReplay({ bufferSize: 1, refCount: true })
);""",
    "10. Routing y navegación": """export const routes: Routes = [{
  path: 'users/:id',
  loadComponent: () => import('./user.page').then(m => m.UserPage),
  canActivate: [authGuard],
  resolve: { user: userResolver },
  providers: [UserFeatureStore],
}];""",
    "11. Formularios complejos": """readonly form = new FormGroup({
  email: new FormControl('', {
    nonNullable: true,
    validators: [Validators.required, Validators.email],
    asyncValidators: [uniqueEmailValidator(this.http)],
    updateOn: 'blur',
  }),
  addresses: new FormArray<FormGroup<AddressControls>>([]),
});""",
    "12. HTTP, APIs, errores y caché": """export const authInterceptor: HttpInterceptorFn = (request, next) => {
  const token = inject(AuthStore).token();
  const authenticated = request.clone({
    setHeaders: { Authorization: `Bearer ${token}` },
  });
  return next(authenticated);
};""",
    "16. SSR, SSG, hidratación y rendering híbrido": """bootstrapApplication(AppComponent, {
  providers: [provideClientHydration()],
});

// La estructura renderizada debe coincidir en servidor y cliente.
@defer (on viewport; hydrate on interaction) {
  <reviews-panel />
} @placeholder {
  <reviews-skeleton />
}""",
    "17. Testing y estrategia de calidad": """it('shows the resolved user', async () => {
  const harness = await RouterTestingHarness.create('/users/7');
  const request = http.expectOne('/api/users/7');
  request.flush({ id: 7, name: 'Ada' });
  await harness.fixture.whenStable();
  expect(harness.routeNativeElement?.textContent).toContain('Ada');
});""",
}


def apply_content_expansions(chapters: Iterable[dict]) -> None:
    for chapter in chapters:
        title = chapter["title"]
        if title in THEORY_PREPENDS:
            chapter["master"] = [*THEORY_PREPENDS[title], *chapter["master"]]
        if title in QA_EXPANSIONS:
            existing = {question for question, _ in chapter["qa"]}
            chapter["qa"].extend(
                pair for pair in QA_EXPANSIONS[title] if pair[0] not in existing
            )
        if title in CODE_EXAMPLES and not chapter.get("code"):
            chapter["code"] = CODE_EXAMPLES[title]

        if title == "2. Angular moderno y estrategia de versiones":
            chapter["title"] = "2. Angular: fundamentos, renderizado y versiones"
            chapter["intro"] = (
                "Angular organiza la aplicación como un árbol de componentes, compila templates, "
                "inyecta dependencias y actualiza el DOM mediante change detection. Desde esa base "
                "se entienden standalone, Signals, zoneless y las migraciones entre versiones."
            )
