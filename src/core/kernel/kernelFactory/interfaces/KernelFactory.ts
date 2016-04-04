import { IKernelModule, IKernel } from 'inversify';

export interface IKernelFactory {
  /**
   * Create a new IoC container.
   * All user registered module will be included
   */
  create(modules: IKernelModule[]): IKernel;
}
