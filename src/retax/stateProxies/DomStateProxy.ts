import { inject } from 'inversify';

import { IStateProxy, IImmutableState } from './interfaces';
import AStateConverter from './StateConverter';

import { IInternalConfig } from '../config';
import { IRetaxConfigProxy } from '../configProxy';
import { IConfigStore } from '../../utils';

@inject('RetaxConfigProxy', 'InternalConfigStore')
export default class DomStateProxy extends AStateConverter implements IStateProxy {
  private _statePromise: Promise<IImmutableState>;

  constructor(
    private _configProxy: IRetaxConfigProxy,
    private _internalConfig: IConfigStore<IInternalConfig>
  ) {
    super();
  }

  get state(): Promise<IImmutableState> {
    return this._statePromise;
  }

  public get(): Promise<IImmutableState> {
    const { INITIAL_STATE_KEY } = this._internalConfig.config;
    const { nonImmutableKeys } = this._configProxy.config.store;
    const { keepInitialState } = this._configProxy.config.client;

    const serverState = window[INITIAL_STATE_KEY];
    const immutableState = super.convertStateToImmutable(serverState, nonImmutableKeys);

    if (!keepInitialState) {
      delete window[INITIAL_STATE_KEY];
    }

    this._statePromise = Promise.resolve<IImmutableState>(immutableState);
    return this._statePromise;
  }
}
