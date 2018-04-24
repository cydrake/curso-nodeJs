import { Document, Model } from "mongoose";
import { Request, Response } from "express";
import { Genero } from "../util/enum";
import * as Msg from "../util/mensagem";
import * as HTTP_CODES from "http-status";

export abstract class DatabaseService<T extends Document> {
  private Model: Model<T>;
  private genero: Genero;
  private label: string;
  private menssagem: Msg.Mensagem;

  constructor(model: Model<T>, genero: Genero, label: string) {
    this.Model = model;
    this.genero = genero;
    this.label = label;
    this.menssagem = new Msg.Mensagem(label, genero);
  }

  public async buscarTodos(req: Request, res: Response): Promise<T[]> {
    try {
      const result = await this.Model.find().exec();
      if (typeof result !== undefined && result.length > 0) {
        retornarSucesso(this.menssagem.mensagemSucessoBusca(), res, result);
      } else {
        res.sendStatus(HTTP_CODES.NO_CONTENT);
      }
      return await result;
    } catch (error) {
      retornarErro(this.menssagem.mensagemErroBusca(), res);
      throw error;
    }
  }

  public async buscarPorId(req: Request, res: Response): Promise<T | null> {
    try {
      const result = await this.Model.findById(req.params.id).exec();
      if (result) {
        retornarSucesso(this.menssagem.mensagemSucessoBusca(), res, result);
      } else {
        res.sendStatus(HTTP_CODES.NO_CONTENT);
      }
      return await result;
    } catch (error) {
      retornarErro(this.menssagem.mensagemErroBusca(), res);
      throw error;
    }
  }

  public async cadastrar(req: Request, res: Response): Promise<T> {
    try {
      const result = await this.Model.create(req.body);
      retornarSucesso(this.menssagem.mensagemSucessoCadastro(), res, result);
      return await result;
    } catch (error) {
      retornarErro(this.menssagem.mensagemErroCadastro(), res);
      throw Error(error);
    }
  }

  public async alterar(req: Request, res: Response): Promise<T | null> {
    try {
      const result = await this.Model.findByIdAndUpdate(
        req.params.id,
        req.body
      );
      console.log(this.menssagem.mensagemSucessoAlteracao());
      return await result;
    } catch (error) {
      retornarErro(this.menssagem.mensagemErroAlteracao(), res);
      throw error;
    }
  }

  public async excluir(req: Request, res: Response) {
    try {
      const result = await this.Model.findByIdAndRemove(req.params.id);
      console.log(this.menssagem.mensagemSucessoExclusao());
      return await result;
    } catch (error) {
      retornarErro(this.menssagem.mensagemErroExclusao(), res);
      throw error;
    }
  }

}

export const retornarErro = (mensagem: string, res: Response) => {
  res.sendStatus(500);
  console.log(mensagem);
};

export const retornarSucesso = (
  mensagem: string,
  res: Response,
  retorno: any
) => {
  res.send(retorno);
  console.log(mensagem);
};
