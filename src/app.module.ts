import { Module } from '@nestjs/common';
import { CoreModule } from '../core.module';
import { DatabaseModule } from './database/database.module';
import { ConfigModule } from '@nestjs/config';
import { AuthModule } from './core/auth/auth.module';

@Module({
  imports: [
    CoreModule, 
    DatabaseModule, 
    AuthModule, 
    ConfigModule.forRoot({
      isGlobal: true,
    }
  )],
  controllers: [],
  providers: [],
})
export class AppModule {}
