
# 📌 Tipi di Dati in TypeScript

## 🎯 Introduzione
In TypeScript, ogni variabile ha un [[Tipi (Type)]] che aiuta a prevenire errori. I tipi possono essere **primitivi** (stringhe, numeri, booleani) o **complessi** (array, oggetti, tuple, enum).

---

## 📌 Tipi Primitivi
### 🔹 `string` - Testi
```ts
let nome: string = "Alice";
console.log(nome.toUpperCase()); // "ALICE"
````

### 🔹 `number` - Numeri interi e decimali

```ts
let età: number = 25;
console.log(età + 1); // 26
```

### 🔹 `boolean` - Valori vero/falso

```ts
let isOnline: boolean = true;
console.log(isOnline ? "Disponibile" : "Offline"); // "Disponibile"
```

### 🔹 `any` - Disattiva il controllo del tipo (da evitare)

```ts
let variabile: any = "Test";
variabile = 42; // Nessun errore
```

---

## 📌 Tipi Complessi

### 🔹 `array` - Liste di elementi dello stesso tipo

```ts
let numeri: number[] = [1, 2, 3];
let nomi: Array<string> = ["Alice", "Bob"];
```

### 🔹 `tuple` - Array con un numero fisso di elementi e tipi definiti

```ts
let persona: [string, number] = ["Alice", 25];
```

### 🔹 `enum` - Valori predefiniti con nomi leggibili

```ts
enum Ruolo { Admin, Utente, Ospite }
let mioRuolo: Ruolo = Ruolo.Admin;
console.log(mioRuolo); // 0
```

---

## 📌 `null` e `undefined`

In TypeScript, `null` e `undefined` hanno i propri tipi, ma possono essere usati con altri tipi se abilitato in `tsconfig.json`.

```ts
let valore: number | null = null;
valore = 42; // Nessun errore
```

---

## 📌 `union types` - Unione di più tipi

```ts
let id: number | string;
id = 101; // OK
id = "abc123"; // OK
```

---

## 📌 `typeof` - Controllo dinamico dei tipi

```ts
function stampa(valore: number | string) {
    if (typeof valore === "number") {
        console.log("È un numero:", valore);
    } else {
        console.log("È una stringa:", valore);
    }
}
```

---

## 📌 Riepilogo

|Tipo|Descrizione|Esempio|
|---|---|---|
|`string`|Testo|`"Alice"`|
|`number`|Numeri interi e decimali|`42`, `3.14`|
|`boolean`|Vero o falso|`true`, `false`|
|`array`|Lista di elementi|`[1, 2, 3]`|
|`tuple`|Array con tipi fissi|`["Alice", 25]`|
|`enum`|Valori predefiniti|`enum Ruolo { Admin, User }`|
|`null`/`undefined`|Valori vuoti|`null`, `undefined`|
|`union`|Unione di tipi diversi|`number|

---
