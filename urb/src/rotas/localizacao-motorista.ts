import * as Express from "express";
import { LocalizacaoMotoristaControlador } from '../controladores/localizacao-motorista';

export default function (server: Express.Application) {
  const localizacaoControlador = new LocalizacaoMotoristaControlador();
  server.get('/localizacoes', localizacaoControlador.buscarTodos);
  server.get('/localizacao/:id', localizacaoControlador.buscarPorId);
  server.post('/novaLocalizacao', localizacaoControlador.cadastrar);
  server.put('/alterarLocalizacao/:id', localizacaoControlador.alterar);
  server.delete('/excluirLocalizacao/:id', localizacaoControlador.excluir);
}