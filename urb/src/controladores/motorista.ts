import { Request, Response } from "express";
import { Motorista } from "../repositorios/motorista";
import { Usuario } from "../repositorios/usuario";
import { IUsuarioModel } from "./../modelos/usuario";
import { Mensagem } from "../util/mensagem";
import * as StringUtil from "../util/string";
import * as Validador from "../util/validador";

const motorista: Motorista = new Motorista();
const usuario: Usuario = new Usuario();
const mensagem: Mensagem = new Mensagem(motorista.getLabel, motorista.getGenero);

export class MotoristaControlador {

  constructor() {}

  public async buscarTodos(req: Request, res: Response) {
    try {
      const resultado: any = await motorista.buscarTodos();
      if (typeof resultado !== undefined && resultado.length > 0) {
        res.send({ motoristas: resultado });
        console.log(mensagem.mensagemSucessoBusca());
      } else {
        res.status(204).send(mensagem.mensagemNenhumConteudo());
      }
    } catch (erro) {
      res.sendStatus(500);
      throw mensagem.mensagemErroBusca(erro);
    }
  }

  public async buscarPorId(req: Request, res: Response) {
    try {
      const resultado: any = await motorista.buscarPorId(req.body.id);
      if (resultado) {
        res.send({ motoristas: resultado });
        console.log(mensagem.mensagemSucessoBusca());
      } else {
        res.status(204).send(mensagem.mensagemNenhumConteudo());
      }
    } catch (erro) {
      res.sendStatus(500);
      throw mensagem.mensagemErroBusca(erro);
    }
  }

  public async cadastrar(req: Request, res: Response) {
    let motoristaBody: any = req.body;
    const usuarioBody: any = {
      eMail: StringUtil.toLowerTrim(motoristaBody.eMail),
      senha: StringUtil.criptografar(motoristaBody.senha)
    };
    if (Validador.validarEmail(usuarioBody.eMail)) {
      try {
        const resultadoUsuario: any = await usuario.cadastrar(usuarioBody);
        motoristaBody.idUsuario = resultadoUsuario._id;
        const resultadoMotorista: any = await motorista.cadastrar(motoristaBody);
        res.status(201).send({ motorista: resultadoMotorista });
        console.log(mensagem.mensagemSucessoCadastro());
      } catch (erro) {
        res.sendStatus(500);
        throw mensagem.mensagemErroCadastro(erro);
      }
    } else {
      res.status(401).send(mensagem.mensagemInvalido("E-mail"));
    }
  }

  public async alterar(req: Request, res: Response) {
    const body: any = req.body;
    try {
      const resultado: any = await motorista.alterar(body, body.id);
      res.send({ motorista: resultado });
      console.log(mensagem.mensagemSucessoAlteracao());
    } catch (erro) {
      res.sendStatus(500);
      throw mensagem.mensagemErroAlteracao(erro);
    }
  }

  public async excluir(req: Request, res: Response) {
    try {
      const resultado: any = await motorista.excluir(req.body.id);
      const texto: string = mensagem.mensagemSucessoExclusao();
      res.send({ resposta: texto });
      console.log(texto);
    } catch (erro) {
      res.sendStatus(500);
      throw mensagem.mensagemErroExclusao(erro);
    }
  }

  public async logar(req: Request, res: Response) {}

}