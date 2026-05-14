#!/usr/bin/env sh
set -e

mkdir -p storage/app/public storage/framework/cache storage/framework/sessions storage/framework/views storage/logs bootstrap/cache

if [ -n "${DB_HOST:-}" ]; then
  echo "Waiting for database ${DB_HOST}:${DB_PORT:-3306}..."
  until php -r "new PDO('mysql:host=${DB_HOST};port=${DB_PORT:-3306};dbname=${DB_DATABASE}', '${DB_USERNAME}', '${DB_PASSWORD}');" >/dev/null 2>&1; do
    sleep 2
  done
fi

php artisan storage:link >/dev/null 2>&1 || true
php artisan migrate --force

if [ "$(php artisan tinker --execute='echo App\Models\User::query()->exists() ? "0" : "1";')" = "1" ]; then
  php artisan db:seed --force
fi

exec "$@"
