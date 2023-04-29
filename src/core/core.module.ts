import { Module } from '@nestjs/common';
//import { SequelizeModule } from '@nestjs/sequelize'

import { MeetupService } from './services/meetup.service';
import { TagService } from './services/tag.service';
import { RoleService } from './services/role.service';
import { UserService } from './services/user.service';

import { MeetupController } from './controllers/meetup.controller';
import { TagController } from './controllers/tag.controller';
import { RoleController } from './controllers/role.controller';
import { UserController } from './controllers/user.controller';

import { meetupsProviders } from './providers/meetups.providers';
import { tagsProviders } from './providers/tags.providers';
import { rolesProviders } from './providers/roles.providers';
import { usersProviders } from './providers/users.providers';

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
		RoleController,
		UserController,
	],
	providers: [
		MeetupService,
    	TagService,
		RoleService,
		UserService,
		...meetupsProviders,
		...tagsProviders,
		...rolesProviders,
		...usersProviders,
	],
	exports: [
		MeetupService,
    	TagService,
		RoleService,
		UserService,
	],
})
export class CoreModule {}