# Template e Data Binding in Angular

I **template** in Angular definiscono l'interfaccia utente dei componenti. Il **data binding** collega i dati tra la logica TypeScript e il template HTML.

---

## 📌 1. Interpolazione (`{{ }}`)

L'**interpolazione** permette di mostrare dati dinamici nel template.

```typescript
export class AppComponent {
  titolo = "Benvenuto su Angular!";
}
````

**Uso nel template (`app.component.html`):**

```html
<h1>{{ titolo }}</h1>
```

✅ **L'interpolazione mostra il valore della variabile `titolo`.**

⚠️ **Non può eseguire espressioni complesse:**

```html
<h1>{{ console.log("Errore!") }}</h1> <!-- ❌ Non permesso -->
```

---

## 📌 2. Property Binding (`[proprietà]`)

Il **property binding** collega una proprietà di un elemento HTML a una variabile TypeScript.

```typescript
export class AppComponent {
  immagineUrl = "assets/angular-logo.png";
  isDisabled = true;
}
```

**Uso nel template:**

```html
<img [src]="immagineUrl">
<button [disabled]="isDisabled">Cliccami</button>
```

✅ **L'elemento HTML viene aggiornato automaticamente se cambia la variabile.**

---

## 📌 3. Event Binding (`(evento)`)

L'**event binding** permette di eseguire una funzione TypeScript quando un evento HTML viene attivato.

```typescript
export class AppComponent {
  mostraMessaggio() {
    alert("Bottone cliccato!");
  }
}
```

**Uso nel template:**

```html
<button (click)="mostraMessaggio()">Cliccami</button>
```

✅ **L'evento `(click)` chiama `mostraMessaggio()` quando il bottone viene premuto.**

📌 **Altri eventi supportati:**

```html
<input (keyup)="onKeyUp($event)">
<select (change)="onChange($event)">
<form (submit)="onSubmit($event)">
```

---

## 📌 4. Two-way Data Binding (`[(ngModel)]`)

Il **Two-way Binding** sincronizza un valore tra il template e la logica TypeScript.

```typescript
import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
})
export class AppComponent {
  nome: string = '';
}
```

**Uso nel template (`app.component.html`):**

```html
<input [(ngModel)]="nome">
<p>Ciao, {{ nome }}!</p>
```

✅ **Ogni modifica nell'`input` aggiorna `nome` in TypeScript, e viceversa.**

⚠️ **`ngModel` richiede di importare `FormsModule` in `app.module.ts`:**

```typescript
import { FormsModule } from '@angular/forms';

@NgModule({
  imports: [FormsModule]
})
export class AppModule {}
```

---

## 📌 5. Direttive per il Template

Le **direttive** sono istruzioni che modificano il comportamento degli elementi HTML.

### **1️⃣ Direttive Strutturali**

Le **direttive strutturali** modificano il DOM.

|Direttiva|Descrizione|
|---|---|
|`*ngIf`|Mostra/nasconde un elemento|
|`*ngFor`|Genera elementi in base a un array|
|`*ngSwitch`|Alterna tra più template|

**Esempio con `*ngIf`:**

```html
<p *ngIf="isVisible">Questo testo è visibile</p>
```

**Esempio con `*ngFor`:**

```html
<ul>
  <li *ngFor="let item of lista">{{ item }}</li>
</ul>
```

### **2️⃣ Direttive Attributo**

Le **direttive attributo** modificano l'aspetto di un elemento.

|Direttiva|Descrizione|
|---|---|
|`[ngClass]`|Aggiunge classi CSS dinamicamente|
|`[ngStyle]`|Cambia gli stili CSS dinamicamente|

**Esempio con `ngClass`:**

```html
<p [ngClass]="{ 'evidenziato': isAttivo }">Testo con classe dinamica</p>
```

**Esempio con `ngStyle`:**

```html
<p [ngStyle]="{ color: isAttivo ? 'blue' : 'black' }">Testo colorato dinamicamente</p>
```

---

## 📌 6. Binding tra Componenti

Possiamo passare dati tra componenti padre e figlio con `@Input` e `@Output`.

### **1️⃣ Passaggio di dati al componente figlio (`@Input`)**

**File `figlio.component.ts` (figlio):**

```typescript
import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-figlio',
  template: `<p>Messaggio: {{ messaggio }}</p>`
})
export class FiglioComponent {
  @Input() messaggio: string = '';
}
```

**File `app.component.html` (genitore):**

```html
<app-figlio [messaggio]="'Ciao dal padre!'"></app-figlio>
```

✅ **Il genitore passa il valore al figlio tramite `[messaggio]`.**

---

### **2️⃣ Emissione di eventi dal figlio (`@Output`)**

**File `figlio.component.ts` (figlio):**

```typescript
import { Component, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-figlio',
  template: `<button (click)="inviaMessaggio()">Invia</button>`
})
export class FiglioComponent {
  @Output() messaggioEvento = new EventEmitter<string>();

  inviaMessaggio() {
    this.messaggioEvento.emit('Ciao dal figlio!');
  }
}
```

**File `app.component.html` (genitore):**

```html
<app-figlio (messaggioEvento)="riceviMessaggio($event)"></app-figlio>
<p>{{ messaggioRicevuto }}</p>
```

**File `app.component.ts` (genitore):**

```typescript
export class AppComponent {
  messaggioRicevuto = '';

  riceviMessaggio(messaggio: string) {
    this.messaggioRicevuto = messaggio;
  }
}
```

✅ **Quando il figlio clicca il bottone, invia il messaggio al padre.**

---

## 📌 7. Lifecycle Hooks nei Template

Angular fornisce **Lifecycle Hooks** per eseguire codice in momenti specifici.

|Hook|Descrizione|
|---|---|
|`ngOnInit`|Eseguito quando il componente è inizializzato|
|`ngOnChanges`|Eseguito quando cambiano i valori `@Input`|
|`ngOnDestroy`|Eseguito prima della distruzione del componente|

Esempio di `ngOnInit`:

```typescript
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-demo',
  template: `<p>Componente creato!</p>`,
})
export class DemoComponent implements OnInit {
  ngOnInit() {
    console.log('Il componente è stato inizializzato!');
  }
}
```

---

## 🔥 Conclusione

Abbiamo visto: ✅ Interpolazione, Property Binding, Event Binding  
✅ Two-way Binding con `[(ngModel)]`  
✅ Direttive per il template (`*ngIf`, `*ngFor`, `[ngClass]`)  
✅ Comunicazione tra componenti (`@Input` e `@Output`)
