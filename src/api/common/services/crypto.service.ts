import crypto from 'crypto';

export class CryptoService {
  public static generateSalt(): string {
    return crypto.randomBytes(64).toString('hex');
  }
  public static encryptPassword(password: string): {
    hashedPassword?: string;
    salt?: string;
  } {
    const salt = this.generateSalt();
    return {
      hashedPassword: password ? this._encryptPassword(password, salt) : undefined,
      salt: password ? salt : undefined,
    };
  }

  public static comparePassword(password: string, hashedPassword: string, salt: string): boolean {
    return this._encryptPassword(password, salt) === hashedPassword;
  }
  private static _encryptPassword(password: string, salt: string): string {
    return crypto.pbkdf2Sync(password, salt, 100000, 64, 'sha512').toString('hex');
  }
}
