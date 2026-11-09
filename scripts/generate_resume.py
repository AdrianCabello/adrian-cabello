from pathlib import Path
from xml.sax.saxutils import escape

from reportlab.lib import colors
from reportlab.lib.enums import TA_CENTER
from reportlab.lib.pagesizes import LETTER
from reportlab.lib.styles import ParagraphStyle, getSampleStyleSheet
from reportlab.lib.units import inch
from reportlab.platypus import (
    BaseDocTemplate,
    Frame,
    KeepTogether,
    PageBreak,
    PageTemplate,
    Paragraph,
    Spacer,
)


ROOT = Path(__file__).resolve().parents[1]
OUTPUTS = {
    "general": ROOT / "output" / "pdf" / "adrian-cabello-resume-2026.pdf",
    "angular": ROOT / "output" / "pdf" / "adrian-cabello-senior-angular-engineer.pdf",
    "fullstack": ROOT / "output" / "pdf" / "adrian-cabello-full-stack-product-engineer.pdf",
}

NAVY = colors.HexColor("#17233C")
BLUE = colors.HexColor("#2563EB")
SLATE = colors.HexColor("#475569")
LIGHT = colors.HexColor("#E2E8F0")
VARIANTS = {
    "general": {
        "title": "Senior Frontend Developer · Angular Tech Lead",
        "summary": (
            "Senior frontend developer and Angular tech lead with 9+ years of experience building "
            "enterprise SaaS, analytics dashboards, AI products, and operational platforms. Deep "
            "experience in Angular, Ionic, TypeScript, RxJS, Signals, frontend architecture, performance, "
            "accessibility, and testing. Lead teams, build products from scratch, and connect "
            "technical decisions to product outcomes."
        ),
        "skills": (
            "<b>Frontend:</b> Angular 2 through the latest version, Ionic, TypeScript, JavaScript, RxJS, "
            "Signals, NgRx/Redux, HTML5, CSS3, Sass, Tailwind CSS, Angular Material, responsive UI, "
            "accessibility, performance optimization<br/>"
            "<b>Engineering:</b> Frontend architecture, design systems, REST APIs, real-time interfaces, "
            "Jasmine, Karma, Jest, Cypress, CI/CD (Azure DevOps), AWS, Git, Agile/Scrum, code review, mentoring<br/>"
            "<b>AI &amp; Automation:</b> LLM product interfaces, document Q&amp;A, AI chat, MCP servers, "
            "agent workflows, Claude Code, Codex, Cursor, ChatGPT, and Jira-integrated automation"
        ),
    },
    "angular": {
        "title": "Senior Angular Developer · Frontend Lead",
        "summary": (
            "Senior Angular developer and frontend lead with 9+ years of experience building enterprise SaaS, "
            "analytics dashboards, mobile workflows, and AI products. Lead Angular architecture and migrations, "
            "build scalable component systems, and improve performance, accessibility, and test coverage. "
            "Work across product, design, backend, and QA in remote international teams."
        ),
        "skills": (
            "<b>Angular:</b> Angular 2 through the latest version, TypeScript, RxJS, Signals, NgRx/Redux, "
            "standalone components, deferred loading, hydration, reactive forms, routing, guards, interceptors<br/>"
            "<b>Frontend:</b> Ionic, JavaScript, HTML5, CSS3, Sass, Tailwind CSS, Angular Material, "
            "responsive UI, accessibility, performance optimization, design systems<br/>"
            "<b>Quality &amp; Delivery:</b> Jasmine, Karma, Jest, Cypress, CI/CD (Azure DevOps), Git, code review, mentoring, Agile/Scrum<br/>"
            "<b>Integration &amp; Cloud:</b> REST APIs, real-time interfaces, Node.js, NestJS, PostgreSQL, AWS<br/>"
            "<b>AI-assisted Engineering:</b> Claude Code, Codex, Cursor, MCP servers, agent workflows, and Jira automation"
        ),
    },
    "fullstack": {
        "title": "Senior Full-Stack Product Developer · Angular & Node.js",
        "summary": (
            "Developer with 9+ years in frontend engineering and additional backend experience delivering web and mobile products. "
            "Build Angular interfaces, RESTful services, and production workflows with Angular, "
            "TypeScript, Node.js/Express, NestJS, Prisma, Spring Boot, Go, and PostgreSQL, and run my own NestJS API "
            "in production for client websites. Work across frontend and backend teams in remote international teams."
        ),
        "skills": (
            "<b>Full-Stack Engineering:</b> End-to-end feature ownership, technical design, RESTful API design, "
            "API integration, production delivery, incident resolution, code review, mentoring<br/>"
            "<b>Frontend:</b> Angular 2 through the latest version, TypeScript, JavaScript, HTML5, CSS3, RxJS, "
            "Signals, NgRx/Redux, Ionic, responsive UI, accessibility, performance optimization<br/>"
            "<b>Backend &amp; Cloud:</b> Node.js, Express, NestJS, Prisma, Spring Boot (Java), Go, REST APIs, JWT auth, "
            "webhooks, PostgreSQL, MySQL, MongoDB, AWS, Google Cloud Storage, Azure DevOps, Docker, CI/CD<br/>"
            "<b>Testing:</b> Jasmine, Karma, Jest, Cypress<br/>"
            "<b>AI &amp; Automation:</b> LLM product interfaces, document Q&amp;A, AI chat, MCP servers, "
            "agent workflows, Claude Code, Codex, Cursor, ChatGPT"
        ),
    },
}

