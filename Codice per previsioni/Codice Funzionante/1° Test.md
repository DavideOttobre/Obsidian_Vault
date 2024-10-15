### Codice con calcolo lambda reale
Il seguente codice ha la sola previsione dei multigol, ma è stato implementato il calcolo del lambda reale:

```python
import json
from collections import defaultdict
import numpy as np
from scipy.stats import poisson

# Funzione per analizzare i file JSON e calcolare le medie dei gol
def analyze_json_files(json_files, home_team_input, away_team_input):
    goal_stats = defaultdict(lambda: {'home': {'scored': 0, 'conceded': 0, 'count': 0}, 
                                      'away': {'scored': 0, 'conceded': 0, 'count': 0}})
    direct_encounters = []

    for json_file in json_files:
        try:
            with open(json_file, 'r', encoding='utf-8') as f:
                data = json.load(f)

            for match in data.get('partite', []):
                home_team = match['squadra_casa']
                away_team = match['squadra_trasferta']
                goals_home = match['gol_casa']
                goals_away = match['gol_trasferta']

                # Aggiorna le statistiche per la squadra di casa (gol segnati e subiti)
                goal_stats[home_team]['home']['scored'] += goals_home
                goal_stats[home_team]['home']['conceded'] += goals_away
                goal_stats[home_team]['home']['count'] += 1

                # Aggiorna le statistiche per la squadra ospite (gol segnati e subiti)
                goal_stats[away_team]['away']['scored'] += goals_away
                goal_stats[away_team]['away']['conceded'] += goals_home
                goal_stats[away_team]['away']['count'] += 1

                # Salva gli scontri diretti tra le due squadre
                if home_team == home_team_input and away_team == away_team_input:
                    direct_encounters.append((goals_home, goals_away))
        
        except Exception as e:
            print(f"Error processing file {json_file}: {str(e)}")

    # Calcolo della media dei gol segnati e subiti per ciascuna squadra
    for team in goal_stats:
        for location in ['home', 'away']:
            if goal_stats[team][location]['count'] > 0:
                goal_stats[team][location]['scored'] /= goal_stats[team][location]['count']
                goal_stats[team][location]['conceded'] /= goal_stats[team][location]['count']

    return goal_stats, direct_encounters

# Funzione per calcolare la probabilità del multigol
def calcola_probabilita_multigol(goal_stats, home_team, away_team, direct_encounters, multigol_intervallo):
    # Media dei gol segnati/subiti per le squadre di casa e trasferta
    home_avg_for = goal_stats[home_team]['home']['scored']
    away_avg_against = goal_stats[away_team]['away']['conceded']
    home_avg_against = goal_stats[home_team]['home']['conceded']
    away_avg_for = goal_stats[away_team]['away']['scored']

    # Calcolo del lambda (gol attesi)
    lambda_home = home_avg_for + away_avg_against
    lambda_away = away_avg_for + home_avg_against

    # Calcolo del lambda ponderato con gli scontri diretti
    direct_encounters_avg = np.mean([sum(match) for match in direct_encounters]) if direct_encounters else lambda_home + lambda_away
    weighted_lambda = (lambda_home + lambda_away) * 0.7 + direct_encounters_avg * 0.3

    # Calcolo della probabilità per l'intervallo multigol
    prob_multigol = sum([poisson.pmf(i, weighted_lambda) for i in multigol_intervallo])
    
    return prob_multigol

# Esempio di utilizzo per multigol 1-3 e multigol 2-4
json_files = ['file1.json', 'file2.json']  # Lista di file JSON da analizzare
home_team = 'Altach'
away_team = 'Wolfsberger'
goal_stats, direct_encounters = analyze_json_files(json_files, home_team, away_team)

# Intervalli multigol definiti
multigol_1_3 = range(1, 4)
multigol_2_4 = range(2, 5)

# Calcolo delle probabilità per i due intervalli
prob_multigol_1_3 = calcola_probabilita_multigol(goal_stats, home_team, away_team, direct_encounters, multigol_1_3)
prob_multigol_2_4 = calcola_probabilita_multigol(goal_stats, home_team, away_team, direct_encounters, multigol_2_4)

print(f"Probabilità multigol 1-3: {prob_multigol_1_3:.4f}")
print(f"Probabilità multigol 2-4: {prob_multigol_2_4:.4f}")
```

