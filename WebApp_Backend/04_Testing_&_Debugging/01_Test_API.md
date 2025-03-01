# 📌 Testing delle API

## 🎯 Obiettivo del Documento

Definire strategie di testing per garantire che le API del backend funzionino correttamente e siano affidabili.

---

## 1️⃣ Tipologie di Test

### 🔹 Unit Test

✅ Testano singole funzioni o moduli ✅ Validano il corretto comportamento del codice ✅ Strumenti: Jest, Mocha, Pytest

### 🔹 Integration Test

✅ Testano il flusso di dati tra moduli diversi ✅ Validano interazioni tra API e database ✅ Strumenti: Supertest, Postman, Selenium

### 🔹 End-to-End (E2E) Test

✅ Simulano l’esperienza dell’utente reale ✅ Validano il comportamento del sistema completo ✅ Strumenti: Cypress, Playwright

---

## 2️⃣ Configurazione dell’Ambiente di Test

### 🔹 Installazione delle Dipendenze

```sh
npm install --save-dev jest supertest dotenv
```

### 🔹 Configurazione di Jest in `package.json`

```json
"scripts": {
  "test": "jest --runInBand"
}
```

### 🔹 Setup del file `.env.test`

```env
DB_HOST=localhost
DB_USER=test
DB_PASSWORD=test
DB_NAME=test_db
```

---

## 3️⃣ Scrivere i Test per le API

### 🔹 Test per il recupero di tutti i dati

```js
const request = require("supertest");
const app = require("../server");

test("GET /api/dati - Ottiene tutti i dati", async () => {
  const response = await request(app).get("/api/dati");
  expect(response.statusCode).toBe(200);
  expect(Array.isArray(response.body)).toBe(true);
});
```

### 🔹 Test per la creazione di un record

```js
test("POST /api/dati - Crea un nuovo dato", async () => {
  const nuovoDato = { titolo: "Test", descrizione: "Descrizione test" };
  const response = await request(app).post("/api/dati").send(nuovoDato);
  expect(response.statusCode).toBe(201);
  expect(response.body.titolo).toBe(nuovoDato.titolo);
});
```

---

## 4️⃣ Automazione dei Test

### 🔹 Eseguire i Test

```sh
npm test
```

### 🔹 Configurare GitHub Actions per Test CI/CD

```yaml
name: Test API
on: [push]

jobs:
  test:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v2
      - name: Installare le dipendenze
        run: npm install
      - name: Eseguire i test
        run: npm test
```

---

## 5️⃣ Prossimi Passaggi

👉 [Gestione degli Errori](https://chatgpt.com/c/04_Testing_Debugging/02_Gestione_Errori)