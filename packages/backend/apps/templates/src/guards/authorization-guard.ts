import { IToken, mapTokenRoleToSystemRole, SystemUserRoles } from '@mfactory-be/commonTypes/global';
import { CanActivate, ExecutionContext, Injectable, SetMetadata } from '@nestjs/common';
import { Reflector } from '@nestjs/core';

export const ROLES_KEY = 'roles';
export const Roles = (...roles: SystemUserRoles[]) => SetMetadata(ROLES_KEY, roles);

@Injectable()
export class AuthorizationGuard implements CanActivate {
  constructor(private reflector: Reflector) {}

  canActivate(context: ExecutionContext): boolean {
    const requiredRoles = this.reflector.getAllAndOverride<SystemUserRoles[]>(ROLES_KEY, [
      context.getHandler(),
      context.getClass(),
    ]);

    const [req] = context.getArgs();
    const tokenRoles = (req.user as IToken).rus;
    const rolesToValid = tokenRoles?.map(role => mapTokenRoleToSystemRole[role]);

    // Valid role Api
    return requiredRoles.some(role => rolesToValid?.includes(role));
  }
}
