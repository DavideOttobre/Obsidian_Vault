
---


# 📌 Esempi Pratici: JOIN tra Tabelle in SQL

## 🔎 Introduzione
I **JOIN** permettono di combinare dati da più tabelle, basandosi su una colonna comune.

---

## 🎯 INNER JOIN: Restituire solo corrispondenze
```sql
SELECT utenti.nome, ordini.id, ordini.importo
FROM utenti
INNER JOIN ordini ON utenti.id = ordini.utente_id;
````

📌 Mostra **solo** gli utenti che hanno effettuato almeno un ordine.

---

## 🎯 LEFT JOIN: Restituire tutti i dati della prima tabella

```sql
SELECT utenti.nome, ordini.id, ordini.importo
FROM utenti
LEFT JOIN ordini ON utenti.id = ordini.utente_id;
```

📌 Mostra **tutti** gli utenti, anche quelli senza ordini (in questo caso, `ordini.id` sarà `NULL`).

---

## 🎯 RIGHT JOIN: Restituire tutti i dati della seconda tabella

```sql
SELECT utenti.nome, ordini.id, ordini.importo
FROM utenti
RIGHT JOIN ordini ON utenti.id = ordini.utente_id;
```

📌 Mostra **tutti gli ordini**, anche se l'utente non esiste più nella tabella `utenti`.

---

## 🎯 FULL OUTER JOIN: Restituire tutti i dati di entrambe le tabelle

```sql
SELECT utenti.nome, ordini.id, ordini.importo
FROM utenti
FULL OUTER JOIN ordini ON utenti.id = ordini.utente_id;
```

📌 Include **tutti gli utenti e tutti gli ordini**, anche se non c'è corrispondenza tra loro.

---

## 🎯 JOIN su più tabelle

```sql
SELECT utenti.nome, ordini.id AS ordine_id, prodotti.nome AS prodotto
FROM utenti
INNER JOIN ordini ON utenti.id = ordini.utente_id
INNER JOIN dettagli_ordini ON ordini.id = dettagli_ordini.ordine_id
INNER JOIN prodotti ON dettagli_ordini.prodotto_id = prodotti.id;
```

📌 Mostra il nome degli utenti, gli ID degli ordini e i prodotti acquistati.

---
