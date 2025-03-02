# 📌 Progetto CRUD: Gestione Utenti con TypeScript

## 🎯 Introduzione
In questa guida vedremo come creare un'applicazione **CRUD (Create, Read, Update, Delete)** per la gestione degli utenti con:
✅ **Frontend in React con TypeScript**  
✅ **Backend in Express con MongoDB**  
✅ **Autenticazione con JWT**  

---

## 📌 1️⃣ Creare il Backend con Express e TypeScript
### 🔹 Installiamo le dipendenze
```sh
mkdir backend && cd backend
npm init -y
npm install express mongoose cors dotenv jsonwebtoken bcryptjs
npm install --save-dev typescript ts-node @types/node @types/express @types/mongoose @types/cors @types/jsonwebtoken @types/bcryptjs
````

### 🔹 Configuriamo TypeScript

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

---

## 📌 2️⃣ Creare il Modello Utente

Creiamo `src/models/Utente.ts`:

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

📌 **MongoDB salverà gli utenti con email univoca.**

---

## 📌 3️⃣ Creare il Controller Utenti

Creiamo `src/controllers/utenteController.ts`:

```ts
import { Request, Response } from "express";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import Utente from "../models/Utente";

export const getUtenti = async (req: Request, res: Response) => {
    try {
        const utenti = await Utente.find();
        res.json(utenti);
    } catch (err) {
        res.status(500).json({ error: "Errore nel recupero utenti" });
    }
};

export const register = async (req: Request, res: Response) => {
    try {
        const { nome, email, password } = req.body;
        const salt = await bcrypt.genSalt(10);
        const passwordHash = await bcrypt.hash(password, salt);
        const nuovoUtente = new Utente({ nome, email, password: passwordHash });
        await nuovoUtente.save();
        res.status(201).json({ message: "Registrazione completata" });
    } catch (err) {
        res.status(500).json({ error: "Errore nella registrazione" });
    }
};

export const login = async (req: Request, res: Response) => {
    try {
        const { email, password } = req.body;
        const utente = await Utente.findOne({ email });
        if (!utente) return res.status(400).json({ error: "Credenziali errate" });

        const passwordValida = await bcrypt.compare(password, utente.password);
        if (!passwordValida) return res.status(400).json({ error: "Credenziali errate" });

        const token = jwt.sign({ id: utente._id }, process.env.JWT_SECRET || "default", {
            expiresIn: "1h"
        });

        res.json({ token });
    } catch (err) {
        res.status(500).json({ error: "Errore nel login" });
    }
};
```

📌 **Autenticazione con hashing password e JWT**.

---

## 📌 4️⃣ Creare il Router Utenti

Creiamo `src/routes/utenteRoutes.ts`:

```ts
import express from "express";
import { getUtenti, register, login } from "../controllers/utenteController";

const router = express.Router();

router.get("/", getUtenti);
router.post("/register", register);
router.post("/login", login);

export default router;
```

---

## 📌 5️⃣ Configurare il Server Express

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

app.use(cors());
app.use(express.json());
app.use("/api/utenti", utenteRoutes);

mongoose.connect(process.env.MONGO_URI || "mongodb://localhost:27017/ts-crud")
    .then(() => {
        console.log("Connesso a MongoDB");
        app.listen(PORT, () => {
            console.log(`Server su http://localhost:${PORT}`);
        });
    })
    .catch(err => console.error("Errore DB:", err));
```

---

## 📌 6️⃣ Creare il Frontend con React e TypeScript

### 🔹 Installiamo le dipendenze

```sh
npx create-react-app frontend --template typescript
cd frontend
npm install axios react-router-dom
```

### 🔹 Creiamo il Servizio API

Creiamo `src/services/api.ts`:

```ts
import axios from "axios";

export interface Utente {
    id: string;
    nome: string;
    email: string;
}

const API_URL = "http://localhost:3000/api/utenti";

export const fetchUtenti = async (): Promise<Utente[]> => {
    const response = await axios.get(API_URL);
    return response.data;
};
```

---

## 📌 7️⃣ Creare il Componente Lista Utenti

Creiamo `src/components/UserList.tsx`:

```tsx
import React, { useEffect, useState } from "react";
import { fetchUtenti, Utente } from "../services/api";

const UserList: React.FC = () => {
    const [utenti, setUtenti] = useState<Utente[]>([]);
    const [loading, setLoading] = useState<boolean>(true);

    useEffect(() => {
        fetchUtenti().then((data) => {
            setUtenti(data);
            setLoading(false);
        });
    }, []);

    if (loading) return <p>Caricamento...</p>;

    return (
        <ul>
            {utenti.map((user) => (
                <li key={user.id}>{user.nome} - {user.email}</li>
            ))}
        </ul>
    );
};

export default UserList;
```

---

## 📌 8️⃣ Creare la Pagina Principale

Modifichiamo `src/App.tsx`:

```tsx
import React from "react";
import UserList from "./components/UserList";

const App: React.FC = () => {
    return (
        <div>
            <h1>Gestione Utenti</h1>
            <UserList />
        </div>
    );
};

export default App;
```

---

## 📌 9️⃣ Avviare il Backend e il Frontend

### 🔹 Avviare il backend:

```sh
cd backend
npx ts-node src/server.ts
```

### 🔹 Avviare il frontend:

```sh
cd frontend
npm start
```

📌 **L'applicazione sarà accessibile su `http://localhost:3000`** 🚀

---

## 📌 🔟 Riepilogo

|Passaggio|Azione|
|---|---|
|**1️⃣ Creare il backend**|Express + MongoDB con TypeScript|
|**2️⃣ Definire il modello Utente**|Mongoose Schema|
|**3️⃣ Creare API per CRUD utenti**|Controller e router|
|**4️⃣ Configurare il server**|Express con `dotenv` e `cors`|
|**5️⃣ Creare il frontend**|React con Axios|
|**6️⃣ Implementare la UI**|Lista utenti con `useEffect`|

---
