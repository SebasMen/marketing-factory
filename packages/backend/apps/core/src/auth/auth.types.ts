import { ApiProperty } from '@nestjs/swagger';
import { UserStatus } from '../entities/UserRole';

/**
 * Interface representing the structure of an authentication payload.
 * It includes the user's email, name, object ID (oid), and tenant ID.
 */
export interface AuthPayload {
  email: string;
  name: string;
  oid: string;
  tenantId: string;
}

/**
 * Interface representing the structure of a JWT token payload.
 * It includes the subject (user ID), issuer (company), and roles.
 */
export interface AuthResponse {
  email: string;
  id: string;
  token: string;
}

/**
 * Interface representing a user object returned by the authentication service.
 * It includes the user's ID, email, status, last login date, and company information.
 */
export class IUser {
  @ApiProperty({ description: 'Unique identifier for the user', example: '123e4567-e89b-12d3-a456-426614174000' })
  id: string;

  @ApiProperty({ description: 'Email address of the user', example: 'random@email.com' })
  email: string;

  @ApiProperty({ description: 'Status of the user account', enum: UserStatus })
  status: UserStatus;

  @ApiProperty({ description: 'Date of the last login by the user', required: false })
  lastLogin?: Date;

  @ApiProperty({ description: 'Name of the company the user belongs to', example: 'Example Company' })
  companyName: string;

  @ApiProperty({ description: 'Unique identifier for the company the user belongs to', example: '123e4567-e89b-12d3-a456-426614174001' })
  companyId: string;
}
