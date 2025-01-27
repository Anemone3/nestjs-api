import { JpaRepository } from "src/utils/JpaRepository";
import { CreateUserDto } from "./dto/create-user.dto";
import { UpdateUserDto } from "./dto/update-user.dto";
import { User } from "./user.entity";


export interface UserRepository extends JpaRepository<User,string,CreateUserDto,UpdateUserDto>{
    findUserByEmail(email:string): Promise<User>;
}