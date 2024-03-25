import * as CryptoJS from 'crypto-js';
import { environment } from '../../environments/environment';

export const encrypt = (data: any): string => {
  const key = CryptoJS.enc.Utf8.parse(environment.secretKey);
  const encrypted = CryptoJS.AES.encrypt(data, key, {
    mode: CryptoJS.mode.ECB,
    padding: CryptoJS.pad.Pkcs7,
  });
  return encrypted.toString();
};
