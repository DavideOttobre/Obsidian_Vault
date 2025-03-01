## Funzioni mysql-connector

| Funzione                                            | Descrizione                                                                                       |
| --------------------------------------------------- | ------------------------------------------------------------------------------------------------- |
| [[connect_to_db]](host, user, password, database)   | Stabilisce una connessione al database MySQL specificando host, utente, password e database.      |
| close_connection(connection)                        | Chiude la connessione al database.                                                                |
| [[execute_query]](connection, query)                | Esegue una query SQL (INSERT, UPDATE, DELETE) senza restituire risultati (per modificare i dati). |
| [[fetch_one]](connection, query)                    | Esegue una query SQL e restituisce un singolo risultato (ad esempio, una singola riga).           |
| [[fetch_all]](connection, query)                    | Esegue una query SQL e restituisce tutti i risultati (ad esempio, tutte le righe di una tabella). |
| create_table(connection, table_query)               | Crea una nuova tabella nel database MySQL in base alla query SQL passata.                         |
| [[insert_data]](connection, table, data)            | Inserisce dati in una tabella specifica. `data` è un dizionario con colonne e valori da inserire. |
| [[update_data]](connection, table, data, condition) | Aggiorna i dati in una tabella in base a una condizione specifica.                                |
| [[delete_data]](connection, table, condition)       | Elimina i dati da una tabella in base a una condizione specifica.                                 |
| begin_transaction(connection)                       | Inizia una transazione nel database.                                                              |
| commit_transaction(connection)                      | Esegue il commit di una transazione per salvare le modifiche nel database.                        |
| rollback_transaction(connection)                    | Esegue il rollback di una transazione per annullare le modifiche.                                 |
| create_index(connection, table, column)             | Crea un indice su una colonna specifica di una tabella per migliorare le performance delle query. |
| drop_table(connection, table)                       | Elimina una tabella dal database MySQL.                                                           |
| get_table_columns(connection, table)                | Restituisce i nomi delle colonne di una tabella.                                                  |
| check_table_exists(connection, table)               | Verifica se una tabella esiste nel database.                                                      |
| count_rows(connection, table)                       | Restituisce il numero di righe di una tabella specifica.                                          |
| [[cursor]]                                          | Il metodo cursor crea un oggetto in grado di interagire con il database e contenere gli output    |

Queste funzioni coprono le operazioni fondamentali per lavorare con un database MySQL tramite Python. Se ti interessa vedere come implementare una o più di queste funzioni, fammi sapere!