# Operazioni Comuni con RxJS in Angular

RxJS offre numerosi **operatori** per manipolare i dati emessi dagli **Observable**. Gli operatori permettono di **filtrare, trasformare, combinare e gestire errori** in modo efficiente.

---

## 📌 1. Cos'è un Operatore in RxJS?

Un **operatore** è una funzione che modifica i dati di un Observable prima che vengano ricevuti dal subscriber.

✅ **Transforma i dati con `map` e `filter`**  
✅ **Combina più stream con `mergeMap`, `concatMap`**  
✅ **Gestisce il tempo con `debounceTime`, `throttleTime`**  
✅ **Gestisce errori con `catchError` e `retry`**  

📌 **Gli operatori sono usati con `pipe()`.**  

---

## 📌 2. Uso di `pipe()` per Applicare Operatori

Il metodo `.pipe()` permette di concatenare più operatori.

```typescript
import { of } from 'rxjs';
import { map, filter } from 'rxjs/operators';

of(1, 2, 3, 4, 5)
  .pipe(
    filter(x => x % 2 === 0), // Mantiene solo i numeri pari
    map(x => x * 10) // Moltiplica per 10
  )
  .subscribe(result => console.log(result)); // Output: 20, 40
````

✅ **Ora abbiamo trasformato e filtrato i dati in un unico stream.**

---

## 📌 3. Operatori di Trasformazione

|Operatore|Descrizione|Esempio|
|---|---|---|
|**`map`**|Trasforma ogni valore emesso|`obs.pipe(map(x => x * 2))`|
|**`filter`**|Filtra i valori in base a una condizione|`obs.pipe(filter(x => x > 5))`|
|**`scan`**|Accumula valori come `reduce` negli array|`obs.pipe(scan((acc, x) => acc + x, 0))`|

### **1️⃣ Esempio con `map`**

```typescript
import { of } from 'rxjs';
import { map } from 'rxjs/operators';

of(10, 20, 30)
  .pipe(map(x => x / 10))
  .subscribe(result => console.log(result)); // Output: 1, 2, 3
```

---

## 📌 4. Operatori di Temporizzazione

|Operatore|Descrizione|Esempio|
|---|---|---|
|**`debounceTime(ms)`**|Ritarda l’emissione fino a quando non c’è una pausa|`obs.pipe(debounceTime(300))`|
|**`throttleTime(ms)`**|Permette solo un valore ogni intervallo di tempo|`obs.pipe(throttleTime(500))`|
|**`delay(ms)`**|Ritarda l’emissione di ogni valore|`obs.pipe(delay(1000))`|

### **1️⃣ Esempio con `debounceTime` (Ricerca con Input)**

```typescript
import { fromEvent } from 'rxjs';
import { debounceTime, map } from 'rxjs/operators';

const input = document.querySelector('input')!;
fromEvent(input, 'input')
  .pipe(
    debounceTime(300),
    map(event => (event.target as HTMLInputElement).value)
  )
  .subscribe(value => console.log('Input:', value));
```

✅ **Perfetto per evitare richieste API inutili durante la digitazione.**

---

## 📌 5. Operatori di Combinazione

|Operatore|Descrizione|Esempio|
|---|---|---|
|**`mergeMap`**|Unisce due Observable in parallelo|`obs.pipe(mergeMap(x => http.get(...)))`|
|**`switchMap`**|Cancella richieste precedenti e usa solo l'ultima|`obs.pipe(switchMap(x => http.get(...)))`|
|**`concatMap`**|Processa le richieste una alla volta|`obs.pipe(concatMap(x => http.get(...)))`|

### **1️⃣ Esempio con `switchMap` (Interruzione Chiamate API)**

```typescript
import { fromEvent } from 'rxjs';
import { debounceTime, switchMap } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';

constructor(private http: HttpClient) {}

const input = document.querySelector('input')!;
fromEvent(input, 'input')
  .pipe(
    debounceTime(500),
    switchMap(event => {
      const valore = (event.target as HTMLInputElement).value;
      return this.http.get(`https://api.example.com/search?q=${valore}`);
    })
  )
  .subscribe(result => console.log(result));
```

✅ **`switchMap` assicura che solo l'ultima richiesta venga elaborata.**

---

## 📌 6. Operatori di Gestione Errori

|Operatore|Descrizione|Esempio|
|---|---|---|
|**`catchError`**|Cattura errori e restituisce un valore di fallback|`obs.pipe(catchError(err => of('Errore')))`|
|**`retry(n)`**|Riprova una richiesta in caso di errore|`obs.pipe(retry(3))`|

### **1️⃣ Esempio con `catchError` e `retry`**

```typescript
import { HttpClient } from '@angular/common/http';
import { catchError, retry } from 'rxjs/operators';
import { of } from 'rxjs';

constructor(private http: HttpClient) {}

this.http.get('https://api.example.com/data')
  .pipe(
    retry(3), // Riprova fino a 3 volte
    catchError(error => {
      console.error('Errore nella richiesta:', error);
      return of([]); // Restituisce un array vuoto come fallback
    })
  )
  .subscribe(dati => console.log(dati));
```

✅ **Ora l’API riprova fino a 3 volte prima di fallire.**

---

## 📌 7. Operatori di Creazione

|Operatore|Descrizione|Esempio|
|---|---|---|
|**`of()`**|Crea un Observable con valori statici|`of(1, 2, 3)`|
|**`from()`**|Converte array/promises in Observable|`from([10, 20, 30])`|
|**`interval(ms)`**|Emette un valore ogni intervallo di tempo|`interval(1000)`|

### **1️⃣ Esempio con `interval`**

```typescript
import { interval } from 'rxjs';

interval(1000).subscribe(val => console.log('Secondi:', val));
```

✅ **Perfetto per timer o aggiornamenti automatici.**

---

## 📌 8. Operatori di Multicasting (Condividere Dati tra Subscriber)

|Operatore|Descrizione|
|---|---|
|**`share()`**|Condivide un Observable tra più subscriber|
|**`shareReplay(n)`**|Memorizza gli ultimi `n` valori e li emette ai nuovi subscriber|

### **1️⃣ Esempio con `shareReplay`**

```typescript
import { HttpClient } from '@angular/common/http';
import { shareReplay } from 'rxjs/operators';

const dati$ = this.http.get('https://api.example.com/data').pipe(shareReplay(1));

dati$.subscribe(dati => console.log('Subscriber 1:', dati));
dati$.subscribe(dati => console.log('Subscriber 2:', dati)); // Usa i dati in cache
```

✅ **Ora l’API viene chiamata solo una volta, ma entrambi i subscriber ricevono i dati.**

---

## 🔥 Conclusione

Abbiamo visto: ✅ **Come usare `.pipe()` per trasformare dati**  
✅ **Operatori di trasformazione (`map`, `filter`)**  
✅ **Operatori di temporizzazione (`debounceTime`, `throttleTime`)**  
✅ **Operatori di combinazione (`switchMap`, `mergeMap`)**  
✅ **Gestione errori con `catchError` e `retry`**  
✅ **Multicasting con `shareReplay` per ottimizzare le richieste**
