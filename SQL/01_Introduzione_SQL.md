# 📌 Introduzione a SQL

## 📖 Cos'è SQL?
**SQL (Structured Query Language)** è un linguaggio di programmazione utilizzato per gestire e interrogare database relazionali. SQL consente di:
- **Creare e modificare database** 📂
- **Inserire, aggiornare ed eliminare dati** 📊
- **Effettuare query per recuperare informazioni** 🔎
- **Gestire permessi e sicurezza** 🔐

## ⚙️ Struttura di un database relazionale
Un **database relazionale** è composto da **tabelle** che contengono dati organizzati in righe e colonne. Ecco un esempio di una tabella utenti:

| id | nome     | email                |
|----|---------|----------------------|
| 1  | Mario Rossi | mario@email.com |
| 2  | Laura Bianchi | laura@email.com |

Ogni tabella ha:
- **Colonne** → Definiscono il tipo di dati (es. `id`, `nome`, `email`)
- **Righe (record)** → Contengono i dati effettivi
- **Chiavi primarie e chiavi esterne** → Utilizzate per collegare tabelle diverse

## 🛠️ Principali Comandi SQL
Ecco i principali comandi SQL suddivisi per categoria:

### 🔹 Creazione e gestione di tabelle
- `CREATE TABLE` → Crea una nuova tabella
- `ALTER TABLE` → Modifica una tabella esistente
- `DROP TABLE` → Elimina una tabella

### 🔹 Manipolazione dei dati
- `INSERT INTO` → Inserisce nuovi dati
- `UPDATE` → Modifica dati esistenti
- `DELETE` → Elimina dati da una tabella

### 🔹 Query sui dati
- `SELECT` → Recupera dati da una tabella
- `WHERE` → Filtra i risultati
- `ORDER BY` → Ordina i dati
- `GROUP BY` → Raggruppa i dati

### 🔹 Relazioni tra tabelle
- `JOIN` → Combina dati da più tabelle
- `UNION` → Unisce più risultati di query

👉 **Vai agli esempi pratici di selezione dati**: [[02_Selezionare_Dati]]

---

## 🔍 Perché usare SQL?
SQL è il linguaggio standard per la gestione dei database relazionali ed è utilizzato in quasi tutti i settori che lavorano con dati. Le principali ragioni per impararlo:
✅ **Struttura chiara** e facile da leggere  
✅ **Versatilità** → Può essere usato con MySQL, PostgreSQL, SQL Server, SQLite e altri  
✅ **Ottimo per analizzare dati**  
✅ **Indispensabile per il lavoro con i database**  

🎯 **Prossimo passo:** [Creazione delle Tabelle](02_Creazione_Tabelle.md)
