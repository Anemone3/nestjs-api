import { CreateUserDto } from "src/user/domain/dto"
import { User } from "src/user/domain/user.entity"

//todo: make response
export interface AuthRepository{
    login(email:string, password:string):Promise<string>
    register(createUserDto: CreateUserDto):Promise<string>
    verifyUser(otp:string,email:string):Promise<User>
    refreshToken(token:string):Promise<string>
    logout(token:string):Promise<string>
}