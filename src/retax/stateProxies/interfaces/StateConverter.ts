import { IImmutableState } from './StateProxy';

export interface IStateConverter {
  convertStateToImmutable(object: Object, nonImmutableKeys: string[]): IImmutableState;
}
