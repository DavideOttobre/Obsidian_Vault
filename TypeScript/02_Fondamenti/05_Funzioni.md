# 📌 Funzioni in TypeScript

## 🎯 Introduzione
Le funzioni in TypeScript supportano la **tipizzazione dei parametri** e del valore di ritorno, permettendo di scrivere codice più sicuro e leggibile.

---

## 📌 Tipizzare i Parametri e il Valore di Ritorno
### 🔹 Funzione con tipi definiti
```ts
function somma(a: number, b: number): number {
    return a + b;
}

console.log(somma(5, 3)); // 8
````

📌 TypeScript verifica che `a` e `b` siano numeri e che il valore di ritorno sia un numero.

---

## 📌 Parametri Opzionali (`?`)

I parametri opzionali non sono obbligatori.

```ts
function saluta(nome: string, cognome?: string): string {
    return cognome ? `Ciao ${nome} ${cognome}` : `Ciao ${nome}`;
}

console.log(saluta("Alice")); // "Ciao Alice"
console.log(saluta("Alice", "Rossi")); // "Ciao Alice Rossi"
```

📌 Se `cognome` non viene passato, non genera un errore.

---

## 📌 Parametri con Valore Predefinito

```ts
function potenza(base: number, esponente: number = 2): number {
    return base ** esponente;
}

console.log(potenza(5)); // 25 (5^2)
console.log(potenza(5, 3)); // 125 (5^3)
```

📌 Se `esponente` non viene passato, assume **2** come valore predefinito.

---

## 📌 Funzioni Arrow (`=>`)

Le **arrow functions** sono più compatte e mantengono il contesto di `this`.

```ts
const moltiplica = (a: number, b: number): number => a * b;

console.log(moltiplica(4, 3)); // 12
```

📌 Utile per funzioni anonime e callback.

---

## 📌 Funzioni come Parametri

Le funzioni possono essere passate come parametri ad altre funzioni.

```ts
function eseguiOperazione(a: number, b: number, operazione: (x: number, y: number) => number): number {
    return operazione(a, b);
}

const somma = (x: number, y: number) => x + y;
console.log(eseguiOperazione(5, 3, somma)); // 8
```

📌 `operazione` è un parametro funzione che accetta due numeri e restituisce un numero.

---

## 📌 Overloading delle Funzioni

Le funzioni possono avere **più firme** per accettare diversi tipi di parametri.

```ts
function unisci(a: string, b: string): string;
function unisci(a: number, b: number): number;
function unisci(a: any, b: any): any {
    return a + b;
}

console.log(unisci("Hello, ", "World!")); // "Hello, World!"
console.log(unisci(10, 20)); // 30
```

📌 TypeScript controlla quale firma della funzione usare in base ai parametri.

---

## 📌 `void` e `never`

### 🔹 Funzione senza valore di ritorno (`void`)

```ts
function mostraMessaggio(msg: string): void {
    console.log(msg);
}
```

📌 `void` indica che la funzione **non restituisce un valore**.

### 🔹 Funzione che non termina mai (`never`)

```ts
function errore(messaggio: string): never {
    throw new Error(messaggio);
}
```

📌 `never` indica che la funzione **non ha un valore di ritorno e non termina normalmente**.

---

## 📌 Riepilogo

| Concetto                | Descrizione                               | Esempio                                           |
| ----------------------- | ----------------------------------------- | ------------------------------------------------- |
| Parametri tipizzati     | I parametri devono avere un tipo          | `function somma(a: number, b: number): number {}` |
| Parametri opzionali     | Un parametro può essere omesso            | `function saluta(nome: string, cognome?: string)` |
| Valori predefiniti      | Un parametro ha un valore di default      | `function potenza(base: number, esponente = 2)`   |
| 05_Funzioni             | Funzioni più compatte                     | `const moltiplica = (a, b) => a * b`              |
| Funzioni come parametri | Passare una funzione ad un'altra funzione | `function eseguiOperazione(a, b, operazione)`     |
| Overloading             | Definire più versioni di una funzione     | `function unisci(a: string, b: string)`           |
| `void`                  | Funzione senza ritorno                    | `function log(msg: string): void {}`              |
| `never`                 | Funzione che non termina mai              | `function errore(msg: string): never {}`          |

---
