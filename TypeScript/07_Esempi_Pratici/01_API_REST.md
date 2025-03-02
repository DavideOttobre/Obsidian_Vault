# 📌 Esempi Pratici: Creare un'API REST con TypeScript

## 🎯 Introduzione
TypeScript è molto usato per creare **API REST scalabili**.  
In questa guida vedremo:
✅ **Setup di un server Express con TypeScript**  
✅ **Gestione delle richieste HTTP**  
✅ **Middleware e validazione dei dati**  
✅ **Tipizzazione avanzata per le risposte API**  

---

## 📌 1️⃣ Installare le Dipendenze
Creiamo un nuovo progetto e installiamo le librerie necessarie.

```sh
mkdir api-ts && cd api-ts
npm init -y
npm install express cors dotenv
npm install --save-dev typescript ts-node @types/node @types/express
````

📌 **Pacchetti importanti**:

- `express` → Server web
- `cors` → Permette richieste da domini esterni
- `dotenv` → Per caricare variabili d'ambiente
- `ts-node` → Esegue TypeScript senza compilare

---

## 📌 2️⃣ Configurare TypeScript (`tsconfig.json`)

Creiamo il file di configurazione con:

```sh
npx tsc --init
```

Modifichiamo alcune impostazioni per l'API:

```json
{
  "compilerOptions": {
    "target": "ES6",
    "module": "CommonJS",
    "outDir": "./dist",
    "rootDir": "./src",
    "strict": true
  },
  "include": ["src"],
  "exclude": ["node_modules"]
}
```

📌 Questo assicura che i file TypeScript siano compilati nella cartella `dist/`.

---

## 📌 3️⃣ Creare il Server Express

Creiamo il file `src/server.ts` e scriviamo il codice base per avviare il server.

```ts
import express from "express";
import cors from "cors";
import dotenv from "dotenv";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
    res.send("API TypeScript funzionante!");
});

app.listen(PORT, () => {
    console.log(`Server avviato su http://localhost:${PORT}`);
});
```

📌 **Middleware inclusi**:

- `cors()` per abilitare richieste da altri domini
- `express.json()` per gestire richieste con JSON

---

## 📌 4️⃣ Creare un Router e un Controller

Dividiamo la logica dell'API in più file per mantenere il codice pulito.

### 🔹 Creiamo `src/routes/utenteRoutes.ts`

```ts
import express from "express";
import { getUtenti, creaUtente } from "../controllers/utenteController";

const router = express.Router();

router.get("/", getUtenti);
router.post("/", creaUtente);

export default router;
```

### 🔹 Creiamo `src/controllers/utenteController.ts`

```ts
import { Request, Response } from "express";

interface Utente {
    id: number;
    nome: string;
    email: string;
}

const utenti: Utente[] = [
    { id: 1, nome: "Alice", email: "alice@email.com" },
    { id: 2, nome: "Bob", email: "bob@email.com" }
];

export const getUtenti = (req: Request, res: Response) => {
    res.json(utenti);
};

export const creaUtente = (req: Request, res: Response) => {
    const nuovoUtente: Utente = req.body;
    nuovoUtente.id = utenti.length + 1;
    utenti.push(nuovoUtente);
    res.status(201).json(nuovoUtente);
};
```

📌 **Tipizzazione avanzata**:

- `Request` e `Response` da Express
- **Interfaccia `Utente`** per garantire dati coerenti

---

## 📌 5️⃣ Collegare il Router al Server

Modifichiamo `server.ts` per usare le rotte degli utenti.

```ts
import utenteRoutes from "./routes/utenteRoutes";

app.use("/api/utenti", utenteRoutes);
```

Ora l'API ha due endpoint:

- `GET /api/utenti` → Ottiene la lista utenti
- `POST /api/utenti` → Aggiunge un nuovo utente

---

## 📌 6️⃣ Avviare il Server

Compiliamo TypeScript ed eseguiamo il server:

```sh
npx tsc
node dist/server.js
```

📌 **Alternativa**: usare `ts-node` senza compilare:

```sh
npx ts-node src/server.ts
```

---

## 📌 7️⃣ Testare l'API

Possiamo testare l'API con **Postman** o **cURL**.

### 🔹 Test `GET /api/utenti`

```sh
curl http://localhost:3000/api/utenti
```

### 🔹 Test `POST /api/utenti`

```sh
curl -X POST http://localhost:3000/api/utenti -H "Content-Type: application/json" -d '{"nome": "Charlie", "email": "charlie@email.com"}'
```

📌 **Risultato atteso (JSON)**:

```json
[
  { "id": 1, "nome": "Alice", "email": "alice@email.com" },
  { "id": 2, "nome": "Bob", "email": "bob@email.com" },
  { "id": 3, "nome": "Charlie", "email": "charlie@email.com" }
]
```

---

## 📌 Riepilogo

|Passaggio|Azione|
|---|---|
|**1️⃣ Installare librerie**|`npm install express cors dotenv`|
|**2️⃣ Configurare TypeScript**|`npx tsc --init`|
|**3️⃣ Creare server Express**|`server.ts` con `app.listen()`|
|**4️⃣ Aggiungere router e controller**|`routes/` e `controllers/`|
|**5️⃣ Avviare il server**|`npx ts-node src/server.ts`|

---
