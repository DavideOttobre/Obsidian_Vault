# `HttpClient` e Chiamate API in Angular

Il modulo **`HttpClientModule`** di Angular permette di eseguire chiamate HTTP per comunicare con API esterne.

---

## 📌 1. Cos'è `HttpClient`?

✅ **Permette di eseguire richieste HTTP (`GET`, `POST`, `PUT`, `DELETE`)**  
✅ **Supporta la programmazione reattiva con `Observable`**  
✅ **Gestisce errori e interceptor per il controllo delle richieste**  
✅ **Fornisce supporto per la gestione di header e parametri**  

📌 **`HttpClient` è il modulo principale per interagire con API RESTful.**

---

## 📌 2. Importare `HttpClientModule`

Per usare `HttpClient`, dobbiamo importare il modulo in **`app.module.ts`**:

```typescript
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppComponent } from './app.component';
import { HttpClientModule } from '@angular/common/http'; // Import del modulo

@NgModule({
  declarations: [AppComponent],
  imports: [BrowserModule, HttpClientModule], // Aggiunto HttpClientModule
  bootstrap: [AppComponent]
})
export class AppModule {}
````

✅ **Ora possiamo usare `HttpClient` nei servizi per eseguire richieste API.**

---

## 📌 3. Creazione di un Servizio per le API

Creiamo un servizio per interagire con un'API REST.

```sh
ng generate service servizi/api
```

**File `api.service.ts`**

```typescript
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  private apiUrl = 'https://jsonplaceholder.typicode.com/users'; // URL API di esempio

  constructor(private http: HttpClient) {}

  getUtenti(): Observable<any[]> {
    return this.http.get<any[]>(this.apiUrl);
  }
}
```

✅ **Il metodo `getUtenti()` restituisce un `Observable`, che verrà sottoscritto nei componenti.**

---

## 📌 4. Chiamare l'API da un Componente

Usiamo il servizio nel nostro **`app.component.ts`** per recuperare i dati dagli utenti.

```typescript
import { Component, OnInit } from '@angular/core';
import { ApiService } from './servizi/api.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html'
})
export class AppComponent implements OnInit {
  utenti: any[] = [];

  constructor(private apiService: ApiService) {}

  ngOnInit() {
    this.apiService.getUtenti().subscribe((dati) => {
      this.utenti = dati;
    });
  }
}
```

✅ **Il metodo `subscribe()` permette di ricevere i dati quando l'Observable emette un valore.**

---

## 📌 5. Visualizzare i Dati nel Template

Modifichiamo **`app.component.html`** per mostrare gli utenti:

```html
<h2>Lista Utenti</h2>
<ul>
  <li *ngFor="let utente of utenti">{{ utente.name }} - {{ utente.email }}</li>
</ul>
```

✅ **Ora i dati recuperati dall'API vengono mostrati nel template.**

---

## 📌 6. Eseguire Richieste `POST`, `PUT`, `DELETE`

### **1️⃣ `POST` - Creare un nuovo utente**

```typescript
aggiungiUtente(nuovoUtente: any): Observable<any> {
  return this.http.post<any>(this.apiUrl, nuovoUtente);
}
```

📌 **Esempio di utilizzo:**

```typescript
this.apiService.aggiungiUtente({ name: 'Mario Rossi', email: 'mario@mail.com' })
  .subscribe(risposta => console.log('Utente creato:', risposta));
```

---

### **2️⃣ `PUT` - Aggiornare un utente**

```typescript
aggiornaUtente(id: number, dati: any): Observable<any> {
  return this.http.put<any>(`${this.apiUrl}/${id}`, dati);
}
```

📌 **Esempio di utilizzo:**

```typescript
this.apiService.aggiornaUtente(1, { name: 'Mario Updated' })
  .subscribe(risposta => console.log('Utente aggiornato:', risposta));
```

---

### **3️⃣ `DELETE` - Eliminare un utente**

```typescript
eliminaUtente(id: number): Observable<any> {
  return this.http.delete<any>(`${this.apiUrl}/${id}`);
}
```

📌 **Esempio di utilizzo:**

```typescript
this.apiService.eliminaUtente(1)
  .subscribe(() => console.log('Utente eliminato'));
```

---

## 📌 7. Gestire Errori con `catchError`

Per gestire errori, possiamo usare `catchError` di RxJS.

**Modifichiamo `api.service.ts` per gestire errori:**

```typescript
import { HttpErrorResponse } from '@angular/common/http';
import { catchError, throwError } from 'rxjs';

getUtenti(): Observable<any[]> {
  return this.http.get<any[]>(this.apiUrl).pipe(
    catchError(this.gestisciErrore)
  );
}

private gestisciErrore(errore: HttpErrorResponse) {
  let messaggioErrore = 'Errore sconosciuto!';
  if (errore.error instanceof ErrorEvent) {
    messaggioErrore = `Errore client: ${errore.error.message}`;
  } else {
    messaggioErrore = `Errore server: ${errore.status}, ${errore.message}`;
  }
  console.error(messaggioErrore);
  return throwError(messaggioErrore);
}
```

✅ **Ora gli errori vengono gestiti e mostrati nella console.**

---

## 📌 8. Interceptor per Modificare le Richieste

Gli **interceptor** permettono di modificare le richieste prima che vengano inviate.

### **1️⃣ Creare un Interceptor**

```sh
ng generate service servizi/auth-interceptor
```

### **2️⃣ Implementare l'Interceptor**

**File `auth-interceptor.service.ts`**

```typescript
import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable()
export class AuthInterceptorService implements HttpInterceptor {
  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const token = 'TOKEN_DI_AUTENTICAZIONE';
    const reqModificata = req.clone({
      setHeaders: {
        Authorization: `Bearer ${token}`
      }
    });
    return next.handle(reqModificata);
  }
}
```

### **3️⃣ Registrare l'Interceptor in `app.module.ts`**

```typescript
import { HTTP_INTERCEPTORS } from '@angular/common/http';

@NgModule({
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptorService, multi: true }
  ]
})
export class AppModule {}
```

✅ **Ora tutte le richieste HTTP avranno l'header di autenticazione automaticamente.**

---

## 🔥 Conclusione

Abbiamo visto: ✅ **Cos'è `HttpClient` e come importarlo**  
✅ **Come creare un servizio per chiamare API REST**  
✅ **Eseguire richieste `GET`, `POST`, `PUT`, `DELETE`**  
✅ **Gestire errori con `catchError`**  
✅ **Usare Interceptor per aggiungere header alle richieste**
