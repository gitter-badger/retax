import { IKernel } from 'inversify';

export interface IRetaxChildContext {
  kernel: IKernel;
}

export interface IRetaxProps extends IRetaxChildContext {}
