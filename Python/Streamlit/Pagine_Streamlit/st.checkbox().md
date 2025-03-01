## Descrizione

La funzione `st.checkbox()` consente di creare una casella di selezione (checkbox) nella tua app Streamlit. È uno strumento utile per ottenere input binari dall'utente, ad esempio una decisione sì/no o vero/falso. La checkbox è un elemento interattivo molto utilizzato per rendere l'applicazione più dinamica e personalizzabile in base alle scelte dell'utente.

Può essere utilizzata per attivare o disattivare alcune sezioni dell'app o per scegliere quali informazioni visualizzare. L'interattività offerta dalla checkbox permette agli sviluppatori di progettare app più coinvolgenti e intuitive, fornendo all'utente il controllo diretto su quali funzionalità attivare.

## Esempio di utilizzo

```
import streamlit as st

# Creare una checkbox per mostrare un messaggio
if st.checkbox("Mostra messaggio"):
    st.write("Hai selezionato la casella!")
```

In questo esempio, la casella di selezione consente all'utente di decidere se visualizzare o meno un messaggio. Se la checkbox è selezionata, il messaggio "Hai selezionato la casella!" viene mostrato.

## Esempio di implementazione

Le checkbox sono utili per creare app personalizzabili. Ad esempio, si possono utilizzare per filtrare dei dati, mostrare elementi opzionali, o semplicemente per personalizzare la visualizzazione dell'app.

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

# Checkbox per mostrare la tabella dei dati
if st.checkbox("Mostra i dati"):
    st.write(df)

# Checkbox per visualizzare un messaggio aggiuntivo
if st.checkbox("Mostra messaggio di benvenuto"):
    st.write("Benvenuti nella nostra applicazione di analisi dati!")
```

In questo esempio, ci sono due checkbox che consentono all'utente di decidere cosa visualizzare: la tabella dei dati o un messaggio di benvenuto. Questo tipo di interazione offre un'esperienza più coinvolgente e permette di adattare l'interfaccia in base alle esigenze dell'utente.