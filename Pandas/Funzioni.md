| Funzione          | Descrizione                                                                                        | Esempio di utilizzo                                                           |
| ----------------- | -------------------------------------------------------------------------------------------------- | ----------------------------------------------------------------------------- |
| pd.read_csv()     | Legge un file CSV e lo converte in un DataFrame.                                                   | `df = pd.read_csv('file.csv', sep=',')`                                       |
| pd.DataFrame()    | Crea un DataFrame da un dizionario, lista, array, o altra struttura dati.                          | `df = pd.DataFrame({'col1': [1, 2], 'col2': [3, 4]})`                         |
| df.head()         | Restituisce i primi N (predefiniti a 5) record del DataFrame.                                      | `df.head(10)`                                                                 |
| df.tail()         | Restituisce gli ultimi N (predefiniti a 5) record del DataFrame.                                   | `df.tail(5)`                                                                  |
| df.info()         | Fornisce informazioni sul DataFrame come il tipo di dati, numero di colonne e righe.               | `df.info()`                                                                   |
| df.describe()     | Fornisce statistiche descrittive su colonne numeriche, come media e deviazione standard.           | `df.describe()`                                                               |
| df.isnull()       | Restituisce una maschera booleana con valori True dove ci sono valori nulli nel DataFrame.         | `df.isnull()`                                                                 |
| df.dropna()       | Rimuove righe o colonne con valori nulli.                                                          | `df.dropna(axis=0, how='any')`                                                |
| df.fillna()       | Sostituisce i valori nulli con un valore specificato.                                              | `df.fillna(0)`                                                                |
| df.groupby()      | Raggruppa i dati secondo una o più colonne e applica una funzione aggregata.                       | `df.groupby('col1').sum()`                                                    |
| df.merge()        | Unisce due DataFrame su una o più colonne chiave.                                                  | `pd.merge(df1, df2, on='key_column')`                                         |
| df.sort_values()  | Ordina i dati di un DataFrame in base ai valori di una o più colonne.                              | `df.sort_values(by='col1', ascending=False)`                                  |
| df.pivot_table()  | Crea una tabella pivot che consente l'aggregazione di dati in base a colonne e indici specificati. | `df.pivot_table(values='col1', index='col2', columns='col3', aggfunc='mean')` |
| df.apply()        | Applica una funzione a tutte le righe o colonne di un DataFrame.                                   | `df['col1'] = df['col1'].apply(lambda x: x * 2)`                              |
| df.agg()          | Applica funzioni di aggregazione come `mean`, `sum`, `count` a più colonne.                        | `df.agg({'col1': 'mean', 'col2': 'sum'})`                                     |
| df.join()         | Unisce il DataFrame con un altro DataFrame utilizzando l'indice come chiave.                       | `df1.join(df2, how='inner')`                                                  |
| df.loc[]          | Seleziona righe e colonne specifiche in base a etichette (index).                                  | `df.loc[0:5, ['col1', 'col2']]`                                               |
| df.iloc[]         | Seleziona righe e colonne specifiche in base alla posizione (index numerico).                      | `df.iloc[0:5, 0:3]`                                                           |
| df.drop()         | Elimina righe o colonne specifiche dal DataFrame.                                                  | `df.drop(columns=['col1'])`                                                   |
| df.rename()       | Rinomina le colonne o le righe del DataFrame.                                                      | `df.rename(columns={'old_name': 'new_name'})`                                 |
| df.set_index()    | Imposta una colonna come indice del DataFrame.                                                     | `df.set_index('col1')`                                                        |
| df.reset_index()  | Resetta l'indice di un DataFrame, rendendolo una colonna e generando un nuovo indice.              | `df.reset_index(drop=True)`                                                   |
| df.corr()         | Calcola la matrice di correlazione tra le colonne numeriche del DataFrame.                         | `df.corr()`                                                                   |
| df.value_counts() | Restituisce una serie con la frequenza dei valori univoci di una colonna.                          | `df['col1'].value_counts()`                                                   |
| df.nunique()      | Restituisce il numero di valori unici per ogni colonna.                                            | `df.nunique()`                                                                |
| df.sample()       | Restituisce un campione casuale di righe dal DataFrame.                                            | `df.sample(n=10)`                                                             |
| df.to_csv()       | Esporta il DataFrame in un file CSV.                                                               | `df.to_csv('output.csv', index=False)`                                        |
| df.melt()         | Trasforma un DataFrame in un formato lungo (utile per la visualizzazione dei dati).                | `df.melt(id_vars=['col1'], value_vars=['col2', 'col3'], var_name='variable')` |

