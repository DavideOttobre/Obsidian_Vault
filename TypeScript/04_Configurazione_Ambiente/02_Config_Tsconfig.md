# 📌 Configurazione di `tsconfig.json`

## 🎯 Introduzione
Il file **`tsconfig.json`** definisce le impostazioni di compilazione di TypeScript.  
In questa guida vedremo:
✅ Le opzioni principali  
✅ Le configurazioni consigliate  
✅ Esempi pratici  

---

## 📌 Creazione di `tsconfig.json`
Per generare un file `tsconfig.json`, eseguire:
```sh
npx tsc --init
````

📌 Questo comando crea un file predefinito con molte opzioni commentate.

---

## 📌 Opzioni Principali di `tsconfig.json`

### 🔹 **`compilerOptions`**

```json
{
  "compilerOptions": {
    "target": "ES6",
    "module": "CommonJS",
    "strict": true,
    "outDir": "./dist",
    "rootDir": "./src",
    "allowJs": true,
    "checkJs": true
  }
}
```

📌 **Cosa significano queste opzioni?**

|Opzione|Descrizione|
|---|---|
|`"target"`|Versione ECMAScript del codice compilato (ES6, ESNext, etc.)|
|`"module"`|Tipo di moduli usati (CommonJS per Node.js, ESNext per browser)|
|`"strict"`|Attiva il controllo rigoroso dei tipi|
|`"outDir"`|Directory di output dei file compilati|
|`"rootDir"`|Directory dei file sorgenti TypeScript|
|`"allowJs"`|Permette di compilare file `.js` insieme a `.ts`|
|`"checkJs"`|Controlla gli errori nei file JavaScript|

---

## 📌 Abilitare il Controllo Rigoroso (`strict`)

Per una maggiore sicurezza del codice, attivare:

```json
{
  "compilerOptions": {
    "strict": true
  }
}
```

📌 Attiva automaticamente:

- `"noImplicitAny"` → Impedisce variabili senza tipo dichiarato.
- `"strictNullChecks"` → Evita errori con valori `null` o `undefined`.
- `"strictFunctionTypes"` → Controlla meglio i tipi nelle funzioni.

---

## 📌 Includere ed Escludere File

Possiamo specificare quali file o cartelle TypeScript deve compilare.

```json
{
  "include": ["src/**/*"],
  "exclude": ["node_modules", "dist"]
}
```

📌 `"include"` specifica i file da compilare, `"exclude"` quelli da ignorare.

---

## 📌 Configurazione per **Node.js**

Se il progetto è basato su **Node.js**, usare:

```json
{
  "compilerOptions": {
    "module": "CommonJS",
    "moduleResolution": "Node",
    "esModuleInterop": true
  }
}
```

📌 `"esModuleInterop": true` permette di usare `import` ed `export` come in JavaScript.

---

## 📌 Configurazione per **Frontend (React)**

Per progetti React con TypeScript, usare:

```json
{
  "compilerOptions": {
    "jsx": "react",
    "moduleResolution": "Node"
  }
}
```

📌 `"jsx": "react"` abilita il supporto per i file `.tsx` in React.

---

## 📌 Disabilitare l’Output di Errori (`noEmit`)

Se vogliamo solo verificare errori senza generare file `.js`:

```json
{
  "compilerOptions": {
    "noEmit": true
  }
}
```

📌 Utile per verificare la qualità del codice senza generare file compilati.

---

## 📌 Configurazione Completa per un Progetto Standard

```json
{
  "compilerOptions": {
    "target": "ES6",
    "module": "CommonJS",
    "strict": true,
    "outDir": "./dist",
    "rootDir": "./src",
    "allowJs": true,
    "checkJs": true,
    "noImplicitAny": true,
    "strictNullChecks": true,
    "moduleResolution": "Node",
    "esModuleInterop": true
  },
  "include": ["src/**/*"],
  "exclude": ["node_modules", "dist"]
}
```

📌 Questa configurazione è **sicura** e **adatta a progetti sia frontend che backend**.

---

## 📌 Riepilogo

|Opzione|Descrizione|
|---|---|
|`"strict"`|Attiva tutti i controlli rigorosi|
|`"target"`|Definisce la versione ECMAScript compilata|
|`"module"`|Specifica il tipo di moduli (CommonJS, ESNext)|
|`"outDir"`|Cartella di destinazione dei file compilati|
|`"rootDir"`|Cartella sorgente dei file TypeScript|
|`"noEmit"`|Compila senza generare file JavaScript|

---
