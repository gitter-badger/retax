import kernel from '../di/entry';

import { clientModule, CLIENT_BOOTSTRAPPER } from './inversify';
import { IClientBootstrapper } from './bootstrap';

kernel.load(clientModule);

export default kernel.get<IClientBootstrapper>(CLIENT_BOOTSTRAPPER);
