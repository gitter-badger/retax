import * as _ from 'lodash';

import { IConfigStore } from './interfaces';

export default class ConfigStore<T> implements IConfigStore<T> {
  constructor(private _config: T) {}

  /**
   * Get the current config
   */
  get config(): T {
    return this._config;
  }

  /**
   * Merge the new config in the previous one
   */
  set config(c: T) {
    this._config = _.merge({}, this._config, c);
  }
}
