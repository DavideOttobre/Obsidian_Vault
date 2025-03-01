# 📌 Setup dell'Ambiente di Sviluppo

## 🎯 Obiettivo del Documento

Configurare l'ambiente di sviluppo per il backend della web app, garantendo un flusso di lavoro efficiente e scalabile.

---

## 1️⃣ Installazione delle Dipendenze

### 🔹 Requisiti di base

✅ **Node.js / Python / Ruby** (scegliere il linguaggio backend) ✅ **Database** (PostgreSQL, MySQL, MongoDB) ✅ **Docker** per containerizzazione ✅ **Git** per il controllo di versione ✅ **Postman / Insomnia** per testare le API

```sh
# Installazione di Node.js e npm
sudo apt install nodejs npm

# Installazione di Python e pip
sudo apt install python3 python3-pip
```

---

## 2️⃣ Creazione del Progetto

### 🔹 Inizializzazione del Repository

```sh
git init
```

### 🔹 Struttura del progetto

```
📂 backend-webapp
│── 📂 src
│   │── 📂 controllers
│   │── 📂 models
│   │── 📂 routes
│   │── 📂 middleware
│   │── 📂 services
│── 📂 config
│── 📂 tests
│── 📂 scripts
│── .env
│── package.json / requirements.txt
│── README.md
```

---

## 3️⃣ Configurazione del Database

### 🔹 Creazione Database (PostgreSQL)

```sh
sudo -u postgres psql -c "CREATE DATABASE mydb;"
```

### 🔹 Connessione al database con `.env`

```env
DB_HOST=localhost
DB_USER=admin
DB_PASSWORD=securepassword
DB_NAME=mydb
```

---

## 4️⃣ Configurazione Docker (opzionale)

### 🔹 Creazione di un file `Dockerfile`

```dockerfile
FROM node:16
WORKDIR /app
COPY package.json .
RUN npm install
COPY . .
CMD ["node", "server.js"]
```

### 🔹 Avvio del container

```sh
docker build -t backend-app .
docker run -p 3000:3000 backend-app
```

---
