import { Request, Response } from 'express';
import { Genero } from './enum';

export const mensagemObrigatorio = (label: string) => `${ label } é obrigatório.`;

export const mensagemInvalido = (label: string, res: Response) => {
    const mensagem: string = `${ label } inválido!`;
    console.log(mensagem);
    res.status(418);
    res.send(mensagem);
};

export class Mensagem {

    constructor(private label: string, private genero: Genero){
        this.label = label;
        this.genero = genero;
    }

    private mensagemSucesso(tipo: string): string {
        return  `${ this.label } ${ tipo }${ this.genero } com sucesso!`;
    }

    private mensagemErro(tipo: string) {
        return `Erro ao ${ tipo } ${ this.genero } ${ this.label.toLowerCase() }.`;
    }

    public mensagemSucessoCadastro(): string { 
        return this.mensagemSucesso('cadastrad');
    }
 
    public mensagemErroCadastro(): string { 
        return this.mensagemErro('cadastrar');
    }

    public mensagemSucessoAlteracao() {
         return this.mensagemSucesso('alterad');
    }

    public mensagemErroAlteracao(): string {
        return this.mensagemErro('alterar');
    }

    public mensagemSucessoExclusao(): string {
        return this.mensagemSucesso('excluid');
    }

    public mensagemErroExclusao(): string {
        return this.mensagemErro('excluir');
    }

    public mensagemSucessoBusca(): string {
        return this.mensagemSucesso('buscad');
    }
 
    public mensagemErroBusca(): string {
        return this.mensagemErro('buscar');
    }

}
