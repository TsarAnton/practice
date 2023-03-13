import { Module } from '@nestjs/common';

import { MeetupService } from './services/meetup.service';
import { TagService } from './services/tag.service';
//import { MeetupToTagService } from './services/meetup-to-tag.service';

import { MeetupController } from './controllers/meetup.controller';
import { TagController } from './controllers/tag.controller';
//import { MeetupToTagController } from './controllers/meetup-to-tag.controller';

import { meetupsProviders } from './providers/meetups.providers';
import { tagsProviders } from './providers/tags.providers';

@Module({
	imports: [
		// SequelizeModule.forFeature([
		// 	Meetup,
    	//     Tag,
        // 	//MeetupToTag,
		// ]),
	],
	controllers: [
		MeetupController,
		//MeetupToTagController,
		TagController,
	],
	providers: [
		MeetupService,
    	TagService,
		...meetupsProviders,
		...tagsProviders,
	    //MeetupToTagService,
	],
	exports: [
		MeetupService,
    	TagService,
	    //MeetupToTagService,
	],
})
export class CoreModule {}