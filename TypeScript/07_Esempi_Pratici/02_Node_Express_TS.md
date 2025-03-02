# 📌 Creare un Backend con Express e TypeScript

## 🎯 Introduzione
In questa guida vedremo come costruire un **backend completo** con:
✅ **Express** per gestire le API  
✅ **TypeScript** per tipizzazione sicura  
✅ **MongoDB con Mongoose** per il database  
✅ **Validazione dei dati con Joi**  
✅ **Gestione degli errori e middleware personalizzati**  

---

## 📌 1️⃣ Installare le Dipendenze
Creiamo una cartella per il progetto e installiamo i pacchetti necessari.

```sh
mkdir backend-ts && cd backend-ts
npm init -y
npm install express mongoose cors dotenv joi
npm install --save-dev typescript ts-node @types/node @types/express @types/cors @types/mongoose @types/joi
````

📌 **Pacchetti principali**:

- `express` → Framework per API
- `mongoose` → ORM per MongoDB
- `joi` → Validazione dei dati
- `dotenv` → Gestione variabili d’ambiente

---

## 📌 2️⃣ Configurare TypeScript (`tsconfig.json`)

Inizializziamo TypeScript con:

```sh
npx tsc --init
```

Modifichiamo `tsconfig.json`:

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

📌 Questo permette di **compilare i file TypeScript** nella cartella `dist/`.

---

## 📌 3️⃣ Creare il Server Express

Creiamo `src/server.ts`:

```ts
import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import mongoose from "mongoose";
import utenteRoutes from "./routes/utenteRoutes";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(express.json());

// Rotte
app.use("/api/utenti", utenteRoutes);

// Connessione a MongoDB
mongoose.connect(process.env.MONGO_URI || "mongodb://localhost:27017/ts-api")
    .then(() => {
        console.log("Connesso a MongoDB");
        app.listen(PORT, () => {
            console.log(`Server in esecuzione su http://localhost:${PORT}`);
        });
    })
    .catch(err => console.error("Errore di connessione al DB:", err));
```

📌 **Connessione a MongoDB** con variabili d’ambiente in `.env`:

```
MONGO_URI=mongodb://localhost:27017/ts-api
```

---

## 📌 4️⃣ Creare il Modello Mongoose

Creiamo `src/models/Utente.ts` per gestire gli utenti nel database:

```ts
import mongoose from "mongoose";

interface IUtente {
    nome: string;
    email: string;
    password: string;
}

const utenteSchema = new mongoose.Schema<IUtente>({
    nome: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true }
});

const Utente = mongoose.model<IUtente>("Utente", utenteSchema);

export default Utente;
```

📌 **Tipizzazione del modello MongoDB con `IUtente`**.

---

## 📌 5️⃣ Creare le Rotte e il Controller

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
import Utente from "../models/Utente";
import Joi from "joi";

// Schema di validazione
const schemaUtente = Joi.object({
    nome: Joi.string().min(3).required(),
    email: Joi.string().email().required(),
    password: Joi.string().min(6).required()
});

export const getUtenti = async (req: Request, res: Response) => {
    try {
        const utenti = await Utente.find();
        res.json(utenti);
    } catch (err) {
        res.status(500).json({ error: "Errore nel recupero utenti" });
    }
};

export const creaUtente = async (req: Request, res: Response) => {
    try {
        // Validazione
        const { error } = schemaUtente.validate(req.body);
        if (error) return res.status(400).json({ error: error.details[0].message });

        const nuovoUtente = new Utente(req.body);
        await nuovoUtente.save();
        res.status(201).json(nuovoUtente);
    } catch (err) {
        res.status(500).json({ error: "Errore nella creazione dell'utente" });
    }
};
```

📌 **Validazione con Joi**:

- Nome con almeno **3 caratteri**
- Email valida
- Password con almeno **6 caratteri**

---

## 📌 6️⃣ Creare un Middleware di Errore

Creiamo `src/middleware/errorHandler.ts` per gestire gli errori globali:

```ts
import { Request, Response, NextFunction } from "express";

export const errorHandler = (err: any, req: Request, res: Response, next: NextFunction) => {
    console.error(err);
    res.status(500).json({ error: "Errore interno del server" });
};
```

Aggiorniamo `server.ts` per usare il middleware:

```ts
import { errorHandler } from "./middleware/errorHandler";
app.use(errorHandler);
```

📌 **Ora ogni errore verrà catturato e gestito in modo centralizzato**.

---

## 📌 7️⃣ Avviare il Server

Compiliamo TypeScript ed eseguiamo il server:

```sh
npx tsc
node dist/server.js
```

📌 **Oppure usiamo `ts-node` senza compilazione**:

```sh
npx ts-node src/server.ts
```

---

## 📌 8️⃣ Testare l'API

Possiamo testare l'API con **Postman** o **cURL**.

### 🔹 Test `GET /api/utenti`

```sh
curl http://localhost:3000/api/utenti
```

### 🔹 Test `POST /api/utenti`

```sh
curl -X POST http://localhost:3000/api/utenti -H "Content-Type: application/json" -d '{"nome": "Charlie", "email": "charlie@email.com", "password": "123456"}'
```

📌 **Risultato atteso (JSON)**:

```json
[
  { "id": "12345", "nome": "Alice", "email": "alice@email.com" },
  { "id": "67890", "nome": "Bob", "email": "bob@email.com" },
  { "id": "13579", "nome": "Charlie", "email": "charlie@email.com" }
]
```

---

## 📌 Riepilogo

|Passaggio|Azione|
|---|---|
|**1️⃣ Installare librerie**|`npm install express mongoose cors dotenv joi`|
|**2️⃣ Configurare TypeScript**|`npx tsc --init`|
|**3️⃣ Creare server Express**|`server.ts` con `app.listen()`|
|**4️⃣ Creare modello MongoDB**|`models/Utente.ts`|
|**5️⃣ Aggiungere rotte e controller**|`routes/` e `controllers/`|
|**6️⃣ Implementare middleware**|`middleware/errorHandler.ts`|
|**7️⃣ Avviare il server**|`npx ts-node src/server.ts`|

---
