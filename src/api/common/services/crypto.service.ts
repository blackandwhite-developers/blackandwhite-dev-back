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
    const iv = crypto.randomBytes(16);
    const cipher = crypto.createCipheriv('aes-256-cbc', Buffer.from(this.SALT_KEY), iv);
    let encrypted = cipher.update(str);
    encrypted = Buffer.concat([encrypted, cipher.final()]);
    return iv.toString('hex') + ':' + encrypted.toString('hex');
  };
  public static decryptString = (str: string): string => {
    const [ivHex, encryptedHex] = str.split(':');
    const iv = Buffer.from(ivHex, 'hex');
    const encrypted = Buffer.from(encryptedHex, 'hex');
    const decipher = crypto.createDecipheriv('aes-256-cbc', Buffer.from(this.SALT_KEY), iv);
    let decrypted = decipher.update(encrypted);
    decrypted = Buffer.concat([decrypted, decipher.final()]);
    return decrypted.toString();
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
