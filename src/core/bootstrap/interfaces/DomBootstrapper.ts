import { IBootstrapper } from '../../../utils';

import { IRetaxConfig } from '../../configStores';
import { IInversifyKernelFacade } from '../../inversifyKernelFacade';

export interface IDomBootstrapper extends IBootstrapper<
  IRetaxConfig,
  IDomBootstrapConfig,
  Promise<void>
> {}

export interface IDomBootstrapConfig {
  element: Element;
  kernel: IInversifyKernelFacade;
}
