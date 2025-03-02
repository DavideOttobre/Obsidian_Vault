# Observable e Observer in RxJS e Angular

In RxJS, un **Observable** è un flusso di dati che **emette valori nel tempo** e può essere **sottoscritto da un Observer**.

---

## 📌 1. Cos'è un Observable?

Un **Observable** è un **oggetto che emette dati nel tempo**, permettendo di gestire eventi asincroni come:

✅ **Chiamate HTTP**  
✅ **Eventi utente (click, input, scroll, ecc.)**  
✅ **WebSockets**  
✅ **Timer e animazioni**  

📌 **Funziona come un flusso di dati a cui possiamo abbonarci (`subscribe()`).**  

---

## 📌 2. Creare un Observable in RxJS

Un Observable può essere creato con il costruttore `new Observable()`.

### **1️⃣ Creare un Observable che emette dati**
```typescript
import { Observable } from 'rxjs';

const dati = new Observable(observer => {
  observer.next(1);  // Emissione del valore 1
  observer.next(2);  // Emissione del valore 2
  observer.complete(); // Chiude il flusso
});

dati.subscribe(value => console.log(value)); // Output: 1, 2
````

✅ **`next(value)`** → Emette un nuovo valore.  
✅ **`complete()`** → Indica che non ci saranno più valori.  
✅ **`error()`** → Termina il flusso con un errore.

---

## 📌 3. Creare un Observer

Un **Observer** è un oggetto che definisce come rispondere ai dati emessi da un Observable.

### **1️⃣ Definire un Observer**

```typescript
const observer = {
  next: (val: any) => console.log('Valore ricevuto:', val),
  error: (err: any) => console.error('Errore:', err),
  complete: () => console.log('Flusso completato')
};

const dati = new Observable(observer => {
  observer.next(1);
  observer.next(2);
  observer.complete();
});

dati.subscribe(observer);
```

✅ **Ora il nostro Observer riceve i dati e stampa il messaggio "Flusso completato".**

---

## 📌 4. Creare un Observable che Emette Valori nel Tempo

Possiamo creare un Observable che emette dati ogni secondo.

```typescript
import { Observable } from 'rxjs';

const timerObservable = new Observable(observer => {
  let count = 0;
  const interval = setInterval(() => {
    observer.next(count++);
    if (count === 5) {
      observer.complete(); // Ferma il flusso dopo 5 emissioni
      clearInterval(interval);
    }
  }, 1000);
});

timerObservable.subscribe(value => console.log('Valore:', value));
```

✅ **Ogni secondo viene emesso un numero, fino a 5.**

---

## 📌 5. Sottoscrivere un Observable con `subscribe()`

Il metodo `.subscribe()` consente di ricevere i dati emessi da un Observable.

```typescript
const dati = new Observable(observer => {
  observer.next('Messaggio 1');
  observer.next('Messaggio 2');
});

dati.subscribe(value => console.log(value));
```

✅ **Possiamo anche passare tre funzioni a `.subscribe()`**

```typescript
dati.subscribe({
  next: val => console.log('Ricevuto:', val),
  error: err => console.error('Errore:', err),
  complete: () => console.log('Completato')
});
```

---

## 📌 6. Interrompere una Sottoscrizione con `unsubscribe()`

Se non interrompiamo una sottoscrizione, il flusso di dati continuerà a essere attivo.

```typescript
const subscription = timerObservable.subscribe(value => console.log('Valore:', value));

// Annullare la sottoscrizione dopo 3 secondi
setTimeout(() => {
  subscription.unsubscribe();
  console.log('Sottoscrizione annullata!');
}, 3000);
```

✅ **Dopo 3 secondi, l'Observer smette di ricevere dati.**

---

## 📌 7. Creare Observable con `of()` e `from()`

RxJS offre funzioni per creare rapidamente Observable.

### **1️⃣ Usare `of()` per emettere valori singoli**

```typescript
import { of } from 'rxjs';

const obs$ = of(1, 2, 3, 4);
obs$.subscribe(value => console.log(value)); // Output: 1, 2, 3, 4
```

### **2️⃣ Usare `from()` per trasformare un array in Observable**

```typescript
import { from } from 'rxjs';

const obs$ = from([10, 20, 30]);
obs$.subscribe(value => console.log(value)); // Output: 10, 20, 30
```

✅ **Utile per trasformare liste in stream di dati.**

---

## 📌 8. Usare `fromEvent()` per Eventi DOM

RxJS permette di ascoltare eventi DOM in modo reattivo.

```typescript
import { fromEvent } from 'rxjs';

const click$ = fromEvent(document, 'click');
click$.subscribe(() => console.log('Click rilevato!'));
```

✅ **Ora ogni volta che l’utente clicca, viene mostrato un messaggio in console.**

---

## 📌 9. Differenza tra Observable, Subject e BehaviorSubject

|Tipo|Descrizione|
|---|---|
|**`Observable`**|Un flusso di dati a cui ci si può abbonare|
|**`Subject`**|Permette di emettere e ricevere dati simultaneamente|
|**`BehaviorSubject`**|Mantiene sempre l'ultimo valore e lo emette ai nuovi subscriber|

### **1️⃣ Esempio con `Subject`**

```typescript
import { Subject } from 'rxjs';

const subject = new Subject<number>();

subject.subscribe(value => console.log('Subscriber 1:', value));
subject.subscribe(value => console.log('Subscriber 2:', value));

subject.next(10); // Entrambi i subscriber ricevono il valore 10
```

✅ **Perfetto per condividere dati tra componenti in Angular.**

---

### **2️⃣ Esempio con `BehaviorSubject`**

```typescript
import { BehaviorSubject } from 'rxjs';

const behaviorSubject = new BehaviorSubject<number>(0);

behaviorSubject.subscribe(value => console.log('Subscriber 1:', value));
behaviorSubject.next(5); // Subscriber 1 riceve 5
behaviorSubject.subscribe(value => console.log('Subscriber 2:', value)); // Subscriber 2 riceve subito 5
```

✅ **Perfetto per la gestione dello stato globale in Angular.**

---

## 🔥 Conclusione

Abbiamo visto: ✅ **Cos'è un Observable e come funziona**  
✅ **Come creare e sottoscrivere un Observable**  
✅ **Come interrompere una sottoscrizione con `unsubscribe()`**  
✅ **Usare `of()`, `from()`, `fromEvent()` per creare Observable rapidamente**  
✅ **Differenza tra `Observable`, `Subject` e `BehaviorSubject`**
