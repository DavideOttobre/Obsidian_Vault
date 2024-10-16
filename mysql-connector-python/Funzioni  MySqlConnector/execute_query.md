L'approfondimento sulla funzione `execute_query` ti aiuterà a capire come eseguire correttamente query SQL che non restituiscono risultati (come `INSERT`, `UPDATE`, `DELETE`, o la creazione di tabelle). La funzione è utile per interagire con un database MySQL e manipolare i dati.

### Codice della funzione `execute_query`

Ecco un esempio di implementazione della funzione `execute_query`:

```python
import mysql.connector
from mysql.connector import Error

def execute_query(connection, query, data=None):
    """
    Esegue una query SQL (INSERT, UPDATE, DELETE, CREATE, ecc.) senza restituire risultati.
    
    Parametri:
    - connection: Oggetto connessione creato tramite mysql.connector.connect()
    - query: La query SQL da eseguire
    - data: Dati da passare alla query (opzionale), utile per query parametriche
    
    Ritorna:
    - True se l'operazione ha successo, False in caso di errore
    """
    cursor = connection.cursor()
    try:
        if data:
            cursor.execute(query, data)  # Usa dati parametrizzati
        else:
            cursor.execute(query)  # Esegue direttamente la query

        connection.commit()  # Applica le modifiche al database
        print("Query eseguita con successo.")
        return True
    except Error as e:
        print(f"Errore durante l'esecuzione della query: {e}")
        connection.rollback()  # Annulla in caso di errore
        return False
    finally:
        cursor.close()  # Chiude il cursore
```

### Dettagli sul funzionamento

1. **Parametri della funzione**:
   - **connection**: È l'oggetto connessione creato in precedenza con `mysql.connector.connect()`. Deve essere valido e aperto per poter eseguire le query.
   - **query**: È la stringa SQL che vuoi eseguire, come `INSERT INTO`, `UPDATE`, `DELETE`, `CREATE TABLE`, ecc.
   - **data (opzionale)**: Se stai utilizzando query parametriche, ad esempio per evitare SQL injection o per eseguire query multiple con valori variabili, puoi passare un tuple o un dizionario contenente i valori da inserire nella query. Se non utilizzi dati parametrici, puoi ignorare questo parametro.

2. **Comportamento della funzione**:
   - **Esecuzione della query**: Se sono presenti parametri (`data`), viene utilizzato il metodo `cursor.execute(query, data)`. Questo consente di inserire dati in modo sicuro nella query SQL.
   - **Commit e rollback**: Dopo aver eseguito la query, viene chiamato `connection.commit()` per confermare e salvare i cambiamenti nel database. In caso di errore, viene eseguito un `rollback()` per annullare la transazione, garantendo che i dati non siano modificati parzialmente.
   - **Chiusura del cursore**: Il cursore viene chiuso con `cursor.close()` per liberare le risorse.

3. **Uso del `try-except`**:
   - La funzione è protetta da un blocco `try-except`, che cattura eventuali errori durante l'esecuzione della query e li gestisce mostrando un messaggio d'errore e annullando l'operazione con un rollback.

4. **Commit esplicito**:
   - È importante notare che la funzione esegue un commit esplicito (con `connection.commit()`), quindi le modifiche al database vengono salvate. Se desideri eseguire più operazioni all'interno di una singola transazione, potresti voler gestire manualmente i commit all'esterno di questa funzione.

### Esempi di utilizzo

#### Esecuzione di una query `INSERT`:

```python
query = "INSERT INTO users (name, age) VALUES (%s, %s)"
data = ("John Doe", 28)

# Esegue la query inserendo il nome e l'età nella tabella users
execute_query(connection, query, data)
```

#### Esecuzione di una query `UPDATE`:

```python
query = "UPDATE users SET age = %s WHERE name = %s"
data = (30, "John Doe")

# Aggiorna l'età di John Doe
execute_query(connection, query, data)
```

#### Creazione di una tabella:

```python
query = """
CREATE TABLE users (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    age INT NOT NULL
);
"""
# Crea la tabella users nel database
execute_query(connection, query)
```

### Errori comuni e suggerimenti

1. **Errore di connessione**:
   Assicurati che la connessione al database sia attiva prima di eseguire la query. Puoi usare `connection.is_connected()` per verificare che la connessione sia aperta.

2. **SQL Injection**:
   È importante utilizzare query parametriche per evitare vulnerabilità SQL Injection. Questo è il motivo per cui il parametro `data` viene passato separatamente dalla stringa SQL. Non concatenare mai le variabili direttamente nella stringa SQL.

   ```python
   # Sicuro
   query = "INSERT INTO users (name, age) VALUES (%s, %s)"
   data = ("Alice", 25)
   ```

3. **Gestione delle transazioni**:
   Se stai eseguendo più operazioni all'interno di una singola sessione, puoi utilizzare manualmente `connection.commit()` e `connection.rollback()` all'esterno della funzione per avere un maggiore controllo.

4. **Query troppo grandi**:
   Se hai una query molto lunga (ad esempio, un bulk di `INSERT`), potresti voler dividere l'operazione in più parti o utilizzare `executemany()` per eseguire batch di query con dati multipli.

### Conclusione

La funzione `execute_query` è un componente fondamentale per modificare i dati in un database MySQL. Utilizzando correttamente query parametriche e gestendo in modo sicuro la connessione e i commit, puoi garantire un'interazione sicura e stabile con il database.