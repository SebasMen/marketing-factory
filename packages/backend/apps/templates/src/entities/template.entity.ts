import { OmitPartial } from '@mfactory-be/utils/objects';
import { randomUUID } from '@mfactory-be/utils/random';
import { Column, CreateDateColumn, Entity, Index, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';

export enum TemplateStatus {
  ACTIVE = 'ACTIVE',
  INACTIVE = 'INACTIVE',
}

@Entity({ name: 'templates' })
export class Template {
  @PrimaryGeneratedColumn('uuid')
  id?: string;

  @Column({ nullable: false })
  name: string;

  @Column({ nullable: false, type: 'enum', enum: TemplateStatus })
  status: TemplateStatus;

  @Column({ type: 'jsonb', nullable: false })
  tags: string[];

  @Index('ts_search_weighted_idx', { synchronize: false })
  @Column({
    type: 'tsvector',
    nullable: true,
    generatedType: 'STORED',
    asExpression: `
      setweight(to_tsvector('spanish', coalesce(lower(name), '')), 'A') ||
      setweight(to_tsvector('spanish', coalesce(lower(tags::text), '')), 'B')`,
  })
  tsSearchWeighted?: string;

  /** Creation date */
  @CreateDateColumn()
  createdAt?: Date;

  /** Updating Date */
  @UpdateDateColumn()
  updatedAt?: Date;

  constructor(payload?: OmitPartial<Template, 'createdAt' | 'updatedAt' | 'id'>) {
    this.id = randomUUID();
    if (payload) {
      this.id = payload.id;
      this.name = payload.name;
      this.status = payload.status;
      this.tags = payload.tags;
    }
  }
}
