import supertest from "supertest";
import app from "../src/app";
import comprovanteLogin from "../src/fraseSecreta";
import bancoDeDados from "../src/bancoDeDados";
import TCompra from "../src/tipos/Compra";

const request = supertest(app);

describe("POST /compras", () => {
  it("deve retonar status 401 caso o comprovante não seja passado", async () => {
    const resposta = await request
      .post("/compras")
      .set("content-type", "application/json")
      .send({ idEvento: "c8d28b3f-87fb-469f-9372-24c92dfc3970" });
    expect(resposta.statusCode).toBe(401);
  });

  it("deve retonar mensagem de erro caso o comprovante não seja passado", async () => {
    const resposta = await request
      .post("/compras")
      .set("content-type", "application/json")
      .send({ idEvento: "c8d28b3f-87fb-469f-9372-24c92dfc3970" });
    expect(resposta.body.mensagem).toBe("Falha na autenticação");
  });

  it("deve retonar status 401 caso o usuário com id presente no comprovante não exista", async () => {
    const comprovante =
      comprovanteLogin + "/" + "9f220726-9de6-4cbd-977f-c4a9631ed392";
    const resposta = await request
      .post(`/compras?comprovante=${comprovante}`)
      .set("content-type", "application/json")
      .send({ idEvento: "c8d28b3f-87fb-469f-9372-24c92dfc3970" });
    expect(resposta.statusCode).toBe(401);
  });

  it("deve retonar mensagem de erro caso o usuário com id presente no comprovante não exista", async () => {
    const comprovante =
      comprovanteLogin + "/" + "9f220726-9de6-4cbd-977f-c4a9631ed392";
    const resposta = await request
      .post(`/compras?comprovante=${comprovante}`)
      .set("content-type", "application/json")
      .send({ idEvento: "c8d28b3f-87fb-469f-9372-24c92dfc3970" });
    expect(resposta.body.mensagem).toBe("Falha na autenticação");
  });

  it("deve retonar status 400 caso o campo obrigatório não seja passado", async () => {
    const comprovante =
      comprovanteLogin + "/" + "9f220726-9de6-4cbd-977f-c4a9631ed393";
    const resposta = await request
      .post(`/compras?comprovante=${comprovante}`)
      .set("content-type", "application/json")
      .send();
    expect(resposta.statusCode).toBe(400);
  });

  it("deve retonar mensagem de erro caso o campo obrigatório não seja passado", async () => {
    const comprovante =
      comprovanteLogin + "/" + "9f220726-9de6-4cbd-977f-c4a9631ed393";
    const resposta = await request
      .post(`/compras?comprovante=${comprovante}`)
      .set("content-type", "application/json")
      .send();
    expect(resposta.body.mensagem).toBe(
      "O identificador do evento é obrigatório",
    );
  });

  it("deve retonar status 404 caso o evento não seja encontrado", async () => {
    const comprovante =
      comprovanteLogin + "/" + "9f220726-9de6-4cbd-977f-c4a9631ed393";
    const idEvento = "c8d28b3f-87fb-469f-9372-24c92dfc3971";
    const resposta = await request
      .post(`/compras?comprovante=${comprovante}`)
      .set("content-type", "application/json")
      .send({ idEvento });
    expect(resposta.statusCode).toBe(404);
  });

  it("deve retonar mensagem de erro caso o evento não seja encontrado", async () => {
    const comprovante =
      comprovanteLogin + "/" + "9f220726-9de6-4cbd-977f-c4a9631ed393";
    const idEvento = "c8d28b3f-87fb-469f-9372-24c92dfc3971";
    const resposta = await request
      .post(`/compras?comprovante=${comprovante}`)
      .set("content-type", "application/json")
      .send({ idEvento, comprovante });
    expect(resposta.body.mensagem).toBe("Evento não encontrado");
  });

  it("deve cadastrar a comprar e retornar com a compra criada com status 201", async () => {
    const comprovante =
      comprovanteLogin + "/" + "0d72930e-5f88-4ad7-9253-56a7264d9800";
    const idEvento = "ff3ccd80-9ec6-47c6-9534-0997bb3f9df1";
    const resposta = await request
      .post(`/compras?comprovante=${comprovante}`)
      .set("content-type", "application/json")
      .send({ idEvento });
    expect(resposta.statusCode).toBe(201);
    expect(resposta.body).toHaveProperty("id");
    expect(resposta.body).toHaveProperty("id_usuario");
    expect(resposta.body).toHaveProperty("id_usuario");
    expect(resposta.body).toHaveProperty("id_evento");

    const compraCadastrada = bancoDeDados.compras.find(
      (compra) => compra.id === resposta.body.id,
    );

    expect(compraCadastrada).not.toBeNull();

    bancoDeDados.compras.pop();
  });
});

