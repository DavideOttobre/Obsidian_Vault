
# 📌 Tipi Avanzati in TypeScript

## 🎯 Introduzione
Oltre ai tipi base, TypeScript offre **tipi avanzati** che permettono di scrivere codice più flessibile e sicuro.

---

## 📌 `type` vs `interface`
Entrambi servono per definire tipi personalizzati, ma `type` è più flessibile.

```ts
// Definizione con `type`
type Persona = {
    nome: string;
    età: number;
};

// Definizione con `interface`
interface PersonaInterface {
    nome: string;
    età: number;
}

// Differenza: `type` supporta Union e Intersection Types
type ID = number | string;
````

📌 Usa **`interface`** per oggetti e classi, **`type`** per union, intersection e alias.

---

## 📌 `Union Types`

Permette di dichiarare una variabile che può avere più tipi.

```ts
let id: number | string;
id = 123; // OK
id = "ABC"; // OK
```

📌 Utile per gestire dati di tipo misto.

---

## 📌 `Intersection Types`

Combina più tipi in uno solo.

```ts
type Persona = { nome: string };
type Studente = { matricola: number };

type StudentePersona = Persona & Studente;

let studente: StudentePersona = { nome: "Alice", matricola: 12345 };
```

📌 Il tipo `StudentePersona` contiene **tutte le proprietà** di `Persona` e `Studente`.

---

## 📌 `Mapped Types`

Permette di creare nuovi tipi basati su tipi esistenti.

```ts
type Persona = {
    nome: string;
    età: number;
};

// Rende tutte le proprietà opzionali
type PersonaParziale = {
    [K in keyof Persona]?: Persona[K];
};

let p: PersonaParziale = { nome: "Luca" }; // OK
```

📌 **`keyof`** restituisce le chiavi di un oggetto, **`[K in keyof Persona]`** itera sulle proprietà.

---

## 📌 `Conditional Types`

Un tipo che cambia in base a una condizione.

```ts
type NumeroOStringa<T> = T extends number ? "Numero" : "Stringa";

let a: NumeroOStringa<number>; // "Numero"
let b: NumeroOStringa<string>; // "Stringa"
```

📌 Usa `extends` per verificare il tipo e restituire un valore differente.

---

## 📌 `Readonly`, `Partial`, `Required`

Utility Types predefiniti di TypeScript.

```ts
type Persona = { nome: string; età?: number };

let p1: Readonly<Persona> = { nome: "Alice" };
// p1.nome = "Marco"; ❌ Errore: Readonly non permette modifiche

let p2: Partial<Persona> = { nome: "Luca" }; // Tutte le proprietà diventano opzionali

let p3: Required<Persona> = { nome: "Sofia", età: 30 }; // Tutte le proprietà diventano obbligatorie
```

📌 **`Readonly<T>`** rende tutte le proprietà immutabili, **`Partial<T>`** le rende opzionali, **`Required<T>`** le rende obbligatorie.

---

## 📌 `Record<T, U>`

Crea un oggetto con chiavi di tipo `T` e valori di tipo `U`.

```ts
type Ruoli = "admin" | "utente" | "ospite";

let permessi: Record<Ruoli, string[]> = {
    admin: ["crea", "modifica", "elimina"],
    utente: ["visualizza"],
    ospite: []
};
```

📌 `Record` è utile per **mappare chiavi e valori tipizzati**.

---

## 📌 Riepilogo

|Concetto|Descrizione|Esempio|
|---|---|---|
|`Union`|Variabile con più tipi possibili|`number|
|`Intersection`|Combina più tipi|`type A & type B`|
|`Mapped Types`|Crea un nuovo tipo modificando le proprietà di un altro|`[K in keyof Persona]?: Persona[K]`|
|`Conditional Types`|Tipo basato su una condizione|`T extends number ? "Numero" : "Stringa"`|
|`Readonly<T>`|Rende le proprietà immutabili|`Readonly<Persona>`|
|`Partial<T>`|Rende tutte le proprietà opzionali|`Partial<Persona>`|
|`Required<T>`|Rende tutte le proprietà obbligatorie|`Required<Persona>`|
|`Record<T, U>`|Oggetto con chiavi e valori tipizzati|`Record<"admin"|

---

## 📌 Prossimi Passaggi

👉 [Programmazione Funzionale in TypeScript](https://chatgpt.com/c/03_Programmazione_Avanzata/04_Programmazione_Funzionale)