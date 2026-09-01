from __future__ import annotations

import json
import re
import unicodedata
from pathlib import Path

from build_angular_senior_guide import (
    chapters,
    foundation_chapters,
    foundation_rapid_fire,
    rapid_fire,
)


ROOT = Path(__file__).resolve().parents[1]
OUTPUT = ROOT / "src/app/pages/angular-senior-guide/angular-senior-guide.data.ts"


GROUPS = [
    {
        "id": "fundamentos-web",
        "index": "01",
        "title": "Fundamentos web",
        "description": "HTML, CSS, JavaScript y TypeScript, desde la base hasta preguntas avanzadas.",
    },
    {
        "id": "angular-core",
        "index": "02",
        "title": "Angular moderno",
        "description": "Componentes, reactividad, DI, RxJS, routing, forms y HTTP.",
    },
    {
        "id": "arquitectura",
        "index": "03",
        "title": "Plataforma y arquitectura",
        "description": "Browser, DOM, red, límites, patrones, SOLID y evolución del código.",
    },
    {
        "id": "calidad-operacion",
        "index": "04",
        "title": "Calidad y operación",
        "description": "Performance, rendering, testing, seguridad, CI/CD y observabilidad.",
    },
    {
        "id": "criterio-senior",
        "index": "05",
        "title": "Criterio Senior",
        "description": "System design, liderazgo y conversaciones de entrevista.",
    },
]


PRACTICE_CASES = [
    {
        "title": "Buscador cancelable",
        "brief": "Construí un buscador con debounce, cancelación, estados loading/error/empty, caché por query y tests con tiempo controlado. Explicá por qué elegiste switchMap y qué cambia si el endpoint no soporta cancelación.",
    },
    {
        "title": "Motor de formularios dinámicos",
        "brief": "Diseñá un schema para tipos, validación, layout, visibilidad y permisos. Sumá un CVA, validación asíncrona, persistencia parcial y una estrategia de versionado del schema.",
    },
    {
        "title": "Dashboard en tiempo real",
        "brief": "Diseñá seis widgets con frecuencias distintas. Incluí WebSocket o SSE, reconexión, backpressure, pausa fuera del viewport, caché, permisos y métricas de INP.",
    },
    {
        "title": "Migración entre cinco versiones mayores",
        "brief": "Proponé etapas para actualizar majors, convertir features a standalone, introducir control flow, Signals y zoneless. Definí pruebas, métricas, feature flags y rollback.",
    },
    {
        "title": "Lista de 100.000 filas",
        "brief": "Compará paginación server-side, virtual scroll, filtros remotos y caché. Medí memoria, scripting, layout e interacción sin perder navegación por teclado ni soporte de lector de pantalla.",
    },
    {
        "title": "Carrera de refresh de autenticación",
        "brief": "Varias requests reciben 401 al mismo tiempo. Diseñá un refresh único, cola, cancelación, logout seguro, telemetría y tests deterministas de concurrencia.",
    },
    {
        "title": "Event loop",
        "brief": "Predecí el orden de logs que mezclen Promises, queueMicrotask, timers, async/await y eventos. Verificá el resultado en navegador y justificá cada transición entre colas.",
    },
    {
        "title": "Tabla accesible",
        "brief": "Construí una tabla ordenable y paginada con caption, headers, estados de orden, teclado, foco, loading y empty state. Validala con lector de pantalla.",
    },
    {
        "title": "Layout responsive sin CLS",
        "brief": "Implementá una card que cambie con container queries, respete reduced motion y no produzca saltos. Explicá cascade, stacking contexts, overflow y containment.",
    },
    {
        "title": "Caché offline",
        "brief": "Diseñá caché HTTP, IndexedDB y Service Worker para una pantalla de lectura. Definí invalidación, conflictos, cuotas, logout y tratamiento de datos sensibles.",
    },
]


