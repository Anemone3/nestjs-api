import { CreateUserDto } from "src/user/domain/dto"

//todo: make response
export interface AuthRepository{
    login(email:string, password:string):Promise<string>
    register(createUserDto: CreateUserDto):Promise<string>
    validateToken(token:string):Promise<string>
    refreshToken(token:string):Promise<string>
    logout(token:string):Promise<string>
}