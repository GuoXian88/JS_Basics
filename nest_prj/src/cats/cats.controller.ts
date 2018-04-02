import { Controller, Get, Req, Post, HttpCode, Param, Body } from '@nestjs/common'
import { CreateCatDto } from './dto/create-cat.dto';
import { CatsService } from './cats.service';
import { Cat } from './interfaces/cat.interface';

@Controller('cats')
//The controllers should only handle HTTP requests and delegate more complex tasks to the components(here CatsService). The components are plain TypeScript classes with a @Component() decorator.
export class CatsController {
    //在这赋值component
    //Nest is built around the strong design pattern commonly known as Dependency Injection.怎么理解?
    constructor(private readonly catsService: CatsService) {}

    @HttpCode(204)
    @Post()
    async create(@Body() createCatDto: CreateCatDto) {
        this.catsService.create(createCatDto)
    }

    //get decrator on findAll tells Nest to create an endpoint for this route path and map every corresponding request to this handler. Since we declared a prefix for every route (cats), Nest will map every /cats GET request to this method.
    @Get()
    async findAll():Promise<Cat[]> {
        return this.catsService.findAll()
    }

    @Get(':id')
    findOne(@Param() params) {
        console.log(params.id)
        return {}
    }
}