REFERENCES = [
    {"label": "Angular · Releases", "url": "https://angular.dev/reference/releases"},
    {"label": "Angular · Signals", "url": "https://angular.dev/guide/signals"},
    {"label": "Angular · Zoneless", "url": "https://angular.dev/guide/zoneless"},
    {"label": "Angular · Control flow", "url": "https://angular.dev/guide/templates/control-flow"},
    {"label": "Angular · Rendering strategies", "url": "https://angular.dev/guide/routing/rendering-strategies"},
    {"label": "Angular · Testing", "url": "https://angular.dev/guide/testing"},
    {"label": "Angular · Security", "url": "https://angular.dev/best-practices/security"},
    {"label": "MDN · Web platform", "url": "https://developer.mozilla.org/"},
]


TOPIC_REFERENCES: dict[str, list[dict[str, str]]] = {
    "HTML completo: semántica, formularios, medios y SEO": [
        {"label": "MDN · HTML", "url": "https://developer.mozilla.org/docs/Web/HTML"},
    ],
    "CSS completo: cascade, layout, responsive y rendimiento": [
        {"label": "MDN · CSS", "url": "https://developer.mozilla.org/docs/Web/CSS"},
    ],
    "JavaScript: tipos, coerción, scope y funciones": [
        {"label": "MDN · JavaScript", "url": "https://developer.mozilla.org/docs/Web/JavaScript"},
    ],
    "JavaScript: objetos, prototipos, arrays y programación funcional": [
        {"label": "MDN · JavaScript objects", "url": "https://developer.mozilla.org/docs/Web/JavaScript/Guide/Working_with_objects"},
    ],
    "JavaScript asíncrono: event loop, Promises y errores": [
        {"label": "MDN · Asynchronous JavaScript", "url": "https://developer.mozilla.org/docs/Learn_web_development/Extensions/Async_JS"},
        {"label": "RxJS · Observable", "url": "https://rxjs.dev/guide/observable"},
    ],
    "TypeScript avanzado": [
        {"label": "TypeScript · Handbook", "url": "https://www.typescriptlang.org/docs/handbook/intro.html"},
    ],
    "Angular: fundamentos, renderizado y versiones": [
        {"label": "Angular · Essentials", "url": "https://angular.dev/essentials"},
        {"label": "Angular · Releases", "url": "https://angular.dev/reference/releases"},
    ],
    "Componentes, templates y composición": [
        {"label": "Angular · Templates", "url": "https://angular.dev/guide/templates"},
        {"label": "Angular · Programmatic rendering", "url": "https://angular.dev/guide/components/programmatic-rendering"},
    ],
    "Ciclo de vida y render hooks": [
        {"label": "Angular · Lifecycle", "url": "https://angular.dev/guide/components/lifecycle"},
    ],
    "Change detection, Signals y zoneless": [
        {"label": "Angular · Signals", "url": "https://angular.dev/guide/signals"},
        {"label": "Angular · Zoneless", "url": "https://angular.dev/guide/zoneless"},
    ],
    "Dependency Injection en profundidad": [
        {"label": "Angular · Dependency Injection", "url": "https://angular.dev/guide/di"},
    ],
    "RxJS y concurrencia": [
        {"label": "RxJS · Operator decision tree", "url": "https://rxjs.dev/operator-decision-tree"},
    ],
    "Estado: local, servicios, Signals y NgRx": [
        {"label": "Angular · Signals", "url": "https://angular.dev/guide/signals"},
        {"label": "NgRx · Guide", "url": "https://ngrx.io/guide/store"},
    ],
    "Routing y navegación": [
        {"label": "Angular · Routing", "url": "https://angular.dev/guide/routing"},
    ],
    "Formularios complejos": [
        {"label": "Angular · Forms", "url": "https://angular.dev/guide/forms"},
    ],
    "HTTP, APIs, errores y caché": [
        {"label": "Angular · HTTP", "url": "https://angular.dev/guide/http"},
    ],
    "Rendimiento y Core Web Vitals": [
        {"label": "web.dev · Web Vitals", "url": "https://web.dev/articles/vitals"},
    ],
    "SSR, SSG, hidratación y rendering híbrido": [
        {"label": "Angular · SSR", "url": "https://angular.dev/guide/ssr"},
        {"label": "Angular · Hydration", "url": "https://angular.dev/guide/hydration"},
    ],
    "Testing y estrategia de calidad": [
        {"label": "Angular · Testing", "url": "https://angular.dev/guide/testing"},
    ],
    "Seguridad web en Angular": [
        {"label": "Angular · Security", "url": "https://angular.dev/best-practices/security"},
        {"label": "OWASP · Cheat sheets", "url": "https://cheatsheetseries.owasp.org/"},
    ],
    "Accesibilidad, HTML y CSS": [
        {"label": "WAI · ARIA Practices", "url": "https://www.w3.org/WAI/ARIA/apg/"},
    ],
}


