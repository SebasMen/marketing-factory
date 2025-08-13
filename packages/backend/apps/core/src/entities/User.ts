import { OmitPartial } from '@mfactory-be/utils/objects';
import { randomUUID } from '@mfactory-be/utils/random';
import {
  Column,
  CreateDateColumn,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Audit } from './Audit';
import { Company } from './Company';
import { Notification } from './Notification';
import { UserRole } from './UserRole';

export enum UserStatus {
  ACTIVE = 'ACTIVE',
  INACTIVE = 'INACTIVE',
  BLOCKED = 'BLOCKED',
}

@Entity({ name: 'users' })
export class User {
  @PrimaryGeneratedColumn('uuid')
  id?: string;

  @Column({ nullable: false })
  @Index()
  email: string;

  @Column({ nullable: true })
  password?: string;

  @Column({ nullable: false })
  azureId: string;

  @Column({ nullable: false })
  companyId: string;

  @Column({ nullable: false, type: 'enum', enum: UserStatus })
  status: UserStatus;

  @Column({ nullable: false, default: 0 })
  loginAttempt: number;

  @Column({ type: 'date', nullable: true })
  lastLogin?: Date;

  /** Creation date */
  @CreateDateColumn()
  createdAt?: Date;

  /** Updating Date */
  @UpdateDateColumn()
  updatedAt?: Date;

  @ManyToOne(() => Company, relation => relation.users)
  @JoinColumn({ name: 'companyId' })
  company?: Company;

  @OneToMany(() => Notification, relation => relation.user)
  notifications?: Notification[];

  @OneToMany(() => Audit, relation => relation.user)
  audits?: Audit[];

  @OneToMany(() => UserRole, relation => relation.user)
  roles?: UserRole[];

  constructor(payload?: OmitPartial<User, 'createdAt' | 'updatedAt' | 'id' | 'notifications' | 'audits' | 'roles'>) {
    this.id = randomUUID();
    if (payload) {
      this.id = payload.id;
      this.company = payload.company;
      this.companyId = payload.companyId ?? payload.company?.id;
      this.email = payload.email;
      this.password = payload.password;
      this.azureId = payload.azureId;
      this.status = payload.status;
      this.loginAttempt = payload.loginAttempt;
      this.lastLogin = payload.lastLogin;
      this.roles = payload.roles;
    }
  }
}
