import { OmitPartial } from '@mfactory-be/utils/objects';
import { randomUUID } from '@mfactory-be/utils/random';
import {
  Column,
  CreateDateColumn,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { User } from './User';

export enum AuditType {
  USER = 'USER',
  NOTIFICATION = 'NOTIFICATION',
  TEMPLATE = 'TEMPLATE',
}

export enum AuditAction {
  DELETE = 'DELETE',
  UPDATE = 'UPDATE',
}

@Entity({ name: 'audits' })
export class Audit {
  @PrimaryGeneratedColumn('uuid')
  id?: string;

  @Column({ nullable: false })
  userId: string;

  @Column({ nullable: false, type: 'enum', enum: AuditType })
  type: AuditType;

  @Column({ nullable: false, type: 'enum', enum: AuditAction })
  action: AuditAction;

  /** Relation with entity register action */
  @Column({ nullable: false })
  @Index()
  actionId: string;

  /** Creation date */
  @CreateDateColumn()
  createdAt?: Date;

  /** Updating Date */
  @UpdateDateColumn()
  updatedAt?: Date;

  @ManyToOne(() => User, relation => relation.audits)
  @JoinColumn({ name: 'userId' })
  user?: User;

  constructor(payload?: OmitPartial<Audit, 'createdAt' | 'updatedAt' | 'id'>) {
    this.id = randomUUID();
    if (payload) {
      this.id = payload.id;
      this.user = payload.user;
      this.userId = payload.userId ?? payload.user?.id;
      this.type = payload.type;
      this.action = payload.action;
      this.actionId = payload.actionId;
    }
  }
}
