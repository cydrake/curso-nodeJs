import { LocalizacaoMotoristaModel, ILocalizacaoMotoristaModel } from '../modelos/localizacao-motorista';
import { DatabaseService } from './generico';
import { Genero } from '../util/enum';

export class LocalizacaoMotorista extends DatabaseService<ILocalizacaoMotoristaModel>{

  constructor() {
    super (LocalizacaoMotoristaModel, Genero.FEMENINO, 'Localização do Motorista');
  }

}
