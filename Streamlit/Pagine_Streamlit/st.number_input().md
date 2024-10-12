## Descrizione

La funzione `st.number_input()` consente di creare un campo di input numerico, che permette agli utenti di inserire valori numerici, come interi o decimali. `st.number_input()` è utile quando si richiede un input numerico specifico, come quantità, percentuali o soglie.

È possibile definire valori minimi e massimi, un valore predefinito, e anche la precisione decimale dell'input. Questo lo rende molto versatile e facile da configurare per diversi casi d'uso. Gli utenti possono interagire con il campo inserendo manualmente un valore o utilizzando le frecce per aumentare o diminuire il valore.

## Esempio di utilizzo

```
import streamlit as st

# Creare un campo di input numerico
età = st.number_input("Inserisci la tua età:", min_value=0, max_value=120, value=25)

# Mostrare l'età inserita
st.write(f"Hai inserito: {età} anni")
```

In questo esempio, l'utente può inserire la propria età utilizzando il campo di input numerico. Il valore inserito viene quindi visualizzato come testo.

## Esempio di implementazione

La funzione `st.number_input()` può essere utilizzata per impostare parametri che influenzano i calcoli o le analisi nell'app. Vediamo un esempio in cui l'utente inserisce una soglia numerica per filtrare i dati:

```
import streamlit as st
import pandas as pd

# Dati di esempio
data = {
    "Nome": ["Alice", "Bob", "Charlie", "David", "Eva"],
    "Età": [25, 30, 35, 40, 45]
}
df = pd.DataFrame(data)

# Creare un campo di input numerico per filtrare i dati in base all'età
età_min = st.number_input("Inserisci l'età minima:", min_value=0, max_value=100, value=30)

# Filtrare e mostrare i dati
st.write("Dati filtrati in base all'età minima selezionata:")
st.write(df[df['Età'] >= età_min])
```

In questo esempio, l'utente inserisce un valore numerico che viene utilizzato per filtrare un DataFrame. Questo approccio rende l'applicazione più dinamica e permette all'utente di esplorare i dati in base ai propri criteri.