styles = getSampleStyleSheet()
styles.add(
    ParagraphStyle(
        name="Name",
        parent=styles["Title"],
        fontName="Helvetica-Bold",
        fontSize=22,
        leading=24,
        alignment=TA_CENTER,
        textColor=NAVY,
        spaceAfter=3,
    )
)
styles.add(
    ParagraphStyle(
        name="Role",
        parent=styles["Normal"],
        fontName="Helvetica-Bold",
        fontSize=10.5,
        leading=13,
        alignment=TA_CENTER,
        textColor=BLUE,
        spaceAfter=4,
    )
)
styles.add(
    ParagraphStyle(
        name="Contact",
        parent=styles["Normal"],
        fontSize=8.5,
        leading=11,
        alignment=TA_CENTER,
        textColor=SLATE,
        spaceAfter=11,
    )
)
styles.add(
    ParagraphStyle(
        name="Section",
        parent=styles["Heading2"],
        fontName="Helvetica-Bold",
        fontSize=10.5,
        leading=12,
        textColor=NAVY,
        borderColor=BLUE,
        borderWidth=0,
        borderPadding=0,
        spaceBefore=8,
        spaceAfter=5,
    )
)
styles.add(
    ParagraphStyle(
        name="BodyCompact",
        parent=styles["BodyText"],
        fontName="Helvetica",
        fontSize=8.8,
        leading=12.2,
        textColor=colors.HexColor("#1E293B"),
        spaceAfter=6,
    )
)
styles.add(
    ParagraphStyle(
        name="JobTitle",
        parent=styles["BodyText"],
        fontName="Helvetica-Bold",
        fontSize=9.7,
        leading=12,
        textColor=NAVY,
        spaceAfter=2,
    )
)
styles.add(
    ParagraphStyle(
        name="JobMeta",
        parent=styles["BodyText"],
        fontName="Helvetica-Oblique",
        fontSize=8,
        leading=10.5,
        textColor=SLATE,
        spaceAfter=3.5,
    )
)
styles.add(
    ParagraphStyle(
        name="BulletCompact",
        parent=styles["BodyText"],
        fontName="Helvetica",
        fontSize=8.5,
        leading=11.2,
        leftIndent=10,
        firstLineIndent=-6,
        bulletIndent=2,
        textColor=colors.HexColor("#1E293B"),
        spaceAfter=2.2,
    )
)


def section(title: str):
    return [Paragraph(title.upper(), styles["Section"]), line()]


def line():
    from reportlab.platypus import HRFlowable

    return HRFlowable(width="100%", thickness=0.7, color=LIGHT, spaceAfter=6)


