import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { Meetup } from './entities/meetup.entity';
import { Tag } from './entities/tag.entity';
import { MeetupToTag } from './entities/meetup-to-tag.entity';

import { MeetupService } from './services/meetup.service';
import { TagService } from './services/tag.service';
import { MeetupToTagService } from './services/meetup-to-tag.service';

import { MeetupController } from './controllers/meetup.controller';
import { TagController } from './controllers/tag.controller';
import { MeetupToTagController } from './controllers/meetup-to-tag.controller';

@Module({
	imports: [
		TypeOrmModule.forFeature([
			Meetup,
    	    Tag,
        	MeetupToTag,
		]),
	],
	controllers: [
		MeetupController,
		MeetupToTagController,
		TagController,
	],
	providers: [
		MeetupService,
    	TagService,
	    MeetupToTagService,
	],
	exports: [
		MeetupService,
    	TagService,
	    MeetupToTagService,
	],
})
export class CoreModule {}