import * as _ from 'lodash';

import { IConfigStore } from '../configStore';

import { IConfigProxy } from './interfaces';

abstract class AConfigProxy<T> implements IConfigProxy<T> {
  constructor(
    private _configStore: IConfigStore<T>
  ) {}

  /**
   * Set the config in the store.
   */
  set initialConfig(config: T) {
    this._configStore.config = config;
  }

  /**
   * Clone and return the config from the store.
   */
  get initialConfig(): T {
    return _.merge({}, this._configStore.config);
  }

  protected abstract _evaluateConfig(): T;
}

export default AConfigProxy;
