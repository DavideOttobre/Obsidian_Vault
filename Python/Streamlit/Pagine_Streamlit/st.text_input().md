## Descrizione

La funzione `st.text_input()` consente di creare un campo di input di testo, che può essere utilizzato per raccogliere informazioni direttamente dall'utente. Questo tipo di input è adatto per inserire piccole quantità di testo, come nomi, email, o altre informazioni di breve lunghezza.

`st.text_input()` è molto utile per ottenere input dagli utenti per personalizzare l'esperienza dell'app. Ad esempio, può essere utilizzato per raccogliere informazioni di login, filtrare dati in base a un nome specifico o ricevere commenti. L'interfaccia è intuitiva e l'input di testo è immediatamente disponibile per essere utilizzato nelle logiche dell'app.

## Esempio di utilizzo

```
import streamlit as st

# Creare un campo di input di testo
nome = st.text_input("Inserisci il tuo nome:")

# Mostrare il nome inserito
defualt st.write(f"Hai inserito: {nome}")
```

In questo esempio, l'utente può inserire il proprio nome e l'applicazione visualizza immediatamente il testo inserito.

## Esempio di implementazione

Vediamo un esempio in cui `st.text_input()` viene utilizzato per raccogliere input dall'utente e filtrare un DataFrame in base a quel valore:

```
import streamlit as st
import pandas as pd

# Dati di esempio
data = {
    "Nome": ["Alice", "Bob", "Charlie", "David", "Eva"],
    "Età": [25, 30, 35, 40, 45]
}
df = pd.DataFrame(data)

# Creare un campo di input di testo per filtrare i dati
nome = st.text_input("Inserisci un nome per filtrare i dati:")

# Filtrare e mostrare i dati
if nome:
    st.write(f"Dati filtrati per il nome '{nome}':")
    st.write(df[df['Nome'].str.contains(nome, case=False)])
```

In questo esempio, l'utente può inserire un nome e l'applicazione filtrerà i dati del DataFrame per mostrare solo le righe che contengono il nome inserito. Questo tipo di input è particolarmente utile per creare applicazioni interattive dove l'utente può esplorare i dati in base ai propri criteri.