GROUP_REFERENCES: dict[str, list[dict[str, str]]] = {
    "fundamentos-web": [
        {"label": "MDN · Web platform", "url": "https://developer.mozilla.org/"},
    ],
    "angular-core": [
        {"label": "Angular · Documentation", "url": "https://angular.dev/overview"},
    ],
    "arquitectura": [
        {"label": "Angular · Style guide", "url": "https://angular.dev/style-guide"},
    ],
    "calidad-operacion": [
        {"label": "web.dev · Learn performance", "url": "https://web.dev/learn/performance"},
    ],
    "criterio-senior": [
        {"label": "Google · Engineering practices", "url": "https://google.github.io/eng-practices/"},
    ],
}


CUSTOM_SECTION_TITLES: dict[str, list[str]] = {
    "HTML completo: semántica, formularios, medios y SEO": ["Documento y semántica", "Formularios y contenido", "Carga, SEO y accesibilidad"],
    "CSS completo: cascade, layout, responsive y rendimiento": ["Cascada y box model", "Layout y responsive", "Composición y rendimiento"],
    "JavaScript: tipos, coerción, scope y funciones": ["Tipos y conversiones", "Scope, hoisting y closures", "Funciones, this y decisiones"],
    "JavaScript asíncrono: event loop, Promises y errores": ["Modelo de ejecución", "Promise y async/await", "Observable y streams", "Cancelación, errores y rendimiento"],
    "TypeScript avanzado": ["Sistema de tipos", "Narrowing y modelado", "Tipos calculados y generics", "Runtime y configuración"],
    "Angular: fundamentos, renderizado y versiones": ["Modelo de Angular", "Templates y actualización del DOM", "Angular moderno", "Versiones y migraciones"],
    "Componentes, templates y composición": ["Contrato del componente", "Templates y fragmentos", "Composición y render dinámico", "Rendimiento del template"],
    "Change detection, Signals y zoneless": ["Recorrido y notificaciones", "Signals y estado derivado", "OnPush y zoneless", "Diagnóstico y rendimiento"],
    "RxJS y concurrencia": ["Contrato Observable", "Operadores y concurrencia", "Errores y teardown", "Sharing y caché"],
}


def build_theory_sections(title: str, items: list[str], group_id: str) -> list[dict]:
    labels = CUSTOM_SECTION_TITLES.get(title)
    if labels is None:
        labels = (
            ["Modelo mental", "Funcionamiento y APIs", "Decisiones, riesgos y verificación"]
            if group_id == "angular-core"
            else ["Fundamentos", "Mecanismo y aplicación", "Decisiones y límites"]
        )
    section_count = min(len(labels), max(1, len(items)))
    base, extra = divmod(len(items), section_count)
    sections = []
    cursor = 0
    for index in range(section_count):
        size = base + (1 if index < extra else 0)
        sections.append({"title": labels[index], "items": items[cursor:cursor + size]})
        cursor += size
    return sections


def clean_title(title: str) -> str:
    title = re.sub(r"^\d+\.\s*", "", title)
    return title


def slugify(value: str) -> str:
    ascii_value = unicodedata.normalize("NFKD", value).encode("ascii", "ignore").decode()
    return re.sub(r"[^a-z0-9]+", "-", ascii_value.lower()).strip("-")


