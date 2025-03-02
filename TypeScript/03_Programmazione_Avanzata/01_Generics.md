
# 📌 Generics in TypeScript

## 🎯 Introduzione
I **Generics** permettono di creare funzioni, classi e interfacce **riutilizzabili** che possono operare su **tipi diversi**, senza perdere la sicurezza dei tipi.

---

## 📌 Funzioni Generiche
### 🔹 Senza Generics (Funzione meno flessibile)
```ts
function identitàStringa(valore: string): string {
    return valore;
}

function identitàNumero(valore: number): number {
    return valore;
}
````

📌 Qui abbiamo due funzioni quasi identiche, ma per **tipi diversi**.

### 🔹 Con Generics (Funzione riutilizzabile)

```ts
function identità<T>(valore: T): T {
    return valore;
}

console.log(identità<string>("Ciao")); // "Ciao"
console.log(identità<number>(42)); // 42
```

📌 **`<T>`** indica che il parametro `valore` può essere di **qualsiasi tipo**.

---

## 📌 Tipizzazione Automatica (`Type Inference`)

TypeScript può **dedurre il tipo** senza specificarlo manualmente.

```ts
let risultato = identità(10); // TypeScript capisce che è `number`
console.log(typeof risultato); // "number"
```

---

## 📌 Array e Generics

I Generics permettono di creare funzioni flessibili per **qualsiasi tipo di array**.

```ts
function primoElemento<T>(array: T[]): T {
    return array[0];
}

console.log(primoElemento([1, 2, 3])); // 1
console.log(primoElemento(["Alice", "Bob"])); // "Alice"
```

📌 La funzione **accetta array di qualsiasi tipo** (`number[]`, `string[]`, ecc.).

---

## 📌 Interfacce e Generics

Le interfacce possono utilizzare **parametri generici** per essere più flessibili.

```ts
interface Coppia<T, U> {
    primo: T;
    secondo: U;
}

let coppiaNumeri: Coppia<number, number> = { primo: 1, secondo: 2 };
let coppiaMista: Coppia<string, boolean> = { primo: "Attivo", secondo: true };
```

📌 **`Coppia<T, U>`** è un'interfaccia che accetta **due tipi diversi**.

---

## 📌 Classi Generiche

Le classi possono usare Generics per gestire dati di vari tipi.

```ts
class Contenitore<T> {
    private valore: T;

    constructor(valore: T) {
        this.valore = valore;
    }

    getValore(): T {
        return this.valore;
    }
}

let numero = new Contenitore<number>(10);
console.log(numero.getValore()); // 10

let testo = new Contenitore<string>("Hello");
console.log(testo.getValore()); // "Hello"
```

📌 La classe `Contenitore<T>` può contenere **qualsiasi tipo di dato**.

---

## 📌 Vincolare i Tipi (`extends`)

Possiamo limitare i Generics ai soli tipi che rispettano un'interfaccia.

```ts
interface Persona {
    nome: string;
}

function mostraNome<T extends Persona>(valore: T): void {
    console.log(valore.nome);
}

mostraNome({ nome: "Alice" }); // "Alice"
// mostraNome({ cognome: "Rossi" }); ❌ Errore: manca `nome`
```

📌 `T extends Persona` significa che **T deve avere almeno un `nome`**.

---

## 📌 Riepilogo

|Concetto|Descrizione|Esempio|
|---|---|---|
|Funzione Generica|Funzione riutilizzabile per più tipi|`function identità<T>(valore: T): T {}`|
|Type Inference|TypeScript deduce il tipo automaticamente|`identità(42)`|
|Generics con Array|Accettano array di qualsiasi tipo|`function primoElemento<T>(array: T[])`|
|Interfacce Generiche|Strutture flessibili per oggetti|`interface Coppia<T, U> { primo: T; secondo: U; }`|
|Classi Generiche|Classi riutilizzabili per più tipi|`class Contenitore<T> {}`|
|Vincoli (`extends`)|Limita i tipi generici a una specifica interfaccia|`function mostraNome<T extends Persona>(valore: T)`|

---
