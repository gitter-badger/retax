import { IAssets } from '../../bootstrap';

export interface IHtmlProps {
  store: Redux.Store;
  assets: IAssets;
  rootComponent: JSX.Element;
}
