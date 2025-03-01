
---


# 📌 Esempi Pratici: Selezionare Dati in SQL

## 🔎 Introduzione
In questa sezione vediamo esempi pratici di utilizzo del comando `SELECT` per estrarre informazioni dalle tabelle.

---

## 🎯 Selezionare tutti i dati da una tabella
```sql
SELECT * FROM utenti;
````

📌 Restituisce tutte le righe e colonne della tabella `utenti`.

---

## 🎯 Selezionare colonne specifiche

```sql
SELECT nome, email FROM utenti;
```

📌 Mostra solo le colonne `nome` e `email`.

---

## 🎯 Selezionare i primi N risultati con `LIMIT`

```sql
SELECT * FROM prodotti LIMIT 10;
```

📌 Restituisce solo i primi **10 prodotti**.

---

## 🎯 Ordinare i risultati con `ORDER BY`

```sql
SELECT nome, prezzo FROM prodotti ORDER BY prezzo DESC;
```

📌 Ordina i prodotti dal più caro al più economico.

---

## 🎯 Filtrare i risultati con `WHERE`

```sql
SELECT * FROM utenti WHERE email LIKE '%gmail.com';
```

📌 Mostra solo gli utenti con un'email Gmail.

---

## 🎯 Selezionare i valori unici con `DISTINCT`

```sql
SELECT DISTINCT città FROM utenti;
```

📌 Restituisce solo le città senza duplicati.

---
