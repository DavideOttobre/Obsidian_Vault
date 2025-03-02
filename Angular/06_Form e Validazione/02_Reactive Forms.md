# Reactive Forms in Angular

I **Reactive Forms** offrono un controllo completo sulla gestione dei moduli in Angular, permettendo una manipolazione avanzata dei dati e delle validazioni.

---

## 📌 1. Cos'è un Reactive Form?

✅ **Gestito in TypeScript** con `FormGroup`, `FormControl`, `Validators`  
✅ **Supporta validazioni avanzate e logiche dinamiche**  
✅ **Facile integrazione con API e servizi**  
✅ **Più strutturato rispetto ai Template-driven Forms**  

📌 **Ideale per moduli complessi e dinamici.**  

---

## 📌 2. Importare il Modulo `ReactiveFormsModule`

Prima di usare Reactive Forms, importiamo **`ReactiveFormsModule`** in **`app.module.ts`**:

```typescript
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { ReactiveFormsModule } from '@angular/forms';
import { AppComponent } from './app.component';

@NgModule({
  declarations: [AppComponent],
  imports: [BrowserModule, ReactiveFormsModule], // Import ReactiveFormsModule
  bootstrap: [AppComponent]
})
export class AppModule {}
````

✅ **Ora possiamo usare Reactive Forms nei componenti dell’app.**

---

## 📌 3. Creare un Modulo con `FormGroup` e `FormControl`

### **1️⃣ Definiamo un Modulo di Registrazione**

**File `registrazione-reactive.component.ts`**

```typescript
import { Component } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-registrazione-reactive',
  templateUrl: './registrazione-reactive.component.html'
})
export class RegistrazioneReactiveComponent {
  form = new FormGroup({
    nome: new FormControl('', Validators.required),
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [Validators.required, Validators.minLength(6)])
  });

  onSubmit() {
    console.log('Dati inviati:', this.form.value);
  }
}
```

---

### **2️⃣ Creiamo il Template del Form**

**File `registrazione-reactive.component.html`**

```html
<form [formGroup]="form" (ngSubmit)="onSubmit()">
  <label>Nome:</label>
  <input type="text" formControlName="nome">
  <p *ngIf="form.get('nome')?.invalid && form.get('nome')?.touched">Il nome è obbligatorio!</p>

  <label>Email:</label>
  <input type="email" formControlName="email">
  <p *ngIf="form.get('email')?.invalid && form.get('email')?.touched">Email non valida!</p>

  <label>Password:</label>
  <input type="password" formControlName="password">
  <p *ngIf="form.get('password')?.invalid && form.get('password')?.touched">Minimo 6 caratteri!</p>

  <button type="submit" [disabled]="form.invalid">Invia</button>
</form>
```

✅ **`formControlName` collega i campi HTML con il `FormGroup` nel componente.**  
✅ **Il bottone è disabilitato finché il form non è valido.**

---

## 📌 4. Aggiungere Validazioni Personalizzate

### **1️⃣ Creiamo un Validatore Personalizzato**

**File `validatori/password-validator.ts`**

```typescript
import { AbstractControl, ValidationErrors } from '@angular/forms';

export function passwordForteValidator(control: AbstractControl): ValidationErrors | null {
  const valore = control.value;
  const haNumero = /[0-9]/.test(valore);
  const haMaiuscola = /[A-Z]/.test(valore);
  const haMinuscola = /[a-z]/.test(valore);
  const lunghezzaValida = valore.length >= 8;

  if (haNumero && haMaiuscola && haMinuscola && lunghezzaValida) {
    return null; // Valido
  } else {
    return { passwordForte: true }; // Errore di validazione
  }
}
```

### **2️⃣ Applichiamo il Validatore al Form**

```typescript
import { passwordForteValidator } from '../validatori/password-validator';

this.form = new FormGroup({
  password: new FormControl('', [Validators.required, passwordForteValidator])
});
```

### **3️⃣ Mostrare l'Errore nel Template**

```html
<p *ngIf="form.get('password')?.errors?.passwordForte">La password deve contenere almeno 8 caratteri, una maiuscola, una minuscola e un numero!</p>
```

✅ **Ora il form controllerà se la password è forte.**

---

## 📌 5. Aggiungere e Rimuovere Campi Dinamicamente

Se vogliamo permettere all’utente di aggiungere più indirizzi email, possiamo usare `FormArray`.

### **1️⃣ Creiamo un Form con `FormArray`**

```typescript
import { FormArray, FormBuilder } from '@angular/forms';

this.form = this.fb.group({
  emails: this.fb.array([])
});

get emails() {
  return this.form.get('emails') as FormArray;
}

aggiungiEmail() {
  this.emails.push(this.fb.control(''));
}

rimuoviEmail(index: number) {
  this.emails.removeAt(index);
}
```

### **2️⃣ Creiamo il Template**

```html
<div formArrayName="emails">
  <div *ngFor="let email of emails.controls; let i = index">
    <input [formControlName]="i">
    <button (click)="rimuoviEmail(i)">Rimuovi</button>
  </div>
</div>
<button (click)="aggiungiEmail()">Aggiungi Email</button>
```

✅ **Ora l’utente può aggiungere e rimuovere campi dinamicamente.**

---

## 📌 6. Lavorare con `FormBuilder`

`FormBuilder` semplifica la creazione dei form rispetto all’uso di `new FormGroup()`.

### **1️⃣ Creiamo il Form con `FormBuilder`**

```typescript
import { FormBuilder } from '@angular/forms';

constructor(private fb: FormBuilder) {
  this.form = this.fb.group({
    nome: [''],
    email: ['', Validators.required],
    password: ['', Validators.required]
  });
}
```

✅ **Meno codice rispetto a `new FormGroup()`!**

---

## 📌 7. Ascoltare i Cambiamenti nei Campi (`valueChanges`)

Possiamo rilevare le modifiche ai campi in tempo reale.

```typescript
this.form.get('email')?.valueChanges.subscribe(value => {
  console.log('Email cambiata:', value);
});
```

✅ **Utile per aggiornare suggerimenti o validazioni live.**

---

## 📌 8. Inviare i Dati a un Server con `HttpClient`

Dopo aver validato il form, possiamo inviare i dati a un’API.

```typescript
import { HttpClient } from '@angular/common/http';

constructor(private http: HttpClient) {}

onSubmit() {
  this.http.post('https://api.example.com/registrazione', this.form.value)
    .subscribe(response => console.log('Risposta dal server:', response));
}
```

✅ **Ora i dati vengono inviati a un server remoto.**

---

## 🔥 Conclusione

Abbiamo visto: ✅ **Come creare Reactive Forms con `FormGroup` e `FormControl`**  
✅ **Validazioni predefinite (`Validators`) e personalizzate**  
✅ **Aggiungere campi dinamici con `FormArray`**  
✅ **Usare `FormBuilder` per semplificare i form**  
✅ **Monitorare cambiamenti con `valueChanges`**  
✅ **Inviare dati a un server con `HttpClient`**
