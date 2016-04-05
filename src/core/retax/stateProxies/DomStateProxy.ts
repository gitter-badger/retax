import { injectable, inject } from 'inversify';

import { IStateProxy, IImmutableState } from './interfaces';
import AStateConverter from './StateConverter';

import { IInternalConfig, INTERNAL_CONFIG_STORE } from '../config';
import { IRetaxConfigProxy, RETAX_CONFIG_PROXY } from '../configProxy';
import { IConfigStore } from '../../../utils';

@injectable()
export default class DomStateProxy extends AStateConverter implements IStateProxy {
  private _statePromise: Promise<IImmutableState>;

  constructor(
    @inject(RETAX_CONFIG_PROXY) private _configProxy: IRetaxConfigProxy,
    @inject(INTERNAL_CONFIG_STORE) private _internalConfig: IConfigStore<IInternalConfig>
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
