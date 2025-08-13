import { SystemUserRoles } from '@mfactory-be/commonTypes/global';
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

export enum UserStatus {
  ACTIVE = 'ACTIVE',
  INACTIVE = 'INACTIVE',
  BLOCKED = 'BLOCKED',
}

@Entity({ name: 'user_roles' })
export class UserRole {
  @PrimaryGeneratedColumn('uuid')
  id?: string;

  @Column({ nullable: false })
  userId: string;

  @Column({ nullable: false, type: 'enum', enum: SystemUserRoles })
  role: SystemUserRoles;

  /** Creation date */
  @CreateDateColumn()
  createdAt?: Date;

  /** Updating Date */
  @UpdateDateColumn()
  updatedAt?: Date;

  @ManyToOne(() => User, relation => relation.roles)
  @JoinColumn({ name: 'userId' })
  user?: User;

  constructor(payload?: OmitPartial<UserRole, 'createdAt' | 'updatedAt' | 'id' | 'user'>) {
    this.id = randomUUID();
    if (payload) {
      this.id = payload.id;
      this.userId = payload.userId ?? payload.user?.id;
      this.user = payload.user;
      this.role = payload.role;
    }
  }
}
