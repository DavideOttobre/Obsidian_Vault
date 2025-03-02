# Moduli e Import/Export in TypeScript

TypeScript supporta i **moduli**, che permettono di organizzare il codice in file separati e riutilizzabili.

---

## 📌 1. Perché Usare i Moduli?
✅ Organizzazione del codice in file separati  
✅ Riutilizzo di funzioni e classi  
✅ Evita problemi di variabili globali  
✅ Mantiene il codice più leggibile e manutenibile  

---

## 📌 2. Esportare e Importare in TypeScript

### **1️⃣ Esportazione di Variabili, Funzioni e Classi**
Per esportare un’entità da un file TypeScript, usiamo la parola chiave `export`.

**File `math.ts`**
```typescript
export const PI = 3.14;

export function somma(a: number, b: number): number {
  return a + b;
}

export class Calcolatrice {
  static moltiplica(a: number, b: number): number {
    return a * b;
  }
}
````

### **2️⃣ Importazione in un altro file**

Per usare le funzioni o classi esportate, utilizziamo `import`.

**File `main.ts`**

```typescript
import { PI, somma, Calcolatrice } from "./math";

console.log(PI); // Output: 3.14
console.log(somma(4, 5)); // Output: 9
console.log(Calcolatrice.moltiplica(3, 4)); // Output: 12
```

---

## 📌 3. Esportazione di Default

Possiamo esportare un valore **di default** per semplificare l'importazione.

**File `saluto.ts`**

```typescript
export default function saluta(nome: string): string {
  return `Ciao, ${nome}!`;
}
```

**File `main.ts`**

```typescript
import saluta from "./saluto";

console.log(saluta("Alice")); // Output: "Ciao, Alice!"
```

✅ **L’importazione non usa `{}` perché è un `export default`.**

---

## 📌 4. Rinominare le Esportazioni e Importazioni

Possiamo rinominare entità durante l’importazione.

**File `math.ts`**

```typescript
export function sottrai(a: number, b: number): number {
  return a - b;
}
```

**File `main.ts`**

```typescript
import { sottrai as differenza } from "./math";

console.log(differenza(10, 5)); // Output: 5
```

✅ `sottrai` viene importato con il nome `differenza`.

---

## 📌 5. Importare Tutto (`* as`)

Possiamo importare tutte le esportazioni di un modulo in un **oggetto**.

**File `math.ts`**

```typescript
export const PI = 3.14;
export function somma(a: number, b: number): number {
  return a + b;
}
```

**File `main.ts`**

```typescript
import * as Matematica from "./math";

console.log(Matematica.PI); // Output: 3.14
console.log(Matematica.somma(2, 3)); // Output: 5
```

✅ **Ora tutte le funzioni e variabili sono accessibili tramite `Matematica`**.

---

## 📌 6. Moduli nei Progetti TypeScript

TypeScript compila i moduli in JavaScript usando il file `tsconfig.json`.

**Per generarlo automaticamente:**

```sh
tsc --init
```

Esempio di `tsconfig.json`:

```json
{
  "compilerOptions": {
    "module": "CommonJS",
    "target": "ES6",
    "outDir": "./dist"
  }
}
```

✅ **Il codice TypeScript sarà compilato nella cartella `dist/`.**

---

## 📌 7. Differenza tra `CommonJS` e `ES Modules`

|Caratteristica|CommonJS (Node.js)|ES Modules (Browser & TS)|
|---|---|---|
|Sintassi export|`module.exports = ...`|`export`|
|Sintassi import|`const modulo = require("modulo")`|`import { ... } from "modulo"`|
|Supportato da|Node.js|Browser & TypeScript|

---

## 📌 8. Uso dei Moduli con Node.js

Se usiamo TypeScript con Node.js, dobbiamo impostare `module: "CommonJS"`.

**File `server.ts`**

```typescript
export function avviaServer() {
  console.log("Server in esecuzione...");
}
```

**File `index.ts`**

```typescript
import { avviaServer } from "./server";

avviaServer(); // Output: "Server in esecuzione..."
```

Compiliamo e avviamo il file:

```sh
tsc
node dist/index.js
```

---

## 🔥 Conclusione

Abbiamo visto: ✅ Esportazione e importazione di funzioni, classi e variabili  
✅ Uso di `export default` e `import * as`  
✅ Configurazione di TypeScript per i moduli  
✅ Differenza tra CommonJS e ES Modules
