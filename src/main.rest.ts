import { RestApplication } from './rest/index.js';
import { PinoLogger } from './shared/libs/logger/index.js';

async function bootstrap() {
  const logger: PinoLogger = new PinoLogger();

  const application: RestApplication = new RestApplication(logger);
  await application.init();
}

bootstrap();
