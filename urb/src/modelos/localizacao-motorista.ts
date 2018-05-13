import { Schema, Document, model } from 'mongoose';
import * as Msg from '../util/mensagem';

export interface ILocalizacaoMotoristaModel extends Document {
  idMotorista: Schema.Types.ObjectId
  idPessoa: Schema.Types.ObjectId;
  localizacao: Localizacao;
  data: Date;
}

export const LocalizacaoMotoristaSchema: Schema = new Schema({
  idMotorista: { type: Schema.Types.ObjectId, required: [true, Msg.mensagemObrigatorio('Motoristsa')] },
  idPessoa: { type: Schema.Types.ObjectId, required: [true, Msg.mensagemObrigatorio('Pessoa')] },
  data: { type: Date, required: [true, Msg.mensagemObrigatorio('Data')] },
  localizacao:{ type: { String, default: 'Point' }, coordinates: { type: [Number], index: '2dsphere' }},
});

export const LocalizacaoMotoristaModel = model<ILocalizacaoMotoristaModel>('LocalizacaoMotorista', LocalizacaoMotoristaSchema);

export interface Localizacao {
  type: string
  coordinates: {
      type: [Number],
      index: '2dsphere'
  }
}
