# Lazy Loading e Moduli Dinamici in Angular

Il **Lazy Loading** è una tecnica che permette di **caricare solo i moduli necessari**, riducendo il tempo di caricamento iniziale dell'app.

---

## 📌 1. Cos'è il Lazy Loading?

✅ **Carica i moduli solo quando servono**  
✅ **Migliora le prestazioni dell'applicazione**  
✅ **Riduce la dimensione del bundle iniziale**  
✅ **Perfetto per applicazioni con molte pagine o sezioni indipendenti**  

📌 **Angular utilizza `loadChildren` per implementare il Lazy Loading.**

---

## 📌 2. Configurare il Lazy Loading in Angular

Per applicare il **Lazy Loading**, dobbiamo separare l'app in **moduli distinti**.

### **1️⃣ Creiamo un Modulo Lazy**
```sh
ng generate module utenti --route utenti --module app.module
````

🔹 Questo genera **`utenti.module.ts`** e **`utenti-routing.module.ts`**.

---

### **2️⃣ Definiamo le Rotte nel Modulo Lazy**

**File `utenti-routing.module.ts`**

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

### **3️⃣ Configurare il Lazy Loading in `app-routing.module.ts`**

```typescript
const routes: Routes = [
  { path: 'utenti', loadChildren: () => import('./utenti/utenti.module').then(m => m.UtentiModule) }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
```

✅ **Ora il modulo `UtentiModule` verrà caricato solo quando l’utente visita `/utenti`.**

---

## 📌 3. Verificare il Lazy Loading

Possiamo verificare il caricamento **dinamico** aprendo gli strumenti di sviluppo del browser:

1️⃣ Apri la console (`F12` o `Ctrl+Shift+I`)  
2️⃣ Vai alla scheda **Network**  
3️⃣ Naviga su `/utenti`  
4️⃣ Dovresti vedere un nuovo file `.js` caricato dinamicamente

📌 **Angular carica il modulo solo quando necessario!**

---

## 📌 4. Lazy Loading con Lazy Feature Modules

Possiamo dividere l'app in più moduli lazy:

```typescript
const routes: Routes = [
  { path: 'utenti', loadChildren: () => import('./utenti/utenti.module').then(m => m.UtentiModule) },
  { path: 'prodotti', loadChildren: () => import('./prodotti/prodotti.module').then(m => m.ProdottiModule) }
];
```

✅ **Perfetto per applicazioni grandi con sezioni indipendenti.**

---

## 📌 5. Usare Lazy Loading con Lazy Components

Se vogliamo **caricare un componente solo quando serve**, possiamo usare **`import()` direttamente**.

### **1️⃣ Creare un Modulo con un Componente Lazy**

```sh
ng generate module dashboard
ng generate component dashboard/dashboard-home
```

### **2️⃣ Caricare un Componente Lazy nel Routing**

**File `app-routing.module.ts`**

```typescript
const routes: Routes = [
  { path: 'dashboard', loadComponent: () => import('./dashboard/dashboard-home.component').then(m => m.DashboardHomeComponent) }
];
```

✅ **Ora `DashboardHomeComponent` verrà caricato solo quando l'utente visita `/dashboard`.**

---

## 📌 6. Precaricare i Moduli per Velocizzare il Caricamento

Il **preloading** permette di **caricare i moduli in background** dopo il caricamento iniziale dell’app.

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

✅ **Ora i moduli Lazy verranno precaricati in background dopo il caricamento iniziale.**

---

## 📌 7. Creare una Strategia di Preloading Personalizzata

Possiamo **precaricare solo alcuni moduli** invece di tutti.

### **1️⃣ Creiamo una Strategia Personalizzata**

**File `custom-preloading.strategy.ts`**

```typescript
import { PreloadingStrategy, Route } from '@angular/router';
import { Observable, of } from 'rxjs';

export class CustomPreloadingStrategy implements PreloadingStrategy {
  preload(route: Route, load: () => Observable<any>): Observable<any> {
    return route.data?.preload ? load() : of(null);
  }
}
```

---

### **2️⃣ Applichiamo la Strategia Personalizzata**

**File `app-routing.module.ts`**

```typescript
const routes: Routes = [
  { path: 'utenti', loadChildren: () => import('./utenti/utenti.module').then(m => m.UtentiModule), data: { preload: true } },
  { path: 'prodotti', loadChildren: () => import('./prodotti/prodotti.module').then(m => m.ProdottiModule), data: { preload: false } }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { preloadingStrategy: CustomPreloadingStrategy })],
  exports: [RouterModule],
  providers: [CustomPreloadingStrategy]
})
export class AppRoutingModule {}
```

✅ **Ora solo i moduli con `data: { preload: true }` verranno precaricati.**

---

## 📌 8. Lazy Loading con Guardie di Navigazione

Possiamo proteggere le rotte Lazy usando **`CanLoad`**.

### **1️⃣ Creiamo un `AuthGuard` per `CanLoad`**

```sh
ng generate guard auth
```

### **2️⃣ Implementiamo `CanLoad` nel `AuthGuard`**

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

### **3️⃣ Applichiamo `CanLoad` al Modulo Lazy**

```typescript
const routes: Routes = [
  { path: 'utenti', loadChildren: () => import('./utenti/utenti.module').then(m => m.UtentiModule), canLoad: [AuthGuard] }
];
```

✅ **Ora il modulo Lazy non verrà neanche caricato se l’utente non è autenticato.**

---

## 🔥 Conclusione

Abbiamo visto: ✅ **Cos’è il Lazy Loading e perché usarlo**  
✅ **Come separare l'app in moduli Lazy (`loadChildren`)**  
✅ **Lazy Loading per componenti singoli (`loadComponent`)**  
✅ **Come precaricare i moduli per migliorare le performance**  
✅ **Applicare strategie di preloading personalizzate**  
✅ **Proteggere i moduli Lazy con `CanLoad`**
