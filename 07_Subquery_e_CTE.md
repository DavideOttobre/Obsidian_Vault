
---
# 📌 Subquery e CTE in SQL

## 🔎 Cosa sono le subquery e le CTE?
Le **subquery** e le **Common Table Expressions (CTE)** permettono di scrivere query più avanzate e leggibili, suddividendo il problema in parti più semplici.

👉 **Differenza principale**:
- **Subquery** → È una query all'interno di un'altra query.
- **CTE (`WITH`)** → È una query temporanea, più leggibile rispetto a una subquery.



👉 **Vedi esempi pratici**: [[07_Subquery_CTE]]


---

## 📌 Subquery (Query Annidate)
Una **subquery** è una query all'interno di un'altra query. Può essere utilizzata:
- Nel `SELECT` per calcolare valori derivati
- Nel `WHERE` per filtrare i dati
- Nel `FROM` per creare tabelle temporanee

---

## 🎯 Subquery nel `SELECT`
### 🔹 Esempio: Totale ordini per ogni utente
```sql
SELECT nome, 
       (SELECT COUNT(*) FROM ordini WHERE ordini.utente_id = utenti.id) AS numero_ordini
FROM utenti;
````

📌 Conta gli ordini di ciascun utente.

---

## 🎯 Subquery nel `WHERE`

### 🔹 Esempio: Selezionare utenti che hanno effettuato almeno un ordine

```sql
SELECT * FROM utenti
WHERE id IN (SELECT utente_id FROM ordini);
```

📌 Seleziona solo gli utenti che hanno almeno un ordine.

### 🔹 Esempio: Selezionare prodotti con prezzo superiore alla media

```sql
SELECT * FROM prodotti
WHERE prezzo > (SELECT AVG(prezzo) FROM prodotti);
```

📌 Mostra i prodotti con prezzo superiore alla media.

---

## 🎯 Subquery nel `FROM`

### 🔹 Esempio: Calcolare il prezzo medio dei prodotti per categoria

```sql
SELECT categoria, prezzo_medio
FROM (SELECT categoria, AVG(prezzo) AS prezzo_medio FROM prodotti GROUP BY categoria) AS media_prodotti;
```

📌 La subquery crea una tabella temporanea con la media dei prezzi per categoria.

---

## 📌 CTE (Common Table Expressions)

Una **CTE (`WITH`)** è simile a una subquery, ma: ✅ Migliora la leggibilità  
✅ Può essere riutilizzata più volte nella query  
✅ Permette di spezzare query complesse in parti più semplici

### 🏗️ Sintassi base:

```sql
WITH nome_cte AS (
    SELECT colonne FROM tabella WHERE condizioni
)
SELECT * FROM nome_cte;
```

---

## 🎯 Usare una CTE al posto di una subquery

### 🔹 Esempio: Calcolare il totale delle vendite per utente

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

📌 La CTE `vendite_utenti` calcola il totale speso da ogni utente, poi viene usata nella query principale.

---

## 🎯 CTE con più query (`RECURSIVE`)

Le **CTE ricorsive** permettono di eseguire query su dati gerarchici.

### 🔹 Esempio: Struttura gerarchica di dipendenti

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

📌 Trova tutti i dipendenti e la loro posizione nella gerarchia aziendale.

---

## 🔍 Riepilogo delle Subquery e CTE

|Tecnica|Descrizione|Quando usarla?|
|---|---|---|
|**Subquery nel SELECT**|Calcola un valore derivato|Quando il valore è un singolo dato|
|**Subquery nel WHERE**|Filtra i risultati|Quando si confrontano dati tra tabelle|
|**Subquery nel FROM**|Crea una tabella temporanea|Quando serve un dataset intermedio|
|**CTE (`WITH`)**|Definisce una query temporanea|Quando si migliora la leggibilità|
|**CTE Ricorsiva**|Lavora con dati gerarchici|Per strutture come alberi e gerarchie|
