import { IKernel } from 'inversify';

import { IKernelFactory } from './interfaces';
import KernelFactory from './KernelFactory';

export const KERNEL_FACTORY = Symbol('KernelFactory');

export function kernelFactoryModule(kernel: IKernel): void {
  kernel.bind<IKernelFactory>(KERNEL_FACTORY).to(KernelFactory).inSingletonScope();
}
