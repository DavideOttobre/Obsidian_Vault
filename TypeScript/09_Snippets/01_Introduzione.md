# 📌 Snippets Utili in TypeScript

## 🎯 Introduzione
Questa sezione contiene **snippet di codice riutilizzabili** per TypeScript, divisi per categorie:
✅ **Strutture dati comuni**  
✅ **Manipolazione array e oggetti**  
✅ **Gestione API e HTTP**  
✅ **Async/Await e Promises**  
✅ **Validazione e Formattazione**  
✅ **Utilità per React e Node.js**  

---

## 📌 Struttura della Cartella
```

09_Snippets/ 
│── 01_Tipi_Base/ # Tipizzazione e interfacce 
│── 02_Array_Oggetti/ # Manipolazione di array e oggetti 
│── 03_Promises_Async/ # Async/Await e Promises 
│── 04_HTTP_AJAX/ # Fetch API e Axios 
│── 05_Validazione/ # Validazione dati e formattazione 
│── 06_React_Helpers/ # Snippets per React con TypeScript 
│── 07_NodeJS_Helpers/ # Snippets per Node.js con TypeScript

````

📌 **Ogni cartella conterrà file markdown con snippet riutilizzabili.**

---

## 📌 1️⃣ Tipi Base (`01_Tipi_Base`)
### 🔹 **Interfacce e Tipizzazione Avanzata**
```ts
// Interfaccia base
interface Utente {
    id: number;
    nome: string;
    email: string;
    attivo?: boolean; // Opzionale
}

// Alias di tipo con Unione
type StatoUtente = "attivo" | "sospeso" | "disattivato";
````

### 🔹 **Type Guard**

```ts
function isString(val: unknown): val is string {
    return typeof val === "string";
}

if (isString("ciao")) {
    console.log("È una stringa");
}
```

---

## 📌 2️⃣ Array e Oggetti (`02_Array_Oggetti`)

### 🔹 **Mappare e Filtrare Array**

```ts
const utenti = [
    { id: 1, nome: "Alice" },
    { id: 2, nome: "Bob" }
];

// Estrarre solo i nomi
const nomi = utenti.map(u => u.nome);
```

### 🔹 **Ridurre un Array a un Valore**

```ts
const numeri = [10, 20, 30];
const somma = numeri.reduce((acc, n) => acc + n, 0); // 60
```

---

## 📌 3️⃣ Promises e Async/Await (`03_Promises_Async`)

### 🔹 **Utilizzare Async/Await con Try/Catch**

```ts
async function fetchData() {
    try {
        const response = await fetch("https://jsonplaceholder.typicode.com/todos/1");
        const data = await response.json();
        console.log(data);
    } catch (error) {
        console.error("Errore nel fetch", error);
    }
}
```

### 🔹 **Eseguire più Promises in parallelo**

```ts
const [data1, data2] = await Promise.all([
    fetch("https://api1.com").then(res => res.json()),
    fetch("https://api2.com").then(res => res.json())
]);
```

---

## 📌 4️⃣ HTTP e API (`04_HTTP_AJAX`)

### 🔹 **Effettuare una chiamata API con Axios**

```ts
import axios from "axios";

async function getDati() {
    const response = await axios.get("https://jsonplaceholder.typicode.com/posts");
    console.log(response.data);
}
```

### 🔹 **Inviare Dati con POST**

```ts
async function inviaDati() {
    const response = await axios.post("https://api.com/posts", {
        titolo: "Nuovo Post",
        contenuto: "Testo del post"
    });
    console.log(response.data);
}
```

---

## 📌 5️⃣ Validazione e Formattazione (`05_Validazione`)

### 🔹 **Validazione Email con Regex**

```ts
function validaEmail(email: string): boolean {
    return /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/.test(email);
}
```

### 🔹 **Formattazione di una Data**

```ts
import { format } from "date-fns";

const oggi = new Date();
console.log(format(oggi, "dd/MM/yyyy")); // 02/03/2025
```

---

## 📌 6️⃣ Helpers per React (`06_React_Helpers`)

### 🔹 **Hook Personalizzato per Gestire un Form**

```tsx
import { useState } from "react";

export function useForm<T>(initialState: T) {
    const [values, setValues] = useState<T>(initialState);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setValues({ ...values, [e.target.name]: e.target.value });
    };

    return { values, handleChange };
}
```

Utilizzo:

```tsx
const { values, handleChange } = useForm({ nome: "", email: "" });

<input name="nome" value={values.nome} onChange={handleChange} />
```

### 🔹 **Uso di useEffect per Chiamate API**

```tsx
import { useEffect, useState } from "react";
import axios from "axios";

const useFetch = (url: string) => {
    const [data, setData] = useState(null);

    useEffect(() => {
        axios.get(url).then(res => setData(res.data));
    }, [url]);

    return data;
};
```

---

## 📌 7️⃣ Helpers per Node.js (`07_NodeJS_Helpers`)

### 🔹 **Leggere un File con fs**

```ts
import fs from "fs";

const dati = fs.readFileSync("file.txt", "utf-8");
console.log(dati);
```

### 🔹 **Scrivere su un File**

```ts
fs.writeFileSync("output.txt", "Testo da scrivere");
```

### 🔹 **Creare un Server Express Base**

```ts
import express from "express";

const app = express();
const PORT = 3000;

app.get("/", (req, res) => {
    res.send("Ciao dal server!");
});

app.listen(PORT, () => {
    console.log(`Server in ascolto su http://localhost:${PORT}`);
});
```

---

## 📌 Riepilogo

|Categoria|Contenuto|
|---|---|
|**01_Tipi_Base**|Interfacce, Union types, Type Guards|
|**02_Array_Oggetti**|Manipolazione dati, mappatura e filtri|
|**03_Promises_Async**|Async/Await, Promise.all|
|**04_HTTP_AJAX**|Fetch API, Axios|
|**05_Validazione**|Regex, formattazione date|
|**06_React_Helpers**|Hook personalizzati, useEffect per API|
|**07_NodeJS_Helpers**|Lettura/scrittura file, Express|

---
