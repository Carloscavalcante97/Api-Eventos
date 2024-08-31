import criptografarSenha from "../src/auxiliares/criptografia";

describe("Criptografia de senha", () => {
  test("deve retornar a senha criptografada em caso numérico", () => {
    const senha = "1234";
    const resultado = criptografarSenha(senha);
    expect(resultado).toBe("zz4321yy");
  });

  test("deve retornar a senha criptografada em alfanumérico", () => {
    const senha = "cubos123";
    const resultado = criptografarSenha(senha);
    expect(resultado).toBe("zz321sobucyy");
  });
});
