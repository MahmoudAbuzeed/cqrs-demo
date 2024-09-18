import { Entity, ObjectIdColumn, ObjectId, Column } from 'typeorm';

@Entity()
export class Event {
  @ObjectIdColumn()
  id: ObjectId;

  @Column()
  eventType: string;

  @Column()
  payload: string;

  @Column()
  createdAt: Date;
}
