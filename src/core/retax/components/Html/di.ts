import { IKernel } from 'inversify';

import Html from './Html';

export const HTML_COMPONENT = Symbol('HtmlComponent');

export function htmlComponentModule(kernel: IKernel): void {
  kernel.bind<typeof Html>(HTML_COMPONENT).toConstructor(Html);
}

