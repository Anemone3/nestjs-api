import { createParamDecorator, ExecutionContext, ForbiddenException } from "@nestjs/common";
import { Request } from "express";




export const UserActive = createParamDecorator((data,ctx:ExecutionContext)=>{
    
    const req = ctx.switchToHttp().getRequest<Request>();


    const { user } = req;

    if(!user) throw new ForbiddenException();

    return user;
})