import { IInversifyKernelFacade } from '../../../inversifyKernelFacade';

export interface IRetaxChildContext {
  kernel: IInversifyKernelFacade;
}

export interface IRetaxProps extends IRetaxChildContext {}
