import { Request, Response } from 'express';
import { Pessoa } from '../repositorios/pessoa';

const pessoa: Pessoa = new Pessoa();
export class PessoaControlador {

  constructor() {}

  public buscarTodos(req: Request, res: Response): void {
    pessoa.buscarTodos(req, res);
  }

  public buscarPorId(req: Request, res: Response): void {
    pessoa.buscarPorId(req, res);
  }

  public cadastrar(req: Request, res: Response): void {  
    pessoa.cadastrar(req, res);
  }

  public alterar(req: Request, res: Response): void {
      pessoa.alterar(req, res);
  }

  public excluir(req: Request, res: Response): void {
      pessoa.excluir(req, res);
  }

}
