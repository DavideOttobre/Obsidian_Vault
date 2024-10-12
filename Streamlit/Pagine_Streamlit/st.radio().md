## Descrizione

La funzione `st.radio()` consente di creare un selettore a scelta singola (radio button) che permette all'utente di scegliere un'opzione tra quelle disponibili. Questo tipo di selettore è utile quando si vuole che l'utente selezioni una sola opzione tra più alternative. Le opzioni sono presentate in forma di pulsanti, facilitando l'interazione e migliorando la comprensibilità.

I radio button sono adatti per raccogliere informazioni come preferenze personali, modalità di visualizzazione o qualsiasi altra scelta a risposta singola. Forniscono un modo rapido e intuitivo per selezionare una sola opzione tra più alternative.

## Esempio di utilizzo

```
import streamlit as st

# Creare un selettore a scelta singola
opzione = st.radio("Scegli un'opzione:", ["Opzione 1", "Opzione 2", "Opzione 3"])

# Mostrare l'opzione scelta
st.write(f"Hai scelto: {opzione}")
```

In questo esempio, l'utente può selezionare una delle tre opzioni disponibili. La scelta viene poi visualizzata come testo.

## Esempio di implementazione

La funzione `st.radio()` può essere utilizzata per configurare diverse impostazioni all'interno dell'applicazione. Ad esempio, può essere utilizzata per scegliere una categoria di dati da visualizzare o per selezionare una modalità di visualizzazione.

```
import streamlit as st
import pandas as pd

# Dati di esempio
data = {
    "Sport": ["Calcio", "Basket", "Tennis"],
    "Giocatori": [11, 5, 2]
}
df = pd.DataFrame(data)

# Selezionare una categoria di dati da visualizzare
categoria = st.radio("Scegli una categoria:", ["Sport", "Giocatori"])

# Mostrare i dati della categoria scelta
st.write(f"Ecco i dati per la categoria '{categoria}':")
st.write(df[categoria])
```

In questo esempio, l'utente può scegliere tra due categorie di dati da visualizzare. A seconda della scelta dell'utente, viene visualizzata la colonna corrispondente del DataFrame. Questo tipo di interazione è utile per gestire grandi quantità di dati e permettere all'utente di esplorarli in modo intuitivo.