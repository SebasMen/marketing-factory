import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from '../auth/auth.module';
import { appConfig, validationSchema } from '../common/app.config';
import { CommonModule } from '../common/common.module';
import { DatabaseConfigService } from '../database/db-connection';
import { AppController } from './app.controller';
import { AppService } from './app.service';

@Module({
  imports: [
    // Init config nest environments
    ConfigModule.forRoot({
      load: [appConfig],
      validationSchema: validationSchema,
      envFilePath: ['.env'],
      isGlobal: true,
    }),

    // Connection database
    TypeOrmModule.forRootAsync({
      imports: [CommonModule],
      useClass: DatabaseConfigService,
    }),

    AuthModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
