# 📌 Compilazione del Codice TypeScript

## 🎯 Introduzione
TypeScript **non viene eseguito direttamente** dal browser o da Node.js. Deve essere **compilato in JavaScript** usando `tsc` (TypeScript Compiler).

In questa guida vedremo:
✅ **Compilare manualmente** con `tsc`  
✅ **Compilazione automatica** con `watch mode`  
✅ **Output in una cartella separata**  
✅ **Uso di `ts-node` per eseguire TypeScript senza compilazione**  

---

## 📌 Compilare un Singolo File TypeScript
Creiamo un file `src/index.ts` con il seguente codice:
```ts
const saluta = (nome: string) => {
    console.log(`Ciao, ${nome}!`);
};

saluta("Alice");
````

Compiliamolo con:

```sh
npx tsc src/index.ts
```

📌 Questo genera un file `src/index.js` con il codice JavaScript equivalente.

---

## 📌 Compilazione Automatica con Watch Mode (`--watch`)

Invece di compilare manualmente ogni volta, possiamo usare il **watch mode**:

```sh
npx tsc --watch
```

📌 TypeScript **ricompilerà automaticamente** i file `.ts` ogni volta che vengono modificati.

---

## 📌 Uscita dei File Compilati in una Cartella Separata (`outDir`)

Per organizzare il progetto, possiamo **separare i file TypeScript da quelli compilati**.

Aggiorniamo `tsconfig.json`:

```json
{
  "compilerOptions": {
    "outDir": "./dist",
    "rootDir": "./src"
  },
  "include": ["src"]
}
```

Ora compiliamo tutto il progetto con:

```sh
npx tsc
```

📌 Tutti i file `.js` saranno generati nella cartella `dist/`.

---

## 📌 Eseguire TypeScript Senza Compilazione con `ts-node`

`ts-node` permette di eseguire TypeScript direttamente, senza generare file `.js`.

Installiamo `ts-node`:

```sh
npm install -g ts-node
```

Eseguiamo un file TypeScript:

```sh
npx ts-node src/index.ts
```

📌 Utile per **sviluppo rapido** e **script temporanei**.

---

## 📌 Ignorare i File `.js` in Git (`.gitignore`)

Se non vogliamo versionare i file compilati, aggiungiamo `dist/` a `.gitignore`:

```
node_modules/
dist/
```

📌 Questo evita di **sporcare il repository con file compilati**.

---

## 📌 Riepilogo

|Comando|Descrizione|
|---|---|
|`npx tsc file.ts`|Compila un file `.ts` in `.js`|
|`npx tsc --watch`|Ricompila automaticamente ad ogni modifica|
|`npx tsc`|Compila tutti i file `.ts` in base a `tsconfig.json`|
|`npx ts-node file.ts`|Esegue TypeScript senza compilare in JavaScript|

---
