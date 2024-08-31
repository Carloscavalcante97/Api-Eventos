import TUsuario from "../tipos/Usuario";
import { v4 as uuidv4 } from "uuid";
export default class RegistrarUsuario {
  readonly id: string;
  public nome: string;
  public email: string;
  public senha: string;
  constructor(nome: string, email: string, senha: string) {
    this.id = uuidv4();
    this.nome = nome;
    this.email = email;
    this.senha = senha;
  }
 
  }

