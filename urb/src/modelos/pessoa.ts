import { Schema, Document, model } from 'mongoose';
import * as Msg from '../util/mensagem';
import { IUsuarioModel, UsuarioModel } from './usuario';
import { Localizacao } from './localizacao-motorista';

export interface IPessoaModel extends Document {
  nome: string;
  dataNascimento: Date;
  documento: number;
  telefones: Array<number>;
  id_usuario: Schema.Types.ObjectId;
  localizacao: Localizacao;
}

export const PessoaSchema: Schema = new Schema({
  nome: { type: String, required: [true, Msg.mensagemObrigatorio('Nome')] },
  dataNascimento: { type: Date, required: [true, Msg.mensagemObrigatorio('Data')] },
  documento: { type: Number, required: [true, Msg.mensagemObrigatorio('Documento')] },
  telefones: { type: Array, required: [true, Msg.mensagemObrigatorio('Telefones')] },
  id_usuario: { type: Schema.Types.ObjectId, required: [true, Msg.mensagemObrigatorio('Usuário')] },
  localizacao: { type: Object, required: [true, Msg.mensagemObrigatorio('Localização')] },
  geometry: { type: { String, default:'Point' }, coordinates:{ type:[Number], index:'2dsphere' } }
});

export const PessoaModel = model<IPessoaModel>('Pessoa', PessoaSchema);