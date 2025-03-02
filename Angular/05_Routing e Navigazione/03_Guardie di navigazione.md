# Guardie di Navigazione in Angular

Le **Guardie di Navigazione** (Route Guards) in Angular permettono di proteggere le rotte e controllare se un utente può accedere a una determinata pagina.

---

## 📌 1. Cos'è una Guardia di Navigazione?

Le **Route Guards** sono servizi che si interfacciano con il Router per decidere **se consentire o bloccare l’accesso a una rotta**.

✅ **Proteggono le pagine riservate** (es. Dashboard, Profilo)  
✅ **Eseguono controlli prima di caricare una pagina**  
✅ **Possono reindirizzare l’utente a un’altra rotta**  
✅ **Supportano logiche asincrone** (es. verifica login via API)  

---

## 📌 2. Tipi di Guardie in Angular

| Tipo di Guardia | Interfaccia | Descrizione |
|---------------|-------------|------------|
| **`CanActivate`** | `canActivate()` | Controlla se l'utente può accedere a una rotta |
| **`CanActivateChild`** | `canActivateChild()` | Controlla se i figli di una rotta sono accessibili |
| **`CanDeactivate`** | `canDeactivate()` | Chiede conferma prima di lasciare una pagina |
| **`Resolve`** | `resolve()` | Recupera dati prima di attivare una rotta |
| **`CanLoad`** | `canLoad()` | Impedisce il caricamento di un modulo se non autorizzato |

---

## 📌 3. Creare una Guardia `CanActivate` per Proteggere le Rotte

Per creare una guardia, usiamo Angular CLI:
```sh
ng generate guard auth
````

Questo genera il file **`auth.guard.ts`** con una struttura di base.

### **1️⃣ Implementare `CanActivate`**

Modifichiamo **`auth.guard.ts`** per controllare se l'utente è autenticato:

```typescript
import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(private router: Router) {}

  canActivate(): boolean {
    const autenticato = false; // Simulazione autenticazione

    if (!autenticato) {
      this.router.navigate(['/login']); // Se non è autenticato, reindirizza
      return false;
    }

    return true; // Se è autenticato, può accedere alla pagina
  }
}
```

✅ **Ora, se `autenticato` è `false`, l'utente verrà reindirizzato a `/login`.**

---

## 📌 4. Applicare `CanActivate` a una Rotta

Per proteggere una rotta, aggiungiamo `canActivate` nel file **`app-routing.module.ts`**:

```typescript
import { AuthGuard } from './auth.guard';

const routes: Routes = [
  { path: 'dashboard', component: DashboardComponent, canActivate: [AuthGuard] }
];
```

✅ **Ora l’utente può accedere a `/dashboard` solo se `AuthGuard` restituisce `true`.**

---

## 📌 5. Proteggere Rotte Figlie con `CanActivateChild`

Possiamo proteggere tutte le sottorotte di una sezione con `CanActivateChild`.

### **1️⃣ Creiamo `auth.guard.ts` con `CanActivateChild`**

```typescript
import { Injectable } from '@angular/core';
import { CanActivateChild, Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivateChild {
  constructor(private router: Router) {}

  canActivateChild(): boolean {
    const autenticato = false; // Simulazione autenticazione

    if (!autenticato) {
      this.router.navigate(['/login']);
      return false;
    }

    return true;
  }
}
```

### **2️⃣ Applichiamo `canActivateChild` nel `app-routing.module.ts`**

```typescript
const routes: Routes = [
  {
    path: 'admin',
    canActivateChild: [AuthGuard],
    children: [
      { path: 'utenti', component: UtentiComponent },
      { path: 'report', component: ReportComponent }
    ]
  }
];
```

✅ **Ora tutte le rotte dentro `/admin` sono protette.**

---

## 📌 6. Chiedere Conferma prima di Lasciare una Pagina con `CanDeactivate`

Se un utente sta compilando un modulo, possiamo chiedere **conferma prima di lasciare la pagina**.

### **1️⃣ Creiamo `can-deactivate.guard.ts`**

```sh
ng generate guard can-deactivate
```

### **2️⃣ Implementiamo `CanDeactivate`**

```typescript
import { Injectable } from '@angular/core';
import { CanDeactivate } from '@angular/router';

export interface CanExit {
  canExit: () => boolean;
}

@Injectable({
  providedIn: 'root'
})
export class CanDeactivateGuard implements CanDeactivate<CanExit> {
  canDeactivate(component: CanExit): boolean {
    return component.canExit ? component.canExit() : true;
  }
}
```

✅ **Ora qualsiasi componente può implementare `canExit()` per bloccare la navigazione.**

### **3️⃣ Implementiamo `canExit()` in un Componente**

```typescript
import { Component } from '@angular/core';
import { CanExit } from '../guards/can-deactivate.guard';

@Component({
  selector: 'app-modulo',
  template: `
    <h2>Modulo</h2>
    <input [(ngModel)]="dati" placeholder="Scrivi qualcosa">
  `
})
export class ModuloComponent implements CanExit {
  dati: string = '';

  canExit(): boolean {
    return this.dati === '' || confirm('Vuoi davvero lasciare la pagina?');
  }
}
```

✅ **Ora l'utente riceverà un messaggio di conferma se ha modificato il modulo.**

### **4️⃣ Applichiamo `CanDeactivate` nel Routing**

```typescript
const routes: Routes = [
  { path: 'modulo', component: ModuloComponent, canDeactivate: [CanDeactivateGuard] }
];
```

---

## 📌 7. Recuperare Dati Prima di Caricare una Pagina con `Resolve`

Se una pagina deve **caricare dati prima di essere visualizzata**, possiamo usare `Resolve`.

### **1️⃣ Creiamo `dati-resolver.service.ts`**

```sh
ng generate service dati-resolver
```

### **2️⃣ Implementiamo `Resolve`**

```typescript
import { Injectable } from '@angular/core';
import { Resolve } from '@angular/router';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DatiResolverService implements Resolve<any> {
  resolve(): Observable<any> {
    return of(['Alice', 'Bob', 'Carlo']); // Simulazione dati da API
  }
}
```

### **3️⃣ Applichiamo `resolve` nel Routing**

```typescript
const routes: Routes = [
  { path: 'utenti', component: UtentiComponent, resolve: { utenti: DatiResolverService } }
];
```

### **4️⃣ Leggere i Dati in `UtentiComponent`**

```typescript
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-utenti',
  template: `<ul><li *ngFor="let utente of utenti">{{ utente }}</li></ul>`
})
export class UtentiComponent implements OnInit {
  utenti: string[] = [];

  constructor(private route: ActivatedRoute) {}

  ngOnInit() {
    this.utenti = this.route.snapshot.data['utenti'];
  }
}
```

✅ **Ora i dati vengono caricati prima di visualizzare la pagina.**

---

## 🔥 Conclusione

Abbiamo visto: ✅ **Cos'è una Guardia di Navigazione e perché usarla**  
✅ **`CanActivate` per proteggere le pagine**  
✅ **`CanActivateChild` per proteggere rotte figlie**  
✅ **`CanDeactivate` per chiedere conferma prima di uscire da una pagina**  
✅ **`Resolve` per caricare dati prima di visualizzare una pagina**
