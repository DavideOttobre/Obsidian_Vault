# 📌 Interfacce in TypeScript

## 🎯 Introduzione
Le **interfacce** in TypeScript definiscono la struttura di un oggetto, garantendo che segua un determinato schema.

---

## 📌 Creazione di un'Interfaccia
```ts
interface Persona {
    nome: string;
    età: number;
    email?: string; // Proprietà opzionale
}

let utente: Persona = {
    nome: "Alice",
    età: 25
};
````

📌 L'email è opzionale, quindi non è obbligatorio specificarla.

---

## 📌 Metodi nelle Interfacce

Le interfacce possono includere **metodi**.

```ts
interface Animale {
    nome: string;
    verso(): string;
}

let cane: Animale = {
    nome: "Fido",
    verso: () => "Bau Bau!"
};

console.log(cane.verso()); // "Bau Bau!"
```

---

## 📌 Estendere le Interfacce (`extends`)

Un'interfaccia può **ereditare** un'altra interfaccia.

```ts
interface Studente {
    matricola: number;
}

interface StudentePersona extends Persona, Studente {}

let studente: StudentePersona = {
    nome: "Luca",
    età: 22,
    matricola: 12345
};
```

📌 `StudentePersona` eredita le proprietà di `Persona` e `Studente`.

---

## 📌 Interfacce per le Funzioni

Le interfacce possono definire **tipi di funzione**.

```ts
interface Somma {
    (a: number, b: number): number;
}

const somma: Somma = (x, y) => x + y;
console.log(somma(3, 7)); // 10
```

📌 Questo garantisce che `somma` accetti solo numeri e restituisca un numero.

---

## 📌 Interfacce e Classi

Le interfacce possono essere implementate nelle classi con `implements`.

```ts
interface Veicolo {
    marca: string;
    avvia(): void;
}

class Auto implements Veicolo {
    marca: string;

    constructor(marca: string) {
        this.marca = marca;
    }

    avvia() {
        console.log(`${this.marca} in movimento`);
    }
}

let tesla = new Auto("Tesla");
tesla.avvia(); // "Tesla in movimento"
```

📌 La classe `Auto` **deve** implementare tutte le proprietà e metodi definiti in `Veicolo`.

---

## 📌 Differenza tra **Interfacce** e **Alias di Tipo**

|Caratteristica|`interface`|`type`|
|---|---|---|
|Definisce oggetti e classi|✅|✅|
|Supporta l'ereditarietà (`extends`)|✅|❌|
|Supporta union/intersection types|❌|✅|
|Preferito per API e modelli dati|✅|❌|

---

## 📌 Riepilogo

✅ **Le interfacce** servono per definire oggetti e classi  
✅ **Possono estendere altre interfacce** con `extends`  
✅ **Possono essere usate per funzioni e classi**  
✅ **Sono consigliate per definire modelli di dati nelle API**

---
