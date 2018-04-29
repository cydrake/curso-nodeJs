import { Schema, Document, model } from 'mongoose';
import * as Msg from '../util/mensagem';
import { IUsuarioModel, UsuarioModel } from './usuario';

export interface IPessoaModel extends Document {
  nome: string;
  dataNascimento: Date;
  documento: number;
  telefones: Array<number>;
  id_usuario: Schema.Types.ObjectId;
}

export const PessoaSchema: Schema = new Schema({
  nome: { type: String, required: [true, Msg.mensagemObrigatorio('Nome')] },
  dataNascimento: { type: Date, required: [true, Msg.mensagemObrigatorio('Data')] },
  documento: { type: Number, required: [true, Msg.mensagemObrigatorio('Documento')] },
  telefones: { type: Array, required: [true, Msg.mensagemObrigatorio('Telefones')] },
  id_usuario: { type: Schema.Types.ObjectId, required: [true, Msg.mensagemObrigatorio('Usuário')] }
});

export const PessoaModel = model<IPessoaModel>('Pessoa', PessoaSchema);