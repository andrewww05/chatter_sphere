#!/bin/bash
# generate-migration.sh
# Usage: ./generate-migration.sh MigrationName
MIGRATION_NAME=$1

if [ -z "$MIGRATION_NAME" ]; then
  echo "Please provide a migration name, e.g.: ./generate-migration.sh CreateUserTable"
  exit 1
fi

npx typeorm-ts-node-commonjs migration:generate ./migrations/$MIGRATION_NAME -d ./src/data-source.ts