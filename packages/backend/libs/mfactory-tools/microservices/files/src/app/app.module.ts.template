import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { appConfig, validationSchema } from '../common/app.config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CommonModule } from '../common/common.module';
import { DatabaseConfigService } from '../database/db-connection';

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
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
