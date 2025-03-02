# 📌 Autenticazione JWT con TypeScript

## 🎯 Introduzione
JSON Web Token (JWT) permette di gestire l'autenticazione in modo sicuro.  
In questa guida vedremo:
✅ **Creazione e validazione di JWT**  
✅ **Hashing delle password con bcrypt**  
✅ **Middleware di autenticazione**  
✅ **Login e protezione delle API**  

---

## 📌 1️⃣ Installare le Dipendenze
```sh
npm install jsonwebtoken bcryptjs
npm install --save-dev @types/jsonwebtoken @types/bcryptjs
````

📌 **Librerie principali**:

- `jsonwebtoken` → Genera e verifica JWT
- `bcryptjs` → Hash delle password
- `@types/*` → Tipi TypeScript per le librerie

---

## 📌 2️⃣ Configurare le Variabili d'Ambiente

Modifichiamo il file `.env`:

```
JWT_SECRET=supersegreto
JWT_EXPIRES=1h
```

---

## 📌 3️⃣ Creare il Controller di Autenticazione

Creiamo `src/controllers/authController.ts` per gestire login e registrazione:

```ts
import { Request, Response } from "express";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import Utente from "../models/Utente";

export const register = async (req: Request, res: Response) => {
    try {
        const { nome, email, password } = req.body;

        // Hash della password
        const salt = await bcrypt.genSalt(10);
        const passwordHash = await bcrypt.hash(password, salt);

        // Creazione utente
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

        // Controllo se l'utente esiste
        const utente = await Utente.findOne({ email });
        if (!utente) return res.status(400).json({ error: "Credenziali errate" });

        // Verifica password
        const passwordValida = await bcrypt.compare(password, utente.password);
        if (!passwordValida) return res.status(400).json({ error: "Credenziali errate" });

        // Creazione JWT
        const token = jwt.sign({ id: utente._id }, process.env.JWT_SECRET || "default", {
            expiresIn: process.env.JWT_EXPIRES || "1h"
        });

        res.json({ token });
    } catch (err) {
        res.status(500).json({ error: "Errore nel login" });
    }
};
```

📌 **Processo di autenticazione**: 1️⃣ **Registra un utente** con password hashata  
2️⃣ **Verifica email e password nel login**  
3️⃣ **Genera un token JWT** valido per 1 ora

---

## 📌 4️⃣ Creare il Middleware di Autenticazione

Creiamo `src/middleware/authMiddleware.ts`:

```ts
import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";

interface DecodedToken {
    id: string;
}

export const verificaToken = (req: Request, res: Response, next: NextFunction) => {
    const token = req.header("Authorization")?.split(" ")[1];
    if (!token) return res.status(401).json({ error: "Accesso negato" });

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET || "default") as DecodedToken;
        req.body.userId = decoded.id;
        next();
    } catch (err) {
        res.status(401).json({ error: "Token non valido" });
    }
};
```

📌 **Protegge le API** verificando il token prima di eseguire le richieste.

---

## 📌 5️⃣ Creare le Rotte di Autenticazione

Creiamo `src/routes/authRoutes.ts`:

```ts
import express from "express";
import { register, login } from "../controllers/authController";

const router = express.Router();

router.post("/register", register);
router.post("/login", login);

export default router;
```

---

## 📌 6️⃣ Proteggere una Rotta con JWT

Aggiorniamo `src/routes/utenteRoutes.ts`:

```ts
import express from "express";
import { getUtenti } from "../controllers/utenteController";
import { verificaToken } from "../middleware/authMiddleware";

const router = express.Router();

router.get("/", verificaToken, getUtenti); // Rotta protetta

export default router;
```

📌 **Ora solo gli utenti autenticati possono accedere agli utenti**.

---

## 📌 7️⃣ Collegare le Rotte al Server

Modifichiamo `src/server.ts`:

```ts
import authRoutes from "./routes/authRoutes";

app.use("/api/auth", authRoutes);
```

---

## 📌 8️⃣ Testare l'Autenticazione

### 🔹 **Registrazione (POST `/api/auth/register`)**

```sh
curl -X POST http://localhost:3000/api/auth/register -H "Content-Type: application/json" -d '{"nome": "Alice", "email": "alice@email.com", "password": "123456"}'
```

### 🔹 **Login (POST `/api/auth/login`)**

```sh
curl -X POST http://localhost:3000/api/auth/login -H "Content-Type: application/json" -d '{"email": "alice@email.com", "password": "123456"}'
```

📌 **Risultato atteso**:

```json
{ "token": "eyJhbGciOi..." }
```

### 🔹 **Accesso alle API Protette (GET `/api/utenti`)**

```sh
curl -H "Authorization: Bearer TOKEN" http://localhost:3000/api/utenti
```

📌 **Ora solo chi ha un token valido può accedere!** 🚀

---

## 📌 Riepilogo

|Passaggio|Azione|
|---|---|
|**1️⃣ Installare librerie**|`npm install jsonwebtoken bcryptjs`|
|**2️⃣ Configurare variabili d'ambiente**|`JWT_SECRET` e `JWT_EXPIRES` in `.env`|
|**3️⃣ Creare controller per login/register**|`authController.ts`|
|**4️⃣ Creare middleware di autenticazione**|`authMiddleware.ts`|
|**5️⃣ Aggiungere rotte di autenticazione**|`authRoutes.ts`|
|**6️⃣ Proteggere API con verifica JWT**|`verificaToken` su `utenteRoutes.ts`|
|**7️⃣ Testare con Postman o cURL**|Login, registrazione e accesso API|

---
