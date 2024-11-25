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
    const cipher = crypto.createCipheriv('aes-256-cbc', Buffer.from(this.SALT_KEY, 'hex'), iv);
    let encrypted = cipher.update(str);
    encrypted = Buffer.concat([encrypted, cipher.final()]);
    return iv.toString('hex') + ':' + encrypted.toString('hex');
  };
  public static decryptString = (str: string): string => {
    const [ivHex, encryptedHex] = str.split(':');
    const iv = Buffer.from(ivHex, 'hex');
    const encrypted = Buffer.from(encryptedHex, 'hex');
    const decipher = crypto.createDecipheriv('aes-256-cbc', Buffer.from(this.SALT_KEY, 'hex'), iv);
    let decrypted = decipher.update(encrypted);
    decrypted = Buffer.concat([decrypted, decipher.final()]);
    return decrypted.toString();
  };
  public static compareString = (str: string, hashedStr: string): boolean => {
    try {
      // 암호화된 데이터를 복호화
      const decrypted = this.decryptString(str);
      // 원본과 복호화된 데이터를 비교
      return decrypted === hashedStr;
    } catch (error) {
      // 복호화 과정에서 에러가 발생하면 false 반환
      console.error('Decryption failed:', error);
      return false;
    }
  };
  public static comparePassword(password: string, hashedPassword: string): boolean {
    return this._encryptPassword(password, this.SALT_KEY) === hashedPassword;
  }
  private static _encryptPassword(password: string, salt: string): string {
    return crypto.pbkdf2Sync(password, salt, 100000, 64, 'sha512').toString('hex');
  }
}
