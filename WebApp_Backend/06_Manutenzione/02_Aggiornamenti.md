# 📌 Gestione degli Aggiornamenti

## 🎯 Obiettivo del Documento

Definire le migliori pratiche per gestire aggiornamenti e nuove versioni del backend senza downtime.

---

## 1️⃣ Versionamento delle API

✅ **Versioning negli endpoint** (es. `/api/v1/dati`) ✅ **Deprecazione controllata delle vecchie versioni** ✅ **Backward Compatibility per non interrompere i client**

```js
app.use("/api/v1", require("./routes/v1"));
app.use("/api/v2", require("./routes/v2"));
```

---

## 2️⃣ Deploy Zero-Downtime

✅ **Blue-Green Deployment** (due ambienti di produzione, uno attivo, uno in attesa) ✅ **Rolling Updates** (aggiornamenti incrementali senza spegnere il servizio) ✅ **Canary Releases** (rilascio graduale a un sottoinsieme di utenti)

```sh
# Esempio di rolling update con Docker
sudo docker service update --image backend:v2 backend_service
```

---

## 3️⃣ Automazione degli Aggiornamenti

✅ **CI/CD con GitHub Actions, GitLab CI o Jenkins** ✅ **Test automatici prima di ogni deploy** ✅ **Rollback automatico in caso di errore**

```yaml
name: Deploy Backend
on: [push]

jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
      - name: Checkout repository
        uses: actions/checkout@v2
      - name: Eseguire i test
        run: npm test
      - name: Deploy su server
        run: ssh root@server "cd /backend && git pull && pm2 restart all"
```

---

## 4️⃣ Backup e Ripristino

✅ **Backup automatico del database prima di ogni aggiornamento** ✅ **Snapshot del server per ripristino rapido** ✅ **Replica dei dati per alta disponibilità**

```sh
pg_dump -U user -h localhost -F c -b -v -f "backup_db.sql" mydb
```

---

## 5️⃣ Prossimi Passaggi

👉 [Logging e Audit](https://chatgpt.com/c/06_Manutenzione/03_Logging)