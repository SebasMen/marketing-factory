import { OmitPartial } from '@mfactory-be/utils/objects';
import { randomUUID } from '@mfactory-be/utils/random';
import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { User } from './User';

@Entity({ name: 'notifications' })
export class Notification {
  @PrimaryGeneratedColumn('uuid')
  id?: string;

  @Column({ nullable: false })
  email: string;

  @Column({ nullable: false })
  body: string;

  @Column({ nullable: false })
  title: string;

  @Column({ nullable: false })
  subject: string;

  @Column({ nullable: false })
  userId: string;

  @Column({ nullable: false, default: false })
  read: boolean;

  @Column({ type: 'date', nullable: true })
  sendAt?: Date;

  /** Creation date */
  @CreateDateColumn()
  createdAt?: Date;

  /** Updating Date */
  @UpdateDateColumn()
  updatedAt?: Date;

  @ManyToOne(() => User, relation => relation.notifications)
  @JoinColumn({ name: 'userId' })
  user?: User;

  constructor(payload?: OmitPartial<Notification, 'createdAt' | 'updatedAt' | 'id'>) {
    this.id = randomUUID();
    if (payload) {
      this.id = payload.id;
      this.email = payload.email;
      this.body = payload.body;
      this.title = payload.title;
      this.subject = payload.subject;
      this.user = payload.user;
      this.userId = payload.userId ?? payload.user?.id;
      this.read = payload.read;
      this.sendAt = payload.sendAt;
    }
  }
}
