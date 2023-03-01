import {
	Column,
	DeleteDateColumn,
	Entity,
	OneToMany,
	PrimaryGeneratedColumn,
} from 'typeorm';

import { MeetupToTag } from './meetup-to-tag.entity';

@Entity({ name: 'meetups', engine: 'InnoDB' })
export class Meetup {
	@PrimaryGeneratedColumn()
	id: number;

	@Column({ length: 100 })
	name: string;

	@Column({ length: 100 })
	description: string;

    @Column({ type: 'timestamp' })
    time: Date;

    @Column({ length: 100 })
    place: string;

	@OneToMany(
		() => MeetupToTag,
		meetupToTag => meetupToTag.meetup,
	)
	meetupToTags: MeetupToTag[];

	@DeleteDateColumn({ name: 'deleted_at', type: 'timestamp' })
	deletedAt: Date;
}