export const mensagemObrigatorio = (label: string) => `${label} é obrigatório.`;

export const mensagemSucesso = () => 'E-mail enviado com sucesso!';

export const mensagemErro = (tipo: string, erro: any) => {
  const erroMenssagem: string = `Erro ao enviar o e-mail ${erro != undefined ? "- " + erro : "."}`;
  console.error(erroMenssagem);
  return new Error(erroMenssagem);
}

export const mensagemInvalido = (eMail: string) => {
  const mensagem: string = `O ${ eMail } é inválido!`;
  console.log(mensagem);
  return mensagem;
}
