// server bootstrapper
export const SERVER_BOOTSTRAPPER = Symbol('ServerBootstrapper');

// config proxy
export const SERVER_CONFIG_PROXY = Symbol('ServerConfigProxy');

// config stores
export const SERVER_CONFIG_STORE = Symbol('ServerConfigStore');

// middlewares
export const STATIC_MIDDLEWARE_FACTORY = Symbol('StaticMiddlewareFactory');
export const RENDERING_MIDDLEWARE_FACTORY = Symbol('RenderingMiddlewareFactory');
export const MIDDLEWARES = { STATIC_MIDDLEWARE_FACTORY, RENDERING_MIDDLEWARE_FACTORY };
