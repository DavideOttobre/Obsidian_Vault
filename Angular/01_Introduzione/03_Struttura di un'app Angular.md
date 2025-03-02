
# Struttura di un'App Angular

Quando crei un progetto Angular con `ng new`, viene generata una serie di file e cartelle che formano la base dell'applicazione. In questa guida, esploreremo la struttura principale.

---

## 📂 Struttura di una tipica applicazione Angular

```
nome-del-progetto/ 
│-- node_modules/ # Librerie installate con npm 
│-- src/ # Codice sorgente dell'applicazione 
│ │-- app/ # Componenti, moduli e servizi 
│ │-- assets/ # File statici (immagini, icone, ecc.) 
│ │-- environments/ # Configurazioni per ambiente (dev, prod) 
│ │-- index.html # Pagina principale 
│ │-- main.ts # Punto di ingresso dell'app 
│ │-- styles.css # Stili globali 
│-- angular.json # Configurazione del progetto 
│-- package.json # Dipendenze e script npm 
│-- tsconfig.json # Configurazione TypeScript 
│-- README.md # Informazioni sul progetto

````

---

## 📌 Cartelle e file principali

### **📂 src/** (Codice Sorgente)
Questa cartella contiene tutto il codice della tua applicazione.

- **`index.html`** → File HTML principale dell’applicazione.
- **`main.ts`** → Punto di ingresso dell’app che avvia Angular.
- **`styles.css`** → Stili globali dell’applicazione.
- **`app/`** → Contiene i componenti, moduli e servizi.

### **📂 src/app/** (La logica dell'app)
All'interno della cartella `app/`, troviamo il codice dell'applicazione. I file generati automaticamente sono:

- **`app.module.ts`** → Modulo principale dell'applicazione.
- **`app.component.ts`** → Componente principale.
- **`app.component.html`** → Template del componente principale.
- **`app.component.css`** → Stili del componente principale.
- **`app.component.spec.ts`** → File per i test unitari del componente.

Esempio di **`app.module.ts`**:
```typescript
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppComponent } from './app.component';

@NgModule({
  declarations: [AppComponent],  // Dichiarazione dei componenti
  imports: [BrowserModule],      // Importazione di moduli necessari
  providers: [],                 // Servizi disponibili nell'app
  bootstrap: [AppComponent]      // Componente principale
})
export class AppModule {}
````

✅ **Cosa fa questo modulo?**

- **`declarations`** → Definisce i componenti dell’app.
- **`imports`** → Importa altri moduli necessari.
- **`bootstrap`** → Specifica il componente principale che verrà caricato all'avvio.

---

## 📌 Componenti Angular

Un componente in Angular è formato da **4 file principali**:

|File|Descrizione|
|---|---|
|`app.component.ts`|Logica del componente (TypeScript).|
|`app.component.html`|Template HTML del componente.|
|`app.component.css`|Stili CSS del componente.|
|`app.component.spec.ts`|Test unitari per il componente.|

Esempio di **`app.component.ts`**:

```typescript
import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'La mia prima app Angular!';
}
```

✅ **Cosa succede qui?**

- **`@Component`** → Decoratore che definisce un componente.
- **`selector`** → Nome del tag HTML personalizzato (`<app-root>`).
- **`templateUrl`** → Specifica il file HTML del template.
- **`styleUrls`** → Specifica i file CSS per il componente.

Esempio di **`app.component.html`**:

```html
<h1>{{ title }}</h1>
```

✅ **Cosa succede qui?**

- Il valore della variabile `title` viene visualizzato grazie alla **Interpolazione (`{{ }}`)**.

---

## 📌 Moduli in Angular

Gli **NgModules** organizzano un'app Angular in blocchi indipendenti. Ogni app ha almeno un modulo, `AppModule`.

Un modulo può contenere:

- **Componenti**
- **Servizi**
- **Direttive**
- **Pipes**
- **Altri moduli Angular (come `FormsModule`, `HttpClientModule`)**

Esempio di **un modulo personalizzato**:

```typescript
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MioComponenteComponent } from './mio-componente/mio-componente.component';

@NgModule({
  declarations: [MioComponenteComponent],
  imports: [CommonModule],
  exports: [MioComponenteComponent]  // Permette di usare il componente in altri moduli
})
export class MioModuloModule {}
```

---

## 📌 Servizi e Dependency Injection

I **servizi** in Angular vengono utilizzati per gestire la logica riutilizzabile e le chiamate HTTP.

Esempio di **creazione di un servizio**:

```sh
ng generate service services/mio-servizio
```

Questo genera un file **`mio-servizio.service.ts`** nella cartella `services/`.

Esempio di un servizio:

```typescript
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class MioServizioService {
  constructor() {}

  ottieniMessaggio(): string {
    return 'Ciao da MioServizio!';
  }
}
```

✅ **Cosa succede qui?**

- **`@Injectable({ providedIn: 'root' })`** → Rende il servizio disponibile in tutta l'app.
- **`ottieniMessaggio()`** → Metodo che restituisce una stringa.

**Uso del servizio in un componente:**

```typescript
import { Component } from '@angular/core';
import { MioServizioService } from './services/mio-servizio.service';

@Component({
  selector: 'app-root',
  template: `<h1>{{ messaggio }}</h1>`,
})
export class AppComponent {
  messaggio: string;

  constructor(private mioServizio: MioServizioService) {
    this.messaggio = mioServizio.ottieniMessaggio();
  }
}
```

✅ Il servizio viene **iniettato nel costruttore** e il messaggio viene mostrato nel template.

---

## 🔥 Conclusione

Abbiamo visto la **struttura base di un'app Angular**:

- Come sono organizzati i file e le cartelle.
- Il funzionamento dei **componenti** e **moduli**.
- L'utilizzo dei **servizi** con Dependency Injection.

✅ Nel prossimo file esploreremo i **Concetti chiave di Angular**! 🚀
