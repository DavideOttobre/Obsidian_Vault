
---


# 📌 Indicizzazione e Ottimizzazione delle Query SQL

## 🔎 Perché ottimizzare le query?
Quando un database cresce, il tempo di esecuzione delle query può aumentare. L'ottimizzazione aiuta a:
✅ Ridurre i tempi di risposta  
✅ Migliorare le prestazioni del database  
✅ Evitare carichi eccessivi sul server  

---

## 📌 Cos'è un indice in SQL?
Un **indice** è una struttura che accelera la ricerca dei dati in una tabella, proprio come un indice in un libro.

📌 **Vantaggi**:
- Le query con `WHERE` e `JOIN` diventano più veloci
- Le ricerche su grandi quantità di dati sono più efficienti

📌 **Svantaggi**:
- Gli indici occupano spazio aggiuntivo
- Le operazioni di `INSERT`, `UPDATE`, `DELETE` diventano leggermente più lente
````

👉 **Vedi esempi pratici**: [[08_Indicizzazione]]

---

## 🎯 Creare un indice con `CREATE INDEX`
### 🔹 Esempio: Creare un indice su una colonna usata nei filtri
```sql
CREATE INDEX idx_email ON utenti(email);
````

📌 Migliora le ricerche su `email`, velocizzando query come:

```sql
SELECT * FROM utenti WHERE email = 'esempio@email.com';
```

### 🔹 Esempio: Creare un indice su più colonne

```sql
CREATE INDEX idx_nome_cognome ON utenti(nome, cognome);
```

📌 Utile se cerchiamo spesso `WHERE nome = 'Mario' AND cognome = 'Rossi'`.

---

## 🎯 Verificare l'uso di un indice con `EXPLAIN ANALYZE`

Per capire se un indice viene usato, possiamo eseguire:

```sql
EXPLAIN ANALYZE SELECT * FROM utenti WHERE email = 'esempio@email.com';
```

📌 Se l'indice è attivo, vedremo `Index Scan` nel piano di esecuzione.

---

## 📌 Tipi di Indici in SQL

|Tipo di Indice|Descrizione|Quando usarlo?|
|---|---|---|
|**B-Tree (Default)**|Struttura ad albero bilanciato|Per ricerche e ordinamenti generali|
|**Hash Index**|Funziona con `=`|Per ricerche esatte, ma non con `ORDER BY`|
|**Full-Text Index**|Ottimizza ricerche su testi lunghi|Per trovare parole in testi|
|**Clustered Index**|Ordina fisicamente i dati|Se la tabella ha un ordine logico|

---

## 📌 Quando evitare gli indici?

🚫 **Non creare indici su colonne con pochi valori distinti**  
Esempio: una colonna con solo `Maschio` e `Femmina` non trarrà benefici da un indice.

🚫 **Non creare troppi indici sulla stessa tabella**  
Ogni indice deve essere aggiornato quando i dati cambiano.

---

## 🎯 Ottimizzare le query con `LIMIT` e `OFFSET`

Per evitare di caricare troppi dati:

```sql
SELECT * FROM utenti ORDER BY nome LIMIT 10 OFFSET 20;
```

📌 Restituisce **10 righe**, saltando le prime **20**.

---

## 🎯 Usare `EXISTS` invece di `IN`

Quando confrontiamo con un'altra tabella, `EXISTS` è più veloce di `IN`.

🔹 **Lento (`IN`)**:

```sql
SELECT * FROM utenti WHERE id IN (SELECT utente_id FROM ordini);
```

🔹 **Veloce (`EXISTS`)**:

```sql
SELECT * FROM utenti WHERE EXISTS (SELECT 1 FROM ordini WHERE ordini.utente_id = utenti.id);
```

📌 `EXISTS` si ferma appena trova un match, mentre `IN` scansiona tutto.

---

## 🎯 Usare `JOIN` invece di subquery nei `WHERE`

🔹 **Lento (`WHERE IN (subquery)`)**:

```sql
SELECT * FROM prodotti WHERE id IN (SELECT prodotto_id FROM ordini);
```

🔹 **Veloce (`JOIN`)**:

```sql
SELECT DISTINCT prodotti.* FROM prodotti JOIN ordini ON prodotti.id = ordini.prodotto_id;
```

📌 Il `JOIN` è più efficiente perché evita subquery annidate.

---

## 🔍 Riepilogo delle Ottimizzazioni

|Tecnica|Beneficio|
|---|---|
|**Creare indici**|Accelera ricerche e filtri|
|**Usare `EXPLAIN ANALYZE`**|Analizza il piano di esecuzione delle query|
|**Evitare troppi indici**|Evita rallentamenti su `INSERT/UPDATE/DELETE`|
|**Usare `LIMIT` e `OFFSET`**|Riduce il carico sulle query|
|**Sostituire `IN` con `EXISTS`**|Evita scansioni inutili|
|**Preferire `JOIN` rispetto a subquery nei `WHERE`**|Migliora le performance|

