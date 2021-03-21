import { Module } from '@nestjs/common';
import {UserController} from "./controller/user.controller";
import {UserService} from "./service/user.service";
import { UserEntity } from './model/user.entity';
import {TypeOrmModule} from "@nestjs/typeorm";
import {JwtModule} from "@nestjs/jwt";
import {PassportModule} from "@nestjs/passport";
import {JwtStrategy} from "../auth/jwt.strategy";

@Module({
    imports: [
        TypeOrmModule.forFeature([UserEntity]),
        PassportModule,
        JwtModule.register({
            secret: 'bijoynews',
            signOptions: { expiresIn: '2 days' },
        }),
    ],
    providers: [UserService, JwtStrategy],
    exports: [UserService],
    controllers: [UserController],
})
export class UserModule {

}
