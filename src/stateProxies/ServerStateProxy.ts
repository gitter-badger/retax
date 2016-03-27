import { IStateProxy, IImmutableState } from './interfaces';
import StateConverter from './StateConverter';

export default class ServerStateProxy extends StateConverter implements IStateProxy {
  private _statePromise: Promise<IImmutableState>;

  get state(): Promise<IImmutableState> {
    return this._statePromise;
  }

  public get(): Promise<IImmutableState> {
    this._statePromise = Promise.resolve<IImmutableState>({});

    return this._statePromise;
  }
}
