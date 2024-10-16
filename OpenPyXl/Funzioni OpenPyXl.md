Ecco una tabella che contiene alcune delle funzioni più utili e frequentemente utilizzate del modulo **`openpyxl`**, che è utilizzato per leggere, scrivere e manipolare file Excel (.xlsx) in Python.

| Funzione                                                | Descrizione                                                                                        |
| ------------------------------------------------------- | -------------------------------------------------------------------------------------------------- |
| openpyxl.load_workbook(filename)                        | Carica un file Excel esistente e restituisce un oggetto Workbook.                                  |
| workbook.save(filename)                                 | Salva il file Excel con il nome specificato (se il file esiste, viene sovrascritto).               |
| workbook.create_sheet(title)                            | Crea un nuovo foglio di lavoro (sheet) nel file Excel con il nome specificato.                     |
| workbook.remove(sheet)                                  | Rimuove un foglio di lavoro dal file Excel.                                                        |
| workbook.active                                         | Restituisce il foglio di lavoro attivo.                                                            |
| workbook.sheetnames                                     | Restituisce una lista con i nomi di tutti i fogli di lavoro presenti nel file Excel.               |
| workbook[sheet_name]                                    | Accede a un foglio di lavoro specifico in base al nome (es. `workbook["Sheet1"]`).                 |
| worksheet.cell(row, column)                             | Restituisce la cella alla posizione specificata (indicata da riga e colonna).                      |
| worksheet.append([values])                              | Aggiunge una nuova riga alla fine del foglio di lavoro con i valori specificati.                   |
| worksheet.max_row                                       | Restituisce il numero totale di righe nel foglio di lavoro.                                        |
| worksheet.max_column                                    | Restituisce il numero totale di colonne nel foglio di lavoro.                                      |
| worksheet['A1']                                         | Accede alla cella specificata utilizzando notazione A1 (ad esempio, `'A1'` per la cella in A1).    |
| worksheet.title                                         | Legge o modifica il titolo del foglio di lavoro (sheet).                                           |
| worksheet.merge_cells(range)                            | Unisce un intervallo di celle (ad esempio, `"A1:D1"` unisce da A1 a D1).                           |
| worksheet.unmerge_cells(range)                          | Separa celle precedentemente unite.                                                                |
| worksheet.delete_rows(idx, amount)                      | Elimina una o più righe a partire dall'indice specificato (`idx` è la riga di partenza).           |
| worksheet.delete_cols(idx, amount)                      | Elimina una o più colonne a partire dall'indice specificato (`idx` è la colonna di partenza).      |
| worksheet.insert_rows(idx, amount)                      | Inserisce nuove righe a partire dall'indice specificato (`idx` è la riga di partenza).             |
| worksheet.insert_cols(idx, amount)                      | Inserisce nuove colonne a partire dall'indice specificato (`idx` è la colonna di partenza).        |
| worksheet.freeze_panes(cell)                            | Congela le celle sopra e alla sinistra della cella specificata.                                    |
| worksheet.auto_filter.ref                               | Aggiunge un filtro automatico alle colonne per un intervallo specifico di celle (es. `"A1:D1"`).   |
| worksheet.protection.sheet                              | Protegge un foglio di lavoro per impedire la modifica delle celle.                                 |
| worksheet.column_dimensions[column].width               | Imposta la larghezza di una colonna specifica.                                                     |
| worksheet.row_dimensions[row].height                    | Imposta l'altezza di una riga specifica.                                                           |
| worksheet['A1'].value                                   | Restituisce o modifica il valore della cella A1.                                                   |
| worksheet['A1'].font                                    | Modifica il font del testo all'interno di una cella (per esempio, font, dimensioni, colore, ecc.). |
| worksheet['A1'].fill                                    | Modifica il riempimento (colore di sfondo) della cella.                                            |
| worksheet['A1'].border                                  | Aggiunge bordi alle celle.                                                                         |
| worksheet['A1'].alignment                               | Modifica l'allineamento del testo in una cella (es. centrato, allineato a destra, ecc.).           |
| worksheet.iter_rows(min_row, max_row, min_col, max_col) | Itera sulle righe di un intervallo di celle.                                                       |
| worksheet.iter_cols(min_row, max_row, min_col, max_col) | Itera sulle colonne di un intervallo di celle.                                                     |

### Descrizione di alcune delle funzioni chiave:

- **Caricamento e salvataggio di un file Excel:**
  - `openpyxl.load_workbook('file.xlsx')`: Permette di aprire un file Excel esistente per leggere o modificare il suo contenuto.
  - `workbook.save('file.xlsx')`: Dopo aver apportato modifiche al file, puoi salvare il file Excel con un nuovo nome o sovrascrivere l'esistente.

- **Manipolazione dei fogli di lavoro:**
  - `workbook.create_sheet("NuovoFoglio")`: Aggiunge un nuovo foglio di lavoro al file Excel con un nome specifico.
  - `workbook.remove(sheet)`: Rimuove un foglio di lavoro esistente.
  - `workbook.sheetnames`: Ti consente di vedere tutti i nomi dei fogli presenti nel file Excel.

- **Lavorare con le celle:**
  - `worksheet['A1'].value`: Restituisce o modifica il valore della cella A1.
  - `worksheet.cell(row=1, column=1).value`: Restituisce o imposta il valore di una cella in base alla posizione della riga e della colonna.
  
- **Unire e separare celle:**
  - `worksheet.merge_cells("A1:D1")`: Unisce un intervallo di celle in un’unica cella.
  - `worksheet.unmerge_cells("A1:D1")`: Separa le celle precedentemente unite.

- **Manipolazione delle righe e delle colonne:**
  - `worksheet.insert_rows(2, 3)`: Inserisce 3 nuove righe a partire dalla seconda riga.
  - `worksheet.delete_cols(1, 2)`: Elimina 2 colonne a partire dalla prima colonna.

- **Formattazione delle celle:**
  - `worksheet['A1'].font = Font(bold=True)`: Modifica il font della cella A1 rendendolo in grassetto.
  - `worksheet['A1'].fill = PatternFill(start_color="FFFF00", fill_type="solid")`: Imposta lo sfondo giallo nella cella A1.

### Uso tipico:
Puoi usare queste funzioni per creare script che automatizzano l’elaborazione di dati in Excel, che includono la creazione di report, il riordino e la formattazione dei dati, la creazione di fogli di lavoro personalizzati e altro ancora.

Se desideri vedere esempi di utilizzo pratico o approfondire una funzione specifica, fammi sapere!