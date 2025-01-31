import { compareSync, hashSync } from 'bcrypt';

export class BcryptAdaptar {
  static hash(password: string): string {
    return hashSync(password,10);
  }

  static compare(password: string, hashedPassword: string): boolean {
    return compareSync(password, hashedPassword);
  }
}
