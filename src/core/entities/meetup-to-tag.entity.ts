// import { 
// 	DeleteDateColumn, 
// 	Entity, 
// 	JoinColumn, 
// 	ManyToOne, 
// 	PrimaryGeneratedColumn 
// } from 'typeorm';

// import { Meetup } from './meetup.entity';
// import { Tag } from './tag.entity';

// @Entity({ name: 'meetup_to_tag', engine: 'InnoDB' })
// export class MeetupToTag {
// 	@PrimaryGeneratedColumn()
// 	id: number;

// 	@ManyToOne(
// 		() => Tag,
// 		tag => tag.meetupToTags,
// 	)
// 	@JoinColumn({ name: 'tag_id', referencedColumnName: 'id' })
// 	tag: Tag;

// 	@ManyToOne(
// 		() => Meetup,
// 		meetup => meetup.meetupToTags,
// 	)
// 	@JoinColumn({ name: 'meetup_id', referencedColumnName: 'id' })
// 	meetup: Meetup;

// 	@DeleteDateColumn({ name: 'deleted_at', type: 'timestamp' })
// 	deletedAt: Date;
// }