## Implementazione con codice funzionante
Codice originario con l'implementazione del Multigol *DA TESTARE*

```python
import json
import numpy as np
from collections import defaultdict
from scipy.stats import poisson

# Funzione per convertire l'asset in una chiave utilizzabile nei dati JSON
def converti_asset(x):
    asset_mapping = {
        "Corner": "calci_angolo",
        "Tiri": "tiri",
        "Tiri in porta": "tiri_porta",
        "Multigol": "gol"  # Aggiungiamo il multigol come nuovo asset
    }
    return asset_mapping.get(x, "tiri_porta")

# Funzione per analizzare i file JSON e calcolare le statistiche
def analyze_json_files(json_files, home_team_input, away_team_input, asset):
    stats = defaultdict(lambda: {'home': {'total': 0, 'count': 0}, 'away': {'total': 0, 'count': 0}})
    direct_encounters = []

    # Converte l'asset in base alla chiave del JSON
    asset_key = converti_asset(asset)

    for json_file in json_files:
        try:
            with open(json_file, 'r', encoding='utf-8') as f:
                data = json.load(f)

            for match in data.get('partite', []):
                home_team = match['squadra_casa']
                away_team = match['squadra_trasferta']

                # Se l'asset è "Multigol", usa i gol segnati/subiti per il calcolo
                if asset == "Multigol":
                    home_value = match['gol_casa']
                    away_value = match['gol_trasferta']
                else:
                    # Altrimenti usa l'asset normale (Corner, Tiri, ecc.)
                    home_value = match[f"{asset_key}_casa"]
                    away_value = match[f"{asset_key}_trasferta"]

                # Aggiorna le statistiche per la squadra di casa e trasferta
                stats[home_team]['home']['total'] += home_value
                stats[home_team]['home']['count'] += 1
                stats[away_team]['away']['total'] += away_value
                stats[away_team]['away']['count'] += 1

                # Registra gli scontri diretti tra le squadre
                if home_team == home_team_input and away_team == away_team_input:
                    direct_encounters.append((home_value, away_value))

        except Exception as e:
            print(f"Error processing file {json_file}: {str(e)}")

    # Calcolo delle medie per ciascuna squadra
    for team in stats:
        for location in ['home', 'away']:
            if stats[team][location]['count'] > 0:
                stats[team][location] = stats[team][location]['total'] / stats[team][location]['count']
            else:
                stats[team][location] = 0

    return stats, direct_encounters

# Funzione per calcolare il valore atteso (EV)
def calculate_ev(prob, odds):
    return (prob * odds) - 1

# Funzione per calcolare la probabilità del multigol usando il lambda reale
def calcola_probabilita_multigol(goal_stats, home_team, away_team, direct_encounters, multigol_intervallo):
    # Media dei gol segnati/subiti per le squadre di casa e trasferta
    home_avg_for = goal_stats[home_team]['home']
    away_avg_against = goal_stats[away_team]['away']
    home_avg_against = goal_stats[home_team]['away']
    away_avg_for = goal_stats[away_team]['home']

    # Calcolo del lambda (gol attesi)
    lambda_home = home_avg_for + away_avg_against
    lambda_away = away_avg_for + home_avg_against

    # Calcolo del lambda ponderato con gli scontri diretti
    direct_encounters_avg = np.mean([sum(match) for match in direct_encounters]) if direct_encounters else lambda_home + lambda_away
    weighted_lambda = (lambda_home + lambda_away) * 0.7 + direct_encounters_avg * 0.3

    # Calcolo della probabilità per l'intervallo multigol
    prob_multigol = sum([poisson.pmf(i, weighted_lambda) for i in multigol_intervallo])
    
    return prob_multigol

# Funzione per eseguire l'analisi di tutti gli asset e il multigol contemporaneamente
def perform_analysis(home_team, away_team, home_odds, away_odds, over_under, assets, thresholds, bookmaker_odds, json_files):
    results = {}

    # Analisi degli asset (Corner, Tiri, ecc.)
    for asset, threshold, odds in zip(assets, thresholds, bookmaker_odds):
        stats, direct_encounters = analyze_json_files(json_files, home_team, away_team, asset)

        home_avg_for = stats[home_team]['home']
        away_avg_against = stats[away_team]['away']

        if asset == "Multigol":
            # Calcola lambda per multigol e usa i gol segnati e subiti
            prob = calcola_probabilita_multigol(stats, home_team, away_team, direct_encounters, range(int(threshold), int(threshold) + 3))
        else:
            # Usa i dati dell'asset (Corner, Tiri, ecc.)
            lambda_value = home_avg_for + away_avg_against
            if over_under == 'Over':
                prob = 1 - poisson.cdf(int(threshold) - 1, lambda_value)
            else:
                prob = poisson.cdf(int(threshold), lambda_value)

        ev = calculate_ev(prob, odds)
        results[asset] = {'probability': prob, 'ev': ev, 'direct_encounters': direct_encounters}

    return results

# Simulazione di esecuzione
def main():
    # Esempio di input
    home_team = 'Altach'
    away_team = 'Wolfsberger'
    home_odds = 2.4
    away_odds = 2.9
    over_under = 'Over'
    assets = ['Corner', 'Tiri', 'Multigol']
    thresholds = [10, 5, 1]  # Threshold per multigol (1-3)
    bookmaker_odds = [1.8, 1.6, 1.5]  # Quota per gli asset

    json_files = ['file1.json', 'file2.json']  # Lista dei file JSON

    # Esegui l'analisi per tutti gli asset e il multigol
    results = perform_analysis(home_team, away_team, home_odds, away_odds, over_under, assets, thresholds, bookmaker_odds, json_files)

    # Mostra i risultati
    for asset, result in results.items():
        print(f"Risultati per {asset}: Probabilità = {result['probability']:.2%}, EV = {result['ev']:.4f}")

if __name__ == "__main__":
    main()

```

