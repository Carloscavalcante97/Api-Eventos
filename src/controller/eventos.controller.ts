import { Request, Response } from "express";
import bancoDeDados from "../bancoDeDados";

export default class Eventos {

  public getHome = (req: Request, res: Response) => {
  return res.status(200).json({ mensagem: "API de vendas de ingressos" });
};

public getEventos = (req: Request, res: Response) => {
  const eventos = bancoDeDados.eventos;
  const precoMaximo = Number(req.query.maxPreco);

  const eventosFiltrados = eventos.filter((evento) => evento.preco <= precoMaximo);
  if(eventosFiltrados.length > 0){
    return res.status(200).json(eventosFiltrados);
  }
  return res.status(200).json(eventos)
 
};
}