# `@Injectable` e Dependency Injection in Angular

La **Dependency Injection (DI)** è un principio fondamentale di Angular che permette di **iniettare servizi o dipendenze** nei componenti e in altre classi in modo automatico.

---

## 📌 1. Cos'è la Dependency Injection?

✅ **Fornisce dipendenze automaticamente ai componenti**  
✅ **Migliora la modularità e il riutilizzo del codice**  
✅ **Riduce la dipendenza diretta da oggetti specifici**  
✅ **Facilita il testing e la manutenzione del codice**  

Esempio senza Dependency Injection (DI):
```typescript
class Servizio {
  getMessaggio() {
    return "Messaggio dal servizio!";
  }
}

class Componente {
  servizio: Servizio;

  constructor() {
    this.servizio = new Servizio(); // Creazione manuale della dipendenza
  }

  stampaMessaggio() {
    console.log(this.servizio.getMessaggio());
  }
}
````

📌 **Problema:** Il componente crea un'istanza diretta del servizio, rendendo difficile la sostituzione o il testing.

✅ **Soluzione con Dependency Injection:**

```typescript
class Componente {
  constructor(private servizio: Servizio) {}

  stampaMessaggio() {
    console.log(this.servizio.getMessaggio());
  }
}
```

📌 **Ora `Servizio` viene fornito automaticamente senza essere istanziato manualmente.**

---

## 📌 2. Il Decoratore `@Injectable`

Per rendere un servizio disponibile alla Dependency Injection, Angular usa `@Injectable`.

### **Esempio di un Servizio con `@Injectable`**

```typescript
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'  // Registra il servizio come Singleton
})
export class MioServizio {
  getMessaggio(): string {
    return "Messaggio dal servizio!";
  }
}
```

✅ **`providedIn: 'root'` rende il servizio disponibile in tutta l'app senza doverlo aggiungere a `providers`.**

---

## 📌 3. Iniettare un Servizio in un Componente

**File `app.component.ts`**

```typescript
import { Component } from '@angular/core';
import { MioServizio } from './servizi/mio-servizio.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html'
})
export class AppComponent {
  messaggio: string;

  constructor(private mioServizio: MioServizio) {
    this.messaggio = mioServizio.getMessaggio();
  }
}
```

✅ **Il servizio viene iniettato automaticamente nel componente senza dover essere istanziato manualmente.**

---

## 📌 4. Fornire un Servizio in un Modulo Specifico

Se vogliamo che un servizio sia disponibile **solo in un modulo specifico**, possiamo dichiararlo nei `providers`.

**File `utenti.module.ts`**

```typescript
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DatiService } from '../servizi/dati.service';

@NgModule({
  imports: [CommonModule],
  providers: [DatiService]  // Il servizio è disponibile solo in questo modulo
})
export class UtentiModule {}
```

✅ **Ora `DatiService` è disponibile solo per i componenti di `UtentiModule`.**

---

## 📌 5. Provider e Scope dei Servizi

|Scope|Definizione|Quando Usarlo|
|---|---|---|
|**`providedIn: 'root'`**|Il servizio è un Singleton disponibile in tutta l'app|Servizi condivisi globalmente|
|**`providedIn: 'any'`**|Crea un'istanza separata per ogni modulo che lo usa|Servizi indipendenti tra moduli|
|**Modulo `providers: []`**|Disponibile solo per i componenti del modulo specificato|Servizi usati solo in un modulo|

Esempio con `providedIn: 'any'`:

```typescript
@Injectable({
  providedIn: 'any'
})
export class MioServizio {}
```

✅ **Ogni modulo che usa il servizio avrà un'istanza separata.**

---

## 📌 6. Dependency Injection con Costruttori

Possiamo iniettare **più servizi** in un componente:

```typescript
import { Component } from '@angular/core';
import { ServizioUno } from './servizi/servizio-uno.service';
import { ServizioDue } from './servizi/servizio-due.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html'
})
export class AppComponent {
  constructor(private servizioUno: ServizioUno, private servizioDue: ServizioDue) {}

  usaServizi() {
    console.log(this.servizioUno.getData());
    console.log(this.servizioDue.getInfo());
  }
}
```

✅ **Angular fornisce automaticamente entrambe le dipendenze senza istanziarle manualmente.**

---

## 📌 7. Injection Token: Personalizzazione della DI

Possiamo creare **token personalizzati** per fornire configurazioni personalizzate.

**Creazione di un Injection Token**

```typescript
import { InjectionToken } from '@angular/core';

export const API_URL = new InjectionToken<string>('API_URL');
```

**Fornitura del valore nel modulo**

```typescript
import { API_URL } from './token';

@NgModule({
  providers: [{ provide: API_URL, useValue: 'https://api.mio-sito.com' }]
})
export class AppModule {}
```

**Utilizzo del token in un servizio**

```typescript
import { Inject, Injectable } from '@angular/core';
import { API_URL } from '../token';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  constructor(@Inject(API_URL) private apiUrl: string) {}

  getApiUrl() {
    return this.apiUrl;
  }
}
```

✅ **L'API URL viene fornito come dipendenza iniettata nel servizio.**

---

## 📌 8. Servizi con Dipendenze

Un servizio può dipendere da un altro servizio.

```typescript
import { Injectable } from '@angular/core';
import { LogService } from './log.service';

@Injectable({
  providedIn: 'root'
})
export class UtenteService {
  constructor(private logService: LogService) {}

  getUtenti() {
    this.logService.log('Recupero utenti');
    return ['Alice', 'Bob', 'Carlo'];
  }
}
```

✅ **Quando `UtenteService` viene usato, riceve `LogService` automaticamente.**

---

## 📌 9. Testing dei Servizi con Dependency Injection

I test possono beneficiare della Dependency Injection per sostituire dipendenze reali con versioni mock.

```typescript
import { TestBed } from '@angular/core/testing';
import { MioServizio } from './mio-servizio.service';

describe('MioServizio', () => {
  let servizio: MioServizio;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    servizio = TestBed.inject(MioServizio);
  });

  it('dovrebbe restituire un messaggio', () => {
    expect(servizio.getMessaggio()).toBe('Messaggio dal servizio!');
  });
});
```

✅ **`TestBed.inject()` permette di iniettare il servizio senza crearlo manualmente.**

---

## 🔥 Conclusione

Abbiamo visto: ✅ **Cos'è la Dependency Injection e perché usarla**  
✅ **Il decoratore `@Injectable` per rendere un servizio disponibile**  
✅ **Come iniettare un servizio in un componente**  
✅ **Scope dei servizi (`root`, `any`, moduli specifici)**  
✅ **Injection Token per dipendenze personalizzate**  
✅ **Dipendenze tra servizi e testing con DI**
