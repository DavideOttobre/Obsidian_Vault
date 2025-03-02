# 📌 Progetto Dashboard Analitica con React e TypeScript

## 🎯 Introduzione
In questa guida creeremo una **dashboard interattiva** per visualizzare dati in tempo reale utilizzando:
✅ **Frontend in React con TypeScript**  
✅ **Visualizzazione dati con Chart.js**  
✅ **Chiamate API simulate per aggiornamento dinamico**  

---

## 📌 1️⃣ Creare il Progetto React con TypeScript
### 🔹 Installiamo le dipendenze
```sh
npx create-react-app dashboard-frontend --template typescript
cd dashboard-frontend
npm install chart.js react-chartjs-2 axios
````

📌 **Librerie principali**:

- `chart.js` → Per la generazione di grafici
- `react-chartjs-2` → Wrapper per Chart.js in React
- `axios` → Per recuperare dati da API

---

## 📌 2️⃣ Creare un Servizio per Simulare API

Creiamo `src/services/api.ts`:

```ts
import axios from "axios";

export interface DatiGrafico {
    mese: string;
    valore: number;
}

export const fetchDati = async (): Promise<DatiGrafico[]> => {
    // Simuliamo un'API con dati statici
    return [
        { mese: "Gen", valore: 10 },
        { mese: "Feb", valore: 20 },
        { mese: "Mar", valore: 15 },
        { mese: "Apr", valore: 25 },
        { mese: "Mag", valore: 30 }
    ];
};
```

📌 **Simuliamo dati per evitare di dipendere da un server**.

---

## 📌 3️⃣ Creare il Componente Grafico

Creiamo `src/components/ChartComponent.tsx`:

```tsx
import React, { useEffect, useState } from "react";
import { Bar } from "react-chartjs-2";
import { fetchDati, DatiGrafico } from "../services/api";
import { Chart, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from "chart.js";

// Registriamo i componenti Chart.js
Chart.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const ChartComponent: React.FC = () => {
    const [dati, setDati] = useState<DatiGrafico[]>([]);

    useEffect(() => {
        fetchDati().then(setDati);
    }, []);

    const data = {
        labels: dati.map(d => d.mese),
        datasets: [
            {
                label: "Valori Mensili",
                data: dati.map(d => d.valore),
                backgroundColor: "rgba(75, 192, 192, 0.6)"
            }
        ]
    };

    return (
        <div>
            <h2>Grafico dei Dati</h2>
            <Bar data={data} />
        </div>
    );
};

export default ChartComponent;
```

📌 **Chart.js aggiorna dinamicamente i dati sulla dashboard**.

---

## 📌 4️⃣ Creare la Dashboard

Modifichiamo `src/App.tsx`:

```tsx
import React from "react";
import ChartComponent from "./components/ChartComponent";

const App: React.FC = () => {
    return (
        <div>
            <h1>Dashboard Analitica</h1>
            <ChartComponent />
        </div>
    );
};

export default App;
```

📌 **Il grafico si aggiornerà in base ai dati API**.

---

## 📌 5️⃣ Avviare il Frontend

```sh
cd dashboard-frontend
npm start
```

📌 **L'app sarà accessibile su `http://localhost:3000`** 🚀

---

## 📌 6️⃣ Testare la Dashboard

1️⃣ Avviare il progetto con `npm start`  
2️⃣ Controllare il grafico con i valori dei mesi  
3️⃣ **Modificare `fetchDati()`** per simulare nuovi dati  
4️⃣ Il grafico si aggiornerà automaticamente!

---

## 📌 7️⃣ Riepilogo

|Passaggio|Azione|
|---|---|
|**1️⃣ Creare il progetto**|React + TypeScript|
|**2️⃣ Simulare dati API**|Funzione `fetchDati()`|
|**3️⃣ Creare il grafico**|Chart.js con `react-chartjs-2`|
|**4️⃣ Integrare nella Dashboard**|`App.tsx` con `ChartComponent`|
|**5️⃣ Avviare e testare**|`npm start` e aggiornamento dati|

---
