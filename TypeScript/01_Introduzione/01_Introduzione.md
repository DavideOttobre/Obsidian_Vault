# 📌 Introduzione a TypeScript

## 🎯 Cos'è TypeScript?

TypeScript è un **superset di JavaScript** che aggiunge **tipizzazione statica** e altre funzionalità avanzate per migliorare la scrittura di codice sicuro e manutenibile.

✅ **Sviluppato da Microsoft** 
✅ **Compilato in JavaScript puro** (compatibile con qualsiasi ambiente JS) 
✅ **Aggiunge sicurezza e leggibilità grazie alla tipizzazione** 
✅ **Supporta le ultime feature di ES6+**

```ts
// JavaScript classico
const saluta = (nome) => `Ciao, ${nome}!`;
console.log(saluta("Mario"));

// TypeScript con tipizzazione
const salutaTS = (nome: string): string => {
  return `Ciao, ${nome}!`;
};
console.log(salutaTS("Mario"));
```

---

## 1️⃣ Perché Usare TypeScript?

### 🔹 Vantaggi

- ✅ **Tipizzazione statica**: Previene errori a runtime
- ✅ **Miglior supporto per IDE** (autocompletamento, suggerimenti, refactoring)
- ✅ **Compatibilità con librerie JavaScript**
- ✅ **Più sicurezza nel codice**
- ✅ **Facilità di debugging**

### 🔹 Svantaggi

- ❌ Richiede un passaggio di **compilazione** (`tsc`)
- ❌ **Curva di apprendimento** più ripida rispetto a JavaScript puro

```ts
// Errore rilevato in TypeScript (mentre JS lo accetterebbe!)
let eta: number = "venti"; // ❌ Errore: il tipo string non è assegnabile a number
```

---

## 2️⃣ Installazione di TypeScript

### 🔹 Installazione Globale

```sh
npm install -g typescript
```

Verifica installazione:

```sh
tsc --version
```

### 🔹 Creazione di un Progetto TypeScript

```sh
mkdir progetto-ts
cd progetto-ts
npm init -y
npm install typescript
npx tsc --init  # Crea tsconfig.json
```

### 🔹 Compilazione di un file TypeScript

```sh
echo 'const messaggio: string = "Hello, TypeScript!"; console.log(messaggio);' > index.ts
npx tsc index.ts
node index.js
```

---

## 3️⃣ Esempio Completo: Conversione da JavaScript a TypeScript

### 🔹 JavaScript

```js
function somma(a, b) {
  return a + b;
}
console.log(somma(5, "10")); // ❌ Errore logico: "510"
```

### 🔹 TypeScript con Tipi

```ts
function somma(a: number, b: number): number {
  return a + b;
}
console.log(somma(5, 10)); // ✅ 15
```

---
