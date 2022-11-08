import * as pdfjs from 'pdfjs-dist/build/pdf';
// eslint-disable-next-line import/no-unresolved
import pdfjsWorkerImport from './pdf.worker.import?url';

import Document from './Document';
import Outline from './Outline';
import Page from './Page';

import { displayWorkerWarning } from './shared/utils';

displayWorkerWarning();

pdfjs.GlobalWorkerOptions.workerPort = new Worker(new URL(pdfjsWorkerImport, import.meta.url), {
  type: 'module',
});

export { pdfjs, Document, Outline, Page };
