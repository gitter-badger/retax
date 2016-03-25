import { inject } from 'inversify';

import { IRetaxConfig } from '../config';

import { IRetaxConfigProxy } from './interfaces';
import ConfigProxy from './ConfigProxy';

@inject('RetaxConfigStore')
export default class RetaxConfigProxy extends ConfigProxy<IRetaxConfig> implements IRetaxConfigProxy {
  public evaluateConfig(store: Redux.Store): IRetaxConfig {
    const evaluatedConfig = super.config;
    const { router } = evaluatedConfig;

    if (router.dynamic && typeof router.dynamic === 'function') {
      router.static = router.dynamic(store);
    }

    return evaluatedConfig;
  }
}
