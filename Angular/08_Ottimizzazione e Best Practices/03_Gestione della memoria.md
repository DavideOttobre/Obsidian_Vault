# Gestione della Memoria in Angular

Una corretta gestione della memoria è essenziale per evitare **memory leaks** (perdite di memoria) e migliorare le performance delle applicazioni Angular.

---

## 📌 1. Cosa sono i Memory Leak?

I **memory leak** si verificano quando **risorse non necessarie non vengono rilasciate**, causando un consumo eccessivo di memoria.

✅ **Esempi di memory leak in Angular**:  
- Sottoscrizioni non chiuse (`Observable.subscribe()`)  
- Eventi DOM non rimossi (`addEventListener`)  
- Timer (`setInterval`, `setTimeout`) non cancellati  
- Riferimenti a oggetti non più utilizzati  

📌 **Una gestione corretta della memoria evita crash e rallentamenti dell'app.**

---

## 📌 2. Annullare le Sottoscrizioni a `Observable`

Le sottoscrizioni agli `Observable` devono essere chiuse per evitare memory leak.

### **1️⃣ Problema: Sottoscrizione Non Chiusa**
```typescript
ngOnInit() {
  this.http.get('https://api.example.com/dati')
    .subscribe(dati => console.log(dati));
}
````

✅ **Se il componente viene distrutto, la richiesta API resta in memoria!**

---

### **2️⃣ Soluzione: Usare `unsubscribe()` nel `ngOnDestroy`**

```typescript
import { Subscription } from 'rxjs';

export class AppComponent {
  private sub!: Subscription;

  ngOnInit() {
    this.sub = this.http.get('https://api.example.com/dati')
      .subscribe(dati => console.log(dati));
  }

  ngOnDestroy() {
    this.sub.unsubscribe(); // Libera la memoria
  }
}
```

✅ **Ora quando il componente viene distrutto, la sottoscrizione viene chiusa.**

---

## 📌 3. Usare `takeUntil` per Chiudere le Sottoscrizioni Automaticamente

Un'alternativa più pulita a `unsubscribe()` è usare `takeUntil`.

### **1️⃣ Creiamo un `Subject` per Gestire la Distruzione**

```typescript
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

export class AppComponent {
  private distrutto$ = new Subject<void>();

  ngOnInit() {
    this.http.get('https://api.example.com/dati')
      .pipe(takeUntil(this.distrutto$))
      .subscribe(dati => console.log(dati));
  }

  ngOnDestroy() {
    this.distrutto$.next(); // Notifica la distruzione
    this.distrutto$.complete(); // Rilascia la memoria
  }
}
```

✅ **Ora tutte le sottoscrizioni verranno chiuse automaticamente!**

---

## 📌 4. Rimuovere Event Listener dal DOM

Gli eventi aggiunti manualmente con `addEventListener()` **rimangono attivi anche dopo la distruzione del componente**.

### **1️⃣ Problema: Event Listener Non Rimosso**

```typescript
ngOnInit() {
  document.addEventListener('click', this.handleClick);
}

handleClick() {
  console.log('Clic rilevato!');
}
```

✅ **Anche se il componente viene distrutto, il listener rimane attivo.**

---

### **2️⃣ Soluzione: Rimuovere l'Event Listener in `ngOnDestroy`**

```typescript
ngOnInit() {
  document.addEventListener('click', this.handleClick);
}

ngOnDestroy() {
  document.removeEventListener('click', this.handleClick);
}
```

✅ **Ora il listener viene rimosso quando il componente viene distrutto.**

---

## 📌 5. Interrompere Timer (`setInterval`, `setTimeout`)

Le funzioni `setInterval()` e `setTimeout()` possono causare memory leak se non vengono cancellate.

### **1️⃣ Problema: Timer Attivo Dopo la Distruzione**

```typescript
ngOnInit() {
  setInterval(() => console.log('Timer attivo'), 1000);
}
```

✅ **Anche dopo la distruzione del componente, il timer continua a girare!**

---

### **2️⃣ Soluzione: Salvare il Timer e Pulirlo**

```typescript
private timerId: any;

