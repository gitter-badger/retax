export interface IImmutableState {
  [key: string]: Immutable.Collection<any, any> | any;
}

export interface IStateProxy {
  read(): Promise<IImmutableState>;
}
