/// <reference path="../node_modules/inversify/type_definitions/inversify/inversify.d.ts" />
declare namespace inversify {
  export interface IKernel {
      bind<T>(runtimeIdentifier: INewable<T>): IBindingToSyntax<T>;
      get<T>(runtimeIdentifier: INewable<T>): T;
  }
}
