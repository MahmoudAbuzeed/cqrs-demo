import { OnEvent } from '@nestjs/event-emitter';
import {
  UserCreatedEvent,
  UserUpdatedEvent,
  UserDeletedEvent,
} from '../events/user.events';

export class UserEventListener {
  @OnEvent('user.created')
  handleUserCreated(event: UserCreatedEvent) {
    console.log(`User created: ${event.id}, ${event.name}, ${event.email}`);
    // Additional logic, like persisting to an event store, can be added here.
  }

  @OnEvent('user.updated')
  handleUserUpdated(event: UserUpdatedEvent) {
    console.log(`User updated: ${event.id}, ${event.name}, ${event.email}`);
  }

  @OnEvent('user.deleted')
  handleUserDeleted(event: UserDeletedEvent) {
    console.log(`User deleted: ${event.id}`);
  }
}
