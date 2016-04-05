import { IKernel } from 'inversify';

import { IJSXBuilder } from './interfaces';
import ClientBuilder from './ClientBuilder';
import ServerBuilder from './ServerBuilder';

export const CLIENT_BUILDER = Symbol('ClientBuilder');
export const SERVER_BUILDER = Symbol('ServerBuilder');

export const JSX_BUILDERS = { CLIENT_BUILDER, SERVER_BUILDER };

export function clientBuilderModule(kernel: IKernel): void {
  kernel.bind<IJSXBuilder>(CLIENT_BUILDER).to(ClientBuilder).inSingletonScope();
}

export function serverBuilderModule(kernel: IKernel): void {
  kernel.bind<IJSXBuilder>(SERVER_BUILDER).to(ServerBuilder).inSingletonScope();
}

export function JSXBuildersModule(kernel: IKernel): void {
  kernel.load(clientBuilderModule);
  kernel.load(serverBuilderModule);
}
