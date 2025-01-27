import { Inject, Injectable } from '@nestjs/common';
import { AuthRepository } from '../domain/auth.repository';
import { CreateUserDto } from 'src/user/domain/dto';

@Injectable()
export class AuthService {
    constructor(
        @Inject('AuthRepository')
        private authRepository:AuthRepository
    ){}

    async login(email:string, password:string){
        return await this.authRepository.login(email, password);
    }


    async register(createUserDto:CreateUserDto){
        return await this.authRepository.register(createUserDto);
    }
}
