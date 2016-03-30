import { inject, IKernelModule, INewable } from 'inversify';

import { IInjector, IModulesMap, IInjectable, IInjectDecorator } from './interfaces';

export default class Injector implements IInjector {
  private _modules: IModulesMap = {};

  get userModules(): IKernelModule[] {
    return Object.values(this._modules);
  }

  public registerService<T>(name: string, Service: INewable<T>): void {
    this._modules[name] = this.createKernelModule(name, Service);
  }

  public injectService<T>(name: string): IInjectDecorator {
    return (Target: INewable<IInjectable>) => {

      @inject(name)
      class WithApi extends Target {
        constructor(api: T) {
          super();
          this[`_${name}`] = api;
        }
      }

      return WithApi;
    };
  }

  private createKernelModule<T>(name: string, Service: INewable<T>): IKernelModule {
    return kernel => {
      kernel.bind<T>(name).to(Service);
    };
  }
}
