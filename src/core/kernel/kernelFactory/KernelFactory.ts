import { injectable, Kernel, IKernelModule, IKernel } from 'inversify';

import { IKernelFactory } from './interfaces';

import { IInjector, Injector } from '../injector';

@injectable(Injector)
export default class KernelFactory implements IKernelFactory {
  constructor(
    private _injector: IInjector
  ) {}

  public create(modules: IKernelModule[]): IKernel {
    const userModules = this._injector.userModules;

    const kernel = new Kernel();
    kernel.load(...modules.concat(userModules));

    return kernel;
  }
}
