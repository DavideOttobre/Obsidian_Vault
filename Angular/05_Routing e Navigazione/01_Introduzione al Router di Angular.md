# Introduzione al Router di Angular

Angular include un **Router integrato** per gestire la navigazione tra pagine in un'applicazione **Single Page Application (SPA)**.

---

## 📌 1. Cos'è il Router di Angular?

✅ **Permette di navigare tra componenti senza ricaricare la pagina**  
✅ **Supporta parametri dinamici nelle URL**  
✅ **Gestisce il caricamento differito (Lazy Loading)**  
✅ **Include protezioni con le Route Guards (`AuthGuard`, `CanActivate`)**  

---

## 📌 2. Configurare il Router in un'Applicazione Angular

Per usare il Router, dobbiamo importare **RouterModule** e definire le rotte.

### **1️⃣ Creare il Modulo di Routing**
Nel file **`app-routing.module.ts`**, definiamo le rotte della nostra applicazione:

```typescript
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { AboutComponent } from './about/about.component';

const routes: Routes = [
  { path: '', component: HomeComponent }, // Homepage
  { path: 'about', component: AboutComponent } // Pagina "About"
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
````

✅ **`RouterModule.forRoot(routes)`** configura il router principale dell'applicazione.

---

### **2️⃣ Importare il Router in `app.module.ts`**

Dobbiamo importare il **modulo di routing** nel nostro `AppModule`:

```typescript
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module'; // Import del router
import { HomeComponent } from './home/home.component';
import { AboutComponent } from './about/about.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    AboutComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule // Aggiunto il modulo di routing
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
```

✅ **Ora l'app può gestire la navigazione tra Home e About.**

---

## 📌 3. Navigare tra le Pagine con `routerLink`

Per creare i link tra le pagine, usiamo **`routerLink`** nei template.

**File `app.component.html`**

```html
<nav>
  <a routerLink="/">Home</a>
  <a routerLink="/about">Chi siamo</a>
</nav>

<router-outlet></router-outlet> <!-- Qui verrà caricato il contenuto -->
```

✅ **`<router-outlet>`** è il punto in cui Angular inserisce il contenuto della pagina attuale.

---

## 📌 4. Navigare Programmaticamente con `Router`

Possiamo cambiare pagina tramite TypeScript usando il servizio `Router`.

**Esempio di navigazione in un componente:**

```typescript
import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  template: `<button (click)="vaiAllaPagina()">Vai alla pagina About</button>`
})
export class HomeComponent {
  constructor(private router: Router) {}

  vaiAllaPagina() {
    this.router.navigate(['/about']);
  }
}
```

✅ **Quando viene premuto il bottone, l'app naviga alla pagina "About".**

---

## 📌 5. Creare Pagine con Parametri Dinamici

Possiamo passare **parametri nelle URL** per visualizzare contenuti personalizzati.

### **1️⃣ Definiamo una rotta con parametro `id`**

Modifichiamo **`app-routing.module.ts`** per aggiungere una rotta dinamica:

```typescript
const routes: Routes = [
  { path: 'profilo/:id', component: ProfiloComponent }
];
```

### **2️⃣ Leggere il parametro `id` nel componente**

**File `profilo.component.ts`**

```typescript
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-profilo',
  template: `<p>Profilo ID: {{ id }}</p>`
})
export class ProfiloComponent implements OnInit {
  id!: string;

  constructor(private route: ActivatedRoute) {}

  ngOnInit() {
    this.id = this.route.snapshot.paramMap.get('id')!;
  }
}
```

### **3️⃣ Passare il parametro nei link**

```html
<a [routerLink]="['/profilo', 123]">Vai al profilo 123</a>
```

✅ **Ora il componente `ProfiloComponent` riceverà l'`id` dalla URL.**

---

## 📌 6. Navigazione con Query Parameters

I **query parameters** sono utili per passare opzioni extra alla rotta.

### **1️⃣ Aggiungere Parametri alla Navigazione**

```typescript
this.router.navigate(['/profilo', 123], { queryParams: { pagina: 1, filtro: 'attivo' } });
```

### **2️⃣ Leggere i Query Parameters**

```typescript
import { ActivatedRoute } from '@angular/router';

ngOnInit() {
  this.route.queryParams.subscribe(params => {
    console.log(params['pagina']); // 1
    console.log(params['filtro']); // 'attivo'
  });
}
```

✅ **Ora possiamo leggere i parametri opzionali dalla URL.**

---

## 📌 7. Rotta di Default e Pagina 404

Se l'utente visita un'URL sconosciuta, possiamo reindirizzarlo a una **pagina 404**.

### **1️⃣ Definire una rotta di fallback**

Modifichiamo **`app-routing.module.ts`**:

```typescript
const routes: Routes = [
  { path: '', component: HomeComponent }, // Home di default
  { path: '**', component: NotFoundComponent } // Qualsiasi URL non trovato
];
```

✅ **Ora se l'utente digita un'URL inesistente, vedrà `NotFoundComponent`.**

---

## 📌 8. Proteggere le Rotte con `AuthGuard`

Possiamo limitare l'accesso a certe pagine con un **AuthGuard**.

### **1️⃣ Creare un AuthGuard**

```sh
ng generate guard auth
```

**File `auth.guard.ts`**

```typescript
import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(private router: Router) {}

  canActivate(): boolean {
    let autenticato = false; // Simulazione autenticazione

    if (!autenticato) {
      this.router.navigate(['/login']); // Reindirizza alla login se non autenticato
      return false;
    }

    return true;
  }
}
```

### **2️⃣ Proteggere una Rotta**

```typescript
const routes: Routes = [
  { path: 'dashboard', component: DashboardComponent, canActivate: [AuthGuard] }
];
```

✅ **Ora la pagina "Dashboard" sarà accessibile solo se `AuthGuard` lo permette.**

---

## 🔥 Conclusione

Abbiamo visto: ✅ **Cos'è il Router di Angular e come configurarlo**  
✅ **Uso di `routerLink` e `router.navigate()` per la navigazione**  
✅ **Passare parametri nelle URL (`:id`, query params)**  
✅ **Creare una pagina 404 per URL inesistenti**  
✅ **Proteggere le rotte con `AuthGuard`**
