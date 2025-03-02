## **📌 Definizione Esaustiva dei "Tipi" (`type`) in TypeScript**

In TypeScript, `type` è un **alias di tipo** che consente di assegnare un nome a qualsiasi tipo di dato, semplificando la leggibilità e la riusabilità del codice. Un **tipo** (`type`) può rappresentare:

1. **Tipi primitivi (`string`, `number`, `boolean`, ecc.)**
2. **Oggetti e interfacce**
3. **Funzioni**
4. **Unioni e intersezioni**
5. **Array e tuple**
6. **Tipi condizionali e mapped types**

> **Analogia**: `type` è come **un’etichetta** che assegni a un tipo complesso per poterlo riutilizzare facilmente.

---

## **1️⃣ Dichiarare un Tipo in TypeScript**

La sintassi per definire un `type` è:

```typescript
type NomeDelTipo = Definizione;
```

Esempio con un oggetto:

```typescript
type Persona = {
  nome: string;
  eta: number;
};
```

Ora possiamo usare `Persona` come un tipo:

```typescript
const mario: Persona = { nome: "Mario", eta: 30 }; // ✅ Corretto
const errato: Persona = { nome: "Anna" }; // ❌ Errore: manca `eta`
```

---

## **2️⃣ Tipi Primitivi con `type`**

Un `type` può essere usato per dare un nome a un tipo primitivo:

```typescript
type ID = number | string;

const userId: ID = 123; // ✅ Valido
const productId: ID = "abc123"; // ✅ Valido
const invalidId: ID = true; // ❌ Errore: non è string o number
```

> **Analogia**: `type ID` è come un’etichetta che dice: “Questo valore può essere **un numero o una stringa**”.

---

## **3️⃣ Tipizzare Funzioni con `type`**

Un `type` può definire la forma di una funzione:

```typescript
type Somma = (a: number, b: number) => number;

const add: Somma = (x, y) => x + y; // ✅ Corretto
const invalid: Somma = (x, y) => `${x + y}`; // ❌ Errore: deve restituire un `number`
```

> **Analogia**: È come una **formula matematica** che stabilisce come deve funzionare la funzione.

---

## **4️⃣ Unioni di Tipi (`|`)**

Uno dei punti di forza di `type` è che supporta **unioni di tipi**, cioè un valore può appartenere a più tipi.

```typescript
type Esito = "success" | "error" | "loading";

let stato: Esito;

stato = "success"; // ✅ OK
stato = "error"; // ✅ OK
stato = "not-found"; // ❌ Errore: non è un valore valido
```

> **Analogia**: È come un **menu a tendina** in cui puoi selezionare solo opzioni predefinite.

---

## **5️⃣ Intersezioni di Tipi (`&`)**

Con `&` possiamo combinare più tipi insieme.

```typescript
type Base = {
  id: number;
};

type Dettagli = {
  nome: string;
  attivo: boolean;
};

type Utente = Base & Dettagli;

const user: Utente = {
  id: 1,
  nome: "Luca",
  attivo: true,
}; // ✅ Corretto

const errore: Utente = {
  id: 2,
  nome: "Anna",
}; // ❌ Errore: manca `attivo`
```

> **Analogia**: È come **sommare due ricette** per creare un nuovo piatto.

---

## **6️⃣ Array e Tuple con `type`**

Possiamo definire array e tuple usando `type`:

```typescript
type Numeri = number[];

const lista: Numeri = [1, 2, 3]; // ✅ OK
const errata: Numeri = ["a", "b", "c"]; // ❌ Errore: deve contenere numeri
```

📌 **Tuple** (array con lunghezza fissa e tipi specifici):

```typescript
type Punto = [number, number];

const p1: Punto = [10, 20]; // ✅ OK
const p2: Punto = [10, "venti"]; // ❌ Errore: il secondo valore deve essere un numero
```

> **Analogia**: Un array è come **una lista della spesa**, mentre una tupla è come **una ricetta con ingredienti precisi in un certo ordine**.

---

## **7️⃣ Tipi Condizionali (`extends ? :`)**

I tipi condizionali permettono di creare tipi dinamici.

```typescript
type AdminOrUser<T> = T extends "admin" ? { permessi: string[] } : { nome: string };

const admin: AdminOrUser<"admin"> = { permessi: ["crea", "modifica"] }; // ✅ OK
const user: AdminOrUser<"user"> = { nome: "Paolo" }; // ✅ OK
```

> **Analogia**: È come **una regola IF-ELSE** che cambia il tipo in base al valore passato.

---

## **8️⃣ Mapped Types**

I **Mapped Types** ci permettono di creare nuovi tipi basati su altri esistenti.

```typescript
type ReadonlyPersona = {
  readonly [K in keyof Persona]: Persona[K];
};

const persona: ReadonlyPersona = { nome: "Marco", eta: 28 };

persona.nome = "Luigi"; // ❌ Errore: proprietà di sola lettura
```

> **Analogia**: È come **fotocopiare un documento** e renderlo non modificabile.

---

## **📌 Riepilogo: Differenze tra `type` e `interface`**

| **Caratteristica**              | **`type`**           | **`interface`**                           |
| ------------------------------- | -------------------- | ----------------------------------------- |
| **Definizione di oggetti**      | ✅ Sì                 | ✅ Sì                                      |
| **Estendibilità**               | ✅ `&` (intersezioni) | ✅ `extends` (più intuitivo)               |
| **Ridefinizione possibile?**    | ❌ No                 | ✅ Sì (può essere ridefinita in più punti) |
| **Supporta Unioni (`            | `)?**                | ✅ Sì                                      |
| **Supporta Tuple?**             | ✅ Sì                 | ❌ No                                      |
| **Supporta Mapped Types?**      | ✅ Sì                 | ❌ No                                      |
| **Supporta Tipi Condizionali?** | ✅ Sì                 | ❌ No                                      |

---

## **🎯 Conclusione**

Un **tipo (`type`)** in TypeScript è un alias per definire tipi complessi e può rappresentare: ✔️ Tipi primitivi, funzioni, oggetti  
✔️ Unioni e intersezioni  
✔️ Array, tuple, tipi condizionali

📌 **Usa `type` se...**

- Devi unire più tipi con `|`
- Hai bisogno di tipi più complessi come tuple o tipi condizionali
- Vuoi definire alias per tipi primitivi

📌 **Usa `interface` se...**

- Devi definire la struttura di un oggetto che può essere esteso o modificato
- Lavori con OOP e classi

---
