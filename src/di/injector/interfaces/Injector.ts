import { IKernelModule } from 'inversify';

export interface IUserModule {
  serviceId: Symbol;
  kernelModuleLoader: IKernelModule;
  kernelModuleUnloader: IKernelModule;
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
  userModules: IUserModule[];

  registerService(Service: IUserServiceConstructor, name?: string): Symbol;
  registerService(Services: IUserServiceConstructor[], name?: string): Symbol;
}




