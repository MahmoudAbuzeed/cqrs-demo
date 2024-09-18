import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CqrsModule } from '@nestjs/cqrs';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CreateUserHandler } from './commands/commands-handlers/create-user.handler';
import { GetUsersHandler } from './queries/get-users.handler';
import { User } from './entities/user.entity';
import { UserController } from './controllers/user.controller';
import { UpdateUserHandler } from './commands/commands-handlers/update-user.handler';
import { DeleteUserHandler } from './commands/commands-handlers/delete-user.handler';
import { UserEventListener } from './listeners/user.listeners';
import { EventEmitter2 } from '@nestjs/event-emitter';
import { EventStoreService } from './services/event-store.service';
import { Event } from './entities/event.entity';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mongodb',
      host: 'localhost',
      port: 27017,
      database: 'test',
      useNewUrlParser: true,
      useUnifiedTopology: true,
      entities: [User, Event],
      synchronize: true,
    }),
    TypeOrmModule.forFeature([User, Event]),
    CqrsModule,
  ],
  controllers: [AppController, UserController],
  providers: [
    AppService,
    CreateUserHandler,
    GetUsersHandler,
    UpdateUserHandler,
    DeleteUserHandler,
    UserEventListener,
    EventEmitter2,
    EventStoreService,
  ],
})
export class AppModule {}
