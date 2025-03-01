
---


# 📌 Esempi Pratici: Funzioni di Aggregazione e GROUP BY

## 🔎 Introduzione
Le **funzioni di aggregazione** permettono di eseguire operazioni su gruppi di righe, restituendo un singolo valore.

---

## 🎯 Contare il numero di righe con `COUNT()`
```sql
SELECT COUNT(*) AS numero_utenti FROM utenti;
````

📌 Conta il numero totale di utenti.

---

## 🎯 Sommare valori con `SUM()`

```sql
SELECT SUM(importo) AS totale_vendite FROM ordini;
```

📌 Calcola il totale di tutti gli ordini effettuati.

---

## 🎯 Calcolare la media con `AVG()`

```sql
SELECT AVG(prezzo) AS prezzo_medio FROM prodotti;
```

📌 Restituisce il prezzo medio dei prodotti.

---

## 🎯 Ottenere il valore massimo e minimo con `MAX()` e `MIN()`

```sql
SELECT MAX(prezzo) AS prodotto_piu_caro, MIN(prezzo) AS prodotto_piu_economico FROM prodotti;
```

📌 Restituisce il prezzo massimo e minimo tra i prodotti.

---

## 📌 Raggruppare i dati con `GROUP BY`

### 🔹 Totale degli ordini per ogni utente

```sql
SELECT utente_id, SUM(importo) AS totale_speso
FROM ordini
GROUP BY utente_id;
```

📌 Calcola la somma degli acquisti per ogni utente.

### 🔹 Numero di utenti per città

```sql
SELECT città, COUNT(*) AS numero_utenti
FROM utenti
GROUP BY città;
```

📌 Conta quanti utenti ci sono in ogni città.

---

## 📌 Filtrare gruppi con `HAVING`

### 🔹 Selezionare solo gli utenti che hanno speso più di 500€

```sql
SELECT utente_id, SUM(importo) AS totale_speso
FROM ordini
GROUP BY utente_id
HAVING SUM(importo) > 500;
```

📌 Mostra solo gli utenti con una spesa totale superiore a 500€.

---

📌 **Consulta altre sezioni**:  
👉 [Filtrare i dati con WHERE](https://chatgpt.com/04_Filtrare_Dati_WHERE)  
👉 [Subquery e CTE](https://chatgpt.com/07_Subquery_e_CTE)

```

---

📌 **Istruzioni per l'uso**:
1. **Copia e incolla** il testo in un file chiamato `04_Aggregazioni.md` dentro la cartella **Esempi_Pratici** in **Obsidian**.  
2. **Prossimo file:** Esempi di subquery e CTE! 🚀  

Dimmi se vuoi modifiche o continuo con il quinto file. 😊
```