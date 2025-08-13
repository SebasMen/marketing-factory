import { isProdEnv } from './env';
import { SystemUserRoles, TokenRoles } from './global';

/**
 * Token expiration time based on the environment.
 * In non-production environments, it is set to 48 hours for testing purposes.
 * In production, it is set to 24 hours for security reasons.
 */
export const TOKEN_EXPIRATION_TIME = !isProdEnv() ? '48h' : '24h';

/**
 * Interface for the payload of the JWT token.
 * It extends the IToken interface to include additional user information.
 */
export const mapTokenRoleToSystemRole = {
  [TokenRoles.AD]: SystemUserRoles.ADMIN,
  [TokenRoles.US]: SystemUserRoles.USER,
  [TokenRoles.CM]: SystemUserRoles.COMMERCIAL,
  [TokenRoles.SM]: SystemUserRoles.SYSTEM,
};

/**
 * Maps system roles to token roles.
 * This mapping is used to convert system roles into token roles for JWT generation.
 */
export const mapSystemRoleToTokenRole = {
  [SystemUserRoles.ADMIN]: TokenRoles.AD,
  [SystemUserRoles.USER]: TokenRoles.US,
  [SystemUserRoles.COMMERCIAL]: TokenRoles.CM,
  [SystemUserRoles.SYSTEM]: TokenRoles.SM,
};
