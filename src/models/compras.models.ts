import TCompra from "../tipos/Compra";


export default class Compra {
  readonly id: string;
  public id_usuario: string;
  public id_evento: string;
  constructor(compra: TCompra) {
    (this.id = compra.id),
      (this.id_usuario = compra.id_usuario),
      (this.id_evento = compra.id_evento);
  }
  }
 
