
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
        host: 'localhost',
        port: 5432,
        username: 'postgres',
        password: '2003',
        database: 'practice_db',
      });
      sequelize.addModels([Meetup, Tag, User, Role]);
      await sequelize.sync();
      return sequelize;
    },
  },
];
