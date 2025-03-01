
---


# 📌 Esempi Pratici: Indicizzazione e Ottimizzazione delle Query

## 🔎 Introduzione
L’**indicizzazione** è una tecnica per velocizzare le query e migliorare le prestazioni del database.

---

## 📌 Creare un Indice per velocizzare le ricerche
Un **indice** permette al database di trovare più velocemente i dati.

### 🎯 Creare un indice su una singola colonna
```sql
CREATE INDEX idx_email ON utenti(email);
````

📌 Ottimizza le query che cercano utenti per email:

```sql
SELECT * FROM utenti WHERE email = 'esempio@email.com';
```

---

## 🎯 Creare un indice su più colonne

```sql
CREATE INDEX idx_nome_cognome ON utenti(nome, cognome);
```

📌 Migliora query con condizioni su **nome e cognome**:

```sql
SELECT * FROM utenti WHERE nome = 'Mario' AND cognome = 'Rossi';
```

---

## 📌 Verificare l’uso degli indici con `EXPLAIN ANALYZE`

### 🎯 Controllare il piano di esecuzione di una query

```sql
EXPLAIN ANALYZE SELECT * FROM utenti WHERE email = 'esempio@email.com';
```

📌 Se l'indice viene utilizzato, vedremo `Index Scan` invece di `Seq Scan`.

---

## 📌 Quando evitare gli indici?

🚫 **Non creare indici su colonne con pochi valori distinti**  
Esempio: Un indice sulla colonna `sesso` (`Maschio`, `Femmina`) non è utile.

🚫 **Non creare troppi indici**  
Ogni indice aumenta il tempo di aggiornamento (`INSERT`, `UPDATE`, `DELETE`).

---

## 📌 Usare `LIMIT` e `OFFSET` per query efficienti

### 🎯 Selezionare solo 10 risultati alla volta

```sql
SELECT * FROM utenti ORDER BY nome LIMIT 10 OFFSET 20;
```

📌 Ottimizza query su grandi dataset.

---

## 📌 Usare `EXISTS` invece di `IN`

### 🎯 Confronto tra `IN` e `EXISTS`

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

## 📌 Preferire `JOIN` invece di subquery nei `WHERE`

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
