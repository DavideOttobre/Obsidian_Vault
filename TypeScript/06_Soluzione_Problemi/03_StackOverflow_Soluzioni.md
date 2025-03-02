# 📌 Soluzioni ai Problemi Comuni in TypeScript

## 🎯 Introduzione
TypeScript può generare errori difficili da interpretare, ma molte soluzioni sono già state trovate dalla community.  
In questa guida vedremo:
✅ **Soluzioni per gli errori più comuni**  
✅ **Come interpretare i messaggi di errore**  
✅ **Risorse utili (Stack Overflow, GitHub, MDN, TypeScript Handbook)**  

---

## 📌 1️⃣ Errore: `Cannot find module 'X' or its corresponding type declarations`
### 🔹 Problema
```ts
import express from "express"; // ❌ Errore: modulo non trovato
````

### 🔹 Soluzione

```sh
npm install express
npm install --save-dev @types/express
```

📌 **Alcune librerie JavaScript richiedono pacchetti di tipi separati (`@types/*`)**.

---

## 📌 2️⃣ Errore: `Type 'undefined' is not assignable to type 'X'`

### 🔹 Problema

```ts
let nome: string;
console.log(nome.length); // ❌ Errore: nome potrebbe essere undefined
```

### 🔹 Soluzione

```ts
let nome: string | undefined;
if (nome) {
    console.log(nome.length); // ✅ Ora TypeScript sa che `nome` non è undefined
}
```

📌 **Sempre controllare `undefined` prima di accedere alle proprietà**.

---

## 📌 3️⃣ Errore: `Type 'X' is missing the following properties from type 'Y'`

### 🔹 Problema

```ts
interface Persona {
    nome: string;
    età: number;
}

const p: Persona = { nome: "Alice" }; // ❌ Errore: manca `età`
```

### 🔹 Soluzione

```ts
const p: Persona = { nome: "Alice", età: 25 }; // ✅ Tutte le proprietà sono presenti
```

📌 **Le interfacce richiedono tutte le proprietà dichiarate, a meno che non siano opzionali (`?`)**.

---

## 📌 4️⃣ Errore: `Type 'any' is not assignable to type 'X'`

### 🔹 Problema

```ts
function somma(a: any, b: any): number {
    return a + b; // ❌ TypeScript non può verificare i tipi
}
```

### 🔹 Soluzione

```ts
function somma(a: number, b: number): number {
    return a + b; // ✅ Ora i tipi sono sicuri
}
```

📌 **Evitare `any`, usare tipi specifici per maggiore sicurezza**.

---

## 📌 5️⃣ Errore: `Argument of type 'X' is not assignable to parameter of type 'Y'`

### 🔹 Problema

```ts
function stampaMessaggio(msg: string) {
    console.log(msg);
}

stampaMessaggio(123); // ❌ Errore: atteso `string`, ricevuto `number`
```

### 🔹 Soluzione

```ts
stampaMessaggio("Ciao!"); // ✅ Ora il tipo è corretto
```

📌 **Assicurarsi di passare il tipo giusto ai parametri di funzione**.

---

## 📌 6️⃣ Risorse Utili per Risolvere Problemi

Se un errore persiste, possiamo cercare soluzioni in fonti affidabili:

### 🔹 **Stack Overflow**

🔗 [https://stackoverflow.com/questions/tagged/typescript](https://stackoverflow.com/questions/tagged/typescript)  
📌 **Ricerca rapida**: `"TypeScript errore Cannot find module"`

### 🔹 **GitHub Issues**

🔗 [https://github.com/microsoft/TypeScript/issues](https://github.com/microsoft/TypeScript/issues)  
📌 **Controllare problemi noti e bug segnalati**.

### 🔹 **TypeScript Handbook (Documentazione Ufficiale)**

🔗 [https://www.typescriptlang.org/docs/](https://www.typescriptlang.org/docs/)  
📌 **Guida ufficiale su sintassi, configurazione e best practice**.

### 🔹 **MDN Web Docs (per JavaScript e compatibilità)**

🔗 [https://developer.mozilla.org/](https://developer.mozilla.org/)  
📌 **Utile per capire il comportamento di JavaScript in TypeScript**.

---

## 📌 Riepilogo

|Errore|Soluzione|
|---|---|
|`Cannot find module 'X'`|Installare `@types/X` o aggiungere la libreria|
|`undefined is not assignable`|Usare `if (valore !== undefined)` prima di accedere|
|`Type 'X' is missing properties`|Aggiungere tutte le proprietà richieste da un'interfaccia|
|`Type 'any' is not assignable`|Evitare `any`, usare tipi specifici|
|`Argument of type 'X' is not assignable`|Controllare che i parametri delle funzioni abbiano il tipo giusto|

---
