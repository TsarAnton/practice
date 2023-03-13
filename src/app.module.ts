import { Module } from '@nestjs/common';
import { CoreModule } from './core/core.module';
import { DatabaseModule } from './database/database.module';

@Module({
  imports: [CoreModule, DatabaseModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
