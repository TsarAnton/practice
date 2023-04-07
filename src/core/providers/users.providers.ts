import { User } from "../entities/user.entity";

export const meetupsProviders = [
  {
    provide: 'USERS_REPOSITORY',
    useValue: User,
  },
];