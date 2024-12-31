export interface User {
  id: number;
  name: string;
  email: string;
  additionalEmails?: string[];
}

export type NewUser = Omit<User, 'id'>;
