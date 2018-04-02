import { Module, NestModule, MiddlewaresConsumer, RequestMethod } from '@nestjs/common';
import { LoggerMiddleware } from './common/middlewares/logger.middleware';
import { AppController } from './app.controller';
import { CatsModule } from './cats/cats.module';
import { CatsController } from './cats/cats.controller';


//Defines  AppModule, the root module of the application.
//In Nest, modules are singletons by default, thus you can share the same instance of the component between 2..* modules without any effort.
@Module({
  imports: [CatsModule],
})
export class ApplicationModule implements NestModule {
  configure(consumer: MiddlewaresConsumer): void {
      consumer.apply(LoggerMiddleware)
      .with('ApplicationModule')
      .forRoutes(
        CatsController
      );
  }
}
