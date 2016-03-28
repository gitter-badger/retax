import { IMiddlewareConfig } from '../../../config';
import { IConfigProxy } from '../../../utils';

export interface IMiddlewareConfigProxy extends IConfigProxy<IMiddlewareConfig> {
  evaluateConfig(): IMiddlewareConfig;
}
