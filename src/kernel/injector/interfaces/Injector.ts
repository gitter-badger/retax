import { INewable, IKernelModule } from 'inversify';

export interface IModulesMap {
  [index: string]: IKernelModule;
}

export interface IInjectable {}

export interface IInjectDecorator extends Function {
  (target: INewable<IInjectable>): INewable<IInjectable>;
}

export interface IInjector {
  userModules: IKernelModule[];
  registerService<T>(name: string, Service: INewable<T>): void;
  injectService(name: string): IInjectDecorator;
}
