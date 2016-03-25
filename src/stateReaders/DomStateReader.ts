import { inject } from 'inversify';

import { IInternalConfig } from '../internalConfig';
import { IOptionReader, IRetaxOptions } from '../optionsReaders';
import { IStateReader, IImmutableState } from './interfaces';
import StateConverter from './StateConverter';

@inject('RetaxOptionReader', 'InternalConfig')
export default class DomStateReader extends StateConverter implements IStateReader {
  private _statePromise: Promise<IImmutableState>;

  constructor(
    private _optionsReader: IOptionReader<IRetaxOptions>,
    private _internalConfig: IInternalConfig
  ) {
    super();
  }

  get state(): Promise<IImmutableState> {
    return this._statePromise;
  }

  public read(): Promise<IImmutableState> {
    const { INITIAL_STATE_KEY } = this._internalConfig;
    const { nonImmutableKeys } = this._optionsReader.config.store;
    const { keepInitialState } = this._optionsReader.config.client;

    const serverState = window[INITIAL_STATE_KEY];
    const immutableState = super.convertStateToImmutable(serverState, nonImmutableKeys);

    if (!keepInitialState) {
      delete window[INITIAL_STATE_KEY];
    }

    this._statePromise = Promise.resolve<IImmutableState>(immutableState);
    return this._statePromise;
  }
}
