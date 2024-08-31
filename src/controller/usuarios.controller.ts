import { Request, Response } from "express";
import bancoDeDados from "../bancoDeDados";
import criptografarSenha from "../auxiliares/criptografia";
import RegistrarUsuario from "../models/cadastro.Models";

export default class Usuario {
public cadastrarUsuario = (req: Request, res: Response) => {
  const { senha, email, nome } = req.body;
  let users = bancoDeDados.usuarios;
  const senhaCriptografada = criptografarSenha(senha);
  const novoUsuario = new RegistrarUsuario(nome, email,senhaCriptografada);
  const usuarioRegistrado = {
    id: novoUsuario.id,
    nome: novoUsuario.nome,
    email: novoUsuario.email
  }
  users.push(novoUsuario);
  return res.status(201).json(usuarioRegistrado);
}};
