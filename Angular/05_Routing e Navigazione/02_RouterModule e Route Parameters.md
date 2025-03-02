# RouterModule e Route Parameters in Angular

Angular offre un potente sistema di **routing** basato su `RouterModule`, che permette di navigare tra pagine e passare parametri dinamici tra componenti.

---

## 📌 1. Cos'è `RouterModule`?

`RouterModule` è il modulo che gestisce la navigazione in Angular.  
Per utilizzarlo, dobbiamo importarlo e definire le rotte nell'applicazione.

✅ **Permette di definire le URL e collegarle ai componenti**  
✅ **Supporta parametri dinamici e query parameters**  
✅ **Gestisce la protezione delle rotte con i `Guards`**  

---

## 📌 2. Configurazione di `RouterModule`

### **1️⃣ Definiamo le Rotte**
Nel file **`app-routing.module.ts`**, configuriamo le rotte dell'applicazione:

```typescript
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { ProfiloComponent } from './profilo/profilo.component';

const routes: Routes = [
  { path: '', component: HomeComponent }, // Home
  { path: 'profilo/:id', component: ProfiloComponent } // Pagina con parametro dinamico
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
````

✅ **Ora possiamo navigare a `/profilo/123` e vedere il componente `ProfiloComponent` con l'ID `123`.**

---

## 📌 3. Navigare tra le Pagine con `routerLink`

Per creare link di navigazione tra le pagine, utilizziamo `routerLink`.

### **1️⃣ Aggiungere i Link nel Template**

```html
<nav>
  <a routerLink="/">Home</a>
  <a routerLink="/profilo/1">Profilo 1</a>
  <a routerLink="/profilo/2">Profilo 2</a>
</nav>

<router-outlet></router-outlet> <!-- Qui viene caricato il componente -->
```

✅ **Ora i link cambiano l'URL senza ricaricare la pagina.**

---

## 📌 4. Route Parameters: Passare Dati nelle URL

Possiamo passare parametri dinamici nelle URL usando i **Route Parameters**.

### **1️⃣ Creare una Rotta con Parametro**

Nel **`app-routing.module.ts`**, definiamo una rotta con `:id`:

```typescript
{ path: 'profilo/:id', component: ProfiloComponent }
```

### **2️⃣ Leggere il Parametro nel Componente**

Nel file **`profilo.component.ts`**, leggiamo l'`id` dalla URL:

```typescript
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-profilo',
  template: `<h2>Profilo ID: {{ id }}</h2>`
})
export class ProfiloComponent implements OnInit {
  id!: string;

  constructor(private route: ActivatedRoute) {}

  ngOnInit() {
    this.id = this.route.snapshot.paramMap.get('id')!;
  }
}
```

✅ **Ora il componente riceve il valore del parametro dall'URL.**

---

## 📌 5. Navigare Programmaticamente con `Router`

Possiamo navigare tra pagine direttamente da TypeScript usando il servizio `Router`.

### **1️⃣ Esempio di Navigazione Programmatica**

Modifichiamo il componente **`home.component.ts`** per navigare a un profilo specifico:

```typescript
import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  template: `<button (click)="vaiAlProfilo(5)">Vai al Profilo 5</button>`
})
export class HomeComponent {
  constructor(private router: Router) {}

  vaiAlProfilo(id: number) {
    this.router.navigate(['/profilo', id]);
  }
}
```

✅ **Quando viene premuto il bottone, l'utente viene reindirizzato a `/profilo/5`.**

---

## 📌 6. Recuperare Parametri in Tempo Reale con `params.subscribe()`

Se il parametro può cambiare **senza ricaricare la pagina**, dobbiamo usare **`params.subscribe()`**.

### **1️⃣ Esempio di Uso in `ProfiloComponent`**

```typescript
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-profilo',
  template: `<h2>Profilo ID: {{ id }}</h2>`
})
export class ProfiloComponent implements OnInit {
  id!: string;

  constructor(private route: ActivatedRoute) {}

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.id = params['id']; // Aggiorna il valore quando cambia l'URL
    });
  }
}
```

✅ **Ora se cambiamo il parametro dell'URL, il componente si aggiorna automaticamente.**

---

## 📌 7. Query Parameters: Passare Dati Opzionali

Possiamo usare **Query Parameters** per passare dati opzionali.

### **1️⃣ Navigare con Query Parameters**

```typescript
this.router.navigate(['/profilo', 123], { queryParams: { edit: true } });
```

### **2️⃣ Leggere i Query Parameters**

```typescript
ngOnInit() {
  this.route.queryParams.subscribe(params => {
    console.log('Edit Mode:', params['edit']);
  });
}
```

✅ **Ora l'URL può essere `/profilo/123?edit=true` e il componente riceverà il valore `edit=true`.**

---

## 📌 8. Route Wildcard: Pagina 404 per URL Sconosciute

Se un utente digita un'URL inesistente, possiamo reindirizzarlo a una **pagina 404**.

### **1️⃣ Aggiungere una Rotta Wildcard**

```typescript
const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'profilo/:id', component: ProfiloComponent },
  { path: '**', component: NotFoundComponent } // Pagina 404
];
```

✅ **Ora qualsiasi URL non riconosciuta mostrerà il componente `NotFoundComponent`.**

---

## 📌 9. Reindirizzamento Automatico

Possiamo usare `redirectTo` per reindirizzare automaticamente gli utenti.

```typescript
const routes: Routes = [
  { path: '', redirectTo: '/home', pathMatch: 'full' }
];
```

✅ **Ora se un utente visita `/`, verrà reindirizzato automaticamente a `/home`.**

---

## 📌 10. Usare `data` per Passare Informazioni Extra

Possiamo passare **dati statici** alle rotte usando la proprietà `data`.

```typescript
const routes: Routes = [
  { path: 'about', component: AboutComponent, data: { titolo: 'Informazioni su di noi' } }
];
```

✅ **Leggere i dati nel componente:**

```typescript
ngOnInit() {
  this.route.data.subscribe(data => {
    console.log('Titolo:', data['titolo']);
  });
}
```

---

## 🔥 Conclusione

Abbiamo visto: ✅ **Cos'è `RouterModule` e come configurarlo**  
✅ **Passare parametri dinamici nelle URL (`:id`)**  
✅ **Navigazione programmatica con `Router`**  
✅ **Query Parameters per dati opzionali**  
✅ **Rotta Wildcard per pagine 404**  
✅ **Reindirizzamento automatico con `redirectTo`**
