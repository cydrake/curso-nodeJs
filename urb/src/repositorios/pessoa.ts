import { PessoaModel, IPessoaModel } from '../modelos/pessoa';
import { DatabaseService } from './generico';
import { Genero } from '../util/enum';

export class Pessoa extends DatabaseService<IPessoaModel>{

  constructor() {
    super (PessoaModel, Genero.FEMENINO, 'Pessoa');
  }

}

