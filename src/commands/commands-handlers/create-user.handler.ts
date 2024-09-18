import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { EventEmitter2 } from '@nestjs/event-emitter';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { EventStoreService } from 'src/services/event-store.service';
import { CreateUserCommand } from '../create-user.command';
import { UserCreatedEvent } from 'src/events/user.events';
import { User } from 'src/entities/user.entity';

@CommandHandler(CreateUserCommand)
export class CreateUserHandler implements ICommandHandler<CreateUserCommand> {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    private readonly eventEmitter: EventEmitter2,
    private readonly eventStoreService: EventStoreService,
  ) {}

  async execute(command: CreateUserCommand): Promise<void> {
    const { name, email } = command;
    const user = this.userRepository.create({ name, email });
    await this.userRepository.save(user);
    this.eventEmitter.emit(
      'user.created',
      new UserCreatedEvent(user.id, name, email),
    );
    await this.eventStoreService.addEvent('UserCreated', {
      id: String(user.id),
      name,
      email,
    });
  }
}
