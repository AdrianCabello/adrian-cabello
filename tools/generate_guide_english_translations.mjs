import fs from 'node:fs/promises';
import path from 'node:path';
import ts from 'typescript';

const root = process.cwd();
const sourcePath = path.join(
  root,
  'src/app/pages/angular-senior-guide/angular-senior-guide.data.ts'
);
const outputPath = path.join(root, 'src/app/i18n/guide-translations.en.ts');

const guideUiCopy = [
  'Ir al contenido',
  'Ir al portfolio de Adrian Cabello',
  'Portfolio · Perfil',
  'Enlaces de Adrian Cabello',
  'Progreso',
  'Progreso de módulos',
  'Guía de entrevista · Edición 2026',
  'HTML, CSS, JavaScript, TypeScript, Angular moderno, RxJS, browser, arquitectura, performance, testing, seguridad, system design y liderazgo técnico.',
  'Módulos',
  'Conceptos',
  'Preguntas',
  'Autor de la guía',
  'Full-Stack Product Engineer y Tech Lead con más de 9 años creando productos web y mobile, liderando arquitectura Angular y migraciones de aplicaciones empresariales. Armé esta guía para convertir experiencia real en teoría precisa, respuestas concretas y decisiones técnicas con sus trade-offs.',
  'Adrian Cabello, Full-Stack Product Engineer y Tech Lead',
  'Experiencia destacada',
  '9+ años',
  'Ver experiencia',
  'Buscar en la guía',
  'Secciones de estudio',
  'Contenido completo',
  'Ver bloque completo',
  'Banco rápido',
  'Casos prácticos',
  'Estudiado',
  'Marcar listo',
  'Listo',
  'Teoría',
  'Ejemplo',
  'Preguntas y respuestas',
  'Ver respuesta',
  'Ocultar',
  'Definiciones breves para responder con precisión antes de ampliar con mecanismo, caso y trade-off.',
  'Respuesta',
  'Sin coincidencias',
  'Probá con otro término',
  'Limpiar búsqueda',
  'Referencias oficiales',
  'Fuentes del tema',
  '¿Cómo te sentís con este tema?',
  'Último repaso',
  'Repasar',
  'Practicando',
  'Seguro',
  'Índice',
  'temas',
  'tema',
  'Bloque',
];

const source = await fs.readFile(sourcePath, 'utf8');
const compiled = ts.transpileModule(source, {
  compilerOptions: {
    module: ts.ModuleKind.CommonJS,
    target: ts.ScriptTarget.ES2022,
  },
}).outputText;

const module = { exports: {} };
new Function('exports', 'module', compiled)(module.exports, module);

const ignoredKeys = new Set([
  'id',
  'index',
  'number',
  'groupId',
  'code',
  'url',
]);
const strings = new Set(guideUiCopy);

function collect(value, key = '') {
  if (typeof value === 'string') {
    if (!ignoredKeys.has(key)) {
      strings.add(value);
    }
    return;
  }
  if (Array.isArray(value)) {
    value.forEach(item => collect(item, key));
    return;
  }
  if (value && typeof value === 'object') {
    Object.entries(value).forEach(([childKey, childValue]) =>
      collect(childValue, childKey)
    );
  }
}

Object.values(module.exports).forEach(value => collect(value));

