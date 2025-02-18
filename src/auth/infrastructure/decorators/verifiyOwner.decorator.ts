import { SetMetadata } from "@nestjs/common";
import { KEY_USER_ID } from "../keys-reflector";


export const IsOwner = (id:string) => SetMetadata(KEY_USER_ID,id);