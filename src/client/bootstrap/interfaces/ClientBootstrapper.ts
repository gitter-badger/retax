import { IBootstrapper } from '../../../utils';
import { IRetaxConfig } from '../../../retax';

export interface IClientBootstrapper extends IBootstrapper<
  IRetaxConfig,
  Element,
  Promise<void>
> {}
