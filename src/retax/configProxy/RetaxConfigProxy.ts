import { inject } from 'inversify';

import { IRetaxConfig } from '../../config';
import { AConfigProxy } from '../../utils/configProxy';

@inject('RetaxConfigStore')
export default class RetaxConfigProxy extends AConfigProxy<IRetaxConfig> {
  public evaluateConfig(store: Redux.Store, userAgent: string): IRetaxConfig {
    const evaluatedConfig = super.config;
    const { router } = evaluatedConfig;

    if (router.dynamic && typeof router.dynamic === 'function') {
      router.static = router.dynamic(store, userAgent);
    }

    return evaluatedConfig;
  }
}
