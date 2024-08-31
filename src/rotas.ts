import { Router } from "express";
import Evento from "./controller/eventos.controller";
import Usuario from "./controller/usuarios.controller";
import Login from "./controller/login.controller";
import Compras from "./controller/compras.controller";
import Validacoes from "./middleware/validations.middleware";

const validar = new Validacoes()
const compra = new Compras()
const evento = new Evento()
const usuario = new Usuario()
const login = new Login()

const rotas = Router();

rotas.get("/", evento.getHome);
rotas.get("/eventos", validar.validacaoFiltro, evento.getEventos);
rotas.post("/usuarios", validar.userValidator, usuario.cadastrarUsuario);
rotas.post("/login", validar.loginValidator, login.postLogin);
rotas.post("/compras", validar.proofValidator, validar.eventValidator, compra.postCompras);
rotas.get("/compras", validar.proofValidator, compra.getCompras);
rotas.delete("/compras/:id", validar.proofValidator, compra.deleteCompras);

export default rotas;
