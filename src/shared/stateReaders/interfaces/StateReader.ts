export interface IImmutableState {
  [key: string]: Immutable.Collection<any, any> | any;
}

export interface IStateReader {
  read(): Promise<IImmutableState>;
}
