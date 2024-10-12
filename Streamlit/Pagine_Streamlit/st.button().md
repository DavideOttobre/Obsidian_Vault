## Descrizione

La funzione `st.button()` consente di creare un pulsante cliccabile nella tua applicazione Streamlit. I pulsanti sono elementi interattivi essenziali per creare azioni immediate, come il salvataggio di dati, l'aggiornamento di un grafico, o l'esecuzione di un calcolo. `st.button()` permette agli utenti di interagire attivamente con l'applicazione, facilitando l'esecuzione di comandi specifici.

È possibile personalizzare l'etichetta del pulsante e fornire una chiave univoca per identificare l'elemento. `st.button()` restituisce un valore booleano (`True` o `False`) a seconda che l'utente abbia cliccato o meno il pulsante, il che lo rende facilmente utilizzabile in strutture condizionali.

## Esempio di utilizzo

```
import streamlit as st

# Creare un pulsante cliccabile
if st.button("Clicca qui"):
    st.write("Hai cliccato il pulsante!")
```

In questo esempio, l'utente può cliccare il pulsante per visualizzare un messaggio. La funzione `st.button()` restituisce `True` quando viene cliccato, attivando così il codice condizionale associato.

## Esempio di implementazione

La funzione `st.button()` è spesso utilizzata per attivare azioni che richiedono un input dell'utente, come aggiornare i dati, inviare informazioni o avviare un calcolo. Vediamo un esempio più complesso:

```
import streamlit as st
import pandas as pd
import numpy as np

# Dati di esempio
data = pd.DataFrame(
    np.random.randn(20, 3),
    columns=['A', 'B', 'C']
)

# Creare un pulsante per aggiornare i dati
if st.button("Aggiorna i dati"):
    data = pd.DataFrame(
        np.random.randn(20, 3),
        columns=['A', 'B', 'C']
    )
    st.write("Dati aggiornati!")
    st.write(data)
```

In questo esempio, l'utente può cliccare il pulsante per aggiornare i dati visualizzati. Ogni volta che il pulsante viene cliccato, vengono generati nuovi dati casuali e visualizzati nell'interfaccia. Questo tipo di interazione è molto utile per simulazioni o aggiornamenti dinamici.