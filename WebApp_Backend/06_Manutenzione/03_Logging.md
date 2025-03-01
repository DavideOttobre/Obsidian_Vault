# 📌 Logging e Audit

## 🎯 Obiettivo del Documento

Definire le strategie di logging e auditing per tracciare attività e anomalie nel backend.

---

## 1️⃣ Logging degli Eventi

✅ **Log degli accessi alle API** ✅ **Log degli errori e crash del sistema** ✅ **Log delle modifiche ai dati importanti**

### 🔹 Implementazione con Winston

```js
const winston = require("winston");
const logger = winston.createLogger({
  level: "info",
  format: winston.format.json(),
  transports: [
    new winston.transports.File({ filename: "error.log", level: "error" }),
    new winston.transports.File({ filename: "combined.log" })
  ],
});

if (process.env.NODE_ENV !== "production") {
  logger.add(new winston.transports.Console({
    format: winston.format.simple(),
  }));
}

module.exports = logger;
```

### 🔹 Utilizzo del logger nelle API

```js
const logger = require("../config/logger");

app.use((req, res, next) => {
  logger.info(`${req.method} ${req.url} - ${req.ip}`);
  next();
});
```

---

## 2️⃣ Audit delle Modifiche ai Dati

✅ **Registrazione delle modifiche critiche (es. eliminazioni, modifiche di permessi)** ✅ **Tracciamento delle attività degli utenti** ✅ **Archivio storico delle azioni per controlli futuri**

### 🔹 Creazione della tabella `audit_log` nel database

```sql
CREATE TABLE audit_log (
  id SERIAL PRIMARY KEY,
  utente_id INT,
  azione TEXT,
  data TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  dettagli JSONB
);
```

### 🔹 Inserimento automatico nel log

```js
const auditLog = async (utente_id, azione, dettagli) => {
  await AuditLog.create({ utente_id, azione, dettagli });
};
```

---

## 3️⃣ Integrazione con Sistemi di Monitoraggio

✅ **Centralizzazione dei log con ELK Stack (Elasticsearch, Logstash, Kibana)** ✅ **Notifiche automatiche in caso di errori critici con Sentry o Slack** ✅ **Dashboard di monitoraggio delle attività API con Grafana**

```js
const Sentry = require("@sentry/node");
Sentry.init({ dsn: "TUO_SENTRY_DSN" });
app.use(Sentry.Handlers.errorHandler());
```

---

## 4️⃣ Prossimi Passaggi

👉 [Documentazione API](https://chatgpt.com/c/07_Documentazione/01_Endpoint_API)