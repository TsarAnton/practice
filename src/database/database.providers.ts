
import { Sequelize } from 'sequelize-typescript';
import { Meetup } from 'src/core/entities/meetup.entity';
import { Role } from 'src/core/entities/role.entity';
import { Tag } from 'src/core/entities/tag.entity';
import { User } from 'src/core/entities/user.entity';

export const databaseProviders = [
  {
    provide: 'SEQUELIZE',
    useFactory: async () => {
      const sequelize = new Sequelize({
        dialect: 'postgres',
        host: process.env.POSTGRES_DB_HOST || 'localhost',
        port: Number.parseInt(process.env.POSTGRES_DB_PORT || '5432', 10),
        username: process.env.POSTGRES_DB_USERNAME || 'postgres',
        password: process.env.POSTGRES_DB_PASSWORD || 'root',
        database: process.env.POSTGRES_DB_NAME || 'database',
      });
      sequelize.addModels([Meetup, Tag, User, Role]);
      await sequelize.sync();
      return sequelize;
    },
  },
];
