import { PermissionManager } from './PermissionManager';

export interface IPermission
{
    hasAllPermissions(): boolean;
    hasPermission(permission: string): boolean;
    id: number;
    manager: PermissionManager;
}