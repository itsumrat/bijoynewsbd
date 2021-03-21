import {Controller, Request, Post, UseGuards, Body} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import {UserService} from "../user/service/user.service";
import {AuthService} from "./auth.service";
import {UserInterface} from "../user/interface/user.interface";

@Controller('auth')
export class AuthController {
    constructor(
        private userService: UserService,
        private authService: AuthService
    ){}
    @UseGuards(AuthGuard('local'))
    @Post('login')
    async login(@Body() user: UserInterface) {
        return this.authService.login(user)
    }

    @Post('signup')
    async signup(@Body() body: any) {
        return this.userService.create(body);
    }
}
