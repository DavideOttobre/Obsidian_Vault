
---


# 📌 Esempi Pratici: Subquery e CTE in SQL

## 🔎 Introduzione
Le **subquery** e le **CTE** permettono di suddividere query complesse in parti più leggibili e organizzate.

---

## 📌 Subquery (Query Annidate)
Una **subquery** è una query all'interno di un'altra query.

---

## 🎯 Subquery nel `SELECT`
### 🔹 Ottenere il totale degli ordini per ogni utente
```sql
SELECT nome, 
       (SELECT COUNT(*) FROM ordini WHERE ordini.utente_id = utenti.id) AS numero_ordini
FROM utenti;
````

📌 Conta quanti ordini ha effettuato ciascun utente.

---

## 🎯 Subquery nel `WHERE`

### 🔹 Selezionare utenti che hanno effettuato almeno un ordine

```sql
SELECT * FROM utenti
WHERE id IN (SELECT utente_id FROM ordini);
```

📌 Mostra solo gli utenti che hanno almeno un ordine registrato.

---

## 🎯 Subquery nel `FROM`

### 🔹 Calcolare la spesa media degli utenti

```sql
SELECT utente_id, spesa_media
FROM (SELECT utente_id, AVG(importo) AS spesa_media FROM ordini GROUP BY utente_id) AS media_spese;
```

📌 La subquery calcola la media della spesa per ogni utente, poi la query principale la seleziona.

---

## 📌 Common Table Expressions (CTE)

Le **CTE (`WITH`)** migliorano la leggibilità delle query rispetto alle subquery.

---

## 🎯 Usare una CTE per calcolare il totale speso per utente

```sql
WITH vendite_utenti AS (
    SELECT utente_id, SUM(importo) AS totale_speso
    FROM ordini
    GROUP BY utente_id
)
SELECT utenti.nome, vendite_utenti.totale_speso
FROM utenti
JOIN vendite_utenti ON utenti.id = vendite_utenti.utente_id;
```

📌 La CTE `vendite_utenti` calcola il totale degli acquisti per utente, poi la query principale li visualizza.

---

## 🎯 CTE Ricorsiva: Gerarchia dei Dipendenti

```sql
WITH RECURSIVE gerarchia AS (
    SELECT id, nome, manager_id
    FROM dipendenti
    WHERE manager_id IS NULL  -- Seleziona il CEO

    UNION ALL

    SELECT d.id, d.nome, d.manager_id
    FROM dipendenti d
    INNER JOIN gerarchia g ON d.manager_id = g.id
)
SELECT * FROM gerarchia;
```

📌 Questo esempio trova tutti i dipendenti e la loro posizione gerarchica.

---
