# 📌 Utilizzo di Librerie di Terze Parti in TypeScript

## 🎯 Introduzione
TypeScript è compatibile con la maggior parte delle librerie JavaScript, ma alcune richiedono **tipi aggiuntivi** (`@types`).  
In questa guida vedremo:
✅ **Come installare librerie con TypeScript**  
✅ **Gestire tipi mancanti con `@types/*`**  
✅ **Creare tipi personalizzati per librerie senza supporto ufficiale**  

---

## 📌 1️⃣ Installare una Libreria con i Tipi
Molte librerie hanno supporto nativo per TypeScript.  
Esempio con **Axios** (client HTTP):

```sh
npm install axios
npm install --save-dev @types/axios
````

📌 `@types/axios` fornisce la definizione dei tipi per TypeScript.

---

## 📌 2️⃣ Usare una Libreria Tipizzata

Esempio di chiamata API con **Axios** in `src/services/api.ts`:

```ts
import axios from "axios";

export interface Post {
    userId: number;
    id: number;
    title: string;
    body: string;
}

export const fetchPosts = async (): Promise<Post[]> => {
    const response = await axios.get<Post[]>("https://jsonplaceholder.typicode.com/posts");
    return response.data;
};
```

📌 **Passiamo il tipo `Post[]` ad Axios per garantire dati corretti**.

---

## 📌 3️⃣ Librerie senza Supporto TypeScript (`@types/*`)

Se una libreria non ha i tipi ufficiali, possiamo cercarli con:

```sh
npm search @types/nome-libreria
```

Esempio per **Lodash**:

```sh
npm install lodash
npm install --save-dev @types/lodash
```

📌 **Lodash ha tipi disponibili nella community `@types/lodash`**.

---

## 📌 4️⃣ Creare Tipi per Librerie Senza Supporto

Se una libreria non ha tipi, possiamo creare un file **`d.ts`** personalizzato.

1️⃣ Creiamo `src/types/miaLibreria.d.ts`:

```ts
declare module "mia-libreria" {
    export function funzioneA(param: string): number;
}
```

2️⃣ Ora possiamo usare la libreria con tipi:

```ts
import { funzioneA } from "mia-libreria";
const risultato = funzioneA("test"); // ✅ TypeScript riconosce il tipo
```

📌 **Necessario se una libreria non ha dichiarazioni di tipo ufficiali**.

---

## 📌 5️⃣ Esempio di Librerie Comuni con TypeScript

|Libreria|Scopo|Installazione|
|---|---|---|
|Axios|Chiamate API|`npm install axios @types/axios`|
|Lodash|Utility per array e oggetti|`npm install lodash @types/lodash`|
|Moment.js|Manipolazione date|`npm install moment @types/moment`|
|React Hook Form|Gestione form|`npm install react-hook-form`|

📌 **Verificare sempre se una libreria ha il pacchetto `@types/*`**.

---

## 📌 6️⃣ Riepilogo

|Passaggio|Azione|
|---|---|
|**1️⃣ Installare una libreria con tipi**|`npm install axios @types/axios`|
|**2️⃣ Usare una libreria tipizzata**|`axios.get<Post[]>("URL")`|
|**3️⃣ Cercare tipi per librerie JavaScript**|`npm search @types/libreria`|
|**4️⃣ Creare tipi per librerie non supportate**|`declare module "mia-libreria"`|

---
