import { Authentication } from '@/domain/usecases';
import { BaseViewModel } from '../base-view-model';

export interface EmailConfirmationViewModel extends BaseViewModel {
  authentication: Authentication;

  emailValue: string;

  handleEmailInputChange(value: string): void;
  handleSubmit(): void;
}
