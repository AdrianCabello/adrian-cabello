import { mkdir, readFile, writeFile } from 'node:fs/promises';
import { join, resolve } from 'node:path';
import ts from 'typescript';

const root = process.cwd();
const sourcePath = join(
  root,
  'src/app/pages/angular-senior-guide/angular-senior-guide.data.ts',
);
const outputDirectory = join(root, 'output/audio/angular-senior/scripts');

const source = await readFile(sourcePath, 'utf8');
const compiled = ts.transpileModule(source, {
  compilerOptions: {
    module: ts.ModuleKind.CommonJS,
    target: ts.ScriptTarget.ES2022,
  },
}).outputText;
const module = { exports: {} };
new Function('exports', 'module', compiled)(module.exports, module);
const topics = module.exports.STUDY_TOPICS;

function narrate(text) {
  return text
    .replace(/`([^`]+)`/g, '$1')
    .replace(/@([a-z]+)/gi, 'arroba $1')
    .replace(/\*ngFor\b/g, 'asterisco ng for')
    .replace(/\bCI\/CD\b/g, 'C I, C D')
    .replace(/\bSSR\b/g, 'S S R')
    .replace(/\bSSG\b/g, 'S S G')
    .replace(/\bCSR\b/g, 'C S R')
    .replace(/\bLCP\b/g, 'L C P')
    .replace(/\bINP\b/g, 'I N P')
    .replace(/\bCLS\b/g, 'C L S')
    .replace(/\bDI\b/g, 'inyección de dependencias')
    .replace(/\bAPI\b/g, 'A P I')
    .replace(/\bHTTP\b/g, 'H T T P')
    .replace(/\bHTML\b/g, 'H T M L')
    .replace(/\bCSS\b/g, 'C S S')
    .replace(/\bDOM\b/g, 'D O M')
    .replace(/\bJSON\b/g, 'J S O N')
    .replace(/\bURL\b/g, 'U R L')
    .replace(/\bUI\b/g, 'interfaz')
    .replace(/\bIA\b/g, 'inteligencia artificial')
    .replace(/\bAI\b/g, 'A I')
    .replace(/\bMCP\b/g, 'M C P')
    .replace(/\bRAG\b/g, 'R A G')
    .replace(/\bLLM\b/g, 'L L M')
    .replace(/\bRxJS\b/g, 'Rx J S')
    .replace(/\bNgRx\b/g, 'N G R X')
    .replace(/\bNgFor\b/g, 'N G For')
    .replace(/\bNgOptimizedImage\b/g, 'N G Optimized Image')
    .replace(/\bWCAG\b/g, 'W C A G')
    .replace(/\bSSE\b/g, 'S S E')
    .replace(/\bSQL\b/g, 'S Q L')
    .replace(/\bTTL\b/g, 'T T L')
    .replace(/\bPII\b/g, 'P I I')
    .replace(/\bACL\b/g, 'A C L')
    .replace(/\bp95\b/gi, 'percentil noventa y cinco')
    .replace(/\s+/g, ' ')
    .trim();
}

const theoryConnectors = [
  'Empecemos por la idea central.',
  'Ahora sumemos otra pieza importante.',
  'Llevado a una decisión real.',
  'También conviene entender este límite.',
];

function buildTopicScript(topic) {
  const paragraphs = [
    `Tema ${Number(topic.number)}. ${narrate(topic.title)}.`,
    narrate(topic.intro),
  ];

  topic.theory.forEach((item, index) => {
    paragraphs.push(
      `${theoryConnectors[index % theoryConnectors.length]} ${narrate(item)}`,
    );
  });

  if (topic.questions.length) {
    paragraphs.push(
      'Pasemos ahora a preguntas de entrevista. Intentá responder cada una antes de escuchar la explicación.',
    );
    topic.questions.forEach(({ question, answer }, index) => {
      paragraphs.push(
        `Pregunta ${index + 1}. ${narrate(question)}`,
        `Respuesta. ${narrate(answer)}`,
      );
    });
  }

  paragraphs.push(
    `Con esto terminamos ${narrate(topic.title)}. Antes de avanzar, resumí con tus palabras el mecanismo principal, una decisión que tomarías y un riesgo que verificarías.`,
  );
  return `${paragraphs.join('\n\n')}\n`;
}

await mkdir(outputDirectory, { recursive: true });
const manifest = [];
const completeParts = [
  'Guía completa de entrevista Angular Senior, fundamentos web, arquitectura e inteligencia artificial. Edición septiembre de dos mil veintiséis.',
];

for (const topic of topics) {
  const script = buildTopicScript(topic);
  const filename = `${topic.number}-${topic.id}.txt`;
  await writeFile(join(outputDirectory, filename), script, 'utf8');
  const words = script.trim().split(/\s+/).length;
  manifest.push({
    number: topic.number,
    id: topic.id,
    title: topic.title,
    filename,
    characters: script.length,
    words,
    estimatedMinutes: Number((words / 140).toFixed(1)),
  });
  completeParts.push(script.trim());
}

const completeScript = `${completeParts.join('\n\n')}\n`;
await writeFile(join(outputDirectory, '00-guia-completa.txt'), completeScript);
await writeFile(
  join(outputDirectory, 'manifest.json'),
  `${JSON.stringify(
    {
      generatedAt: new Date().toISOString(),
      topicCount: topics.length,
      totalCharacters: completeScript.length,
      totalWords: completeScript.trim().split(/\s+/).length,
      estimatedMinutes: Number(
        (completeScript.trim().split(/\s+/).length / 140).toFixed(1),
      ),
      topics: manifest,
    },
    null,
    2,
  )}\n`,
  'utf8',
);

console.log(resolve(outputDirectory));
console.log(
  `${topics.length} guiones · ${completeScript.length.toLocaleString('es-AR')} caracteres · ${(
    completeScript.trim().split(/\s+/).length / 140
  ).toFixed(1)} minutos estimados`,
);
