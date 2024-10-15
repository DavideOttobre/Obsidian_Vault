```python
import streamlit as st
import os
import json
from collections import defaultdict
from scipy.stats import poisson
import numpy as np
from openpyxl import load_workbook
from datetime import datetime
from pathlib import Path

base_dir = Path(__file__).resolve().parent
path = (str(base_dir).replace("\Previsioni da JSON\Form su Stream","\Estrarre dati storici\Archivi"))

def converti_asset(x):
    asset_mapping = {
        "Corner": "calci_angolo",
        "Tiri": "tiri",
        "Fuorigioco": "fuorigioco",
        "Gol Primo Tempo": "gol_primo_tempo",
        "Tiri in porta": "tiri_porta"
    }
    return asset_mapping.get(x, "tiri_porta")

def determine_odds_range(odds):
    if odds <= 1.5:
        return '<=1.5'
    elif 1.5 < odds <= 2:
        return '>1.5 and <=2'
    else:
        return '>2'

def poisson_probability(lambd, k):
    return poisson.cdf(k, lambd)

def calculate_ev(prob, odds):
    return (prob * odds) - 1

def analyze_json_files(json_files, home_team_input, away_team_input, asset, home_odds_range, away_odds_range):
    corner_stats = defaultdict(lambda: {'home': {'total': 0, 'count': 0}, 'away': {'total': 0, 'count': 0}})
    recent_performance = defaultdict(lambda: {'home': [], 'away': []})
    direct_encounters = []

    home = f"{converti_asset(asset)}_casa"
    away = f"{converti_asset(asset)}_trasferta"

    for json_file in json_files:
        try:
            with open(json_file, 'r', encoding='utf-8') as f:
                data = json.load(f)

            for match in data.get('partite', []):
                home_team = match['squadra_casa']
                away_team = match['squadra_trasferta']
                corners_home = match[home]
                corners_away = match[away]
                home_odds = match['quota_1']
                away_odds = match['quota_2']

                corner_stats[home_team]['home']['total'] += corners_home
                corner_stats[home_team]['home']['count'] += 1
                corner_stats[away_team]['away']['total'] += corners_away
                corner_stats[away_team]['away']['count'] += 1

                recent_performance[home_team]['home'] = (recent_performance[home_team]['home'] + [corners_home])[-10:]
                recent_performance[away_team]['away'] = (recent_performance[away_team]['away'] + [corners_away])[-10:]

                if home_team == home_team_input and away_team == away_team_input:
                    direct_encounters.append((corners_home, corners_away))
        except Exception as e:
            st.error(f"Error processing file {json_file}: {str(e)}")

    for team in corner_stats:
        for location in ['home', 'away']:
            if corner_stats[team][location]['count'] > 0:
                corner_stats[team][location] = corner_stats[team][location]['total'] / corner_stats[team][location]['count']
            else:
                corner_stats[team][location] = 0

    return corner_stats, recent_performance, direct_encounters

def perform_analysis(home_team, away_team, home_odds, away_odds, over_under, assets, thresholds, bookmaker_odds, json_files):
    results = {}
    for asset, threshold, odds in zip(assets, thresholds, bookmaker_odds):
        home_odds_range = determine_odds_range(home_odds)
        away_odds_range = determine_odds_range(away_odds)

        corner_stats, recent_performance, direct_encounters = analyze_json_files(
            json_files, home_team, away_team, asset, home_odds_range, away_odds_range
        )

        home_avg_for = corner_stats[home_team]['home']
        away_avg_against = corner_stats[away_team]['away']
        home_avg_against = corner_stats[home_team]['away']
        away_avg_for = corner_stats[away_team]['home']

        lambda_value = home_avg_for + away_avg_against
        direct_encounters_avg = np.mean([sum(match) for match in direct_encounters]) if direct_encounters else lambda_value
        weighted_lambda = (lambda_value * 0.7) + (direct_encounters_avg * 0.3)

        if over_under == 'Over':
            prob = 1 - poisson_probability(weighted_lambda, int(threshold) - 1)
        else:
            prob = poisson_probability(weighted_lambda, int(threshold))

        ev = calculate_ev(prob, odds)

        results[asset] = {
            'probability': prob,
            'ev': ev,
            'recent_performance': recent_performance,
            'direct_encounters': direct_encounters,
        }
    return results

def write_to_excel(data, excel_path=os.path.join(base_dir,"analysis_results.xlsx")):
    try:
        wb = load_workbook(excel_path)
        ws = wb.active
    except FileNotFoundError:
        wb = load_workbook()
        ws = wb.active
        ws.append(["Date", "Home Team", "Away Team", "Asset", "Threshold", "Bookmaker Odds", "Probability", "Expected Value"])

    next_row = ws.max_row + 1
    for entry in data:
        ws.append([
            entry['date'], entry['home_team'], entry['away_team'], entry['asset'],
            entry['threshold'], entry['bookmaker_odds'], entry['probability'], entry['ev']
        ])

    wb.save(excel_path)
    st.success(f"Data written to Excel file: {excel_path}")

def main():
    st.title("Analisi Partita")

    league_paths = {
        "AUS - Bundesliga": os.path.join(path,"\Austria\Bundesliga"),
            "BEL - Jupiler League" : os.path.join(path,"Belgio\Jupiler League"),
            "DAN - Superliga": os.path.join(path,"Danimarca\Superliga"),
            "DAN - 1.st Division": os.path.join(path,"Danimarca\1st Division"),
            "FRA - Ligue 1": os.path.join(path,"Francia\Ligue 1"),
            "ITA - Serie A": os.path.join(path,"Italia\Serie A"),
            "ITA - Serie B": os.path.join(path,"Italia\Serie B"),
            "ENG - Premier League": os.path.join(path,"Inghilterra\Premier League"),
            "ENG - Championship": os.path.join(path,"Inghilterra\Championship"),
            "GER - Bundesliga": os.path.join(path,"Germania\Bundesliga"),
            "GER - 2. Bundesliga": os.path.join(path,"Germania\2 Bundesliga"),
            "HOL - Eredivise": os.path.join(path,"Olanda\Eredivisie"),
            "HOL - Eerste Divise": os.path.join(path,"Olanda\Eerste Divisie"),
            "POR - Liga Portoghese": os.path.join(path,"Portogallo\Liga Portugal"),
            "SPA - La Liga": os.path.join(path,"Spagna\Laliga"),
            "SPA - La Liga 2": os.path.join(path,"Spagna\Laliga2"),
            "SVE - Allsvenskan": os.path.join(path,"Svezia\Allsvenskan"),
            "SVI - Super League": os.path.join(path,"Svizzera\Super League"),
            "TUR - Super Lig": os.path.join(path,"Turchia\Super Lig"),
            "TUR - 1. Lig": os.path.join(path,"Turchia\1 Lig")
            # Add more leagues and paths as needed
    }

    league = st.selectbox("Seleziona Campionato", list(league_paths.keys()))
    if league:
        path = league_paths[league]
        teams = set()
        json_files = [
            os.path.join(root, file)
            for root, _, files in os.walk(path)
            for file in files if file.endswith('.json')
        ]

        for json_file_path in json_files:
            try:
                with open(json_file_path, 'r', encoding='utf-8') as f:
                    data = json.load(f)
                    for match in data.get('partite', []):
                        teams.add(match['squadra_casa'])
                        teams.add(match['squadra_trasferta'])
            except Exception as e:
                st.error(f"Error reading file {json_file_path}: {str(e)}")

        teams = sorted(teams)
        home_team = st.selectbox("Squadra Casa", teams)
        away_team = st.selectbox("Squadra Trasferta", teams)

        home_odds = st.number_input("Quota Squadra Casa", min_value=1.0, step=0.01)
        away_odds = st.number_input("Quota Squadra Trasferta", min_value=1.0, step=0.01)
        over_under = st.selectbox("Over/Under - 1X2", ["Over", "1X2"])

        assets = ['Corner', 'Tiri', 'Tiri in porta']
        thresholds = []
        bookmaker_odds = []

        for asset in assets:
            st.markdown(f"### {asset} Analisi")
            col1, col2 = st.columns(2)
            with col1:
                threshold = st.number_input(f"Soglia per {asset}", min_value=1.1, step=0.5, key=f"threshold_{asset}")
                thresholds.append(threshold)
            with col2:
                odds = st.number_input(f"Quota Bookmaker {asset}", min_value=1.0, step=0.01, key=f"odds_{asset}")
                bookmaker_odds.append(odds)

        if st.button("Analizza"):
            results = perform_analysis(home_team, away_team, home_odds, away_odds, over_under, assets, thresholds, bookmaker_odds, json_files)
            data_to_write = []
            for asset in assets:
                st.markdown(f"## Results for {asset}")
                prob = results[asset]['probability']
                ev = results[asset]['ev']
                st.write(f"Probability ({over_under} {thresholds[assets.index(asset)]} total {asset}): {prob:.2%}")
                st.write(f"Expected Value (EV): {ev:.4f} {'(Value Bet)' if ev > 0 else '(No Value)'}")
                st.write("Recent performance (last 10 games):")
                st.write(f"{home_team} (home): {results[asset]['recent_performance'][home_team]['home']}")
                st.write(f"{away_team} (away): {results[asset]['recent_performance'][away_team]['away']}")
                st.write(f"Direct encounters (total {asset}): {[sum(match) for match in results[asset]['direct_encounters']]}")

                data_to_write.append({
                    'date': datetime.now().strftime("%d-%m-%Y"),
                    'home_team': home_team,
                    'away_team': away_team,
                    'asset': asset,
                    'threshold': thresholds[assets.index(asset)],
                    'bookmaker_odds': bookmaker_odds[assets.index(asset)],
                    'probability': prob,
                    'ev': ev
                })

            write_to_excel(data_to_write)

if __name__ == "__main__":
    main()
```