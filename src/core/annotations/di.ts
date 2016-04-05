import { IKernel } from 'inversify';

import { ANNOTATOR, annotatorModule } from './annotator';
import { ENHANCER, enhancerModule } from './enhancer';

export const ANNOTATIONS = { ANNOTATOR, ENHANCER };

export function annotationsModule(kernel: IKernel): void {
  kernel.load(annotatorModule);
  kernel.load(enhancerModule);
}
