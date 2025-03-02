
# 📌 Moduli in TypeScript

## 🎯 Introduzione
I **moduli** in TypeScript permettono di organizzare il codice suddividendolo in più file, rendendolo più leggibile e manutenibile.  
Un modulo esporta **funzioni, classi o variabili** e permette ad altri file di **importarle**.

---

## 📌 Esportare ed Importare in TypeScript

### 🔹 Esportare un valore da un file
**File: `math.ts`**
```ts
export function somma(a: number, b: number): number {
    return a + b;
}

export const PI: number = 3.14;
````

### 🔹 Importare in un altro file

**File: `app.ts`**

```ts
import { somma, PI } from "./math";

console.log(somma(5, 3)); // 8
console.log(PI); // 3.14
```

📌 **Nota:** Usa `import` e `export` con i percorsi relativi (`./` per riferirsi al file nella stessa cartella).

---

## 📌 `export default`

`export default` permette di esportare **un solo valore principale per file**.

### 🔹 Esportazione di Default

**File: `utils.ts`**

```ts
export default function saluta(nome: string): string {
    return `Ciao, ${nome}!`;
}
```

### 🔹 Importazione senza parentesi graffe `{ }`

**File: `main.ts`**

```ts
import saluta from "./utils";

console.log(saluta("Alice")); // "Ciao, Alice!"
```

📌 Se un modulo ha un **export default**, l'importazione avviene senza `{ }`.

---

## 📌 Esportare e Importare Tutto (`* as`)

Se un file ha molte esportazioni, si può importare tutto in un oggetto.

**File: `math.ts`**

```ts
export function somma(a: number, b: number): number {
    return a + b;
}

export function sottrazione(a: number, b: number): number {
    return a - b;
}
```

**File: `app.ts`**

```ts
import * as MathUtil from "./math";

console.log(MathUtil.somma(10, 5)); // 15
console.log(MathUtil.sottrazione(10, 5)); // 5
```

📌 L'intero modulo viene importato sotto il nome `MathUtil`.

---

## 📌 Esportare Tipi ed Interfacce

Anche **tipi e interfacce** possono essere esportati.

**File: `tipi.ts`**

```ts
export type Utente = {
    nome: string;
    età: number;
};
```

**File: `app.ts`**

```ts
import { Utente } from "./tipi";

let user: Utente = { nome: "Luca", età: 30 };
```

📌 TypeScript permette di organizzare i tipi in file separati.

---

## 📌 Moduli e `tsconfig.json`

Se stai lavorando su un progetto più grande, puoi specificare come TypeScript gestisce i moduli nel file `tsconfig.json`.

### 🔹 Configurazione per CommonJS (Node.js)

```json
{
    "compilerOptions": {
        "module": "CommonJS",
        "moduleResolution": "Node"
    }
}
```

### 🔹 Configurazione per ES Modules (Browser)

```json
{
    "compilerOptions": {
        "module": "ESNext",
        "moduleResolution": "Node"
    }
}
```

📌 **CommonJS** è usato da Node.js, mentre **ES Modules** è più comune nei progetti frontend.

---

## 📌 Riepilogo

|Concetto|Descrizione|Esempio|
|---|---|---|
|`export`|Esporta una funzione, variabile o classe|`export function somma(a, b) {}`|
|`import { }`|Importa specifici elementi da un modulo|`import { somma } from "./math"`|
|`export default`|Esporta un valore di default|`export default function saluta()`|
|`import * as`|Importa tutto il contenuto di un modulo|`import * as MathUtil from "./math"`|
|`export type`|Esporta tipi TypeScript|`export type Utente = { nome: string; }`|

---
