# 📌 Scalabilità e Ottimizzazione

## 🎯 Obiettivo del Documento

Definire strategie per scalare e ottimizzare il backend della web app, migliorando le prestazioni e la gestione del carico.

---

## 1️⃣ Scalabilità Orizzontale vs Verticale

✅ **Scalabilità verticale**: Aumentare risorse hardware (RAM, CPU) ✅ **Scalabilità orizzontale**: Distribuire il carico su più server ✅ **Bilanciamento del carico**: Utilizzo di Nginx o AWS ELB

```sh
# Configurare Nginx come Load Balancer
upstream backend {
    server backend1.example.com;
    server backend2.example.com;
}
server {
    location / {
        proxy_pass http://backend;
    }
}
```

---

## 2️⃣ Ottimizzazione del Database

✅ **Indexing per velocizzare le query** ✅ **Denormalizzazione per ridurre i JOIN complessi** ✅ **Partitioning per migliorare la gestione di dataset grandi**

```sql
CREATE INDEX idx_utente_email ON utenti(email);
```

✅ **Caching con Redis** per ridurre le letture dal database

```js
const redis = require("redis");
const client = redis.createClient();

app.get("/dati", async (req, res) => {
    client.get("cache_dati", async (err, dati) => {
        if (dati) return res.json(JSON.parse(dati));
        const data = await Database.getDati();
        client.setex("cache_dati", 3600, JSON.stringify(data));
        res.json(data);
    });
});
```

---

## 3️⃣ Ottimizzazione delle API

✅ **Paginazione per ridurre il carico sulle query**

```js
const getPaginated = async (req, res) => {
    const { page = 1, limit = 10 } = req.query;
    const offset = (page - 1) * limit;
    const dati = await Dato.findAndCountAll({ limit, offset });
    res.json({ dati: dati.rows, totale: dati.count });
};
```

✅ **Compressione delle risposte API** con gzip

```js
const compression = require("compression");
app.use(compression());
```

✅ **Rate Limiting per evitare abusi**

```js
const rateLimit = require("express-rate-limit");
const limiter = rateLimit({
    windowMs: 15 * 60 * 1000,
    max: 100
});
app.use(limiter);
```

---

## 4️⃣ Monitoraggio delle Performance

✅ **APM con New Relic o Prometheus** ✅ **Logging avanzato con Graylog o ELK Stack** ✅ **Alerting automatico per carichi elevati**

---

## 5️⃣ Prossimi Passaggi

👉 [Gestione degli Aggiornamenti](https://chatgpt.com/c/06_Manutenzione/02_Aggiornamenti)