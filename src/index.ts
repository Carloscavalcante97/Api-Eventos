import app from "./app";

const PORTA = process.env.PORTA;

app.listen(PORTA, () => console.log(`API rodando na porta ${PORTA}`));
