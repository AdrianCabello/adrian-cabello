import { execFileSync } from 'node:child_process';
import { mkdir, readFile, writeFile } from 'node:fs/promises';
import { dirname, resolve } from 'node:path';

const KEYCHAIN_ACCOUNT = 'adrian.necoh@gmail.com';
const KEYCHAIN_SERVICE =
  'com.adriancabello.elevenlabs.angular-senior-guide';
const DEFAULT_VOICE_ID = 'LY1fdYL8QcEDyEkAT4Qq';
const DEFAULT_MODEL_ID = 'eleven_multilingual_v2';

const [, , inputArgument, outputArgument] = process.argv;

if (!inputArgument || !outputArgument) {
  console.error(
    'Uso: npm run audio:generate -- <guion.txt> <audio.mp3>',
  );
  process.exit(1);
}

const inputPath = resolve(inputArgument);
const outputPath = resolve(outputArgument);
const text = (await readFile(inputPath, 'utf8')).trim();

if (!text) {
  throw new Error(`El guion está vacío: ${inputPath}`);
}

const apiKey = execFileSync(
  '/usr/bin/security',
  [
    'find-generic-password',
    '-a',
    KEYCHAIN_ACCOUNT,
    '-s',
    KEYCHAIN_SERVICE,
    '-w',
  ],
  { encoding: 'utf8' },
).trim();

const endpoint = new URL(
  `https://api.elevenlabs.io/v1/text-to-speech/${DEFAULT_VOICE_ID}`,
);
endpoint.searchParams.set('output_format', 'mp3_44100_128');

const response = await fetch(endpoint, {
  method: 'POST',
  headers: {
    Accept: 'audio/mpeg',
    'Content-Type': 'application/json',
    'xi-api-key': apiKey,
  },
  body: JSON.stringify({
    text,
    model_id: DEFAULT_MODEL_ID,
    language_code: 'es',
    voice_settings: {
      stability: 0.55,
      similarity_boost: 0.78,
      style: 0.18,
      use_speaker_boost: true,
      speed: 0.96,
    },
  }),
});

if (!response.ok) {
  const details = await response.text();
  throw new Error(
    `ElevenLabs respondió ${response.status}: ${details.slice(0, 600)}`,
  );
}

await mkdir(dirname(outputPath), { recursive: true });
await writeFile(outputPath, Buffer.from(await response.arrayBuffer()));

console.log(`Audio generado: ${outputPath}`);
