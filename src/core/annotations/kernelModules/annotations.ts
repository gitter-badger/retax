import { IKernel } from 'inversify';

import annotatorModule from './annotator';
import enhancerModule from './enhancer';

export default function annotationsModule(kernel: IKernel): void {
  kernel.load(annotatorModule);
  kernel.load(enhancerModule);
}
