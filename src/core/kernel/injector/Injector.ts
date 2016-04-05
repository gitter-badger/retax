import { IKernelModule, injectable } from 'inversify';

import {
  IInjector,
  IUserService,
  IUserServiceConstructor,
  IUserModule,
} from './interfaces';

@injectable()
export default class Injector implements IInjector {
  private _userModules: Map<
    IUserServiceConstructor|IUserServiceConstructor[],
    IUserModule
  > = new Map<IUserServiceConstructor|IUserServiceConstructor[], IUserModule>();

  private _deferedRegisters: IUserServiceConstructor[] = [];

  get userModules(): IKernelModule[] {
    const res: IKernelModule[] = [];

    for (const userModule of this._userModules.values()) {
      res.push(userModule.kernelModule);
    }

    return res;
  }

  public registerService(Service: IUserServiceConstructor): Symbol {
    const serviceId = Symbol('UserService');
    const kernelModule = this._createKernelModule(serviceId, Service);

    this._userModules.set(Service, this._createUserModule(serviceId, kernelModule));

    return serviceId;
  }

  public registerServicesList(Service: IUserServiceConstructor[]): Symbol {
    const serviceId = Symbol('UserService[]');
    const kernelModule = this._createKernelModules(serviceId, Service);

    this._userModules.set(Service, this._createUserModule(serviceId, kernelModule));

    return serviceId;
  }

  public deferRegister(Service: IUserServiceConstructor): void {
    if (!this._deferedRegisters.includes(Service)) {
      this._deferedRegisters.push(Service);
    }
  }

  private _createUserModule(id: Symbol, kernelModule: IKernelModule): IUserModule {
    return {
      id,
      kernelModule,
    }
  }

  private _createKernelModule(id: Symbol, Service: IUserServiceConstructor): IKernelModule {
    return kernel => {
      kernel.bind<IUserService>(id).to(Service);
    };
  }

  private _createKernelModules(id: Symbol, Services: IUserServiceConstructor[]): IKernelModule {
    return kernel => {
      Services.forEach(Service => {
        if (!this._deferedRegisters.includes(Service)) {
          throw new Error('Missing binding');
        }

        kernel.bind<IUserService>(id).to(Service)
      });
    };
  }
}
