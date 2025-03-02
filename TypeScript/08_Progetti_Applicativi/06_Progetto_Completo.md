# 📌 Progetto Completo: Full Stack con React, Express e TypeScript

## 🎯 Introduzione
In questa guida creeremo un'applicazione completa **Full Stack** con:
✅ **Frontend in React con TypeScript**  
✅ **Backend in Express con TypeScript**  
✅ **Database PostgreSQL con Prisma**  
✅ **Autenticazione JWT**  

---

## 📌 1️⃣ Creare il Backend con Express e Prisma
### 🔹 Installiamo le dipendenze
```sh
mkdir backend && cd backend
npm init -y
npm install express cors dotenv jsonwebtoken bcryptjs prisma @prisma/client
npm install --save-dev typescript ts-node @types/node @types/express @types/cors @types/jsonwebtoken @types/bcryptjs
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

## 📌 2️⃣ Configurare Prisma e PostgreSQL

### 🔹 Inizializziamo Prisma

```sh
npx prisma init
```

Aggiorniamo `.env`:

```
DATABASE_URL="postgresql://user:password@localhost:5432/fullstack"
JWT_SECRET="supersegreto"
```

### 🔹 Definiamo il modello utente in `prisma/schema.prisma`

```prisma
model User {
  id       String @id @default(uuid())
  name     String
  email    String @unique
  password String
}
```

### 🔹 Creiamo il database

```sh
npx prisma migrate dev --name init
```

---

## 📌 3️⃣ Creare il Modello e il Controller

Creiamo `src/controllers/authController.ts`:

```ts
import { Request, Response } from "express";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export const register = async (req: Request, res: Response) => {
    try {
        const { name, email, password } = req.body;
        const hashedPassword = await bcrypt.hash(password, 10);
        const user = await prisma.user.create({
            data: { name, email, password: hashedPassword },
        });
        res.status(201).json({ message: "Registrazione riuscita" });
    } catch (err) {
        res.status(500).json({ error: "Errore nella registrazione" });
    }
};

export const login = async (req: Request, res: Response) => {
    try {
        const { email, password } = req.body;
        const user = await prisma.user.findUnique({ where: { email } });
        if (!user || !(await bcrypt.compare(password, user.password))) {
            return res.status(401).json({ error: "Credenziali non valide" });
        }

        const token = jwt.sign({ userId: user.id }, process.env.JWT_SECRET || "default", { expiresIn: "1h" });
        res.json({ token });
    } catch (err) {
        res.status(500).json({ error: "Errore nel login" });
    }
};
```

📌 **Gestisce registrazione e login con password hashata.**

---

## 📌 4️⃣ Creare le Rotte e il Middleware JWT

Creiamo `src/middleware/authMiddleware.ts`:

```ts
import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";

export const verificaToken = (req: Request, res: Response, next: NextFunction) => {
    const token = req.header("Authorization")?.split(" ")[1];
    if (!token) return res.status(401).json({ error: "Accesso negato" });

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET || "default");
        req.body.userId = (decoded as { userId: string }).userId;
        next();
    } catch (err) {
        res.status(401).json({ error: "Token non valido" });
    }
};
```

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

## 📌 5️⃣ Configurare il Server Express

Creiamo `src/server.ts`:

```ts
import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import authRoutes from "./routes/authRoutes";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 4000;

app.use(cors());
app.use(express.json());
app.use("/api/auth", authRoutes);

app.listen(PORT, () => console.log(`Server avviato su http://localhost:${PORT}`));
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

Creiamo `src/services/authService.ts`:

```ts
import axios from "axios";

const API_URL = "http://localhost:4000/api/auth";

export const register = async (name: string, email: string, password: string) => {
    return axios.post(`${API_URL}/register`, { name, email, password });
};

export const login = async (email: string, password: string) => {
    return axios.post(`${API_URL}/login`, { email, password });
};
```

---

## 📌 7️⃣ Creare il Form di Autenticazione

Creiamo `src/components/AuthForm.tsx`:

```tsx
import React, { useState } from "react";
import { register, login } from "../services/authService";

const AuthForm: React.FC = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [name, setName] = useState("");
    const [isLogin, setIsLogin] = useState(true);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (isLogin) {
            await login(email, password);
        } else {
            await register(name, email, password);
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            {!isLogin && <input type="text" placeholder="Nome" value={name} onChange={(e) => setName(e.target.value)} />}
            <input type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} />
            <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} />
            <button type="submit">{isLogin ? "Login" : "Registrati"}</button>
            <button type="button" onClick={() => setIsLogin(!isLogin)}>
                {isLogin ? "Passa alla Registrazione" : "Passa al Login"}
            </button>
        </form>
    );
};

export default AuthForm;
```

---

## 📌 8️⃣ Integrare il Form nell'App

Modifichiamo `src/App.tsx`:

```tsx
import React from "react";
import AuthForm from "./components/AuthForm";

const App: React.FC = () => {
    return (
        <div>
            <h1>Autenticazione Full Stack</h1>
            <AuthForm />
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

📌 **L'app sarà disponibile su `http://localhost:3000`** 🚀

---

## 📌 🔟 Riepilogo

|Passaggio|Azione|
|---|---|
|**1️⃣ Creare il backend**|Express + Prisma + JWT|
|**2️⃣ Definire il database**|PostgreSQL con Prisma|
|**3️⃣ Creare il frontend**|React con Axios|
|**4️⃣ Implementare autenticazione**|Login/Register con JWT|
|**5️⃣ Testare l'applicazione**|Login, registrazione e protezione API|

---