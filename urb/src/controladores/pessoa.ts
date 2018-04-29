import { Request, Response } from "express";
import { Pessoa } from "../repositorios/pessoa";
import { Usuario } from "../repositorios/usuario";
import { IUsuarioModel } from "./../modelos/usuario";
import { Mensagem } from "../util/mensagem";
import * as StringUtil from "../util/string";
import * as Validador from "../util/validador";

const pessoa: Pessoa = new Pessoa();
const usuario: Usuario = new Usuario();
const mensagem: Mensagem = new Mensagem(pessoa.getLabel, pessoa.getGenero);

export class PessoaControlador {

  constructor() {}

  public async buscarTodos(req: Request, res: Response) {
    try {
      const resultado: any = await pessoa.buscarTodos();
      if (typeof resultado !== undefined && resultado.length > 0) {
        res.send({ pessoas: resultado });
        console.log(mensagem.mensagemSucessoBusca());
      } else {
        res.sendStatus(204);
        mensagem.mensagemNenhumConteudo();
        console.log(resultado);
      }
    } catch (erro) {
      res.sendStatus(500);
      throw mensagem.mensagemErroBusca(erro);
    }
  }

  public async buscarPorId(req: Request, res: Response) {
    try {
      const resultado: any = await pessoa.buscarPorId(req.body.id);
      if (resultado) {
        res.send({ pessoas: resultado });
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
    let pessoaBody: any = req.body;
    const usuarioBody: any = {
      eMail: StringUtil.toLowerTrim(pessoaBody.eMail),
      senha: StringUtil.criptografar(pessoaBody.senha)
    };
    if (Validador.validarEmail(usuarioBody.eMail)) {
      try {
        const resultadoUsuario: any = await usuario.cadastrar(usuarioBody);
        pessoaBody.idUsuario = resultadoUsuario._id;
        const resultadoPessoa: any = await pessoa.cadastrar(pessoaBody);
        res.status(201).send({ pessoa: resultadoPessoa });
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
      const resultado: any = await pessoa.alterar(body, body.id);
      res.send({ pessoa: resultado });
      console.log(mensagem.mensagemSucessoAlteracao());
    } catch (erro) {
      res.sendStatus(500);
      throw mensagem.mensagemErroAlteracao(erro);
    }
  }

  public async excluir(req: Request, res: Response) {
    try {
      const resultado: any = await pessoa.excluir(req.body.id);
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
