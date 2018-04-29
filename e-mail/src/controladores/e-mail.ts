import { Request, Response } from "express";
import * as Msg from "../util/mensagem";
import * as StringUtil from "../util/string";
import * as Validador from "../util/validador";
import * as nodemailer from 'nodemailer';

export class EMailControlador {

  constructor() {}

  public async enviarEmail(req: Request, res: Response) {
    const eMail: string = StringUtil.toLowerTrim(req.body.eMail);

    if (Validador.validarEmail(eMail)) {
      const REMENTENTE = 'cydrake.shenk@gmail.com';
      const transporte = nodemailer.createTransport({
      service: 'Gmail',
      auth: {
        user: REMENTENTE,
        pass: 'senhaforte'
      } 
      });

      const email = {
      from: REMENTENTE,
      to: eMail,
      subject: `Seja bem vindo!!!`,
      html: `Olá, agora você é o mais novo membro da nossa comunidade, utilize o seu e-mail <strong>${ eMail }</strong> e a senha que você definiu para acessar a sua conta.`
      };

      transporte.sendMail(email, (err, info) => {
        if(err) { throw err; }
        console.log('Email enviado! ', info);
      });

    } else {
      Msg.mensagemInvalido(eMail);
    }

  }
}