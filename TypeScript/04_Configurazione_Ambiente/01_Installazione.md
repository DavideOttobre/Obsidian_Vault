# 📌 Installazione e Configurazione di TypeScript

## 🎯 Introduzione
TypeScript può essere installato **globalmente** o **localmente** in un progetto.  
In questa guida vedremo:
✅ Installazione globale e locale  
✅ Creazione di un progetto TypeScript  
✅ Configurazione del file `tsconfig.json`  

---

## 📌 Installazione di TypeScript
### 🔹 Installazione Globale (per usarlo ovunque)
```sh
npm install -g typescript
````

📌 Controllare la versione installata:

```sh
tsc -v
```

### 🔹 Installazione Locale (solo per un progetto)

```sh
npm install --save-dev typescript
```

📌 Questo lo aggiunge alla cartella `node_modules` e al file `package.json`.

---

## 📌 Creare un Progetto TypeScript

1️⃣ **Creare una cartella per il progetto**

```sh
mkdir mio-progetto-ts && cd mio-progetto-ts
```

2️⃣ **Inizializzare un progetto Node.js**

```sh
npm init -y
```

📌 Crea un `package.json` con le impostazioni di default.

3️⃣ **Installare TypeScript nel progetto**

```sh
npm install --save-dev typescript
```

4️⃣ **Generare il file di configurazione**

```sh
npx tsc --init
```

📌 Questo comando crea il file `tsconfig.json`.

---

## 📌 Configurazione del File `tsconfig.json`

Il file `tsconfig.json` contiene le opzioni di compilazione per TypeScript.

### 🔹 Esempio di `tsconfig.json` base:

```json
{
  "compilerOptions": {
    "target": "ES6",
    "module": "CommonJS",
    "outDir": "./dist",
    "rootDir": "./src",
    "strict": true
  },
  "include": ["src"],
  "exclude": ["node_modules"]
}
```

📌 **Cosa significano le opzioni?**

|Opzione|Descrizione|
|---|---|
|`"target"`|Versione ECMAScript compilata (ES6, ESNext)|
|`"module"`|Sistema di moduli usato (CommonJS per Node.js, ESNext per frontend)|
|`"outDir"`|Cartella dove salvare i file compilati|
|`"rootDir"`|Cartella sorgente dei file TypeScript|
|`"strict"`|Attiva il controllo rigoroso dei tipi|

---

## 📌 Compilare TypeScript in JavaScript

Dopo aver scritto un file **`src/index.ts`**, possiamo compilarlo con:

```sh
npx tsc
```

📌 I file `.ts` in `src/` verranno compilati in `.js` nella cartella `dist/`.

---

## 📌 Eseguire il Codice TypeScript

Dopo la compilazione, possiamo eseguire i file JavaScript con Node.js:

```sh
node dist/index.js
```

📌 **Alternativa**: usare `ts-node` per eseguire TypeScript senza compilare.

```sh
npx ts-node src/index.ts
```

---

## 📌 Riepilogo

|Comando|Descrizione|
|---|---|
|`npm install -g typescript`|Installa TypeScript globalmente|
|`npm install --save-dev typescript`|Installa TypeScript localmente|
|`npx tsc --init`|Crea il file `tsconfig.json`|
|`npx tsc`|Compila TypeScript in JavaScript|
|`npx ts-node src/index.ts`|Esegue TypeScript senza compilazione|

---
