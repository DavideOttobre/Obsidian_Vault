
# 📌 Programmazione Funzionale in TypeScript

## 🎯 Introduzione
La **programmazione funzionale** in TypeScript permette di scrivere codice più pulito, modulare e testabile.  
Alcuni concetti chiave sono:
✅ **Funzioni Pure**  
✅ **Higher-Order Functions**  
✅ **Immutabilità**  
✅ **Metodi funzionali su array (map, filter, reduce)**  

---

## 📌 Funzioni Pure
Una **funzione pura** è una funzione che:
- **Non modifica dati esterni** (senza effetti collaterali)
- **Restituisce sempre lo stesso valore per gli stessi input**

```ts
function somma(a: number, b: number): number {
    return a + b;
}

console.log(somma(2, 3)); // 5
console.log(somma(2, 3)); // 5 (sempre lo stesso output)
````

📌 **Evitare modifiche a variabili globali garantisce prevedibilità**.

---

## 📌 Higher-Order Functions (Funzioni di Ordine Superiore)

Le **Higher-Order Functions** sono funzioni che **accettano altre funzioni come parametri** o **restituiscono funzioni**.

```ts
function operazione(a: number, b: number, callback: (x: number, y: number) => number): number {
    return callback(a, b);
}

const somma = (x: number, y: number) => x + y;
const moltiplica = (x: number, y: number) => x * y;

console.log(operazione(5, 3, somma)); // 8
console.log(operazione(5, 3, moltiplica)); // 15
```

📌 **Permette di creare codice più flessibile e riutilizzabile**.

---

## 📌 Immutabilità

L'**immutabilità** significa **non modificare direttamente le variabili**, ma creare nuove copie.

```ts
const persona = { nome: "Alice", età: 25 };

// ❌ Mutazione dell'oggetto (da evitare)
persona.età = 26; 

// ✅ Creare un nuovo oggetto
const nuovaPersona = { ...persona, età: 26 };
console.log(nuovaPersona); // { nome: "Alice", età: 26 }
```

📌 **Evitare modifiche dirette migliora la gestione dello stato in applicazioni grandi**.

---

## 📌 Metodi Funzionali su Array

### 🔹 `map()` - Trasformare gli elementi di un array

```ts
const numeri = [1, 2, 3];
const doppi = numeri.map(n => n * 2);
console.log(doppi); // [2, 4, 6]
```

### 🔹 `filter()` - Filtrare elementi in base a una condizione

```ts
const numeri = [1, 2, 3, 4, 5];
const pari = numeri.filter(n => n % 2 === 0);
console.log(pari); // [2, 4]
```

### 🔹 `reduce()` - Ridurre un array a un singolo valore

```ts
const numeri = [1, 2, 3, 4];
const sommaTotale = numeri.reduce((acc, curr) => acc + curr, 0);
console.log(sommaTotale); // 10
```

📌 **Questi metodi evitano l’uso di `for` e rendono il codice più leggibile**.

---

## 📌 Funzioni Parziali e Currying

Il **Currying** trasforma una funzione con più parametri in una sequenza di funzioni che accettano un solo parametro.

```ts
function somma(a: number) {
    return function (b: number) {
        return a + b;
    };
}

const somma5 = somma(5);
console.log(somma5(3)); // 8
console.log(somma5(10)); // 15
```

📌 **Utile per creare funzioni più riutilizzabili e modulari**.

---

## 📌 Composizione di Funzioni

La **composizione di funzioni** permette di combinare più funzioni in una.

```ts
const maiuscolo = (str: string) => str.toUpperCase();
const aggiungiPunto = (str: string) => `${str}.`;
const enfatizza = (str: string) => aggiungiPunto(maiuscolo(str));

console.log(enfatizza("ciao")); // "CIAO."
```

📌 **Combinare funzioni semplici aiuta a scrivere codice più chiaro**.

---

## 📌 Riepilogo

|Concetto|Descrizione|Esempio|
|---|---|---|
|Funzioni Pure|Nessun effetto collaterale|`function somma(a, b) { return a + b; }`|
|Higher-Order Functions|Accettano o restituiscono funzioni|`operazione(5, 3, somma)`|
|Immutabilità|Evita la modifica diretta dei dati|`{ ...persona, età: 26 }`|
|`map()`|Trasforma ogni elemento di un array|`[1,2,3].map(n => n * 2)`|
|`filter()`|Filtra elementi di un array|`[1,2,3,4].filter(n => n % 2 === 0)`|
|`reduce()`|Riduce un array a un valore unico|`[1,2,3].reduce((acc, n) => acc + n, 0)`|
|Currying|Funzione divisa in più chiamate|`somma(5)(3)`|
|Composizione|Combina più funzioni|`enfatizza("ciao")`|

---
