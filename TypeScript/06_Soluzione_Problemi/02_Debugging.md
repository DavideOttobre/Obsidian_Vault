# 📌 Debugging e Gestione degli Errori in TypeScript

## 🎯 Introduzione
Il debugging in TypeScript può essere reso più efficace utilizzando strumenti avanzati.  
In questa guida vedremo:
✅ **Strumenti per il debugging** (VS Code, Chrome DevTools, Node.js)  
✅ **Gestione degli errori con `try/catch` e `Error`**  
✅ **Debugging con `console.log`, breakpoints e `debugger`**  

---

## 📌 1️⃣ Debugging con `console.log`
Uno dei metodi più semplici per il debugging è usare **`console.log()`**.

```ts
function somma(a: number, b: number): number {
    console.log(`Ricevuti: ${a}, ${b}`); // Debugging con log
    return a + b;
}

console.log(somma(5, 3)); // "Ricevuti: 5, 3"
````

📌 **Pro**: Facile e veloce  
📌 **Contro**: Poco scalabile per progetti grandi

---

## 📌 2️⃣ Usare `debugger` e Breakpoints

`debugger` permette di fermare l'esecuzione e ispezionare il codice.

```ts
function moltiplica(a: number, b: number): number {
    debugger; // Il codice si ferma qui
    return a * b;
}

console.log(moltiplica(4, 2)); 
```

📌 **VS Code e Chrome DevTools permettono di ispezionare le variabili in tempo reale**.

---

## 📌 3️⃣ Debugging con VS Code

### 🔹 1️⃣ Creare una configurazione per il debugging

In **VS Code**, aprire `.vscode/launch.json` e aggiungere:

```json
{
  "version": "0.2.0",
  "configurations": [
    {
      "type": "node",
      "request": "launch",
      "name": "Debug TypeScript",
      "program": "${workspaceFolder}/dist/index.js",
      "preLaunchTask": "tsc: build - tsconfig.json",
      "outFiles": ["${workspaceFolder}/dist/**/*.js"]
    }
  ]
}
```

### 🔹 2️⃣ Impostare un breakpoint

1️⃣ Aprire un file **`.ts`** in VS Code  
2️⃣ Cliccare sul margine sinistro per impostare un **punto di interruzione**  
3️⃣ Premere **F5** per avviare il debugging

📌 **Ora il codice si fermerà nei punti selezionati e sarà possibile analizzare le variabili**.

---

## 📌 4️⃣ Debugging con Chrome DevTools

1️⃣ **Compilare TypeScript con Source Maps attivati**  
Aggiornare `tsconfig.json`:

```json
{
  "compilerOptions": {
    "sourceMap": true
  }
}
```

2️⃣ **Compilare e aprire il file in Chrome**

```sh
npx tsc
node --inspect-brk dist/index.js
```

3️⃣ **Aprire Chrome e andare su `chrome://inspect`**  
4️⃣ **Cliccare su "Open dedicated DevTools for Node"**

📌 **Ora possiamo eseguire il debug direttamente nel browser!** 🚀

---

## 📌 5️⃣ Gestione degli Errori con `try/catch`

### 🔹 Esempio base di `try/catch`

```ts
function dividi(a: number, b: number): number {
    if (b === 0) {
        throw new Error("Divisione per zero non consentita");
    }
    return a / b;
}

try {
    console.log(dividi(10, 0)); // ❌ Errore
} catch (errore) {
    console.error("Errore:", errore.message);
}
```

📌 **`try/catch` impedisce che l'errore blocchi l'intero programma**.

---

## 📌 6️⃣ Creare Errori Personalizzati

Possiamo definire errori più dettagliati creando classi personalizzate.

```ts
class ErrorePersonalizzato extends Error {
    constructor(messaggio: string) {
        super(messaggio);
        this.name = "ErrorePersonalizzato";
    }
}

try {
    throw new ErrorePersonalizzato("Qualcosa è andato storto!");
} catch (errore) {
    console.error(`${errore.name}: ${errore.message}`);
}
```

📌 **Le classi di errore personalizzate migliorano la gestione delle eccezioni**.

---

## 📌 7️⃣ Migliori Pratiche per il Debugging

✅ **Usare `console.log()` con valori significativi**  
✅ **Impostare breakpoints in VS Code per debug più efficace**  
✅ **Abilitare le Source Maps (`sourceMap: true`) per debugging nei browser**  
✅ **Gestire gli errori con `try/catch` invece di lasciare crashare il codice**  
✅ **Creare classi personalizzate per errori complessi**

---

## 📌 Riepilogo

|Tecnica|Uso|Pro|
|---|---|---|
|`console.log()`|Stampa valori in console|Facile e veloce|
|`debugger`|Interrompe l'esecuzione per analisi|Efficace in VS Code e Chrome|
|Breakpoints|Debug interattivo in VS Code|Permette di ispezionare variabili|
|`try/catch`|Gestione errori|Evita crash improvvisi|
|Classi di errore|Errori personalizzati|Migliora debugging e logging|

---
