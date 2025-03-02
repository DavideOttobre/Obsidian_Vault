# 📌 Gestione Avanzata di Errori e Logging in TypeScript

## 🎯 Introduzione
Un sistema backend solido deve avere una **gestione avanzata degli errori** e un **logging efficace** per il debugging.  
In questa guida vedremo:
✅ **Middleware globale per errori**  
✅ **Logging con Winston**  
✅ **Gestione degli errori con classi personalizzate**  

---

## 📌 1️⃣ Installare Winston per il Logging
Winston è una libreria avanzata per gestire i log.

```sh
npm install winston
npm install --save-dev @types/winston
````

---

## 📌 2️⃣ Creare il Logger

Creiamo `src/utils/logger.ts`:

```ts
import winston from "winston";

const logger = winston.createLogger({
    level: "info",
    format: winston.format.combine(
        winston.format.timestamp(),
        winston.format.printf(({ timestamp, level, message }) => {
            return `${timestamp} [${level.toUpperCase()}]: ${message}`;
        })
    ),
    transports: [
        new winston.transports.Console(),
        new winston.transports.File({ filename: "logs/error.log", level: "error" }),
        new winston.transports.File({ filename: "logs/combined.log" })
    ]
});

export default logger;
```

📌 **Cosa fa Winston?**

- Registra log su console e file
- Separa i log di errori (`error.log`) da quelli normali (`combined.log`)
- Include timestamp nei log

---

## 📌 3️⃣ Creare un Middleware Globale per Errori

Creiamo `src/middleware/errorHandler.ts`:

```ts
import { Request, Response, NextFunction } from "express";
import logger from "../utils/logger";

export class ErrorePersonalizzato extends Error {
    statusCode: number;
    constructor(message: string, statusCode: number = 500) {
        super(message);
        this.statusCode = statusCode;
    }
}

export const errorHandler = (err: ErrorePersonalizzato, req: Request, res: Response, next: NextFunction) => {
    logger.error(`${req.method} ${req.url} - ${err.message}`);

    res.status(err.statusCode || 500).json({
        error: err.message || "Errore interno del server"
    });
};
```

📌 **Gestione avanzata degli errori**:

- `ErrorePersonalizzato` → Classe per errori con codice di stato
- `logger.error(...)` → Registra l'errore nei file di log
- **JSON response** → Unificata per tutti gli errori

---

## 📌 4️⃣ Usare il Middleware nel Server

Modifichiamo `src/server.ts`:

```ts
import { errorHandler } from "./middleware/errorHandler";

app.use(errorHandler); // Middleware di gestione errori
```

📌 **Ora tutti gli errori vengono registrati e gestiti automaticamente!** 🚀

---

## 📌 5️⃣ Generare un Errore Personalizzato in un Controller

Esempio in `src/controllers/utenteController.ts`:

```ts
import { Request, Response } from "express";
import { ErrorePersonalizzato } from "../middleware/errorHandler";
import Utente from "../models/Utente";

export const getUtenti = async (req: Request, res: Response) => {
    try {
        const utenti = await Utente.find();
        if (utenti.length === 0) {
            throw new ErrorePersonalizzato("Nessun utente trovato", 404);
        }
        res.json(utenti);
    } catch (err) {
        res.status(500).json({ error: "Errore nel recupero utenti" });
    }
};
```

📌 **Ora se non ci sono utenti, viene generato un errore `404` personalizzato**.

---

## 📌 6️⃣ Testare il Logging

### 🔹 **Avviare il server**

```sh
npx ts-node src/server.ts
```

### 🔹 **Test con errore**

Se chiamiamo un endpoint sbagliato:

```sh
curl http://localhost:3000/api/utente
```

📌 **Risultato atteso nel log (`logs/error.log`)**:

```
2024-03-02T10:00:00.123Z [ERROR]: GET /api/utente - Not Found
```

---

## 📌 7️⃣ Riepilogo

|Passaggio|Azione|
|---|---|
|**1️⃣ Installare Winston**|`npm install winston`|
|**2️⃣ Creare il logger**|`logger.ts` con console e file di log|
|**3️⃣ Creare un middleware per errori**|`errorHandler.ts`|
|**4️⃣ Usare il middleware nel server**|`app.use(errorHandler)`|
|**5️⃣ Generare errori personalizzati**|`throw new ErrorePersonalizzato("Errore", 404)`|
|**6️⃣ Testare il logging**|Controllare `logs/error.log`|

---
