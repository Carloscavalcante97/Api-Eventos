import { Request, Response } from "express";
import bancoDeDados from "../bancoDeDados";
import fraseSecreta from "../fraseSecreta";

export default class Login{
  public postLogin = (req: Request, res: Response) => {
  const { email } = req.body;

  const usuarioExistente = bancoDeDados.usuarios.find(
    (user) => user.email === email,
  );
  if (!usuarioExistente) {
    return undefined;
  }
  let comprovante = `${fraseSecreta}/${usuarioExistente.id}`;

  return res.status(200).json({ comprovante: comprovante });
}
};
