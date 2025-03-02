# 📌 Creare un'Applicazione Frontend con React e TypeScript

## 🎯 Introduzione
React e TypeScript sono una combinazione potente per lo sviluppo frontend.  
In questa guida vedremo:
✅ **Setup di un progetto React con TypeScript**  
✅ **Creazione di componenti tipizzati**  
✅ **Gestione dello stato con useState e useReducer**  
✅ **Gestione delle chiamate API con useEffect**  

---

## 📌 1️⃣ Creare un Progetto React con TypeScript
Creiamo un nuovo progetto usando Vite (più veloce di Create React App):

```sh
npm create vite@latest my-app --template react-ts
cd my-app
npm install
````

📌 **Alternativa con Create React App**:

```sh
npx create-react-app my-app --template typescript
```

---

## 📌 2️⃣ Struttura della Cartella

```
my-app/
│── src/
│   ├── components/      # Componenti React
│   ├── pages/           # Pagine principali
│   ├── hooks/           # Custom Hooks
│   ├── types/           # Tipi e interfacce
│   ├── services/        # Chiamate API
│   ├── App.tsx          # Componente principale
│   ├── main.tsx         # Root della app
│── public/
│── package.json
│── tsconfig.json
```

📌 **Organizzare il codice migliora la manutenibilità!** 🚀

---

## 📌 3️⃣ Creare un Componente Tipizzato

Creiamo `src/components/Button.tsx`:

```tsx
import React from "react";

interface ButtonProps {
    label: string;
    onClick: () => void;
}

const Button: React.FC<ButtonProps> = ({ label, onClick }) => {
    return <button onClick={onClick} className="btn">{label}</button>;
};

export default Button;
```

📌 **Interfacce per le props** permettono di prevenire errori.

---

## 📌 4️⃣ Usare useState con TypeScript

Creiamo `src/components/Counter.tsx`:

```tsx
import React, { useState } from "react";

const Counter: React.FC = () => {
    const [count, setCount] = useState<number>(0);

    return (
        <div>
            <p>Contatore: {count}</p>
            <button onClick={() => setCount(count + 1)}>Incrementa</button>
        </div>
    );
};

export default Counter;
```

📌 `useState<number>` garantisce che lo stato sia sempre un numero.

---

## 📌 5️⃣ Gestire API con useEffect

Creiamo `src/services/api.ts`:

```ts
export interface User {
    id: number;
    name: string;
    email: string;
}

export const fetchUsers = async (): Promise<User[]> => {
    const response = await fetch("https://jsonplaceholder.typicode.com/users");
    return response.json();
};
```

Creiamo `src/components/UserList.tsx`:

```tsx
import React, { useEffect, useState } from "react";
import { fetchUsers, User } from "../services/api";

const UserList: React.FC = () => {
    const [users, setUsers] = useState<User[]>([]);
    const [loading, setLoading] = useState<boolean>(true);

    useEffect(() => {
        fetchUsers().then((data) => {
            setUsers(data);
            setLoading(false);
        });
    }, []);

    if (loading) return <p>Caricamento...</p>;

    return (
        <ul>
            {users.map((user) => (
                <li key={user.id}>{user.name} - {user.email}</li>
            ))}
        </ul>
    );
};

export default UserList;
```

📌 **Tipizzare i dati evita bug nelle chiamate API**.

---

## 📌 6️⃣ Creare il Layout Principale

Modifichiamo `src/App.tsx`:

```tsx
import React from "react";
import Counter from "./components/Counter";
import UserList from "./components/UserList";

const App: React.FC = () => {
    return (
        <div>
            <h1>React + TypeScript</h1>
            <Counter />
            <UserList />
        </div>
    );
};

export default App;
```

---

## 📌 7️⃣ Avviare l'Applicazione

```sh
npm run dev
```

📌 **L'app sarà disponibile su `http://localhost:5173`** 🚀

---

## 📌 Riepilogo

|Passaggio|Azione|
|---|---|
|**1️⃣ Creare il progetto**|`npm create vite@latest my-app --template react-ts`|
|**2️⃣ Organizzare la struttura**|`components/`, `services/`, `types/`|
|**3️⃣ Creare componenti tipizzati**|Button con interfacce|
|**4️⃣ Usare useState con TypeScript**|`useState<number>(0)`|
|**5️⃣ Chiamate API tipizzate**|`fetchUsers(): Promise<User[]>`|
|**6️⃣ Strutturare l'App**|Importare i componenti in `App.tsx`|
|**7️⃣ Avviare il server**|`npm run dev`|

---

## 📌 Prossimi Passaggi

👉 [Gestione dello Stato con Redux e TypeScript](https://chatgpt.com/c/07_Esempi_Pratici/07_Redux_TS)