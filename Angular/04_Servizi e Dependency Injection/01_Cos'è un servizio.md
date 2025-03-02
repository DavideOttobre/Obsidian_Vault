# Cos'è un Servizio in Angular?

I **servizi** in Angular sono utilizzati per gestire **logica riutilizzabile** e **condivisione dei dati** tra componenti.

---

## 📌 1. Perché usare un Servizio?

✅ **Mantiene separata la logica dal componente**  
✅ **Evita duplicazioni di codice**  
✅ **Permette la condivisione di dati tra componenti**  
✅ **Supporta Dependency Injection (DI)**  
✅ **Gestisce operazioni asincrone (chiamate HTTP, WebSockets, ecc.)**  

---

## 📌 2. Creazione di un Servizio

Possiamo creare un servizio manualmente o con Angular CLI.

### **1️⃣ Creare un Servizio con Angular CLI**
```sh
ng generate service servizi/mio-servizio
````

📌 **Questo comando genera due file:**

```
servizi/
│-- mio-servizio.service.ts
│-- mio-servizio.service.spec.ts (Test)
```

---

## 📌 3. Struttura di un Servizio

**File `mio-servizio.service.ts`**

```typescript
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'  // Il servizio è disponibile in tutta l'app
})
export class MioServizioService {
  constructor() {}

  getMessaggio(): string {
    return "Ciao dal servizio!";
  }
}
```

✅ **Il decoratore `@Injectable({ providedIn: 'root' })` rende il servizio disponibile ovunque senza doverlo importare in `providers` di `AppModule`.**

---

## 📌 4. Usare un Servizio in un Componente

Per utilizzare un servizio, lo iniettiamo nel costruttore del componente.

### **1️⃣ Importare e Usare il Servizio**

**File `app.component.ts`**

```typescript
import { Component } from '@angular/core';
import { MioServizioService } from './servizi/mio-servizio.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html'
})
export class AppComponent {
  messaggio: string;

  constructor(private mioServizio: MioServizioService) {
    this.messaggio = mioServizio.getMessaggio();
  }
}
```

**File `app.component.html`**

```html
<h1>{{ messaggio }}</h1>
```

✅ **Ora il valore del servizio viene mostrato nel template del componente.**

---

## 📌 5. Condivisione di Dati tra Componenti

I servizi permettono di **condividere dati** tra componenti senza passare valori manualmente.

### **1️⃣ Creiamo un Servizio che Contiene uno Stato**

**File `dati.service.ts`**

```typescript
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class DatiService {
  private messaggio: string = 'Messaggio iniziale';

  getMessaggio(): string {
    return this.messaggio;
  }

  setMessaggio(nuovoMessaggio: string) {
    this.messaggio = nuovoMessaggio;
  }
}
```

### **2️⃣ Componente che Modifica il Dato**

**File `componente-a.component.ts`**

```typescript
import { Component } from '@angular/core';
import { DatiService } from '../servizi/dati.service';

@Component({
  selector: 'app-componente-a',
  template: `
    <input [(ngModel)]="nuovoMessaggio">
    <button (click)="aggiornaMessaggio()">Aggiorna</button>
  `
})
export class ComponenteAComponent {
  nuovoMessaggio: string = '';

  constructor(private datiService: DatiService) {}

  aggiornaMessaggio() {
    this.datiService.setMessaggio(this.nuovoMessaggio);
  }
}
```

### **3️⃣ Componente che Legge il Dato**

**File `componente-b.component.ts`**

```typescript
import { Component } from '@angular/core';
import { DatiService } from '../servizi/dati.service';

@Component({
  selector: 'app-componente-b',
  template: `<p>Messaggio: {{ messaggio }}</p>`
})
export class ComponenteBComponent {
  messaggio: string;

  constructor(private datiService: DatiService) {
    this.messaggio = datiService.getMessaggio();
  }
}
```

✅ **Ora i due componenti condividono il dato tramite il servizio!**

---

## 📌 6. Servizi con Observable e RxJS

Per gestire dati in **tempo reale**, usiamo **RxJS e `BehaviorSubject`**.

**Modifica di `dati.service.ts` per usare Observable:**

```typescript
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DatiService {
  private messaggioSubject = new BehaviorSubject<string>('Messaggio iniziale');
  messaggio$ = this.messaggioSubject.asObservable();  // Observable

  aggiornaMessaggio(nuovoMessaggio: string) {
    this.messaggioSubject.next(nuovoMessaggio);
  }
}
```

### **1️⃣ Componente che Modifica il Dato**

```typescript
import { Component } from '@angular/core';
import { DatiService } from '../servizi/dati.service';

@Component({
  selector: 'app-componente-a',
  template: `
    <input [(ngModel)]="nuovoMessaggio">
    <button (click)="aggiornaMessaggio()">Aggiorna</button>
  `
})
export class ComponenteAComponent {
  nuovoMessaggio: string = '';

  constructor(private datiService: DatiService) {}

  aggiornaMessaggio() {
    this.datiService.aggiornaMessaggio(this.nuovoMessaggio);
  }
}
```

### **2️⃣ Componente che Riceve il Dato in Tempo Reale**

```typescript
import { Component, OnInit } from '@angular/core';
import { DatiService } from '../servizi/dati.service';

@Component({
  selector: 'app-componente-b',
  template: `<p>Messaggio: {{ messaggio }}</p>`
})
export class ComponenteBComponent implements OnInit {
  messaggio: string = '';

  constructor(private datiService: DatiService) {}

  ngOnInit() {
    this.datiService.messaggio$.subscribe(messaggio => {
      this.messaggio = messaggio;
    });
  }
}
```

✅ **Ora quando il valore cambia, il `ComponenteB` lo aggiorna automaticamente!**

---

## 📌 7. Iniettare un Servizio Solo in un Modulo

Se vogliamo che un servizio sia disponibile **solo in un modulo specifico**, possiamo dichiararlo nei `providers`.

**Esempio in `utenti.module.ts`:**

```typescript
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DatiService } from '../servizi/dati.service';

@NgModule({
  imports: [CommonModule],
  providers: [DatiService]  // Disponibile solo in questo modulo
})
export class UtentiModule {}
```

✅ **Ora `DatiService` è usabile solo nei componenti di `UtentiModule`.**

---

## 🔥 Conclusione

Abbiamo visto: ✅ **Cos'è un Servizio e perché usarlo**  
✅ **Creazione di un servizio con Angular CLI**  
✅ **Utilizzo di un servizio in un componente**  
✅ **Condivisione di dati tra componenti con un servizio**  
✅ **Uso di Observable e RxJS per dati reattivi**  
✅ **Iniezione di un servizio in un modulo specifico**
