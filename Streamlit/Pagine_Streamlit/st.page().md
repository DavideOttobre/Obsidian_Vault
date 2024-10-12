## Descrizione

La funzione `st.page()` consente di creare più pagine all'interno della tua applicazione Streamlit, permettendo di strutturare l'app come un'applicazione multi-pagina. Questa funzione è utile per organizzare contenuti complessi in sezioni distinte, consentendo agli utenti di navigare facilmente tra diverse parti dell'app.

Con `st.page()`, è possibile definire le diverse sezioni della tua applicazione e fornire un menu di navigazione per accedervi. Questo è particolarmente utile quando l'app contiene molte funzionalità o informazioni, rendendo l'interfaccia più ordinata e facilmente navigabile.

## Esempio di utilizzo

```
import streamlit as st
from streamlit_option_menu import option_menu

# Creare un menu di navigazione per più pagine
pagina = option_menu(
    menu_title='Menu di Navigazione',
    options=['Pagina 1', 'Pagina 2'],
    icons=['house', 'gear'],
    menu_icon='cast'
)

# Logica per la visualizzazione delle pagine
if pagina == 'Pagina 1':
    st.write("Benvenuti nella Pagina 1")
elif pagina == 'Pagina 2':
    st.write("Benvenuti nella Pagina 2")
```

In questo esempio, viene creato un menu di navigazione per permettere all'utente di scegliere tra due diverse pagine. Ogni pagina mostra un contenuto diverso in base alla selezione effettuata.

## Esempio di implementazione

Vediamo un esempio più complesso in cui `st.page()` viene utilizzato per suddividere l'applicazione in più sezioni, ciascuna con funzionalità specifiche:

```
import streamlit as st
from streamlit_option_menu import option_menu
import pandas as pd
import numpy as np

# Creare un menu di navigazione per l'app multi-pagina
pagina = option_menu(
    menu_title='Navigazione',
    options=['Introduzione', 'Analisi dei dati', 'Visualizzazioni'],
    icons=['info', 'bar-chart', 'eye'],
    menu_icon='menu-button'
)

# Logica per la visualizzazione delle diverse pagine
if pagina == 'Introduzione':
    st.title("Introduzione")
    st.write("Questa è la pagina di introduzione della nostra applicazione.")

elif pagina == 'Analisi dei dati':
    st.title("Analisi dei dati")
    # Creare un DataFrame di esempio
    data = pd.DataFrame(
        np.random.randn(100, 3),
        columns=['A', 'B', 'C']
    )
    st.write("Dati di esempio:")
    st.dataframe(data)
    st.write("Statistiche descrittive:")
    st.write(data.describe())

elif pagina == 'Visualizzazioni':
    st.title("Visualizzazioni dei dati")
    # Visualizzare un grafico a linee
    data = pd.DataFrame(
        np.random.randn(50, 2),
        columns=['X', 'Y']
    )
    st.line_chart(data)
```

In questo esempio, l'app è suddivisa in tre pagine: Introduzione, Analisi dei dati e Visualizzazioni. Ogni pagina contiene contenuti specifici e permette all'utente di navigare facilmente tra diverse sezioni dell'applicazione. Questa struttura multi-pagina migliora l'organizzazione dei contenuti e rende l'app più intuitiva da esplorare.