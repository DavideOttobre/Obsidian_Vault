# 📌 Deploy su Cloud

## 🎯 Obiettivo del Documento

Definire la strategia di deploy del backend in ambiente cloud, garantendo scalabilità e affidabilità.

---

## 1️⃣ Scelta della Piattaforma di Hosting

✅ **Opzioni disponibili**:

- **AWS EC2**: Maggiore controllo e scalabilità
- **DigitalOcean Droplet**: Facile da gestire con costi contenuti
- **Heroku**: Deploy semplice con integrazione CI/CD
- **Render**: Alternativa scalabile a basso costo

**Scelta consigliata**: **Docker + VPS (AWS/DigitalOcean)**

---

## 2️⃣ Configurazione del Repository Git

### 🔹 Inizializzazione del repository

```sh
git init
git remote add origin https://github.com/user/backend-app.git
git add .
git commit -m "Deploy iniziale"
git push origin main
```

---

## 3️⃣ Dockerizzazione dell’Applicazione

### 🔹 Creazione del file `Dockerfile`

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

---

## 4️⃣ Deploy su DigitalOcean / AWS

### 🔹 Creazione di una VPS

```sh
ssh-keygen -t rsa -b 4096 -C "email@example.com"
ssh root@your-server-ip
```

### 🔹 Installazione di Docker

```sh
sudo apt update && sudo apt install docker.io -y
sudo systemctl enable docker
sudo usermod -aG docker $USER
```

### 🔹 Deploy dell’applicazione

```sh
git clone https://github.com/user/backend-app.git
cd backend-app
docker-compose up -d
```

---

## 5️⃣ Configurazione CI/CD

✅ **GitHub Actions per automazione del deploy** ✅ **Build automatica con Docker Hub** ✅ **Rilascio automatico su server con Git pull e restart**

### 🔹 Configurazione GitHub Actions

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
          ssh root@your-server-ip "cd /backend-app && git pull && docker-compose up -d --build"
```

---

## 6️⃣ Prossimi Passaggi

👉 [Monitoraggio e Logging](https://chatgpt.com/c/05_Deployment/03_Monitoraggio)