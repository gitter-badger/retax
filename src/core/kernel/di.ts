import { IKernel } from 'inversify';

import { INJECTOR, injectorModule } from './injector';
import { KERNEL_FACTORY, kernelFactoryModule } from './kernelFactory';

export const KERNEL = { INJECTOR, KERNEL_FACTORY };

export function kernelModule(kernel: IKernel): void {
  kernel.load(injectorModule);
  kernel.load(kernelFactoryModule);
}
