import { Middleware, NestMiddleware, ExpressMiddleware } from '@nestjs/common';

@Middleware()
export class LoggerMiddleware implements NestMiddleware {
  async resolve(name: string): Promise<ExpressMiddleware> {
    let someAsyncFn = () => {
      process.nextTick(() => { console.log('just async next tick!')})
    }
    
    await someAsyncFn()

    return async (req, res, next) => {
      await someAsyncFn()
      console.log(`[${name}] Request...`); // [ApplicationModule] Request...
      next();
    };
  }
}