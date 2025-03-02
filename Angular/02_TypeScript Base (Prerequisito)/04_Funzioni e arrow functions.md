# Funzioni e Arrow Functions in TypeScript

Le funzioni sono una parte fondamentale di TypeScript e permettono di scrivere codice organizzato e riutilizzabile. In questa guida vedremo come definire funzioni con tipi, parametri opzionali e funzioni freccia.

---

## 📌 1. Definizione di una Funzione con Tipi

In TypeScript, possiamo definire i tipi dei parametri e del valore di ritorno di una funzione.

```typescript
function somma(a: number, b: number): number {
  return a + b;
}

console.log(somma(10, 5)); // Output: 15
````

✅ **Cosa succede qui?**

- `a: number, b: number` → I parametri devono essere numeri.
- `: number` dopo le parentesi → La funzione deve restituire un numero.
- Se proviamo a passare una stringa, TypeScript segnalerà un errore.

---

## 📌 2. Parametri Opzionali e Default

### **1️⃣ Parametri Opzionali (`?`)**

Possiamo rendere un parametro opzionale aggiungendo `?`.

```typescript
function saluta(nome: string, messaggio?: string): string {
  return `${messaggio || "Ciao"}, ${nome}!`;
}

console.log(saluta("Alice")); // Output: "Ciao, Alice!"
console.log(saluta("Bob", "Buongiorno")); // Output: "Buongiorno, Bob!"
```

✅ Se `messaggio` non viene fornito, usa il valore `"Ciao"`.

---

### **2️⃣ Parametri con Valore Predefinito**

Possiamo assegnare un valore di default ai parametri.

```typescript
function salutaConDefault(nome: string, messaggio: string = "Ciao"): string {
  return `${messaggio}, ${nome}!`;
}

console.log(salutaConDefault("Alice")); // Output: "Ciao, Alice!"
console.log(salutaConDefault("Bob", "Hey")); // Output: "Hey, Bob!"
```

✅ Se non specifichiamo `messaggio`, verrà usato `"Ciao"`.

---

## 📌 3. Funzioni con Rest Parameters

Possiamo usare `...` per accettare un numero variabile di argomenti.

```typescript
function sommaMultipla(...numeri: number[]): number {
  return numeri.reduce((acc, curr) => acc + curr, 0);
}

console.log(sommaMultipla(1, 2, 3, 4)); // Output: 10
```

✅ `...numeri` raccoglie tutti i numeri passati come array.

---

## 📌 4. Funzioni Anonime e Callback

Le funzioni possono essere **assegnate a variabili** e passate come argomenti.

```typescript
const moltiplica = function (a: number, b: number): number {
  return a * b;
};

console.log(moltiplica(3, 4)); // Output: 12
```

**Esempio con una funzione callback:**

```typescript
function operazione(a: number, b: number, callback: (x: number, y: number) => number): number {
  return callback(a, b);
}

console.log(operazione(5, 3, somma)); // Output: 8
console.log(operazione(5, 3, (x, y) => x * y)); // Output: 15
```

✅ Passiamo una funzione come argomento.

---

## 📌 5. Arrow Functions (`=>`)

Le **Arrow Functions** semplificano la sintassi delle funzioni.

```typescript
const sottrai = (a: number, b: number): number => a - b;

console.log(sottrai(10, 3)); // Output: 7
```

✅ **Se la funzione ha una sola espressione, possiamo omettere le `{}` e `return`.

### **Arrow Function con più istruzioni**

```typescript
const descrivi = (nome: string, eta: number): string => {
  const info = `${nome} ha ${eta} anni.`;
  return info;
};

console.log(descrivi("Alice", 25)); // Output: "Alice ha 25 anni."
```

---

## 📌 6. Differenza tra Funzioni Normali e Arrow Functions

Le Arrow Functions **non hanno il proprio `this`**, ma ereditano quello del contesto esterno.

```typescript
class Persona {
  nome: string;

  constructor(nome: string) {
    this.nome = nome;
  }

  salutaNormale() {
    setTimeout(function () {
      console.log(`Ciao, io sono ${this.nome}`); // Errore! `this` non è definito
    }, 1000);
  }

  salutaFreccia() {
    setTimeout(() => {
      console.log(`Ciao, io sono ${this.nome}`); // Funziona correttamente
    }, 1000);
  }
}

let persona = new Persona("Marco");
persona.salutaNormale(); // Errore
persona.salutaFreccia(); // Output: "Ciao, io sono Marco"
```

✅ **Arrow Function usa il `this` della classe, mentre la funzione normale perde il riferimento.**

---

## 📌 7. Overloading delle Funzioni

TypeScript permette di dichiarare più **firme di funzione** con tipi diversi.

```typescript
function mostraInfo(nome: string): string;
function mostraInfo(eta: number): string;
function mostraInfo(valore: string | number): string {
  return `Informazione: ${valore}`;
}

console.log(mostraInfo("Alice")); // Output: "Informazione: Alice"
console.log(mostraInfo(25)); // Output: "Informazione: 25"
```

✅ **Le firme servono solo per i controlli di TypeScript, mentre l’implementazione accetta più tipi.**

---

## 📌 8. Funzioni Generiche

Le **funzioni generiche** permettono di lavorare con tipi diversi senza perdere la sicurezza dei tipi.

```typescript
function identita<T>(valore: T): T {
  return valore;
}

console.log(identita<string>("Ciao!")); // Output: "Ciao!"
console.log(identita<number>(42)); // Output: 42
```

✅ Il tipo `T` viene sostituito con il tipo effettivo quando la funzione viene chiamata.

---

## 🔥 Conclusione

Abbiamo visto: ✅ Funzioni con tipi e parametri opzionali  
✅ Arrow Functions (`=>`) e differenza con funzioni normali  
✅ Funzioni con callback e `rest parameters`  
✅ Overloading e Generics
