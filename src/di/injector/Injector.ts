import { IKernelModule, injectable } from 'inversify';

import {
  IInjector,
  IUserService,
  IUserServiceConstructor,
  IUserModule,
} from './interfaces';

import { generateRandomId } from '../../utils';

@injectable()
export default class Injector implements IInjector {
  private _userModules: Map<IUserServiceConstructor[], IUserModule> = new Map<IUserServiceConstructor[], IUserModule>();

  get userModules(): IUserModule[] {
    const res: IUserModule[] = [];

    for (const userModule of this._userModules.values()) {
      res.push(userModule);
    }

    return res;
  }

  public registerService(Services: IUserServiceConstructor|IUserServiceConstructor[], name?: string): Symbol {
    let serviceId: Symbol;
    let ServicesToRegister: IUserServiceConstructor[];

    if (Services instanceof Array) {
      serviceId = Symbol(`UserService[] - ${name || generateRandomId()}`);
      ServicesToRegister = Services;
    } else {
      serviceId = Symbol(`UserService - ${name || generateRandomId()}`);
      ServicesToRegister = [Services];
    }

    const kernelModuleLoader = this._createKernelModuleLoader(serviceId, ServicesToRegister);
    const kernelModuleUnloader = this._createKernelModuleUnloader(serviceId);
    this._setUserModule(ServicesToRegister, serviceId, kernelModuleLoader, kernelModuleUnloader);

    return serviceId;
  }

  private _setUserModule(
    key: IUserServiceConstructor[],
    serviceId: Symbol,
    kernelModuleLoader: IKernelModule,
    kernelModuleUnloader: IKernelModule
  ): void {
    if (this._userModules.has(key)) {
      throw new Error(`Duplicate module for key ${key.toString()} of id ${serviceId}`);
    }

    this._userModules.set(key, { serviceId, kernelModuleLoader, kernelModuleUnloader });
  }

  private _createKernelModuleLoader(id: Symbol, Services: IUserServiceConstructor[]): IKernelModule {
    return kernel => {
      if (Services.length === 0) { // we need to bind something for id.
        kernel.bind<IUserService>(id).toValue(undefined);
      } else {
        Services.forEach(Service => {
          kernel.bind<IUserService>(id).to(Service);
        });
      }
    };
  }

  private _createKernelModuleUnloader(id: Symbol): IKernelModule {
    return kernel => {
      kernel.unbind(id);
    };
  }
}
