
---

# 📌 Join tra Tabelle in SQL

## 🔎 Cosa sono i JOIN?
Un **JOIN** in SQL consente di combinare i dati da due o più tabelle basandosi su una colonna comune.

### 🏗️ Struttura base di un JOIN:
```sql
SELECT colonne
FROM tabella1
JOIN tabella2 ON tabella1.colonna = tabella2.colonna;
````

👉 **Vedi esempi pratici**: [[Esempi_Pratici/03_Usare_Join]]

---

## 📌 Tipi di JOIN in SQL

|Tipo di JOIN|Descrizione|
|---|---|
|`INNER JOIN`|Restituisce solo le righe che hanno corrispondenza in entrambe le tabelle|
|`LEFT JOIN`|Restituisce tutte le righe della tabella sinistra e le corrispondenze della tabella destra|
|`RIGHT JOIN`|Restituisce tutte le righe della tabella destra e le corrispondenze della tabella sinistra|
|`FULL OUTER JOIN`|Restituisce tutte le righe di entrambe le tabelle, anche se non ci sono corrispondenze|

---

## 🎯 INNER JOIN (Join Interno)

Un `INNER JOIN` restituisce **solo le righe con corrispondenza in entrambe le tabelle**.

### 🔹 Esempio: Unire utenti e ordini

```sql
SELECT utenti.nome, ordini.id, ordini.importo
FROM utenti
INNER JOIN ordini ON utenti.id = ordini.utente_id;
```

📌 **Spiegazione**:

- `utenti` contiene le informazioni degli utenti.
- `ordini` contiene gli acquisti degli utenti.
- `INNER JOIN` restituisce solo gli utenti che hanno almeno un ordine.

---

## 🎯 LEFT JOIN (Join Sinistro)

Un `LEFT JOIN` restituisce **tutti i record della tabella sinistra** e solo quelli corrispondenti della tabella destra.

### 🔹 Esempio: Utenti con e senza ordini

```sql
SELECT utenti.nome, ordini.id, ordini.importo
FROM utenti
LEFT JOIN ordini ON utenti.id = ordini.utente_id;
```

📌 **Spiegazione**:

- Tutti gli utenti saranno inclusi, anche quelli **senza ordini**.
- Se un utente non ha ordini, `ordini.id` e `ordini.importo` saranno `NULL`.

---

## 🎯 RIGHT JOIN (Join Destro)

Un `RIGHT JOIN` restituisce **tutti i record della tabella destra** e solo quelli corrispondenti della tabella sinistra.

### 🔹 Esempio: Tutti gli ordini, anche senza utenti registrati

```sql
SELECT utenti.nome, ordini.id, ordini.importo
FROM utenti
RIGHT JOIN ordini ON utenti.id = ordini.utente_id;
```

📌 **Spiegazione**:

- Tutti gli ordini saranno inclusi, anche se l'utente non esiste più.

---

## 🎯 FULL OUTER JOIN

Un `FULL OUTER JOIN` restituisce **tutti i record di entrambe le tabelle**, anche se non ci sono corrispondenze.

### 🔹 Esempio: Unire utenti e ordini (inclusi utenti senza ordini e ordini senza utenti)

```sql
SELECT utenti.nome, ordini.id, ordini.importo
FROM utenti
FULL OUTER JOIN ordini ON utenti.id = ordini.utente_id;
```

📌 **Spiegazione**:

- Vengono inclusi **tutti gli utenti** e **tutti gli ordini**, anche se non c'è corrispondenza.

---

## 🏗️ JOIN tra più di due tabelle

È possibile combinare più tabelle in una singola query.

### 🔹 Esempio: Unire utenti, ordini e dettagli degli ordini

```sql
SELECT utenti.nome, ordini.id, dettagli.prodotti, dettagli.quantità
FROM utenti
INNER JOIN ordini ON utenti.id = ordini.utente_id
INNER JOIN dettagli ON ordini.id = dettagli.ordine_id;
```

📌 **Spiegazione**:

- `utenti` si unisce a `ordini`.
- `ordini` si unisce a `dettagli`, che contiene informazioni sui prodotti acquistati.

---

## 🔍 Riepilogo dei JOIN

|Tipo di JOIN|Descrizione|
|---|---|
|`INNER JOIN`|Restituisce solo le righe con corrispondenza in entrambe le tabelle|
|`LEFT JOIN`|Restituisce tutte le righe della prima tabella, anche se non hanno corrispondenze|
|`RIGHT JOIN`|Restituisce tutte le righe della seconda tabella, anche se non hanno corrispondenze|
|`FULL OUTER JOIN`|Restituisce tutte le righe di entrambe le tabelle, anche senza corrispondenze|
