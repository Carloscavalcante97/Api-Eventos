import bancoDeDados from "../bancoDeDados";

export default class ServicosDeValidacao{
public validarEvento = (idEvento: string): boolean => {
  return bancoDeDados.eventos.some((evento) => evento.id === idEvento);
};

public validarUsuario = (userId: string): boolean => {
  return bancoDeDados.usuarios.some((user) => user.id === userId);
};
public validarIndexCompra = (
  userId: string,
  compraId: string,
): number => {
  return bancoDeDados.compras.findIndex(
    (compra) => compra.id === compraId && compra.id_usuario === userId,
  );
};
public validarComprovante = (comprovante: string) => {
  return comprovante.split("/")[1];
}
}