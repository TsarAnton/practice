import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm'
import { CoreModule } from './core/core.module';

@Module({
  imports: [CoreModule, TypeOrmModule.forRoot({
    type: 'postgres',
    host: 'localhost',
    port: 5432,
    username: 'postgres',
    password: '2003',
    database: 'practice_db',
    entities: ["./core/entities/*.entity{.ts,.js}"],
    autoLoadEntities: true,
    synchronize: true,
  })],
  controllers: [],
  providers: [],
})
export class AppModule {}
