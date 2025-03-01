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

<<<<<<< HEAD
```c
#include <stdio.h>
#include <stdlib.h>
#include <jansson.h> // Libreria per JSON parsing
#include <math.h>    // Per il calcolo della distribuzione di Poisson

// Struttura per gestire le statistiche di goal
typedef struct {
    double scored;
    double conceded;
    int count;
} Stats;

// Struttura per memorizzare le statistiche delle squadre
typedef struct {
    Stats home;
    Stats away;
} TeamStats;

// Funzione per calcolare la distribuzione di Poisson
double poisson_pmf(int k, double lambda) {
    return pow(lambda, k) * exp(-lambda) / tgamma(k + 1);
}

// Funzione per analizzare i file JSON e calcolare le medie dei gol
void analyze_json_files(char *json_files[], int num_files, char *home_team_input, char *away_team_input, 
                        TeamStats *goal_stats, int *direct_encounters, int *num_encounters) {
    for (int i = 0; i < num_files; i++) {
        json_error_t error;
        json_t *root = json_load_file(json_files[i], 0, &error);
        if (!root) {
            printf("Error processing file %s: %s\n", json_files[i], error.text);
            continue;
        }

        json_t *partite = json_object_get(root, "partite");
        if (!json_is_array(partite)) {
            printf("Invalid JSON structure in file %s\n", json_files[i]);
            json_decref(root);
            continue;
        }

        size_t index;
        json_t *match;
        json_array_foreach(partite, index, match) {
            const char *home_team = json_string_value(json_object_get(match, "squadra_casa"));
            const char *away_team = json_string_value(json_object_get(match, "squadra_trasferta"));
            int goals_home = json_integer_value(json_object_get(match, "gol_casa"));
            int goals_away = json_integer_value(json_object_get(match, "gol_trasferta"));

            // Aggiorna le statistiche per la squadra di casa
            goal_stats[home_team_input].home.scored += goals_home;
            goal_stats[home_team_input].home.conceded += goals_away;
            goal_stats[home_team_input].home.count++;

            // Aggiorna le statistiche per la squadra ospite
            goal_stats[away_team_input].away.scored += goals_away;
            goal_stats[away_team_input].away.conceded += goals_home;
            goal_stats[away_team_input].away.count++;

            // Salva gli scontri diretti
            if (strcmp(home_team, home_team_input) == 0 && strcmp(away_team, away_team_input) == 0) {
                direct_encounters[*num_encounters] = goals_home + goals_away;
                (*num_encounters)++;
            }
        }

        json_decref(root);
    }

    // Calcola la media dei goal segnati e subiti
    for (int i = 0; i < 2; i++) {
        if (goal_stats[home_team_input].home.count > 0) {
            goal_stats[home_team_input].home.scored /= goal_stats[home_team_input].home.count;
            goal_stats[home_team_input].home.conceded /= goal_stats[home_team_input].home.count;
        }
        if (goal_stats[away_team_input].away.count > 0) {
            goal_stats[away_team_input].away.scored /= goal_stats[away_team_input].away.count;
            goal_stats[away_team_input].away.conceded /= goal_stats[away_team_input].away.count;
        }
    }
}

// Funzione per calcolare la probabilità del multigol
double calcola_probabilita_multigol(TeamStats *goal_stats, char *home_team, char *away_team, int *direct_encounters, 
                                    int num_encounters, int *multigol_intervallo, int multigol_size) {
    // Media dei gol segnati/subiti per le squadre di casa e trasferta
    double home_avg_for = goal_stats[home_team].home.scored;
    double away_avg_against = goal_stats[away_team].away.conceded;
    double home_avg_against = goal_stats[home_team].home.conceded;
    double away_avg_for = goal_stats[away_team].away.scored;

    // Calcolo del lambda (gol attesi)
    double lambda_home = home_avg_for + away_avg_against;
    double lambda_away = away_avg_for + home_avg_against;

    // Calcolo del lambda ponderato con gli scontri diretti
    double direct_encounters_avg = 0.0;
    for (int i = 0; i < num_encounters; i++) {
        direct_encounters_avg += direct_encounters[i];
    }
    direct_encounters_avg /= num_encounters > 0 ? num_encounters : 1;

    double weighted_lambda = (lambda_home + lambda_away) * 0.7 + direct_encounters_avg * 0.3;

    // Calcolo della probabilità per l'intervallo multigol
    double prob_multigol = 0.0;
    for (int i = 0; i < multigol_size; i++) {
        prob_multigol += poisson_pmf(multigol_intervallo[i], weighted_lambda);
    }

    return prob_multigol;
}

int main() {
    char *json_files[] = {"file1.json", "file2.json"};
    int num_files = 2;
    char home_team[] = "Altach";
    char away_team[] = "Wolfsberger";

    // Dati per gestire le statistiche delle squadre
    TeamStats goal_stats[100] = {0}; // Consideriamo 100 squadre al massimo
    int direct_encounters[100] = {0};
    int num_encounters = 0;

    analyze_json_files(json_files, num_files, home_team, away_team, goal_stats, direct_encounters, &num_encounters);

    // Intervalli multigol definiti
    int multigol_1_3[] = {1, 2, 3};
    int multigol_2_4[] = {2, 3, 4};

    // Calcolo delle probabilità per i due intervalli
    double prob_multigol_1_3 = calcola_probabilita_multigol(goal_stats, home_team, away_team, direct_encounters, num_encounters, multigol_1_3, 3);
    double prob_multigol_2_4 = calcola_probabilita_multigol(goal_stats, home_team, away_team, direct_encounters, num_encounters, multigol_2_4, 3);

    printf("Probabilità multigol 1-3: %.4f\n", prob_multigol_1_3);
    printf("Probabilità multigol 2-4: %.4f\n", prob_multigol_2_4);

    return 0;
}

```
=======
---

