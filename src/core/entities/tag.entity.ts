import { 
	Column, 
	DeleteDateColumn, 
	Entity, 
	OneToMany, 
	PrimaryGeneratedColumn 
} from 'typeorm';

import { MeetupToTag } from './meetup-to-tag.entity';

@Entity({ name: 'tags', engine: 'InnoDB' })
export class Tag {
	@PrimaryGeneratedColumn()
	id: number;

	@Column({ length: 50 })
	name: string;

	@OneToMany(
		() => MeetupToTag,
		meetupToTag => meetupToTag.tag,
	)
	meetupToTags: MeetupToTag[];

	@DeleteDateColumn({ name: 'deleted_at', type: 'timestamp' })
	deletedAt: Date;
}