### Spiegazione del processo del codice:

Certo! Ti spiego passo per passo il funzionamento del codice aggiornato per l'analisi simultanea di asset e multigol:

### 1. **Funzione `converti_asset()`**
Questa funzione è utilizzata per mappare gli **asset** scelti dall'utente (come Corner, Tiri, ecc.) alle relative chiavi nel file JSON. 
- Se l'asset selezionato è **Multigol**, questa funzione restituisce "gol" per poter accedere ai campi `gol_casa` e `gol_trasferta` nel file JSON.
- Per gli altri asset, come Corner e Tiri, viene restituita la chiave corrispondente che permette di accedere alle statistiche specifiche (es. `calci_angolo_casa` o `tiri_porta_casa`).

### 2. **Funzione `analyze_json_files()`**
Questa funzione è il cuore dell'estrazione dei dati dai file JSON. Esegue diverse operazioni chiave:
- **Input**: prende in input la lista di file JSON, le squadre da analizzare (casa e trasferta) e l'asset selezionato (ad es. Corner, Tiri, o Multigol).
- **Logica per il Multigol**: Se l'asset selezionato è "Multigol", la funzione usa i campi `gol_casa` e `gol_trasferta` per calcolare la media dei gol segnati e subiti da ogni squadra.
  - Se l'asset è diverso da Multigol, usa invece i campi specifici dell'asset (ad es. `calci_angolo_casa` per Corner).
- **Statistiche**: Vengono calcolate le medie per i gol o per l'asset selezionato, tenendo traccia dei gol totali e delle partite giocate per ciascuna squadra (sia in casa che in trasferta). 
  - Se le squadre selezionate sono le stesse della partita in corso, vengono salvati anche i **scontri diretti** (gol segnati e subiti in passato tra le due squadre).

