
---


# 📌 Query di base in SQL

## 🔎 Introduzione alle Query SQL
Le **query** sono istruzioni SQL utilizzate per recuperare, filtrare e manipolare dati all'interno di un database. Il comando principale per estrarre informazioni da una tabella è `SELECT`.

---

## 🏗️ Struttura di una Query SQL
```sql
SELECT colonne
FROM nome_tabella
WHERE condizioni
ORDER BY colonna ASC/DESC
LIMIT numero_righe;
````

📌 **Componenti principali**:

- `SELECT` → Definisce le colonne da estrarre
- `FROM` → Specifica la tabella da cui prelevare i dati
- `WHERE` → Filtra i risultati (opzionale)
- `ORDER BY` → Ordina i dati in ordine crescente (`ASC`) o decrescente (`DESC`) (opzionale)
- `LIMIT` → Restringe il numero di risultati (opzionale)

---

## 📌 Selezionare Dati con `SELECT`

### 🔹 Selezionare tutte le colonne di una tabella

```sql
SELECT * FROM utenti;
```

📌 Restituisce **tutte** le righe e colonne della tabella `utenti`.

### 🔹 Selezionare colonne specifiche

```sql
SELECT nome, email FROM utenti;
```

📌 Estrae solo le colonne `nome` e `email`.

👉 **Vedi esempi pratici**: [[02_Selezionare_Dati]]

---

## 🎯 Filtrare i dati con `WHERE`

Il **clausola WHERE** viene usata per selezionare righe specifiche.

### 🔹 Selezionare utenti con email specifica

```sql
SELECT * FROM utenti WHERE email = 'esempio@email.com';
```

### 🔹 Filtrare risultati con condizioni numeriche

```sql
SELECT * FROM prodotti WHERE prezzo > 50;
```

📌 Restituisce solo i prodotti con prezzo superiore a 50.

### 🔹 Filtrare risultati con più condizioni (`AND`, `OR`)

```sql
SELECT * FROM utenti WHERE nome = 'Mario' AND email LIKE '%@gmail.com';
```

📌 Seleziona tutti gli utenti con **nome "Mario"** e **email Gmail**.

---

## 📌 Ordinare i dati con `ORDER BY`

L'ordine dei risultati può essere modificato usando `ORDER BY`.

### 🔹 Ordinare per nome in ordine alfabetico (ASC)

```sql
SELECT * FROM utenti ORDER BY nome ASC;
```

### 🔹 Ordinare per prezzo in ordine decrescente (DESC)

```sql
SELECT * FROM prodotti ORDER BY prezzo DESC;
```

📌 Mostra i prodotti dal più costoso al più economico.

---

## 📌 Limitare i risultati con `LIMIT`

Se vuoi ottenere solo un certo numero di risultati, usa `LIMIT`.

### 🔹 Selezionare i primi 5 utenti

```sql
SELECT * FROM utenti LIMIT 5;
```

### 🔹 Selezionare i prodotti più costosi (top 3)

```sql
SELECT * FROM prodotti ORDER BY prezzo DESC LIMIT 3;
```

---

## 🔍 Riepilogo delle Query Base

|Comando|Descrizione|
|---|---|
|`SELECT * FROM tabella;`|Seleziona tutti i dati dalla tabella|
|`SELECT col1, col2 FROM tabella;`|Seleziona colonne specifiche|
|`WHERE`|Filtra i risultati|
|`ORDER BY`|Ordina i dati|
|`LIMIT`|Limita il numero di righe restituite|
