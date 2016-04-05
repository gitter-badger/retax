import { IKernel } from 'inversify';

import { IEnhancer } from './interfaces';
import Enhancer from './Enhancer';

export const ENHANCER = Symbol('Enhancer');

export function enhancerModule(kernel: IKernel): void {
  kernel.bind<IEnhancer>(ENHANCER).to(Enhancer).inSingletonScope();
}
