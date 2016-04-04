import { IBootstrapper, IRetaxConfig } from '../../../core';

export interface IClientBootstrapper extends IBootstrapper<
  IRetaxConfig,
  Element,
  Promise<void>
> {}
