
---


# 📌 Filtrare i dati con `WHERE` in SQL

## 🔎 Introduzione al filtro con `WHERE`
Il comando `WHERE` viene usato per **selezionare solo le righe** che soddisfano una determinata condizione. Si può applicare a **qualsiasi colonna**, sia con valori numerici che testuali.

---

## 🎯 Sintassi di base:
```sql
SELECT colonne
FROM nome_tabella
WHERE condizione;
````

### 🔹 Esempio: Selezionare tutti gli utenti con email Gmail

```sql
SELECT * FROM utenti WHERE email LIKE '%@gmail.com';
```

📌 Restituisce solo le righe in cui la colonna `email` contiene "@gmail.com".

👉 **Vedi esempi pratici**: [[Esempi_Pratici/04_Filtrare_Dati]]

---

## 📌 Operatori di confronto in SQL

|Operatore|Significato|Esempio|
|---|---|---|
|`=`|Uguale a|`WHERE nome = 'Mario'`|
|`!=` o `<>`|Diverso da|`WHERE prezzo <> 100`|
|`>`|Maggiore di|`WHERE prezzo > 50`|
|`<`|Minore di|`WHERE età < 30`|
|`>=`|Maggiore o uguale a|`WHERE punti >= 80`|
|`<=`|Minore o uguale a|`WHERE sconto <= 20`|

### 🔹 Filtrare prodotti con prezzo superiore a 100

```sql
SELECT * FROM prodotti WHERE prezzo > 100;
```

### 🔹 Selezionare utenti con almeno 25 anni

```sql
SELECT * FROM utenti WHERE età >= 25;
```

---

## 📌 Filtri multipli: `AND` e `OR`

### 🔹 `AND`: Tutte le condizioni devono essere vere

```sql
SELECT * FROM prodotti WHERE prezzo > 50 AND categoria = 'elettronica';
```

📌 Restituisce solo prodotti **elettronici** con prezzo superiore a 50.

### 🔹 `OR`: Almeno una condizione deve essere vera

```sql
SELECT * FROM utenti WHERE città = 'Roma' OR città = 'Milano';
```

📌 Restituisce utenti che vivono **a Roma O Milano**.

---

## 📌 Filtrare intervalli con `BETWEEN`

Il comando `BETWEEN` serve per selezionare valori **compresi tra due estremi**.

### 🔹 Selezionare prodotti con prezzo tra 50 e 100

```sql
SELECT * FROM prodotti WHERE prezzo BETWEEN 50 AND 100;
```

### 🔹 Selezionare utenti nati tra il 1990 e il 2000

```sql
SELECT * FROM utenti WHERE anno_nascita BETWEEN 1990 AND 2000;
```

---

## 📌 Cercare parole chiave con `LIKE`

Il comando `LIKE` permette di **trovare valori testuali parziali**, usando i caratteri speciali:

- `%` → Qualsiasi numero di caratteri
- `_` → Un solo carattere

|Esempio|Significato|
|---|---|
|`LIKE 'M%'`|Tutti i nomi che iniziano con M|
|`LIKE '%gmail.com'`|Email che finiscono con gmail.com|
|`LIKE '_ario'`|Parole di 5 lettere che terminano con 'ario'|

### 🔹 Selezionare utenti il cui nome inizia con "A"

```sql
SELECT * FROM utenti WHERE nome LIKE 'A%';
```

### 🔹 Selezionare email che contengono "yahoo"

```sql
SELECT * FROM utenti WHERE email LIKE '%yahoo%';
```

---

## 📌 Escludere valori con `NOT`

Il comando `NOT` nega una condizione.

### 🔹 Selezionare tutti gli utenti tranne quelli di Milano

```sql
SELECT * FROM utenti WHERE città NOT LIKE 'Milano';
```

### 🔹 Selezionare prodotti che non sono nella categoria "alimentari"

```sql
SELECT * FROM prodotti WHERE categoria != 'alimentari';
```

---

## 🔍 Riepilogo dei Filtri `WHERE`

|Comando|Descrizione|
|---|---|
|`WHERE`|Filtra le righe|
|`AND`|Entrambe le condizioni devono essere vere|
|`OR`|Almeno una condizione deve essere vera|
|`BETWEEN`|Seleziona valori tra due estremi|
|`LIKE`|Cerca stringhe parziali|
|`NOT`|Esclude valori specifici|

🎯 **Prossimo passo:** [Join tra Tabelle](https://chatgpt.com/c/05_Join_Tabelle)

```

---

📌 **Istruzioni per l'uso**:
1. **Copia e incolla** questo testo in una nuova nota **Obsidian** chiamata `04_Filtrare_Dati_WHERE.md`.  
2. Il link `[[Esempi_Pratici/04_Filtrare_Dati]]` ti porterà agli esempi pratici.  
3. **Prossimo file:** Come unire dati da più tabelle con `JOIN`! 🚀

Dimmi se vuoi modifiche o continuo con il quinto file. 😊
```