import { IKernel } from 'inversify';

import { ANNOTATIONS, annotationsModule } from './annotations';
import { KERNEL, kernelModule } from './kernel';
import { RETAX, retaxModule } from './retax';

export const CORE = { ANNOTATIONS, KERNEL, RETAX };

export function coreModule(kernel: IKernel): void {
  kernel.load(annotationsModule);
  kernel.load(kernelModule);
  kernel.load(retaxModule);
}

export function frameworkModule(kernel: IKernel): void {
  kernel.load(annotationsModule);
  kernel.load(kernelModule);
}
