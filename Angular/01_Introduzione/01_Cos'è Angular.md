Ecco il primo file in formato `.md` per **Cos'è Angular?**


# Cos'è Angular?

## Introduzione
Angular è un **framework front-end** sviluppato da Google per la creazione di applicazioni web moderne, scalabili e modulari. È scritto in **TypeScript** ed è progettato per costruire **Single Page Applications (SPA)**, in cui il contenuto viene caricato dinamicamente senza ricaricare l'intera pagina.

## Perché usare Angular?
✅ **Struttura modulare** → Permette di organizzare il codice in moduli riutilizzabili.  
✅ **Two-way data binding** → Sincronizzazione automatica tra il modello e la vista.  
✅ **Dependency Injection** → Gestisce automaticamente le dipendenze, migliorando la manutenzione del codice.  
✅ **Routing integrato** → Permette di gestire più pagine all'interno della stessa applicazione SPA.  
✅ **Supporto di Google** → È mantenuto e supportato attivamente dal team di Google.  

## Differenze tra Angular, React e Vue.js
| Caratteristica  | Angular | React | Vue.js |
|----------------|---------|-------|--------|
| **Linguaggio** | TypeScript | JavaScript | JavaScript |
| **Paradigma**  | Framework completo | Libreria per UI | Libreria con funzionalità di framework |
| **Data Binding** | Two-way | One-way | Two-way |
| **Gestione dello stato** | RxJS, NgRx | Redux, Zustand | Vuex, Pinia |
| **Facilità di apprendimento** | Medio-Alta | Medio | Facile |

## Prerequisiti per imparare Angular
Prima di iniziare con Angular, è consigliabile avere una buona conoscenza di:
- **HTML e CSS** → Struttura e stile delle pagine web.
- **JavaScript (ES6+)** → Concetti come Promises, Async/Await, spread/rest operator.
- **TypeScript** → Angular è scritto interamente in TypeScript, quindi è utile imparare le basi.

## Quando usare Angular?
- Applicazioni **enterprise** con logica complessa.
- Progetti che richiedono una forte **strutturazione del codice**.
- Applicazioni con **componenti riutilizzabili** tra diversi team.

## Esempio di una semplice applicazione Angular
```typescript
// app.component.ts
import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  template: `<h1>{{ title }}</h1>`,
  styles: [`h1 { color: blue; }`]
})
export class AppComponent {
  title = 'Benvenuto in Angular!';
}
````

✅ **Cosa succede qui?**

- Definiamo un **componente** Angular con `@Component`.
- Utilizziamo **data binding** (`{{ title }}`) per visualizzare una variabile nel template.
- Applichiamo **stili inline** con `styles`.

## Conclusione

Angular è una scelta potente per applicazioni web **scalabili e performanti**. Nei prossimi file vedremo come installarlo e creare il primo progetto.
