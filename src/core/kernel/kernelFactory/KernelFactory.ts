import { injectable, inject, Kernel, IKernelModule, IKernel } from 'inversify';

import { IKernelFactory } from './interfaces';

import { IInjector, INJECTOR } from '../injector';

@injectable()
export default class KernelFactory implements IKernelFactory {
  constructor(
    @inject(INJECTOR) private _injector: IInjector
  ) {}

  public create(modules: IKernelModule[]): IKernel {
    const userModules = this._injector.userModules;

    const kernel = new Kernel();
    kernel.load(...modules.concat(userModules));

    return kernel;
  }
}
