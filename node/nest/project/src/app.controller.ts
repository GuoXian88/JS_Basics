import { Get, Controller } from '@nestjs/common';

//Basic controller sample with a single route.
@Controller()
export class AppController {
	@Get()
	root(): string {
    return 'Hello World!';
  }
}
