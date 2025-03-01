
---


# 📌 Esempi Pratici: Stored Procedures, Trigger e Funzioni Personalizzate

## 🔎 Introduzione
Le stored procedure, i trigger e le funzioni personalizzate permettono di automatizzare operazioni e migliorare la gestione dei dati.

---

## 📌 Stored Procedure: Automazione di operazioni SQL
Una **stored procedure** è un blocco di codice SQL che può essere riutilizzato.

### 🎯 Creare una Stored Procedure
```sql
CREATE PROCEDURE aggiungi_utente(IN nome VARCHAR(100), IN email VARCHAR(255))
LANGUAGE SQL
AS $$
    INSERT INTO utenti (nome, email) VALUES (nome, email);
$$;
````

📌 **Eseguire la procedura**:

```sql
CALL aggiungi_utente('Mario Rossi', 'mario@email.com');
```

---

## 📌 Trigger: Azioni automatiche su eventi SQL

Un **trigger** esegue un'azione automaticamente quando si verifica un evento (`INSERT`, `UPDATE`, `DELETE`).

### 🎯 Creare un Trigger per registrare eliminazioni

```sql
CREATE TABLE log_eliminazioni (
    id SERIAL PRIMARY KEY,
    utente_id INT,
    data_eliminazione TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

```sql
CREATE TRIGGER trigger_elimina_utente
AFTER DELETE ON utenti
FOR EACH ROW
EXECUTE FUNCTION registra_eliminazione();
```

```sql
CREATE FUNCTION registra_eliminazione()
RETURNS TRIGGER AS $$
BEGIN
    INSERT INTO log_eliminazioni (utente_id) VALUES (OLD.id);
    RETURN OLD;
END;
$$ LANGUAGE plpgsql;
```

📌 Ogni volta che un utente viene eliminato, il suo ID viene registrato in `log_eliminazioni`.

---

## 📌 Funzioni SQL Personalizzate

Le **funzioni SQL** restituiscono valori personalizzati in base ai dati del database.

### 🎯 Creare una Funzione per calcolare il totale speso da un utente

```sql
CREATE FUNCTION totale_speso(utente_id INT) RETURNS DECIMAL AS $$
DECLARE totale DECIMAL;
BEGIN
    SELECT SUM(importo) INTO totale FROM ordini WHERE ordini.utente_id = utente_id;
    RETURN totale;
END;
$$ LANGUAGE plpgsql;
```

📌 **Usare la funzione**:

```sql
SELECT totale_speso(1);
```

📌 **Restituisce la somma degli acquisti dell’utente con `id = 1`**.

---
