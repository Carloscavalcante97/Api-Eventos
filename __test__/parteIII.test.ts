import { Response } from "supertest";
import app from "../src/app";
import supertest from "supertest";
import bancoDeDados from "../src/bancoDeDados";

const request = supertest(app);

let resposta: Response;

beforeAll(async () => {
  resposta = await request.get("/eventos").send();
});

describe("GET /eventos", () => {
  it("deve retornar status 200", async () => {
    expect(resposta.statusCode).toEqual(200);
  });

  it("deve retornar um json", async () => {
    expect(resposta.headers["content-type"]).toMatch(/json/);
  });

  it("deve retornar todos os eventos caso não seja passado o filtro", async () => {
    expect(resposta.body).toEqual(bancoDeDados.eventos);
  });

  it("deve retornar status 400 caso o filtro seja inválido", async () => {
    resposta = await request.get("/eventos?maxPreco=140asd").send();
    expect(resposta.statusCode).toBe(400);
    resposta = await request.get("/eventos?maxPreco=-1").send();
    expect(resposta.statusCode).toBe(400);
  });

  it("deve retornar mensagem de erro caso o filtro seja inválido", async () => {
    resposta = await request.get("/eventos?maxPreco=140asd").send();
    expect(resposta.body.mensagem).toBe(
      "O preço máximo do evento deve conter apenas números e deve ser positivo",
    );
    resposta = await request.get("/eventos?maxPreco=-1").send();
    expect(resposta.body.mensagem).toBe(
      "O preço máximo do evento deve conter apenas números e deve ser positivo",
    );
  });

  it("deve retornar os eventos filtrados por preço caso seja passado o filtro", async () => {
    resposta = await request.get("/eventos?maxPreco=14000").send();
    const eventosFiltrados = [
      {
        id: "c8d28b3f-87fb-469f-9372-24c92dfc3970",
        nome: "sit amet metus. Aliquam erat",
        endereco: "5797 Dolor Ave",
        data: "09/03/2023",
        preco: 9900,
      },
      {
        id: "79d89c53-7934-4459-a432-839655f4d104",
        nome: "laoreet lectus",
        endereco: "858-226 Ornare St.",
        data: "08/28/2024",
        preco: 4400,
      },
      {
        id: "0150b979-9c12-4f2a-b357-c4f3ee89e10e",
        nome: "ut, nulla. Cras eu tellus eu augue",
        endereco: "4871 Lectus. St.",
        data: "11/21/2023",
        preco: 3800,
      },
      {
        id: "7132a1f2-6a16-4382-a9e7-f9581bb3c996",
        nome: "tincidunt. Donec vitae erat vel pede blandit",
        endereco: "Ap #348-8950 Nostra, Road",
        data: "07/03/2023",
        preco: 14000,
      },
      {
        id: "5e47d5c1-8a71-4d58-8d76-63e3a20ede67",
        nome: "adipiscing, enim mi tempor lorem,",
        endereco: "550-902 Natoque Avenue",
        data: "05/16/2023",
        preco: 7200,
      },
      {
        id: "faff3612-7138-45cc-9e41-e42e2506d87e",
        nome: "augue ac ipsum. Phasellus",
        endereco: "724-2105 Ad Street",
        data: "05/06/2023",
        preco: 11100,
      },
      {
        id: "34734b90-6505-414f-88a4-7fda65c6fda2",
        nome: "sagittis felis. Donec tempor, est ac mattis semper, dui",
        endereco: "P.O. Box 138, 8624 Nisl. Road",
        data: "09/14/2023",
        preco: 9200,
      },
      {
        id: "22eaab9d-be32-44e2-bc5d-5f71556e9b29",
        nome: "consectetuer",
        endereco: "9351 Molestie. Rd.",
        data: "11/03/2024",
        preco: 9600,
      },
    ];
    expect(resposta.body).toEqual(eventosFiltrados);
  });
});
