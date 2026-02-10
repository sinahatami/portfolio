export interface FormState {
  success: boolean;
  message: string;
  errors?: {
    email?: string[];
    message?: string[];
  };
}
