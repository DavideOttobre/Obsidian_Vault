## Descrizione

La funzione `st.dataframe()` consente di visualizzare un DataFrame Pandas nell'applicazione Streamlit con funzionalità di ordinamento e esplorazione interattiva. `st.dataframe()` è utile per mostrare grandi quantità di dati in modo organizzato, permettendo agli utenti di analizzare i dati senza doverli esportare.

Questa funzione consente anche di personalizzare la larghezza e l'altezza della tabella, rendendola adattabile alle esigenze specifiche dell'applicazione. Gli utenti possono ordinare le colonne in base ai propri criteri e scorrere facilmente il contenuto.

## Esempio di utilizzo

```
import streamlit as st
import pandas as pd

# Dati di esempio
data = {
    "Nome": ["Alice", "Bob", "Charlie"],
    "Età": [25, 30, 35],
    "Città": ["Roma", "Milano", "Torino"]
}
df = pd.DataFrame(data)

# Visualizzare il DataFrame
st.dataframe(df)
```

In questo esempio, viene visualizzato un DataFrame Pandas che contiene informazioni su persone e città. Gli utenti possono ordinare i dati e interagire con la tabella.

## Esempio di implementazione

`st.dataframe()` può essere utilizzato per mostrare dati provenienti da diverse fonti, ad esempio dati caricati da un file CSV. Vediamo un esempio in cui viene utilizzato `st.dataframe()` per mostrare un DataFrame filtrato:

```
import streamlit as st
import pandas as pd

# Dati di esempio
data = {
    "Nome": ["Alice", "Bob", "Charlie", "David", "Eva"],
    "Età": [25, 30, 35, 40, 45],
    "Città": ["Roma", "Milano", "Torino", "Napoli", "Bologna"]
}
df = pd.DataFrame(data)

# Filtrare i dati in base all'età minima
età_min = st.slider("Seleziona l'età minima:", min_value=20, max_value=50, value=30)

# Visualizzare il DataFrame filtrato
st.dataframe(df[df['Età'] >= età_min])
```

In questo esempio, l'utente può filtrare i dati del DataFrame in base all'età minima selezionata utilizzando un cursore (`st.slider()`). Il DataFrame risultante viene visualizzato dinamicamente.