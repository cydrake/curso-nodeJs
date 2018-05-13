import { Request, Response } from "express";
import { LocalizacaoMotorista } from "../repositorios/localizacao-motorista";
import { Usuario } from "../repositorios/usuario";
import { Pessoa } from "../repositorios/pessoa";
import { Motorista } from "../repositorios/motorista";
import { IUsuarioModel } from "./../modelos/usuario";
import { Mensagem } from "../util/mensagem";
import * as StringUtil from "../util/string";
import * as Validador from "../util/validador";

const localizacaoMotorista: LocalizacaoMotorista = new LocalizacaoMotorista();
const usuario: Usuario = new Usuario();
const pessoa: Pessoa = new Pessoa();
const motorista: Motorista = new Motorista();
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
    try {
      const resultadolocalizacaoMotorista: any = await localizacaoMotorista.cadastrar(req.body);
      res.send({ localizacaoMotorista: resultadolocalizacaoMotorista });
      console.log(mensagem.mensagemSucessoCadastro());
    } catch (erro) {
      res.sendStatus(500);
      throw mensagem.mensagemErroCadastro(erro);
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

  public async buscar(req: Request, res: Response): Promise<boolean> {
    const body: any = req.body;
    const resultadoPessoa: any = await pessoa.buscarPorId(body.idPessoa);
    const resultadoMotorista: any = await motorista.buscarPorId(body.idMotorista);
    const resultado: any = await localizacaoMotorista.buscar({ geometry: { $nearSphere: { 
    $geometry: { type: "Point", coordinates: resultadoPessoa.localizacao }
    }}});
    resultado.limit(1).exec((err: any, result: any) => {
      if(result){
        console.log('Closest to %s is %s', req.body.cordenadas, result);
        res.send(result);
      }
      else{
        console.log('Cant find!');
        res.sendStatus(401);
      }
    });
    return true;
  }

}