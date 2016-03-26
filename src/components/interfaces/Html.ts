import { IAssets } from '../../config';

export interface IHtmlProps {
  store: Redux.Store;
  assets: IAssets;
  rootComponent: JSX.Element;
}
