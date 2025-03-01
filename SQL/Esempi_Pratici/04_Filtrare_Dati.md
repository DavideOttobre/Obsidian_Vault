
---


# 📌 Esempi Pratici: Filtrare i Dati con `WHERE`

## 🔎 Introduzione
Il comando `WHERE` viene usato per **selezionare solo le righe** che soddisfano determinate condizioni.

---

## 📌 Usare `WHERE` per filtrare i risultati
### 🎯 Selezionare utenti con email Gmail
```sql
SELECT * FROM utenti WHERE email LIKE '%@gmail.com';
````

📌 Mostra solo gli utenti con un'email Gmail.

### 🎯 Selezionare prodotti con prezzo superiore a 50€

```sql
SELECT * FROM prodotti WHERE prezzo > 50;
```

📌 Restituisce solo i prodotti con prezzo maggiore di 50.

---

## 📌 Filtri multipli con `AND` e `OR`

### 🎯 `AND`: Entrambe le condizioni devono essere vere

```sql
SELECT * FROM utenti WHERE nome = 'Mario' AND città = 'Roma';
```

📌 Mostra solo gli utenti di nome **Mario** che vivono a **Roma**.

### 🎯 `OR`: Almeno una condizione deve essere vera

```sql
SELECT * FROM utenti WHERE città = 'Roma' OR città = 'Milano';
```

📌 Mostra gli utenti che vivono **a Roma O Milano**.

---

## 📌 Usare `BETWEEN` per filtrare intervalli di dati

### 🎯 Selezionare prodotti con prezzo tra 50€ e 100€

```sql
SELECT * FROM prodotti WHERE prezzo BETWEEN 50 AND 100;
```

📌 Restituisce solo i prodotti con prezzo compreso tra 50 e 100.

### 🎯 Selezionare utenti nati tra il 1990 e il 2000

```sql
SELECT * FROM utenti WHERE anno_nascita BETWEEN 1990 AND 2000;
```

📌 Restituisce gli utenti nati tra il 1990 e il 2000.

---

## 📌 Usare `LIKE` per cercare testi parziali

### 🎯 Filtrare utenti il cui nome inizia con "A"

```sql
SELECT * FROM utenti WHERE nome LIKE 'A%';
```

📌 Restituisce tutti gli utenti il cui nome inizia con "A".

### 🎯 Selezionare email che contengono "yahoo"

```sql
SELECT * FROM utenti WHERE email LIKE '%yahoo%';
```

📌 Mostra tutti gli utenti con un’email che contiene "yahoo".

---

## 📌 Usare `NOT` per escludere dati

### 🎯 Selezionare tutti gli utenti tranne quelli di Milano

```sql
SELECT * FROM utenti WHERE città NOT LIKE 'Milano';
```

### 🎯 Selezionare prodotti che non appartengono alla categoria "alimentari"

```sql
SELECT * FROM prodotti WHERE categoria != 'alimentari';
```

📌 Restituisce tutti i prodotti **tranne** quelli della categoria "alimentari".

---
