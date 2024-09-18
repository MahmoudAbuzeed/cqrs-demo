import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/entities/user.entity';
import { UpdateUserCommand } from '../update-user.command';
import { EventEmitter2 } from '@nestjs/event-emitter';
import { UserUpdatedEvent } from 'src/events/user.events';
import { EventStoreService } from 'src/services/event-store.service';

@CommandHandler(UpdateUserCommand)
export class UpdateUserHandler implements ICommandHandler<UpdateUserCommand> {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    private readonly eventEmitter: EventEmitter2,
    private readonly eventStoreService: EventStoreService,
  ) {}

  async execute(command: UpdateUserCommand): Promise<void> {
    const { id, name, email } = command;
    await this.userRepository.update(id, { name, email });
    this.eventEmitter.emit('user.updated', new UserUpdatedEvent(command.id));
    await this.eventStoreService.addEvent('UserUpdated', {
      id: command.id,
      name,
    });
  }
}
