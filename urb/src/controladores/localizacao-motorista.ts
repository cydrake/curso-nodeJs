import { Request, Response } from "express";
import { LocalizacaoMotorista } from "../repositorios/localizacao-motorista";
import { Usuario } from "../repositorios/usuario";
import { Pessoa } from "../repositorios/pessoa";
import { IUsuarioModel } from "./../modelos/usuario";
import { Mensagem } from "../util/mensagem";
import * as StringUtil from "../util/string";
import * as Validador from "../util/validador";

const localizacaoMotorista: LocalizacaoMotorista = new LocalizacaoMotorista();
const usuario: Usuario = new Usuario();
const pessoa: Pessoa = new Pessoa();
const mensagem: Mensagem = new Mensagem(localizacaoMotorista.getLabel, localizacaoMotorista.getGenero);

export class LocalizacaoMotoristaControlador {

  constructor() {}

  public async buscarTodos(req: Request, res: Response) {
    try {
      const resultado: any = await localizacaoMotorista.buscarTodos();
      if (typeof resultado !== undefined && resultado.length > 0) {
        res.send({ localizacaoMotoristas: resultado });
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
      const resultado: any = await localizacaoMotorista.buscarPorId(req.body.id);
      if (resultado) {
        res.send({ localizacaoMotoristas: resultado });
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
    let localizacaoMotoristaBody: any = req.body;
    const usuarioBody: any = {
      eMail: StringUtil.toLowerTrim(localizacaoMotoristaBody.eMail),
      senha: StringUtil.criptografar(localizacaoMotoristaBody.senha)
    };
    if (Validador.validarEmail(usuarioBody.eMail)) {
      try {
        const resultadoUsuario: any = await usuario.cadastrar(usuarioBody);
        localizacaoMotoristaBody.idUsuario = resultadoUsuario._id;
        const resultadolocalizacaoMotorista: any = await localizacaoMotorista.cadastrar(localizacaoMotoristaBody);
        res.status(201).send({ localizacaoMotorista: resultadolocalizacaoMotorista });
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
      const resultado: any = await localizacaoMotorista.alterar(body, body.id);
      res.send({ localizacaoMotorista: resultado });
      console.log(mensagem.mensagemSucessoAlteracao());
    } catch (erro) {
      res.sendStatus(500);
      throw mensagem.mensagemErroAlteracao(erro);
    }
  }

  public async excluir(req: Request, res: Response) {
    try {
      const resultado: any = await localizacaoMotorista.excluir(req.body.id);
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