## **📌 Definizione Esaustiva delle Interfacce (`interface`) in TypeScript**

Un’**interfaccia** in TypeScript è un **contratto** che definisce la struttura di un oggetto, specificando quali proprietà e metodi deve avere. Le interfacce **non forniscono un'implementazione**, ma servono a tipizzare oggetti e classi.

> **Analogia**: Un’interfaccia è come un **modulo di un documento** in cui devi compilare campi specifici. Se non riempi tutti i campi richiesti, il modulo è incompleto e non valido.

---

## **1️⃣ Dichiarare un'Interfaccia in TypeScript**

La sintassi di una `interface` è:

```typescript
interface Persona {
  nome: string;
  eta: number;
}
```

Ora possiamo usare questa interfaccia per tipizzare un oggetto:

```typescript
const mario: Persona = { nome: "Mario", eta: 30 }; // ✅ OK
const errato: Persona = { nome: "Anna" }; // ❌ Errore: manca `eta`
```

> **Analogia**: Un’interfaccia è come **un contratto** che un oggetto deve rispettare.

---

## **2️⃣ Proprietà Opzionali (`?`)**

Se una proprietà non è sempre presente, possiamo renderla **opzionale** con `?`.

```typescript
interface Auto {
  marca: string;
  modello?: string; // Opzionale
}

const auto1: Auto = { marca: "Toyota" }; // ✅ OK
const auto2: Auto = { marca: "Fiat", modello: "500" }; // ✅ OK
```

> **Analogia**: È come un **campo facoltativo** in un modulo.

---

## **3️⃣ Proprietà di Sola Lettura (`readonly`)**

Possiamo impedire la modifica di una proprietà dopo l’assegnazione usando `readonly`.

```typescript
interface Prodotto {
  readonly id: number;
  nome: string;
}

const p: Prodotto = { id: 1, nome: "Telefono" };

p.nome = "Smartphone"; // ✅ OK
p.id = 2; // ❌ Errore: `id` è di sola lettura
```

> **Analogia**: È come un **numero di serie** su un prodotto: una volta assegnato, non può cambiare.

---

## **4️⃣ Le Interfacce Possono Definire Metodi**

Un'interfaccia può includere metodi senza fornire l’implementazione.

```typescript
interface Animale {
  nome: string;
  emettiSuono(): string;
}

const cane: Animale = {
  nome: "Fido",
  emettiSuono() {
    return "Bau!";
  },
};

console.log(cane.emettiSuono()); // ✅ "Bau!"
```

> **Analogia**: È come una **linea guida** per scrivere una funzione senza specificarne i dettagli.

---

## **5️⃣ Interfacce con Indici Dinamici (`[key: type]`)**

Le interfacce possono accettare proprietà dinamiche con chiavi sconosciute in anticipo.

```typescript
interface RegistroStudenti {
  [matricola: string]: string;
}

const registro: RegistroStudenti = {
  "123": "Alice",
  "456": "Bob",
};

console.log(registro["123"]); // "Alice"
```

> **Analogia**: È come un **dizionario**, dove possiamo cercare valori tramite una chiave.

---

## **6️⃣ Le Interfacce Possono Estendere Altre Interfacce**

Le interfacce possono essere **estese** per riutilizzare le proprietà di un’altra interfaccia.

```typescript
interface Animale {
  specie: string;
}

interface Cane extends Animale {
  razza: string;
}

const labrador: Cane = { specie: "Mammifero", razza: "Labrador" }; // ✅ OK
```

> **Analogia**: Se `Animale` è una **categoria generale**, `Cane` è una sua **sottocategoria**.

📌 **Differenza con `type`**: Con `type`, l’estensione si fa con `&` invece di `extends`.

```typescript
type Animale = { specie: string };
type Cane = Animale & { razza: string };
```

---

## **7️⃣ Le Interfacce Possono Essere Ridefinite**

Uno dei vantaggi delle interfacce è che possono essere **modificate in più file**.

```typescript
interface Auto {
  marca: string;
}

// Aggiungiamo una nuova proprietà alla stessa interfaccia
interface Auto {
  modello: string;
}

const miaAuto: Auto = { marca: "Toyota", modello: "Yaris" }; // ✅ OK
```

📌 **Con `type`, questa ridefinizione NON è possibile**.

> **Analogia**: È come un **documento Word** che puoi aggiornare e modificare nel tempo.

---

## **8️⃣ Le Interfacce Possono Essere Implementate dalle Classi**

Le interfacce si usano spesso per tipizzare **classi**.

```typescript
interface Persona {
  nome: string;
  eta: number;
  saluta(): string;
}

class Studente implements Persona {
  nome: string;
  eta: number;

  constructor(nome: string, eta: number) {
    this.nome = nome;
    this.eta = eta;
  }

  saluta(): string {
    return `Ciao, sono ${this.nome} e ho ${this.eta} anni!`;
  }
}

const s1 = new Studente("Giulia", 22);
console.log(s1.saluta()); // ✅ "Ciao, sono Giulia e ho 22 anni!"
```

> **Analogia**: Se un’interfaccia è un **contratto**, allora una classe che la implementa è come una **fabbrica** che produce oggetti seguendo quel contratto.

---

## **📌 Riepilogo: Differenze tra `interface` e `type`**

|**Caratteristica**|**`interface`**|**`type`**|
|---|---|---|
|**Definizione di oggetti**|✅ Sì|✅ Sì|
|**Supporta Unioni (`|`)?**|❌ No|
|**Supporta Intersezioni (`&`)?**|❌ No (usa `extends`)|✅ Sì|
|**Ridefinizione possibile?**|✅ Sì|❌ No|
|**Usato per classi?**|✅ Sì (`implements`)|❌ No|
|**Può tipizzare funzioni?**|✅ Sì|✅ Sì|
|**Può tipizzare tuple?**|❌ No|✅ Sì|
|**Supporta tipi condizionali?**|❌ No|✅ Sì|

---

## **🎯 Quando Usare `interface` e Quando `type`?**

📌 **Usa `interface` se...**

- Stai definendo la struttura di **oggetti e classi**
- Vuoi poter **estendere** l’interfaccia in più punti
- Hai bisogno della possibilità di **ridefinire** l’interfaccia in più file

📌 **Usa `type` se...**

- Devi combinare **tipi primitivi**, come `string | number`
- Hai bisogno di **unioni (`|`)** o **intersezioni (`&`)**
- Devi definire **tuple**, tipi condizionali o mapped types

---

## **🎯 Conclusione**

Un'**interfaccia (`interface`)** in TypeScript è un **contratto** per definire la struttura di un oggetto o di una classe.  
✔️ Permette l’**ereditarietà** (`extends`)  
✔️ Può essere **ridefinita** in più file  
✔️ È più adatta per **classi e OOP**

> 🔥 **Regola d’oro**: Se stai modellando **un oggetto o una classe**, usa `interface`. Se hai bisogno di un tipo **più generico e flessibile**, usa `type`.
