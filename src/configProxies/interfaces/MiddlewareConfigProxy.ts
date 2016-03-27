import { IMiddlewareConfig } from '../../config';
import { IConfigProxy } from './ConfigProxy';

export interface IMiddlewareConfigProxy extends IConfigProxy<IMiddlewareConfig> {
  evaluateConfig(): IMiddlewareConfig;
}
