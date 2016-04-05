import { IKernel } from 'inversify';

import RetaxProvider from './RetaxProvider';
import RetaxConsumer from './RetaxConsumer';

export const RETAX_PROVIDER_COMPONENT = Symbol('RetaxProviderComponent');
export const RETAX_CONSUMER_COMPONENT = Symbol('RetaxConsumerComponent');

export const RETAX_COMPONENTS = { RETAX_PROVIDER_COMPONENT, RETAX_CONSUMER_COMPONENT };

export function retaxProviderComponentModule(kernel: IKernel): void {
  kernel.bind<typeof RetaxProvider>(RETAX_PROVIDER_COMPONENT).toConstructor(RetaxProvider);
}

export function retaxConsumerComponentModule(kernel: IKernel): void {
  kernel.bind<typeof RetaxConsumer>(RETAX_CONSUMER_COMPONENT).toConstructor(RetaxConsumer);
}

export function retaxComponentsModule(kernel: IKernel): void {
  kernel.load(retaxProviderComponentModule);
  kernel.load(retaxConsumerComponentModule);
}
