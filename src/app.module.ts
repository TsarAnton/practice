import { Module } from '@nestjs/common';
import { CoreModule } from './core/core.module';
import { DatabaseModule } from './database/database.module';
import { AuthModule } from './core/auth/auth.module';

@Module({
  imports: [CoreModule, DatabaseModule, AuthModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
