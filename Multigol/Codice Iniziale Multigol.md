```python
import numpy as np
from scipy.stats import poisson

# Dati di esempio per le medie dei gol delle squadre
# Si assume che i valori siano stati già calcolati come medie ponderate
lambda_home = 1.8  # Media gol segnati dalla squadra di casa
lambda_away = 1.2  # Media gol segnati dalla squadra ospite

# Funzione per calcolare la probabilità di ogni numero di gol
def calcola_probabilita_gol(max_goals, lambda_home, lambda_away):
    # Calcolo delle probabilità di gol per ogni squadra fino a max_goals gol
    prob_home = [poisson.pmf(i, lambda_home) for i in range(max_goals + 1)]
    prob_away = [poisson.pmf(i, lambda_away) for i in range(max_goals + 1)]
    
    # Combinazione delle probabilità per ciascun risultato totale di gol
    probabilita_totali = {}
    for i in range(max_goals + 1):
        for j in range(max_goals + 1):
            totale_gol = i + j
            prob = prob_home[i] * prob_away[j]
            if totale_gol in probabilita_totali:
                probabilita_totali[totale_gol] += prob
            else:
                probabilita_totali[totale_gol] = prob
    
    return probabilita_totali

# Funzione per calcolare la probabilità per intervalli personalizzati
def calcola_probabilita_intervallo(intervalli, probabilita_totali):
    probabilita_intervalli = {}
    for nome_intervallo, intervallo in intervalli.items():
        prob = sum([probabilita_totali[gol] for gol in intervallo])
        probabilita_intervalli[nome_intervallo] = prob
    return probabilita_intervalli

# Dati di input: definizione degli intervalli di gol a cui sei interessato
intervalli_gol = {
	"multigol_0_2": range(0, 3)   # Gol totali tra 0 e 2
	"multigol_0_3": range(0, 4)   # Gol totali tra 0 e 3
    "multigol_1_3": range(1, 3),  # Gol totali tra 1 e 2
    "multigol_1_4": range(1, 4),  # Gol totali tra 1 e 3
    "multigol_2_3": range(2, 4),  # Gol totali tra 2 e 3
    "multigol_2_4": range(2, 5),  # Gol totali tra 2 e 4
    "multigol_3_5": range(3, 6),  # Gol totali tra 3 e 5
    "multigol_4_6": range(3, 7),  # Gol totali tra 4 e 6
}

# Calcolo delle probabilità di gol fino a 6 gol complessivi
max_goals = 6
probabilita_totali = calcola_probabilita_gol(max_goals, lambda_home, lambda_away)

# Calcolo delle probabilità per gli intervalli specificati
probabilita_intervalli = calcola_probabilita_intervallo(intervalli_gol, probabilita_totali)

# Stampa dei risultati
print("Probabilità per ciascun intervallo di gol:")
for intervallo, prob in probabilita_intervalli.items():
    print(f"{intervallo}: {prob:.4f}")

# Estrazione dei 5 intervalli più probabili
intervalli_ordinati = sorted(probabilita_intervalli.items(), key=lambda x: x[1], reverse=True)[:5]
print("\nI 5 intervalli di gol più probabili:")
for intervallo, prob in intervalli_ordinati:
    print(f"{intervallo}: {prob:.4f}")

# Sezione per calcolare il valore atteso (EV) per un intervallo specifico con una quota
def calcola_valore_atteso(probabilita, quota):
    return (probabilita * quota) - (1 - probabilita)

# Esempio di calcolo del valore atteso per l'intervallo "multigol_2_4" con una quota di 1.6
quota = 1.6
prob_multigol_2_4 = probabilita_intervalli["multigol_2_4"]
ev_multigol_2_4 = calcola_valore_atteso(prob_multigol_2_4, quota)

print(f"\nValore atteso per multigol 2-4 con quota {quota}: {ev_multigol_2_4:.4f}")
```

