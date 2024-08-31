const criptografarSenha = (senha: string): string => {
  let criptografarSenha = senha.split("").reverse().join("");
  let senhaCriptografada = `zz${criptografarSenha}yy`;
  return senhaCriptografada;
};
export default criptografarSenha;
