# 📌 Struttura del Database

## 🎯 Obiettivo del Documento

Descrivere la struttura delle tabelle e le relazioni del database per la web app backend.

---

## 1️⃣ Scelte Tecnologiche

✅ **Database Relazionale**: PostgreSQL / MySQL ✅ **ORM Utilizzato**: Sequelize (Node.js) / SQLAlchemy (Python) ✅ **Backup e Replicazione**: PostgreSQL WAL, MySQL Replication

---

## 2️⃣ Modello Relazionale

### 🔹 Struttura delle Tabelle

#### **Tabella `utenti`**

```sql
CREATE TABLE utenti (
  id SERIAL PRIMARY KEY,
  nome VARCHAR(100) NOT NULL,
  email VARCHAR(255) UNIQUE NOT NULL,
  password TEXT NOT NULL,
  ruolo VARCHAR(50) DEFAULT 'user',
  data_creazione TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

#### **Tabella `dati`**

```sql
CREATE TABLE dati (
  id SERIAL PRIMARY KEY,
  titolo VARCHAR(255) NOT NULL,
  descrizione TEXT,
  utente_id INT REFERENCES utenti(id) ON DELETE CASCADE,
  data_creazione TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

#### **Tabella `log_audit`** (per tracciare modifiche)

```sql
CREATE TABLE log_audit (
  id SERIAL PRIMARY KEY,
  utente_id INT REFERENCES utenti(id),
  azione TEXT NOT NULL,
  data TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  dettagli JSONB
);
```

---

## 3️⃣ Relazioni tra Tabelle

✅ **1 Utente → N Dati** (un utente può creare più dati) ✅ **1 Utente → N Log Audit** (registrazione delle operazioni dell’utente)

---

## 4️⃣ Indici e Ottimizzazione

✅ **Indexing per velocizzare le query**

```sql
CREATE INDEX idx_email ON utenti(email);
CREATE INDEX idx_titolo ON dati(titolo);
```

✅ **Partitioning per dataset molto grandi** ✅ **Caching con Redis per ridurre il carico sul database**

---

## 5️⃣ Backup e Disaster Recovery

✅ **Backup giornaliero automatico** con `pg_dump` ✅ **Replica dei dati per alta disponibilità**

```sh
pg_dump -U user -h localhost -F c -b -v -f "backup_db.sql" mydb
```

---
