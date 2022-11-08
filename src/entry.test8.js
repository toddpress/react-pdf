import * as pdfjs from 'pdfjs-dist/build/pdf';
// eslint-disable-next-line import/no-unresolved
import pdfjsWorker from 'pdfjs-dist/build/pdf.worker?worker';

import Document from './Document';
import Outline from './Outline';
import Page from './Page';

import { displayWorkerWarning } from './shared/utils';

displayWorkerWarning();

pdfjs.GlobalWorkerOptions.workerPort = pdfjsWorker;

export { pdfjs, Document, Outline, Page };
