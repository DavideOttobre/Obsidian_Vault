
# 📌 Tipi Complessi in TypeScript

## 🎯 Introduzione
Oltre ai tipi primitivi, TypeScript offre **tipi complessi** come **oggetti**, **alias di tipo**, **union types** e **intersection types** per definire strutture più avanzate.

---

## 📌 Oggetti in TypeScript
Gli oggetti possono avere proprietà tipizzate e opzionali.

### 🔹 Definizione di un oggetto tipizzato
```ts
let persona: { nome: string; età: number } = {
    nome: "Alice",
    età: 25
};
````

### 🔹 Proprietà opzionali (`?`)

```ts
let utente: { nome: string; email?: string } = {
    nome: "Mario"
};
```

📌 L'email è opzionale, quindi `utente` può non averla.

---

## 📌 Alias di Tipo

Gli alias permettono di definire tipi riutilizzabili.

```ts
type Persona = {
    nome: string;
    età: number;
};

let persona1: Persona = { nome: "Luca", età: 30 };
let persona2: Persona = { nome: "Elena", età: 28 };
```

---

## 📌 Union Types (`|`)

I **Union Types** permettono di avere più tipi validi per una variabile.

```ts
let id: number | string;
id = 123;   // OK
id = "ABC"; // OK
```

📌 Utile quando una variabile può contenere più tipi di dati.

---

## 📌 Intersection Types (`&`)

Gli **Intersection Types** combinano più tipi insieme.

```ts
type Studente = { matricola: number };
type Persona = { nome: string };

type StudentePersona = Studente & Persona;

let studente: StudentePersona = {
    matricola: 12345,
    nome: "Marco"
};
```

📌 Il tipo `StudentePersona` eredita le proprietà di **entrambi**.

---

## 📌 Tipo `readonly`

La parola chiave `readonly` impedisce la modifica delle proprietà dopo l'assegnazione.

```ts
type Auto = {
    readonly marca: string;
    modello: string;
};

let auto: Auto = { marca: "Tesla", modello: "Model 3" };
auto.modello = "Model Y";  // ✅ OK
// auto.marca = "BMW";      // ❌ Errore: la proprietà è readonly
```

---

## 📌 Tipi Personalizzati con Funzioni

TypeScript permette di creare tipi personalizzati per funzioni.

```ts
type Somma = (a: number, b: number) => number;

const somma: Somma = (x, y) => x + y;

console.log(somma(3, 5)); // 8
```

📌 Questo garantisce che `somma` accetti **solo** numeri come parametri e ritorni un numero.

---

## 📌 Riepilogo

|Tipo|Descrizione|Esempio|
|---|---|---|
|`Oggetto`|Definisce un oggetto con proprietà tipizzate|`{ nome: "Alice", età: 25 }`|
|`Alias di Tipo`|Crea un tipo riutilizzabile|`type Persona = { nome: string; età: number }`|
|`Union Type`|Variabile con più tipi validi|`number|
|`Intersection Type`|Combina più tipi insieme|`type A & type B`|
|`readonly`|Impedisce la modifica di una proprietà|`readonly marca: string`|

---
