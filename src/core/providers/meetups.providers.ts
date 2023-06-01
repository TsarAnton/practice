import { Meetup } from "../entities/meetup.entity";

export const meetupsProviders = [
  {
    provide: 'MEETUPS_REPOSITORY',
    useValue: Meetup,
  },
];
