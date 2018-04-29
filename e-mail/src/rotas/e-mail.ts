import * as Express from "express";
import { EMailControlador } from '../controladores/e-mail';

export default function (server: Express.Application) {
  const emailControlador = new EMailControlador();
  server.post('/enviarEmail', emailControlador.enviarEmail);
}