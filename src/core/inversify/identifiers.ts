/**
 * These are the identifiers used with DI.
 * If you are using retax core without retax client or retax server, you HAVE to use these identifiers
 * or the DI won't work.
 */

// bootstrappers
export const DOM_BOOTSTRAPPER = Symbol('DomBootstrapper');
export const REQUEST_BOOTSTRAPPER = Symbol('RequestBootstrapper');
export const BOOTSTRAPPERS = { DOM_BOOTSTRAPPER, REQUEST_BOOTSTRAPPER };

// components
export const HTML_COMPONENT = Symbol('HtmlComponent');
export const RETAX_PROVIDER_COMPONENT = Symbol('RetaxProviderComponent');
export const RETAX_CONSUMER_COMPONENT = Symbol('RetaxConsumerComponent');
export const COMPONENTS = { HTML_COMPONENT, RETAX_PROVIDER_COMPONENT, RETAX_CONSUMER_COMPONENT };

// config stores
export const INTERNAL_CONFIG_STORE = Symbol('InternalConfigStore');
export const RETAX_CONFIG_STORE = Symbol('RetaxConfigStore');
export const CONFIG_STORES = { INTERNAL_CONFIG_STORE, RETAX_CONFIG_STORE };

// config proxy
export const RETAX_CONFIG_PROXY = Symbol('RetaxConfigProxy');

// cookie proxies
export const DOM_COOKIE_PROXY = Symbol('DomCookieProxy');
export const REQUEST_COOKIE_PROXY = Symbol('RequestCookieProxy');
export const COOKIE_PROXIES = { DOM_COOKIE_PROXY, REQUEST_COOKIE_PROXY };

// inversify kernel facade
export const INVERSIFY_KERNEL_FACADE = Symbol('InversifyKernelFacade');

// jsx builders
export const CLIENT_BUILDER = Symbol('ClientBuilder');
export const SERVER_BUILDER = Symbol('ServerBuilder');
export const JSX_BUILDERS = { CLIENT_BUILDER, SERVER_BUILDER };

// react router facade
export const REACT_ROUTER_FACADE = Symbol('ReactRouterFacade');

// redux facade
export const REDUX_FACADE = Symbol('ReduxFacade');

// state proxies
export const DOM_STATE_PROXY = Symbol('DomStateProxy');
export const REQUEST_STATE_PROXY = Symbol('RequestStateProxy');
export const STATE_PROXIES = { DOM_STATE_PROXY, REQUEST_STATE_PROXY };
