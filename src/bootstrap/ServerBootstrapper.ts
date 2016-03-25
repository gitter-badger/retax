import { inject } from 'inversify';

import { IServerBootstrapper } from './interfaces';
import { IRetaxOptionReader, IRetaxOptions } from '../optionsReaders';

@inject('RetaxOptionReader')
export default class ServerBootstrapper implements IServerBootstrapper {
  constructor(
    private _optionsReader: IRetaxOptionReader
  ) {}

  public config(options: IRetaxOptions): void {
    this._optionsReader.read(options);
  }

  public bootstrap(): string {
    console.log('here in ServerBootstrapper');

    return 'here';
  }
}
