
---

# 📌 Funzioni di aggregazione in SQL

## 🔎 Cosa sono le funzioni di aggregazione?
Le **funzioni di aggregazione** permettono di eseguire calcoli su gruppi di righe e restituire un unico valore.

👉 **Principali funzioni di aggregazione**:
| Funzione | Descrizione |
|----------|------------|
| `COUNT()` | Conta il numero di righe |
| `SUM()` | Calcola la somma dei valori |
| `AVG()` | Calcola la media |
| `MIN()` | Trova il valore minimo |
| `MAX()` | Trova il valore massimo |

👉 **Vedi esempi pratici**: [[SQL/Esempi_Pratici/06_Aggregazioni]]


---

## 🎯 Usare `COUNT()` per contare le righe
Conta il numero di righe in una tabella.

### 🔹 Esempio: Numero totale di utenti
```sql
SELECT COUNT(*) FROM utenti;
````

📌 Restituisce il numero totale di utenti nella tabella.

### 🔹 Esempio: Numero di ordini per ogni utente

```sql
SELECT utente_id, COUNT(*) AS numero_ordini
FROM ordini
GROUP BY utente_id;
```

📌 Conta quanti ordini ha effettuato ogni utente.

---

## 🎯 Usare `SUM()` per calcolare somme

Calcola la somma di una colonna numerica.

### 🔹 Esempio: Totale delle vendite

```sql
SELECT SUM(importo) AS totale_vendite FROM ordini;
```

📌 Restituisce la somma di tutti gli ordini.

### 🔹 Esempio: Totale speso da ogni utente

```sql
SELECT utente_id, SUM(importo) AS totale_speso
FROM ordini
GROUP BY utente_id;
```

📌 Calcola la somma degli acquisti per ogni utente.

---

## 🎯 Usare `AVG()` per calcolare la media

Calcola il valore medio di una colonna numerica.

### 🔹 Esempio: Prezzo medio dei prodotti

```sql
SELECT AVG(prezzo) AS prezzo_medio FROM prodotti;
```

📌 Restituisce la media dei prezzi nella tabella `prodotti`.

### 🔹 Esempio: Spesa media per utente

```sql
SELECT utente_id, AVG(importo) AS spesa_media
FROM ordini
GROUP BY utente_id;
```

📌 Calcola la media della spesa per ogni utente.

---

## 🎯 Usare `MIN()` e `MAX()` per valori minimi e massimi

Trova i valori più alti o più bassi di una colonna.

### 🔹 Esempio: Prodotto più costoso e meno costoso

```sql
SELECT MIN(prezzo) AS prezzo_minimo, MAX(prezzo) AS prezzo_massimo FROM prodotti;
```

📌 Restituisce il prezzo minimo e massimo nella tabella `prodotti`.

### 🔹 Esempio: Ordine più costoso di ogni utente

```sql
SELECT utente_id, MAX(importo) AS ordine_max
FROM ordini
GROUP BY utente_id;
```

📌 Mostra l'ordine più costoso effettuato da ogni utente.

---

## 📌 Raggruppare i dati con `GROUP BY`

`GROUP BY` raggruppa i risultati in base a una o più colonne.

### 🔹 Esempio: Numero di utenti per città

```sql
SELECT città, COUNT(*) AS numero_utenti
FROM utenti
GROUP BY città;
```

📌 Conta quanti utenti ci sono in ogni città.

### 🔹 Esempio: Totale vendite per categoria di prodotto

```sql
SELECT categoria, SUM(prezzo) AS totale_vendite
FROM prodotti
GROUP BY categoria;
```

📌 Mostra il totale delle vendite per ogni categoria.

---

## 📌 Filtrare gruppi con `HAVING`

`HAVING` permette di filtrare i risultati **dopo** aver usato `GROUP BY`.

### 🔹 Esempio: Utenti con almeno 5 ordini

```sql
SELECT utente_id, COUNT(*) AS numero_ordini
FROM ordini
GROUP BY utente_id
HAVING COUNT(*) >= 5;
```

📌 Mostra solo gli utenti con **almeno** 5 ordini.

### 🔹 Esempio: Categorie con vendite superiori a 10.000€

```sql
SELECT categoria, SUM(prezzo) AS totale_vendite
FROM prodotti
GROUP BY categoria
HAVING SUM(prezzo) > 10000;
```

📌 Mostra solo le categorie con vendite superiori a 10.000€.

---

## 🔍 Riepilogo delle funzioni di aggregazione

|Comando|Descrizione|
|---|---|
|`COUNT(*)`|Conta il numero di righe|
|`SUM(colonna)`|Somma i valori di una colonna|
|`AVG(colonna)`|Calcola la media dei valori|
|`MIN(colonna)`|Trova il valore più basso|
|`MAX(colonna)`|Trova il valore più alto|
|`GROUP BY`|Raggruppa i dati in base a una colonna|
|`HAVING`|Filtra i gruppi|
