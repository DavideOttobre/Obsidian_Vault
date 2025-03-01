
---


# 📌 SQL Avanzato: Stored Procedures, Trigger e Funzioni Personalizzate

## 🔎 Cosa vedremo in questa sezione?
In SQL avanzato possiamo:
✅ Automatizzare operazioni con **stored procedure**  
✅ Creare azioni automatiche con **trigger**  
✅ Definire funzioni personalizzate  


👉 **Vedi esempi pratici**: [[SQL/Esempi_Pratici/10_SQL_Avanzato]]

---

## 📌 Stored Procedure: Automazione di operazioni SQL
Una **stored procedure** è un blocco di codice SQL che può essere eseguito più volte con parametri dinamici.

📌 **Vantaggi delle stored procedure**:
- Migliorano la performance evitando query ripetitive  
- Aumentano la sicurezza evitando SQL injection  
- Sono facili da riutilizzare  

---

## 🎯 Creare una Stored Procedure
### 🔹 Esempio: Aggiungere un nuovo utente automaticamente
```sql
CREATE PROCEDURE aggiungi_utente(IN nome VARCHAR(100), IN email VARCHAR(255))
LANGUAGE SQL
AS $$
    INSERT INTO utenti (nome, email) VALUES (nome, email);
$$;
````

📌 **Chiamare la procedura**:

```sql
CALL aggiungi_utente('Mario Rossi', 'mario@email.com');
```

---

## 📌 Trigger: Eseguire azioni automatiche

Un **trigger** esegue un'azione automaticamente quando si verifica un evento (`INSERT`, `UPDATE`, `DELETE`).

📌 **Quando usare i trigger?** ✅ Per aggiornare dati automaticamente  
✅ Per registrare modifiche in un'altra tabella

---

## 🎯 Creare un Trigger

### 🔹 Esempio: Registrare ogni eliminazione di un utente in una tabella di log

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

📌 Quando un utente viene eliminato, il suo `id` viene salvato in `log_eliminazioni`.

---

## 📌 Funzioni SQL Personalizzate

Le **funzioni SQL** permettono di calcolare e restituire valori personalizzati.

---

## 🎯 Creare una Funzione Personalizzata

### 🔹 Esempio: Calcolare il totale speso da un utente

```sql
CREATE FUNCTION totale_speso(utente_id INT) RETURNS DECIMAL AS $$
DECLARE totale DECIMAL;
BEGIN
    SELECT SUM(importo) INTO totale FROM ordini WHERE ordini.utente_id = utente_id;
    RETURN totale;
END;
$$ LANGUAGE plpgsql;
```

📌 **Utilizzare la funzione**:

```sql
SELECT totale_speso(1);
```

📌 **Restituisce la somma degli acquisti dell’utente con `id = 1`**.

---

## 🔍 Riepilogo delle Tecniche Avanzate

|Tecnica|Descrizione|
|---|---|
|`Stored Procedure`|Esegue blocchi di codice SQL su richiesta|
|`Trigger`|Esegue azioni automatiche su eventi (`INSERT`, `DELETE`, etc.)|
|`Funzioni Personalizzate`|Definisce operazioni personalizzate sui dati|
