import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { CommonService } from './common.service';
import { DatabaseConfigService } from '../database/db-connection';

@Module({
  imports: [ConfigModule.forRoot()],
  providers: [CommonService, DatabaseConfigService],
  exports: [CommonService, DatabaseConfigService],
})
export class CommonModule {}
