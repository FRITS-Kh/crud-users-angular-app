import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import {
  FormArray,
  FormControl,
  FormGroup,
  ReactiveFormsModule,
} from '@angular/forms';

import { FormControlComponent } from '../../components/form-control/form-control.component';
import { userFormValidators } from '../user-form-config';

@Component({
  selector: 'app-additional-emails',
  imports: [CommonModule, ReactiveFormsModule, FormControlComponent],
  templateUrl: './additional-emails.component.html',
  styleUrl: './additional-emails.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AdditionalEmailsComponent {
  @Input() form!: FormGroup;

  get additionalEmailsArray(): FormArray {
    return this.form.get('additionalEmails') as FormArray;
  }

  addEmail(): void {
    this.additionalEmailsArray.push(
      new FormControl(null, userFormValidators.additionalEmails)
    );
  }

  removeEmail(index: number): void {
    this.additionalEmailsArray.removeAt(index);
  }
}
