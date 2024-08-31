import { Response } from "supertest";
import app from "../src/app";
import supertest from "supertest";
import bancoDeDados from "../src/bancoDeDados";
import fraseSecreta from "../src/fraseSecreta";

const request = supertest(app);

describe("POST /usuarios", function () {
  it("deve retornar status 400 se algum campo obrigatório não for passado", async () => {
    const respostaSemSenha: Response = await request
      .post("/usuarios")
      .set("Content-type", "application/json")
      .send({ nome: "Lucas", email: "lucas@cubos.academy" });
    const respostaSemEmail: Response = await request
      .post("/usuarios")
      .set("Content-type", "application/json")
      .send({ nome: "Lucas", senha: "123" });
    const respostaSemNome: Response = await request
      .post("/usuarios")
      .set("Content-type", "application/json")
      .send({ email: "caldeira@gmail.com", senha: "123" });
    const respostaSemTodos: Response = await request
      .post("/usuarios")
      .set("Content-type", "application/json")
      .send({});
    expect(respostaSemSenha.statusCode).toEqual(400);
    expect(respostaSemEmail.statusCode).toEqual(400);
    expect(respostaSemNome.statusCode).toEqual(400);
    expect(respostaSemTodos.statusCode).toEqual(400);
  });

  it("deve retornar mensagem de erro se algum campo obrigatório não for passado", async () => {
    const respostaSemSenha: Response = await request
      .post("/usuarios")
      .set("Content-type", "application/json")
      .send({ nome: "Lucas", email: "lucas@cubos.academy" });
    const respostaSemEmail: Response = await request
      .post("/usuarios")
      .set("Content-type", "application/json")
      .send({ nome: "Lucas", senha: "123" });
    const respostaSemNome: Response = await request
      .post("/usuarios")
      .set("Content-type", "application/json")
      .send({ email: "lucas@cubos.academy", senha: "123" });
    const respostaSemTodos: Response = await request
      .post("/usuarios")
      .set("Content-type", "application/json")
      .send({});
    const mensagemErroEsperada = "Todos os campos são obrigatórios";
    expect(respostaSemSenha.body.mensagem).toBe(mensagemErroEsperada);
    expect(respostaSemEmail.body.mensagem).toBe(mensagemErroEsperada);
    expect(respostaSemNome.body.mensagem).toBe(mensagemErroEsperada);
    expect(respostaSemTodos.body.mensagem).toBe(mensagemErroEsperada);
  });

  it("deve retornar mensagem de erro se já existir e-mail cadastrado", async () => {
    const resposta: Response = await request
      .post("/usuarios")
      .set("Content-type", "application/json")
      .send({ nome: "guido", email: "eu.dui.cum@google.edu", senha: "1234" });
    const mensagemErroEsperada = "E-mail já cadastrado";
    expect(resposta.body.mensagem).toBe(mensagemErroEsperada);
  });

  it("deve retornar um json", async () => {
    const resposta: Response = await request
      .post("/usuarios")
      .set("Content-type", "application/json")
      .send({ nome: "Lucas", email: "lucas@cubos.academy" });
    expect(resposta.headers["content-type"]).toMatch(/json/);
  });

  it("deve criptografar a senha criptografada", async () => {
    const novoUsuario = {
      nome: "Vidal",
      email: "vidal@cubos.academy",
      senha: "cubos1234",
    };
    const senhaCriptografada = "zz4321sobucyy";

    await request
      .post("/usuarios")
      .set("Content-type", "application/json")
      .send(novoUsuario);

    const usuarioCadastrado = bancoDeDados.usuarios.pop();

    expect(usuarioCadastrado!.senha).toBe(senhaCriptografada);
  });

  it("deve retornar status 201", async () => {
    const novoUsuario = {
      nome: "Lucas",
      email: "lucas@cubos.academy",
      senha: "cubos1234",
    };
    const resposta: Response = await request
      .post("/usuarios")
      .set("Content-type", "application/json")
      .send(novoUsuario);
    expect(resposta.statusCode).toBe(201);
    bancoDeDados.usuarios.pop();
  });

  it("deve retornar o novo usuário cadastrado com id gerado pelo uuid4 e sem a senha", async () => {
    const novoUsuario = {
      nome: "Ariel",
      email: "ariel@cubos.academy",
      senha: "cubos1234",
    };
    const retorno: Response = await request
      .post("/usuarios")
      .set("Content-type", "application/json")
      .send(novoUsuario);

    const propriedadesDesejadas = ["id", "nome", "email"];

    expect(Object.keys(retorno.body)).toEqual(
      expect.arrayContaining(propriedadesDesejadas),
    );

    expect(Object.keys(retorno.body)).toHaveLength(
      propriedadesDesejadas.length,
    );

    const uuidRegex =
      /^[0-9a-f]{8}-[0-9a-f]{4}-4[0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;
    expect(String(retorno.body.id)).toMatch(uuidRegex);

    bancoDeDados.usuarios.pop();
  });
});

describe("POST /login", function () {
  it("deve retornar status 400 se algum campo obrigatório não for passado", async () => {
    const respostaSemEmail: Response = await request
      .post("/login")
      .set("Content-type", "application/json")
      .send({ email: "eu.dui.cum@google.edu" });
    const respostaSemSenha: Response = await request
      .post("/login")
      .set("Content-type", "application/json")
      .send({ senha: "zzVPV12WWL3QGyy" });
    const respostaSemTodos: Response = await request
      .post("/login")
      .set("Content-type", "application/json")
      .send({});
    expect(respostaSemSenha.statusCode).toEqual(400);
    expect(respostaSemEmail.statusCode).toEqual(400);
    expect(respostaSemTodos.statusCode).toEqual(400);
  });

  it("deve retornar mensagem de erro se algum campo obrigatório não for passado", async () => {
    const respostaSemEmail: Response = await request
      .post("/login")
      .set("Content-type", "application/json")
      .send({ email: "eu.dui.cum@google.edu" });
    const respostaSemSenha: Response = await request
      .post("/login")
      .set("Content-type", "application/json")
      .send({ senha: "zzVPV12WWL3QGyy" });
    const respostaSemTodos: Response = await request
      .post("/login")
      .set("Content-type", "application/json")
      .send({});
    const mensagemErroEsperada = "Todos os campos são obrigatórios";
    expect(respostaSemSenha.body.mensagem).toBe(mensagemErroEsperada);
    expect(respostaSemEmail.body.mensagem).toBe(mensagemErroEsperada);
    expect(respostaSemTodos.body.mensagem).toBe(mensagemErroEsperada);
  });

  it("deve retornar status 400 se não existir e-mail cadastrado", async () => {
    const resposta: Response = await request
      .post("/login")
      .set("Content-type", "application/json")
      .send({ email: "guido@google.edu", senha: "1234" });
    expect(resposta.statusCode).toBe(400);
  });

  it("deve retornar mensagem de erro se não existir e-mail cadastrado", async () => {
    const resposta: Response = await request
      .post("/login")
      .set("Content-type", "application/json")
      .send({ email: "guido@google.edu", senha: "1234" });
    const mensagemErroEsperada = "E-mail ou senha inválidos";
    expect(resposta.body.mensagem).toBe(mensagemErroEsperada);
  });

  it("deve retornar status 400 se a senha não corresponder", async () => {
    const resposta: Response = await request
      .post("/login")
      .set("Content-type", "application/json")
      .send({ email: "eu.dui.cum@google.edu", senha: "123" });
    expect(resposta.statusCode).toBe(400);
  });

  it("deve retornar mensagem de erro se a senha não corresponder", async () => {
    const resposta: Response = await request
      .post("/login")
      .set("Content-type", "application/json")
      .send({ email: "eu.dui.cum@google.edu", senha: "123" });
    const mensagemErroEsperada = "E-mail ou senha inválidos";
    expect(resposta.body.mensagem).toBe(mensagemErroEsperada);
  });

  it("deve retornar um json", async () => {
    const resposta: Response = await request
      .post("/login")
      .set("Content-type", "application/json")
      .send({ email: "eu.dui.cum@google.edu", senha: "321" });
    expect(resposta.headers["content-type"]).toMatch(/json/);
  });

  it("deve retornar status 200", async () => {
    const resposta: Response = await request
      .post("/login")
      .set("Content-type", "application/json")
      .send({ email: "eu.dui.cum@google.edu", senha: "321" });
    expect(resposta.statusCode).toBe(200);
  });

  it("deve retornar o comprovante do login dentro de uma propriedade 'comprovante'", async () => {
    const resposta: Response = await request
      .post("/login")
      .set("Content-type", "application/json")
      .send({ email: "eu.dui.cum@google.edu", senha: "321" });
    const comprovante =
      fraseSecreta + "/" + "9f220726-9de6-4cbd-977f-c4a9631ed393";
    expect(resposta.body.comprovante).toBe(comprovante);
  });
});
