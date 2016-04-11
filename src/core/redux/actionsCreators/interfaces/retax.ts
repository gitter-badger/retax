export type ISetAuthTokenPayload = string;

export interface IActionsCreator {
  (...args: any[]): ReduxActions.Action;
}

export interface IRetaxActionsCreator {

}
