import {Body, Controller, Delete, Get, Param, Post, Put} from '@nestjs/common';
import {UserService} from "../service/user.service";

@Controller('user')
export class UserController {
    constructor(private userService: UserService) {}
    @Get()
    findAll(){
        return this.userService.findAll();
    }
    @Get(':id')
    findOne(@Param() id: number){
        return this.userService.findOne(id);
    }

    @Post()
    create(@Body() body: any){
        return this.userService.create(body);
    }

    @Put(':id')
    update(@Param() id: number, @Body() body: any){
        return this.userService.update(id, body);
    }

    @Delete(':id')
    deleteOne(@Param() id: number){
        return this.userService.deleteOne(id);
    }
}
