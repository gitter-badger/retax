import { IImmutableState } from './StateReader';

export interface IStateConverter {
  convertStateToImmutable(object: Object, nonImmutableKeys: string[]): IImmutableState;
}
