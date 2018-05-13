import { Application } from "express";
import { MotoristaControlador } from '../controladores/motorista';

export default function (server: Application) {
  const motoristaControlador = new MotoristaControlador();
  server.get('/motoristas', motoristaControlador.buscarTodos);
  server.get('/motorista/:id', motoristaControlador.buscarPorId);
  server.post('/novoMotorista', motoristaControlador.cadastrar);
  server.put('/alterarMotorista/:id', motoristaControlador.alterar);
  server.delete('/excluirMotorista/:id', motoristaControlador.excluir);
}