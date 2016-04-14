import { IKernelModule } from 'inversify';

import { IInversifyKernelFacade, ILifecycleConfig } from '../../../core';

export interface IKernelMediator {
  create(modules: IKernelModule[]): IInversifyKernelFacade;
  reload(kernelFacade?: IInversifyKernelFacade): void;
}
