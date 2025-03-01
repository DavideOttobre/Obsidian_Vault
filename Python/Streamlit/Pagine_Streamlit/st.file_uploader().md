## Descrizione

La funzione `st.file_uploader()` consente agli utenti di caricare file direttamente dall'interfaccia della tua applicazione Streamlit. Questa funzionalità è essenziale per tutte quelle applicazioni che richiedono l'input di file da parte dell'utente, come CSV, immagini o documenti di testo. `st.file_uploader()` consente di gestire in modo semplice l'input di dati da parte degli utenti.

È possibile definire il tipo di file che si desidera accettare (ad esempio solo file CSV o immagini), e se consentire il caricamento di uno o più file. Questa funzione è particolarmente utile quando si sviluppano app di analisi dati o strumenti di automazione che richiedono input esterni.

## Esempio di utilizzo

```
import streamlit as st

# Caricare un file
file = st.file_uploader("Carica un file", type=["csv", "txt"])

# Mostrare il contenuto del file caricato
if file is not None:
    st.write(file.read())
```

In questo esempio, l'utente può caricare un file CSV o di testo. Una volta caricato, il contenuto del file viene visualizzato come testo.

## Esempio di implementazione

La funzione `st.file_uploader()` è utile per consentire all'utente di caricare dati che poi verranno elaborati dall'applicazione. Vediamo un esempio più complesso:

```
import streamlit as st
import pandas as pd

# Caricare un file CSV
file = st.file_uploader("Carica un file CSV", type=["csv"])

# Controllare se un file è stato caricato
if file is not None:
    # Leggere il file CSV come DataFrame
    df = pd.read_csv(file)
    st.write("Ecco i dati caricati:")
    st.write(df)

    # Calcolare alcune statistiche semplici
    st.write("Statistiche descrittive:")
    st.write(df.describe())
```

In questo esempio, l'utente carica un file CSV e l'applicazione lo legge come DataFrame utilizzando Pandas. Viene quindi visualizzato il contenuto del file insieme a una serie di statistiche descrittive. Questa interazione è molto utile nelle applicazioni di analisi dati, dove l'input degli utenti viene utilizzato per generare risultati personalizzati.