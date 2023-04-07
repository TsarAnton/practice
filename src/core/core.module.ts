import { Module } from '@nestjs/common';
//import { SequelizeModule } from '@nestjs/sequelize'

import { MeetupService } from './services/meetup.service';
import { TagService } from './services/tag.service';

import { MeetupController } from './controllers/meetup.controller';
import { TagController } from './controllers/tag.controller';

import { meetupsProviders } from './providers/meetups.providers';
import { tagsProviders } from './providers/tags.providers';

@Module({
	imports: [
		// SequelizeModule.forFeature([
		// 	Meetup,
    	//  Tag,
		// ]),
	],
	controllers: [
		MeetupController,
		TagController,
	],
	providers: [
		MeetupService,
    	TagService,
		...meetupsProviders,
		...tagsProviders,
	],
	exports: [
		MeetupService,
    	TagService,
	],
})
export class CoreModule {}