import { Kernel } from 'inversify';
import { shared, middleware, retax, dom, server, api } from './modules';

const kernel = new Kernel({
  modules: [shared, middleware, retax, dom, server, api],
});

export default kernel;
