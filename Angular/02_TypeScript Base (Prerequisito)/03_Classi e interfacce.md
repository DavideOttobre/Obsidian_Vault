# Classi e Interfacce in TypeScript

TypeScript supporta la **programmazione orientata agli oggetti (OOP)** con classi e interfacce, migliorando la struttura del codice rispetto a JavaScript.

---

## 📌 1. Classi in TypeScript

Le **classi** permettono di creare oggetti con proprietà e metodi.

### **Esempio base di una classe**
```typescript
class Persona {
  nome: string;
  eta: number;

  constructor(nome: string, eta: number) {
    this.nome = nome;
    this.eta = eta;
  }

  descrizione(): string {
    return `${this.nome} ha ${this.eta} anni.`;
  }
}

let utente = new Persona("Alice", 25);
console.log(utente.descrizione()); // Output: "Alice ha 25 anni."
````

✅ **Cosa succede qui?**

- `constructor` inizializza le proprietà della classe.
- `descrizione()` è un metodo che restituisce una stringa.
- Creiamo un oggetto con `new Persona("Alice", 25)`.

---

## 📌 2. Modificatori di Accesso

I **modificatori di accesso** controllano la visibilità delle proprietà e metodi di una classe.

|Modificatore|Descrizione|
|---|---|
|`public` (default)|Accessibile ovunque|
|`private`|Accessibile solo nella classe|
|`protected`|Accessibile nella classe e nelle sottoclassi|

### **Esempio di proprietà `private`**

```typescript
class ContoBancario {
  private saldo: number;

  constructor(saldoIniziale: number) {
    this.saldo = saldoIniziale;
  }

  deposita(importo: number): void {
    this.saldo += importo;
  }

  mostraSaldo(): number {
    return this.saldo;
  }
}

let conto = new ContoBancario(100);
conto.deposita(50);
console.log(conto.mostraSaldo()); // Output: 150
// console.log(conto.saldo); // Errore! `saldo` è privato.
```

✅ **Il saldo non è accessibile direttamente**, ma solo attraverso i metodi pubblici.

---

## 📌 3. Classi con Parametri di Costruttore

Possiamo semplificare la dichiarazione delle proprietà definendole direttamente nel costruttore:

```typescript
class Prodotto {
  constructor(public nome: string, private prezzo: number) {}

  getPrezzo(): number {
    return this.prezzo;
  }
}

let prodotto = new Prodotto("Laptop", 1200);
console.log(prodotto.nome); // Output: "Laptop"
console.log(prodotto.getPrezzo()); // Output: 1200
```

✅ **I parametri del costruttore vengono automaticamente assegnati come proprietà della classe.**

---

## 📌 4. Ereditarietà

TypeScript supporta l’**ereditarietà** con `extends`.

```typescript
class Animale {
  constructor(public nome: string) {}

  faiSuono(): void {
    console.log("Suono generico...");
  }
}

class Cane extends Animale {
  faiSuono(): void {
    console.log("Bau Bau!");
  }
}

let fido = new Cane("Fido");
fido.faiSuono(); // Output: "Bau Bau!"
```

✅ Il metodo `faiSuono()` viene **sovrascritto** nella sottoclasse.

---

## 📌 5. Super e Override

Possiamo usare `super` per richiamare il costruttore della classe padre.

```typescript
class Veicolo {
  constructor(public marca: string) {}

  descrizione(): string {
    return `Veicolo di marca ${this.marca}`;
  }
}

class Auto extends Veicolo {
  constructor(marca: string, public modello: string) {
    super(marca);
  }

  descrizione(): string {
    return `${super.descrizione()}, modello ${this.modello}`;
  }
}

let macchina = new Auto("Toyota", "Corolla");
console.log(macchina.descrizione());
// Output: "Veicolo di marca Toyota, modello Corolla"
```

---

## 📌 6. Classi Astratte

Le **classi astratte** servono da modello per altre classi e non possono essere istanziate direttamente.

```typescript
abstract class Forma {
  constructor(public nome: string) {}

  abstract calcolaArea(): number;

  descrizione(): void {
    console.log(`Questa è una forma: ${this.nome}`);
  }
}

class Rettangolo extends Forma {
  constructor(nome: string, private base: number, private altezza: number) {
    super(nome);
  }

  calcolaArea(): number {
    return this.base * this.altezza;
  }
}

let rett = new Rettangolo("Rettangolo", 10, 5);
console.log(rett.calcolaArea()); // Output: 50
```

✅ **La classe `Forma` impone alle sottoclassi di implementare `calcolaArea()`.**

---

## 📌 7. Interfacce

Le **interfacce** definiscono il **contratto** di un oggetto o classe.

```typescript
interface Persona {
  nome: string;
  eta: number;
  saluta(): string;
}

let utente: Persona = {
  nome: "Marco",
  eta: 28,
  saluta: () => "Ciao!"
};
console.log(utente.saluta()); // Output: "Ciao!"
```

✅ Le interfacce **non contengono implementazioni** ma solo la struttura.

---

## 📌 8. Implementazione di Interfacce nelle Classi

Una classe può **implementare** una o più interfacce con `implements`.

```typescript
interface Volante {
  vola(): void;
}

interface Nuotante {
  nuota(): void;
}

class Supereroe implements Volante, Nuotante {
  vola(): void {
    console.log("Sto volando!");
  }

  nuota(): void {
    console.log("Sto nuotando!");
  }
}

let eroe = new Supereroe();
eroe.vola(); // Output: "Sto volando!"
eroe.nuota(); // Output: "Sto nuotando!"
```

✅ Una classe può implementare **più interfacce**.

---

## 📌 9. Differenza tra Interfacce e Tipi

Entrambi servono per definire strutture, ma hanno alcune differenze.

|Caratteristica|`interface`|`type`|
|---|---|---|
|Estendibile|✅ Sì (con `extends`)|❌ No|
|Unione di tipi|❌ No|✅ Sì (`&`)|
|Può essere implementata da classi|✅ Sì|❌ No|

**Esempio con `type`:**

```typescript
type Persona = {
  nome: string;
  eta: number;
};
```

**Esempio con `interface`:**

```typescript
interface Persona {
  nome: string;
  eta: number;
}
```

---

## 🔥 Conclusione

Abbiamo visto: ✅ Classi e Modificatori di Accesso  
✅ Ereditarietà e Uso di `super`  
✅ Classi Astratte e Metodi Astratti  
✅ Interfacce e Implementazioni
