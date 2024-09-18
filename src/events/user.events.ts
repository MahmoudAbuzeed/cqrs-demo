import { ObjectId } from 'typeorm';

export class UserCreatedEvent {
  constructor(
    public readonly id: ObjectId,
    public readonly name: string,
    public readonly email: string,
  ) {}
}

export class UserUpdatedEvent {
  constructor(
    public readonly id: string,
    public readonly name?: string,
    public readonly email?: string,
  ) {}
}

export class UserDeletedEvent {
  constructor(public readonly id: string) {}
}
