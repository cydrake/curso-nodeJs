import * as Crypto from 'crypto-js';

import { Localizacao } from '../modelos/localizacao-motorista';

export const criptografar = (texto: string) => Crypto.MD5(texto);

export const toLowerTrim = (texto: string) => texto.trim().toLowerCase();

export const numeroAleatorio = (maximo: number = 100) => Math.floor((Math.random() * maximo) + 1);
