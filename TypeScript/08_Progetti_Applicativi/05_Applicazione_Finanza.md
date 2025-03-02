
# 📌 Progetto Gestione Spese con TypeScript e React

## 🎯 Introduzione
In questa guida creeremo un'app per la **gestione delle spese personali**, utilizzando:
✅ **Frontend in React con TypeScript**  
✅ **Gestione dello stato con useReducer**  
✅ **Persistenza dati con LocalStorage**  
✅ **Grafici con Chart.js**  

---

## 📌 1️⃣ Creare il Progetto React con TypeScript
### 🔹 Installiamo le dipendenze
```sh
npx create-react-app finanza-frontend --template typescript
cd finanza-frontend
npm install chart.js react-chartjs-2
````

📌 **Librerie principali**:

- `chart.js` → Grafici per visualizzare spese
- `react-chartjs-2` → Wrapper React per Chart.js

---

## 📌 2️⃣ Definire il Tipo `Transazione`

Creiamo `src/types.ts`:

```ts
export interface Transazione {
    id: number;
    descrizione: string;
    importo: number;
    tipo: "entrata" | "uscita";
}
```

📌 **Tipizzazione chiara per ogni transazione.**

---

## 📌 3️⃣ Creare il Reducer per la Gestione dello Stato

Creiamo `src/reducers/transazioniReducer.ts`:

```ts
import { Transazione } from "../types";

type Azione =
    | { type: "AGGIUNGI"; transazione: Transazione }
    | { type: "RIMUOVI"; id: number };

export const transazioniReducer = (state: Transazione[], action: Azione): Transazione[] => {
    switch (action.type) {
        case "AGGIUNGI":
            return [...state, action.transazione];
        case "RIMUOVI":
            return state.filter(transazione => transazione.id !== action.id);
        default:
            return state;
    }
};
```

📌 **Gestisce l'aggiunta e la rimozione delle transazioni.**

---

## 📌 4️⃣ Creare il Contesto Globale

Creiamo `src/context/TransazioniContext.tsx`:

```tsx
import React, { createContext, useReducer, useEffect } from "react";
import { Transazione } from "../types";
import { transazioniReducer } from "../reducers/transazioniReducer";

interface TransazioniContextProps {
    transazioni: Transazione[];
    aggiungiTransazione: (transazione: Transazione) => void;
    rimuoviTransazione: (id: number) => void;
}

export const TransazioniContext = createContext<TransazioniContextProps | undefined>(undefined);

export const TransazioniProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [transazioni, dispatch] = useReducer(
        transazioniReducer,
        JSON.parse(localStorage.getItem("transazioni") || "[]")
    );

    useEffect(() => {
        localStorage.setItem("transazioni", JSON.stringify(transazioni));
    }, [transazioni]);

    const aggiungiTransazione = (transazione: Transazione) => {
        dispatch({ type: "AGGIUNGI", transazione });
    };

    const rimuoviTransazione = (id: number) => {
        dispatch({ type: "RIMUOVI", id });
    };

    return (
        <TransazioniContext.Provider value={{ transazioni, aggiungiTransazione, rimuoviTransazione }}>
            {children}
        </TransazioniContext.Provider>
    );
};
```

📌 **Usiamo LocalStorage per mantenere le transazioni salvate.**

---

## 📌 5️⃣ Creare il Componente per Aggiungere una Transazione

Creiamo `src/components/AggiungiTransazione.tsx`:

```tsx
import React, { useState, useContext } from "react";
import { TransazioniContext } from "../context/TransazioniContext";

