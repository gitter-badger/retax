import { IKernel } from 'inversify';

import { IBootstrapper } from '../../../../utils';
import { IRetaxConfig } from '../../config';

export interface IDomBootstrapper extends IBootstrapper<
  IRetaxConfig,
  IDomBootstrapConfig,
  Promise<void>
> {}

export interface IDomBootstrapConfig {
  element: Element;
  kernel: IKernel;
}
