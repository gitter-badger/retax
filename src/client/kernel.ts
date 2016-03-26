import { Kernel } from 'inversify';

import { DomBootstrapper, IDomBootstrapper } from '../bootstrap';
import { DomStateProxy, IStateProxy } from '../stateProxies';
import { DomCookieProxy, ICookieProxy } from '../cookieProxies';
import { ReduxFacade, IReduxFacade } from '../redux';
import { ReactRouterFacade, IReactRouterFacade } from '../reactRouter';
import { ClientBuilder, IJSXBuilder } from '../JSXBuilders';
import { createConfigStore, IConfigStore }  from '../configStore';
import { RetaxConfigProxy, IRetaxConfigProxy } from '../configProxies';
import {
  internalConfig, IInternalConfig,
  retaxConfig, IRetaxConfig,
} from '../config';

const kernel = new Kernel();

// construtor
kernel.bind<IDomBootstrapper>('Bootstrapper').to(DomBootstrapper);
kernel.bind<IRetaxConfigProxy>('RetaxConfigProxy').to(RetaxConfigProxy);
kernel.bind<IStateProxy>('StateProxy').to(DomStateProxy);
kernel.bind<ICookieProxy>('CookieProxy').to(DomCookieProxy);
kernel.bind<IReduxFacade>('ReduxFacade').to(ReduxFacade);
kernel.bind<IReactRouterFacade>('ReactRouterFacade').to(ReactRouterFacade);
kernel.bind<IJSXBuilder>('JSXBuilder').to(ClientBuilder);

// value
kernel.bind<IConfigStore<IInternalConfig>>('InternalConfigStore').toValue(createConfigStore(internalConfig));
kernel.bind<IConfigStore<IRetaxConfig>>('RetaxConfigStore').toValue(createConfigStore(retaxConfig));

export default kernel;
