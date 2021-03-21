import {HttpException, HttpStatus, Injectable} from '@nestjs/common';
import {InjectRepository} from "@nestjs/typeorm";
import {UserEntity} from "../model/user.entity";
import {Repository} from "typeorm";
import { UserInterface } from '../interface/user.interface';
import {JwtService} from "@nestjs/jwt";

// eslint-disable-next-line @typescript-eslint/no-var-requires
const bcrypt = require('bcrypt');

@Injectable()
export class UserService {
    constructor(
        @InjectRepository(UserEntity)
        private userRepository: Repository<UserEntity>,
        private jwtService: JwtService,
    ){}


    hashPassword(password: string) {
        return bcrypt.hash(password, 12);
    }



    findAll(){
        return this.userRepository.find({relations: ['stories']});
    }

    findOne(id: number){
        return this.userRepository.findOne(id);
    }

    findByEmail(email: string){
        return this.userRepository.findOne({email});
    }

    async create(body: UserInterface){
        const newUser = new UserEntity();
        newUser.name = body.name;
        // newUser.username = user.username;
        newUser.email = body.email;
        newUser.password = await this.hashPassword(body.password);

        return this.userRepository.save(newUser).then(res=>{
            // eslint-disable-next-line @typescript-eslint/no-unused-vars
           const {password, ...result}= res;
            return result;
        });
    }

    update(id: number, body: any){
        return this.userRepository.save({...body, id: id});
    }

    deleteOne(id: number){
        return this.userRepository.delete(id);
    }
}
