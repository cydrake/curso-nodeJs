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

  public async buscarTodos(): Promise<T[]> {
    try {
      return await this.Model.find().exec();
    } catch (erro) {
      throw this.menssagem.mensagemErroBusca(erro);
    }
  }

  public async buscarPorId(id: string): Promise<T | null> {
    try {
      return await this.Model.findById(id).exec();
    } catch (erro) {
      throw this.menssagem.mensagemErroBusca(erro);
    }
  }

  public async cadastrar(body: any): Promise<T> {
    try {
      return await this.Model.create(body);
    } catch (erro) {
      throw this.menssagem.mensagemErroCadastro(erro);
    }
  }

  public async alterar(body: any, id: any): Promise<T | null> {
    try {
      return await this.Model.findByIdAndUpdate(id, body);
    } catch (erro) {
      throw this.menssagem.mensagemErroAlteracao(erro);
    }
  }

  public async excluir(id: string) {
    try {
      return await this.Model.findByIdAndRemove(id);
    } catch (erro) {
      throw this.menssagem.mensagemErroExclusao(erro);
    }
  }

  public get getGenero(): Genero {
    return this.genero;
  }

  public get getLabel(): string {
    return this.label;
  }

}