const protectedPattern =
  /`[^`]+`|\b(?:Angular|TypeScript|JavaScript|RxJS|Signals?|Observable|Promise|HTML|CSS|DOM|CSSOM|CORS|ARIA|WCAG|Flexbox|Grid|OnPush|ZoneJS|NgRx|Router|HttpClient|SOLID|SSR|SSG|LCP|CLS|INP|XSS|CSRF|CSP|CI\/CD|WebSocket|SSE|IndexedDB|Service Worker|Node\.js|PostgreSQL|Go)\b/gi;

function protectTechnicalTerms(text) {
  const values = [];
  const protectedText = text.replace(protectedPattern, match => {
    const token = `ZXQTERM${values.length}QXZ`;
    values.push(match);
    return token;
  });
  return { protectedText, values };
}

function restoreTechnicalTerms(text, values) {
  return values.reduce(
    (result, value, index) =>
      result.replace(new RegExp(`ZXQTERM${index}QXZ`, 'gi'), value),
    text
  );
}

async function translateBatch(texts, attempt = 0) {
  const joined = texts
    .map((text, index) =>
      index === texts.length - 1 ? text : `${text}\nZXQSEP${index}QXZ\n`
    )
    .join('');
  const { protectedText, values } = protectTechnicalTerms(joined);
  const url = new URL('https://clients5.google.com/translate_a/t');
  url.searchParams.set('client', 'dict-chrome-ex');
  url.searchParams.set('sl', 'es');
  url.searchParams.set('tl', 'en');
  url.searchParams.set('dt', 't');
  url.searchParams.set('q', protectedText);

  try {
    const response = await fetch(url, {
      headers: { 'User-Agent': 'Mozilla/5.0' },
    });
    if (!response.ok) {
      throw new Error(`HTTP ${response.status}`);
    }
    const payload = await response.json();
    const translated = restoreTechnicalTerms(payload[0], values);
    const results = translated.split(/\s*ZXQSEP\d+QXZ\s*/gi);
    if (results.length !== texts.length) {
      throw new Error(
        `Expected ${texts.length} translations, received ${results.length}`
      );
    }
    return results;
  } catch (error) {
    if (attempt >= 3) {
      throw new Error(
        `Could not translate batch starting with: ${texts[0]}\n${error}`
      );
    }
    await new Promise(resolve => setTimeout(resolve, 500 * 2 ** attempt));
    return translateBatch(texts, attempt + 1);
  }
}

const entries = [...strings];
let existingTranslations = {};
try {
  const existingSource = await fs.readFile(outputPath, 'utf8');
  const existingCompiled = ts.transpileModule(existingSource, {
    compilerOptions: {
      module: ts.ModuleKind.CommonJS,
      target: ts.ScriptTarget.ES2022,
    },
  }).outputText;
  const existingModule = { exports: {} };
  new Function('exports', 'module', existingCompiled)(
    existingModule.exports,
    existingModule
  );
  existingTranslations =
    existingModule.exports.GUIDE_ENGLISH_TRANSLATIONS ?? {};
} catch {
  existingTranslations = {};
}
const translations = { ...existingTranslations };
const pendingEntries = entries.filter(entry => !translations[entry]);
const batches = [];
let currentBatch = [];
let currentLength = 0;
for (const entry of pendingEntries) {
  if (
    currentBatch.length > 0 &&
    (currentBatch.length >= 12 || currentLength + entry.length > 4500)
  ) {
    batches.push(currentBatch);
    currentBatch = [];
    currentLength = 0;
  }
  currentBatch.push(entry);
  currentLength += entry.length;
}
if (currentBatch.length) {
  batches.push(currentBatch);
}

let cursor = 0;
let completed = 0;
const workerCount = 2;

async function worker() {
  while (cursor < batches.length) {
    const index = cursor++;
    const batch = batches[index];
    const results = await translateBatch(batch);
    batch.forEach((original, resultIndex) => {
      translations[original] = results[resultIndex];
    });
    completed += batch.length;
    process.stdout.write(`Translated ${completed}/${pendingEntries.length}\n`);
    await new Promise(resolve => setTimeout(resolve, 250));
  }
}

await Promise.all(Array.from({ length: workerCount }, () => worker()));

const orderedTranslations = Object.fromEntries(
  entries.map(original => [original, translations[original]])
);
const output = `// Generated by tools/generate_guide_english_translations.mjs.\n// The Spanish source remains canonical in angular-senior-guide.data.ts.\n\nexport const GUIDE_ENGLISH_TRANSLATIONS: Readonly<Record<string, string>> = ${JSON.stringify(
  orderedTranslations,
  null,
  2
)};\n`;

await fs.mkdir(path.dirname(outputPath), { recursive: true });
await fs.writeFile(outputPath, output);
process.stdout.write(`Wrote ${outputPath}\n`);
