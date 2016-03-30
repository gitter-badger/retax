import { inject, Kernel, IKernelModule, IKernel } from 'inversify';

import { IKernelFactory } from './interfaces';

import { IInjector } from '../injector';

@inject('Injector')
export default class KernelFactory implements IKernelFactory {
  constructor(
    private _injector: IInjector
  ) {}

  public create(modules: IKernelModule[]): IKernel {
    const userModules = this._injector.userModules;

    return new Kernel({
      modules: modules.concat(userModules),
    });
  }
}
