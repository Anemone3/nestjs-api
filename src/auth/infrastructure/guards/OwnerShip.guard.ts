import { CanActivate, ExecutionContext, ForbiddenException } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Request } from 'express';
import { Observable } from 'rxjs';
import { Role, User } from 'src/user/domain/user.entity';


//Todo: enviar este guard al modulo de usuario, se encarga de verificar el param id y si el usuario 
// coindice con la peticion

export class OwnerShip implements CanActivate {
  constructor(private readonly reflector: Reflector) {}

  canActivate(context: ExecutionContext): boolean | Promise<boolean> | Observable<boolean> {
    const request = context.switchToHttp().getRequest<Request>();

    const user = request.user as User;

    const userIdFromRequest = request.params.id;


    if(userIdFromRequest === undefined) return false;

    if (!user) throw new ForbiddenException('Unathorized, No user found in request');

    if (user.role?.includes(Role.ADMIN) || user.id === userIdFromRequest) return true;

    throw new ForbiddenException('Unathorized, no eres el propietario para este endpoint');
  }
}
