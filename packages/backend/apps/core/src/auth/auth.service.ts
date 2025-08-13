import {
  ApplicationError,
  IAzureUser,
  IToken,
  mapSystemRoleToTokenRole,
  SystemUserRoles,
  TOKEN_EXPIRATION_TIME,
} from '@mfactory-be/commonTypes/global';
import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import _ from 'lodash';
import { EntityManager } from 'typeorm';
import { Company } from '../entities/Company';
import { User, UserStatus } from '../entities/User';
import { UserRole } from '../entities/UserRole';
import { AuthErrors } from './auth.errors';
import { mapUserToResponse } from './auth.mapper';
import { IUser } from './auth.types';

// TODO recover from DB
const allowDomains = ['antpack.co'];

@Injectable()
export class AuthService {
  constructor(private jwtService: JwtService) {}

  /**
   * Generates a JWT token with the provided user information.
   * @param {string} args.id - User ID.
   * @param {UserRole[]} args.roles - User roles.
   * @param {string} args.company - Company name.
   * @param {string | number} args.exp - Token expiration time.
   * @returns {Promise<string>} - The generated JWT token.
   */
  async generateToken(args: {
    id: string;
    roles: UserRole[];
    company: string;
    exp: string | number;
  }): Promise<string> {
    const { id, roles, company, exp } = args;
    const payload: IToken = {
      sub: id,
      ius: company,
      rus: roles.map(({ role }) => mapSystemRoleToTokenRole[role]),
    };
    return this.jwtService.sign(payload, { expiresIn: exp });
  }

  /**
   * Retrieves user information based on the provided token.
   * It fetches the user from the database using the provided user ID and returns the mapped user response.
   * @param user User object containing user details.
   * @param manager EntityManager instance for database operations.
   * @throws {ApplicationError} If the user is not found in the database.
   * @returns {IUser} Mapped user response containing user details.
   */
  async getTokenInfo(user: IToken, manager: EntityManager): Promise<IUser> {
    const userInfo = await manager.findOne(User, {
      where: { id: user.sub },
      relations: ['roles'],
    });
    if (!userInfo) throw new ApplicationError(AuthErrors.AUTH_USER_NOT_FOUND(user.sub));

    return mapUserToResponse(userInfo);
  }

  /**
   * Login method to authenticate user and generate JWT token.
   * @param {IAzureUser} userInfo - User object containing user details.
   * @returns AuthResponse containing the JWT token.
   */
  async login(userInfo: IAzureUser, manager: EntityManager): Promise<string> {
    const domain = userInfo.email.split('@')[1];

    // Validate email domain
    if (!allowDomains.includes(domain)) throw new ApplicationError(AuthErrors.AUTH_UNAUTHORIZED());

    let [company, user] = await Promise.all([
      manager.findOne(Company, { where: { domain } }),
      manager.findOne(User, { where: { email: userInfo.email }, relations: ['company', 'roles'] }),
    ]);

    // Validate if user belongs to the correct company
    if (user?.company && user.company.domain !== domain)
      throw new ApplicationError(AuthErrors.AUTH_CLIENT_NOT_BELONG_TO_COMPANY());

    // Add company
    if (!company) {
      const domainParts = domain.split('.');
      if (domainParts.length > 1) domainParts.pop();
      const companyName = domainParts.map(part => _.startCase(part)).join(' ');

      company = await manager.save(Company, {
        domain,
        name: companyName,
        azureId: userInfo.tenantId,
      });
    }

    // Save user
    if (!user) {
      user = await manager.save(User, {
        email: userInfo.email,
        azureId: userInfo.azureId,
        companyId: company.id,
        status: UserStatus.ACTIVE,
        lastLogin: new Date(),
      });
      const role = await manager.save(UserRole, {
        userId: user.id,
        role: SystemUserRoles.USER,
      });
      user.roles = [role];
    }

    return await this.generateToken({
      id: user.id,
      roles: user.roles,
      company: company.name,
      exp: TOKEN_EXPIRATION_TIME,
    });
  }
}
