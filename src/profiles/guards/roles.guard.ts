import { CanActivate, ExecutionContext, HttpException, HttpStatus, Injectable, UnauthorizedException } from "@nestjs/common";
import { Reflector } from "@nestjs/core";
import { Role } from '../entities/role.entity';
import {Observable} from "rxjs";
import { JwtService } from "@nestjs/jwt";
import { title } from "process";

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private jwtService: JwtService, 
    private reflector: Reflector) {}
    
  canActivate(context: ExecutionContext): boolean | Promise<boolean> | Observable<boolean> {
    try {
      const requiredRoles = this.reflector.getAllAndOverride<Role[]>('roles', [
        context.getHandler(),
        context.getClass(),
      ]); 
      if(!requiredRoles) {
        return true;    
      }
      console.log(requiredRoles); 
      const req = context.switchToHttp().getRequest();
      const authHeader = req.headers.authorization;
      const bearer = authHeader.split(' ')[0];
      const token = authHeader.split(' ')[1];
      if (bearer !== 'Bearer' || !token) {
        throw new UnauthorizedException({message: 'Пользователь не авторизован'})
      }
      const user = this.jwtService.verify(token);
      req.user = user;
      return user.roles.some(role => requiredRoles.includes(role.title));
    }  catch (e) {
      console.log(e);
      throw new HttpException( 'No access', HttpStatus.FORBIDDEN)
    }
  }
}