### Prompt Descrittivo per il Codice

#### **Scopo del Codice**
Il codice ha lo scopo di effettuare un'analisi predittiva su eventi calcistici utilizzando dati storici provenienti da file JSON. Gli eventi analizzati includono:
- **Multigol**: calcolo della probabilità che il numero totale di gol in una partita rientri in un intervallo specifico (ad esempio, tra 1 e 3 o tra 2 e 4 gol).
- **Altri asset**: come **Corner** e **Tiri**, per i quali vengono analizzati i dati statistici relativi a questi eventi nelle partite passate.

Lo scopo principale è fornire una previsione accurata di tali eventi, calcolando la probabilità che si verifichino, e confrontare tali probabilità con le quote offerte dai bookmaker, calcolando il **valore atteso (EV)** di una potenziale scommessa.

#### **Funzionamento del Codice**
1. **Estrazione dei dati dai file JSON**:
   - Il codice legge una serie di file JSON che contengono informazioni dettagliate sulle partite di calcio, tra cui i gol segnati, i corner, i tiri e altri eventi.
   - Per ogni asset (ad esempio Corner, Tiri, o Gol), vengono estratti i dati relativi alle squadre selezionate (squadra di casa e squadra in trasferta).

2. **Calcolo delle medie statistiche**:
   - Per ogni squadra vengono calcolate le medie dei gol segnati e subiti, così come le medie per gli altri asset (corner, tiri, ecc.). Queste medie sono fondamentali per determinare le probabilità di futuri eventi.
   - Nel caso del **multigol**, vengono utilizzati i gol segnati e subiti per calcolare una media ponderata (\( \lambda \)) delle reti attese in una partita, tenendo conto anche degli scontri diretti tra le due squadre, se disponibili.

3. **Distribuzione di Poisson**:
   - Per calcolare la probabilità che un evento rientri in una soglia specifica (ad esempio, che ci siano tra 1 e 3 gol), il codice utilizza la **distribuzione di Poisson**. Questa distribuzione statistica è ideale per modellare eventi discreti come il numero di gol segnati in una partita.
   - Il valore \( \lambda \) (la media dei gol attesi) viene utilizzato come input nella distribuzione di Poisson per stimare la probabilità che si verifichi un determinato numero di gol.

4. **Calcolo del Valore Atteso (EV)**:
   - Il codice calcola il **valore atteso (EV)** di una scommessa utilizzando la probabilità prevista e la quota offerta dal bookmaker.
   - La formula per calcolare l'EV è: 
     
$$
     EV = (P \times Q) - 1
$$
     
Dove \( P \) è la probabilità dell'evento e \( Q \) è la quota offerta dal bookmaker. Se il valore atteso è positivo, indica una potenziale scommessa di valore.

5. **Esecuzione simultanea di più analisi**:
   - Il codice esegue simultaneamente l'analisi per più asset, tra cui il multigol e altri eventi come corner e tiri. Vengono eseguite contemporaneamente previsioni per le stesse squadre selezionate, utilizzando le medie statistiche estratte dai file JSON.
   - L'utente può definire soglie personalizzate per ciascun asset, come la soglia di gol per il multigol (ad esempio, 1-3 o 2-4 gol), o una soglia di corner.

#### **Logica del Codice**
- **Estrazione dati JSON**: La funzione `analyze_json_files()` è responsabile dell'estrazione dei dati rilevanti dai file JSON, come i gol segnati e subiti dalle squadre. Questa funzione supporta sia i dati sui gol (per il multigol) sia gli altri asset (corner, tiri, ecc.).
  
- **Calcolo delle probabilità**: Viene utilizzata la distribuzione di Poisson per calcolare la probabilità che un evento rientri in un certo intervallo. Ad esempio, nel caso del multigol, viene calcolata la probabilità che il numero di gol totali nella partita rientri in un intervallo specificato (es. tra 1 e 3 gol).

- **Calcolo del valore atteso (EV)**: Una volta calcolata la probabilità dell'evento, viene confrontata con la quota del bookmaker per determinare se la scommessa ha valore. Questo viene fatto per tutti gli asset selezionati, incluso il multigol.

#### **Funzionalità Principali**
- **Analisi Multigol**: Calcola le probabilità per gli intervalli multigol selezionati, come 1-3 o 2-4 gol totali.
- **Analisi di altri asset**: Include corner, tiri, e altre statistiche estratte dal file JSON.
- **Esecuzione simultanea**: Tutte le analisi vengono eseguite contemporaneamente per le squadre selezionate, producendo previsioni e il valore atteso (EV) per ciascun asset.
- **Flessibilità**: Permette di definire soglie personalizzate per ogni asset e di confrontare le probabilità con le quote offerte dal bookmaker.

#### **Come Usare il Codice**
1. Inserisci i file JSON contenenti i dati storici delle partite nella cartella appropriata.
2. Esegui il codice e specifica le squadre di casa e trasferta per le quali vuoi effettuare l'analisi.
3. Seleziona gli asset da analizzare (es. Corner, Tiri, Multigol).
4. Inserisci le soglie di interesse (ad esempio, soglia di corner >10, o multigol tra 1 e 3 gol).
5. Il codice restituirà la probabilità di ciascun evento e il valore atteso (EV) calcolato sulla base delle quote offerte dal bookmaker.

---
>>>>>>> origin/main
