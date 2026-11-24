export type ContactField = "email" | "message";

/** Result of a contact submission, shaped for direct use by the form UI. */
export interface ContactFormState {
  status: "idle" | "success" | "error";
  message: string;
  fieldErrors?: Partial<Record<ContactField, string[]>>;
}

export const INITIAL_CONTACT_STATE: ContactFormState = {
  status: "idle",
  message: "",
};
