# Direttive Attributo in Angular

Le **direttive attributo** modificano il comportamento o lo stile di un elemento HTML senza alterare il DOM.  

---

## 📌 1. Cosa sono le Direttive Attributo?
Le **direttive attributo** vengono applicate a un elemento HTML per modificare il suo stile o comportamento.  

Esempi comuni in Angular:
- **`[ngClass]`** → Aggiunge classi CSS dinamicamente.  
- **`[ngStyle]`** → Cambia stili CSS in base a una condizione.  
- **`[hidden]`** → Nasconde un elemento (equivalente a `display: none`).  

---

## 📌 2. `[ngClass]` → Classi CSS Dinamiche

`[ngClass]` permette di **aggiungere o rimuovere classi CSS dinamicamente**.

```typescript
export class AppComponent {
  isAttivo = true;
}
````

**Uso nel template:**

```html
<p [ngClass]="{ 'attivo': isAttivo, 'errore': !isAttivo }">Testo dinamico</p>
```

✅ **Se `isAttivo = true`**, la classe `attivo` verrà applicata.  
✅ **Se `isAttivo = false`**, la classe `errore` verrà applicata.

📌 **Esempio con array di classi**:

```html
<p [ngClass]="['classe1', 'classe2']">Testo con più classi</p>
```

---

## 📌 3. `[ngStyle]` → Stili Dinamici

`[ngStyle]` permette di **applicare stili CSS dinamicamente**.

```typescript
export class AppComponent {
  coloreTesto = "blue";
}
```

**Uso nel template:**

```html
<p [ngStyle]="{ color: coloreTesto, 'font-size': '20px' }">Testo colorato</p>
```

✅ **Cambia dinamicamente il colore e la dimensione del testo**.

---

## 📌 4. `[hidden]` → Nascondere un Elemento

`[hidden]` nasconde un elemento senza rimuoverlo dal DOM.

```html
<p [hidden]="isHidden">Questo testo sarà nascosto</p>
```

```typescript
export class AppComponent {
  isHidden = true;
}
```

✅ **Se `isHidden = true`, l'elemento sarà invisibile (`display: none`)**.

📌 **Differenza tra `*ngIf` e `[hidden]`**:

|Direttiva|Comportamento|
|---|---|
|`*ngIf`|Rimuove l'elemento dal DOM|
|`[hidden]`|Mantiene l'elemento nel DOM ma lo nasconde|

---

## 📌 5. Creare una Direttiva Attributo Personalizzata

Possiamo creare una direttiva personalizzata con Angular CLI:

```sh
ng generate directive evidenzia
```

**File `evidenzia.directive.ts`**

```typescript
import { Directive, ElementRef, HostListener, Input } from '@angular/core';

@Directive({
  selector: '[appEvidenzia]'
})
export class EvidenziaDirective {
  @Input('appEvidenzia') coloreEvidenziazione: string = 'yellow';

  constructor(private el: ElementRef) {}

  @HostListener('mouseenter') onMouseEnter() {
    this.evidenzia(this.coloreEvidenziazione);
  }

  @HostListener('mouseleave') onMouseLeave() {
    this.evidenzia('');
  }

  private evidenzia(colore: string) {
    this.el.nativeElement.style.backgroundColor = colore;
  }
}
```

✅ **Uso nel template:**

```html
<p appEvidenzia="lightblue">Passa il mouse qui!</p>
```

📌 **Cosa fa questa direttiva?**

- Al passaggio del mouse (`mouseenter`), cambia il colore di sfondo.
- Quando il mouse esce (`mouseleave`), ripristina il colore originale.
- Il colore può essere personalizzato con `[appEvidenzia]`.

---

## 📌 6. Interagire con Elementi HTML usando `ElementRef`

`ElementRef` permette alla direttiva di **modificare direttamente** un elemento HTML.

```typescript
import { Directive, ElementRef } from '@angular/core';

@Directive({
  selector: '[appEvidenzia]'
})
export class EvidenziaDirective {
  constructor(private el: ElementRef) {
    el.nativeElement.style.backgroundColor = 'yellow';
  }
}
```

✅ **Il colore di sfondo viene impostato automaticamente a giallo.**

📌 **Questo metodo è sconsigliato perché modifica direttamente il DOM. Meglio usare Renderer2.**

---

## 📌 7. Usare `Renderer2` per Maggiore Sicurezza

`Renderer2` è la soluzione consigliata per manipolare il DOM in modo sicuro.

```typescript
import { Directive, ElementRef, Renderer2, HostListener } from '@angular/core';

@Directive({
  selector: '[appEvidenzia]'
})
export class EvidenziaDirective {
  constructor(private el: ElementRef, private renderer: Renderer2) {}

  @HostListener('mouseenter') onMouseEnter() {
    this.renderer.setStyle(this.el.nativeElement, 'backgroundColor', 'yellow');
  }

  @HostListener('mouseleave') onMouseLeave() {
    this.renderer.removeStyle(this.el.nativeElement, 'backgroundColor');
  }
}
```

✅ **Vantaggi di `Renderer2`:**

- Più sicuro rispetto a `ElementRef`
- Supportato su tutte le piattaforme (browser, server-side rendering, WebWorkers)

---

## 📌 8. Aggiungere Classi CSS con `Renderer2`

Possiamo usare `Renderer2` per **aggiungere classi dinamicamente**.

```typescript
@Directive({
  selector: '[appEvidenzia]'
})
export class EvidenziaDirective {
  constructor(private el: ElementRef, private renderer: Renderer2) {}

  @HostListener('mouseenter') onMouseEnter() {
    this.renderer.addClass(this.el.nativeElement, 'evidenziato');
  }

  @HostListener('mouseleave') onMouseLeave() {
    this.renderer.removeClass(this.el.nativeElement, 'evidenziato');
  }
}
```

✅ **Uso nel template:**

```html
<p appEvidenzia>Passa il mouse per evidenziare</p>
```

📌 **Ora possiamo definire la classe `evidenziato` in CSS:**

```css
.evidenziato {
  background-color: yellow;
  font-weight: bold;
}
```

---

## 🔥 Conclusione

Abbiamo visto: ✅ **`[ngClass]`** per classi dinamiche  
✅ **`[ngStyle]`** per stili dinamici  
✅ **`[hidden]`** per nascondere elementi senza rimuoverli  
✅ Creazione di una **direttiva attributo personalizzata**  
✅ Uso di **`ElementRef`** e **`Renderer2`** per manipolare il DOM