ngOnInit() {
  this.timerId = setInterval(() => console.log('Timer attivo'), 1000);
}

ngOnDestroy() {
  clearInterval(this.timerId);
}
```

✅ **Ora il timer viene cancellato quando il componente viene distrutto.**

---

## 📌 6. Evitare il Ritenzione della Memoria con `WeakMap` e `WeakSet`

Angular può trattenere riferimenti a oggetti non più utilizzati.

### **1️⃣ Soluzione: Usare `WeakMap`**

```typescript
const mappaDebole = new WeakMap();

let elemento = { id: 1 };
mappaDebole.set(elemento, 'Dati importanti');

elemento = null; // L'oggetto viene automaticamente eliminato dalla memoria
```

✅ **Perfetto per memorizzare dati senza rischiare memory leak.**

---

## 📌 7. Pulire `BehaviorSubject` in un Servizio

Se usiamo `BehaviorSubject` per condividere dati, dobbiamo pulire la memoria.

### **1️⃣ Problema: `BehaviorSubject` Non Pulito**

```typescript
import { BehaviorSubject } from 'rxjs';

export class StatoService {
  private stato = new BehaviorSubject<string>('offline');
  statoCorrente = this.stato.asObservable();
}
```

✅ **Se non chiudiamo il `BehaviorSubject`, i dati rimangono in memoria!**

---

### **2️⃣ Soluzione: Pulire il `BehaviorSubject` in `ngOnDestroy`**

```typescript
import { BehaviorSubject } from 'rxjs';

export class StatoService {
  private stato = new BehaviorSubject<string>('offline');
  statoCorrente = this.stato.asObservable();

  pulisci() {
    this.stato.complete(); // Chiude il Subject
  }
}
```

✅ **Ora il `BehaviorSubject` viene chiuso correttamente.**

---

## 📌 8. Usare `NgZone.runOutsideAngular()` per Bloccare Change Detection

Se un evento viene attivato spesso, può causare un **eccessivo ricalcolo del Change Detection**.

### **1️⃣ Soluzione: Uscire da Angular Zone**

```typescript
import { Component, NgZone } from '@angular/core';

export class IntensivoComponent {
  constructor(private zone: NgZone) {}

  ngOnInit() {
    this.zone.runOutsideAngular(() => {
      setInterval(() => {
        console.log('Operazione fuori Angular');
      }, 1000);
    });
  }
}
```

✅ **Migliora le prestazioni evitando ricalcoli inutili.**

---

## 📌 9. Debug dei Memory Leak con DevTools

Possiamo monitorare l’uso della memoria con **Chrome DevTools**:

1️⃣ Apri **DevTools** (`F12` o `Ctrl+Shift+I`)  
2️⃣ Vai nella scheda **Memory**  
3️⃣ Clicca su **Take Heap Snapshot**  
4️⃣ Monitora gli oggetti mantenuti in memoria

📌 **Se trovi componenti che dovrebbero essere distrutti, hai un memory leak!**

---

## 📌 10. Check Automatico per Memory Leak con `ngOnDestroy()`

Possiamo **verificare se `ngOnDestroy()` viene chiamato**:

```typescript
ngOnDestroy() {
  console.log('Componente distrutto correttamente');
}
```

✅ **Se il messaggio non appare, il componente è ancora in memoria!**

---

## 🔥 Conclusione

Abbiamo visto: ✅ **Come chiudere le sottoscrizioni per evitare memory leak**  
✅ **Come rimuovere event listener inutilizzati**  
✅ **Come pulire `setInterval` e `setTimeout`**  
✅ **Come ottimizzare `BehaviorSubject` nei servizi**  
✅ **Come usare `WeakMap` per evitare il mantenimento di oggetti inutilizzati**  
✅ **Come analizzare i memory leak con Chrome DevTools**
