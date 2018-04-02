import { NestFactory } from '@nestjs/core';
import { ApplicationModule } from './app.module';

//entry file of app
async function bootstrap() {
	
	// -- this is a test
	const resolver = (msg, timeout) => new Promise((resolve) => {
		console.log(msg);
		setTimeout(resolve, timeout);
	});
	resolver('First', 500)
		.then(() => resolver('Second', 500))
		.then(() => resolver('Third', 1000))
		.then(() => resolver('Fourth', 500));
	// -- this is a test

	// debugger
	//create Nest app instance
	const app = await NestFactory.create(ApplicationModule);
	await app.listen(3000);
}
bootstrap();
