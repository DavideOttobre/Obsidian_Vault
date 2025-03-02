# Gestione degli Errori nelle API in Angular

Quando effettuiamo chiamate HTTP con Angular, possono verificarsi **errori di rete, errori del server o problemi nei dati ricevuti**. Per gestirli in modo efficace, Angular offre strumenti come **RxJS**, **Interceptor** e gestione centralizzata degli errori.

---

## 📌 1. Tipi di Errori nelle Chiamate API

| Tipo di Errore | Descrizione |
|---------------|------------|
| **Errore Client** | Problemi nel frontend (es. URL errato, timeout) |
| **Errore Server** | Errore del backend (es. `500 Internal Server Error`) |
| **Errore di Connessione** | Nessuna risposta dal server (es. `0 Unknown Error`) |
| **Errore di Autenticazione** | Accesso negato (`401 Unauthorized`) |

---

## 📌 2. Gestione degli Errori con `catchError`

La funzione `catchError` di **RxJS** intercetta gli errori nelle chiamate API e permette di gestirli.

### **1️⃣ Aggiungere `catchError` a un Servizio API**
Modifichiamo il nostro servizio per intercettare gli errori:

**File `api.service.ts`**
```typescript
import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  private apiUrl = 'https://jsonplaceholder.typicode.com/users';

  constructor(private http: HttpClient) {}

  getUtenti(): Observable<any[]> {
    return this.http.get<any[]>(this.apiUrl).pipe(
      catchError(this.gestisciErrore) // Gestione errori
    );
  }

  private gestisciErrore(errore: HttpErrorResponse) {
    let messaggioErrore = 'Errore sconosciuto!';

    if (errore.error instanceof ErrorEvent) {
      // Errore Client
      messaggioErrore = `Errore client: ${errore.error.message}`;
    } else {
      // Errore Server
      messaggioErrore = `Errore server: ${errore.status} - ${errore.message}`;
    }

    console.error(messaggioErrore);
    return throwError(messaggioErrore);
  }
}
````

✅ **Ora, se si verifica un errore, verrà intercettato e mostrato nella console.**

---

## 📌 3. Mostrare l'Errore nel Template

Possiamo visualizzare il messaggio di errore direttamente nell’interfaccia utente.

### **1️⃣ Modificare il Componente**

**File `app.component.ts`**

```typescript
import { Component, OnInit } from '@angular/core';
import { ApiService } from './servizi/api.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html'
})
export class AppComponent implements OnInit {
  utenti: any[] = [];
  erroreMessaggio: string = '';

  constructor(private apiService: ApiService) {}

  ngOnInit() {
    this.apiService.getUtenti().subscribe({
      next: (dati) => this.utenti = dati,
      error: (errore) => this.erroreMessaggio = errore
    });
  }
}
```

### **2️⃣ Modificare il Template**

**File `app.component.html`**

```html
<h2>Lista Utenti</h2>
<p *ngIf="erroreMessaggio" class="errore">{{ erroreMessaggio }}</p>
<ul>
  <li *ngFor="let utente of utenti">{{ utente.name }} - {{ utente.email }}</li>
</ul>
```

✅ **Se si verifica un errore, il messaggio verrà mostrato nel template.**

---

## 📌 4. Gestire Errori Specifici

Possiamo intercettare errori specifici come **404 Not Found** o **401 Unauthorized**.

**Modifica di `gestisciErrore()`**

```typescript
private gestisciErrore(errore: HttpErrorResponse) {
  let messaggioErrore = 'Errore sconosciuto!';
  
  if (errore.error instanceof ErrorEvent) {
    messaggioErrore = `Errore client: ${errore.error.message}`;
  } else {
    switch (errore.status) {
      case 400:
        messaggioErrore = 'Richiesta non valida!';
        break;
      case 401:
        messaggioErrore = 'Non autorizzato!';
        break;
      case 404:
        messaggioErrore = 'Risorsa non trovata!';
        break;
      case 500:
        messaggioErrore = 'Errore interno del server!';
        break;
      default:
        messaggioErrore = `Errore server: ${errore.status} - ${errore.message}`;
    }
  }

  console.error(messaggioErrore);
  return throwError(messaggioErrore);
}
```

✅ **Ora diversi errori hanno messaggi specifici.**

---

## 📌 5. Creare un Interceptor per la Gestione Centralizzata degli Errori

Un **Interceptor** può gestire gli errori in modo centralizzato e ridurre la duplicazione del codice.

### **1️⃣ Creare un Interceptor**

```sh
ng generate service servizi/error-interceptor
```

### **2️⃣ Implementare l'Interceptor**

**File `error-interceptor.service.ts`**

```typescript
import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable()
export class ErrorInterceptorService implements HttpInterceptor {
  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return next.handle(req).pipe(
      catchError((errore: HttpErrorResponse) => {
        let messaggioErrore = 'Errore sconosciuto!';

        if (errore.status === 0) {
          messaggioErrore = 'Errore di rete! Controlla la tua connessione.';
        } else if (errore.status >= 400 && errore.status < 500) {
          messaggioErrore = `Errore client: ${errore.status} - ${errore.message}`;
        } else if (errore.status >= 500) {
          messaggioErrore = 'Errore del server. Riprova più tardi.';
        }

        console.error(messaggioErrore);
        return throwError(messaggioErrore);
      })
    );
  }
}
```

### **3️⃣ Registrare l'Interceptor**

Aggiungiamo l'interceptor ai `providers` in **`app.module.ts`**:

```typescript
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { ErrorInterceptorService } from './servizi/error-interceptor.service';

@NgModule({
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptorService, multi: true }
  ]
})
export class AppModule {}
```

✅ **Ora tutti gli errori HTTP vengono intercettati e gestiti automaticamente.**

---

## 📌 6. Retry con `retry()` di RxJS

Se un'API può avere errori temporanei, possiamo ritentare la richiesta prima di mostrare un errore.

**Aggiungere `retry(3)` nel servizio:**

```typescript
import { retry } from 'rxjs/operators';

getUtenti(): Observable<any[]> {
  return this.http.get<any[]>(this.apiUrl).pipe(
    retry(3), // Ritenta fino a 3 volte in caso di errore
    catchError(this.gestisciErrore)
  );
}
```

✅ **Se la richiesta fallisce, verrà riprovata fino a 3 volte prima di mostrare un errore.**

---

## 🔥 Conclusione

Abbiamo visto: ✅ **Tipi di errori nelle chiamate API**  
✅ **Gestione degli errori con `catchError` in RxJS**  
✅ **Visualizzazione degli errori nel template**  
✅ **Interceptor per la gestione centralizzata degli errori**  
✅ **Ritenti automatici con `retry()`**
