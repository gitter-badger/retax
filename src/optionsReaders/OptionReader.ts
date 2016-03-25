import * as _ from 'lodash';

import { IOptionReader } from './interfaces';

export default class OptionReader<T extends Object> implements IOptionReader<T> {
  protected _options: T;

  constructor(defaultOptions: T) {
    this._options = defaultOptions;
  }

  get config(): T {
    return this._options;
  }

  public read(options: T): T {
    this._options = _.merge(this._options, options);

    return this._options;
  }
}
