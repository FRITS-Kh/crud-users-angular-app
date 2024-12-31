import { CommonModule } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  DestroyRef,
  inject,
} from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

import { FormControlComponent } from '../../components/form-control/form-control.component';
import { SpinnerComponent } from '../../components/spinner/spinner.component';
import { regexErrors } from '../../utils/regex';
import { userFormValidators, userNameMaxLength } from '../user-form-config';
import { UsersService } from '../users.service';

@Component({
  selector: 'app-add-user',
  imports: [
    CommonModule,
    FormControlComponent,
    ReactiveFormsModule,
    SpinnerComponent,
  ],
  templateUrl: './add-user.component.html',
  styleUrl: './add-user.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AddUserComponent {
  form: FormGroup;
  userNameMaxLength = userNameMaxLength;
  regexErrors = regexErrors;
  loading = false;
  private destroyRef = inject(DestroyRef);

  constructor(
    private usersService: UsersService,
    public modal: NgbActiveModal
  ) {
    this.form = new FormGroup({
      name: new FormControl(null, userFormValidators.name),
      email: new FormControl(null, userFormValidators.email),
    });
  }

  onSubmit(): void {
    this.form.markAllAsTouched();
    this.form.updateValueAndValidity();

    if (this.form.invalid) {
      return;
    }

    this.loading = true;
    this.usersService
      .addUser(this.form.value)
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe({
        next: (user) => {
          this.loading = false;
          this.modal.close(user);
        },
      });
  }
}
