# 📌 Creazione delle API

## 🎯 Obiettivo del Documento

Definire e implementare gli endpoint API del backend per garantire un'architettura RESTful efficiente e scalabile.

---

## 1️⃣ Definizione degli Endpoint

### 🔹 Struttura degli endpoint

|Metodo|Endpoint|Descrizione|
|---|---|---|
|`GET`|`/api/utenti`|Ottiene tutti gli utenti|
|`GET`|`/api/utenti/:id`|Ottiene un singolo utente|
|`POST`|`/api/utenti`|Crea un nuovo utente|
|`PUT`|`/api/utenti/:id`|Aggiorna un utente|
|`DELETE`|`/api/utenti/:id`|Elimina un utente|

---

## 2️⃣ Implementazione degli Endpoint

### 🔹 Creazione del router API

```js
const express = require("express");
const router = express.Router();
const utentiController = require("../controllers/utentiController");

router.get("/", utentiController.getAll);
router.get("/:id", utentiController.getOne);
router.post("/", utentiController.create);
router.put("/:id", utentiController.update);
router.delete("/:id", utentiController.delete);

module.exports = router;
```

---

## 3️⃣ Controller degli Utenti

### 🔹 Implementazione della logica di business

```js
const getAll = async (req, res) => {
  const utenti = await Utente.findAll();
  res.json(utenti);
};

const getOne = async (req, res) => {
  const utente = await Utente.findByPk(req.params.id);
  if (!utente) return res.status(404).json({ errore: "Utente non trovato" });
  res.json(utente);
};

const create = async (req, res) => {
  const nuovoUtente = await Utente.create(req.body);
  res.status(201).json(nuovoUtente);
};

const update = async (req, res) => {
  const utente = await Utente.findByPk(req.params.id);
  if (!utente) return res.status(404).json({ errore: "Utente non trovato" });
  await utente.update(req.body);
  res.json(utente);
};

const delete = async (req, res) => {
  const utente = await Utente.findByPk(req.params.id);
  if (!utente) return res.status(404).json({ errore: "Utente non trovato" });
  await utente.destroy();
  res.json({ messaggio: "Utente eliminato" });
};

module.exports = { getAll, getOne, create, update, delete };
```

---

## 4️⃣ Testare le API

✅ **Test manuale** con Postman o Insomnia ✅ **Test automatico** con Jest o Mocha

```sh
curl -X GET http://localhost:3000/api/utenti
```

---

## 5️⃣ Prossimi Passaggi

👉 [Autenticazione e Sicurezza](https://chatgpt.com/c/03_Implementazione/03_Autenticazione)