MS=$1
MIGRATION_NAME=$2
DB_HOST="localhost"
DB_USER="marketing_factory_user"
DB_NAME="marketing_factory"
DB_PASS="Nu52nWv6o4IL"
migrationsDir="apps/$MS/src/migrations/$MIGRATION_NAME"
PATH_LIB="apps/$MS/src"

export DB_HOST
export DB_USER
export DB_NAME
export DB_PASS
export MS
export PATH_LIB

# Generate migrations
npx ts-node -r tsconfig-paths/register --project ./tsconfig.migration.json node_modules/typeorm/cli -d apps/$MS/src/database/dyn-config.ts migration:generate $migrationsDir

export MS

# Post migration
node ./dev-scripts/postGenerateMigration.js