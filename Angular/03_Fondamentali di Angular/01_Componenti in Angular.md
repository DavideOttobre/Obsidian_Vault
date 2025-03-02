# Componenti in Angular

I **componenti** sono la base di ogni applicazione Angular. Ogni componente rappresenta una parte dell’interfaccia utente e include **HTML, CSS e TypeScript**.

---

## 📌 1. Creazione di un Componente

Per creare un componente in Angular, possiamo usare Angular CLI:

```sh
ng generate component nome-componente
````

Verranno generati 4 file:

```
nome-componente/
│-- nome-componente.component.ts  // Logica del componente
│-- nome-componente.component.html // Template HTML
│-- nome-componente.component.css // Stili CSS
│-- nome-componente.component.spec.ts // Test (opzionale)
```

---

## 📌 2. Struttura di un Componente

Ogni componente è una classe TypeScript decorata con `@Component`.

**Esempio di un componente:**

```typescript
import { Component } from '@angular/core';

@Component({
  selector: 'app-messaggio',
  templateUrl: './messaggio.component.html',
  styleUrls: ['./messaggio.component.css']
})
export class MessaggioComponent {
  testo: string = 'Benvenuto in Angular!';
}
```

✅ **Cosa succede qui?**

- `selector: 'app-messaggio'` → Definisce il nome del tag HTML personalizzato (`<app-messaggio></app-messaggio>`).
- `templateUrl` → Specifica il file HTML associato.
- `styleUrls` → Specifica il file CSS associato.

---

## 📌 3. Usare un Componente

Per utilizzare un componente in un altro componente, basta inserirlo nel template **come un tag HTML**.

Esempio di **inclusione di `MessaggioComponent` in `AppComponent`**:

```html
<h1>Pagina principale</h1>
<app-messaggio></app-messaggio>
```

⚠️ Assicurati che il componente sia dichiarato nel **modulo principale** (`app.module.ts`):

```typescript
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppComponent } from './app.component';
import { MessaggioComponent } from './messaggio/messaggio.component';

@NgModule({
  declarations: [AppComponent, MessaggioComponent],
  imports: [BrowserModule],
  bootstrap: [AppComponent]
})
export class AppModule {}
```

---

## 📌 4. Data Binding nei Componenti

Angular offre quattro tipi di data binding:

|Tipo|Sintassi|Descrizione|
|---|---|---|
|**Interpolazione**|`{{ variabile }}`|Mostra il valore di una variabile nel template.|
|**Property Binding**|`[proprietà]="valore"`|Modifica dinamicamente un attributo HTML.|
|**Event Binding**|`(evento)="funzione()"`|Esegue un'azione quando avviene un evento.|
|**Two-way Binding**|`[(ngModel)]="variabile"`|Sincronizza dati tra template e classe.|

Esempio completo di **tutti i tipi di binding**:

```typescript
import { Component } from '@angular/core';

@Component({
  selector: 'app-messaggio',
  template: `
    <h2>{{ testo }}</h2> <!-- Interpolazione -->
    <button [disabled]="isDisabled">Cliccami</button> <!-- Property Binding -->
    <input (keyup)="salvaTesto($event)"> <!-- Event Binding -->
    <input [(ngModel)]="nome"> <!-- Two-way Binding -->
  `,
  styles: [`h2 { color: green; }`]
})
export class MessaggioComponent {
  testo = 'Benvenuto in Angular!';
  isDisabled = false;
  nome = '';

  salvaTesto(event: Event) {
    this.nome = (event.target as HTMLInputElement).value;
  }
}
```

✅ **`(event.target as HTMLInputElement).value`** serve per estrarre il valore inserito dall’utente.

---

## 📌 5. Passare Dati a un Componente (`@Input`)

Possiamo passare **valori** a un componente figlio usando il decoratore `@Input`.

### **1️⃣ Passaggio di dati dal padre al figlio**

**File `messaggio.component.ts` (figlio):**

```typescript
import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-messaggio',
  template: `<h2>{{ testo }}</h2>`
})
export class MessaggioComponent {
  @Input() testo: string = '';
}
```

**File `app.component.html` (genitore):**

```html
<app-messaggio [testo]="'Messaggio personalizzato'"></app-messaggio>
```

✅ **Il valore viene passato come attributo del tag.**

---

## 📌 6. Ricevere Eventi dal Figlio (`@Output`)

Per inviare dati **dal figlio al genitore**, usiamo `@Output`.

### **1️⃣ Il figlio emette un evento**

**File `messaggio.component.ts` (figlio):**

```typescript
import { Component, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-messaggio',
  template: `<button (click)="inviaMessaggio()">Invia</button>`
})
export class MessaggioComponent {
  @Output() messaggioEvento = new EventEmitter<string>();

  inviaMessaggio() {
    this.messaggioEvento.emit('Ciao dal componente figlio!');
  }
}
```

### **2️⃣ Il genitore riceve l'evento**

**File `app.component.html` (genitore):**

```html
<app-messaggio (messaggioEvento)="riceviMessaggio($event)"></app-messaggio>
<p>{{ messaggioRicevuto }}</p>
```

**File `app.component.ts` (genitore):**

```typescript
import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html'
})
export class AppComponent {
  messaggioRicevuto = '';

  riceviMessaggio(messaggio: string) {
    this.messaggioRicevuto = messaggio;
  }
}
```

✅ **Quando il bottone viene premuto, il messaggio viene inviato al genitore.**

---

## 📌 7. Ciclo di Vita dei Componenti

Angular fornisce **Lifecycle Hooks** per eseguire codice in momenti specifici.

|Hook|Descrizione|
|---|---|
|`ngOnInit`|Eseguito quando il componente è inizializzato.|
|`ngOnChanges`|Eseguito quando cambia un valore `@Input`.|
|`ngOnDestroy`|Eseguito prima della distruzione del componente.|

### **Esempio di `ngOnInit`**

```typescript
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-messaggio',
  template: `<p>Componente creato!</p>`,
})
export class MessaggioComponent implements OnInit {
  ngOnInit() {
    console.log('Il componente è stato inizializzato!');
  }
}
```

---

## 📌 8. Creazione di un Componente Dinamico

Possiamo creare componenti **dinamicamente** con `ViewChild` e `ComponentFactoryResolver`.

```typescript
import { Component, ComponentFactoryResolver, ViewChild, ViewContainerRef } from '@angular/core';
import { MessaggioComponent } from './messaggio/messaggio.component';

@Component({
  selector: 'app-root',
  template: `<button (click)="aggiungiComponente()">Aggiungi Messaggio</button>
             <ng-container #contenitore></ng-container>`
})
export class AppComponent {
  @ViewChild('contenitore', { read: ViewContainerRef }) contenitore!: ViewContainerRef;

  constructor(private resolver: ComponentFactoryResolver) {}

  aggiungiComponente() {
    const factory = this.resolver.resolveComponentFactory(MessaggioComponent);
    this.contenitore.createComponent(factory);
  }
}
```

✅ **Questo permette di creare componenti a runtime.**

---

## 🔥 Conclusione

Abbiamo visto: ✅ Creazione e utilizzo dei componenti  
✅ Data Binding, `@Input` e `@Output`  
✅ Lifecycle Hooks  
✅ Creazione dinamica dei componenti
