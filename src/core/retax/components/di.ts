import { IKernel } from 'inversify';

import { htmlComponentModule, HTML_COMPONENT } from './Html';
import { retaxComponentsModule, RETAX_COMPONENTS } from './Retax';

export const COMPONENTS = { HTML_COMPONENT, RETAX_COMPONENTS };

export function componentsModule(kernel: IKernel): void {
  kernel.load(htmlComponentModule);
  kernel.load(retaxComponentsModule);
}
