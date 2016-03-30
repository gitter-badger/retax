import { IKernel } from 'inversify';

import { IInjector, Injector } from '../injector';
import { IKernelFactory, KernelFactory} from '../kernelFactory';

export default function kernelModule(kernel: IKernel): void {
  kernel.bind<IInjector>('Injector').to(Injector).inSingletonScope();
  kernel.bind<IKernelFactory>('KernelFactory').to(KernelFactory).inSingletonScope();
}
