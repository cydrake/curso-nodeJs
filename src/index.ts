import * as Express from 'express';
import UsuarioRota from './rotas/usuario';
import PessoaRota from './rotas/pessoa';
import MotoristaRota from './rotas/motorista';
import LocalizacaoRota from './rotas/localizacao-motorista';

export function init(server: Express.Application) {
  UsuarioRota(server);
  PessoaRota(server);
  MotoristaRota(server);
  LocalizacaoRota(server);
}
