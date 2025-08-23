#!/bin/bash
# run-migration.sh

npx typeorm-ts-node-commonjs migration:run -d ./src/data-source.ts