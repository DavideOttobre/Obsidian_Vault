# 📌 Monitoraggio e Logging

## 🎯 Obiettivo del Documento

Implementare strategie di monitoraggio e logging per garantire stabilità e sicurezza dell’applicazione backend in produzione.

---

## 1️⃣ Strumenti di Monitoraggio

### 🔹 Strumenti consigliati

✅ **Prometheus + Grafana** per metriche e dashboard ✅ **New Relic** per analisi delle performance ✅ **UptimeRobot** per il monitoraggio della disponibilità ✅ **Sentry** per il tracking degli errori in produzione

### 🔹 Installazione di Prometheus su un server Linux

```sh
sudo apt update && sudo apt install prometheus -y
sudo systemctl enable prometheus
sudo systemctl start prometheus
```

---

## 2️⃣ Configurazione del Logging

### 🔹 Logging con Winston

```js
const winston = require("winston");
const logger = winston.createLogger({
  level: "info",
  format: winston.format.json(),
  transports: [
    new winston.transports.File({ filename: "error.log", level: "error" }),
    new winston.transports.Console({ format: winston.format.simple() })
  ],
});
module.exports = logger;
```

### 🔹 Integrazione del logger nelle API

```js
const logger = require("../config/logger");
app.use((req, res, next) => {
  logger.info(`${req.method} ${req.url}`);
  next();
});
```

---

## 3️⃣ Monitoraggio della Disponibilità

### 🔹 Configurare UptimeRobot

1️⃣ Creare un account su [UptimeRobot](https://uptimerobot.com/) 
2️⃣ Aggiungere un nuovo monitor per l’endpoint `/health` dell’API
3️⃣ Configurare notifiche via email o Slack

### 🔹 Creazione di un endpoint di **health check**

```js
app.get("/health", (req, res) => {
  res.json({ status: "OK", uptime: process.uptime() });
});
```

---

## 4️⃣ Alerting e Notifiche

✅ **Webhook per Slack e Discord** ✅ **Email Alerting per errori critici** ✅ **Configurazione di Sentry per tracking errori**

### 🔹 Integrazione di Sentry

```js
const Sentry = require("@sentry/node");
Sentry.init({ dsn: "YOUR_SENTRY_DSN_URL" });
app.use(Sentry.Handlers.errorHandler());
```

---
