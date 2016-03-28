import { IBootstrapper } from '../../../utils';
import { IRetaxConfig } from '../../../config';

export interface IDomBootstrapper extends IBootstrapper<
  IRetaxConfig,
  Element,
  Promise<void>
> {}
