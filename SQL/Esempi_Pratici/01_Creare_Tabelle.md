
---


# 📌 Esempi Pratici: Creazione e Modifica di Tabelle in SQL

## 🔎 Introduzione
In questa sezione vediamo come creare, modificare ed eliminare tabelle in SQL.

---

## 🎯 Creare una tabella semplice
```sql
CREATE TABLE utenti (
    id SERIAL PRIMARY KEY,
    nome VARCHAR(100) NOT NULL,
    email VARCHAR(255) UNIQUE NOT NULL,
    data_registrazione DATE DEFAULT CURRENT_DATE
);
````

📌 Crea la tabella `utenti` con una chiave primaria (`id`), un campo univoco (`email`) e un valore di default (`data_registrazione`).

---

## 🎯 Creare una tabella con una chiave esterna

```sql
CREATE TABLE ordini (
    id SERIAL PRIMARY KEY,
    utente_id INT,
    importo DECIMAL(10,2) NOT NULL,
    data_ordine TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (utente_id) REFERENCES utenti(id) ON DELETE CASCADE
);
```

📌 `utente_id` è una **chiave esterna** che collega ogni ordine a un utente. Se un utente viene eliminato, i suoi ordini vengono eliminati (`ON DELETE CASCADE`).

---

## 🎯 Aggiungere una colonna con `ALTER TABLE`

```sql
ALTER TABLE utenti ADD COLUMN telefono VARCHAR(15);
```

📌 Aggiunge la colonna `telefono` alla tabella `utenti`.

---

## 🎯 Modificare il tipo di dato di una colonna

```sql
ALTER TABLE utenti ALTER COLUMN telefono TYPE TEXT;
```

📌 Cambia il tipo della colonna `telefono` da `VARCHAR(15)` a `TEXT`.

---

## 🎯 Eliminare una colonna

```sql
ALTER TABLE utenti DROP COLUMN telefono;
```

📌 Rimuove la colonna `telefono` dalla tabella.

---

## 🎯 Eliminare una tabella con `DROP TABLE`

```sql
DROP TABLE utenti;
```

📌 Elimina completamente la tabella `utenti` e tutti i suoi dati.

---
