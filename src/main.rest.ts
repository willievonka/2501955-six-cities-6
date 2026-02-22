import 'reflect-metadata';
import { Container } from 'inversify';
import { RestApplication } from './rest/index.js';
import { IConfig, RestConfig, RestSchema } from './shared/libs/config/index.js';
import { ILogger, PinoLogger } from './shared/libs/logger/index.js';
import { Component } from './shared/types/index.js';

async function bootstrap() {
  const container: Container = new Container();
  container.bind<RestApplication>(Component.RestApplication).to(RestApplication);
  container.bind<ILogger>(Component.Logger).to(PinoLogger).inSingletonScope();
  container.bind<IConfig<RestSchema>>(Component.Config).to(RestConfig);

  const application: RestApplication = container.get<RestApplication>(Component.RestApplication);
  await application.init();
}

bootstrap();
