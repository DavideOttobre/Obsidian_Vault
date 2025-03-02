# Template-driven Forms vs Reactive Forms in Angular

In Angular, esistono due approcci per gestire i moduli (`Forms`):

✅ **Template-driven Forms** → Usano `ngModel` per gestire i dati direttamente nel template.  
✅ **Reactive Forms** → Usano `FormControl` e `FormGroup` per gestire i dati nel TypeScript.  

---

## 📌 1. Differenze tra Template-driven Forms e Reactive Forms

| Caratteristica | Template-driven Forms | Reactive Forms |
|--------------|--------------------|----------------|
| **Dove viene gestito il form?** | Nel Template (`HTML`) | Nel TypeScript (`.ts`) |
| **Binding dei dati** | `ngModel` (Two-way binding) | `FormControl` e `FormGroup` |
| **Validazioni** | Direttamente negli attributi HTML | Gestite nel TypeScript con `Validators` |
| **Utilizzo di servizi** | Difficile da integrare con i servizi | Più flessibile e strutturato |
| **Quando usarlo?** | Form semplici e veloci | Form complessi e dinamici |

---

## 📌 2. Importare il Modulo dei Forms

Entrambi i metodi richiedono l'importazione di moduli specifici in **`app.module.ts`**:

```typescript
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@NgModule({
  imports: [FormsModule, ReactiveFormsModule]
})
export class AppModule {}
````

✅ **`FormsModule`** è necessario per Template-driven Forms.  
✅ **`ReactiveFormsModule`** è necessario per Reactive Forms.

---

# 📌 3. Template-driven Forms: Moduli Basati sul Template

I **Template-driven Forms** sono semplici da configurare e utilizzano `ngModel` per il binding dei dati.

### **1️⃣ Creare un Modulo di Registrazione**

**File `registrazione.component.html`**

```html
<form #form="ngForm" (ngSubmit)="onSubmit(form)">
  <label>Nome:</label>
  <input type="text" name="nome" ngModel required>
  
  <label>Email:</label>
  <input type="email" name="email" ngModel required>

  <button type="submit" [disabled]="form.invalid">Invia</button>
</form>
```

### **2️⃣ Gestire i Dati nel Component**

**File `registrazione.component.ts`**

```typescript
import { Component } from '@angular/core';

@Component({
  selector: 'app-registrazione',
  templateUrl: './registrazione.component.html'
})
export class RegistrazioneComponent {
  onSubmit(form: any) {
    console.log('Dati inviati:', form.value);
  }
}
```

✅ **`ngModel` collega i campi direttamente agli oggetti del modulo.**  
✅ **Il form è gestito direttamente nel template.**

---

## 📌 4. Reactive Forms: Controllo Totale con TypeScript

I **Reactive Forms** offrono maggiore flessibilità e sono ideali per moduli complessi.

### **1️⃣ Creare il Modulo di Registrazione**

**File `registrazione-reactive.component.html`**

```html
<form [formGroup]="form" (ngSubmit)="onSubmit()">
  <label>Nome:</label>
  <input type="text" formControlName="nome">

  <label>Email:</label>
  <input type="email" formControlName="email">

  <button type="submit" [disabled]="form.invalid">Invia</button>
</form>
```

### **2️⃣ Definire il Form nel Component**

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
    email: new FormControl('', [Validators.required, Validators.email])
  });

  onSubmit() {
    console.log('Dati inviati:', this.form.value);
  }
}
```

✅ **`FormGroup` e `FormControl` gestiscono i dati e le validazioni direttamente nel TypeScript.**  
✅ **Le validazioni sono definite con `Validators` e possono essere personalizzate.**

---

## 📌 5. Validazione dei Form

Entrambi i tipi di form supportano validazioni, ma in modo diverso.

### **1️⃣ Validazione nei Template-driven Forms**

```html
<input type="text" name="nome" ngModel required>
<p *ngIf="nome.invalid && nome.touched">Il nome è obbligatorio!</p>
```

### **2️⃣ Validazione nei Reactive Forms**

```html
<input type="text" formControlName="nome">
<p *ngIf="form.get('nome')?.invalid && form.get('nome')?.touched">Il nome è obbligatorio!</p>
```

✅ **I Reactive Forms permettono una gestione più avanzata delle validazioni.**

---

## 📌 6. Confronto Finale: Quando Usare Cosa?

|Caso d'uso|Template-driven Forms|Reactive Forms|
|---|---|---|
|**Form semplice**|✅|❌|
|**Validazioni avanzate**|❌|✅|
|**Dati dinamici e servizi**|❌|✅|
|**Struttura scalabile**|❌|✅|

📌 **Se il form è piccolo e semplice → `Template-driven Forms`**  
📌 **Se il form è complesso o ha validazioni avanzate → `Reactive Forms`**

---

## 🔥 Conclusione

Abbiamo visto: ✅ **Differenze tra Template-driven e Reactive Forms**  
✅ **Come creare moduli con entrambi gli approcci**  
✅ **Validazione nei due tipi di form**  
✅ **Quando scegliere un metodo rispetto all’altro**
