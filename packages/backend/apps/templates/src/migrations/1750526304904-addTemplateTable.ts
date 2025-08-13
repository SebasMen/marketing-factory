import { MigrationInterface, QueryRunner } from "typeorm";

export class AddTemplateTable1750526304904 implements MigrationInterface {
    name = 'AddTemplateTable1750526304904'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TYPE "public"."templates_status_enum" AS ENUM('ACTIVE', 'INACTIVE')`);
        await queryRunner.query(`INSERT INTO "typeorm_metadata"("database", "schema", "table", "type", "name", "value") VALUES ($1, $2, $3, $4, $5, $6)`, ["@mfactory-be_templates","public","templates","GENERATED_COLUMN","tsSearchWeighted","\n      setweight(to_tsvector('spanish', coalesce(lower(name), '')), 'A') ||\n      setweight(to_tsvector('spanish', coalesce(lower(department), '')), 'B')"]);
        await queryRunner.query(`CREATE TABLE "templates" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "name" character varying NOT NULL, "status" "public"."templates_status_enum" NOT NULL, "tags" jsonb NOT NULL, "tsSearchWeighted" tsvector GENERATED ALWAYS AS (
      setweight(to_tsvector('spanish', coalesce(lower(name), '')), 'A') ||
      setweight(to_tsvector('spanish', coalesce(lower(tags::text), '')), 'B')) STORED, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "PK_515948649ce0bbbe391de702ae5" PRIMARY KEY ("id"))`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE "templates"`);
        await queryRunner.query(`DELETE FROM "typeorm_metadata" WHERE "type" = $1 AND "name" = $2 AND "database" = $3 AND "schema" = $4 AND "table" = $5`, ["GENERATED_COLUMN","tsSearchWeighted","@mfactory-be_templates","public","templates"]);
        await queryRunner.query(`DROP TYPE "public"."templates_status_enum"`);
    }

}
