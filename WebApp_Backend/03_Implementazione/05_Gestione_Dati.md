# 📌 Gestione dei Dati

## 🎯 Obiettivo del Documento

Definire le operazioni CRUD (Create, Read, Update, Delete) per la gestione dei dati nel backend della web app.

---

## 1️⃣ Struttura delle API CRUD

### 🔹 Definizione degli endpoint

|Metodo|Endpoint|Descrizione|
|---|---|---|
|`GET`|`/api/richieste`|Ottiene tutte le richieste|
|`GET`|`/api/richieste/:id`|Ottiene una richiesta specifica|
|`POST`|`/api/richieste`|Crea una nuova richiesta|
|`PUT`|`/api/richieste/:id`|Aggiorna una richiesta|
|`DELETE`|`/api/richieste/:id`|Elimina una richiesta|

---

## 2️⃣ Implementazione degli Endpoint

### 🔹 Creazione del router API

```js
const express = require("express");
const router = express.Router();
const richiesteController = require("../controllers/richiesteController");
const { authMiddleware } = require("../middleware/authMiddleware");

router.get("/", authMiddleware, richiesteController.getAll);
router.get("/:id", authMiddleware, richiesteController.getOne);
router.post("/", authMiddleware, richiesteController.create);
router.put("/:id", authMiddleware, richiesteController.update);
router.delete("/:id", authMiddleware, richiesteController.delete);

module.exports = router;
```

---

## 3️⃣ Controller per la Gestione dei Dati

### 🔹 Implementazione della logica di business

```js
const getAll = async (req, res) => {
  const richieste = await Richiesta.findAll();
  res.json(richieste);
};

const getOne = async (req, res) => {
  const richiesta = await Richiesta.findByPk(req.params.id);
  if (!richiesta) return res.status(404).json({ errore: "Richiesta non trovata" });
  res.json(richiesta);
};

const create = async (req, res) => {
  const nuovaRichiesta = await Richiesta.create(req.body);
  res.status(201).json(nuovaRichiesta);
};

const update = async (req, res) => {
  const richiesta = await Richiesta.findByPk(req.params.id);
  if (!richiesta) return res.status(404).json({ errore: "Richiesta non trovata" });
  await richiesta.update(req.body);
  res.json(richiesta);
};

const delete = async (req, res) => {
  const richiesta = await Richiesta.findByPk(req.params.id);
  if (!richiesta) return res.status(404).json({ errore: "Richiesta non trovata" });
  await richiesta.destroy();
  res.json({ messaggio: "Richiesta eliminata" });
};

module.exports = { getAll, getOne, create, update, delete };
```

---

## 4️⃣ Validazione e Sicurezza

✅ **Validazione degli input con Joi o Express Validator** ✅ **Protezione dagli attacchi SQL Injection** ✅ **Sanitizzazione degli input per evitare XSS**

```js
const { body } = require("express-validator");
const validaRichiesta = [
  body("titolo").notEmpty().withMessage("Il titolo è obbligatorio"),
  body("descrizione").notEmpty().withMessage("La descrizione è obbligatoria"),
];
```

---
