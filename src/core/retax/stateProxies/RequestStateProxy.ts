import { IStateProxy, IImmutableState } from './interfaces';
import AStateConverter from './StateConverter';

export default class RequestStateProxy extends AStateConverter implements IStateProxy {
  private _statePromise: Promise<IImmutableState>;

  get state(): Promise<IImmutableState> {
    return this._statePromise;
  }

  public get(): Promise<IImmutableState> {
    this._statePromise = Promise.resolve<IImmutableState>({});

    return this._statePromise;
  }
}
