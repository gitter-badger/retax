import { IKernelModule } from 'inversify';

import { IInversifyKernelFacade } from '../../../core';

export interface IKernelFactory {
  /**
   * Create a new IoC container.
   * All user registered module will be included
   */
  create(modules: IKernelModule[]): IInversifyKernelFacade;
}
