import crypto from 'crypto';

export class CryptoService {
  private static readonly SALT_KEY = process.env.SALT || 'salt';
  public static encryptPassword(password: string): {
    hashedPassword?: string;
  } {
    return {
      hashedPassword: password ? this._encryptPassword(password, this.SALT_KEY) : undefined,
    };
  }

  public static encryptString = (str: string): string => {
    const encrypt = crypto.createCipheriv('sha512', this.SALT_KEY, this.SALT_KEY);
    const encrypted = encrypt.update(str, 'utf8', 'hex') + encrypt.final('base64');
    return encrypted;
  };
  public static decryptString = (str: string): string => {
    const decode = crypto.createDecipheriv('sha512', this.SALT_KEY, this.SALT_KEY);
    const decrypted = decode.update(str, 'hex', 'utf8') + decode.final('utf8');
    return decrypted;
  };
  public static compareString = (str: string, hashedStr: string): boolean => {
    return this.encryptString(str) === hashedStr;
  };
  public static comparePassword(password: string, hashedPassword: string): boolean {
    return this._encryptPassword(password, this.SALT_KEY) === hashedPassword;
  }
  private static _encryptPassword(password: string, salt: string): string {
    return crypto.pbkdf2Sync(password, salt, 100000, 64, 'sha512').toString('hex');
  }
}
