# 📌 Configurazione del Server

## 🎯 Obiettivo del Documento

Configurare il server per il deployment del backend in un ambiente sicuro e scalabile.

---

## 1️⃣ Scelta dell'Hosting

✅ **Opzioni disponibili**:

- AWS (EC2, Elastic Beanstalk)
- DigitalOcean (Droplets, App Platform)
- Heroku (Facile, per progetti più piccoli)
- Render (Alternative scalabili a basso costo)

✅ **Scelta consigliata**: **Docker + VPS (AWS/DigitalOcean)**

---

## 2️⃣ Installazione delle Dipendenze

### 🔹 Setup su una macchina Linux (Ubuntu)

```sh
sudo apt update && sudo apt upgrade -y
sudo apt install -y nodejs npm git nginx
```

### 🔹 Configurazione di Node.js e PM2

```sh
npm install -g pm2
pm install --production
pm run build
pm2 start server.js --name "backend-app"
pm2 save
```

---

## 3️⃣ Configurazione di Nginx come Reverse Proxy

### 🔹 Creazione del file di configurazione Nginx

```sh
sudo nano /etc/nginx/sites-available/backend
```

### 🔹 Configurazione Nginx per Proxy Pass

```nginx
server {
    listen 80;
    server_name esempio.com;

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

### 🔹 Abilitare la configurazione e riavviare Nginx

```sh
sudo ln -s /etc/nginx/sites-available/backend /etc/nginx/sites-enabled/
sudo systemctl restart nginx
```

---

## 4️⃣ Certificato SSL con Let's Encrypt

```sh
sudo apt install certbot python3-certbot-nginx
sudo certbot --nginx -d esempio.com -d www.esempio.com
sudo systemctl restart nginx
```

---

## 5️⃣ Monitoraggio e Logging

✅ **PM2 per restart automatici e monitoraggio** ✅ **Log centralizzati con Winston e Sentry** ✅ **Alerting con UptimeRobot o Prometheus**

```sh
pm2 logs
```

---

## 6️⃣ Prossimi Passaggi

👉 [Deploy su Cloud](https://chatgpt.com/c/05_Deployment/02_Deploy_Cloud)