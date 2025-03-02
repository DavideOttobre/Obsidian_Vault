# 📌 Linter e Formatter per TypeScript

## 🎯 Introduzione
Per mantenere il codice pulito e coerente, possiamo usare:
✅ **ESLint** per rilevare errori e cattive pratiche  
✅ **Prettier** per formattare automaticamente il codice  

In questa guida vedremo:
- Installazione e configurazione di **ESLint**
- Installazione e configurazione di **Prettier**
- Integrazione tra **ESLint + Prettier**
- Configurazione per **VS Code**

---

## 📌 Installazione di ESLint
ESLint aiuta a **rilevare errori** e **mantenere uno stile di codice uniforme**.

1️⃣ **Installare ESLint**
```sh
npm install --save-dev eslint @typescript-eslint/parser @typescript-eslint/eslint-plugin
````

2️⃣ **Inizializzare ESLint**

```sh
npx eslint --init
```

📌 Scegliamo:

- **"To check syntax and find problems"** ✅
- **"JavaScript modules (import/export)"** ✅
- **"TypeScript"** ✅

3️⃣ **Modificare `.eslintrc.json`**

```json
{
  "env": {
    "browser": true,
    "es2021": true
  },
  "extends": [
    "eslint:recommended",
    "plugin:@typescript-eslint/recommended"
  ],
  "parser": "@typescript-eslint/parser",
  "plugins": ["@typescript-eslint"],
  "rules": {
    "semi": ["error", "always"],
    "quotes": ["error", "double"],
    "@typescript-eslint/no-unused-vars": "warn"
  }
}
```

📌 **Regole personalizzate**

- `semi: "always"` → Richiede `;` alla fine di ogni riga
- `quotes: "double"` → Impone l'uso delle virgolette `"`
- `@typescript-eslint/no-unused-vars` → Avvisa sulle variabili non utilizzate

---

## 📌 Installazione di Prettier

Prettier **formatta automaticamente** il codice.

1️⃣ **Installare Prettier**

```sh
npm install --save-dev --save-exact prettier
```

2️⃣ **Creare il file di configurazione `.prettierrc.json`**

```json
{
  "semi": true,
  "singleQuote": false,
  "trailingComma": "all",
  "tabWidth": 2
}
```

📌 **Opzioni**

- `"semi": true` → Inserisce `;` automaticamente
- `"singleQuote": false` → Usa virgolette doppie `"`
- `"trailingComma": "all"` → Aggiunge virgola finale negli oggetti e array
- `"tabWidth": 2` → Usa **2 spazi** per indentazione

---

## 📌 Integrare ESLint con Prettier

Per evitare conflitti tra ESLint e Prettier, installiamo:

```sh
npm install --save-dev eslint-config-prettier eslint-plugin-prettier
```

Modifichiamo `.eslintrc.json`:

```json
{
  "extends": [
    "eslint:recommended",
    "plugin:@typescript-eslint/recommended",
    "plugin:prettier/recommended"
  ]
}
```

📌 **Ora Prettier verrà eseguito automaticamente con ESLint**.

---

## 📌 Configurazione in VS Code

### 🔹 Installare le Estensioni:

1️⃣ **ESLint** (Microsoft)  
2️⃣ **Prettier - Code formatter**

### 🔹 Abilitare il formato automatico:

Aggiungere in `settings.json`:

```json
{
  "editor.formatOnSave": true,
  "editor.defaultFormatter": "esbenp.prettier-vscode"
}
```

📌 **Ora il codice verrà formattato automaticamente al salvataggio!** 🎯

---

## 📌 Eseguire ESLint e Prettier

Per **analizzare il codice** con ESLint:

```sh
npx eslint src/
```

Per **formattare tutto il codice** con Prettier:

```sh
npx prettier --write src/
```

---

## 📌 Riepilogo

|Strumento|Funzione|Comando|
|---|---|---|
|**ESLint**|Trova errori e problemi|`npx eslint src/`|
|**Prettier**|Format automatico|`npx prettier --write src/`|
|**ESLint + Prettier**|Integra linting e formattazione|`npm install --save-dev eslint-config-prettier eslint-plugin-prettier`|

---
