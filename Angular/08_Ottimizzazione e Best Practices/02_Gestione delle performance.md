# Gestione delle Performance in Angular

Le prestazioni di un'app Angular possono essere migliorate con ottimizzazioni su **change detection, lazy loading, caching, memorizzazione e rendering efficiente**.

---

## 📌 1. Strategie per Migliorare le Performance

✅ **Ottimizzare la Change Detection (`OnPush`)**  
✅ **Usare Lazy Loading e Preloading**  
✅ **Evitare il Rerendering Inutile con `trackBy`**  
✅ **Usare il Caching per evitare richieste API ripetute**  
✅ **Minimizzare il bundle con `Angular CLI`**  

📌 **L'obiettivo è ridurre il carico sul browser e migliorare la reattività dell’app.**  

---

## 📌 2. Ottimizzare la Change Detection con `OnPush`

Angular rileva i cambiamenti nel DOM automaticamente con il **Change Detection**.  
Di default, ogni modifica in un componente **riesegue il rendering dell’intera vista**.

### **1️⃣ Usare `ChangeDetectionStrategy.OnPush`**
Possiamo ottimizzare il rendering con la strategia **OnPush**, che ricalcola il componente solo se **cambia l’input**.

```typescript
import { Component, ChangeDetectionStrategy, Input } from '@angular/core';

@Component({
  selector: 'app-utente',
  template: `<p>{{ utente.nome }}</p>`,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class UtenteComponent {
  @Input() utente!: { nome: string };
}
````

✅ **Ora il componente verrà ricalcolato solo quando cambia `@Input()`**.

---

## 📌 3. Usare `trackBy` per Evitare Rerendering Inutili

Se abbiamo un **ngFor**, Angular ricalcola **tutti gli elementi** della lista ogni volta che cambia qualcosa.

### **1️⃣ Usare `trackBy` per Identificare gli Elementi Unicamente**

```html
<li *ngFor="let utente of utenti; trackBy: trackById">{{ utente.nome }}</li>
```

### **2️⃣ Implementare `trackBy` nel Component**

```typescript
trackById(index: number, utente: { id: number }) {
  return utente.id; // Angular aggiornerà solo gli elementi modificati
}
```

✅ **Ora Angular aggiorna solo i nuovi elementi invece di ridisegnare l’intera lista.**

---

## 📌 4. Lazy Loading per Moduli e Componenti

### **1️⃣ Lazy Loading per Moduli**

```typescript
{ path: 'utenti', loadChildren: () => import('./utenti/utenti.module').then(m => m.UtentiModule) }
```

### **2️⃣ Lazy Loading per Componenti**

```typescript
{ path: 'dashboard', loadComponent: () => import('./dashboard.component').then(m => m.DashboardComponent) }
```

✅ **Minimizza la dimensione del bundle iniziale.**

---

## 📌 5. Caching per Migliorare le Performance

Possiamo memorizzare i dati in un **BehaviorSubject** per evitare richieste API ripetute.

### **1️⃣ Creare un Servizio con Caching**

```typescript
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class UtentiService {
  private cache = new BehaviorSubject<any[]>([]);
  utenti$ = this.cache.asObservable();

  constructor(private http: HttpClient) {}

  caricaUtenti() {
    if (this.cache.getValue().length === 0) {
      this.http.get<any[]>('https://api.example.com/utenti').subscribe(dati => {
        this.cache.next(dati);
      });
    }
  }
}
```

✅ **Ora gli utenti verranno richiesti solo una volta e memorizzati nel `BehaviorSubject`.**

---

## 📌 6. Ottimizzare le Richieste HTTP con `shareReplay`

Se un'API viene richiesta più volte, possiamo **memorizzare la risposta**.

```typescript
import { shareReplay } from 'rxjs/operators';

this.http.get('https://api.example.com/dati').pipe(
  shareReplay(1) // Mantiene l'ultima risposta in cache
).subscribe();
```

✅ **Ora i dati vengono richiesti una sola volta per tutti i componenti.**

---

## 📌 7. Minimizzare il Bundle con `Angular CLI`

Usiamo `Angular CLI` per ridurre la dimensione del bundle.

### **1️⃣ Abilitare la Minificazione e il Tree Shaking**

```sh
ng build --configuration production
```

✅ **Questo rimuove codice inutilizzato e comprime il bundle.**

### **2️⃣ Analizzare la Dimensione del Bundle**

```sh
ng build --stats-json
npx webpack-bundle-analyzer dist/angular-app/stats.json
```

✅ **Possiamo vedere quali dipendenze occupano più spazio.**

---

## 📌 8. Usare `defer` e `loading="lazy"` per Ottimizzare Immagini

Per caricare le immagini **solo quando visibili**, usiamo `loading="lazy"`.

```html
<img src="immagine.jpg" loading="lazy">
```

✅ **Evita di caricare immagini che l'utente non ha ancora visualizzato.**

---

## 📌 9. Disattivare Zone.js in Componenti Complessi

Se un componente ha **molti eventi**, possiamo evitare che Angular monitori continuamente i cambiamenti.

### **1️⃣ Disattivare Zone.js per un Componente**

```typescript
import { Component, NgZone } from '@angular/core';

@Component({
  selector: 'app-intensivo',
  template: `<button (click)="operazionePesante()">Calcolo</button>`
})
export class IntensivoComponent {
  constructor(private zone: NgZone) {}

  operazionePesante() {
    this.zone.runOutsideAngular(() => {
      let risultato = 0;
      for (let i = 0; i < 1000000000; i++) {
        risultato += i;
      }
      console.log('Calcolo completato:', risultato);
    });
  }
}
```

✅ **Ora Angular non ridisegna la UI mentre viene eseguito il calcolo.**

---

## 📌 10. Usare Web Workers per Operazioni Pesanti

Per operazioni CPU-intensive, possiamo spostare il lavoro su un **Web Worker**.

### **1️⃣ Creare un Web Worker**

```sh
ng generate web-worker worker
```

### **2️⃣ Usare il Web Worker**

**File `worker.worker.ts`**

```typescript
addEventListener('message', ({ data }) => {
  let risultato = 0;
  for (let i = 0; i < data; i++) {
    risultato += i;
  }
  postMessage(risultato);
});
```

**File `worker.component.ts`**

```typescript
const worker = new Worker(new URL('./worker.worker', import.meta.url));

worker.onmessage = ({ data }) => console.log('Risultato:', data);

worker.postMessage(1000000000);
```

✅ **Perfetto per calcoli intensivi senza bloccare l'interfaccia utente.**

---

## 🔥 Conclusione

Abbiamo visto: ✅ **Come ottimizzare il rendering con `OnPush` e `trackBy`**  
✅ **Lazy Loading per moduli e componenti**  
✅ **Caching con `BehaviorSubject` e `shareReplay`**  
✅ **Minimizzazione del bundle con `Angular CLI`**  
✅ **Ottimizzazione delle immagini e disattivazione di `Zone.js`**  
✅ **Uso di Web Workers per operazioni pesanti**
