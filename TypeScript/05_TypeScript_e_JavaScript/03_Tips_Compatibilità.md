# 📌 Compatibilità tra TypeScript e JavaScript

## 🎯 Introduzione
TypeScript è un **superset di JavaScript**, il che significa che **tutto il codice JavaScript valido è anche codice TypeScript valido**. Tuttavia, ci sono alcune differenze e best practice per garantire **compatibilità e interoperabilità**.

In questa guida vedremo:
✅ Come usare TypeScript e JavaScript insieme  
✅ Tipi per librerie JavaScript (`@types`)  
✅ Evitare problemi di compatibilità  
✅ Debug e transpilazione  

---

## 📌 1️⃣ Usare TypeScript e JavaScript nello Stesso Progetto
Se un progetto contiene sia file `.ts` che `.js`, possiamo abilitare la compatibilità con:

```json
{
  "compilerOptions": {
    "allowJs": true,
    "checkJs": true
  }
}
````

📌 **`allowJs`** permette di **compilare i file JavaScript** con TypeScript.  
📌 **`checkJs`** attiva il controllo statico degli errori nei file `.js`.

---

## 📌 2️⃣ Dichiarare Tipi per Codice JavaScript

Se stiamo usando una libreria JavaScript senza tipizzazione, possiamo dichiarare i tipi manualmente con **Dichiarazioni `.d.ts`**.

### 🔹 File JavaScript originale (`utils.js`)

```js
export function somma(a, b) {
    return a + b;
}
```

### 🔹 Dichiarazione dei tipi (`utils.d.ts`)

```ts
declare function somma(a: number, b: number): number;
export { somma };
```

### 🔹 Importazione in TypeScript

```ts
import { somma } from "./utils";
console.log(somma(2, 3)); // 5
```

📌 Questo permette di usare codice JavaScript **tipizzato** in TypeScript.

---

## 📌 3️⃣ Installare Tipi per Librerie JavaScript

Molte librerie JavaScript non includono i tipi nativamente, ma esistono pacchetti di **tipi definiti dalla community** (`@types`).

Esempio con `express`:

```sh
npm install express
npm install --save-dev @types/express
```

📌 **Alcuni pacchetti popolari con @types**:

- `@types/node` → API Node.js
- `@types/react` → React con TypeScript
- `@types/lodash` → Libreria Lodash
- `@types/jquery` → Tipi per jQuery

---

## 📌 4️⃣ Evitare Problemi di Compatibilità

Se un valore potrebbe provenire da JavaScript con un tipo sconosciuto, possiamo usare:

### 🔹 `any` (sconsigliato, ma utile in transizioni rapide)

```ts
let dato: any = JSON.parse('{ "nome": "Alice" }');
console.log(dato.nome); // Funziona, ma senza sicurezza sui tipi
```

### 🔹 `unknown` (più sicuro di `any`)

```ts
let dato: unknown = JSON.parse('{ "nome": "Alice" }');

if (typeof dato === "object" && dato !== null && "nome" in dato) {
    console.log((dato as { nome: string }).nome); // "Alice"
}
```

📌 `unknown` richiede **un controllo esplicito** prima di usare il valore.

---

## 📌 5️⃣ Debug e Transpilazione

TypeScript può **trasformare il codice** in diverse versioni ECMAScript per mantenere compatibilità.

Aggiorniamo `tsconfig.json` per generare codice compatibile con vecchie versioni di JS:

```json
{
  "compilerOptions": {
    "target": "ES5",
    "module": "CommonJS"
  }
}
```

📌 **`target`** → Converte il codice in ES5 per compatibilità con browser più vecchi.  
📌 **`module`** → Definisce il sistema di moduli (CommonJS per Node.js, ESNext per browser moderni).

---

## 📌 6️⃣ Verificare la Compatibilità Automatica

Per vedere eventuali problemi di compatibilità tra TypeScript e JavaScript, possiamo eseguire:

```sh
npx tsc --noEmit
```

📌 Questo **analizza il codice senza generare file `.js`**, utile per debugging.

---

## 📌 Riepilogo

|Concetto|Soluzione|
|---|---|
|**Usare TS e JS insieme**|`"allowJs": true, "checkJs": true`|
|**Tipizzare codice JS esistente**|Creare file `.d.ts`|
|**Aggiungere tipi per librerie JS**|`npm install --save-dev @types/libreria`|
|**Usare `unknown` invece di `any`**|Garantisce più sicurezza|
|**Generare codice compatibile**|`"target": "ES5"` in `tsconfig.json`|

---
