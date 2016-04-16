import { Collection } from 'immutable';

export interface IImmutableState {
  [key: string]: Collection<any, any> | any;
}

export interface IStateProxy {
  read(): IImmutableState;
}
