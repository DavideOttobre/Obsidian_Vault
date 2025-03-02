# 📌 Progetto Chat in Tempo Reale con WebSocket e TypeScript

## 🎯 Introduzione
Creeremo una **chat in tempo reale** utilizzando:
✅ **Backend con WebSocket e TypeScript**  
✅ **Frontend in React con Socket.io**  
✅ **Gestione dei messaggi in tempo reale**  

---

## 📌 1️⃣ Creare il Backend con WebSocket
### 🔹 Installiamo le dipendenze
```sh
mkdir chat-backend && cd chat-backend
npm init -y
npm install express ws cors dotenv
npm install --save-dev typescript ts-node @types/node @types/ws @types/express @types/cors
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

## 📌 2️⃣ Creare il Server WebSocket

Creiamo `src/server.ts`:

```ts
import express from "express";
import { WebSocketServer } from "ws";
import cors from "cors";
import dotenv from "dotenv";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 4000;

app.use(cors());
app.use(express.json());

// Creiamo un WebSocket Server
const wss = new WebSocketServer({ port: 8080 });

wss.on("connection", (ws) => {
    console.log("Nuovo client connesso");

    ws.on("message", (message) => {
        console.log(`Messaggio ricevuto: ${message}`);

        // Invia il messaggio a tutti i client connessi
        wss.clients.forEach(client => {
            if (client !== ws && client.readyState === ws.OPEN) {
                client.send(message);
            }
        });
    });

    ws.on("close", () => console.log("Client disconnesso"));
});

app.listen(PORT, () => {
    console.log(`Server avviato su http://localhost:${PORT}`);
});
```

📌 **Ogni messaggio ricevuto viene inoltrato a tutti i client connessi**.

---

## 📌 3️⃣ Creare il Frontend con React e Socket.io

### 🔹 Installiamo le dipendenze

```sh
npx create-react-app chat-frontend --template typescript
cd chat-frontend
npm install socket.io-client
```

### 🔹 Creiamo il Servizio WebSocket

Creiamo `src/services/socket.ts`:

```ts
import { io } from "socket.io-client";

const socket = io("ws://localhost:8080");

export default socket;
```

📌 **Connessione al WebSocket Server**.

---

## 📌 4️⃣ Creare il Componente Chat

Creiamo `src/components/Chat.tsx`:

```tsx
import React, { useEffect, useState } from "react";
import socket from "../services/socket";

const Chat: React.FC = () => {
    const [messages, setMessages] = useState<string[]>([]);
    const [input, setInput] = useState("");

    useEffect(() => {
        socket.on("message", (message: string) => {
            setMessages((prev) => [...prev, message]);
        });

        return () => {
            socket.off("message");
        };
    }, []);

    const sendMessage = () => {
        if (input.trim() !== "") {
            socket.send(input);
            setInput("");
        }
    };

    return (
        <div>
            <h2>Chat in Tempo Reale</h2>
            <ul>
                {messages.map((msg, index) => (
                    <li key={index}>{msg}</li>
                ))}
            </ul>
            <input 
                type="text" 
                value={input} 
                onChange={(e) => setInput(e.target.value)} 
                placeholder="Scrivi un messaggio..."
            />
            <button onClick={sendMessage}>Invia</button>
        </div>
    );
};

export default Chat;
```

📌 **I messaggi vengono inviati e ricevuti in tempo reale**.

---

## 📌 5️⃣ Integrare la Chat nell'App

Modifichiamo `src/App.tsx`:

```tsx
import React from "react";
import Chat from "./components/Chat";

const App: React.FC = () => {
    return (
        <div>
            <h1>WebSocket Chat</h1>
            <Chat />
        </div>
    );
};

export default App;
```

---

## 📌 6️⃣ Avviare il Backend e il Frontend

### 🔹 Avviare il backend:

```sh
cd chat-backend
npx ts-node src/server.ts
```

### 🔹 Avviare il frontend:

```sh
cd chat-frontend
npm start
```

📌 **L'app sarà disponibile su `http://localhost:3000`** 🚀

---

## 📌 7️⃣ Testare la Chat

1️⃣ Aprire **due finestre del browser**  
2️⃣ Digitare un messaggio e premere **Invia**  
3️⃣ Il messaggio apparirà in entrambe le finestre!

📌 **Ora la chat funziona in tempo reale grazie a WebSocket!** 🎉

---

## 📌 8️⃣ Riepilogo

|Passaggio|Azione|
|---|---|
|**1️⃣ Creare il backend**|WebSocket con TypeScript|
|**2️⃣ Creare il server WebSocket**|`ws.on("message")` per inoltrare messaggi|
|**3️⃣ Creare il frontend**|React con socket.io-client|
|**4️⃣ Implementare la chat**|`useState`, `useEffect` e `socket.send()`|
|**5️⃣ Testare in tempo reale**|Aprire due finestre e scambiare messaggi|

---
