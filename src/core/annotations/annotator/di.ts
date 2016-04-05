import { IKernel } from 'inversify';

import { IAnnotator } from './interfaces';
import Annotator from './Annotator';

export const ANNOTATOR = Symbol('Annotator');

export function annotatorModule(kernel: IKernel): void {
  kernel.bind<IAnnotator>(ANNOTATOR).to(Annotator).inSingletonScope();
}
