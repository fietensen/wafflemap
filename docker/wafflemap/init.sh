#!/bin/sh
set -e

# check if database is reachable
export PGPASSWORD=${WM_POSTGRES_PASSWORD}
until psql -v ON_ERROR_STOP=1 -h "${WM_POSTGRES_HOST}" -U "${WM_POSTGRES_USER}" -d "${WM_POSTGRES_DB}" -c "\q"; do
  >&2 echo "PostgreSQL is unavailable - sleeping"
  sleep 1
done
unset PGPASSWORD

java -jar wafflemap.jar