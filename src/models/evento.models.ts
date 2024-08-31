import TEvento from "../tipos/Evento";

export class Evento {
  private eventos: TEvento[];

  constructor(eventos: TEvento[]) {
    this.eventos = eventos;
  }

}
