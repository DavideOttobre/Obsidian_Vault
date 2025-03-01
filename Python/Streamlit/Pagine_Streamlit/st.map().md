## Descrizione

La funzione `st.map()` consente di visualizzare dati geolocalizzati su una mappa. Questa funzione è particolarmente utile per rappresentare dati che contengono informazioni geografiche, come posizioni di negozi, clienti o punti di interesse. `st.map()` richiede un DataFrame con colonne `lat` e `lon` per le coordinate geografiche.

La mappa generata permette agli utenti di visualizzare immediatamente la distribuzione geografica dei dati, fornendo un contesto visivo chiaro e intuitivo. È particolarmente utile in applicazioni di analisi dei dati geospaziali.

## Esempio di utilizzo

```
import streamlit as st
import pandas as pd

# Dati di esempio con latitudine e longitudine
data = pd.DataFrame(
    {
        'lat': [41.9028, 45.4642, 40.8518],
        'lon': [12.4964, 9.1900, 14.2681]
    }
)

# Visualizzare i punti su una mappa
st.map(data)
```

In questo esempio, i punti corrispondono a tre città italiane (Roma, Milano, Napoli) e vengono visualizzati su una mappa.

## Esempio di implementazione

`st.map()` può essere utilizzato per rappresentare dati relativi alla distribuzione dei clienti o dei punti vendita di un'azienda. Vediamo un esempio:

```
import streamlit as st
import pandas as pd

# Dati di esempio con posizioni dei negozi
data_negozi = pd.DataFrame(
    {
        'lat': [45.4642, 41.9028, 43.7696, 40.8518, 44.4949],
        'lon': [9.1900, 12.4964, 11.2558, 14.2681, 11.3426],
        'nome_negozio': ["Milano", "Roma", "Firenze", "Napoli", "Bologna"]
    }
)

# Visualizzare le posizioni dei negozi su una mappa
st.map(data_negozi)
```

In questo esempio, vengono visualizzate le posizioni dei negozi di un'azienda in diverse città italiane. La mappa offre una visione immediata della distribuzione geografica dei negozi.