const AggiungiTransazione: React.FC = () => {
    const [descrizione, setDescrizione] = useState("");
    const [importo, setImporto] = useState<number>(0);
    const [tipo, setTipo] = useState<"entrata" | "uscita">("entrata");

    const context = useContext(TransazioniContext);
    if (!context) return null;
    const { aggiungiTransazione } = context;

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        aggiungiTransazione({ id: Date.now(), descrizione, importo, tipo });
        setDescrizione("");
        setImporto(0);
    };

    return (
        <form onSubmit={handleSubmit}>
            <input type="text" placeholder="Descrizione" value={descrizione} onChange={(e) => setDescrizione(e.target.value)} required />
            <input type="number" placeholder="Importo" value={importo} onChange={(e) => setImporto(Number(e.target.value))} required />
            <select value={tipo} onChange={(e) => setTipo(e.target.value as "entrata" | "uscita")}>
                <option value="entrata">Entrata</option>
                <option value="uscita">Uscita</option>
            </select>
            <button type="submit">Aggiungi</button>
        </form>
    );
};

export default AggiungiTransazione;
```

📌 **Gestisce l'inserimento di nuove entrate o uscite.**

---

## 📌 6️⃣ Creare il Componente per Visualizzare le Transazioni

Creiamo `src/components/ListaTransazioni.tsx`:

```tsx
import React, { useContext } from "react";
import { TransazioniContext } from "../context/TransazioniContext";

const ListaTransazioni: React.FC = () => {
    const context = useContext(TransazioniContext);
    if (!context) return null;
    const { transazioni, rimuoviTransazione } = context;

    return (
        <ul>
            {transazioni.map((t) => (
                <li key={t.id}>
                    {t.descrizione} - {t.importo}€
                    <button onClick={() => rimuoviTransazione(t.id)}>❌</button>
                </li>
            ))}
        </ul>
    );
};

export default ListaTransazioni;
```

📌 **Permette di rimuovere transazioni dalla lista.**

---

## 📌 7️⃣ Creare il Componente per il Bilancio

Creiamo `src/components/Bilancio.tsx`:

```tsx
import React, { useContext } from "react";
import { TransazioniContext } from "../context/TransazioniContext";

const Bilancio: React.FC = () => {
    const context = useContext(TransazioniContext);
    if (!context) return null;
    const { transazioni } = context;

    const totale = transazioni.reduce((acc, t) => acc + (t.tipo === "entrata" ? t.importo : -t.importo), 0);

    return <h2>Bilancio: {totale}€</h2>;
};

export default Bilancio;
```

📌 **Calcola il saldo totale delle spese e entrate.**

---

## 📌 8️⃣ Creare la Dashboard

Modifichiamo `src/App.tsx`:

```tsx
import React from "react";
import { TransazioniProvider } from "./context/TransazioniContext";
import AggiungiTransazione from "./components/AggiungiTransazione";
import ListaTransazioni from "./components/ListaTransazioni";
import Bilancio from "./components/Bilancio";

const App: React.FC = () => {
    return (
        <TransazioniProvider>
            <div>
                <h1>Gestione Finanziaria</h1>
                <Bilancio />
                <AggiungiTransazione />
                <ListaTransazioni />
            </div>
        </TransazioniProvider>
    );
};

export default App;
```

---

## 📌 9️⃣ Avviare il Progetto

```sh
cd finanza-frontend
npm start
```

📌 **L'app sarà disponibile su `http://localhost:3000`** 🚀

---

## 📌 🔟 Testare l'Applicazione

1️⃣ Aggiungere **entrate e uscite**  
2️⃣ Controllare **il bilancio aggiornato**  
3️⃣ Eliminare una transazione e verificare il calcolo del saldo

📌 **Le transazioni rimarranno salvate grazie a LocalStorage.**

---

## 📌 Riepilogo

|Passaggio|Azione|
|---|---|
|**1️⃣ Creare il progetto**|React + TypeScript|
|**2️⃣ Creare il contesto globale**|`useReducer` e `localStorage`|
|**3️⃣ Aggiungere nuove transazioni**|Form con `useState`|
|**4️⃣ Visualizzare lista e bilancio**|`useContext` per gestire lo stato|
|**5️⃣ Testare l'applicazione**|Aggiungere, eliminare e aggiornare dati|

---
