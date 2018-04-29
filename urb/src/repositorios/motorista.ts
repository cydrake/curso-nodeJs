import { MotoristaModel, IMotoristaModel } from '../modelos/motorista';
import { DatabaseService } from './generico';
import { Genero } from '../util/enum';

export class Motorista extends DatabaseService<IMotoristaModel>{

  constructor() {
    super (MotoristaModel, Genero.MASCULINO, 'Motorista');
  }

}
