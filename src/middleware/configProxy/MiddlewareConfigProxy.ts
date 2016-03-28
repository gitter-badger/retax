import { inject } from 'inversify';

import { IMiddlewareConfig } from '../../config';
import { AConfigProxy } from '../../utils/configProxy';

@inject('MiddlewareConfigStore')
export default class MiddlewareConfigProxy extends AConfigProxy<IMiddlewareConfig> {
  public evaluateConfig(): IMiddlewareConfig {
    return super.config;
  }
}
