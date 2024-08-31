import { Response } from "supertest";
import app from "../src/app";
import supertest from "supertest";

const request = supertest(app);

let resposta: Response;

beforeAll(async () => {
  resposta = await request.get("/").send();
});

describe("GET /", function () {
  it("deve retornar status 200", async () => {
    expect(resposta.statusCode).toEqual(200);
  });

  it("deve retornar um json", async () => {
    expect(resposta.headers["content-type"]).toMatch(/json/);
  });

  it("deve retornar mensagem pedida", async () => {
    expect(resposta.body.mensagem).toEqual("API de vendas de ingressos");
  });
});
