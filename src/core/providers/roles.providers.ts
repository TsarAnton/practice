import { Role } from "../entities/role.entity";

export const meetupsProviders = [
  {
    provide: 'ROLES_REPOSITORY',
    useValue: Role,
  },
];