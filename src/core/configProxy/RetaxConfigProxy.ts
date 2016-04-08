import { injectable, inject } from 'inversify';

import { IRetaxConfig, IRetaxConfigStore } from '../configStores';
import { AConfigProxy } from '../../utils';

import { RETAX_CONFIG_STORE } from '../inversify';

@injectable()
export default class RetaxConfigProxy extends AConfigProxy<IRetaxConfig> {
  constructor(
    @inject(RETAX_CONFIG_STORE) store: IRetaxConfigStore
  ) {
    super(store);
  }

  public evaluateConfig(store: Redux.Store, userAgent: string): IRetaxConfig {
    const evaluatedConfig = super.config;
    const { router } = evaluatedConfig;

    if (router.dynamic && typeof router.dynamic === 'function') {
      router.static = router.dynamic(store, userAgent);
    }

    return evaluatedConfig;
  }
}
