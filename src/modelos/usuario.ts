import { Schema, Document, model } from 'mongoose';
import * as Msg from '../util/mensagem';

export interface IUsuarioModel extends Document {
  eMail: string;
  senha: string;
  dataInscricao: Date;
  token?: String;
}

export const UsuarioSchema: Schema = new Schema({
  eMail: { type: String, required: [true, Msg.mensagemObrigatorio('E-mail')], unique: true},
  senha: { type: String, required: [true, Msg.mensagemObrigatorio('Senha')]},
  dataInscricao: { type: Date, required: [true, Msg.mensagemObrigatorio('Data Inscrição')], default: Date.now},
  token: { type: String }
});

export const UsuarioModel = model<IUsuarioModel>('Usuario', UsuarioSchema);