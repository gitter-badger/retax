import { inject } from 'inversify';

import { IBootstrapper } from './interfaces';
import { IRetaxOptionReader, IRetaxOptions } from '../optionsReaders/retax';
import { IStateReader } from '../stateReaders';

@inject('RetaxOptionReader', 'StateReader')
export default class DefaultBoostrapper implements IBootstrapper {
  constructor(
    private _optionsReader: IRetaxOptionReader,
    private _stateReader: IStateReader
  ) {}

  config(options: IRetaxOptions) {
    this._optionsReader.read(options);
  }

  async bootstrap() {
    // read initial state
    const state = await this._stateReader.read();

    console.log('state', state);

  }
}
