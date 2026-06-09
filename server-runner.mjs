import express from 'express';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

const app = express();
const currentFolder = dirname(fileURLToPath(import.meta.url));
const browserFolder = join(currentFolder, 'dist/adrian-cabello/browser');
const port = process.env.PORT || 4000;

app.use(
  express.static(browserFolder, {
    maxAge: '1y',
    index: false,
    redirect: false,
  }),
);

app.use('*', (_req, res) => {
  res.sendFile(join(browserFolder, 'index.csr.html'));
});

app.listen(port, () => {
  console.log(`Adrian Cabello app listening on http://localhost:${port}`);
});
