import * as Crypto from 'crypto-js';

export const criptografar = (texto: string) => Crypto.MD5(texto);

export const toLowerTrim = (texto: string) => texto.trim().toLowerCase();