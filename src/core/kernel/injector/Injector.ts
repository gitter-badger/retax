import { IKernelModule } from 'inversify';

import {
  IInjector,
  IUserServiceConstructor,
} from './interfaces';

export default class Injector implements IInjector {
  private _modules: Map<IUserServiceConstructor, IKernelModule> = new Map<IUserServiceConstructor, IKernelModule>();

  get userModules(): IKernelModule[] {
    const res: IKernelModule[] = [];

    for (const kernelModule of this._modules.values()) {
      res.push(kernelModule);
    }

    return res;
  }

  public registerService(Service: IUserServiceConstructor): void {
    this._modules.set(Service, this.createKernelModule(Service));
  }

  private createKernelModule(Service: IUserServiceConstructor): IKernelModule {
    return kernel => {
      kernel.bind(Service).to(Service);
    };
  }
}
