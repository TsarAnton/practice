
import { Tag } from "../entities/tag.entity";

export const tagsProviders = [
  {
    provide: 'TAGS_REPOSITORY',
    useValue: Tag,
  },
];