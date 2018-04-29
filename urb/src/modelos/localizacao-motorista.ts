import { Schema, Document, model } from 'mongoose';
import * as Msg from '../util/mensagem';

export interface ILocalizacaoMotoristaModel extends Document {
  id_motorista: Schema.Types.ObjectId;
  localizacao: Localizacao;
  data: Date;
}

export const LocalizacaoMotoristaSchema: Schema = new Schema({
  id_motorista: { type: Schema.Types.ObjectId, required: [true, Msg.mensagemObrigatorio('Motoristsa')] },
  localizacao: { type: Object, required: [true, Msg.mensagemObrigatorio('Localizacao')] },
  data: { type: Date, required: [true, Msg.mensagemObrigatorio('Data')] }
});

export const LocalizacaoMotoristaModel = model<ILocalizacaoMotoristaModel>('LocalizacaoMotorista', LocalizacaoMotoristaSchema);

export interface Localizacao {
    latitude: number,
    longitude: number
}
