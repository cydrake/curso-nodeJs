import { Request, Response } from 'express';
import { Usuario } from '../repositorios/usuario';
import * as Msg from '../util/mensagem';
import * as StringUtil from '../util/string';
import * as Validador from '../util/validador';
import * as nodemailer from 'nodemailer';

const usuario: Usuario = new Usuario();

export class UsuarioControlador {

  constructor() {}

  public buscarTodos(req: Request, res: Response): void {
    usuario.buscarTodos(req, res);
  }

  public buscarPorId(req: Request, res: Response): void {
    usuario.buscarPorId(req, res);
  }

  public cadastrar(req: Request, res: Response): void {
    const body: any = bodyBuilder(req.body);

    if (Validador.validarEmail(body.eMail)) {
      req.body = body;
      const result: any = usuario.cadastrar(req, res);
      console.log('Instância: ' + result.catch());
      enviarEmail(body.eMail);
    } else {
      Msg.mensagemInvalido('E-mail', res);
    }
  
  }

  public alterar(req: Request, res: Response): void {
    const body = req.body;

    if(body.senha != undefined)
      body.senha = StringUtil.criptografar(body.senha);
    
    if(body.eMail != undefined)
      body.eMail = StringUtil.toLowerTrim(body.eMail);

    if (body.eMail == undefined || Validador.validarEmail(body.eMail)) {
      req.body = body;
      usuario.alterar(req, res);
    } else {
      Msg.mensagemInvalido('E-mail', res);
    }
  }

  public excluir(req: Request, res: Response): void {
    usuario.excluir(req, res);
  }

}

export const bodyBuilder: any = (body: any) => {
  body.senha = StringUtil.criptografar(body.senha);
  body.eMail = StringUtil.toLowerTrim(body.eMail);
  return body;
}

export const enviarEmail = (eMail: string) => {
  const E_MAIL = 'cydrake.shenk@gmail.com';
  const transporte = nodemailer.createTransport({
    service: 'Gmail',
    auth: {
      user: E_MAIL,
      pass: 'senhaforte'
    } 
  });

  const email = {
    from: E_MAIL,
    to: eMail,
    subject: `Seja bem vindo!!!`,
    html: `Olá, agora você é o mais novo membro da nossa comunidade, utilize o seu e-mail <strong>${ eMail }</strong> e a senha que você definiu para acessar a sua conta.`
  };

  transporte.sendMail(email, (err, info) => {
    if(err)
      throw err;
    console.log('Email enviado! ', info);
  });

}
