import { Request, Response } from 'express';
import { LocalizacaoMotorista } from '../repositorios/localizacao-motorista';

const localizacao: LocalizacaoMotorista = new LocalizacaoMotorista();
export class LocalizacaoMotoristaControlador {

  constructor() {}

  public buscarTodos(req: Request, res: Response): void {
    localizacao.buscarTodos(req, res);
  }

  public buscarPorId(req: Request, res: Response): void {
    localizacao.buscarPorId(req, res);
  }

  public cadastrar(req: Request, res: Response): void {  
    localizacao.cadastrar(req, res);
  }

  public alterar(req: Request, res: Response): void {
    localizacao.alterar(req, res);
  }

  public excluir(req: Request, res: Response): void {
    localizacao.excluir(req, res);
  }

}