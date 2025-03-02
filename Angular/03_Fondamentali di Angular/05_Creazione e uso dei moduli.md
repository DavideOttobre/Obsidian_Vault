# Creazione e Uso di Moduli in Angular

In Angular, i **moduli** (NgModules) organizzano l'applicazione in unità logiche, migliorando la manutenibilità e la riusabilità del codice.

---

## 📌 1. Cos'è un Modulo in Angular?

Un **modulo** è un file TypeScript decorato con `@NgModule`, che contiene:
- **Componenti**
- **Direttive**
- **Pipe**
- **Servizi**
- **Altri moduli**

✅ **Ogni applicazione Angular ha almeno un modulo principale:** `AppModule`.

```typescript
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppComponent } from './app.component';

@NgModule({
  declarations: [AppComponent],  // Dichiarazione dei componenti
  imports: [BrowserModule],      // Import di altri moduli
  bootstrap: [AppComponent]      // Componente principale avviato all'inizio
})
export class AppModule {}
````

📌 **Il modulo principale viene caricato automaticamente in `main.ts`:**

```typescript
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { AppModule } from './app.module';

platformBrowserDynamic().bootstrapModule(AppModule);
```

---

## 📌 2. Creazione di un Modulo Personalizzato

Per separare le funzionalità dell'app, possiamo creare moduli personalizzati.

Esempio: creiamo un modulo **UtentiModule** per gestire le operazioni sugli utenti.

### **1️⃣ Creazione del Modulo**

Usiamo Angular CLI:

```sh
ng generate module utenti
```

🔹 Verrà creato il file **`utenti.module.ts`**:

```typescript
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ListaUtentiComponent } from './lista-utenti/lista-utenti.component';

@NgModule({
  declarations: [ListaUtentiComponent],  // Dichiarazione dei componenti
  imports: [CommonModule],  // Import di altri moduli necessari
  exports: [ListaUtentiComponent]  // Esporta componenti usabili in altri moduli
})
export class UtentiModule {}
```

---

### **2️⃣ Creazione di un Componente nel Modulo**

Creiamo un componente per mostrare la lista utenti:

```sh
ng generate component utenti/lista-utenti
```

🔹 Verranno creati i file:

```
utenti/
│-- lista-utenti/
│   │-- lista-utenti.component.ts
│   │-- lista-utenti.component.html
│   │-- lista-utenti.component.css
│   │-- lista-utenti.component.spec.ts
```

Modifichiamo **`lista-utenti.component.ts`**:

```typescript
import { Component } from '@angular/core';

@Component({
  selector: 'app-lista-utenti',
  template: `<h2>Lista Utenti</h2><ul><li *ngFor="let utente of utenti">{{ utente }}</li></ul>`,
  styleUrls: ['./lista-utenti.component.css']
})
export class ListaUtentiComponent {
  utenti = ['Alice', 'Bob', 'Carlo'];
}
```

---

### **3️⃣ Importare il Modulo in `AppModule`**

Per usare il nuovo modulo in `AppModule`, lo importiamo in `app.module.ts`:

```typescript
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppComponent } from './app.component';
import { UtentiModule } from './utenti/utenti.module'; // Import del modulo utenti

@NgModule({
  declarations: [AppComponent],
  imports: [BrowserModule, UtentiModule], // Importiamo il modulo utenti
  bootstrap: [AppComponent]
})
export class AppModule {}
```

Ora possiamo usare il **componente ListaUtentiComponent** nel template di `app.component.html`:

```html
<h1>Gestione Utenti</h1>
<app-lista-utenti></app-lista-utenti>
```

✅ **Il componente `app-lista-utenti` funziona grazie al modulo importato.**

---

## 📌 3. Moduli Condivisi (`SharedModule`)

Per evitare di importare più volte moduli comuni, possiamo creare un **modulo condiviso**.

Creiamo il modulo condiviso:

```sh
ng generate module shared
```

In **`shared.module.ts`**, possiamo inserire **componenti, direttive o pipe condivise**:

```typescript
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

@NgModule({
  imports: [CommonModule],
  exports: [CommonModule] // Rende disponibile CommonModule ad altri moduli
})
export class SharedModule {}
```

✅ **Ora possiamo importare `SharedModule` in altri moduli senza dover ripetere `CommonModule`.**

---

## 📌 4. Lazy Loading e Moduli a Caricamento Ritardato

Angular supporta il **Lazy Loading**, che permette di caricare i moduli solo quando sono necessari, migliorando le prestazioni.

### **1️⃣ Creazione di un Modulo con Routing**

Creiamo un modulo con routing:

```sh
ng generate module prodotti --routing
```

🔹 Verranno creati:

```
prodotti/
│-- prodotti.module.ts
│-- prodotti-routing.module.ts
```

Modifichiamo **`prodotti-routing.module.ts`** per caricare il modulo con Lazy Loading:

```typescript
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ListaProdottiComponent } from './lista-prodotti/lista-prodotti.component';

const routes: Routes = [{ path: '', component: ListaProdottiComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProdottiRoutingModule {}
```

Modifichiamo **`app-routing.module.ts`** per caricare il modulo con Lazy Loading:

```typescript
const routes: Routes = [
  { path: 'prodotti', loadChildren: () => import('./prodotti/prodotti.module').then(m => m.ProdottiModule) }
];
```

✅ **Ora il modulo `ProdottiModule` verrà caricato solo quando l’utente visita `/prodotti`.**

---

## 📌 5. Moduli Angular più Usati

|Modulo|Descrizione|
|---|---|
|**BrowserModule**|Necessario per le applicazioni Angular|
|**CommonModule**|Contiene direttive e pipes comuni (`*ngIf`, `*ngFor`)|
|**FormsModule**|Supporta il Two-way Binding con `[(ngModel)]`|
|**ReactiveFormsModule**|Supporta i moduli reattivi|
|**HttpClientModule**|Permette di eseguire chiamate HTTP|
|**RouterModule**|Gestisce il routing e la navigazione|

**Esempio di Importazione di `HttpClientModule`:**

```typescript
import { HttpClientModule } from '@angular/common/http';

@NgModule({
  imports: [HttpClientModule]
})
export class AppModule {}
```

---

## 🔥 Conclusione

Abbiamo visto: ✅ **Cos'è un Modulo in Angular**  
✅ **Creazione di un modulo personalizzato** (`UtentiModule`)  
✅ **Uso di `SharedModule` per moduli condivisi**  
✅ **Lazy Loading per ottimizzare le prestazioni**  
✅ **Moduli Angular più usati (`FormsModule`, `HttpClientModule`, ecc.)**
