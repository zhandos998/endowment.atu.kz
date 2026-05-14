# Deploy

Production domain:

```text
endowment-test.atu.kz
```

Server requirements:

- Docker
- Docker Compose
- DNS `A` record for `endowment-test.atu.kz` pointing to the server
- open HTTP port `80`
- open HTTPS port `443`
- nginx if ports `80/443` are already used by the host

Copy the project to the server, create `.env` from `.env.example`, and fill real secrets:

```bash
cp .env.example .env
nano .env
```

For production use:

```env
SITE_DOMAIN=endowment-test.atu.kz
SITE_URL=https://endowment-test.atu.kz
SITE_HTTP_PORT=127.0.0.1:8090
CADDY_HTTP_PORT=80
CADDY_HTTPS_PORT=443
CADDY_EMAIL=endowment@atu.edu.kz
PHPMYADMIN_BIND=127.0.0.1
PHPMYADMIN_PORT=8091
APP_ENV=production
APP_DEBUG=false
APP_KEY=base64:your-generated-key
```

Start Docker app behind existing nginx:

```bash
docker compose up -d --build
```

Use this nginx upstream:

```nginx
server {
    listen 80;
    listen [::]:80;
    server_name endowment-test.atu.kz www.endowment-test.atu.kz;
    return 301 https://endowment-test.atu.kz$request_uri;
}

server {
    listen 443 ssl;
    listen [::]:443 ssl;
    server_name endowment-test.atu.kz www.endowment-test.atu.kz;

    ssl_certificate /etc/ssl/atussl/ssl-bundle.crt;
    ssl_certificate_key /etc/ssl/atussl/atu.key;

    client_max_body_size 64m;

    location / {
        proxy_pass http://127.0.0.1:8090;
        proxy_http_version 1.1;
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
    }
}
```

If the server does not already run nginx, the bundled Caddy profile can be used instead:

```bash
docker compose --profile production up -d --build
```

Check:

```bash
docker compose ps
docker compose logs -f backend
```

phpMyAdmin is bound to localhost on the server. Open it through an SSH tunnel:

```bash
ssh -L 8091:127.0.0.1:8091 user@endowment-test.atu.kz
```

Then open:

```text
http://127.0.0.1:8091
```

Default admin account after seeding:

```text
admin@atu.edu.kz
password
```
