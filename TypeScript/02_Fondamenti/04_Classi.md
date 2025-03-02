
# 📌 Classi in TypeScript

## 🎯 Introduzione
Le **classi** in TypeScript seguono il modello della **programmazione orientata agli oggetti (OOP)**, supportando concetti come **ereditarietà, incapsulamento e polimorfismo**.

---

## 📌 Definizione di una Classe
```ts
class Persona {
    nome: string;
    età: number;

    constructor(nome: string, età: number) {
        this.nome = nome;
        this.età = età;
    }

    saluta(): string {
        return `Ciao, mi chiamo ${this.nome} e ho ${this.età} anni.`;
    }
}

const persona1 = new Persona("Alice", 30);
console.log(persona1.saluta()); // "Ciao, mi chiamo Alice e ho 30 anni."
````

📌 La classe **Persona** ha:

- **Proprietà (`nome`, `età`)**
- **Un costruttore (`constructor`)**
- **Un metodo (`saluta()`)**

---

## 📌 Modificatori di Accesso

I modificatori di accesso definiscono la visibilità delle proprietà e metodi.

|Modificatore|Descrizione|
|---|---|
|`public`|Accessibile ovunque|
|`private`|Accessibile solo all'interno della classe|
|`protected`|Accessibile solo dalla classe e dalle sottoclassi|

### 🔹 Esempio con `private` e `protected`

```ts
class ContoBancario {
    private saldo: number;

    constructor(saldoIniziale: number) {
        this.saldo = saldoIniziale;
    }

    deposita(importo: number) {
        this.saldo += importo;
        console.log(`Deposito di ${importo} effettuato. Saldo attuale: ${this.saldo}`);
    }

    getSaldo(): number {
        return this.saldo;
    }
}

const conto = new ContoBancario(1000);
conto.deposita(500);
// conto.saldo = 2000; ❌ Errore: saldo è `private`
console.log(conto.getSaldo()); // 1500
```

📌 **`private saldo`** impedisce di modificare il saldo direttamente dall'esterno della classe.

---

## 📌 Ereditarietà (`extends`)

Una classe può **ereditare** da un'altra con `extends`.

```ts
class Studente extends Persona {
    matricola: number;

    constructor(nome: string, età: number, matricola: number) {
        super(nome, età); // Richiama il costruttore della superclasse
        this.matricola = matricola;
    }

    studia() {
        return `${this.nome} sta studiando.`;
    }
}

const studente1 = new Studente("Luca", 20, 12345);
console.log(studente1.saluta()); // Eredita il metodo da Persona
console.log(studente1.studia()); // "Luca sta studiando."
```

📌 `super()` richiama il **costruttore della classe padre**.

---

## 📌 Classi Astratte (`abstract`)

Le classi astratte servono come **modelli** per altre classi e **non possono essere istanziate direttamente**.

```ts
abstract class Animale {
    abstract faiVerso(): void; // Metodo senza implementazione
}

class Cane extends Animale {
    faiVerso() {
        console.log("Bau Bau!");
    }
}

const fido = new Cane();
fido.faiVerso(); // "Bau Bau!"
```

📌 **`abstract`** impone che tutte le classi figlie implementino il metodo `faiVerso()`.

---

## 📌 Interfacce vs Classi

|Caratteristica|`interface`|`class`|
|---|---|---|
|Definisce un modello di dati|✅|✅|
|Può avere metodi concreti|❌|✅|
|Può essere istanziata|❌|✅|
|Supporta ereditarietà multipla|✅|❌|

📌 Usa **interfacce** per definire il modello e **classi** per l'implementazione.

---

## 📌 Riepilogo

✅ **Le classi definiscono oggetti con proprietà e metodi**  
✅ **I modificatori di accesso controllano la visibilità delle proprietà**  
✅ **L’ereditarietà (`extends`) permette di riutilizzare il codice**  
✅ **Le classi astratte (`abstract`) servono come base per altre classi**

---
