## Descrizione

La funzione `st.header()` viene utilizzata per aggiungere intestazioni nella tua app Streamlit, creando un secondo livello di gerarchia sotto il titolo principale. È utile per suddividere il contenuto della tua app in sezioni tematiche. Le intestazioni aiutano a rendere il contenuto più organizzato e facilmente navigabile, migliorando l'esperienza utente.

`st.header()` può essere utilizzato più volte in una stessa pagina per creare diverse sezioni. Ad esempio, se si sta creando un'app per analizzare dati finanziari, si potrebbero avere intestazioni come "Entrate", "Spese" e "Profitto" per aiutare gli utenti a trovare rapidamente le informazioni che stanno cercando.

## Esempio di utilizzo

```
import streamlit as st

st.header("Introduzione")
st.write("In questa sezione vedremo un'introduzione generale ai dati.")
```

In questo esempio, `st.header()` viene utilizzato per creare una sezione chiamata "Introduzione". Questo aiuta a strutturare il contenuto dell'app in modo chiaro e accessibile.

## Esempio di implementazione

Puoi usare `st.header()` per organizzare la tua app in sezioni ben definite, migliorando la leggibilità e la navigazione.

```
import streamlit as st

# Intestazione per una sezione
st.header("Dati finanziari")
st.write("Questa sezione mostra i dati finanziari relativi all'anno in corso.")

# Aggiungere un'altra sezione
st.header("Analisi delle vendite")
st.write("In questa sezione analizziamo le vendite per ogni trimestre.")
```

In questo esempio, vengono create più sezioni all'interno della stessa pagina. Ogni sezione ha un'intestazione ben definita grazie all'uso di `st.header()`, che aiuta a suddividere il contenuto in blocchi logici. Questo tipo di organizzazione è essenziale per le app più complesse, dove l'utente deve navigare tra molte informazioni diverse.