### 3. **Funzione `calcola_probabilita_multigol()`**
Questa funzione calcola la **probabilità per il multigol**, ossia che il numero totale di gol rientri in un intervallo specifico (ad es. multigol 1-3 o 2-4).
- **Input**: Prende come input le medie dei gol (calcolate nella funzione `analyze_json_files()`), gli scontri diretti e l'intervallo multigol selezionato.
- **Calcolo del lambda**: Per calcolare la media attesa dei gol (lambda), la funzione combina i gol segnati e subiti da ciascuna squadra. Il valore di lambda viene ponderato utilizzando sia i dati storici che gli scontri diretti.
- **Distribuzione di Poisson**: Usa la distribuzione di Poisson per calcolare la probabilità che il numero totale di gol rientri nell'intervallo specificato.

### 4. **Funzione `perform_analysis()`**
Questa è la funzione principale che esegue l'analisi per tutti gli asset (incluso il multigol).
- **Input**: Prende in input le squadre, le quote offerte dal bookmaker, gli asset selezionati, le soglie (ad es. soglia di gol, soglia di corner), e i file JSON.
- **Ciclo sugli asset**: Per ogni asset (incluso il multigol), la funzione:
  - Esegue l'analisi del file JSON utilizzando `analyze_json_files()`.
  - Calcola le probabilità per il multigol o per l'asset selezionato (come Corner o Tiri).
  - Calcola il **valore atteso (EV)** confrontando la probabilità con la quota del bookmaker. Se la probabilità di un evento è superiore alla quota implicita, l'EV sarà positivo (indicando una potenziale scommessa di valore).
- **Calcolo simultaneo**: Questa funzione gestisce sia gli asset tradizionali che il multigol nello stesso ciclo, quindi tutte le analisi vengono eseguite contemporaneamente per le stesse squadre.

### 5. **Funzione `main()`**
Questa funzione simula l'interfaccia utente e guida l'interazione con l'utente:
- Definisce i parametri necessari, come le squadre da analizzare, le soglie, e le quote offerte dal bookmaker.
- Chiama la funzione `perform_analysis()` per eseguire l'analisi simultanea di tutti gli asset (incluso il multigol).
- Visualizza i risultati delle probabilità e del valore atteso (EV) per ciascun asset.

### Esecuzione dell'analisi:
- Quando l'utente inserisce le squadre e seleziona gli asset (incluso il multigol), il codice estrae i dati dai file JSON relativi alle squadre.
- Calcola le medie (lambda) basate su gol segnati e subiti (per il multigol) o sugli altri asset.
- Viene calcolata la probabilità per l'evento (es. multigol 1-3, corner over 10) utilizzando la distribuzione di Poisson.
- Alla fine, viene calcolato il **valore atteso (EV)** per ciascun asset, confrontando la probabilità prevista con le quote del bookmaker.

### Flusso completo:
1. **Estrazione dati**: Vengono estratti i dati dal file JSON (gol segnati e subiti per il multigol, corner o tiri per altri asset).
2. **Calcolo lambda**: Per ogni squadra vengono calcolate le medie basate sui gol segnati/subiti (multigol) o sugli asset selezionati.
3. **Calcolo delle probabilità**: Utilizzando la distribuzione di Poisson, viene calcolata la probabilità che l'evento rientri nella soglia specificata.
4. **Valore atteso (EV)**: Viene calcolato l'EV in base alla quota fornita dal bookmaker.

In questo modo, il codice esegue simultaneamente l'analisi per gli asset esistenti (come Corner e Tiri) e per il multigol, utilizzando un flusso coerente e dati estratti dallo stesso file JSON.

Spero che la spiegazione ti abbia chiarito il funzionamento del codice! Se hai ulteriori domande o desideri altre modifiche, fammi sapere.