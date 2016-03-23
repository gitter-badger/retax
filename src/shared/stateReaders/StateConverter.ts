import { fromJS } from 'immutable';

import { IStateConverter, IImmutableState } from './interfaces';

export default class StateConverter implements IStateConverter {
  convertStateToImmutable(object: Object, nonImmutableKeys: string[]): IImmutableState {
    const immutableObject: IImmutableState = Object.keys(object).reduce((res, cur) => {
      const newRes = res;
      const shouldImmutable = !nonImmutableKeys.includes(cur);

      newRes[cur] = shouldImmutable ? fromJS(object[cur]) : object[cur];

      return newRes;
    }, object);

    return immutableObject;
  }
}
