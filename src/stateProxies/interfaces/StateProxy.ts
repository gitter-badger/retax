export interface IImmutableState {
  [key: string]: Immutable.Collection<any, any> | any;
}

export interface IStateProxy {
  state: Promise<IImmutableState>;
  get(): Promise<IImmutableState>;
}
