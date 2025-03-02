# Introduzione a TypeScript

TypeScript è un **superset di JavaScript** sviluppato da Microsoft che aggiunge il **typing statico** e altre funzionalità avanzate per scrivere codice più strutturato e manutenibile.

---

## 📌 1. Perché usare TypeScript?
✅ **Tipizzazione statica** → Aiuta a prevenire errori prima dell'esecuzione.  
✅ **Supporto agli ultimi standard JavaScript** → TypeScript è sempre aggiornato con le nuove feature.  
✅ **Più facile da leggere e mantenere** → Migliora l’organizzazione del codice con interfacce e moduli.  
✅ **Compatibile con JavaScript** → Può essere usato in qualsiasi progetto che supporta JS.  

### **Esempio: JavaScript vs TypeScript**
**JavaScript (senza tipi)**
```javascript
function somma(a, b) {
  return a + b;
}
console.log(somma(5, "10")); // Output: "510" (errore logico!)
````

**TypeScript (con tipi)**

```typescript
function somma(a: number, b: number): number {
  return a + b;
}
console.log(somma(5, 10)); // Output: 15
```

✅ Con TypeScript, se proviamo a passare una stringa, il compilatore darà un errore!

---

## 📌 2. Installazione di TypeScript

Se vuoi usare TypeScript nel tuo progetto, devi installarlo globalmente con **npm**:

```sh
npm install -g typescript
```

Per verificare l'installazione:

```sh
tsc -v
```

TypeScript può essere compilato in JavaScript con il comando:

```sh
tsc nomefile.ts
```

---

## 📌 3. Dichiarazione di variabili in TypeScript

TypeScript introduce i **tipi** per dichiarare le variabili. Alcuni esempi:

```typescript
let nome: string = "Alice";  // Stringa
let eta: number = 25;        // Numero
let isOnline: boolean = true; // Booleano
let colori: string[] = ["rosso", "verde", "blu"]; // Array di stringhe
```

Se proviamo ad assegnare un valore errato:

```typescript
let eta: number = "venticinque"; // Errore: il valore deve essere un numero!
```

✅ TypeScript aiuta a prevenire errori di tipo!

### **Type Inference**

Se non specifichiamo il tipo, TypeScript lo deduce automaticamente:

```typescript
let messaggio = "Hello"; // TypeScript capisce che è una stringa
// messaggio = 42;  // Errore! TypeScript sa che 'messaggio' è una stringa
```

---

## 📌 4. Tipi Avanzati

### **Union Types**

Una variabile può accettare più tipi:

```typescript
let codice: string | number;
codice = 123; // OK
codice = "ABC"; // OK
// codice = true; // Errore!
```

### **Tuple**

Array con numero fisso di elementi di tipi diversi:

```typescript
let persona: [string, number] = ["Mario", 30];
```

### **Enum**

Per definire insiemi di valori con nomi descrittivi:

```typescript
enum StatoOrdine {
  InAttesa,
  Spedito,
  Consegnato
}
let ordine: StatoOrdine = StatoOrdine.Spedito;
```

### **Any e Unknown**

- `any` permette qualsiasi valore (evita la tipizzazione, non consigliato).
- `unknown` è simile, ma obbliga a verificare il tipo prima dell'uso.

```typescript
let variabile: any = "Ciao"; // Può essere qualsiasi cosa
let valore: unknown = 42;
// console.log(valore.toUpperCase()); // Errore! TypeScript chiede di verificare prima il tipo
```

---

## 📌 5. Funzioni in TypeScript

TypeScript permette di definire il tipo di input e output delle funzioni.

```typescript
function somma(a: number, b: number): number {
  return a + b;
}
console.log(somma(10, 20)); // Output: 30
```

### **Parametri opzionali e valori predefiniti**

```typescript
function saluta(nome: string, messaggio: string = "Ciao"): string {
  return `${messaggio}, ${nome}!`;
}
console.log(saluta("Alice")); // Output: "Ciao, Alice!"
console.log(saluta("Bob", "Buongiorno")); // Output: "Buongiorno, Bob!"
```

### **Arrow Functions**

TypeScript supporta le **arrow functions** di ES6:

```typescript
const moltiplica = (a: number, b: number): number => a * b;
console.log(moltiplica(3, 4)); // Output: 12
```

---

## 📌 6. Interfacce e Classi

Le **interfacce** definiscono la struttura di un oggetto senza implementarlo.

```typescript
interface Persona {
  nome: string;
  eta: number;
}

let utente: Persona = { nome: "Mario", eta: 30 };
```

Le **classi** permettono di creare oggetti con metodi e proprietà.

```typescript
class Animale {
  nome: string;
  constructor(nome: string) {
    this.nome = nome;
  }
  faRumore(): void {
    console.log(`${this.nome} fa un rumore.`);
  }
}

let cane = new Animale("Cane");
cane.faRumore(); // Output: "Cane fa un rumore."
```

### **Ereditarietà**

```typescript
class Cane extends Animale {
  abbaia(): void {
    console.log(`${this.nome} abbaia!`);
  }
}

let fido = new Cane("Fido");
fido.abbaia(); // Output: "Fido abbaia!"
```

---

## 📌 7. Moduli e Import/Export

TypeScript permette di organizzare il codice in **moduli**.

**File `persona.ts`**

```typescript
export class Persona {
  constructor(public nome: string, public eta: number) {}
}
```

**File `main.ts`**

```typescript
import { Persona } from './persona';

const mario = new Persona("Mario", 35);
console.log(mario.nome); // Output: Mario
```

✅ **Vantaggi dei moduli:**

- Organizzazione del codice
- Riutilizzabilità
- Separazione delle responsabilità

---

## 📌 8. Compilazione e Configurazione con `tsconfig.json`

Quando lavori con TypeScript in progetti più grandi, puoi configurare la compilazione usando un file `tsconfig.json`.

Per generarlo:

```sh
tsc --init
```

Esempio di **`tsconfig.json`**:

```json
{
  "compilerOptions": {
    "target": "ES6",
    "module": "CommonJS",
    "strict": true
  }
}
```

Per compilare tutti i file `.ts`:

```sh
tsc
```

---

## 🔥 Conclusione

Abbiamo visto i concetti fondamentali di TypeScript: ✅ Variabili con tipi statici  
✅ Funzioni con tipi e parametri opzionali  
✅ Classi, interfacce ed ereditarietà  
✅ Moduli e organizzazione del codice

📌 **Nel prossimo file esploreremo i tipi di dati in TypeScript in dettaglio!** 🚀

```

Dimmi se vuoi che proceda con il file successivo! 😊
```