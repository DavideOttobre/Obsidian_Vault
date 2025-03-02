# Validazione Personalizzata nei Reactive Forms di Angular

Oltre ai **validatori predefiniti** (`Validators.required`, `Validators.email`, ecc.), Angular permette di creare **validazioni personalizzate** per esigenze specifiche.

---

## 📌 1. Cos'è una Validazione Personalizzata?

✅ **Permette di definire regole di validazione complesse**  
✅ **Restituisce un errore solo se il valore non rispetta la regola**  
✅ **Può essere usata su singoli campi (`FormControl`) o su gruppi (`FormGroup`)**  

📌 **Utile per password sicure, email univoche, età minime, ecc.**

---

## 📌 2. Creare un Validatore Personalizzato

Un validatore personalizzato è una funzione che accetta un `FormControl` e restituisce un oggetto di errore o `null`.

### **1️⃣ Validatore per una Password Sicura**

Creiamo un file separato per i validatori:

**File `validators/password-validator.ts`**
```typescript
import { AbstractControl, ValidationErrors } from '@angular/forms';

export function passwordForteValidator(control: AbstractControl): ValidationErrors | null {
  const valore = control.value;
  if (!valore) return null;

  const haNumero = /[0-9]/.test(valore);
  const haMaiuscola = /[A-Z]/.test(valore);
  const haMinuscola = /[a-z]/.test(valore);
  const lunghezzaMinima = valore.length >= 8;

  return haNumero && haMaiuscola && haMinuscola && lunghezzaMinima ? null : { passwordForte: true };
}
````

---

### **2️⃣ Usare il Validatore in un Form**

**File `registrazione.component.ts`**

```typescript
import { Component } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { passwordForteValidator } from '../validators/password-validator';

@Component({
  selector: 'app-registrazione',
  templateUrl: './registrazione.component.html'
})
export class RegistrazioneComponent {
  form = new FormGroup({
    password: new FormControl('', [Validators.required, passwordForteValidator])
  });

  onSubmit() {
    console.log('Dati inviati:', this.form.value);
  }
}
```

---

### **3️⃣ Mostrare il Messaggio di Errore nel Template**

**File `registrazione.component.html`**

```html
<label>Password:</label>
<input type="password" formControlName="password">
<p *ngIf="form.get('password')?.errors?.passwordForte">
  La password deve contenere almeno 8 caratteri, una maiuscola, una minuscola e un numero!
</p>
```

✅ **Ora il campo password viene validato con il nostro validatore personalizzato.**

---

## 📌 3. Creare un Validatore Asincrono (Es. Email Unica)

I validatori asincroni sono utili per controlli che coinvolgono un **server**, come verificare se un’email è già registrata.

### **1️⃣ Creare il Validatore Asincrono**

**File `validators/email-unica.validator.ts`**

```typescript
import { AbstractControl, ValidationErrors } from '@angular/forms';
import { Observable, of } from 'rxjs';
import { delay, map } from 'rxjs/operators';

export function emailUnicaValidator(control: AbstractControl): Observable<ValidationErrors | null> {
  const emailEsistenti = ['test@mail.com', 'admin@mail.com'];

  return of(emailEsistenti.includes(control.value)).pipe(
    delay(1000), // Simula una chiamata HTTP
    map(esiste => (esiste ? { emailUnica: true } : null))
  );
}
```

---

### **2️⃣ Applicare il Validatore Asincrono al Form**

**File `registrazione.component.ts`**

```typescript
import { FormGroup, FormControl, Validators, AsyncValidatorFn } from '@angular/forms';
import { emailUnicaValidator } from '../validators/email-unica.validator';

this.form = new FormGroup({
  email: new FormControl('', [Validators.required, Validators.email], [emailUnicaValidator])
});
```

---

### **3️⃣ Mostrare l'Errore nel Template**

**File `registrazione.component.html`**

```html
<label>Email:</label>
<input type="email" formControlName="email">
<p *ngIf="form.get('email')?.errors?.emailUnica">Questa email è già registrata!</p>
```

✅ **Ora se l’utente inserisce un’email già usata, viene mostrato un errore dopo 1 secondo.**

---

## 📌 4. Validare un Intero `FormGroup` (Esempio: Confronto Password)

Se vogliamo verificare che due campi siano uguali (es. **password e conferma password**), dobbiamo validare l’intero `FormGroup`.

### **1️⃣ Creare il Validatore di Confronto**

**File `validators/match-password.validator.ts`**

```typescript
import { AbstractControl, ValidationErrors } from '@angular/forms';

export function matchPasswordValidator(control: AbstractControl): ValidationErrors | null {
  const password = control.get('password')?.value;
  const conferma = control.get('confermaPassword')?.value;
  return password === conferma ? null : { passwordMismatch: true };
}
```

---

### **2️⃣ Applicare il Validatore al FormGroup**

**File `registrazione.component.ts`**

```typescript
import { FormBuilder } from '@angular/forms';
import { matchPasswordValidator } from '../validators/match-password.validator';

this.form = this.fb.group(
  {
    password: ['', Validators.required],
    confermaPassword: ['', Validators.required]
  },
  { validators: matchPasswordValidator }
);
```

---

### **3️⃣ Mostrare l'Errore nel Template**

**File `registrazione.component.html`**

```html
<label>Password:</label>
<input type="password" formControlName="password">

<label>Conferma Password:</label>
<input type="password" formControlName="confermaPassword">

<p *ngIf="form.errors?.passwordMismatch">Le password non corrispondono!</p>
```

✅ **Ora il form mostra un errore se le due password non coincidono.**

---

## 📌 5. Controllare Validità dei Campi con `statusChanges`

Possiamo ascoltare i cambiamenti nello stato del campo (`valid`, `invalid`, `pending`, `disabled`).

```typescript
this.form.get('email')?.statusChanges.subscribe(status => {
  console.log('Stato del campo email:', status); // 'VALID', 'INVALID', 'PENDING'
});
```

✅ **Utile per mostrare messaggi dinamici in base alla validità.**

---

## 📌 6. Disabilitare un Campo Dinamicamente

Possiamo disabilitare campi in base a condizioni:

```typescript
this.form.get('email')?.disable(); // Disabilita il campo
this.form.get('email')?.enable(); // Riabilita il campo
```

✅ **Utile per logiche condizionali nei moduli.**

---

## 🔥 Conclusione

Abbiamo visto: ✅ **Come creare validatori personalizzati (`passwordForteValidator`)**  
✅ **Validazioni asincrone (`emailUnicaValidator`)**  
✅ **Validazione di `FormGroup` (`matchPasswordValidator`)**  
✅ **Ascoltare cambiamenti nei campi con `statusChanges`**  
✅ **Abilitare/disabilitare campi dinamicamente**
