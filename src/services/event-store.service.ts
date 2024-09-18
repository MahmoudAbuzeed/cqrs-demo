import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Event } from '../entities/event.entity';

@Injectable()
export class EventStoreService {
  constructor(
    @InjectRepository(Event)
    private readonly eventRepository: Repository<Event>,
  ) {}

  async addEvent(
    eventType: string,
    payload: { id: string; name?: string; email?: string },
  ) {
    const event = this.eventRepository.create({
      eventType,
      payload: JSON.stringify(payload),
      createdAt: new Date(),
    });
    await this.eventRepository.save(event);
  }

  async getAllEvents() {
    return this.eventRepository.find();
  }
}
