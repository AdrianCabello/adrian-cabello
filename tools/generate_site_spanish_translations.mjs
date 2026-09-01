import fs from 'node:fs/promises';
import path from 'node:path';
import ts from 'typescript';

const root = process.cwd();
const templatePaths = [
  'src/app/shared/components/header/header.component.html',
  'src/app/sections/home/home.component.html',
  'src/app/sections/projects/projects.component.html',
  'src/app/sections/experience/experience.component.html',
  'src/app/sections/academic/academic.component.html',
  'src/app/sections/resources/resources.component.html',
  'src/app/sections/footer/footer.component.html',
];
const dataPaths = [
  'src/app/services/projects.service.ts',
  'src/app/sections/experience/experience.component.ts',
  'src/app/sections/academic/academic.component.ts',
];
const outputPath = path.join(root, 'src/app/i18n/site-translations.es.ts');
const strings = new Set([
  'Show selected credentials',
  'View all credentials',
  'View credential',
  'Present',
  'total',
]);

function add(value) {
  const normalized = value.replace(/\s+/g, ' ').trim();
  if (
    normalized.length > 1 &&
    !normalized.includes('{{') &&
    !normalized.startsWith('pi ')
  ) {
    strings.add(normalized);
  }
}

for (const relativePath of templatePaths) {
  const template = await fs.readFile(path.join(root, relativePath), 'utf8');
  for (const match of template.matchAll(/'([^']+)'\s*\|\s*translate/gs)) {
    add(match[1]);
  }
  for (const match of template.matchAll(/"([^"]+)"\s*\|\s*translate/gs)) {
    add(match[1]);
  }
  for (const match of template.matchAll(/>([^<>{]+)</g)) {
    add(match[1]);
  }
  for (const match of template.matchAll(
    /(?<!\[)(?:aria-label|alt|placeholder)="([^"]+)"/g
  )) {
    add(match[1]);
  }
}

const allowedProperties = new Set([
  'title',
  'role',
  'description',
  'period',
  'responsibilities',
  'projects',
  'summary',
  'name',
  'outcomes',
  'imageLabels',
  'platformNote',
  'degree',
  'institution',
  'date',
]);

function propertyName(node) {
  if (ts.isIdentifier(node) || ts.isStringLiteral(node)) {
    return node.text;
  }
  return '';
}

function collectLiterals(node) {
  if (ts.isStringLiteral(node) || ts.isNoSubstitutionTemplateLiteral(node)) {
    add(node.text);
    return;
  }
  ts.forEachChild(node, collectLiterals);
}

for (const relativePath of dataPaths) {
  const sourceText = await fs.readFile(path.join(root, relativePath), 'utf8');
  const sourceFile = ts.createSourceFile(
    relativePath,
    sourceText,
    ts.ScriptTarget.Latest,
    true
  );
  function visit(node) {
    if (
      ts.isPropertyAssignment(node) &&
      allowedProperties.has(propertyName(node.name))
    ) {
      collectLiterals(node.initializer);
      return;
    }
    ts.forEachChild(node, visit);
  }
  visit(sourceFile);
}

const protectedPattern = /\b(?:Angular|TypeScript|JavaScript|RxJS|Signals?|Ionic|EventLoop|Node\.js|PostgreSQL|Go|HTML5|CSS3|SASS|Redux|Store|Jasmine|REST|LLMs?|MCP|AI|SEO|UX|UI|POS|OCR|WebSocket|LinkedIn|GitHub|Instagram|WhatsApp|Calendly)\b/gi;

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
  url.searchParams.set('sl', 'en');
  url.searchParams.set('tl', 'es');
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
      throw new Error(`Could not translate batch: ${texts[0]}\n${error}`);
    }
    await new Promise(resolve => setTimeout(resolve, 500 * 2 ** attempt));
    return translateBatch(texts, attempt + 1);
  }
}

const entries = [...strings];
const batches = [];
let currentBatch = [];
let currentLength = 0;
for (const entry of entries) {
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

const translations = {};
for (const [index, batch] of batches.entries()) {
  const results = await translateBatch(batch);
  batch.forEach((original, resultIndex) => {
    translations[original] = results[resultIndex];
  });
  process.stdout.write(`Translated ${index + 1}/${batches.length} batches\n`);
  await new Promise(resolve => setTimeout(resolve, 250));
}

const orderedTranslations = Object.fromEntries(
  entries.map(original => [original, translations[original]])
);
const output = `// Generated by tools/generate_site_spanish_translations.mjs.\n// The English portfolio copy remains canonical in its components and services.\n\nexport const SITE_SPANISH_TRANSLATIONS: Readonly<Record<string, string>> = ${JSON.stringify(
  orderedTranslations,
  null,
  2
)};\n`;

await fs.writeFile(outputPath, output);
process.stdout.write(`Wrote ${outputPath} with ${entries.length} entries\n`);
