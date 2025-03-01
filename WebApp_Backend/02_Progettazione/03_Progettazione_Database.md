# 📌 Progettazione del Database

## 🎯 Obiettivo del Documento

Definire la struttura del database per la web app, garantendo efficienza, scalabilità e sicurezza nella gestione dei dati.

---

## 1️⃣ Scelta del Database

### 🔹 Tipologie

✅ **SQL** (PostgreSQL, MySQL): Relazionale, forte integrità dei dati, adatto a dati strutturati ✅ **NoSQL** (MongoDB, Firebase): Scalabile, flessibile, ideale per dati non strutturati

### 🔹 Motivo della Scelta

📌 **SQL** per transazioni robuste e relazioni forti tra i dati (utenti, ordini, pagamenti). 📌 **NoSQL** per contenuti dinamici o dati non relazionali (notifiche, log di eventi).

---

## 2️⃣ Modelli e Schema del Database

### 🔹 Modello Relazionale (SQL)

**Entità principali**:

- `utenti (id, nome, email, password, ruolo, data_creazione)`
- `ordini (id, utente_id, importo, stato, data_creazione)`
- `prodotti (id, nome, prezzo, descrizione, categoria_id)`
- `categorie (id, nome)`

### 🔹 Relazioni tra le tabelle

```
- utenti (1) → (N) ordini
- categorie (1) → (N) prodotti
- prodotti (N) → (N) ordini (Tabella ponte: dettagli_ordini)
```

### 🔹 Modello NoSQL (MongoDB)

**Esempio di documento utenti**:

```json
{
  "_id": "ObjectId()",
  "nome": "Mario Rossi",
  "email": "mario@email.com",
  "password": "hashed_password",
  "ordini": [
    {
      "id": "ObjectId()",
      "importo": 100,
      "stato": "completato"
    }
  ]
}
```

---

## 3️⃣ Strategie di Ottimizzazione

✅ **Indexing**: Indici su email utenti, ID prodotto e stato ordine ✅ **Caching**: Redis per velocizzare query ripetitive ✅ **Partizionamento**: Separazione dati storici e attivi per migliorare performance ✅ **Backup & Recovery**: Strategie automatiche per la sicurezza dei dati

---

## 4️⃣ Sicurezza del Database

✅ Hashing delle password con bcrypt/argon2 ✅ Controllo accessi con permessi granulari (`GRANT` / `REVOKE`) ✅ Prevenzione SQL Injection con query parametrizzate ✅ Replica e failover per alta disponibilità

---

## 5️⃣ Prossimi Passaggi

👉 [Gestione Utenti e Permessi](https://chatgpt.com/c/02_Progettazione/04_Gestione_Utenti)