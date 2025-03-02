# Tipi di Dati in TypeScript

TypeScript introduce un sistema di tipizzazione più forte rispetto a JavaScript, fornendo diversi tipi di dati per migliorare la sicurezza del codice.

---

## 📌 1. Tipi Primitivi

I tipi primitivi di TypeScript sono gli stessi di JavaScript, ma con una tipizzazione statica.

| Tipo | Descrizione | Esempio |
|------|------------|---------|
| `string` | Rappresenta una stringa di testo | `"Hello, TypeScript!"` |
| `number` | Rappresenta numeri interi e decimali | `42`, `3.14` |
| `boolean` | Rappresenta `true` o `false` | `true` |
| `null` | Indica assenza di valore | `null` |
| `undefined` | Variabile non inizializzata | `undefined` |

### **Esempi**
```typescript
let nome: string = "Alice";
let eta: number = 30;
let isAdmin: boolean = true;
````

✅ **Se proviamo a assegnare un valore errato, TypeScript segnala un errore:**

```typescript
// let eta: number = "trenta"; // Errore: "trenta" non è un numero
```

---

## 📌 2. Tipi Complessi

### **1️⃣ Arrays**

TypeScript permette di dichiarare array in due modi:

```typescript
let numeri: number[] = [1, 2, 3, 4, 5];
let colori: Array<string> = ["rosso", "verde", "blu"];
```

✅ **Errore se proviamo ad aggiungere un tipo errato:**

```typescript
// numeri.push("sei"); // Errore: "sei" non è un numero
```

---

### **2️⃣ Tuple**

Le **tuple** permettono di dichiarare array con un numero fisso di elementi di tipi diversi.

```typescript
let persona: [string, number] = ["Mario", 25];
console.log(persona[0]); // Output: "Mario"
```

✅ **Se proviamo a invertire i tipi, TypeScript segnala un errore.**

```typescript
// let persona: [string, number] = [25, "Mario"]; // Errore!
```

---

### **3️⃣ Enum**

Gli **Enum** permettono di definire un insieme di valori con nomi più leggibili.

```typescript
enum StatoOrdine {
  InAttesa,   // 0
  Spedito,    // 1
  Consegnato  // 2
}

let ordine: StatoOrdine = StatoOrdine.Spedito;
console.log(ordine); // Output: 1
```

✅ Possiamo anche assegnare valori personalizzati:

```typescript
enum Ruolo {
  Utente = 1,
  Admin = 10,
  SuperAdmin = 100
}
console.log(Ruolo.Admin); // Output: 10
```

---

### **4️⃣ Any e Unknown**

- `any` permette di assegnare **qualsiasi tipo di valore**, ma è sconsigliato perché elimina la sicurezza dei tipi.
- `unknown` è simile a `any`, ma obbliga a verificare il tipo prima di usarlo.

```typescript
let variabile: any = "Ciao";
variabile = 42; // Nessun errore

let valore: unknown = "Hello";
// console.log(valore.toUpperCase()); // Errore! Serve una verifica prima di usare il valore.
```

✅ Con `unknown` possiamo usare il valore solo dopo un controllo:

```typescript
if (typeof valore === "string") {
  console.log(valore.toUpperCase()); // Ora funziona!
}
```

---

### **5️⃣ Union Types**

Una variabile può accettare **più tipi di dati**.

```typescript
let codice: string | number;
codice = 123;  // OK
codice = "ABC";  // OK
// codice = true; // Errore!
```

---

### **6️⃣ Type Alias**

Possiamo definire un **alias** per un tipo complesso.

```typescript
type Utente = {
  nome: string;
  eta: number;
};

let user: Utente = { nome: "Alice", eta: 28 };
```

✅ Possiamo usare **alias** anche per i tipi primitivi:

```typescript
type ID = string | number;
let userId: ID = 123;
let productId: ID = "A123";
```

---

## 📌 3. Tipi di Funzioni

Possiamo definire i tipi per **parametri** e **valore di ritorno** di una funzione.

```typescript
function somma(a: number, b: number): number {
  return a + b;
}
console.log(somma(5, 10)); // Output: 15
```

### **Parametri opzionali e valori predefiniti**

```typescript
function saluta(nome: string, messaggio: string = "Ciao"): string {
  return `${messaggio}, ${nome}!`;
}
console.log(saluta("Alice")); // Output: "Ciao, Alice!"
console.log(saluta("Bob", "Buongiorno")); // Output: "Buongiorno, Bob!"
```

✅ Possiamo dichiarare parametri **opzionali** con `?`:

```typescript
function stampaMessaggio(messaggio?: string): void {
  console.log(messaggio || "Nessun messaggio!");
}
stampaMessaggio(); // Output: "Nessun messaggio!"
```

---

## 📌 4. Tipi Avanzati

### **1️⃣ Intersection Types**

Un oggetto può combinare più tipi con `&`.

```typescript
type Persona = { nome: string };
type Lavoratore = { professione: string };

type Dipendente = Persona & Lavoratore;

let mario: Dipendente = { nome: "Mario", professione: "Sviluppatore" };
```

---

### **2️⃣ Literal Types**

Un valore può essere limitato a un insieme specifico.

```typescript
let direzione: "sinistra" | "destra";
direzione = "sinistra"; // OK
// direzione = "alto"; // Errore!
```

---

## 📌 5. Uso dei Tipi nelle Classi

TypeScript permette di usare i tipi nelle classi per migliorare la sicurezza del codice.

```typescript
class Auto {
  marca: string;
  anno: number;

  constructor(marca: string, anno: number) {
    this.marca = marca;
    this.anno = anno;
  }

  dettagli(): string {
    return `${this.marca} - ${this.anno}`;
  }
}

let miaAuto = new Auto("Toyota", 2022);
console.log(miaAuto.dettagli()); // Output: "Toyota - 2022"
```

✅ Possiamo usare **modificatori di accesso**:

```typescript
class Persona {
  private nome: string;

  constructor(nome: string) {
    this.nome = nome;
  }

  getNome(): string {
    return this.nome;
  }
}

let utente = new Persona("Alice");
console.log(utente.getNome()); // Output: "Alice"
// console.log(utente.nome); // Errore! Il campo è privato.
```

---

## 🔥 Conclusione

Abbiamo visto: ✅ I principali **tipi di dati** in TypeScript  
✅ **Tipi complessi** come tuple, enum, any, unknown  
✅ **Union, intersection e alias types**  
✅ **Tipi nelle funzioni e classi**

