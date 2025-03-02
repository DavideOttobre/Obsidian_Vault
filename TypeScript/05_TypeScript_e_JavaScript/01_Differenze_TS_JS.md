# 📌 Differenze tra TypeScript e JavaScript

## 🎯 Introduzione
TypeScript è un **superset di JavaScript**, il che significa che aggiunge funzionalità extra senza modificarne il comportamento di base.  
Le principali differenze sono:
✅ **Tipizzazione statica**  
✅ **Interfacce e tipi avanzati**  
✅ **Compilazione necessaria**  
✅ **Migliore supporto per la programmazione ad oggetti**  

---

## 📌 1️⃣ Tipizzazione Statica vs. Dinamica
### 🔹 JavaScript (tipizzazione dinamica)
```js
let nome = "Alice";
nome = 42; // ❌ Nessun errore, ma può causare problemi
````

### 🔹 TypeScript (tipizzazione statica)

```ts
let nome: string = "Alice";
nome = 42; // ❌ Errore: il tipo 'number' non è assegnabile a 'string'
```

📌 **TypeScript previene errori di tipo a tempo di compilazione**.

---

## 📌 2️⃣ Dichiarazione di Variabili con Tipi

### 🔹 JavaScript

```js
let eta = 30; // Non ha un tipo fisso
```

### 🔹 TypeScript

```ts
let eta: number = 30; // Il tipo è fisso
```

📌 **TS garantisce che `eta` rimanga sempre un numero**.

---

## 📌 3️⃣ Interfacce e Tipi

TypeScript introduce **interfacce e tipi avanzati**, assenti in JavaScript.

### 🔹 JavaScript (oggetto senza controllo dei tipi)

```js
const persona = {
    nome: "Alice",
    età: 25
};
persona.email = "alice@email.com"; // Nessun errore, anche se non previsto
```

### 🔹 TypeScript (uso di interfacce)

```ts
interface Persona {
    nome: string;
    età: number;
}

const persona: Persona = {
    nome: "Alice",
    età: 25
};

// persona.email = "alice@email.com"; ❌ Errore: la proprietà non esiste nell'interfaccia
```

📌 **TS garantisce che l’oggetto rispetti la struttura prevista**.

---

## 📌 4️⃣ Classi ed Ereditarietà Migliorata

TypeScript ha un **supporto avanzato per la POO** rispetto a JavaScript.

### 🔹 JavaScript (ES6+)

```js
class Persona {
    constructor(nome) {
        this.nome = nome;
    }
}
```

### 🔹 TypeScript (con modificatori di accesso e tipi)

```ts
class Persona {
    private nome: string;

    constructor(nome: string) {
        this.nome = nome;
    }

    saluta(): string {
        return `Ciao, sono ${this.nome}`;
    }
}

const persona = new Persona("Alice");
console.log(persona.saluta()); // "Ciao, sono Alice"
// persona.nome = "Marco"; ❌ Errore: 'nome' è private
```

📌 **TypeScript protegge i dati con modificatori di accesso (`public`, `private`, `protected`)**.

---

## 📌 5️⃣ Compilazione Necessaria

JavaScript viene **eseguito direttamente** dal browser o da Node.js, mentre TypeScript deve essere **compilato in JavaScript**.

### 🔹 JavaScript

```sh
node script.js
```

### 🔹 TypeScript (compilazione necessaria)

```sh
npx tsc script.ts
node script.js
```

📌 **Il codice TypeScript non può essere eseguito direttamente**.

---

## 📌 6️⃣ Controllo degli Errori a Tempo di Compilazione

JavaScript rileva errori **solo a runtime**.

### 🔹 JavaScript (errore scoperto solo a runtime)

```js
function somma(a, b) {
    return a + b;
}
console.log(somma("5", 3)); // "53", errore logico
```

### 🔹 TypeScript (errore rilevato prima dell'esecuzione)

```ts
function somma(a: number, b: number): number {
    return a + b;
}
console.log(somma("5", 3)); // ❌ Errore: "5" non è un numero
```

📌 **TS rileva gli errori prima che il codice venga eseguito**.

---

## 📌 7️⃣ Supporto ai Moduli e Import/Export Migliorato

JavaScript usa `import/export` con alcune limitazioni.

### 🔹 JavaScript

```js
export function saluta() {
    return "Ciao!";
}
import { saluta } from "./modulo.js";
```

### 🔹 TypeScript (con supporto a interfacce e tipi)

```ts
export interface Utente {
    nome: string;
    email: string;
}

export function saluta(utente: Utente): string {
    return `Ciao, ${utente.nome}`;
}

import { saluta, Utente } from "./modulo";
```

📌 **TypeScript permette di esportare anche interfacce e tipi, migliorando la modularità**.

---

## 📌 Riepilogo

|Caratteristica|JavaScript|TypeScript|
|---|---|---|
|**Tipizzazione**|Dinamica|Statica|
|**Errori a tempo di compilazione**|❌ No|✅ Sì|
|**Interfacce**|❌ No|✅ Sì|
|**Modificatori di accesso (`private`, `protected`)**|❌ No|✅ Sì|
|**Necessità di compilazione**|❌ No|✅ Sì|
|**Struttura del codice più robusta**|❌ No|✅ Sì|

---
