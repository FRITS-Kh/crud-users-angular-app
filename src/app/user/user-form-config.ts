import { Validators } from '@angular/forms';

import { regex } from '../utils/regex';

export const userNameMaxLength = 100;

export const userFormValidators = {
  name: [
    Validators.required,
    Validators.maxLength(userNameMaxLength),
    Validators.pattern(regex.latinAndNumbersAndSpaces),
  ],
  email: [Validators.required, Validators.email],
  additionalEmails: [Validators.required, Validators.email],
};