def job(title: str, company: str, period: str, bullets: list[str]):
    parts = [
        Paragraph(f"{escape(title)} | {escape(company)}", styles["JobTitle"]),
        Paragraph(period, styles["JobMeta"]),
    ]
    parts.extend(
        Paragraph(f"- {item}", styles["BulletCompact"]) for item in bullets
    )
    parts.append(Spacer(1, 4))
    return KeepTogether(parts)


def header_for(professional_title):
    def header(canvas, doc):
        canvas.saveState()
        canvas.setStrokeColor(LIGHT)
        canvas.setLineWidth(0.5)
        canvas.line(doc.leftMargin, 0.42 * inch, LETTER[0] - doc.rightMargin, 0.42 * inch)
        canvas.setFont("Helvetica", 7)
        canvas.setFillColor(SLATE)
        canvas.drawString(doc.leftMargin, 0.27 * inch, "Adrian Cabello")
        canvas.drawRightString(LETTER[0] - doc.rightMargin, 0.27 * inch, f"Page {doc.page}")
        canvas.restoreState()

    return header


def build(variant_name):
    output = OUTPUTS[variant_name]
    variant = VARIANTS[variant_name]
    professional_title = variant["title"]
    fullstack = variant_name == "fullstack"
    output.parent.mkdir(parents=True, exist_ok=True)
    doc = BaseDocTemplate(
        str(output),
        pagesize=LETTER,
        leftMargin=0.55 * inch,
        rightMargin=0.55 * inch,
        topMargin=0.45 * inch,
        bottomMargin=0.52 * inch,
        title=f"Adrian Cabello - {professional_title}",
        author="Adrian Cabello",
        subject="Resume",
    )
    frame = Frame(
        doc.leftMargin,
        doc.bottomMargin,
        doc.width,
        doc.height,
        leftPadding=0,
        rightPadding=0,
        topPadding=0,
        bottomPadding=0,
    )
    doc.addPageTemplates(
        PageTemplate(id="resume", frames=[frame], onPage=header_for(professional_title))
    )

    story = [
        Paragraph("Adrian Cabello", styles["Name"]),
        Paragraph(
            escape(professional_title),
            styles["Role"],
        ),
        Paragraph(
            "Necochea, Argentina | +54 2262 497993 | c.adriancabello@gmail.com | "
            '<link href="https://adriancabello.dev" color="#2563EB">adriancabello.dev</link> | '
            '<link href="https://www.linkedin.com/in/adrian-cabello-b07290b8/" color="#2563EB">LinkedIn</link> | '
            '<link href="https://github.com/AdrianCabello" color="#2563EB">GitHub</link>',
            styles["Contact"],
        ),
        *section("Professional Summary"),
        Paragraph(variant["summary"], styles["BodyCompact"]),
        *section("Core Skills"),
        Paragraph(variant["skills"], styles["BodyCompact"]),
        *section("Professional Experience"),
        job(
            "Senior Frontend Developer",
            "CLARA Analytics",
            "Remote, Argentina | Jun 2025 - Sep 2026",
            [
                "Built and maintained production features with Angular and TypeScript for a data-intensive analytics platform.",
                "Worked with the backend team on Spring Boot services, developing new functionality and creating new REST endpoints.",
                "Integrated data-rich and AI-enabled workflows with product, design, and QA across the full delivery lifecycle.",
            ],
        )
        if fullstack
        else job(
            "Senior Frontend Developer",
            "CLARA Analytics",
            "Remote, Argentina | Jun 2025 - Sep 2026",
            [
                "Delivered Angular and TypeScript interfaces for a data-intensive analytics platform, integrating backend APIs into production workflows.",
                "Worked with product, design, backend, and QA to deliver AI-enabled features and improve frontend maintainability and usability.",
            ],
        ),
        job(
            "Senior Frontend Developer",
            "Scanntech",
            "Remote, Argentina | May 2024 - Jan 2025",
            [
                "Built an Ionic and Angular ordering app for Coca-Cola and Unilever field sales teams: visit planning, customer catalogs, orders and returns, offline sync, delivery tracking, and geolocated routes.",
                "Developed and integrated Spring Boot REST services supporting the ordering and analytics features.",
                "Migrated a large enterprise application from AngularJS to Angular 19 and delivered new analytics features using Signals, deferred loading, hydration, and reusable components.",
            ],
        )
        if fullstack
        else job(
            "Senior Frontend Developer",
            "Scanntech",
            "Remote, Argentina | May 2024 - Jan 2025",
            [
                "Built an Ionic and Angular mobile ordering app for field sales and distribution teams supporting Coca-Cola and Unilever programs.",
                "Shipped visit planning, customer-specific catalogs, order and return capture, offline sync, delivery tracking, and geolocated seller routes with completion and exception monitoring.",
                "Migrated a large enterprise application from AngularJS to Angular 19 and delivered new analytics features using Signals, deferred loading, hydration, reusable components, and REST integrations.",
            ],
        ),
        job(
            "Senior Frontend Developer / Frontend Lead",
            "Halo Media - Mercer",
            "Remote, Argentina | Jun 2022 - Apr 2024",
            [
                "Led frontend architecture and implementation for Mercer RFP, an Angular 17 document Q&amp;A product, from initial setup through file uploads and AI-response review workflows.",
                "Developed NestJS backend services for two years, building new features and REST endpoints alongside the Angular applications.",
                "Built Mercer Mind, a real-time AI chat experience using Angular, TypeScript, RxJS, NestJS, secure authentication, and contextual responses.",
                "Created investment and corporate web products from scratch and maintained 80%+ unit test coverage across complex applications.",
                "Maintained Azure DevOps CI/CD pipelines for building, testing, and deploying the Angular applications.",
            ],
        )
        if fullstack
        else job(
            "Senior Frontend Developer / Frontend Lead",
            "Halo Media - Mercer",
            "Remote, Argentina | Jun 2022 - Apr 2024",
            [
                "Led frontend architecture and implementation for Mercer RFP, an Angular 17 document Q&amp;A product, from initial setup through file uploads and AI-response review workflows.",
                "Built Mercer Mind, a real-time AI chat experience using Angular, TypeScript, RxJS, secure authentication, and contextual responses.",
                "Created investment and corporate web products from scratch and maintained 80%+ unit test coverage across complex applications.",
                "Maintained Azure DevOps CI/CD pipelines for building, testing, and deploying the Angular applications.",
            ],
        ),
        PageBreak(),
        *section("Earlier Experience"),
        job(
            "Senior Frontend Developer",
            "Cognizant Softvision - EY",
            "Remote | Mar 2021 - Jun 2022",
            [
                "Developed and optimized Angular 11 features for the EY Global Tax Platform, a large-scale enterprise tax operations product.",
                "Built reusable components, Redux state flows, and REST integrations with 80%+ unit test coverage, resolving performance issues across a complex distributed application.",
            ],
        ),
        job(
            "Frontend Developer",
            "ProKarma - Symplr",
            "Remote | Jun 2019 - Mar 2021",
            [
                "Delivered Angular 9 features for a healthcare governance, risk, and compliance platform.",
                "Built administrative forms, reusable UI components, and Redux state flows in an organization of 100+ engineers, designers, and product managers.",
            ],
        ),
        job(
            "Frontend Developer",
            "Grupo Assa",
            "Tandil, Argentina | Dec 2016 - Jun 2019",
            [
                "Built finance and retail web platforms using Angular 4-7, TypeScript, Angular Material, Redux, and REST APIs.",
                "Worked as part of the backend team on a Node.js and Express backend, connecting multiple external APIs and creating new endpoints for authentication, role-based access, real-time chat, and pagination.",
            ],
        )
        if fullstack
        else job(
            "Frontend Developer",
            "Grupo Assa",
            "Tandil, Argentina | Dec 2016 - Jun 2019",
            [
                "Built finance and retail web platforms using Angular 4-7, TypeScript, Angular Material, Redux, and REST APIs.",
                "Implemented authentication, role-based access, dynamic JSON forms, real-time chat, routing, pagination, and analytics.",
                "Maintained strong unit test coverage while delivering responsive, production-ready interfaces.",
            ],
        ),
        *section("Independent Projects"),
        job(
            "Founder & Full-Stack Developer",
            "Rakium - Independent Studio",
            "Built outside working hours | May 2025 - Present",
            [
                "Built and run in production a NestJS, Prisma, and PostgreSQL API that powers the Rakium portfolio, several client websites, and a leads and sales CRM.",
                "Implemented JWT auth with role-based guards, global validation, centralized database error handling, and Swagger docs.",
                "Built image uploads with Sharp optimization behind a pluggable storage layer, and migrated media from Backblaze to Google Cloud Storage with a dry-run, flag-gated cutover.",
                "Integrated Instagram messaging webhooks with HMAC signature verification; shipped with multi-stage Docker builds on Dokploy.",
            ]
            if fullstack
            else [
                "Build client websites with Angular, SSR, and Tailwind CSS, backed by my own NestJS, Prisma, and PostgreSQL API in production.",
                "Run the content, media, and CRM back office end to end, from data models and uploads to deployment.",
            ],
        ),
        job(
            "Founder & Tech Lead",
            "EventLoop - Independent Side Project",
            "Built outside working hours | Dec 2023 - Present",
            [
                "Lead product, architecture, and releases for an event operations platform, building Angular 22 workflows for POS, ticketing, inventory, catalogs, and multi-location operations.",
                "Implemented role-based access, receipt OCR imports, and real-time inventory sync, contributing Go backend services and PostgreSQL data models.",
            ],
        ),
        *section("Education"),
        Paragraph(
            "<b>University Technician in Computer Applications Development</b> - UNICEN, Tandil, Argentina | 2015-2018<br/>"
            "<b>Software Engineering coursework</b> - UNICEN | 2012-2015<br/>"
            "<b>Professional and Personal Computer Technician</b> - Technical School No. 3, Necochea | 2011",
            styles["BodyCompact"],
        ),
        *section("Certifications, Training & Languages"),
        Paragraph(
            "Angular Intermediate and Angular Basic - HackerRank | JavaScript Intermediate and Basic - HackerRank | "
            "Unit Testing in Angular - Pluralsight | Scrum Fundamentals - SCRUMstudy | "
            "NgRx/Redux, Node.js, MEAN Stack, and Advanced Angular - Udemy<br/>"
            "<b>Languages:</b> Spanish: Native | English: Advanced professional proficiency (C1)",
            styles["BodyCompact"],
        ),
    ]

    doc.build(story)
    print(output)


