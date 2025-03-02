# Routing Avanzato in Angular

Dopo aver visto le basi del **Router di Angular**, esploriamo funzionalità avanzate come **Lazy Loading**, **Named Outlets**, **Guards avanzate** e **Strategie di Navigazione**.

---

## 📌 1. Lazy Loading: Caricamento Moduli su Richiesta

Il **Lazy Loading** permette di caricare i moduli solo quando sono necessari, migliorando le prestazioni dell’app.

### **1️⃣ Creare un Modulo Lazy**
Creiamo un modulo separato per una sezione dell’app:
```sh
ng generate module utenti --route utenti --module app.module
````

🔹 Questo genera **`utenti.module.ts`** e **`utenti-routing.module.ts`**.

---

### **2️⃣ Configurare `utenti-routing.module.ts`**

```typescript
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ListaUtentiComponent } from './lista-utenti/lista-utenti.component';

const routes: Routes = [{ path: '', component: ListaUtentiComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UtentiRoutingModule {}
```

✅ **Ora il modulo `UtentiModule` ha il proprio file di routing.**

---

### **3️⃣ Importare il Modulo in `app-routing.module.ts`**

```typescript
const routes: Routes = [
  { path: 'utenti', loadChildren: () => import('./utenti/utenti.module').then(m => m.UtentiModule) }
];
```

✅ **Il modulo verrà caricato solo quando l’utente visita `/utenti`.**

---

## 📌 2. Named Outlets: Più Contenuti su una Pagina

Possiamo usare **Named Outlets** per caricare più componenti nella stessa pagina.

### **1️⃣ Definire Named Outlets in `app-routing.module.ts`**

```typescript
const routes: Routes = [
  { path: 'dashboard', component: DashboardComponent, outlet: 'secondario' }
];
```

### **2️⃣ Usare Named Outlets nel Template**

```html
<router-outlet></router-outlet>  <!-- Outlet principale -->
<router-outlet name="secondario"></router-outlet> <!-- Outlet secondario -->
```

### **3️⃣ Navigare verso un Named Outlet**

```typescript
this.router.navigate([{ outlets: { secondario: ['dashboard'] } }]);
```

✅ **Ora `DashboardComponent` verrà caricato nell’outlet secondario.**

---

## 📌 3. Strategie di Navigazione (`LocationStrategy`)

Angular supporta due modalità di navigazione:

|Tipo|Descrizione|Esempio|
|---|---|---|
|**PathLocationStrategy** (Default)|URL leggibili|`/profilo/123`|
|**HashLocationStrategy**|Compatibile con vecchi server|`/#/profilo/123`|

### **1️⃣ Abilitare `HashLocationStrategy`**

```typescript
import { HashLocationStrategy, LocationStrategy } from '@angular/common';

@NgModule({
  providers: [{ provide: LocationStrategy, useClass: HashLocationStrategy }]
})
export class AppModule {}
```

✅ **Ora tutte le URL useranno il simbolo `#`.**

---

## 📌 4. Reindirizzamenti Automatici con `redirectTo`

Possiamo reindirizzare automaticamente l’utente a una pagina predefinita.

### **1️⃣ Esempio di Redirect su Homepage**

```typescript
const routes: Routes = [
  { path: '', redirectTo: '/home', pathMatch: 'full' }
];
```

✅ **Se un utente visita `/`, verrà reindirizzato a `/home`.**

---

## 📌 5. Gestire Parametri Multipli nella Navigazione

Possiamo passare **più parametri** contemporaneamente in un URL.

### **1️⃣ Definire la Rotta**

```typescript
{ path: 'dettagli/:categoria/:id', component: DettagliComponent }
```

### **2️⃣ Navigare Programmaticamente con Più Parametri**

```typescript
this.router.navigate(['/dettagli', 'libri', 123]);
```

✅ **Ora l’URL sarà `/dettagli/libri/123`.**

---

## 📌 6. Passare Stati tra le Pagine con `NavigationExtras`

Possiamo passare dati senza inserirli nell’URL usando `NavigationExtras`.

### **1️⃣ Passare Dati alla Navigazione**

```typescript
this.router.navigate(['/dettagli'], { state: { nome: 'Mario Rossi' } });
```

### **2️⃣ Recuperare i Dati nella Pagina Destinazione**

```typescript
import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-dettagli',
  template: `<p>Nome: {{ dati?.nome }}</p>`
})
export class DettagliComponent {
  dati: any = history.state;

  constructor() {}
}
```

✅ **I dati vengono passati senza essere visibili nella URL.**

---

## 📌 7. Precaricamento delle Rotte (`PreloadingStrategy`)

Possiamo precaricare i moduli Lazy Loading per migliorare la velocità dell’app.

### **1️⃣ Abilitare il Preloading in `app-routing.module.ts`**

```typescript
import { PreloadAllModules } from '@angular/router';

const routes: Routes = [
  { path: 'utenti', loadChildren: () => import('./utenti/utenti.module').then(m => m.UtentiModule) }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })],
  exports: [RouterModule]
})
export class AppRoutingModule {}
```

✅ **Ora i moduli verranno caricati in background dopo il caricamento iniziale.**

---

## 📌 8. Scroll Position Restoration (Mantenere lo Scrolling)

Angular permette di **mantenere la posizione di scroll** durante la navigazione.

### **1️⃣ Abilitare il Salvataggio della Posizione di Scroll**

```typescript
@NgModule({
  imports: [RouterModule.forRoot(routes, { scrollPositionRestoration: 'enabled' })]
})
export class AppRoutingModule {}
```

✅ **Quando un utente torna indietro, la pagina sarà nella stessa posizione di prima.**

---

## 📌 9. Proteggere le Rotte con `Guards` Avanzate

### **1️⃣ Proteggere il Caricamento di un Modulo con `CanLoad`**

`CanLoad` impedisce il caricamento di un modulo se l’utente non è autorizzato.

**File `auth.guard.ts`**

```typescript
import { Injectable } from '@angular/core';
import { CanLoad, Route, Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanLoad {
  constructor(private router: Router) {}

  canLoad(route: Route): boolean {
    const autenticato = false; // Simulazione autenticazione

    if (!autenticato) {
      this.router.navigate(['/login']);
      return false;
    }

    return true;
  }
}
```

**Applicare `CanLoad` a un Modulo Lazy**

```typescript
const routes: Routes = [
  { path: 'utenti', loadChildren: () => import('./utenti/utenti.module').then(m => m.UtentiModule), canLoad: [AuthGuard] }
];
```

✅ **Ora il modulo non verrà nemmeno scaricato se l’utente non è autorizzato.**

---

## 🔥 Conclusione

Abbiamo visto: ✅ **Lazy Loading per migliorare le prestazioni**  
✅ **Named Outlets per più sezioni visibili**  
✅ **Strategie di navigazione (`HashLocationStrategy`)**  
✅ **Redirect e reindirizzamenti automatici**  
✅ **Passaggio di dati con parametri e `NavigationExtras`**  
✅ **Precaricamento delle rotte (`PreloadAllModules`)**  
✅ **Protezione avanzata con `CanLoad`**
