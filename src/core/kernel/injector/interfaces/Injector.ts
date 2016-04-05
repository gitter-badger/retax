import { IKernelModule } from 'inversify';

export interface IUserModule {
  id: Symbol;
  kernelModule: IKernelModule;
}

export interface IUserServiceConstructor {
  new(...args: any[]): IUserService;
}
export interface IUserService {
  configure<T>(config: T): void;
}

export interface IUserServiceMap extends HashMap<IUserService> {}
export interface IInjectableUserServiceMap extends HashMap<IUserServiceConstructor> {}

export interface IInjector {
  userModules: IKernelModule[];

  registerService(Service: IUserServiceConstructor): Symbol;
  registerServicesList(Service: IUserServiceConstructor[]): Symbol;

  deferRegister(Service: IUserServiceConstructor): void;
}




