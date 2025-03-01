# 📌 Documentazione degli Endpoint API

## 🎯 Obiettivo del Documento

Descrivere gli endpoint API disponibili, i parametri richiesti e le risposte previste.

---

## 1️⃣ Struttura Generale delle API

✅ **Base URL**: `https://api.miosito.com` 
✅ **Formato di risposta**: JSON 
✅ **Autenticazione**: Token JWT

---

## 2️⃣ Endpoint Utenti

### 🔹 Registrazione

|Metodo|Endpoint|Autenticazione|Parametri|Risposta|
|---|---|---|---|---|
|`POST`|`/api/utenti/register`|❌ No|`nome, email, password`|`201 Created`|

```json
{
  "id": 1,
  "nome": "Mario Rossi",
  "email": "mario@example.com",
  "token": "eyJhbGciOiJIUzI1N..."
}
```

### 🔹 Login

|Metodo|Endpoint|Autenticazione|Parametri|Risposta|
|---|---|---|---|---|
|`POST`|`/api/utenti/login`|❌ No|`email, password`|`200 OK`|

```json
{
  "token": "eyJhbGciOiJIUzI1N..."
}
```

### 🔹 Profilo Utente

|Metodo|Endpoint|Autenticazione|Parametri|Risposta|
|---|---|---|---|---|
|`GET`|`/api/utenti/me`|✅ Sì (JWT)|Nessuno|`200 OK`|

```json
{
  "id": 1,
  "nome": "Mario Rossi",
  "email": "mario@example.com"
}
```

---

## 3️⃣ Endpoint Dati

### 🔹 Ottenere tutti i dati

|Metodo|Endpoint|Autenticazione|Parametri|Risposta|
|---|---|---|---|---|
|`GET`|`/api/dati`|✅ Sì (JWT)|Nessuno|`200 OK`|

```json
[
  { "id": 1, "titolo": "Dato 1", "descrizione": "Descrizione 1" },
  { "id": 2, "titolo": "Dato 2", "descrizione": "Descrizione 2" }
]
```

### 🔹 Creare un nuovo dato

|Metodo|Endpoint|Autenticazione|Parametri|Risposta|
|---|---|---|---|---|
|`POST`|`/api/dati`|✅ Sì (JWT)|`titolo, descrizione`|`201 Created`|

```json
{
  "id": 3,
  "titolo": "Nuovo Dato",
  "descrizione": "Dettagli del nuovo dato"
}
```

### 🔹 Aggiornare un dato

|Metodo|Endpoint|Autenticazione|Parametri|Risposta|
|---|---|---|---|---|
|`PUT`|`/api/dati/:id`|✅ Sì (JWT)|`titolo, descrizione`|`200 OK`|

```json
{
  "id": 3,
  "titolo": "Dato Aggiornato",
  "descrizione": "Nuova descrizione"
}
```

### 🔹 Eliminare un dato

|Metodo|Endpoint|Autenticazione|Parametri|Risposta|
|---|---|---|---|---|
|`DELETE`|`/api/dati/:id`|✅ Sì (JWT)|Nessuno|`204 No Content`|

---

## 4️⃣ Prossimi Passaggi

👉 [Struttura del Database](https://chatgpt.com/c/07_Documentazione/02_Struttura_DB)