
# 📌 Decorators in TypeScript

## 🎯 Introduzione
I **Decorators** sono una funzionalità avanzata di TypeScript che permette di **aggiungere comportamenti a classi, metodi, proprietà e parametri** senza modificarne direttamente il codice.

📌 **I Decorators sono usati in NestJS, Angular e altre librerie TypeScript**.

---

## 📌 Abilitare i Decorators
Per usare i Decorators, bisogna attivarli in `tsconfig.json`:

```json
{
  "compilerOptions": {
    "experimentalDecorators": true,
    "emitDecoratorMetadata": true
  }
}
````

---

## 📌 Creare un Decorator di Classe

Un **Decorator di Classe** è una funzione che modifica il comportamento di una classe.

```ts
function LogClasse(target: Function) {
    console.log(`Classe creata: ${target.name}`);
}

@LogClasse
class Persona {
    constructor(public nome: string) {}
}

// Output: "Classe creata: Persona"
```

📌 Il Decorator `@LogClasse` viene eseguito **quando la classe viene definita**, non quando viene istanziata.

---

## 📌 Decorators per Proprietà

Un **Decorator di Proprietà** modifica una proprietà di una classe.

```ts
function ReadOnly(target: any, propertyKey: string) {
    Object.defineProperty(target, propertyKey, {
        writable: false
    });
}

class Auto {
    @ReadOnly
    marca: string = "Tesla";
}

let myCar = new Auto();
myCar.marca = "BMW"; // ❌ Errore: la proprietà è readonly
```

📌 Il Decorator `@ReadOnly` rende la proprietà `marca` **non modificabile**.

---

## 📌 Decorators per Metodi

Un **Decorator di Metodo** può **modificare o loggare** le chiamate ai metodi.

```ts
function LogMetodo(target: any, propertyKey: string, descriptor: PropertyDescriptor) {
    const metodoOriginale = descriptor.value;
    
    descriptor.value = function (...args: any[]) {
        console.log(`Chiamata a ${propertyKey} con parametri:`, args);
        return metodoOriginale.apply(this, args);
    };
}

class Calcolatrice {
    @LogMetodo
    somma(a: number, b: number): number {
        return a + b;
    }
}

const calc = new Calcolatrice();
calc.somma(3, 5); 
// Output: "Chiamata a somma con parametri: [3, 5]"
```

📌 Il Decorator `@LogMetodo` **logga i parametri** di ogni chiamata al metodo `somma()`.

---

## 📌 Decorators per Parametri

I **Decorators di Parametro** possono **ottenere informazioni sui parametri di un metodo**.

```ts
function LogParametro(target: any, metodo: string, indice: number) {
    console.log(`Parametro decorato in ${metodo} alla posizione ${indice}`);
}

class Prodotto {
    prezzo: number;

    constructor(prezzo: number) {
        this.prezzo = prezzo;
    }

    applicaSconto(@LogParametro percentuale: number) {
        this.prezzo -= (this.prezzo * percentuale) / 100;
    }
}

// Output: "Parametro decorato in applicaSconto alla posizione 0"
```

📌 `@LogParametro` indica che il primo parametro di `applicaSconto()` è decorato.

---

## 📌 Combinare più Decorators

I Decorators possono essere combinati applicandoli in ordine **dal basso verso l’alto**.

```ts
function Primo(target: any) {
    console.log("Primo Decorator");
}

function Secondo(target: any) {
    console.log("Secondo Decorator");
}

@Primo
@Secondo
class Test {}

// Output:
// "Secondo Decorator"
// "Primo Decorator"
```

📌 Il Decorator `@Secondo` viene eseguito **prima** di `@Primo`.

---

## 📌 Riepilogo

|Tipo di Decorator|Descrizione|Esempio|
|---|---|---|
|Classe|Modifica il comportamento di una classe|`@LogClasse`|
|Proprietà|Modifica una proprietà|`@ReadOnly`|
|Metodo|Modifica il comportamento di un metodo|`@LogMetodo`|
|Parametro|Modifica un parametro di un metodo|`@LogParametro`|
|Multipli|Applicabili in sequenza|`@Primo @Secondo class A {}`|

---
