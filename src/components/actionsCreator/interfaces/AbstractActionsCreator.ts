import {
  IActionsCreatorService,
} from '../../../core';

export interface IActionsCreator extends IActionsCreatorService {
  export(): IExportReturn;
}

export interface IExportReturn extends HashMap<Function> {}
