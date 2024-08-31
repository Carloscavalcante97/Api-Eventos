import { Request, Response } from "express";
import bancoDeDados from "../bancoDeDados";
import { v4 as uuidv4 } from "uuid";
import ServicosDeValidacao from "../servicos/validationsServices.services";
import Compra from "../models/compras.models";

const servico = new ServicosDeValidacao()

export default class Compras {
public postCompras = (req: Request, res: Response) => {
  const comprovanteLogin = String(req.query.comprovante);
  const userId = servico.validarComprovante(comprovanteLogin);
  const { idEvento } = req.body;
  const compraId = uuidv4();
  let novaCompra = new Compra({
    id: compraId,
    id_usuario: userId,
    id_evento: idEvento,
  });
  return res.status(201).json(novaCompra);
};

public getCompras = (req: Request, res: Response) => {
  const comprovanteLogin = String(req.query.comprovante);
  const userId = servico.validarComprovante(comprovanteLogin);
  const comprasUsuario =bancoDeDados.compras.filter(
    (compra) => compra.id_usuario === userId,
  ); 
  const listaUser =comprasUsuario.map((compra) => {
  const evento = bancoDeDados.eventos.find(
      (evento) => evento.id === compra.id_evento,
    );
    return {
      idCompra: compra.id,
      idEvento: compra.id_evento,
      nome:evento?.nome,
      endereco: evento?.endereco,
      data: evento?.data,
      preco: evento?.preco,
    }})
  return res.status(200).json(listaUser);

}
public deleteCompras = (req: Request, res: Response) => {
  const compraId = req.params.id;
  const comprovante = String(req.query.comprovante);
  const userId = servico.validarComprovante(comprovante);
  const compraIndex = servico.validarIndexCompra(userId, compraId);
  if (compraIndex == -1) {
    return res.status(404).json({ mensagem: "Compra não encontrada" });
  }
  bancoDeDados.compras.splice(compraIndex,1)
  return res.status(204).send();
}};