import { FormGroup } from '@angular/forms';
import { ImputationData } from '../shared/imputation/imputation.model';

export enum FormMode { CREATE, UPDATE }

export abstract class SettingsFormAbstract<T extends ImputationData> {
  form: FormGroup;
  submitted: boolean;
  loading: boolean;
  buttonName: string;

  protected mode: FormMode = FormMode.CREATE;

  protected abstract create (type: T);

  protected abstract update (type: T);

  protected abstract remove (type: T);

  onSubmit () {
    this.submitted = true;

    if (this.form.invalid) {
      for (const keys of Object.keys(this.form.controls)) {
        this.form.controls[keys].markAsDirty();
      }

      return;
    }

    switch (this.mode) {
      case FormMode.CREATE:
        delete this.form.value.$key;

        this.create(this.form.value as T);
        break;

      case FormMode.UPDATE:
        this.update(this.form.value as T);
        break;
    }

    this.form.reset();
    this.submitted = false;
    this.switchMode(FormMode.CREATE);
  }

  onEdit (type: T) {
    this.switchMode(FormMode.UPDATE);

    this.form.setValue(Object.assign({
      $key: type.$key
    }, type));
  }

  onRemove (type: T) {
    this.remove(type);
  }

  protected switchMode (mode: FormMode) {
    switch (mode) {
      case FormMode.CREATE:
        this.mode = FormMode.CREATE;
        this.buttonName = 'Créer';
        break;

      case FormMode.UPDATE:
        this.mode = FormMode.UPDATE;
        this.buttonName = 'Modifier';
        break;
    }
  }

}
