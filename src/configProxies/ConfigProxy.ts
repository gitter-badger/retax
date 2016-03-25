import * as _ from 'lodash';

import { IConfigStore } from '../configStore';

import { IConfigProxy } from './interfaces';

export default class ConfigProxy<T> implements IConfigProxy<T> {
  constructor(private _configStore: IConfigStore<T>) {}

  /**
   * Set the config in the store.
   */
  set config(config: T) {
    this._configStore.config = config;
  }

  /**
   * Clone and return the config from the store.
   */
  get config(): T {
    return _.merge({}, this._configStore.config);
  }

  /**
   * Default: return the cloned config
   */
  public evaluateConfig(...args: any[]): T {
    return this.config;
  }
}
