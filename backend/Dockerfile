FROM composer:2 AS vendor

WORKDIR /app

COPY composer.json composer.lock ./
RUN composer install --no-dev --prefer-dist --no-interaction --no-progress --no-scripts

COPY . .
RUN composer dump-autoload --optimize \
    && php artisan package:discover --ansi

FROM php:8.3-cli

RUN apt-get update \
    && apt-get install -y --no-install-recommends \
        default-mysql-client \
        git \
        libonig-dev \
        libzip-dev \
        unzip \
    && docker-php-ext-install mbstring pdo_mysql zip \
    && rm -rf /var/lib/apt/lists/*

WORKDIR /var/www/html

COPY --from=vendor /app .
COPY docker/entrypoint.sh /usr/local/bin/backend-entrypoint

RUN chmod +x /usr/local/bin/backend-entrypoint \
    && mkdir -p storage/app/public storage/framework/cache storage/framework/sessions storage/framework/views storage/logs bootstrap/cache \
    && chown -R www-data:www-data storage bootstrap/cache

EXPOSE 8000

ENTRYPOINT ["backend-entrypoint"]
CMD ["php", "artisan", "serve", "--host=0.0.0.0", "--port=8000"]
