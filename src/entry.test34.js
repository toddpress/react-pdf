import * as pdfjs from 'pdfjs-dist/build/pdf';
import pdfjsWorkerImport from './pdf.worker.import';

import Document from './Document';
import Outline from './Outline';
import Page from './Page';

import { displayWorkerWarning } from './shared/utils';

displayWorkerWarning();

pdfjs.GlobalWorkerOptions.workerPort = pdfjsWorkerImport;

export { pdfjs, Document, Outline, Page };
