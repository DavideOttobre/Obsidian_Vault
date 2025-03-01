# 📌 Autenticazione e Sicurezza

## 🎯 Obiettivo del Documento

Implementare un sistema di autenticazione sicuro basato su JWT, OAuth2 e protezione delle API.

---

## 1️⃣ Registrazione e Login

### 🔹 Flusso di Registrazione

1️⃣ L’utente invia email e password tramite API 
2️⃣ Il backend valida i dati e verifica email duplicata 
3️⃣ La password viene **hashata** (bcrypt/argon2) 
4️⃣ Il record viene salvato nel database 
5️⃣ Viene inviato un **email di conferma** (se richiesto)

```js
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const register = async (req, res) => {
  const hashedPassword = await bcrypt.hash(req.body.password, 10);
  const nuovoUtente = await Utente.create({
    nome: req.body.nome,
    email: req.body.email,
    password: hashedPassword,
  });
  res.status(201).json(nuovoUtente);
};
```

### 🔹 Flusso di Login

1️⃣ L’utente invia credenziali 2️⃣ Il backend recupera l’utente dal database 3️⃣ La password viene **verificata** con bcrypt 4️⃣ Se corretta, viene generato un **JWT Token**

```js
const login = async (req, res) => {
  const utente = await Utente.findOne({ where: { email: req.body.email } });
  if (!utente || !(await bcrypt.compare(req.body.password, utente.password))) {
    return res.status(401).json({ errore: "Credenziali non valide" });
  }
  const token = jwt.sign({ id: utente.id }, process.env.JWT_SECRET, { expiresIn: "1h" });
  res.json({ access_token: token, token_type: "Bearer" });
};
```

---

## 2️⃣ Protezione dell'Autenticazione

✅ **JWT con scadenza e refresh token** ✅ **OAuth2 per login con Google/Facebook** ✅ **Rate Limiting per prevenire brute-force** ✅ **Autenticazione a due fattori (2FA)**

```js
const authMiddleware = (req, res, next) => {
  const token = req.headers.authorization?.split(" ")[1];
  if (!token) return res.status(401).json({ errore: "Token mancante" });
  jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
    if (err) return res.status(403).json({ errore: "Token non valido" });
    req.user = decoded;
    next();
  });
};
```

---

## 3️⃣ Recupero Password e Logout

### 🔹 Reset Password con Token Temporaneo

✅ **L’utente riceve un'email con link per il reset** ✅ **Il link contiene un token a scadenza**

```js
const crypto = require("crypto");
const resetPassword = async (req, res) => {
  const utente = await Utente.findOne({ where: { email: req.body.email } });
  if (!utente) return res.status(404).json({ errore: "Email non trovata" });
  const resetToken = crypto.randomBytes(32).toString("hex");
  utente.resetToken = resetToken;
  utente.tokenScadenza = Date.now() + 3600000; // 1 ora
  await utente.save();
  // Invia email con link per reset password
  res.json({ messaggio: "Email inviata per il reset password" });
};
```

### 🔹 Logout Sicuro

✅ **Invalidazione del token** lato client ✅ **Blacklist per revoca forzata**

```js
const logout = (req, res) => {
  res.json({ messaggio: "Logout effettuato con successo" });
};
```

---

## 4️⃣ Prossimi Passaggi

👉 [Autorizzazione e Ruoli](https://chatgpt.com/c/03_Implementazione/04_Autorizzazione)