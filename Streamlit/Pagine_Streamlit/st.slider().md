## Descrizione

La funzione `st.slider()` consente di creare un cursore interattivo che l'utente può spostare per selezionare un valore numerico all'interno di un intervallo definito. Il cursore può essere utilizzato per selezionare un singolo valore o un intervallo di valori, a seconda delle necessità. Questo tipo di interazione è utile per ottenere input numerici dall'utente in modo facile e intuitivo.

I cursori sono comunemente utilizzati per configurare parametri, come scegliere un valore all'interno di un intervallo (ad esempio, una data o un valore percentuale). `st.slider()` è particolarmente utile quando si desidera che l'utente selezioni valori in modo più preciso rispetto a un input manuale.

## Esempio di utilizzo

```
import streamlit as st

# Creare un cursore per selezionare un valore
valore = st.slider("Seleziona un valore:", min_value=0, max_value=100, value=50)

# Mostrare il valore selezionato
st.write(f"Hai selezionato il valore: {valore}")
```

In questo esempio, l'utente può spostare il cursore per selezionare un valore compreso tra 0 e 100. Il valore selezionato viene poi visualizzato come testo.

## Esempio di implementazione

La funzione `st.slider()` è utile in molte situazioni in cui è necessario selezionare un valore numerico o un intervallo. Vediamo un esempio più complesso in cui il cursore è utilizzato per configurare un filtro sui dati:

```
import streamlit as st
import pandas as pd

# Dati di esempio
data = {
    "Nome": ["Alice", "Bob", "Charlie", "David", "Eva"],
    "Età": [25, 30, 35, 40, 45]
}
df = pd.DataFrame(data)

# Creare un cursore per filtrare i dati in base all'età
età_min = st.slider("Seleziona l'età minima:", min_value=20, max_value=50, value=25)

# Filtrare e mostrare i dati
st.write("Dati filtrati in base all'età minima selezionata:")
st.write(df[df['Età'] >= età_min])
```

In questo esempio, l'utente può utilizzare il cursore per impostare un'età minima. I dati vengono poi filtrati in base al valore scelto dall'utente. Questo tipo di interazione è particolarmente utile per esplorare i dati in modo dinamico e intuitivo.