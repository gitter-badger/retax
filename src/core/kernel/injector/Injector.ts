import { IKernelModule, injectable } from 'inversify';

import {
  IInjector,
  IUserService,
  IUserServiceConstructor,
  IUserModule,
} from './interfaces';

import { generateRandomId } from '../../../utils';

@injectable()
export default class Injector implements IInjector {
  private _userModules: Map<IUserServiceConstructor[], IUserModule> = new Map<IUserServiceConstructor[], IUserModule>();

  get userModules(): IKernelModule[] {
    const res: IKernelModule[] = [];

    for (const userModule of this._userModules.values()) {
      res.push(userModule.kernelModule);
    }

    return res;
  }

  public registerService(Services: IUserServiceConstructor|IUserServiceConstructor[]): Symbol {
    let serviceId: Symbol;
    let ServicesToRegister: IUserServiceConstructor[];

    if (Services instanceof Array) {
      serviceId = Symbol(`UserService[] - ${generateRandomId()}`);
      ServicesToRegister = Services;
    } else {
      serviceId = Symbol(`UserService - ${generateRandomId()}`);
      ServicesToRegister = [Services];
    }

    const kernelModule = this._createKernelModule(serviceId, ServicesToRegister);
    this._setUserModule(ServicesToRegister, serviceId, kernelModule);

    return serviceId;
  }

  private _setUserModule(
    key: IUserServiceConstructor[],
    serviceId: Symbol,
    kernelModule: IKernelModule
  ): void {
    if (this._userModules.has(key)) {
      throw new Error(`Duplicate module for key ${key.toString()}`);
    }

    this._userModules.set(key, { serviceId, kernelModule });
  }

  private _createKernelModule(id: Symbol, Services: IUserServiceConstructor[]): IKernelModule {
    return kernel => {
      Services.forEach(Service => {
        kernel.bind<IUserService>(id).to(Service);
      });
    };
  }
}