describe("GET /compras", () => {
  it("deve retornar status 200", async () => {
    const comprovante =
      comprovanteLogin + "/" + "0d72930e-5f88-4ad7-9253-56a7264d9800";
    const resposta = await request
      .get(`/compras?comprovante=${comprovante}`)
      .send();
    expect(resposta.statusCode).toBe(200);
  });

  it("deve retornar um array de compras", async () => {
    const comprovante =
      comprovanteLogin + "/" + "0d72930e-5f88-4ad7-9253-56a7264d9800";
    const resposta = await request
      .get(`/compras?comprovante=${comprovante}`)
      .send();

    const comprasRetornadas: TCompra[] = resposta.body;
    expect(Array.isArray(comprasRetornadas)).toBeTruthy();
  });

  it("deve retornar as compras do usuário logado", async () => {
    const idUsuario = "0d72930e-5f88-4ad7-9253-56a7264d9800";
    const comprovante = `${comprovanteLogin}/${idUsuario}`;
    const resposta = await request
      .get(`/compras?comprovante=${comprovante}`)
      .send();

    type TRetorno = {
      idCompra: string;
      idEvento: string;
      nome: string;
      endereco: string;
      data: string;
      preco: number;
    };

    const comprasRetornadas: TRetorno[] = resposta.body;

    const retornoEsperado = [
      {
        idCompra: "6e516af8-9cc9-410c-a40a-08611f62eb1b",
        idEvento: "0150b979-9c12-4f2a-b357-c4f3ee89e10e",
        nome: "ut, nulla. Cras eu tellus eu augue",
        endereco: "4871 Lectus. St.",
        data: "11/21/2023",
        preco: 3800,
      },
      {
        idCompra: "b05e00c5-55f5-4d4e-b453-531f9afcd252",
        idEvento: "0150b979-9c12-4f2a-b357-c4f3ee89e10e",
        nome: "ut, nulla. Cras eu tellus eu augue",
        endereco: "4871 Lectus. St.",
        data: "11/21/2023",
        preco: 3800,
      },
    ];

    expect(comprasRetornadas).toEqual(retornoEsperado);
  });
});

describe("DELETE /compras/:id", () => {
  it("deve retornar status 404 se a compra não for encontrada entre as compras do usuário logado", async () => {
    const idUsuario = "0d72930e-5f88-4ad7-9253-56a7264d9800";
    const idCompra = "e27ee29b-aa5d-4c80-84a2-eff485c61292";
    const comprovante = `${comprovanteLogin}/${idUsuario}`;
    const resposta = await request
      .delete(`/compras/${idCompra}?comprovante=${comprovante}`)
      .set("content-type", "application/json")
      .send();
    expect(resposta.statusCode).toBe(404);
  });

  it("deve retornar mensagem de erro se a compra não for encontrada entre as compras do usuário logado", async () => {
    const idUsuario = "0d72930e-5f88-4ad7-9253-56a7264d9800";
    const idCompra = "e27ee29b-aa5d-4c80-84a2-eff485c61292";
    const comprovante = `${comprovanteLogin}/${idUsuario}`;
    const resposta = await request
      .delete(`/compras/${idCompra}?comprovante=${comprovante}`)
      .set("content-type", "application/json")
      .send();
    expect(resposta.body.mensagem).toBe("Compra não encontrada");
  });

  it("deve retornar status 204 e excluir a compra", async () => {
    const idUsuario = "493a5847-e05f-452d-8747-ca5b3fe4068f";
    const idCompra = "e27ee29b-aa5d-4c80-84a2-eff485c61292";
    const contaEncontrada = bancoDeDados.compras.find(
      (compra) => compra.id === idCompra,
    );
    const comprovante = `${comprovanteLogin}/${idUsuario}`;
    const resposta = await request
      .delete(`/compras/${idCompra}?comprovante=${comprovante}`)
      .set("content-type", "application/json")
      .send();

    expect(resposta.statusCode).toBe(204);

    const contaDeletadaEncontrada = bancoDeDados.compras.find(
      (compra) => compra.id === "e27ee29b-aa5d-4c80-84a2-eff485c61292",
    );

    expect(contaDeletadaEncontrada).toBeUndefined();

    bancoDeDados.compras.push(contaEncontrada!);
  });
});
