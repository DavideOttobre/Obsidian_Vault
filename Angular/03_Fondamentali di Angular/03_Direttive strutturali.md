# Direttive e Pipes in Angular

Le **direttive** permettono di estendere il comportamento degli elementi HTML, mentre i **pipes** trasformano i dati nei template.

---

## 📌 1. Direttive in Angular

Le **direttive** sono istruzioni che Angular applica a elementi HTML. Esistono tre tipi:

1️⃣ **Direttive Strutturali** → Modificano il DOM (`*ngIf`, `*ngFor`, `*ngSwitch`)  
2️⃣ **Direttive Attributo** → Modificano il comportamento o lo stile di un elemento (`[ngClass]`, `[ngStyle]`)  
3️⃣ **Direttive Personalizzate** → Definite dallo sviluppatore  

---

## 📌 2. Direttive Strutturali

### **1️⃣ `*ngIf` → Mostra/Nasconde un elemento**
```html
<p *ngIf="mostraMessaggio">Questo testo è visibile solo se `mostraMessaggio` è `true`.</p>
````

```typescript
mostraMessaggio = true;
```

✅ **Alternativa con `else`:**

```html
<p *ngIf="mostraMessaggio; else altroTesto">Messaggio visibile</p>
<ng-template #altroTesto><p>Messaggio nascosto</p></ng-template>
```

---

### **2️⃣ `*ngFor` → Itera su un array**

```html
<ul>
  <li *ngFor="let nome of nomi; let i = index">({{ i }}) {{ nome }}</li>
</ul>
```

```typescript
nomi = ["Alice", "Bob", "Carlo"];
```

✅ **`index` restituisce l’indice dell'elemento corrente.**

---

### **3️⃣ `*ngSwitch` → Sostituisce contenuto in base a un valore**

```html
<div [ngSwitch]="ruolo">
  <p *ngSwitchCase="'admin'">Sei un amministratore.</p>
  <p *ngSwitchCase="'utente'">Sei un utente normale.</p>
  <p *ngSwitchDefault>Ruolo sconosciuto.</p>
</div>
```

```typescript
ruolo = "admin";
```

---

## 📌 3. Direttive Attributo

### **1️⃣ `[ngClass]` → Aggiunge classi CSS dinamicamente**

```html
<p [ngClass]="{ 'attivo': isAttivo, 'errore': hasError }">Testo dinamico</p>
```

```typescript
isAttivo = true;
hasError = false;
```

---

### **2️⃣ `[ngStyle]` → Cambia lo stile dinamicamente**

```html
<p [ngStyle]="{ color: isAttivo ? 'green' : 'red' }">Testo colorato</p>
```

---

## 📌 4. Creare una Direttiva Personalizzata

Possiamo creare una direttiva personalizzata con Angular CLI:

```sh
ng generate directive evidenzia
```

**File `evidenzia.directive.ts`**

```typescript
import { Directive, ElementRef, HostListener } from '@angular/core';

@Directive({
  selector: '[appEvidenzia]'
})
export class EvidenziaDirective {
  constructor(private el: ElementRef) {}

  @HostListener('mouseenter') onMouseEnter() {
    this.el.nativeElement.style.backgroundColor = 'yellow';
  }

  @HostListener('mouseleave') onMouseLeave() {
    this.el.nativeElement.style.backgroundColor = '';
  }
}
```

✅ **Uso nel template:**

```html
<p appEvidenzia>Passa il mouse qui!</p>
```

✅ **La direttiva cambia il colore di sfondo al passaggio del mouse.**

---

## 📌 5. Pipes in Angular

I **pipes** trasformano i dati nei template.

### **Uso di base:**

```html
<p>{{ nome | uppercase }}</p> <!-- Trasforma in maiuscolo -->
<p>{{ data | date: 'dd/MM/yyyy' }}</p> <!-- Formatta una data -->
```

### **Pipes comuni:**

|Pipe|Descrizione|Esempio|
|---|---|---|
|`uppercase`|Converte in maiuscolo|`"hello" → "HELLO"`|
|`lowercase`|Converte in minuscolo|`"HELLO" → "hello"`|
|`titlecase`|Converte in formato titolo|`"angular is cool" → "Angular Is Cool"`|
|`date`|Formatta una data|`"2024-03-02" → "02/03/2024"`|
|`currency`|Formatta come valuta|`100 → €100,00`|
|`percent`|Formatta come percentuale|`0.25 → "25%"`|
|`json`|Mostra JSON formattato|`{nome: "Mario"}` → `{"nome":"Mario"}`|

---

### **Uso Avanzato dei Pipes**

Possiamo **combinare più pipes**:

```html
<p>{{ prezzo | currency:'EUR':'symbol' }}</p>
```

✅ **Possiamo usare parametri nei pipes:**

```html
<p>{{ data | date: 'fullDate' }}</p>
<p>{{ numero | number:'1.2-2' }}</p> <!-- Min 1 cifra intera, 2 decimali -->
```

---

## 📌 6. Creare un Pipe Personalizzato

Possiamo creare un **pipe personalizzato** con Angular CLI:

```sh
ng generate pipe invertiTesto
```

**File `inverti-testo.pipe.ts`**

```typescript
import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'invertiTesto'
})
export class InvertiTestoPipe implements PipeTransform {
  transform(value: string): string {
    return value.split('').reverse().join('');
  }
}
```

✅ **Uso nel template:**

```html
<p>{{ "Angular" | invertiTesto }}</p> <!-- Output: "ralugnA" -->
```

---

## 📌 7. Async Pipe per Osservabili

L'**async pipe** è usato per gestire dati asincroni da un `Observable` o `Promise`.

**Esempio con `Observable`:**

```typescript
import { Component } from '@angular/core';
import { Observable, of } from 'rxjs';

@Component({
  selector: 'app-root',
  template: `<p>{{ messaggio$ | async }}</p>`
})
export class AppComponent {
  messaggio$: Observable<string> = of("Ciao da un Observable!");
}
```

✅ **L'`async` pipe si sottoscrive automaticamente all'`Observable`.**

---

## 🔥 Conclusione

Abbiamo visto: ✅ Direttive strutturali (`*ngIf`, `*ngFor`, `*ngSwitch`)  
✅ Direttive attributo (`[ngClass]`, `[ngStyle]`)  
✅ Creazione di una direttiva personalizzata  
✅ Uso dei **pipes** per trasformare i dati nei template  
✅ Creazione di un **pipe personalizzato**  
✅ **Async Pipe** per dati asincroni
