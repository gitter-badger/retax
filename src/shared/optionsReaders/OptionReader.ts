import { IOptionReader } from './interfaces';

export default class OptionReader<T extends Object> implements IOptionReader<T> {
  private _options: T;

  constructor(defaultOptions: T) {
    this._options = defaultOptions;
  }

  get config(): T {
    return this._options;
  }

  public read(options: T): T {
    for (const key in options) {
      if (options.hasOwnProperty(key) && (key in this._options)) {
        this._options[key] = Object.assign(this._options[key], options[key]);
      }
    }

    return this._options;
  }
}
