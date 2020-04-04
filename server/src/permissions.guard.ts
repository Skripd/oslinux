import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Observable } from 'rxjs';
import { Reflector } from '@nestjs/core';

@Injectable()
export class PermissionsGuard implements CanActivate {
  constructor(private readonly reflector: Reflector) { }

  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const routePermissions = this.reflector.get<string[]>(
      'permissions',
      context.getHandler(),
    );

    // console.log('###PERMISSION GUARD###\n\n', context.getArgs()[2].req.user);

    const userPermissions = context.getArgs()[0]?.user['resource_access'];
    const userPermissionsGql = context.getArgs()[2]?.req?.user['resource_access'];

    if (!routePermissions) {
      return true;
    }

    const hasPermission = () =>
      routePermissions.every(routePermission =>
        userPermissions[routePermission.split(":")[0]].roles.includes(routePermission.split(":")[1]),
      );

    const hasPermissionGql = () =>
      routePermissions.every(routePermission =>
        userPermissionsGql[routePermission.split(":")[0]].roles.includes(routePermission.split(":")[1]),
      );

    if (userPermissions) {
      return hasPermission();
    } else {
      return hasPermissionGql();
    }
  }
}