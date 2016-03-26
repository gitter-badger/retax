import { IRetaxConfig } from '../../config';
import { IConfigProxy } from './ConfigProxy';

export interface IRetaxConfigProxy extends IConfigProxy<IRetaxConfig> {
  evaluateConfig(store: Redux.Store, userAgent: string): IRetaxConfig;
}
