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
        "title": "Full-Stack Product Engineer · Tech Lead",
        "summary": (
            "Full-stack product engineer and Angular tech lead with 9+ years of experience building "
            "enterprise SaaS, analytics dashboards, AI products, and operational platforms. Deep "
            "experience in Angular, Ionic, TypeScript, RxJS, Signals, frontend architecture, performance, "
            "accessibility, and testing. Lead teams, build products from scratch, and ship across Angular, "
            "Node.js, Go, and PostgreSQL."
        ),
        "skills": (
            "<b>Frontend:</b> Angular 2 through the latest version, Ionic, TypeScript, JavaScript, RxJS, "
            "Signals, NgRx/Redux, HTML5, CSS3, Sass, Tailwind CSS, Angular Material, responsive UI, "
            "accessibility, performance optimization<br/>"
            "<b>Engineering:</b> Frontend architecture, design systems, REST APIs, real-time interfaces, "
            "Jasmine, Karma, Jest, Cypress, CI/CD, Git, Agile/Scrum, code review, mentoring<br/>"
            "<b>Backend &amp; Data:</b> Node.js, NestJS, Express, Go, PostgreSQL, MySQL, MongoDB, AWS<br/>"
            "<b>AI &amp; Automation:</b> LLM product interfaces, document Q&amp;A, AI chat, MCP servers, "
            "agent workflows, Claude, ChatGPT, and Jira-integrated automation"
        ),
    },
    "angular": {
        "title": "Senior Angular Engineer · Frontend Lead",
        "summary": (
            "Senior Angular engineer and frontend lead with 9+ years of experience building enterprise SaaS, "
            "analytics dashboards, mobile workflows, and AI products. Lead Angular architecture and migrations, "
            "build scalable component systems, and improve performance, accessibility, and test coverage. "
            "Work across product, design, backend, and QA in remote international teams."
        ),
        "skills": (
            "<b>Angular:</b> Angular 2 through the latest version, TypeScript, RxJS, Signals, NgRx/Redux, "
            "standalone components, deferred loading, hydration, reactive forms, routing, guards, interceptors<br/>"
            "<b>Frontend:</b> Ionic, JavaScript, HTML5, CSS3, Sass, Tailwind CSS, Angular Material, "
            "responsive UI, accessibility, performance optimization, design systems<br/>"
            "<b>Quality &amp; Delivery:</b> Jasmine, Karma, Jest, Cypress, CI/CD, Git, code review, mentoring, Agile/Scrum<br/>"
            "<b>Integration:</b> REST APIs, real-time interfaces, Node.js, NestJS, PostgreSQL, AI product interfaces"
        ),
    },
    "fullstack": {
        "title": "Senior Full-Stack Product Engineer · Angular & Node.js",
        "summary": (
            "Senior full-stack product engineer with 9+ years of experience owning web and mobile products "
            "from interface through backend services and production delivery. Build with Angular, TypeScript, "
            "Node.js, NestJS, Go, PostgreSQL, and AWS. Lead architecture, product decisions, releases, and "
            "AI-assisted engineering across remote international teams."
        ),
        "skills": (
            "<b>Product Engineering:</b> End-to-end feature ownership, product discovery, technical design, "
            "production delivery, incident resolution, code review, mentoring<br/>"
            "<b>Frontend:</b> Angular 2 through the latest version, TypeScript, RxJS, Signals, NgRx/Redux, "
            "Ionic, responsive UI, accessibility, performance optimization<br/>"
            "<b>Backend &amp; Cloud:</b> Node.js, NestJS, Express, Go, REST APIs, PostgreSQL, MySQL, MongoDB, "
            "AWS, Docker, CI/CD<br/>"
            "<b>AI &amp; Automation:</b> LLM product interfaces, document Q&amp;A, AI chat, MCP servers, "
            "agent workflows, Claude, ChatGPT"
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
            "Senior Frontend Engineer",
            "CLARA Analytics",
            "Remote, Argentina | Jun 2025 - Present",
            [
                "Build and maintain production frontend features with Angular and TypeScript in a cross-functional product environment.",
                "Integrate data-rich and AI-enabled workflows while improving maintainability, usability, and frontend architecture.",
                "Collaborate with product, backend, design, and QA teams across the full delivery lifecycle.",
            ],
        ),
        job(
            "Founder & Tech Lead",
            "EventLoop - Independent Side Project",
            "Built outside working hours | Dec 2023 - Present",
            [
                "Lead product strategy, UX, frontend architecture, releases, and continuous iteration for an event operations platform.",
                "Built Angular 20 and TypeScript workflows for POS, ticketing, inventory, product catalogs, and multi-location operations.",
                "Implemented role-based access, receipt OCR imports, recipe-linked stock, and real-time inventory synchronization.",
                "Contribute to Go backend services and PostgreSQL data models while guiding technical decisions across the product.",
            ],
        ),
        job(
            "Senior Frontend Developer",
            "Scanntech",
            "Remote, Argentina | May 2024 - Jan 2025",
            [
                "Built an Ionic and Angular mobile ordering app for field sales and distribution teams supporting Coca-Cola and Unilever programs.",
                "Shipped visit planning, customer-specific catalogs, order and return capture, offline sync, delivery tracking, and geolocated seller routes with completion and exception monitoring.",
                "Migrated a large enterprise application to Angular 19 and delivered new analytics features using Signals, deferred loading, hydration, reusable components, and REST integrations.",
            ],
        ),
        PageBreak(),
        Spacer(1, 2),
        Paragraph("Adrian Cabello", styles["Name"]),
        Paragraph("Professional Experience - Continued", styles["Role"]),
        job(
            "Senior Frontend Developer / Frontend Lead",
            "Halo Media - Mercer",
            "Remote, Argentina | Jun 2022 - Apr 2024",
            [
                "Led frontend development for Mercer RFP, an Angular 17 document Q&amp;A product with AI-generated responses and file processing.",
                "Built Mercer Mind, a real-time AI chat experience using Angular, TypeScript, RxJS, secure authentication, and contextual responses.",
                "Created investment and corporate web products from scratch and maintained 80%+ unit test coverage across complex applications.",
            ],
        ),
        *section("Earlier Experience"),
        job(
            "Senior Frontend Developer",
            "Cognizant Softvision - EY",
            "Remote | Mar 2021 - Jun 2022",
            [
                "Developed and optimized Angular 11 features for the EY Global Tax Platform, a large-scale enterprise tax operations product.",
                "Built reusable components, Redux state flows, REST integrations, and interactive workflows with 80%+ unit test coverage.",
                "Resolved performance and maintainability issues across a complex distributed application.",
            ],
        ),
        job(
            "Frontend Developer",
            "ProKarma - Symplr",
            "Remote | Jun 2019 - Mar 2021",
            [
                "Delivered Angular 9 features for a healthcare governance, risk, and compliance platform.",
                "Built administrative forms, reusable UI components, Redux state flows, and responsive experiences.",
                "Collaborated in a cross-functional organization of 100+ engineers, designers, and product managers.",
            ],
        ),
        job(
            "Frontend Developer",
            "Grupo Assa",
            "Tandil, Argentina | Dec 2016 - Jun 2019",
            [
                "Built finance and retail web platforms using Angular 4-7, TypeScript, Angular Material, Redux, and REST APIs.",
                "Implemented authentication, role-based access, dynamic JSON forms, real-time chat, routing, pagination, and analytics.",
                "Maintained strong unit test coverage while delivering responsive, production-ready interfaces.",
            ],
        ),
        *section("Selected Impact"),
        Paragraph(
            "- 9+ years delivering Angular applications across enterprise, analytics, fintech, healthcare, AI, and event operations.<br/>"
            "- Led frontend products from architecture through production release and ongoing iteration.<br/>"
            "- Maintained 80%+ unit test coverage on multiple global products.<br/>"
            "- Built AI-powered document Q&amp;A, real-time chat, and AI-assisted engineering workflows.<br/>"
            "- Comfortable working independently in remote, international, English-speaking teams.",
            styles["BodyCompact"],
        ),
        *section("Education"),
        Paragraph(
            "<b>University Technician in Computer Applications Development</b> - UNICEN, Tandil, Argentina | 2015-2018<br/>"
            "<b>Software Engineering coursework</b> - UNICEN | 2012-2015<br/>"
            "<b>Professional and Personal Computer Technician</b> - Technical School No. 3, Necochea | 2011",
            styles["BodyCompact"],
        ),
        *section("Certifications & Training"),
        Paragraph(
            "Angular Intermediate and Angular Basic - HackerRank | JavaScript Intermediate and Basic - HackerRank | "
            "Unit Testing in Angular - Pluralsight | Scrum Fundamentals - SCRUMstudy | "
            "NgRx/Redux, Node.js, MEAN Stack, and Advanced Angular - Udemy",
            styles["BodyCompact"],
        ),
        *section("Languages"),
        Paragraph("Spanish: Native | English: Advanced professional proficiency (C1)", styles["BodyCompact"]),
    ]

    doc.build(story)
    print(output)


if __name__ == "__main__":
    for name in OUTPUTS:
        build(name)
