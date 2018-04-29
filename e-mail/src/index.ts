import * as Express from 'express';
import EMailRota from './rotas/e-mail';

export function init(server: Express.Application) {
  EMailRota(server);
}
