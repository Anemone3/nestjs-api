import { User } from "src/user/domain/user.entity";



export interface AuthResponse{
    user: User,
    accessToken:string,
    refreshToken:string
}