import { INewable, IKernelModule } from 'inversify';

export type IModulesMap = Map<INewable<any>, IKernelModule>;

export interface IInjector {
  userModules: IKernelModule[];

  registerService<T>(Service: INewable<T>): void;
  injectService<T>(Service: INewable<T>): ClassDecorator;
  injectActions<T>(Service: INewable<T>): ClassDecorator;
}
