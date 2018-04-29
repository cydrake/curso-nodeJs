import * as Express from 'express';
import PessoaRota from './rotas/pessoa';
import MotoristaRota from './rotas/motorista';
import LocalizacaoRota from './rotas/localizacao-motorista';

export function init(server: Express.Application) {
  PessoaRota(server);
  MotoristaRota(server);
  LocalizacaoRota(server);
}
