Ecco il secondo file: **02_Creazione_Tabelle.md**. Questo file spiega come creare e gestire tabelle in SQL.

---


# 📌 Creazione e gestione delle tabelle in SQL

## 🏗️ Creare una tabella con `CREATE TABLE`
Una tabella in SQL è una struttura che contiene dati organizzati in colonne e righe. Per creare una tabella, si utilizza il comando `CREATE TABLE`.

### 📜 Sintassi di base:
```sql
CREATE TABLE nome_tabella (
    nome_colonna1 TIPO_DI_DATO CONSTRAINTS,
    nome_colonna2 TIPO_DI_DATO CONSTRAINTS,
    ...
);
````

### 🏗️ Esempio: Creare una tabella `utenti`

```sql
CREATE TABLE utenti (
    id SERIAL PRIMARY KEY,
    nome VARCHAR(100) NOT NULL,
    email VARCHAR(255) UNIQUE NOT NULL,
    data_registrazione DATE DEFAULT CURRENT_DATE
);
```

📌 **Spiegazione dei campi**:

- `id SERIAL PRIMARY KEY` → Colonna `id` è un identificatore univoco (autoincrementato).
- `nome VARCHAR(100) NOT NULL` → Colonna `nome` accetta un massimo di 100 caratteri e non può essere NULL.
- `email VARCHAR(255) UNIQUE NOT NULL` → L'email deve essere univoca.
- `data_registrazione DATE DEFAULT CURRENT_DATE` → Registra automaticamente la data corrente.

👉 **Vedi esempi pratici sulla creazione di tabelle**: [[01_Creare_Tabelle]]

---

## 🔑 Definizione delle Chiavi in una Tabella

### 1️⃣ **Chiave Primaria (Primary Key)**

Una **chiave primaria** identifica in modo univoco ogni riga della tabella.

```sql
CREATE TABLE clienti (
    id INT PRIMARY KEY,
    nome VARCHAR(255) NOT NULL
);
```

📌 La colonna `id` non può avere valori duplicati o NULL.

### 2️⃣ **Chiave Esterna (Foreign Key)**

Le **chiavi esterne** collegano due tabelle.

```sql
CREATE TABLE ordini (
    id SERIAL PRIMARY KEY,
    cliente_id INT,
    FOREIGN KEY (cliente_id) REFERENCES clienti(id)
);
```

📌 La colonna `cliente_id` fa riferimento alla chiave primaria della tabella `clienti`.

👉 **Approfondimento sulle relazioni tra tabelle**: [JOIN e relazioni](https://chatgpt.com/c/05_Join_Tabelle)

---

## 🔧 Modificare una tabella con `ALTER TABLE`

Dopo aver creato una tabella, potresti aver bisogno di modificarla. Il comando `ALTER TABLE` permette di aggiungere, modificare o eliminare colonne.

### 🔹 Aggiungere una nuova colonna

```sql
ALTER TABLE utenti ADD COLUMN telefono VARCHAR(15);
```

### 🔹 Modificare il tipo di dato di una colonna

```sql
ALTER TABLE utenti ALTER COLUMN nome TYPE TEXT;
```

### 🔹 Eliminare una colonna

```sql
ALTER TABLE utenti DROP COLUMN telefono;
```

---

## 🗑️ Eliminare una tabella con `DROP TABLE`

Se una tabella non serve più, puoi eliminarla con:

```sql
DROP TABLE nome_tabella;
```

⚠️ **Attenzione**: questa operazione elimina **tutti** i dati nella tabella.

---

## ✅ Riepilogo

|Comando|Descrizione|
|---|---|
|`CREATE TABLE`|Crea una nuova tabella|
|`ALTER TABLE`|Modifica una tabella esistente|
|`DROP TABLE`|Elimina una tabella|
|`PRIMARY KEY`|Identifica univocamente una riga|
|`FOREIGN KEY`|Crea una relazione tra due tabelle|
