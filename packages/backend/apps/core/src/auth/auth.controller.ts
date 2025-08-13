import { ApiErrorsDocs, GlobalErrors, SystemUserRoles } from '@mfactory-be/commonTypes/global';
import { Controller, Get, Req, Res, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiOkResponse, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from '../entities/User';
import { AuthorizationGuard, Roles } from '../guards/authorization-guard';
import { AuthenticationGuard } from '../guards/jwt-strategy';
import { AuthErrors } from './auth.errors';
import { AuthService } from './auth.service';
import { AzureLoginGuard } from './auth.strategy';
import { IUser } from './auth.types';

@ApiTags('Authentication')
@Controller('auth')
export class AuthController {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    private readonly authService: AuthService,
  ) {}

  @ApiOperation({ summary: 'Get information from token' })
  @ApiBearerAuth('authorization')
  @ApiOkResponse({
    description: 'User information related to the token',
    type: IUser,
  })
  @ApiErrorsDocs(GlobalErrors.INTERNAL_SERVER_ERROR(), GlobalErrors.UNAUTHORIZED())
  @UseGuards(AuthenticationGuard, AuthorizationGuard)
  @Roles(SystemUserRoles.ADMIN, SystemUserRoles.USER)
  @Get('token')
  async getTokenInfo(@Req() req, @Res() res) {
    const { manager } = this.userRepository;
    const response = await this.authService.getTokenInfo(req.user, manager);
    return res.status(200).json(response);
  }

  @ApiOperation({ summary: 'Init login process' })
  @UseGuards(AzureLoginGuard)
  @Get('login')
  async login() {
    // This function does not carry anything, as it automatically redirects to Azure.
  }

  @ApiOperation({ summary: 'Process Azure authentication' })
  @ApiResponse({ status: 301, description: 'Redirect to app url redirect' })
  @ApiErrorsDocs(AuthErrors.AUTH_UNAUTHORIZED(), AuthErrors.AUTH_CLIENT_NOT_BELONG_TO_COMPANY())
  @UseGuards(AzureLoginGuard)
  @Get('redirect')
  async redirect(@Req() req, @Res() res) {
    const { manager } = this.userRepository;
    const token = await manager.transaction(async trManager => {
      return await this.authService.login(req.user, trManager);
    });
    return res.redirect(`${process.env.APPLICATION_URL}/login/success?token=${token}`);
  }
}
