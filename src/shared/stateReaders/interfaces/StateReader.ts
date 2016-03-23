export interface IImmutableState {
  [key: string]: Immutable.Collection<any, any> | any;
}

export interface IStateReader {
  state: Promise<IImmutableState>;
  read(): Promise<IImmutableState>;
}
