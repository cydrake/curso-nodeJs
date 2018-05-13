import { Request, Response } from "express";
import { Genero } from "./enum";

export const mensagemObrigatorio = (label: string) => `${label} é obrigatório.`;

export class Mensagem {
  
  constructor(private label: string, private genero: Genero) {
    this.label = label;
    this.genero = genero;
  }

  private mensagemSucesso(tipo: string): string {
    return `${this.label} ${tipo}${this.genero} com sucesso!`;
  }

  private mensagemErro(tipo: string, erro: any): Error {
    const erroMenssagem: string = `Erro ao ${tipo} ${
      this.genero
    } ${this.label.toLowerCase()}${erro != undefined ? " - " + erro : "."}`;
    console.error(erroMenssagem);
    return new Error(erroMenssagem);
  }

  public mensagemInvalido(label: string): string {
    const mensagem: string = `${label} inválido!`;
    console.log(mensagem);
    return mensagem;
  }

  public mensagemNenhumConteudo(): string {
    const mensagem: string = `Não existe ${this.label}s cadastrad${
      this.genero
    }s.`;
    console.error(mensagem);
    return mensagem;
  }

  public mensagemSucessoCadastro(): string {
    return this.mensagemSucesso("cadastrad");
  }

  public mensagemSucessoBusca(): string {
    return this.mensagemSucesso("buscad");
  }

  public mensagemSucessoAlteracao(): string {
    return this.mensagemSucesso("alterad");
  }

  public mensagemSucessoExclusao(): string {
    return this.mensagemSucesso("excluid");
  }

  public mensagemSucessoLogin(): string {
    return this.mensagemSucesso("logad");
  }

  public mensagemErroAlteracao(erro?: any): Error {
    return this.mensagemErro("alterar", erro);
  }

  public mensagemErroCadastro(erro?: any): Error {
    return this.mensagemErro("cadastrar", erro);
  }

  public mensagemErroExclusao(erro?: any): Error {
    return this.mensagemErro("excluir", erro);
  }

  public mensagemErroBusca(erro?: any): Error {
    return this.mensagemErro("buscar", erro);
  }
}
