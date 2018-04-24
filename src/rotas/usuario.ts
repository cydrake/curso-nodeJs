import { Application } from "express";
import { UsuarioControlador } from '../controladores/usuario';

export default function (server: Application) {
  const usuarioControlador = new UsuarioControlador();
  server.get('/usuarios', usuarioControlador.buscarTodos);
  server.get('/usuario/:id', usuarioControlador.buscarPorId);
  server.post('/novoUsuario', usuarioControlador.cadastrar);
  server.put('/alterarUsuario/:id', usuarioControlador.alterar);
  server.delete('/excluirUsuario/:id', usuarioControlador.excluir);
}