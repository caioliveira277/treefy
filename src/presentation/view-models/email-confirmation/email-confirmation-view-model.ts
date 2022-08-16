import { Authentication } from '@/domain/usecases';
import { Validation } from '@/presentation/protocols/validation';
import { BaseViewModel } from '../base-view-model';

export interface EmailConfirmationViewModel extends BaseViewModel {
  validation: Validation;
  authentication: Authentication;

  form: { email: string };
  formErrors: EmailConfirmationViewModel['form'];

  handleEmailInputChange(value: string): void;
  handleSubmit(): void;
}
