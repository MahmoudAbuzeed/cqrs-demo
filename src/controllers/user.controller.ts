import {
  Controller,
  Post,
  Body,
  Get,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { CommandBus, QueryBus } from '@nestjs/cqrs';
import { CreateUserCommand } from 'src/commands/create-user.command';
import { DeleteUserCommand } from 'src/commands/delete-user.command';
import { UpdateUserCommand } from 'src/commands/update-user.command';
import { User } from 'src/entities/user.entity';
import { GetUsersQuery } from 'src/queries/get-users.query';
import { EventStoreService } from 'src/services/event-store.service';

@Controller('users')
export class UserController {
  constructor(
    private readonly commandBus: CommandBus,
    private readonly queryBus: QueryBus,
    private readonly eventStoreService: EventStoreService,
  ) {}

  @Post()
  async createUser(
    @Body() createUserDto: { name: string; email: string },
  ): Promise<void> {
    return this.commandBus.execute(
      new CreateUserCommand(createUserDto.name, createUserDto.email),
    );
  }

  @Get()
  async getUsers(): Promise<User[]> {
    return this.queryBus.execute(new GetUsersQuery());
  }

  @Patch(':id')
  async updateUser(
    @Param('id') id: string,
    @Body() updateUserDto: { name?: string; email?: string },
  ): Promise<void> {
    return this.commandBus.execute(
      new UpdateUserCommand(id, updateUserDto.name, updateUserDto.email),
    );
  }

  @Delete(':id')
  async deleteUser(@Param('id') id: string): Promise<void> {
    return this.commandBus.execute(new DeleteUserCommand(id));
  }

  @Get('events')
  async getEvents() {
    return this.eventStoreService.getAllEvents();
  }
}
