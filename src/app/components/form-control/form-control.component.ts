import { CommonModule } from '@angular/common';
import {
  AfterContentInit,
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  ContentChild,
  DestroyRef,
  ElementRef,
  inject,
  Input,
} from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { AbstractControl } from '@angular/forms';

import { LabelComponent } from '../label/label.component';

@Component({
  selector: 'app-form-control',
  imports: [CommonModule, LabelComponent],
  templateUrl: './form-control.component.html',
  styleUrl: './form-control.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FormControlComponent implements AfterContentInit {
  @Input() fieldId?: string;
  @Input() label?: string;
  @Input() control?: AbstractControl;
  @Input() patternError?: string;

  @ContentChild('field', { static: false }) field?: ElementRef;

  private validClassName = 'is-valid';
  private invalidClassName = 'is-invalid';
  private destroyRef = inject(DestroyRef);

  constructor(private cdr: ChangeDetectorRef) {}

  ngAfterContentInit(): void {
    if (this.field && this.control) {
      this.control.events
        .pipe(takeUntilDestroyed(this.destroyRef))
        .subscribe(() => {
          this.toggleValidationClass();
        });
    }
  }

  get errorKey() {
    return this.control?.errors && Object.keys(this.control.errors)[0];
  }

  private toggleValidationClass(): void {
    if (!this.field || !this.control) {
      return;
    }

    const fieldEl = this.field.nativeElement;

    if (this.control.invalid && this.control.touched) {
      fieldEl.classList.add(this.invalidClassName);
    } else {
      fieldEl.classList.remove(this.invalidClassName);
    }

    if (this.control.valid) {
      fieldEl.classList.add(this.validClassName);
    } else {
      fieldEl.classList.remove(this.validClassName);
    }

    this.cdr.markForCheck();
  }
}