def serialize_topic(chapter: dict, group_id: str, number: int) -> dict:
    title = clean_title(chapter["title"])
    theory = chapter["master"]
    return {
        "id": slugify(title),
        "number": f"{number:02d}",
        "groupId": group_id,
        "title": title,
        "intro": chapter["intro"],
        "theory": theory,
        "theorySections": build_theory_sections(title, theory, group_id),
        "questions": [
            {"question": question, "answer": answer}
            for question, answer in chapter["qa"]
        ],
        **({"code": chapter["code"]} if chapter.get("code") else {}),
        "references": TOPIC_REFERENCES.get(title, GROUP_REFERENCES[group_id]),
    }


def build_topics() -> list[dict]:
    ordered = [
        ("fundamentos-web", foundation_chapters[4]),
        ("fundamentos-web", foundation_chapters[5]),
        *[("fundamentos-web", chapter) for chapter in foundation_chapters[0:3]],
        ("fundamentos-web", chapters[2]),
        ("angular-core", chapters[1]),
        *[("angular-core", chapter) for chapter in chapters[3:12]],
        ("arquitectura", foundation_chapters[3]),
        *[("arquitectura", chapter) for chapter in chapters[12:14]],
        *[("calidad-operacion", chapter) for chapter in chapters[14:21]],
        *[("criterio-senior", chapter) for chapter in chapters[21:23]],
        ("criterio-senior", chapters[0]),
        ("criterio-senior", chapters[23]),
    ]
    return [
        serialize_topic(chapter, group_id, index)
        for index, (group_id, chapter) in enumerate(ordered, 1)
    ]


def write_typescript() -> None:
    topics = build_topics()
    rapid_questions = [
        {
            "id": f"rapid-{index:03d}-{slugify(question)}",
            "question": question,
            "answer": answer,
        }
        for index, (question, answer) in enumerate(
            foundation_rapid_fire + rapid_fire, 1
        )
    ]
    payloads = {
        "STUDY_GROUPS": GROUPS,
        "STUDY_TOPICS": topics,
        "RAPID_QUESTIONS": rapid_questions,
        "PRACTICE_CASES": PRACTICE_CASES,
        "STUDY_REFERENCES": REFERENCES,
    }

    prelude = """// Generated from tools/build_angular_senior_guide.py. Do not edit by hand.\n\nexport interface StudyGroup {\n  readonly id: string;\n  readonly index: string;\n  readonly title: string;\n  readonly description: string;\n}\n\nexport interface StudyQuestion {\n  readonly id?: string;\n  readonly question: string;\n  readonly answer: string;\n}\n\nexport interface StudyReference {\n  readonly label: string;\n  readonly url: string;\n}\n\nexport interface TheorySection {\n  readonly title: string;\n  readonly items: readonly string[];\n}\n\nexport interface StudyTopic {\n  readonly id: string;\n  readonly number: string;\n  readonly groupId: string;\n  readonly title: string;\n  readonly intro: string;\n  readonly theory: readonly string[];\n  readonly theorySections: readonly TheorySection[];\n  readonly questions: readonly StudyQuestion[];\n  readonly code?: string;\n  readonly references: readonly StudyReference[];\n}\n\nexport interface PracticeCase {\n  readonly title: string;\n  readonly brief: string;\n}\n\n"""
    types = {
        "STUDY_GROUPS": "readonly StudyGroup[]",
        "STUDY_TOPICS": "readonly StudyTopic[]",
        "RAPID_QUESTIONS": "readonly StudyQuestion[]",
        "PRACTICE_CASES": "readonly PracticeCase[]",
        "STUDY_REFERENCES": "readonly StudyReference[]",
    }
    output = [prelude]
    for name, value in payloads.items():
        output.append(
            f"export const {name}: {types[name]} = "
            + json.dumps(value, ensure_ascii=False, indent=2)
            + ";\n\n"
        )

    OUTPUT.parent.mkdir(parents=True, exist_ok=True)
    OUTPUT.write_text("".join(output).rstrip() + "\n", encoding="utf-8")
    print(OUTPUT)


if __name__ == "__main__":
    write_typescript()
