import { injectable, inject } from 'inversify';

import { IStateProxy, IImmutableState } from './interfaces';
import AStateConverter from './StateConverter';

import { IInternalConfig } from '../configStores';
import { IRetaxConfigStore } from '../configStores';
import { IConfigStore } from '../../utils';

import { INTERNAL_CONFIG_STORE, RETAX_CONFIG_STORE } from '../inversify';

@injectable()
export default class DomStateProxy extends AStateConverter implements IStateProxy {
  private _statePromise: Promise<IImmutableState>;

  constructor(
    @inject(RETAX_CONFIG_STORE) private _retaxConfigStore: IRetaxConfigStore,
    @inject(INTERNAL_CONFIG_STORE) private _internalConfigStore: IConfigStore<IInternalConfig>
  ) {
    super();

    this._statePromise = this._read();
  }

  get statePromise(): Promise<IImmutableState> {
    return this._statePromise;
  }

  private _read(): Promise<IImmutableState> {
    const { INITIAL_STATE_KEY } = this._internalConfigStore.config;
    const { nonImmutableKeys } = this._retaxConfigStore.config.store;

    const serverState = window[INITIAL_STATE_KEY];
    const immutableState = super.convertStateToImmutable(serverState, nonImmutableKeys);

    return Promise.resolve<IImmutableState>(immutableState);
  }
}
