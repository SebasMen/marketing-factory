import { Module } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from '../entities/User';
import { AuthController } from './auth.controller';
import { AzureStrategy } from './auth.strategy';
import { JwtModule } from '@nestjs/jwt';
import { CommonModule } from '../common/common.module';
import { CommonService } from '../common/common.service';
import { AuthService } from './auth.service';
import { JwtStrategy } from '../guards/jwt-strategy';

@Module({
  imports: [
    PassportModule,
    TypeOrmModule.forFeature([User]),
    JwtModule.registerAsync({
      imports: [CommonModule],
      inject: [CommonService],
      useFactory: async (commonService: CommonService) => ({
        secret: commonService.getEnv<string>('secret'),
        signOptions: { expiresIn: '1h' },
      }),
    }),
  ],
  controllers: [AuthController],
  providers: [AuthService, AzureStrategy, JwtStrategy],
  exports: [PassportModule, JwtStrategy],
})
export class AuthModule {}
