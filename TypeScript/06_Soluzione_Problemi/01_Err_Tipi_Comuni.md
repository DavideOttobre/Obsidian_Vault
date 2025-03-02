# 📌 Errori Comuni e Debugging in TypeScript

## 🎯 Introduzione
TypeScript aiuta a prevenire errori, ma può generare messaggi di errore complessi.  
In questa guida vedremo:
✅ **Errori comuni** e come risolverli  
✅ **Debugging efficace** con strumenti integrati  
✅ **Migliori pratiche per evitare bug**  

---

## 📌 1️⃣ Errore: `Type 'X' is not assignable to type 'Y'`
### 🔹 Problema
```ts
let nome: string = 123; // ❌ Errore: numero assegnato a una stringa
````

### 🔹 Soluzione

```ts
let nome: string = "Alice"; // ✅ Corretto
```

📌 **Verificare sempre i tipi assegnati alle variabili**.

---

## 📌 2️⃣ Errore: `Object is possibly 'null'`

### 🔹 Problema

```ts
function stampaLunghezza(str: string | null) {
    console.log(str.length); // ❌ Errore: str potrebbe essere null
}
```

### 🔹 Soluzione

```ts
function stampaLunghezza(str: string | null) {
    if (str !== null) {
        console.log(str.length); // ✅ Ora TypeScript sa che `str` è valido
    }
}
```

📌 **Usare controlli su `null` e `undefined` per evitare crash**.

---

## 📌 3️⃣ Errore: `Property 'X' does not exist on type 'Y'`

### 🔹 Problema

```ts
const persona = { nome: "Alice" };
console.log(persona.età); // ❌ Errore: `età` non esiste
```

### 🔹 Soluzione

```ts
const persona: { nome: string; età?: number } = { nome: "Alice" };
console.log(persona.età ?? "Età non disponibile"); // ✅ Usa `??` per valori mancanti
```

📌 **Dichiarare esplicitamente tutte le proprietà di un oggetto**.

---

## 📌 4️⃣ Errore: `Function lacks ending return statement`

### 🔹 Problema

```ts
function ottieniNumero(): number {
    if (Math.random() > 0.5) {
        return 10;
    } // ❌ Errore: TypeScript richiede sempre un valore di ritorno
}
```

### 🔹 Soluzione

```ts
function ottieniNumero(): number {
    if (Math.random() > 0.5) {
        return 10;
    }
    return 0; // ✅ Ora tutti i percorsi ritornano un numero
}
```

📌 **Assicurarsi che tutte le funzioni restituiscano sempre un valore del tipo dichiarato**.

---

## 📌 5️⃣ Errore: `Cannot redeclare block-scoped variable`

### 🔹 Problema

```ts
let nome = "Alice";
let nome = "Bob"; // ❌ Errore: `nome` è già dichiarato
```

### 🔹 Soluzione

```ts
let nome = "Alice";
nome = "Bob"; // ✅ Assegnare invece di ridefinire
```

📌 **Usare `let` e `const` correttamente per evitare ridichiarazioni**.

---

## 📌 6️⃣ Debugging con TypeScript

### 🔹 1️⃣ Abilitare la generazione delle mappe di debug

Nel file `tsconfig.json`, aggiungere:

```json
{
  "compilerOptions": {
    "sourceMap": true
  }
}
```

📌 **Permette di fare debug direttamente nei file TypeScript dentro Chrome/Node.js**.

### 🔹 2️⃣ Debug con Node.js

```sh
node --inspect-brk dist/index.js
```

📌 **Apre la modalità di debug in Chrome DevTools**.

### 🔹 3️⃣ Debug con VS Code

1️⃣ **Aggiungere una configurazione** in `.vscode/launch.json`

```json
{
  "version": "0.2.0",
  "configurations": [
    {
      "type": "node",
      "request": "launch",
      "name": "Debug TS",
      "program": "${workspaceFolder}/dist/index.js",
      "preLaunchTask": "tsc: build - tsconfig.json",
      "outFiles": ["${workspaceFolder}/dist/**/*.js"]
    }
  ]
}
```

2️⃣ **Impostare un breakpoint in un file `.ts`**  
3️⃣ **Avviare il debug con F5**

📌 **Ora possiamo eseguire TypeScript in modalità debug con VS Code**.

---

## 📌 7️⃣ Migliori Pratiche per Evitare Errori

✅ **Usare `strict: true` in `tsconfig.json`**  
✅ **Evitare `any` e preferire `unknown`**  
✅ **Usare `??` (nullish coalescing) per valori opzionali**  
✅ **Attivare ESLint per verificare errori automaticamente**

---

## 📌 Riepilogo

|Errore|Causa|Soluzione|
|---|---|---|
|`Type 'X' is not assignable to 'Y'`|Tipo errato assegnato|Verificare la tipizzazione|
|`Object is possibly 'null'`|`null` non gestito|Usare `if (obj !== null)`|
|`Property 'X' does not exist`|Proprietà mancante|Dichiarare esplicitamente gli oggetti|
|`Function lacks return`|Funzione non restituisce un valore|Aggiungere `return` in tutti i percorsi|
|`Cannot redeclare variable`|Variabile già dichiarata|Usare `let` e `const` correttamente|

---
