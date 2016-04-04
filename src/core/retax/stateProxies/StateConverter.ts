import { fromJS } from 'immutable';

import { IStateConverter, IImmutableState } from './interfaces';

abstract class AStateConverter implements IStateConverter {
  public convertStateToImmutable(object: Object = {}, nonImmutableKeys: string[] = []): IImmutableState {
    const immutableObject: IImmutableState = Object.keys(object).reduce((res: Object, cur: string) => {
      const newRes = res;
      const shouldImmutable = !nonImmutableKeys.includes(cur);

      newRes[cur] = shouldImmutable ? fromJS(object[cur]) : object[cur];

      return newRes;
    }, object);

    return immutableObject;
  }
}

export default AStateConverter;
