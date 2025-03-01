# 📌 Autorizzazione e Ruoli

## 🎯 Obiettivo del Documento

Implementare un sistema di autorizzazione per limitare l'accesso agli endpoint in base ai ruoli e ai permessi degli utenti.

---

## 1️⃣ Definizione dei Ruoli

### 🔹 Ruoli disponibili

|Ruolo|Permessi|
|---|---|
|Admin|Accesso completo a tutte le funzionalità|
|User|Accesso limitato alle proprie risorse|
|Guest|Accesso solo alle API pubbliche|

### 🔹 Assegnazione dei ruoli nel database

```sql
UPDATE utenti SET ruolo = 'admin' WHERE email = 'admin@email.com';
```

---

## 2️⃣ Middleware per il Controllo dei Ruoli

### 🔹 Middleware per proteggere endpoint riservati

```js
const autorizzaRuolo = (ruoliPermessi) => {
  return (req, res, next) => {
    if (!ruoliPermessi.includes(req.user.ruolo)) {
      return res.status(403).json({ errore: "Accesso negato" });
    }
    next();
  };
};
```

### 🔹 Esempio di utilizzo nelle rotte

```js
app.get("/admin", authMiddleware, autorizzaRuolo(["admin"]), (req, res) => {
  res.json({ messaggio: "Accesso consentito" });
});
```

---

## 3️⃣ Gestione delle Autorizzazioni nelle API

✅ **Verifica del ruolo prima di eseguire operazioni CRUD** ✅ **Limitazione degli accessi agli utenti autorizzati** ✅ **Controllo dinamico dei permessi in base al ruolo**

```js
const verificaPermessi = (req, res, next) => {
  if (req.user.id !== req.params.id && req.user.ruolo !== "admin") {
    return res.status(403).json({ errore: "Non hai il permesso per questa operazione" });
  }
  next();
};
```

---
