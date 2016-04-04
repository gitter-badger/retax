import { IKernel } from 'inversify';

import { IAnnotator, Annotator } from '../annotator';

export default function annotatorModule(kernel: IKernel): void {
  kernel.bind<IAnnotator>(Annotator).to(Annotator).inSingletonScope();
}
