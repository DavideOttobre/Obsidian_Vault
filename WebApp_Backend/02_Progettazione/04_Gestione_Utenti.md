# 📌 Gestione Utenti e Permessi

## 🎯 Obiettivo del Documento

Definire il sistema di autenticazione, autorizzazione e gestione degli utenti nel backend della web app.

---

## 1️⃣ Registrazione e Login

### 🔹 Flusso di Registrazione

1️⃣ L’utente invia email e password tramite API 2️⃣ Il backend valida i dati e verifica email duplicata 3️⃣ La password viene **hashata** (bcrypt/argon2) 4️⃣ Il record viene salvato nel database 5️⃣ Viene inviato un **email di conferma** (se richiesto)

```sql
INSERT INTO utenti (nome, email, password, ruolo)
VALUES ('Mario Rossi', 'mario@email.com', 'hashed_password', 'user');
```

### 🔹 Flusso di Login

1️⃣ L’utente invia credenziali 2️⃣ Il backend recupera l’utente dal database 3️⃣ La password viene **verificata** con bcrypt 4️⃣ Se corretta, viene generato un **JWT Token**

```json
{
  "access_token": "jwt_token",
  "token_type": "Bearer"
}
```

---

## 2️⃣ Autenticazione e Sicurezza

✅ **JWT Token** con scadenza e refresh token ✅ **OAuth2** per login con Google/Facebook ✅ **Rate Limiting** per prevenire brute-force ✅ **Autenticazione a due fattori (2FA)** opzionale

```json
{
  "otp": "123456"
}
```

---

## 3️⃣ Ruoli e Permessi

### 🔹 Definizione dei Ruoli

|Ruolo|Permessi|
|---|---|
|Admin|Può gestire utenti, dati e configurazioni|
|User|Può gestire solo i propri dati|
|Guest|Accesso limitato alle API pubbliche|

```sql
UPDATE utenti SET ruolo = 'admin' WHERE email = 'admin@email.com';
```

### 🔹 Middleware per Protezione Endpoint

```js
app.get("/admin", verificaRuolo("admin"), (req, res) => {
  res.json({ msg: "Accesso consentito" });
});
```

---

## 4️⃣ Sicurezza e Protezione dei Dati

✅ **Hashing delle password** con bcrypt/argon2 ✅ **Crittografia dei dati sensibili** con AES ✅ **Protezione da attacchi CSRF/XSS/SQL Injection** ✅ **Gestione delle sessioni e logout sicuro**

```sql
DELETE FROM sessioni WHERE utente_id = 1;
```

---

## 5️⃣ Prossimi Passaggi

👉 [Sicurezza del Backend](https://chatgpt.com/c/02_Progettazione/05_Sicurezza)