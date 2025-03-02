# 📌 Migrazione da JavaScript a TypeScript

## 🎯 Introduzione
Convertire un progetto JavaScript in TypeScript offre numerosi vantaggi, come **tipizzazione statica**, **migliore manutenzione** e **rilevamento degli errori a tempo di compilazione**.

In questa guida vedremo:
✅ Strategie di migrazione  
✅ Conversione dei file `.js` in `.ts`  
✅ Abilitazione TypeScript in un progetto esistente  
✅ Risoluzione degli errori comuni  

---

## 📌 1️⃣ Aggiungere TypeScript a un Progetto Esistente
Se hai già un progetto JavaScript, il primo passo è installare TypeScript.

```sh
npm install --save-dev typescript
````

Poi, inizializza TypeScript con:

```sh
npx tsc --init
```

📌 Questo comando crea il file di configurazione `tsconfig.json`.

---

## 📌 2️⃣ Rinominare i File `.js` in `.ts`

Il primo passo nella conversione è **rinominare i file**.

```sh
mv script.js script.ts
```

📌 Dopo aver fatto questo, TypeScript segnalerà eventuali errori di tipo.

---

## 📌 3️⃣ Aggiungere Tipi alle Variabili e Funzioni

### 🔹 JavaScript (senza tipi)

```js
function somma(a, b) {
    return a + b;
}
```

### 🔹 TypeScript (con tipizzazione)

```ts
function somma(a: number, b: number): number {
    return a + b;
}
```

📌 Ora TypeScript garantisce che `a` e `b` siano sempre numeri.

---

## 📌 4️⃣ Aggiungere Interfacce per Oggetti Complessi

### 🔹 JavaScript (oggetto senza tipi)

```js
const utente = { nome: "Alice", età: 25 };
```

### 🔹 TypeScript (oggetto tipizzato)

```ts
interface Utente {
    nome: string;
    età: number;
}

const utente: Utente = { nome: "Alice", età: 25 };
```

📌 **Le interfacce migliorano la leggibilità e prevengono errori**.

---

## 📌 5️⃣ Abilitare il Controllo Rigido (`strict: true`)

Nel file `tsconfig.json`, attiviamo il controllo rigoroso:

```json
{
  "compilerOptions": {
    "strict": true
  }
}
```

📌 Questo abilita:

- `noImplicitAny` → Evita variabili senza tipo.
- `strictNullChecks` → Evita problemi con `null` e `undefined`.
- `strictFunctionTypes` → Controlla meglio le funzioni.

---

## 📌 6️⃣ Risolvere gli Errori Comuni nella Conversione

|Errore|Causa|Soluzione|
|---|---|---|
|`Parameter 'x' implicitly has an 'any' type`|Manca il tipo nei parametri di funzione|Aggiungere `x: number`|
|`Object is possibly 'null'`|TypeScript richiede controllo su `null`|Aggiungere `if (obj !== null)`|
|`Cannot redeclare block-scoped variable`|Nome di variabile già dichiarato|Usare `let` o `const`|

---

## 📌 7️⃣ Usare Gradualmente TypeScript con `allowJs`

Se non puoi convertire tutto subito, puoi usare **TypeScript insieme a JavaScript**.

Nel file `tsconfig.json`, attiva:

```json
{
  "compilerOptions": {
    "allowJs": true
  },
  "include": ["src/**/*"]
}
```

📌 Questo permette di **compilare sia file `.js` che `.ts`**.

---

## 📌 Riepilogo

|Passaggio|Azione|
|---|---|
|**1️⃣ Installare TypeScript**|`npm install --save-dev typescript`|
|**2️⃣ Rinominare file**|`mv script.js script.ts`|
|**3️⃣ Aggiungere tipi**|Variabili, funzioni e oggetti|
|**4️⃣ Usare interfacce**|Migliore gestione degli oggetti|
|**5️⃣ Abilitare `strict`**|Maggiore controllo degli errori|
|**6️⃣ Risolvere errori comuni**|Controllo di `null`, tipi mancanti|
|**7️⃣ Usare `allowJs`**|Permette di integrare TypeScript gradualmente|

---

## 📌 Prossimi Passaggi

👉 [Compatibilità tra TypeScript e JavaScript](https://chatgpt.com/c/05_TypeScript_e_JavaScript/03_Tips_Compatibilit%C3%A0)