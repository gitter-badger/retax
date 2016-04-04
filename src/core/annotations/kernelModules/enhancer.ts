import { IKernel } from 'inversify';

import { IEnhancer, Enhancer } from '../enhancer';

export default function enhancerModule(kernel: IKernel): void {
  kernel.bind<IEnhancer>(Enhancer).to(Enhancer).inSingletonScope();
}
