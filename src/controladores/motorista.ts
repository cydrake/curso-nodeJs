import { Request, Response } from 'express';
import { Motorista } from '../repositorios/motorista';

const motorista: Motorista = new Motorista();
export class MotoristaControlador {

  constructor() {}

  public buscarTodos(req: Request, res: Response): void {
    motorista.buscarTodos(req, res);
  }

  public buscarPorId(req: Request, res: Response): void {
    motorista.buscarPorId(req, res);
  }

  public cadastrar(req: Request, res: Response): void {  
    motorista.cadastrar(req, res);
  }

  public alterar(req: Request, res: Response): void {
    motorista.alterar(req, res);
  }

  public excluir(req: Request, res: Response): void {
    motorista.excluir(req, res);
  }

}