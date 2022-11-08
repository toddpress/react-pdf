import * as pdfjs from 'pdfjs-dist/build/pdf';

import Document from './Document';
import Outline from './Outline';
import Page from './Page';

import { displayWorkerWarning } from './shared/utils';

displayWorkerWarning();

pdfjs.GlobalWorkerOptions.workerPort = new Worker(
  new URL('pdfjs-dist/build/pdf.worker.entry', import.meta.url),
  { type: 'module' },
);

export { pdfjs, Document, Outline, Page };
