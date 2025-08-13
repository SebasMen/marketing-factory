import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { CommonModule } from '../common/common.module';
import { CommonService } from '../common/common.service';
import { JwtStrategy } from '../guards/jwt-strategy';

@Module({
  imports: [
    PassportModule,
    JwtModule.registerAsync({
      imports: [CommonModule],
      inject: [CommonService],
      useFactory: async (commonService: CommonService) => ({
        secret: commonService.getEnv<string>('secret'),
        signOptions: { expiresIn: '1h' },
      }),
    }),
  ],
  controllers: [],
  providers: [JwtStrategy],
  exports: [PassportModule, JwtStrategy],
})
export class AuthModule {}
