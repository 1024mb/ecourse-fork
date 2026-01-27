#!/usr/bin/env sh
set -e

mkdir -p /app/pb_migrations
mv --no-clobber /app/pb_migrations_app/* /app/pb_migrations/

exec /usr/local/bin/entrypoint.sh "$@"
