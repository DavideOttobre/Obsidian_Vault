## Descrizione

La funzione `st.line_chart()` consente di visualizzare grafici a linee in modo semplice e immediato. Questa funzione è utile per rappresentare dati temporali o qualsiasi tipo di informazione che varia nel tempo. `st.line_chart()` è una delle funzioni più semplici per creare grafici e non richiede configurazioni avanzate.

La funzione prende in input un DataFrame, un array NumPy o una lista e genera automaticamente il grafico, adattandolo alle dimensioni del contenitore dell'applicazione. Questo rende la creazione di visualizzazioni di dati molto rapida ed efficace.

## Esempio di utilizzo

```
import streamlit as st
import pandas as pd
import numpy as np

# Dati di esempio
data = pd.DataFrame(
    np.random.randn(20, 3),
    columns=['A', 'B', 'C']
)

# Visualizzare un grafico a linee
st.line_chart(data)
```

In questo esempio, viene creato un DataFrame con dati casuali e viene visualizzato un grafico a linee per rappresentare l'andamento delle colonne A, B e C.

## Esempio di implementazione

`st.line_chart()` può essere utilizzato per rappresentare dati temporali, come i dati delle vendite nel corso del tempo. Vediamo un esempio:

```
import streamlit as st
import pandas as pd
import numpy as np

# Dati di esempio su base temporale
date_range = pd.date_range(start='1/1/2024', periods=100)
dati_vendite = pd.DataFrame(
    np.random.randint(100, 500, size=(100, 1)),
    index=date_range,
    columns=['Vendite']
)

# Visualizzare un grafico delle vendite nel tempo
st.line_chart(dati_vendite)
```

In questo esempio, viene creato un grafico a linee per rappresentare l'andamento delle vendite nel corso del tempo. Il grafico mostra chiaramente le fluttuazioni delle vendite, aiutando a identificare eventuali trend o anomalie.