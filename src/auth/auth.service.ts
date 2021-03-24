import { Injectable } from '@nestjs/common';
import {UserService} from "../user/service/user.service";
import {JwtService} from "@nestjs/jwt";
import {UserInterface} from "../user/interface/user.interface";

// eslint-disable-next-line @typescript-eslint/no-var-requires
const bcrypt = require('bcrypt');

@Injectable()
export class AuthService {

    constructor(private usersService: UserService,private jwtService: JwtService) {}

    comparePassword(newPassword: string, passwordHash: string) {
        return bcrypt.compare(newPassword, passwordHash);
    }

    generateJwt(user: UserInterface){
        return this.jwtService.sign(user);
    }
    async validateUser(email: string, pass: string): Promise<any> {
        const user = await this.usersService.findByEmail(email);
        if(user){
            if(this.comparePassword(pass, user.password)){
                // eslint-disable-next-line @typescript-eslint/no-unused-vars
                const { password, ...result } = user;
                return result;
            }
        }
        return null;
    }

    async login(user: UserInterface) {
        const payload  =  await this.usersService.findByEmail(user.email);
        return {
            access_token: this.generateJwt({
                name: payload.name,
                domain: payload.domain,
                email: payload.email,
                role: payload.role,
                occupation: payload.occupation
            }),
        };
    }

}
