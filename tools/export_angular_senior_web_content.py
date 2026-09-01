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
        "id": "enfoque-senior",
        "index": "00",
        "title": "Enfoque Senior",
        "description": "Estructura de respuestas, criterio técnico y trade-offs.",
    },
    {
        "id": "lenguaje-web",
        "index": "01",
        "title": "Lenguaje y plataforma web",
        "description": "TypeScript, JavaScript, browser, HTML y CSS.",
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
        "title": "Arquitectura y diseño",
        "description": "Límites, patrones, SOLID y evolución del código.",
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


def clean_title(title: str) -> str:
    title = re.sub(r"^\d+\.\s*", "", title)
    return title


def slugify(value: str) -> str:
    ascii_value = unicodedata.normalize("NFKD", value).encode("ascii", "ignore").decode()
    return re.sub(r"[^a-z0-9]+", "-", ascii_value.lower()).strip("-")


def serialize_topic(chapter: dict, group_id: str, number: int) -> dict:
    title = clean_title(chapter["title"])
    return {
        "id": slugify(title),
        "number": f"{number:02d}",
        "groupId": group_id,
        "title": title,
        "intro": chapter["intro"],
        "theory": chapter["master"],
        "questions": [
            {"question": question, "answer": answer}
            for question, answer in chapter["qa"]
        ],
        **({"code": chapter["code"]} if chapter.get("code") else {}),
    }


def build_topics() -> list[dict]:
    ordered = [
        ("enfoque-senior", chapters[0]),
        ("lenguaje-web", chapters[2]),
        *[("lenguaje-web", chapter) for chapter in foundation_chapters],
        ("angular-core", chapters[1]),
        *[("angular-core", chapter) for chapter in chapters[3:12]],
        *[("arquitectura", chapter) for chapter in chapters[12:14]],
        *[("calidad-operacion", chapter) for chapter in chapters[14:21]],
        *[("criterio-senior", chapter) for chapter in chapters[21:24]],
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

    prelude = """// Generated from tools/build_angular_senior_guide.py. Do not edit by hand.\n\nexport interface StudyGroup {\n  readonly id: string;\n  readonly index: string;\n  readonly title: string;\n  readonly description: string;\n}\n\nexport interface StudyQuestion {\n  readonly id?: string;\n  readonly question: string;\n  readonly answer: string;\n}\n\nexport interface StudyTopic {\n  readonly id: string;\n  readonly number: string;\n  readonly groupId: string;\n  readonly title: string;\n  readonly intro: string;\n  readonly theory: readonly string[];\n  readonly questions: readonly StudyQuestion[];\n  readonly code?: string;\n}\n\nexport interface PracticeCase {\n  readonly title: string;\n  readonly brief: string;\n}\n\nexport interface StudyReference {\n  readonly label: string;\n  readonly url: string;\n}\n\n"""
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
    OUTPUT.write_text("".join(output), encoding="utf-8")
    print(OUTPUT)


if __name__ == "__main__":
    write_typescript()
