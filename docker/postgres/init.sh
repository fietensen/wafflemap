#!/bin/sh
set -e

# check if database is reachable
export PGPASSWORD=${WM_POSTGRES_PASSWORD}
until psql -v ON_ERROR_STOP=1 -U "${WM_POSTGRES_USER}" -d "${WM_POSTGRES_DB}" -c "\q"; do
  >&2 echo "PostgreSQL is unavailable - sleeping"
  sleep 1
done
unset PGPASSWORD

python3 -u /wafflemap_db_init/download_insert_osm_data.py