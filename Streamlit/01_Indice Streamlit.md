
| Funzione               | Descrizione                                                                                    | Esempio                                                                                                                                                                                                                                                                                                                    | Parametri più utilizzati                                                                  |
| ---------------------- | ---------------------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ----------------------------------------------------------------------------------------- |
| [[st.write()]]         | Visualizza qualsiasi tipo di contenuto (testo, grafici, tabelle) nell'interfaccia di Streamlit | `st.write('Ciao mondo!')`                                                                                                                                                                                                                                                                                                  | - Qualsiasi oggetto Python                                                                |
| [[st.title()]]         | Mostra un titolo grande.                                                                       | `st.title('Benvenuti nella mia app')`                                                                                                                                                                                                                                                                                      | - Testo del titolo                                                                        |
| [[st.header()]]        | Mostra un'intestazione (secondo livello di importanza dopo il titolo).                         | `st.header('Questa è un'intestazione')`                                                                                                                                                                                                                                                                                    | - Testo dell'intestazione                                                                 |
| [[st.text()]]          | Visualizza testo semplice sulla pagina.                                                        | `st.text('Questo è un esempio di testo.')`                                                                                                                                                                                                                                                                                 | - Testo semplice                                                                          |
| [[st.markdown()]]      | Visualizza testo formattato in Markdown.                                                       | `st.markdown('**Testo in grassetto**')`                                                                                                                                                                                                                                                                                    | - Testo Markdown                                                                          |
| [[st.button()]]        | Crea un pulsante cliccabile.                                                                   | `if st.button(label='Clicca qui', key='pulsante_1'): st.write('Hai cliccato!')`                                                                                                                                                                                                                                            | - `label` (nome del pulsante), `key` (chiave univoca)                                     |
| [[st.checkbox()]]      | Crea una casella di selezione.                                                                 | `if st.checkbox(label='Mostra messaggio', value=True, key='checkbox_1'): st.write('Hai selezionato la casella!')`                                                                                                                                                                                                          | - `label` (descrizione della casella), `value` (pre-selezionato), `key`                   |
| [[st.radio()]]         | Crea un selettore a scelta singola.                                                            | `opzione = st.radio(label='Scegli una:', options=['A', 'B', 'C'], index=1, key='radio_1')`                                                                                                                                                                                                                                 | - `label`, `options`, `index`, `key`                                                      |
| [[st.selectbox()]]     | Crea un menu a discesa per selezionare un'opzione.                                             | `scelta = st.selectbox(label='Seleziona un'opzione:', options=['Opzione 1', 'Opzione 2'], index=0, key='selectbox_1')`                                                                                                                                                                                                     | - `label`, `options`, `index`, `key`                                                      |
| [[st.slider()]]        | Crea un cursore per selezionare un valore numerico.                                            | `valore = st.slider(label='Seleziona un valore:', min_value=0, max_value=100, value=50, step=5)`                                                                                                                                                                                                                           | - `label`, `min_value`, `max_value`, `value`, `step`                                      |
| [[st.file_uploader()]] | Consente di caricare file nella tua app.                                                       | `file = st.file_uploader(label='Carica un file', type=['csv', 'txt'], accept_multiple_files=True, key='file_uploader_1')`                                                                                                                                                                                                  | - `label`, `type`, `accept_multiple_files`, `key`                                         |
| [[st.text_input()]]    | Crea un campo di input di testo.                                                               | `nome = st.text_input(label='Inserisci il tuo nome:', value='Mario', key='text_input_1', placeholder='Inserisci qui')`                                                                                                                                                                                                     | - `label`, `value`, `key`, `placeholder`                                                  |
| [[st.number_input()]]  | Crea un campo di input numerico.                                                               | `numero = st.number_input(label='Inserisci un numero:', min_value=0, max_value=10, value=5, step=1)`                                                                                                                                                                                                                       | - `label`, `min_value`, `max_value`, `value`, `step`                                      |
| [[st.sidebar()]]       | Crea una barra laterale per gli elementi della tua app.                                        | `st.sidebar.button(label='Pulsante nella sidebar', key='sidebar_button_1')`                                                                                                                                                                                                                                                | - Elementi UI nella sidebar                                                               |
| [[st.progress()]]      | Visualizza una barra di progresso.                                                             | `import time; progresso = st.progress(value=0); for i in range(100): progresso.progress(i + 1); time.sleep(0.01)`                                                                                                                                                                                                          | - `value` (percentuale di completamento)                                                  |
| [[st.dataframe()]]     | Mostra un DataFrame Pandas con opzioni di ordinamento.                                         | `import pandas as pd; st.dataframe(data=pd.DataFrame({'col1': [1, 2], 'col2': [3, 4]}), width=500, height=300)`                                                                                                                                                                                                            | - `data`, `width`, `height`                                                               |
| [[st.line_chart()]]    | Visualizza un grafico a linee.                                                                 | `import pandas as pd; st.line_chart(data=pd.DataFrame({'data': [1, 2, 3, 4]}), width=500, height=300, use_container_width=True)`                                                                                                                                                                                           | - `data`, `width`, `height`, `use_container_width`                                        |
| [[st.map()]]           | Mostra una mappa basata su dati geolocalizzati.                                                | `import pandas as pd; st.map(data=pd.DataFrame({'lat': [37.76], 'lon': [-122.4]}))`                                                                                                                                                                                                                                        | - `data`                                                                                  |
| [[st.page()]]          | Crea più pagine nella tua app per una navigazione multi-pagina.                                | `import streamlit as st; from streamlit_option_menu import option_menu; pagina = option_menu(menu_title='Menu di Navigazione', options=['Pagina 1', 'Pagina 2'], icons=['house', 'gear']); if pagina == 'Pagina 1': st.write('Benvenuti nella Pagina 1'); elif pagina == 'Pagina 2': st.write('Benvenuti nella Pagina 2')` | - `name` (nome della pagina), `icon` (icona della pagina), `layout` (layout della pagina) |

---
### Codice di Esempio utilizzando un database:

```python
# Importare le librerie necessarie
import streamlit as st
import pandas as pd
import mysql.connector
from mysql.connector import Error
import time
from streamlit_option_menu import option_menu
import numpy as np

# Connessione al database MySQL
def connect_to_database():
    try:
        connection = mysql.connector.connect(
            host='localhost',
            database='esempio_db',
            user='utente',
            password='password'
        )
        if connection.is_connected():
            return connection
    except Error as e:
        st.error(f"Errore durante la connessione al database: {e}")
        return None

# Creare un menu di navigazione per le diverse sezioni dell'applicazione
pagina = option_menu(
    menu_title='Navigazione',
    options=['Introduzione', 'Visualizza Dati', 'Filtra Dati', 'Inserisci Dati'],
    icons=['info', 'table', 'filter', 'plus'],
    menu_icon='menu-button'
)

# Connessione al database
connection = connect_to_database()

if connection:
    if pagina == 'Introduzione':
        # Pagina di introduzione
        st.title("Introduzione")
        st.write("Questa applicazione consente di interagire con un database MySQL. Utilizzando Streamlit, puoi visualizzare, filtrare e inserire dati in modo interattivo.")

    elif pagina == 'Visualizza Dati':
        # Visualizzare i dati dal database
        st.title("Visualizza Dati")
        query = "SELECT * FROM clienti"
        df = pd.read_sql(query, con=connection)
        st.dataframe(df)  # Utilizzare st.dataframe per visualizzare il DataFrame in modo interattivo

    elif pagina == 'Filtra Dati':
        # Filtrare i dati in base all'età
        st.title("Filtra Dati")
        età_min = st.slider("Seleziona l'età minima:", min_value=0, max_value=100, value=30)  # Utilizzare st.slider per selezionare l'età minima
        query = f"SELECT * FROM clienti WHERE età >= {età_min}"
        df = pd.read_sql(query, con=connection)
        st.dataframe(df)  # Visualizzare il DataFrame filtrato

    elif pagina == 'Inserisci Dati':
        # Inserire nuovi dati nel database
        st.title("Inserisci Dati")
        nome = st.text_input("Nome del cliente:")  # Utilizzare st.text_input per inserire il nome
        età = st.number_input("Età del cliente:", min_value=0, max_value=120, value=25)  # Utilizzare st.number_input per inserire l'età
        città = st.text_input("Città del cliente:")  # Utilizzare st.text_input per inserire la città

        if st.button("Inserisci Cliente"):  # Utilizzare st.button per inserire i dati nel database
            try:
                cursor = connection.cursor()
                insert_query = f"INSERT INTO clienti (nome, età, città) VALUES ('{nome}', {età}, '{città}')"
                cursor.execute(insert_query)
                connection.commit()
                st.success("Cliente inserito con successo!")
            except Error as e:
                st.error(f"Errore durante l'inserimento dei dati: {e}")

    # Barra laterale con impostazioni aggiuntive
    st.sidebar.header("Impostazioni")
    mostra_mappa = st.sidebar.checkbox("Mostra posizioni clienti su mappa")  # Utilizzare st.sidebar per creare controlli nella barra laterale

    if mostra_mappa:
        # Visualizzare le posizioni dei clienti su una mappa
        st.header("Mappa delle Posizioni dei Clienti")
        query = "SELECT latitudine, longitudine FROM clienti"
        df = pd.read_sql(query, con=connection)
        if not df.empty:
            st.map(df)  # Utilizzare st.map per visualizzare i dati geolocalizzati
        else:
            st.warning("Nessuna posizione disponibile.")

    # Barra di progresso durante l'elaborazione
    st.header("Esempio di Barra di Progresso")
    st.write("Elaborazione in corso...")
    progresso = st.progress(0)  # Utilizzare st.progress per mostrare l'avanzamento di un processo
    for i in range(100):
        time.sleep(0.01)
        progresso.progress(i + 1)
    st.write("Elaborazione completata!")

    # Grafico a linee per visualizzare dati di esempio
    st.header("Grafico delle Vendite")
    dati_vendite = pd.DataFrame(
        np.random.randint(100, 500, size=(100, 1)),
        columns=['Vendite']
    )
    st.line_chart(dati_vendite)  # Utilizzare st.line_chart per visualizzare l'andamento delle vendite

    # Chiudere la connessione al database
    connection.close()
else:
    st.error("Impossibile connettersi al database. Verifica le tue credenziali.")
```
