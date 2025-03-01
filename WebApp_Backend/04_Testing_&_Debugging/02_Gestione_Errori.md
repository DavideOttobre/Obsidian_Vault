# 📌 Gestione degli Errori nel Backend

## 🎯 Obiettivo del Documento

Implementare una strategia di gestione degli errori efficace per migliorare la stabilità e la sicurezza delle API.

---

## 1️⃣ Tipologie di Errori

### 🔹 Errori di Validazione

✅ Input non valido o mancante ✅ Formattazione errata dei dati ✅ Strumenti: Express Validator, Joi

### 🔹 Errori di Autenticazione e Autorizzazione

✅ Token JWT scaduto o non valido ✅ Accesso non autorizzato ✅ Protezione da brute force e accessi non validi

### 🔹 Errori del Server

✅ Errori di database (es. connessione persa) ✅ Errore interno dell’applicazione ✅ Crash dell’applicazione

---

## 2️⃣ Middleware di Gestione degli Errori

### 🔹 Implementazione Middleware

```js
const errorHandler = (err, req, res, next) => {
  console.error(err.stack);
  res.status(err.status || 500).json({
    errore: err.message || "Errore interno del server",
  });
};

module.exports = errorHandler;
```

### 🔹 Integrazione con Express

```js
const express = require("express");
const app = express();
const errorHandler = require("./middleware/errorHandler");

app.use(errorHandler);
```

---

## 3️⃣ Logging degli Errori

### 🔹 Utilizzo di Winston per Logging Centralizzato

```js
const winston = require("winston");

const logger = winston.createLogger({
  level: "error",
  transports: [
    new winston.transports.File({ filename: "error.log" }),
  ],
});

module.exports = logger;
```

### 🔹 Esempio di Logging in un Controller

```js
const logger = require("../config/logger");

const esempioErrore = (req, res, next) => {
  try {
    throw new Error("Errore simulato");
  } catch (error) {
    logger.error(error.message);
    next(error);
  }
};
```

---

## 4️⃣ Monitoraggio e Alerting

✅ **Sentry per tracking degli errori** ✅ **Dashboard di monitoraggio API** con Prometheus/Grafana ✅ **Notifiche in tempo reale** via Slack o email

```js
const Sentry = require("@sentry/node");
Sentry.init({ dsn: "URL_DSN_SENTRY" });
app.use(Sentry.Handlers.errorHandler());
```

---
