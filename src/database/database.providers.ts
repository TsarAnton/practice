
import { Sequelize } from 'sequelize-typescript';
import { Meetup } from 'src/core/entities/meetup.entity';
import { Tag } from 'src/core/entities/tag.entity';

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
      sequelize.addModels([Meetup, Tag]);
      await sequelize.sync();
      return sequelize;
    },
  },
];
