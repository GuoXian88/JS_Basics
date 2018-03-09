import { Module, Global } from '@nestjs/common';
import { CatsController } from './cats.controller';
import { CatsService } from './cats.service';

@Global()
//The @Module() decorator provides metadata, which Nest uses to organize the application structure.这是更大的架构
@Module({
    controllers: [CatsController],
    components: [CatsService],
    exports: [CatsService]
})
export class CatsModule {
    constructor(private readonly catsService: CatsService) {}
}