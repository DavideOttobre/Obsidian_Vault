# Cos'è RxJS e perché è usato in Angular

RxJS (**Reactive Extensions for JavaScript**) è una libreria per la **programmazione reattiva** basata su **stream di eventi e dati asincroni**.

---

## 📌 1. Cos'è RxJS?

✅ **Gestisce flussi di dati asincroni** (API, eventi, WebSockets)  
✅ **Permette operazioni avanzate sui dati con `map`, `filter`, `merge`, `switchMap`**  
✅ **Facilita la gestione di eventi, timer e animazioni**  
✅ **Utilizzato nativamente in Angular per `HttpClient`, `Forms`, `Router`**  

📌 **Angular utilizza RxJS per gestire dati asincroni in modo efficiente.**  

---

## 📌 2. Differenza tra Callback, Promise e RxJS

| Metodo | Descrizione | Pro | Contro |
|--------|------------|----|------|
| **Callback** | Funzioni chiamate dopo un'operazione asincrona | Semplici | Callback Hell |
| **Promise** | Oggetto che rappresenta un valore futuro | Evita il Callback Hell | Non gestisce stream multipli |
| **RxJS (`Observable`)** | Stream di dati reattivi | Composizione potente | Più complesso |

📌 **RxJS è più flessibile delle Promise perché può gestire più valori nel tempo.**

---

## 📌 3. Observable: Il Concetto Chiave di RxJS

Un **Observable** è un flusso di dati che **emette valori nel tempo**.

```typescript
import { Observable } from 'rxjs';

const dati = new Observable(observer => {
  observer.next(1); // Emette 1
  observer.next(2); // Emette 2
  observer.complete(); // Termina lo stream
});

dati.subscribe(value => console.log(value)); // Output: 1, 2
````

✅ **`next()`** emette un valore.  
✅ **`complete()`** chiude lo stream.  
✅ **`error()`** segnala un errore.

---

## 📌 4. Creare un Observable in Angular

Esempio di Observable che emette numeri ogni secondo:

```typescript
import { Observable } from 'rxjs';

const stream = new Observable(observer => {
  let count = 0;
  setInterval(() => {
    observer.next(count++);
  }, 1000);
});

stream.subscribe(value => console.log(value)); // 0, 1, 2, 3...
```

✅ **Ora ogni secondo viene emesso un numero.**

---

## 📌 5. Usare RxJS con `HttpClient`

RxJS è integrato in **`HttpClient`** per gestire richieste API.

### **1️⃣ Esempio di Richiesta HTTP con RxJS**

```typescript
import { HttpClient } from '@angular/common/http';

constructor(private http: HttpClient) {}

this.http.get('https://jsonplaceholder.typicode.com/users')
  .subscribe(dati => console.log(dati));
```

✅ **Le richieste HTTP in Angular restituiscono automaticamente un Observable.**

---

## 📌 6. Operatori RxJS per Manipolare Dati

Gli **operatori** permettono di trasformare e combinare gli stream di dati.

|Operatore|Descrizione|Esempio|
|---|---|---|
|**`map`**|Trasforma i dati|`obs.pipe(map(x => x * 2))`|
|**`filter`**|Filtra i dati|`obs.pipe(filter(x => x > 5))`|
|**`mergeMap`**|Unisce più Observable|`obs.pipe(mergeMap(x => http.get(...)))`|
|**`debounceTime`**|Ritarda l’emissione|`obs.pipe(debounceTime(300))`|
|**`catchError`**|Gestisce errori|`obs.pipe(catchError(err => of('Errore')))`|

---

## 📌 7. Esempio di Operatori in RxJS

```typescript
import { of } from 'rxjs';
import { map, filter } from 'rxjs/operators';

of(1, 2, 3, 4, 5)
  .pipe(
    filter(x => x % 2 === 0), // Filtra solo i numeri pari
    map(x => x * 10) // Moltiplica per 10
  )
  .subscribe(result => console.log(result)); // Output: 20, 40
```

✅ **`of(1,2,3,4,5)`** crea un Observable con i numeri.  
✅ **`filter(x => x % 2 === 0)`** mantiene solo i numeri pari.  
✅ **`map(x => x * 10)`** moltiplica i numeri per 10.

---

## 📌 8. Gestire Eventi con `fromEvent`

RxJS permette di ascoltare eventi DOM in modo reattivo.

```typescript
import { fromEvent } from 'rxjs';

const click$ = fromEvent(document, 'click');
click$.subscribe(() => console.log('Click rilevato!'));
```

✅ **Ora ogni volta che l’utente clicca, viene mostrato un messaggio in console.**

---

## 📌 9. Usare `Subject` per la Condivisione di Dati

Un **`Subject`** è un tipo speciale di Observable che permette di **emissione e sottoscrizione simultanea**.

```typescript
import { Subject } from 'rxjs';

const subject = new Subject<number>();

subject.subscribe(value => console.log('Subscriber 1:', value));
subject.subscribe(value => console.log('Subscriber 2:', value));

subject.next(10); // Entrambi i subscriber ricevono il valore 10
```

✅ **Perfetto per condividere dati tra componenti in Angular.**

---

## 📌 10. Differenza tra `Observable`, `Subject` e `BehaviorSubject`

|Tipo|Descrizione|
|---|---|
|**`Observable`**|Un flusso di dati che emette valori e può essere sottoscritto|
|**`Subject`**|Permette di emettere e ricevere dati simultaneamente|
|**`BehaviorSubject`**|Mantiene sempre l'ultimo valore e lo emette ai nuovi subscriber|

Esempio con `BehaviorSubject`:

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

Abbiamo visto: ✅ **Cos’è RxJS e perché Angular lo usa**  
✅ **Creare un `Observable` e sottoscriverlo**  
✅ **Usare RxJS con `HttpClient` per chiamate API**  
✅ **Manipolare dati con gli operatori (`map`, `filter`, `mergeMap`)**  
✅ **Gestire eventi DOM con `fromEvent`**  
✅ **Usare `Subject` e `BehaviorSubject` per condividere dati tra componenti**
