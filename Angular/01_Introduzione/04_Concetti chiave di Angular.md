# Concetti chiave di Angular

Angular è un framework basato su **componenti e moduli**, che segue l'architettura **MVVM (Model-View-ViewModel)**. In questa guida esploreremo i concetti fondamentali per comprendere il funzionamento di un'app Angular.

---

## 📌 1. Componenti
Un **componente** è il blocco fondamentale di un'app Angular. Ogni componente ha:
- **Un template HTML** (View)
- **Una classe TypeScript** con la logica (Controller/ViewModel)
- **Uno o più stili CSS** (Styling)

### **Esempio di un componente base**
```typescript
import { Component } from '@angular/core';

@Component({
  selector: 'app-messaggio',
  template: `<h2>{{ testo }}</h2>`,
  styles: [`h2 { color: green; }`]
})
export class MessaggioComponent {
  testo = 'Benvenuto in Angular!';
}
````

✅ Il componente mostra un messaggio con interpolazione (`{{ testo }}`).

### **Creazione di un nuovo componente**

Puoi generare un componente con Angular CLI:

```sh
ng generate component nome-componente
```

Questo creerà una cartella `nome-componente/` con i file:

- `nome-componente.component.ts`
- `nome-componente.component.html`
- `nome-componente.component.css`
- `nome-componente.component.spec.ts` (Test)

---

## 📌 2. Moduli

Angular organizza il codice in **NgModules**, che suddividono l’app in parti riutilizzabili.

Ogni applicazione Angular ha almeno un modulo principale, `AppModule`:

```typescript
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppComponent } from './app.component';
import { MessaggioComponent } from './messaggio/messaggio.component';

@NgModule({
  declarations: [AppComponent, MessaggioComponent], // Componenti dichiarati
  imports: [BrowserModule], // Moduli importati
  bootstrap: [AppComponent] // Componente principale
})
export class AppModule {}
```

✅ Qui importiamo `MessaggioComponent` per poterlo usare nell’app.

---

## 📌 3. Data Binding

Il **data binding** permette di sincronizzare i dati tra la logica del componente e il template HTML.

|Tipo|Sintassi|Descrizione|
|---|---|---|
|**Interpolazione**|`{{ variabile }}`|Inserisce una variabile nel template.|
|**Property Binding**|`[proprietà]="valore"`|Modifica dinamicamente un attributo HTML.|
|**Event Binding**|`(evento)="funzione()"`|Assegna una funzione a un evento.|
|**Two-way Binding**|`[(ngModel)]="variabile"`|Sincronizza il valore tra HTML e TypeScript.|

### **Esempio di Data Binding**

```html
<h1>{{ titolo }}</h1> <!-- Interpolazione -->
<button [disabled]="isDisabled">Cliccami</button> <!-- Property Binding -->
<input (keyup)="salvaTesto($event)"> <!-- Event Binding -->
<input [(ngModel)]="nome"> <!-- Two-way Binding -->
```

---

## 📌 4. Direttive

Le **direttive** sono istruzioni speciali che modificano il comportamento di un elemento HTML.

### **Direttive Strutturali** (modificano il DOM)

|Direttiva|Descrizione|
|---|---|
|`*ngIf`|Mostra/nasconde un elemento in base a una condizione.|
|`*ngFor`|Itera su un array e genera più elementi.|
|`*ngSwitch`|Alterna tra più template in base a un valore.|

**Esempio di `*ngIf` e `*ngFor`:**

```html
<p *ngIf="isVisible">Questo testo è visibile solo se `isVisible` è true.</p>

<ul>
  <li *ngFor="let nome of nomi">{{ nome }}</li>
</ul>
```

### **Direttive Attributo** (modificano lo stile o il comportamento di un elemento)

|Direttiva|Descrizione|
|---|---|
|`[ngClass]`|Aggiunge classi CSS dinamicamente.|
|`[ngStyle]`|Cambia stili CSS in base a una condizione.|

**Esempio di `ngClass` e `ngStyle`:**

```html
<p [ngClass]="{ evidenziato: isAttivo }">Testo con classe dinamica</p>
<p [ngStyle]="{ color: isAttivo ? 'blue' : 'black' }">Testo con stile dinamico</p>
```

---

## 📌 5. Servizi e Dependency Injection

I **servizi** in Angular contengono logica riutilizzabile e permettono di condividere dati tra componenti.

**Esempio di un servizio semplice**

```typescript
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class MessaggioService {

//### 📌 **Quando evitare il costruttore?**

//- Se il servizio non ha bisogno di dipendenze
//- Se contiene solo metodi che non richiedono iniezioni
//- Se non deve comunicare con API o altri servizi

//✅ **Conclusione**: nel tuo caso, il servizio **non necessita di un costruttore** perché `getMessaggio()` è un metodo indipendente. Se in futuro il servizio dovesse dipendere da un altro modulo o servizio, potresti aggiungerlo nel costruttore.

  getMessaggio() {
    return 'Messaggio dal servizio!';
  }
}
```

✅ **Come usare il servizio in un componente:**

```typescript
import { Component } from '@angular/core';
import { MessaggioService } from './messaggio.service';

@Component({
  selector: 'app-root',
  template: `<h1>{{ messaggio }}</h1>`,
})
export class AppComponent {
  messaggio: string;

  constructor(private messaggioService: MessaggioService) {
    this.messaggio = this.messaggioService.getMessaggio();
  }
}
```

---

## 📌 6. Routing

Angular ha un **router integrato** che permette di gestire più pagine in una SPA.

**Esempio di configurazione delle rotte**

```typescript
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { AboutComponent } from './about/about.component';

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'about', component: AboutComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
```

✅ **Come navigare tra le pagine:**

```html
<a routerLink="/">Home</a>
<a routerLink="/about">Chi siamo</a>

<router-outlet></router-outlet> <!-- Qui verrà caricato il contenuto -->
```

---

## 📌 7. Lifecycle Hooks

I **Lifecycle Hooks** permettono di eseguire codice in momenti specifici della vita di un componente.

|Hook|Descrizione|
|---|---|
|`ngOnInit`|Eseguito dopo l’inizializzazione del componente.|
|`ngOnChanges`|Eseguito quando cambiano i valori dei **@Input**.|
|`ngOnDestroy`|Eseguito prima della distruzione del componente.|

**Esempio di `ngOnInit`**

```typescript
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-esempio',
  template: `<p>Componente creato!</p>`,
})
export class EsempioComponent implements OnInit {
  ngOnInit() {
    console.log('Il componente è stato inizializzato!');
  }
}
```

---

## 🔥 Conclusione

Abbiamo visto i concetti fondamentali di Angular: ✅ Componenti e Moduli  
✅ Data Binding  
✅ Direttive (`ngIf`, `ngFor`, `ngClass`, ecc.)  
✅ Servizi e Dependency Injection  
✅ Routing  
✅ Lifecycle Hooks
