import { UsuarioModel, IUsuarioModel } from '../modelos/usuario';
import { DatabaseService } from './generico';
import { Genero } from '../util/enum';

export class Usuario extends DatabaseService<IUsuarioModel>{

  constructor() {
    super (UsuarioModel, Genero.MASCULINO, 'Usuário');
  }

}
