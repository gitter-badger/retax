import { IKernel, IFactory } from 'inversify';

import { IKernelFactory, KernelFactory } from '../../appKernelFactory';
import { IInjector, Injector } from '../../injector';

import {
  IInversifyKernelFacade, InversifyKernelFacade,
  INVERSIFY_KERNEL_FACADE,
} from '../../../core';

import {
  INVERSIFY_KERNEL_FACADE_FACTORY,
  KERNEL_FACTORY,
  INJECTOR,
} from '../identifiers';

export default function diModule(kernel: IKernel): void {
  kernel.bind<IInversifyKernelFacade>(INVERSIFY_KERNEL_FACADE).to(InversifyKernelFacade);
  kernel.bind<IKernelFactory>(KERNEL_FACTORY).to(KernelFactory);
  kernel.bind<IInjector>(INJECTOR).to(Injector).inSingletonScope();

  kernel.bind<IFactory<IInversifyKernelFacade>>(INVERSIFY_KERNEL_FACADE_FACTORY).toAutoFactory(INVERSIFY_KERNEL_FACADE);
}
