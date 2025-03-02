Ecco il secondo file `.md` per **Installazione e primo progetto**:


# Installazione e Primo Progetto in Angular

## 1️⃣ Installazione di Angular CLI
Per iniziare con Angular, è necessario installare **Angular CLI** (Command Line Interface), uno strumento che facilita la creazione e gestione di progetti Angular.

### 📌 Requisiti:
- **Node.js** (consigliata la versione LTS) ➝ Scaricabile da [nodejs.org](https://nodejs.org/)
- **npm** (Node Package Manager) ➝ Installato automaticamente con Node.js

### 🔧 Passaggi per l'installazione:
1️⃣ **Verifica l’installazione di Node.js e npm**  
   ```sh
   node -v  # Controlla la versione di Node.js
   npm -v   # Controlla la versione di npm
```

2️⃣ **Installa Angular CLI globalmente**

```sh
npm install -g @angular/cli
```

3️⃣ **Verifica l'installazione**

```sh
ng version
```

Se tutto è corretto, vedrai un output con la versione di Angular CLI e i pacchetti installati.

---

## 2️⃣ Creazione di un nuovo progetto Angular

Una volta installato Angular CLI, possiamo creare un nuovo progetto.

### 🔧 Passaggi:

1️⃣ **Crea un nuovo progetto Angular**

```sh
ng new nome-del-progetto
```

Durante la creazione, Angular ti chiederà:

- Se vuoi **Angular Routing** → Scrivi `Y` (consigliato).
- Il tipo di **stile** da usare (`CSS`, `SCSS`, `LESS`, `Stylus`) → Scegli `CSS` per ora.

2️⃣ **Spostati nella cartella del progetto**

```sh
cd nome-del-progetto
```

3️⃣ **Avvia il server di sviluppo**

```sh
ng serve
```

Questo comando avvierà un server locale e potrai vedere l’app in esecuzione su: 👉 [http://localhost:4200](http://localhost:4200/)

---

## 3️⃣ Struttura di un Progetto Angular

Una volta creato il progetto, vedrai una struttura di cartelle simile a questa:

```
nome-del-progetto/
│-- node_modules/      # Librerie installate con npm
│-- src/               # Codice sorgente dell'applicazione
│   │-- app/           # Componenti, moduli e servizi
│   │-- assets/        # File statici (immagini, icone, ecc.)
│   │-- environments/  # Configurazioni per ambiente (dev, prod)
│   │-- index.html     # Pagina principale
│   │-- main.ts        # Punto di ingresso dell'app
│   │-- styles.css     # Stili globali
│-- angular.json       # Configurazione del progetto
│-- package.json       # Dipendenze e script npm
│-- README.md          # Info sul progetto
```

📌 **Cartelle importanti:**

- **`src/app/`** → Contiene i componenti principali dell'applicazione.
- **`angular.json`** → File di configurazione di Angular.
- **`package.json`** → Elenco delle dipendenze del progetto.

---

## 4️⃣ Primo esempio di modifica

Modifichiamo il file principale per visualizzare un messaggio personalizzato.

🔹 Apri `src/app/app.component.ts` e sostituisci il contenuto con:

```typescript
import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  template: `<h1>Benvenuto su Angular!</h1>`,
  styles: [`h1 { color: darkblue; text-align: center; }`]
})
export class AppComponent {}
```

🔹 Salva il file e ricarica il browser. Ora dovresti vedere il messaggio **"Benvenuto su Angular!"**.

---

## 5️⃣ Conclusione

Hai installato Angular, creato il tuo primo progetto e personalizzato il contenuto del componente principale. Nei prossimi file esploreremo la **struttura di un'app Angular** in dettaglio! 🚀
