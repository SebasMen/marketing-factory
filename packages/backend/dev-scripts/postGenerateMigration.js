/**
 * This updates the file where the migrations are listed, so that they can be executed correctly.
 */
const fs = require('fs');
const _ = require('lodash');
const path = require('node:path');

const ms = process.env.MS;

const migrationsFolder = path.join(__dirname, '..', 'apps', ms, 'src', 'migrations');
const dbFolder = path.join(__dirname, '..', 'apps', ms, 'src', 'database');

// Content from migration file
const actContentMigrationFile = fs.readFileSync(`${dbFolder}/migrations.ts`);

fs.readdirSync(migrationsFolder, 'utf8').forEach(file => {
  if (file.includes('.ts')) {
    const fileName = file.replace('.ts', '');
    const [timestampMigration, name] = fileName.split('-');
    const classMigrationName = `${_.upperFirst(name)}${timestampMigration}`;

    if (!actContentMigrationFile.includes(classMigrationName)) {
      const newRowMigration = `export { ${_.upperFirst(name)}${timestampMigration} } from '../migrations/${fileName}';`;
      fs.appendFileSync(`${dbFolder}/migrations.ts`, `\n${newRowMigration}`);
    }
  }
});
