import { StatusVeiculo } from '../util/enum';
import { Schema, Document, model } from 'mongoose';
import * as Msg from '../util/mensagem';

export interface IMotoristaModel extends Document {
  nome: string;
  dataNascimento: Date;
  cnh: number;
  id_usuario: Schema.Types.ObjectId;
  endereco: Endereco;
  telefone: number;
  veiculo: Veiculo;
}

export const MotoristaSchema: Schema = new Schema({
  nome: { type: String, required: [true, Msg.mensagemObrigatorio('Nome')] },
  dataNascimento: { type: Date, required: [true, Msg.mensagemObrigatorio('Data')] },
  cnh: { type: Number, required: [true, Msg.mensagemObrigatorio('Documento')] },
  id_usuario: { type: Schema.Types.ObjectId, required: [true, Msg.mensagemObrigatorio('Usuário')] },
  endereco: { type: Object, required: [true, Msg.mensagemObrigatorio('Endereço')] },
  telefone: { type: Number, required: [true, Msg.mensagemObrigatorio('Telefone')] },
  veiculo: { type: Object, required: [true, Msg.mensagemObrigatorio('Veículo')] }
});

export const MotoristaModel = model<IMotoristaModel>('Motorista', MotoristaSchema);

export interface Endereco {
    rua: string;
    numero: number;
    complemento?: number;
    estado: string;
    cidade: string;
    pais: string;
}

export interface Veiculo {
    marca: string;
    modelo: string;
    ano: number;
    cor: string;
    placa: string;
    status: StatusVeiculo; 
}