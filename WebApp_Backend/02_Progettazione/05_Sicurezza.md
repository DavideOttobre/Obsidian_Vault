# 📌 Sicurezza del Backend

## 🎯 Obiettivo del Documento

Garantire la sicurezza del backend della web app proteggendo i dati, l'autenticazione e prevenendo attacchi informatici.

---

## 1️⃣ Protezione dell'Autenticazione

✅ **Hashing delle password** con bcrypt/argon2 ✅ **Utilizzo di JWT con scadenza e refresh token** ✅ **Autenticazione a due fattori (2FA)** con codice OTP ✅ **OAuth2 per autenticazione con terze parti**

```js
const hashPassword = async (password) => {
  return await bcrypt.hash(password, 10);
};
```

---

## 2️⃣ Protezione contro Attacchi

✅ **Prevenzione SQL Injection** con query parametrizzate ✅ **Protezione da XSS** con sanitizzazione degli input ✅ **Rate Limiting** per evitare attacchi brute force ✅ **CORS** configurato correttamente

```js
app.use(helmet()); // Protezione da attacchi comuni
app.use(limiter); // Limitazione richieste API
```

```sql
SELECT * FROM utenti WHERE email = ?;
```

---

## 3️⃣ Sicurezza della Comunicazione

✅ **Abilitazione HTTPS** con certificati SSL ✅ **Utilizzo di Secure Headers (Helmet in Node.js)** ✅ **Crittografia dei dati sensibili** con AES-256 ✅ **Protezione delle API con API Key**

```json
{
  "api_key": "123456789abcdef"
}
```

---

## 4️⃣ Logging e Monitoraggio

✅ **Centralizzazione dei log** con Winston o Sentry ✅ **Tracciamento delle attività sospette** ✅ **Alert per errori critici**

```js
logger.error("Tentativo di accesso non autorizzato");
```

---

## 5️⃣ Backup e Disaster Recovery

✅ **Backup automatico del database** ✅ **Replica dei dati per alta disponibilità** ✅ **Piano di ripristino in caso di attacco o guasto**

```sh
db_backup.sh --auto
```

---

## 6️⃣ Prossimi Passaggi

👉 [Setup dell'Ambiente](https://chatgpt.com/c/03_Implementazione/01_Setup_Ambiente)