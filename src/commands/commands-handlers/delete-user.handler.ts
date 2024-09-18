import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { DeleteUserCommand } from '../delete-user.command';
import { User } from 'src/entities/user.entity';
import { EventStoreService } from 'src/services/event-store.service';
import { EventEmitter2 } from '@nestjs/event-emitter';
import { UserDeletedEvent } from 'src/events/user.events';

@CommandHandler(DeleteUserCommand)
export class DeleteUserHandler implements ICommandHandler<DeleteUserCommand> {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    private readonly eventStoreService: EventStoreService,
    private readonly eventEmitter: EventEmitter2,
  ) {}

  async execute(command: DeleteUserCommand): Promise<void> {
    await this.userRepository.delete(command.id);
    this.eventEmitter.emit('user.created', new UserDeletedEvent(command.id));
    await this.eventStoreService.addEvent('UserDeleted', {
      id: command.id,
    });
  }
}
