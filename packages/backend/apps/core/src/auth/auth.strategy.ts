/* eslint-disable @typescript-eslint/no-explicit-any */
import { Injectable } from '@nestjs/common';
import { AuthGuard, PassportStrategy } from '@nestjs/passport';
import { OIDCStrategy } from 'passport-azure-ad';

@Injectable()
export class AzureStrategy extends PassportStrategy(OIDCStrategy, 'azure') {
  constructor() {
    super({
      identityMetadata: `https://login.microsoftonline.com/common/v2.0/.well-known/openid-configuration`,
      clientID: process.env.AZURE_CLIENT_ID,
      responseType: 'code',
      responseMode: 'query',
      redirectUrl: `${process.env.API_URL}/core/auth/redirect`,
      allowHttpForRedirectUrl: true,
      clientSecret: process.env.AZURE_CLIENT_SECRET,
      validateIssuer: false,
      passReqToCallback: false,
      loggingLevel: 'info',
      scope: ['profile', 'email', 'openid'],
    });
  }

  async validate(profile: any, done: any): Promise<any> {
    const user = {
      id: profile.oid,
      displayName: profile.displayName,
      email: profile._json.email ?? profile._json.preferred_username,
      azureId: profile._json.oid,
      tenantId: profile._json.tid,
    };
    done(null, user);
  }
}

@Injectable()
export class AzureLoginGuard extends AuthGuard('azure') {}