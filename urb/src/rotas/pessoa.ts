import { Application } from "express";
import { PessoaControlador } from '../controladores/pessoa';

export default function (server: Application) {
  const pessoaControlador = new PessoaControlador();
  server.get('/pessoas', pessoaControlador.buscarTodos);
  server.get('/pessoa/:id', pessoaControlador.buscarPorId);
  server.post('/novaPessoa', pessoaControlador.cadastrar);
  server.put('/alterarPessoa/:id', pessoaControlador.alterar);
  server.delete('/excluirPessoa/:id', pessoaControlador.excluir);
}