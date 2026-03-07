#!/bin/bash
set -e

# Restore the dvdrental database from the tar file
pg_restore -U "$POSTGRES_USER" -d "$POSTGRES_DB" /docker-entrypoint-initdb.d/dvdrental.tar || true

# Run custom SQL scripts
psql -U "$POSTGRES_USER" -d "$POSTGRES_DB" -f /docker-entrypoint-initdb.d/account_script.sql || true
