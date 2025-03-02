# Testing in Angular

Il **testing** è una parte fondamentale dello sviluppo in Angular per garantire che i componenti, i servizi e le funzionalità dell'app funzionino correttamente.

---

## 📌 1. Tipi di Test in Angular

✅ **Unit Testing** – Testa singole unità di codice (componenti, servizi, pipe)  
✅ **Integration Testing** – Testa l'interazione tra più unità di codice  
✅ **End-to-End (E2E) Testing** – Simula l'uso dell'applicazione con strumenti come **Cypress** o **Playwright**  

📌 **Angular usa Jasmine e Karma per il Unit Testing.**

---

## 📌 2. Strumenti di Testing in Angular

| Strumento | Descrizione |
|-----------|------------|
| **Jasmine** | Libreria di testing per definire test |
| **Karma** | Test runner che esegue i test nel browser |
| **TestBed** | Utility di Angular per creare e testare componenti e servizi |
| **HttpTestingController** | Simula chiamate HTTP nei test |

📌 **Jasmine è il framework di testing, mentre Karma esegue i test.**  

---

## 📌 3. Creare un Test per un Componente

Quando generiamo un componente, Angular crea automaticamente un file di test **`.spec.ts`**.

```sh
ng generate component utente
````

📌 **Il file `utente.component.spec.ts` conterrà i test per il componente.**

---

## 📌 4. Struttura di Base di un Test con Jasmine

```typescript
describe('Nome del Test', () => {
  it('descrizione del test', () => {
    expect(true).toBe(true);
  });
});
```

✅ **`describe()`** – Definisce un gruppo di test  
✅ **`it()`** – Definisce un singolo test  
✅ **`expect()`** – Definisce un'asserzione da verificare

---

## 📌 5. Scrivere Test per un Componente Angular

**File `utente.component.ts`**

```typescript
import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-utente',
  template: `<p>{{ nome }}</p>`
})
export class UtenteComponent {
  @Input() nome!: string;
}
```

### **1️⃣ Test per il Componente**

**File `utente.component.spec.ts`**

```typescript
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { UtenteComponent } from './utente.component';

describe('UtenteComponent', () => {
  let component: UtenteComponent;
  let fixture: ComponentFixture<UtenteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [UtenteComponent]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UtenteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('dovrebbe creare il componente', () => {
    expect(component).toBeTruthy();
  });

  it('dovrebbe mostrare il nome passato come input', () => {
    component.nome = 'Alice';
    fixture.detectChanges();
    const elemento = fixture.nativeElement.querySelector('p');
    expect(elemento.textContent).toBe('Alice');
  });
});
```

✅ **Il primo test verifica che il componente venga creato correttamente.**  
✅ **Il secondo test verifica che il nome venga mostrato nel template.**

---

## 📌 6. Testare un Servizio Angular

**File `utente.service.ts`**

```typescript
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UtenteService {
  getNome() {
    return 'Mario';
  }
}
```

### **1️⃣ Test per il Servizio**

**File `utente.service.spec.ts`**

```typescript
import { TestBed } from '@angular/core/testing';
import { UtenteService } from './utente.service';

describe('UtenteService', () => {
  let service: UtenteService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(UtenteService);
  });

  it('dovrebbe restituire il nome corretto', () => {
    expect(service.getNome()).toBe('Mario');
  });
});
```

✅ **Ora il servizio viene testato indipendentemente dall'UI.**

---

## 📌 7. Simulare Chiamate HTTP nei Test con `HttpTestingController`

Se un servizio usa `HttpClient`, dobbiamo simulare le chiamate API nei test.

### **1️⃣ Servizio con HTTP**

**File `utente-http.service.ts`**

```typescript
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class UtenteHttpService {
  constructor(private http: HttpClient) {}

  getUtenti() {
    return this.http.get('https://api.example.com/utenti');
  }
}
```

---

### **2️⃣ Test per il Servizio con `HttpTestingController`**

**File `utente-http.service.spec.ts`**

```typescript
import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { UtenteHttpService } from './utente-http.service';

describe('UtenteHttpService', () => {
  let service: UtenteHttpService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [UtenteHttpService]
    });

    service = TestBed.inject(UtenteHttpService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  it('dovrebbe recuperare gli utenti', () => {
    const utentiMock = [{ nome: 'Alice' }, { nome: 'Mario' }];

    service.getUtenti().subscribe(utenti => {
      expect(utenti).toEqual(utentiMock);
    });

    const req = httpMock.expectOne('https://api.example.com/utenti');
    expect(req.request.method).toBe('GET');
    req.flush(utentiMock);
  });

  afterEach(() => {
    httpMock.verify(); // Verifica che non ci siano richieste in sospeso
  });
});
```

✅ **Ora possiamo testare le API senza eseguire richieste reali.**

---

## 📌 8. Testare Eventi e Interazioni Utente

Possiamo testare eventi come **click su un pulsante**.

### **1️⃣ Componente con un Evento**

**File `contatore.component.ts`**

```typescript
import { Component } from '@angular/core';

@Component({
  selector: 'app-contatore',
  template: `<button (click)="incrementa()">+</button><p>{{ contatore }}</p>`
})
export class ContatoreComponent {
  contatore = 0;

  incrementa() {
    this.contatore++;
  }
}
```

---

### **2️⃣ Test per l'Interazione Utente**

**File `contatore.component.spec.ts`**

```typescript
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ContatoreComponent } from './contatore.component';

describe('ContatoreComponent', () => {
  let component: ContatoreComponent;
  let fixture: ComponentFixture<ContatoreComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ContatoreComponent]
    }).compileComponents();

    fixture = TestBed.createComponent(ContatoreComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('dovrebbe incrementare il contatore quando il bottone viene cliccato', () => {
    const bottone = fixture.nativeElement.querySelector('button');
    bottone.click();
    fixture.detectChanges();
    expect(component.contatore).toBe(1);
  });
});
```

✅ **Ora possiamo testare eventi DOM come click e input.**

---

## 📌 9. Eseguire i Test con Angular CLI

Per eseguire i test, usiamo il comando:

```sh
ng test
```

📌 **Apre Karma e mostra i risultati in tempo reale.**

---

## 🔥 Conclusione

Abbiamo visto: ✅ **Come scrivere unit test per componenti e servizi**  
✅ **Come testare chiamate HTTP con `HttpTestingController`**  
✅ **Come simulare eventi utente nei test**  
✅ **Come eseguire i test con `ng test`**
