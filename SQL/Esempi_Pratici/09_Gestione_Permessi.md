
---


# 📌 Esempi Pratici: Gestione dei Permessi e Sicurezza in SQL

## 🔎 Introduzione
Gestire i permessi è fondamentale per proteggere i dati e garantire accessi controllati nel database.

---

## 📌 Creazione di un nuovo utente nel database
```sql
CREATE USER mario WITH PASSWORD 'password123';
````

📌 **Sicurezza**: Usa password complesse ed evita valori semplici.

---

## 🎯 Concedere permessi con `GRANT`

Il comando `GRANT` assegna permessi agli utenti.

|Permesso|Descrizione|
|---|---|
|`SELECT`|Permette di leggere i dati|
|`INSERT`|Permette di aggiungere dati|
|`UPDATE`|Permette di modificare dati|
|`DELETE`|Permette di eliminare dati|
|`ALL PRIVILEGES`|Concede tutti i permessi|

### 🔹 Concedere permesso di lettura a un utente

```sql
GRANT SELECT ON utenti TO mario;
```

### 🔹 Concedere accesso completo a una tabella

```sql
GRANT ALL PRIVILEGES ON ordini TO mario;
```

---

## 🎯 Revocare permessi con `REVOKE`

```sql
REVOKE SELECT ON utenti FROM mario;
```

📌 L'utente `mario` non potrà più leggere i dati della tabella `utenti`.

---

## 📌 Creazione e gestione di ruoli (`ROLE`)

I **ruoli** permettono di gestire più utenti con gli stessi permessi.

### 🔹 Creare un ruolo per amministratori

```sql
CREATE ROLE admin;
GRANT ALL PRIVILEGES ON utenti TO admin;
```

### 🔹 Assegnare un ruolo a un utente

```sql
GRANT admin TO mario;
```

### 🔹 Revocare un ruolo

```sql
REVOKE admin FROM mario;
```

📌 I ruoli semplificano la gestione dei permessi.

---

## 📌 Limitare l’accesso ai database

### 🔹 Permettere l'accesso solo a un database specifico

```sql
GRANT CONNECT ON DATABASE vendite TO mario;
```

### 🔹 Revocare l'accesso

```sql
REVOKE CONNECT ON DATABASE vendite FROM mario;
```

---

## 🎯 Restrizioni con `Row-Level Security (RLS)`

`RLS` permette di limitare i dati visibili agli utenti.

### 🔹 Attivare la sicurezza a livello di riga

```sql
ALTER TABLE ordini ENABLE ROW LEVEL SECURITY;
```

### 🔹 Creare una policy per consentire solo la visualizzazione dei propri ordini

```sql
CREATE POLICY utente_ordini
ON ordini
USING (utente_id = current_user);
```

📌 Ogni utente vedrà **solo i propri ordini**.

---
