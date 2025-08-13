import { OmitPartial } from '@mfactory-be/utils/objects';
import { randomUUID } from '@mfactory-be/utils/random';
import { Column, CreateDateColumn, Entity, OneToMany, PrimaryGeneratedColumn, Unique, UpdateDateColumn } from 'typeorm';
import { User } from './User';

@Entity({ name: 'companies' })
@Unique(['domain'])
export class Company {
  @PrimaryGeneratedColumn('uuid')
  id?: string;

  @Column({ nullable: false })
  domain: string;

  @Column({ nullable: false })
  name: string;

  @Column({ nullable: false })
  azureId: string;

  /** Creation date */
  @CreateDateColumn()
  createdAt?: Date;

  /** Updating Date */
  @UpdateDateColumn()
  updatedAt?: Date;

  @OneToMany(() => User, relation => relation.company)
  users?: User[];

  constructor(payload?: OmitPartial<Company, 'createdAt' | 'updatedAt' | 'id' | 'users'>) {
    this.id = randomUUID();
    if (payload) {
      this.id = payload.id;
      this.domain = payload.domain;
      this.name = payload.name;
      this.azureId = payload.azureId;
    }
  }
}
