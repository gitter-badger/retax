import { injectable } from 'inversify';

import { IStateProxy, IImmutableState } from './interfaces';
import AStateConverter from './StateConverter';

@injectable()
export default class RequestStateProxy extends AStateConverter implements IStateProxy {
  constructor() {
    super();
  }

  public read(): IImmutableState {
    return {};
  }
}
