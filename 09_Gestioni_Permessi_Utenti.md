Ecco il nono file: **09_Gestioni_Permessi_Utenti.md**, che spiega come gestire i permessi degli utenti in SQL per garantire la sicurezza del database.

---


# 📌 Gestione dei Permessi e Sicurezza in SQL

## 🔎 Perché gestire i permessi?
La gestione dei permessi in SQL è fondamentale per:
✅ Proteggere i dati sensibili  
✅ Limitare l'accesso ai dati in base ai ruoli  
✅ Evitare modifiche non autorizzate  


👉 **Vedi esempi pratici**: [[Esempi_Pratici/09_Gestione_Permessi]]

---

## 📌 Creazione degli utenti nel database
Per aggiungere un nuovo utente al database:
```sql
CREATE USER mario WITH PASSWORD 'password123';
````

📌 **Sicurezza**: Evita password semplici e usa autenticazione sicura.

---

## 🎯 Assegnare permessi con `GRANT`

Il comando `GRANT` assegna **permessi specifici** a un utente.

|Permesso|Descrizione|
|---|---|
|`SELECT`|Permette di leggere i dati|
|`INSERT`|Permette di aggiungere dati|
|`UPDATE`|Permette di modificare dati|
|`DELETE`|Permette di eliminare dati|
|`ALL PRIVILEGES`|Concede tutti i permessi|

### 🔹 Esempio: Permettere a un utente di leggere dati

```sql
GRANT SELECT ON utenti TO mario;
```

### 🔹 Esempio: Concedere accesso completo a una tabella

```sql
GRANT ALL PRIVILEGES ON ordini TO mario;
```

---

## 🎯 Revocare permessi con `REVOKE`

Se un utente non deve più avere accesso a determinati dati:

```sql
REVOKE SELECT ON utenti FROM mario;
```

📌 **Best practice**: Assegna permessi solo quando necessari.

---

## 📌 Creazione e gestione dei ruoli (`ROLE`)

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

Un utente può avere accesso a un solo database:

```sql
GRANT CONNECT ON DATABASE vendite TO mario;
```

Se necessario, puoi **revocare** l’accesso:

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

📌 Questo permette a ciascun utente di vedere **solo i propri ordini**.

---

## 🔍 Riepilogo sulla Sicurezza in SQL

|Comando|Descrizione|
|---|---|
|`CREATE USER`|Crea un nuovo utente|
|`GRANT`|Concede permessi a un utente|
|`REVOKE`|Revoca permessi a un utente|
|`CREATE ROLE`|Crea un ruolo per gestire più utenti|
|`GRANT ... TO`|Assegna un ruolo a un utente|
|`REVOKE ... FROM`|Rimuove un ruolo da un utente|
|`ALTER TABLE ... ENABLE RLS`|Attiva la sicurezza a livello di riga|
