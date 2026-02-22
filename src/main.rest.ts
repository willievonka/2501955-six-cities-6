import { RestApplication } from './rest/index.js';
import { IConfig, RestConfig } from './shared/libs/config/index.js';
import { ILogger, PinoLogger } from './shared/libs/logger/index.js';

async function bootstrap() {
  const logger: ILogger = new PinoLogger();
  const config: IConfig = new RestConfig(logger);

  const application: RestApplication = new RestApplication(logger, config);
  await application.init();
}

bootstrap();