def sync_outputs():
    """Keep the public download and local application copies on the Angular CV."""
    import hashlib
    import json
    import shutil

    primary = OUTPUTS["angular"]
    assets = ROOT / "src" / "assets" / "cv"
    downloads = Path.home() / "Downloads"
    aliases = {
        assets / "adrian-cabello-resume-2026.pdf": primary,
        assets / "adrian-cabello-cv.pdf": primary,
        assets / primary.name: primary,
        assets / OUTPUTS["fullstack"].name: OUTPUTS["fullstack"],
    }
    if downloads.is_dir():
        aliases.update({
            downloads / primary.name: primary,
            downloads / "adrian-cabello-resume-2026.pdf": primary,
            downloads / OUTPUTS["fullstack"].name: OUTPUTS["fullstack"],
        })
    for target, source in aliases.items():
        target.parent.mkdir(parents=True, exist_ok=True)
        shutil.copy2(source, target)
    manifest = {
        "primary": str(primary),
        "copies": {
            str(path): hashlib.sha256(path.read_bytes()).hexdigest()
            for path in [*OUTPUTS.values(), *aliases]
        },
    }
    manifest_path = ROOT / "output" / "profile" / "cv-manifest.json"
    manifest_path.parent.mkdir(parents=True, exist_ok=True)
    manifest_path.write_text(json.dumps(manifest, indent=2) + "\n")
    print(f"Synchronized {len(aliases)} copies; manifest: {manifest_path}")


if __name__ == "__main__":
    import argparse

    parser = argparse.ArgumentParser()
    parser.add_argument("--sync", action="store_true", help="Sync public and Downloads copies")
    args = parser.parse_args()
    for name in OUTPUTS:
        build(name)
    if args.sync:
        sync_outputs()
