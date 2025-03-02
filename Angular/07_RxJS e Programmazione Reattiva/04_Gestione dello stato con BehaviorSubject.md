# Gestione dello Stato con `BehaviorSubject` in Angular

In Angular, la gestione dello stato può essere semplificata usando **RxJS** e in particolare **`BehaviorSubject`** per condividere dati tra componenti senza bisogno di `@Input()` e `@Output()`.

---

## 📌 1. Cos'è un `BehaviorSubject`?

`BehaviorSubject` è un tipo speciale di **Observable** che:

✅ **Mantiene sempre l'ultimo valore** e lo emette ai nuovi subscriber  
✅ **Permette sia di emettere (`next()`) che ricevere (`subscribe()`) dati**  
✅ **È perfetto per condividere lo stato tra componenti in Angular**  

📌 **Ideale per gestire dati globali come autenticazione, temi, impostazioni utente.**

---

## 📌 2. Differenza tra `Subject`, `BehaviorSubject` e `ReplaySubject`

| Tipo | Descrizione | Mantiene Ultimo Valore? |
|------|------------|----------------|
| **`Subject`** | Emette solo ai subscriber attivi | ❌ |
| **`BehaviorSubject`** | Memorizza il valore più recente e lo invia ai nuovi subscriber | ✅ |
| **`ReplaySubject(n)`** | Memorizza gli ultimi `n` valori e li invia ai nuovi subscriber | ✅ (più valori) |

---

## 📌 3. Creare un Servizio di Stato con `BehaviorSubject`

Possiamo usare `BehaviorSubject` in un **servizio Angular** per gestire dati globali.

### **1️⃣ Creiamo il Servizio**
```sh
ng generate service servizi/stato
````

### **2️⃣ Implementiamo `BehaviorSubject` nel Servizio**

**File `stato.service.ts`**

```typescript
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class StatoService {
  private stato = new BehaviorSubject<string>('offline'); // Valore iniziale
  statoCorrente = this.stato.asObservable(); // Observable per i componenti

  constructor() {}

  aggiornaStato(nuovoStato: string) {
    this.stato.next(nuovoStato); // Emette il nuovo valore
  }
}
```

✅ **Ora `statoCorrente` è un Observable che emette l'ultimo stato aggiornato.**

---

## 📌 4. Usare `BehaviorSubject` nei Componenti

Ora possiamo usare il **servizio** nei componenti per **leggere e aggiornare** lo stato.

### **1️⃣ Lettura dello Stato nel Componente**

**File `app.component.ts`**

```typescript
import { Component, OnInit } from '@angular/core';
import { StatoService } from './servizi/stato.service';

@Component({
  selector: 'app-root',
  template: `<h2>Stato attuale: {{ stato }}</h2>`
})
export class AppComponent implements OnInit {
  stato: string = '';

  constructor(private statoService: StatoService) {}

  ngOnInit() {
    this.statoService.statoCorrente.subscribe(valore => {
      this.stato = valore; // Aggiorna lo stato quando cambia
    });
  }
}
```

✅ **Ogni volta che lo stato cambia, il valore viene aggiornato nel componente.**

---

### **2️⃣ Modifica dello Stato da un Altro Componente**

**File `status-update.component.ts`**

```typescript
import { Component } from '@angular/core';
import { StatoService } from '../servizi/stato.service';

@Component({
  selector: 'app-status-update',
  template: `
    <button (click)="setOnline()">Online</button>
    <button (click)="setOffline()">Offline</button>
  `
})
export class StatusUpdateComponent {
  constructor(private statoService: StatoService) {}

  setOnline() {
    this.statoService.aggiornaStato('online');
  }

  setOffline() {
    this.statoService.aggiornaStato('offline');
  }
}
```

---

## 📌 5. Usare `BehaviorSubject` per Condividere Dati tra Componenti

### **1️⃣ Layout del Template**

**File `app.component.html`**

```html
<h2>Stato Attuale: {{ stato }}</h2>
<app-status-update></app-status-update>
```

Ora, quando un componente aggiorna lo stato, tutti gli altri lo ricevono automaticamente.

✅ **Non serve più `@Input()` o `@Output()`.**  
✅ **I dati rimangono sincronizzati tra tutti i componenti.**

---

## 📌 6. Usare `BehaviorSubject` per la Gestione dell'Autenticazione

Possiamo usare `BehaviorSubject` per **gestire lo stato di autenticazione**.

### **1️⃣ Servizio di Autenticazione**

**File `auth.service.ts`**

```typescript
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private utenteAutenticato = new BehaviorSubject<boolean>(false);
  isAutenticato = this.utenteAutenticato.asObservable();

  login() {
    this.utenteAutenticato.next(true);
  }

  logout() {
    this.utenteAutenticato.next(false);
  }
}
```

---

### **2️⃣ Proteggere una Rotta con `AuthGuard`**

```typescript
import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(private authService: AuthService, private router: Router) {}

  canActivate(): boolean {
    let autenticato = false;
    this.authService.isAutenticato.subscribe(val => autenticato = val);

    if (!autenticato) {
      this.router.navigate(['/login']);
      return false;
    }
    return true;
  }
}
```

---

## 📌 7. Recuperare l'Ultimo Valore con `getValue()`

Se vogliamo recuperare il valore attuale senza sottoscriverci:

```typescript
const statoAttuale = this.statoService.stato.getValue();
console.log('Stato attuale:', statoAttuale);
```

✅ **Perfetto quando servono dati immediati senza creare una sottoscrizione.**

---

## 📌 8. Differenza tra `asObservable()` e `getValue()`

|Metodo|Descrizione|
|---|---|
|**`asObservable()`**|Permette ai componenti di iscriversi ai cambiamenti senza modificarne il valore|
|**`getValue()`**|Restituisce il valore attuale immediatamente|

📌 **Usa `asObservable()` nei componenti per prevenire modifiche accidentali al `BehaviorSubject`.**

---

## 📌 9. Quando Usare `BehaviorSubject` in Angular?

✅ **Quando vogliamo mantenere uno stato globale** (es. autenticazione, temi, impostazioni)  
✅ **Quando più componenti devono condividere dati in tempo reale**  
✅ **Quando dobbiamo recuperare immediatamente il valore più recente**

📌 **Non usarlo per dati effimeri (es. risultati di ricerca temporanei).**

---

## 🔥 Conclusione

Abbiamo visto: 
✅ **Cos’è e come funziona `BehaviorSubject`**  
✅ **Come usarlo per gestire lo stato in un servizio Angular**  
✅ **Come condividere dati tra componenti senza `@Input()` e `@Output()`**  
✅ **Come usarlo per la gestione dell’autenticazione**  
✅ **Differenza tra `asObservable()` e `getValue()`**
