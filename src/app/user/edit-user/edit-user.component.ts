import { CommonModule } from '@angular/common';
import { Component, DestroyRef, inject, OnInit } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import {
  FormArray,
  FormControl,
  FormGroup,
  ReactiveFormsModule,
} from '@angular/forms';
import { ActivatedRoute, RouterLink } from '@angular/router';

import { FormControlComponent } from '../../components/form-control/form-control.component';
import { LabelComponent } from '../../components/label/label.component';
import { GlobalLoaderService } from '../../global-loader/global-loader.service';
import { regexErrors } from '../../utils/regex';
import { AdditionalEmailsComponent } from '../additional-emails/additional-emails.component';
import { userFormValidators } from '../user-form-config';
import { User } from '../user.interfaces';
import { UsersService } from '../users.service';

@Component({
  selector: 'app-edit-user',
  imports: [
    CommonModule,
    RouterLink,
    FormControlComponent,
    ReactiveFormsModule,
    AdditionalEmailsComponent,
    LabelComponent,
  ],
  templateUrl: './edit-user.component.html',
  styleUrl: './edit-user.component.scss',
})
export class EditUserComponent implements OnInit {
  form: FormGroup;
  userNameMaxLength = 100;
  regexErrors = regexErrors;
  private userId: number;
  private destroyRef = inject(DestroyRef);

  constructor(
    private usersService: UsersService,
    private route: ActivatedRoute,
    private globalLoader: GlobalLoaderService
  ) {
    this.form = new FormGroup({
      name: new FormControl(null, userFormValidators.name),
      email: new FormControl(null, userFormValidators.email),
      additionalEmails: new FormArray([]),
    });

    this.userId = Number(this.route.snapshot.paramMap.get('id'));
  }

  ngOnInit(): void {
    const user = this.route.snapshot.data['user'] as User;

    if (user) {
      this.setFormData(user);
    }
  }

  setFormData(user: User): void {
    this.form.patchValue({
      name: user.name,
      email: user.email,
    });

    const additionalEmails = this.form.get('additionalEmails') as FormArray;

    user.additionalEmails?.forEach((email) => {
      additionalEmails.push(
        new FormControl(email, userFormValidators.additionalEmails)
      );
    });
  }

  onSubmit(): void {
    this.form.markAllAsTouched();
    this.form.updateValueAndValidity();

    if (this.form.invalid) {
      return;
    }

    const updatedUser: User = { id: this.userId, ...this.form.value };

    this.usersService
      .updateUser(updatedUser)
      .pipe(this.globalLoader.observe(), takeUntilDestroyed(this.destroyRef))
      .subscribe();
  }
}
