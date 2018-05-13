import { Application } from "express";
import { LocalizacaoMotoristaControlador } from '../controladores/localizacao-motorista';

export default function (server: Application) {
  const localizacaoControlador = new LocalizacaoMotoristaControlador();
  server.post('/localizacoes', localizacaoControlador.buscar);
  server.post('/novaLocalizacao', localizacaoControlador.cadastrar);
  server.put('/alterarLocalizacao/:id', localizacaoControlador.alterar);
  server.delete('/excluirLocalizacao/:id', localizacaoControlador.excluir);
}