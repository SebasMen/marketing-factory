/**
 * Global types and interfaces for the @mfactory-be BE application.
 * This file contains definitions for environment configuration, database settings,
 */
export interface IEnvironment {
  port: number;
  database: IDatabase;
  secret: string;
}

/**
 * Interface representing the database configuration.
 */
export interface IDatabase {
  host: string;
  port: number;
  db_name: string;
  username: string;
  password: string;
}

/**
 * Enum representing the system user roles.
 * These roles define the permissions and access levels of users in the system.
 * - ADMIN: Full access to the system.
 * - USER: Regular user with standard permissions.
 * - COMMERCIAL: User with commercial permissions.
 * - SYSTEM: System-level user with special permissions.  
 */
export enum SystemUserRoles {
  ADMIN = 'ADMIN',
  USER = 'USER',
  COMMERCIAL = 'COMMERCIAL',
  SYSTEM = 'SYSTEM',
}

/**
 * Enum representing the roles in the JWT token.
 * These roles are used to define the permissions and access levels of users in the system.
 */
export enum TokenRoles {
  AD = 'AD',
  US = 'US',
  CM = 'CM',
  SM = 'SM',
}

/**
 * Interface for the JWT token payload.
 * It includes the subject (sub), issuer (ius), and roles (rus).
 */
export interface IToken {
  sub: string;
  ius: string;
  rus: TokenRoles[];
}

/**
 * Interface for Azure user information.
 */
export interface IAzureUser {
  id: string;
  displayName: string;
  email: string;
  exp: number;
  azureId: string;
  tenantId: string;
}
