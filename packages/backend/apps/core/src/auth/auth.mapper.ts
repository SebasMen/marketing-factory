import { User } from '../entities/User';
import { IUser } from './auth.types';

/**
 * Maps a User entity to an IUser response object.
 * This function extracts relevant fields from the User entity and returns an IUser object.
 * @param user User entity to map
 * @returns IUser object containing user details
 */
export const mapUserToResponse = (user: User): IUser => {
  return {
    id: user.id,
    email: user.email,
    status: user.status,
    lastLogin: user.lastLogin,
    companyName: user.company?.name,
    companyId: user.company?.id,
  };
};
