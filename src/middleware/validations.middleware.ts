import { Request, Response, NextFunction } from "express";
import bancoDeDados from "../bancoDeDados";
import ServicosDeValidacao from "../servicos/validationsServices.services";
import criptografarSenha from "../auxiliares/criptografia";

const servico = new ServicosDeValidacao()

export default class Validacoes{
public userValidator = (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const { senha, nome, email } = req.body;
  const usuarioExiste = bancoDeDados.usuarios.find(
    (user) => user.email === email,
  );
  if (!senha || !nome || !email) {
    return res
      .status(400)
      .json({ mensagem: "Todos os campos são obrigatórios" });
  }
  if (usuarioExiste) {
    return res.status(400).json({ mensagem: "E-mail já cadastrado" });
  }
  next();
};
loginValidator = (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const { email, senha } = req.body;
  const user = bancoDeDados.usuarios.find((user) => user.email === email);

  if (!email || !senha) {
    return res
      .status(400)
      .json({ mensagem: "Todos os campos são obrigatórios" });
  }
  if (user?.senha !== criptografarSenha(senha)) {
    return res.status(400).json({ mensagem: "E-mail ou senha inválidos" });
  }
  next();
};
validacaoFiltro = (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const { maxPreco } = req.query;

  if (maxPreco !== undefined) {
    const stringMaxPreco = maxPreco as string;

    if (!/^\d+$/.test(stringMaxPreco) || parseInt(stringMaxPreco) <= 0) {
      return res.status(400).json({
        mensagem:
          "O preço máximo do evento deve conter apenas números e deve ser positivo",
      });
    }
  }
  next();
};
proofValidator = (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const comprovante = String(req.query.comprovante);

  if (!comprovante) {
    return res.status(401).json({ mensagem: "Falha na autenticação" });
  }
  const userId = servico.validarComprovante(comprovante);
  const existentUser = bancoDeDados.usuarios.find((user) => user.id === userId);
  if (!existentUser) {
    return res.status(401).json({ mensagem: "Falha na autenticação" });
  }
  next();
};
eventValidator = (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const comprovante = String(req.query.comprovante);
  const { idEvento } = req.body;
  const userId = servico.validarComprovante(comprovante);
  if (!idEvento) {
    return res
      .status(400)
      .json({ mensagem: "O identificador do evento é obrigatório" });
  }
  if (!servico.validarEvento(idEvento)) {
    return res.status(404).json({ mensagem: "Evento não encontrado" });
  }
  if (!servico.validarUsuario(userId)) {
    return res.status(401).json({ mensagem: "Usuário não encontrado" });
  }
  next();
}
}
