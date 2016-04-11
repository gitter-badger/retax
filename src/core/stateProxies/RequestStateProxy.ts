import { injectable } from 'inversify';

import { IStateProxy, IImmutableState } from './interfaces';
import AStateConverter from './StateConverter';

@injectable()
export default class RequestStateProxy extends AStateConverter implements IStateProxy {
  private _statePromise: Promise<IImmutableState>;

  constructor() {
    super();

    this._statePromise = this._read();
  }

  get statePromise(): Promise<IImmutableState> {
    return this._statePromise;
  }

  private _read(): Promise<IImmutableState> {
    return Promise.resolve<IImmutableState>({});
  }
}
