# 📌 Guida al Deploy

## 🎯 Obiettivo del Documento

Fornire una guida dettagliata per il deploy del backend della web app in un ambiente di produzione sicuro e scalabile.

---

## 1️⃣ Prerequisiti

✅ **Server configurato** (AWS, DigitalOcean, VPS con Ubuntu) ✅ **Docker e Docker Compose installati** ✅ **Dominio configurato con DNS corretto** ✅ **Certificato SSL con Let's Encrypt**

---

## 2️⃣ Clonare il Repository e Configurare l'Ambiente

```sh
ssh user@server-ip
cd /var/www/
git clone https://github.com/user/backend-app.git
cd backend-app
cp .env.example .env
nano .env  # Configurare variabili d'ambiente
```

---

## 3️⃣ Creare il Contenitore Docker

### 🔹 Creazione del `Dockerfile`

```dockerfile
FROM node:16
WORKDIR /app
COPY package.json .
RUN npm install --production
COPY . .
CMD ["node", "server.js"]
```

### 🔹 Creazione del file `docker-compose.yml`

```yaml
version: '3'
services:
  app:
    build: .
    ports:
      - "3000:3000"
    environment:
      - NODE_ENV=production
      - DB_HOST=db
  db:
    image: postgres
    environment:
      POSTGRES_USER: user
      POSTGRES_PASSWORD: password
      POSTGRES_DB: mydb
```

### 🔹 Avviare i Servizi

```sh
docker-compose up -d --build
```

---

## 4️⃣ Configurare Nginx come Reverse Proxy

### 🔹 Creazione della Configurazione Nginx

```sh
sudo nano /etc/nginx/sites-available/backend
```

```nginx
server {
    listen 80;
    server_name api.miosito.com;

    location / {
        proxy_pass http://localhost:3000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_cache_bypass $http_upgrade;
    }
}
```

### 🔹 Abilitare la Configurazione e Riavviare Nginx

```sh
sudo ln -s /etc/nginx/sites-available/backend /etc/nginx/sites-enabled/
sudo systemctl restart nginx
```

---

## 5️⃣ Configurare SSL con Let's Encrypt

```sh
sudo apt install certbot python3-certbot-nginx
sudo certbot --nginx -d api.miosito.com
sudo systemctl restart nginx
```

---

## 6️⃣ Automazione con CI/CD

### 🔹 Configurare GitHub Actions

```yaml
name: Deploy Backend
on: [push]

jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
      - name: Checkout repository
        uses: actions/checkout@v2
      - name: Deploy su server
        run: |
          ssh user@server "cd /var/www/backend-app && git pull && docker-compose up -d --build"
```

---

## 7️⃣ Monitoraggio e Manutenzione

✅ **Log delle richieste con Winston** ✅ **Monitoraggio uptime con UptimeRobot** ✅ **Backup giornalieri del database**

```sh
docker logs backend-app -f
```

---

## 8️⃣ Prossimi Passaggi

👉 **Verifica post-deploy e test delle API**