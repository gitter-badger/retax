import { IKernelModule } from 'inversify';

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

  registerService(service: IUserServiceConstructor): void;
}




