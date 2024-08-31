# Desafio de API REST

## Instruções para entrega

1. Faça o fork deste repositório
2. Clone o repositório forkado
3. Edite o final deste README colocando o seu nome no local indicado (não é necessário clonar o repositório. Você pode fazer esse passo pelo próprio GitHub)
4. Abra um pull request colocando o seu nome e sobrenome no título do pull request
5. Copie o link do seu pull request (PR) e cole-o na Plataforma do Aluno no local indicado para a entrega (o link do pull request termina com "/pull/`NUMERO_DO_PULL_REQUEST`")

#### ⚠️ Importante: o passo a passo acima visa priorizar a entrega do desafio logo nos primeiros minutos. Se desejar, pode deixar para fazer o pull request (PR) após o término do projeto

#### ⚠️ Importante: você NÃO deve abrir mais de um pull request. Ao atualizar a branch main do seu repositório remoto (git push), seu PR será atualizado também

#### ⚠️ Importante: se o pull request não for criado e enviado na plataforma, o feedback não será fornecido, e o desafio constará como não entregue

## Primeiros passos

1. Clone o projeto
2. Use o comando `npm install` para instalar as dependências
3. A porta configurada para sua aplicação rodar é a 3000. Caso deseje trocá-la, mude o valor da variável "PORTA" que está dentro do arquivo ".env"
4. Use o comando `npm run dev` para rodar o projeto

#### ⚠️ Importante: repare que o projeto já inicia com uma estrutura inicial. Você não deve mexer nessa estrutura

## Como testar seu código e saber a nota

Para testar seu código, use o comando:

- `npm run test`: esse comando irá mostrar no terminal sua nota e irá gerar uma pasta chamada "resultados". Dentro da pasta terá um arquivo chamado "relatorio.html", que é um relatório detalhando os resultados dos testes. Esse relatório será aberto automaticamente no seu navegador

#### ⚠️ Importante: se por algum motivo o relatório não for aberto automaticamente no seu navegador, sugerimos que instale uma extensão no VS Code chamada "Live Server". Após instalada, clique com o botão direito em cima do arquivo "relatorio.html" e clique em "Abrir com Live Server" ("Open with Live Server")

## Dicas

- Faça commits regulares
- Quando terminar, lembre-se de atualizar seu repositório remoto (`git push`)

## Descrição do desafio

Você acabou de ser contratado pela melhor empresa de tecnologia do mundo: a **CUBOS**.

Sua primeira tarefa como desenvolvedor é criar uma API para um site de compra de ingressos para eventos. Esse será um projeto **piloto**, ou seja, no futuro outras funcionalidades serão implementadas.

Seu papel é construir uma API RESTful que permita ao usuário:

- Listar os eventos cadastrados
- Criar uma conta
- Fazer login
- Fazer uma compra
- Listar compras
- Cancelar uma compra

#### ⚠️ Importante: sempre que a validação de uma requisição falhar, responda com código de erro e mensagem adequada à situação. Essa mensagem, que deverá ser exatamente a pedida em cada cenário, deve ser o valor de uma propriedade chamada "mensagem" (veja o exemplo abaixo)

**Exemplo:**

```json
// Quando é informado um id de uma compra que não existe:
// HTTP Status 404
{
  "mensagem": "Compra não encontada!"
}
```

### Persistências dos dados

Os dados serão persistidos em memória, no objeto existente dentro do arquivo `src/bancoDeDados.ts`.

#### ⚠️ Importante: você NÃO deve, em nenhuma hipótese, editar o arquivo src/bancoDeDados.ts

### Estrutura do objeto no arquivo `bancoDeDados.ts`

```ts
{
    eventos: [
        // array de eventos cadastrados no site
    ],
    usuarios: [
        // array de usuários cadastrados no site
    ],
    compras: [
        // array de compras cadastradas no site
    ],
}
```

### Requisitos obrigatórios

- Sua API deve seguir o padrão REST
- Qualquer valor (dinheiro) será representado em centavos (Ex.: R$ 10,00 reais = 1000)
- Evite códigos duplicados. Antes de copiar e colar, pense se não faz sentido esse pedaço de código estar centralizado numa função

### Status Code

Abaixo, listamos os possíveis **status code** esperados como resposta da API

Obs.: A lista abaixo é para consulta. **Não** significa que todos os **status codes** precisam necessariamente ser utilizados

```ts
// 200 (OK) = requisição bem sucedida
// 201 (Created) = requisição bem sucedida e algo foi criado
// 204 (No Content) = requisição bem sucedida, sem conteúdo no corpo da resposta
// 400 (Bad Request) = o servidor não entendeu a requisição pois está com uma sintaxe/formato inválido
// 401 (Unauthorized) = o usuário não está autenticado (logado)
// 403 (Forbidden) = o usuário não tem permissão de acessar o recurso solicitado
// 404 (Not Found) = o servidor não pode encontrar o recurso solicitado
// 500 (Internal Server Error) = falhas causadas pelo servidor
```

---

---

<details>
<summary>Parte I</summary>

### Inicialização do projeto

### Criptografia da Senha

Quando um usuário faz cadastro em um sistema ou quando ele decide atualizar sua senha, é realizada uma criptografia, que é a conversão de texto simples legível por humanos em texto incompreensível. Essa prática protege as senhas dos usuários contra acesso não autorizado por parte de invasores. Mesmo que o banco de dados (local onde a senha criptografada fica armazenada) seja comprometido, as senhas não podem ser facilmente decifradas

- Crie uma pasta chamada "auxiliares" dentro da pasta "src"
- Dentro dela, crie um arquivo chamado "criptografia.ts"
- Dentro dele, crie uma função chamada "criptografarSenha", que será responsável por recebe a senha (do tipo string) do usuário e retorná-la criptografada
- Exporte essa função por padrão (`export default`)

A criptografia que usaremos é simples. O que faremos é a inversão dos caracteres da senha do usuário e a adição da string "zz" no começo da string "yy" ao final. Sendo assim, se a senha digitada pelo usuário for "cubos", a senha criptografada será:

1. Inversão: "sobuc"
2. Adição ao início: "zzsobuc"
3. Adição ao final: "zzsobucyy"

Ou seja, a senha criptografada será "zzsobucyy"

- ### REQUISITOS OBRIGATÓRIOS

```
- Receber um string chamada que armazenará a senha
- Retornar a senha criptografada
- Essa função deve ser Exportada por padrão
```

</details>

<details>
<summary>Parte II</summary>

### Inicialização do projeto

`GET /`

Essa será nossa rota principal

- ### Requisição

Sem parâmetros de rota, de consulta ou de corpo

- ### Resposta

Deveremos enviar no corpo (body) da resposta a mensagem "API de vendas de ingressos"

- ### REQUISITOS OBRIGATÓRIOS

Não há

- ### Exemplo de requisição

```json
// POST /usuario
```

- ### Exemplo de resposta

```json
// HTTP Status 200 / 201 / 204
{
  "mensagem": "API de vendas de ingressos"
}
```

</details>

<details>
<summary>Parte III</summary>

### Listar eventos

#### `GET` `/eventos?maxPreco=5000`

Esse endpoint deverá listar todos os eventos cadastrados no banco. Caso o filtro `maxPreco` seja passado, deverá mostrar somente os eventos com preço menor ou igual ao filtro

- ### Requisição

Parâmetro opcional do tipo query chamado "maxPreco"

- ### Resposta

  - Em caso de **sucesso**: array contendo os eventos cadastrados filtrados ou não, dependendo se o filtro foi ou não passado
  - Em caso de **erro**:
    - filtro inválido: status code apropriado e a mensagem "O preço máximo do evento deve conter apenas números e deve ser positivo"

- ### REQUISITOS OBRIGATÓRIOS

```
- Caso o filtro seja passado, ele deve conter apenas caracteres numéricos e deve ser maior ou igual a zero
```

**Dica: se uma string contiver apenas caracteres numéricos, é possível convetê-la para número**

**Dica: tente colocar essa validação em um intermediário**

- ### Exemplo de requisição

```json
// POST /eventos?maxPreco=9900
```

- ### Exemplos de respostas

```json
// HTTP Status 200 / 201 / 204
[
  {
    "id": "c8d28b3f-87fb-469f-9372-24c92dfc3970",
    "nome": "sit amet metus. Aliquam erat",
    "endereco": "5797 Dolor Ave",
    "data": "09/03/2023",
    "preco": 9900
  },
  {
    "id": "34734b90-6505-414f-88a4-7fda65c6fda2",
    "nome": "sagittis felis. Donec tempor, est ac mattis semper, dui",
    "endereco": "P.O. Box 138, 8624 Nisl. Road",
    "data": "09/14/2023",
    "preco": 9223
  }
]
```

```json
// HTTP Status 400 / 401 / 403 / 404
{
  "mensagem": "O preço máximo do evento deve conter apenas números e deve ser positivo"
}
```

</details>

<details>
<summary>Parte IV</summary>

### Criar uma conta

#### `POST` `/usuarios`

Esse endpoint deverá cadastrar um novo usuário no sistema

- ### Requisição

Sem parâmetros de rota ou de consulta

O corpo (body) deverá possuir um objeto com as seguintes propriedades (respeitando estes nomes):

- nome: campo **obrigatório** do tipo string
- email: campo **obrigatório** do tipo string
- senha: campo **obrigatório** do tipo string

- ### Resposta

  - Em caso de **sucesso**: informações do usuário cadastrado, incluindo seu id e excluíndo sua senha criptografada
  - Em caso de **erro**:
    - algum campo obrigatório não enviado: status code apropriado e a mensagem "Todos os campos são obrigatórios"
    - caso já exista algum usuário já cadastrado com o e-mail passado: status code apropriado e a mensagem "E-mail já cadastrado"

- ### REQUISITOS OBRIGATÓRIOS

```
- Validar se todos os campos obrigatórios foram enviados
- Validar se o e-mail informado já existe
- Criptografar a senha usando uuid4 antes de persistir no banco de dados
- Cadastrar o usuário no banco de dados
```

- ### Exemplo de requisição

```json
// POST /usuarios
{
  "nome": "José",
  "email": "jose@email.com",
  "senha": "123456"
}
```

- ### Exemplos de respostas

```json
// HTTP Status 200 / 201 / 204
{
  "id": "c8d28b3f-87fb-469f-9372-24c92dfc3957",
  "nome": "José",
  "email": "jose@email.com"
}
```

```json
// HTTP Status 400 / 401 / 403 / 404
{
  "mensagem": "Todos os campos são obrigatórios"
}
```

```json
// HTTP Status 400 / 401 / 403 / 404
{
  "mensagem": "E-mail já cadastrado"
}
```

### Fazer login

#### `POST` `/login`

Esse endpoint será responsável pelo login do usuário

Antes de passarmos para os aspectos técnicos da implementação, vamos entender um pouco sobre como irá funcionar o login...

O que sabemos é o seguinte: quando vamos fazer login em algum site, geralmente passamos nosso e-mail e senha. Caso a senha ou o e-mail estejam errados, é retornado um erro; caso esteja tudo ok, é inicializada uma sessão e somos redirecionados para outra página, onde podemos usar as funcionalidades disponíveis somente para quem fez o login (editar nossos dados, fazer uma compra, visualizar nossas compras, visualizar o cartão de crédito cadastrado...). Nossa sessão se encerra quando clicamos em "sair" ou, em alguns casos, quando ficamos algum tempo sem mexer no site

Beleza, mas aqui entra uma questão legal de se pensar: vimos que uma API RESTful é stateless, ou seja, ela não guarda informações de requisições anteriores, toda requisição recebida é como se fosse a primeira. Agora imagine que fizemos nosso login certinho e que queremos, por exemplo, mudar nossa senha. Você tem que concordar que para mudarmos a senha, que é algo sensível, é necessário que estejamos logados (sessão iniciada). Mas até então beleza, pois assumimos que já fizemos o login. O problema é: quando enviarmos a requisição para a API solicitando a mudança da nossa senha, como ela é stateless, ela não vai se "lembrar" que já fizemos o login anteriormente. Nesse caso, a API vai retornar um erro falando que não temos autorização para editar a senha! Agora surge a pergunta: como podemos fazer a API se "lembrar" que fizemos o login. O que vamos fazer é algo simples: quando fizemos o login, vamos entregar no corpo da resposta um "comprovante de login". Desta forma, toda vez que fizemos uma requisição dali para frente, vamos passar esse comprovante. Assim, quando a API verificar o que mandamos, conferindo que o comprovante foi enviado e que é válido, ela vai "saber" que fizemos o login antes daquela requisição. Legal, né?

Uma comparação que podemos fazer, que é exatamente a mesma ideia, é com quando vamos a uma festa com nome na lista. Quando você chega na portaria, o segurança:

- confere se seu nome está na lista (o equivalente, no caso da API, a conferir se o e-mail passado existe)
- se não estiver, você é mandado embora; se sim, ele confere, através da sua identidade, se você é quem fiz ser (o equivalente, no caso da API, a conferir se senha passada é a mesma cadastrada)
- se sua identidade estiver com um nome diferente, você é mandado embora; se sim, o segurança te dá uma pulseirinha antes de liberar sua passagem (equivalente, no caso da API, a dar o comprovante de login)

Já se perguntou o porquê da pulseirinha? Ela serve para provar que você realmente passou pela portaria (fez o login). Desta forma, se precisar sair da festa, vai conseguir voltar sem precisar passar pelo mesmo procedimento (não é necessário, no caso da API, você enviar e-mail e senha e fazer a conferência em todas as requisições). A pulseirinha é crucial porque o segurança não é obrigado a se lembrar que já fez a conferência antes. Para ele, toda conferência é como se fosse a primeira (o segurança é "stateless")

- ### Requisição

Sem parâmetros de rota ou de consulta

O corpo (body) deverá possuir um objeto com as seguintes propriedades (respeitando estes nomes):

- email: campo **obrigatório** do tipo string
- senha: campo **obrigatório** do tipo string

- ### Resposta

  - Em caso de **sucesso**: retornar o comprovante de login. Esse comprovante é composto por `fraseSecreta + "/" + id_usuario`, em que a frase secreta é uma string exportada dentro do arquivo "src/fraseSecreta.ts". Esse comprovante deve ser passada em todas as requisições que pedirem. O retorno deve ser dentro de uma propriedade "comprovante"
  - Em caso de **erro**:
    - algum campo obrigatório não enviado: status code apropriado e a mensagem "Todos os campos são obrigatórios"
    - caso e e-mail passado não exista no banco de dados: status code apropriado e a mensagem "E-mail ou senha inválidos"
    - caso a senha passada não corresponda à senha cadastrada no banco de dados: status code apropriado e a mensagem "E-mail ou senha inválidos"

#### ⚠️ Importante: quando for criar o comprovante, tente não abrir o arquivo "src/fraseSecreta.ts" e copiar a string exportada. Tente pegar essa string via importação

- ### REQUISITOS OBRIGATÓRIOS

```
- Validar campos obrigatórios
- Verificar se o e-mail passado existe no banco
- Validar se a senha passada corresponde com a senha cadastrada
- Retornar o comprovante dentro de uma propriedade "comprovante"
```

- ### Exemplo de requisição

```json
// POST /login
{
  "nome": "José",
  "email": "jose@email.com"
}
```

- ### Exemplos de respostas

```json
// HTTP Status 200 / 201 / 204

// supondo que o id do usuário seja "c8d28b3f-87fb-469f-9372-24c92dfc3957"
// supondo que a frase secreta seja "cubosAcademy"
{
  "comprovante": "cubosAcademy/c8d28b3f-87fb-469f-9372-24c92dfc3957"
}
```

```json
// HTTP Status 400 / 401 / 403 / 404
{
  "mensagem": "Todos os campos são obrigatórios"
}
```

```json
// HTTP Status 400 / 401 / 403 / 404
{
  "mensagem": "E-mail ou senha inválidos"
}
```

</details>

**TODAS AS ROTAS A PARTIR DESSE PONTO SERÃO PROTEGIDAS. OU SEJA, SERÁ NECESSÁRIO O USUÁRIO ENVIAR O COMPROVANTE DE LOGIN, QUE SERÁ PASSADO COMO PARÂMETRO DE CONSULTA (QUERY)**

<details>
<summary>Parte V</summary>

### Validação do comprovante

#### Intermediário

Sabendo que todos os endpoints à partir deste ponto precisam que a validação do envio do comprovante de login seja feita, e que esse comprovante será passado como parâmetro de consulta (query) em um campo chamado "comprovante", crie um intermediário que:

- Retorne um status apropriado com a mensagem "Falha na autenticação" caso o comprovante não seja passado ou caso o usuário cujo id está presente no comprovante não exista

**Dica: lembre-se de como o comprovante foi obtido. Desta forma, vai perceber que o id do usuário está presente no comprovante após um caracter "/"**

- ### Exemplo de resposta

```json
// HTTP Status 400 / 401 / 403 / 404
{
  "mensagem": "Falha na autenticação"
}
```

### Fazer uma compra

#### `POST` `/compras?comprovante=COMPROVANTE_LOGIN`

Essa rota será responsável pela criação de uma nova compra

- ### Requisição

Sem parâmetros de rota

O corpo (body) deverá possuir um objeto com a seguinte propriedade (respeitando este nome):

- idEvento: campo **obrigatório** do tipo string

O parâmetro de consulta, responsável pelo envio do comprovante de login, deve ser enviado com a seguinte propriedade (respeitando estes nome):

- comprovante: campo **obrigatório** do tipo string

- ### Resposta

  - Em caso de **sucesso**: cadastrar a nova compra e retornar os dados dela, incluindo o id
  - Em caso de **erro**:
    - o campo obrigatório não enviado: status code apropriado e a mensagem "O identificador do evento é obrigatório"
    - caso e id passado não exista no banco de dados: status code apropriado e a mensagem "Evento não encontrado"

- ### REQUISITOS OBRIGATÓRIOS

```
- Validar campos obrigatórios
- Verificar se o id passado existe no banco
```

- ### Exemplo de requisição

```json
// POST /compras?comprovante=COMPROVANTE_LOGIN
{
  "idEvento": "34734b90-6505-414f-88a4-7fda65c6fda2"
}
```

- ### Exemplos de respostas

```json
// HTTP Status 200 / 201 / 204

// supondo que o id do usuário seja "c8d28b3f-87fb-469f-9372-24c92dfc3957"
{
  "id": "6e516af8-9cc9-410c-a40a-08611f62eb1b",
  "id_usuario": "c8d28b3f-87fb-469f-9372-24c92dfc3957",
  "id_evento": "34734b90-6505-414f-88a4-7fda65c6fda2"
}
```

```json
// HTTP Status 400 / 401 / 403 / 404
{
  "mensagem": "O identificador do evento é obrigatório"
}
```

```json
// HTTP Status 400 / 401 / 403 / 404
{
  "mensagem": "Evento não encontrado"
}
```

### Listar compras

#### `GET` `/compras?comprovante=COMPROVANTE_LOGIN`

Essa rota será responsável pela listagem das compras de um usuário

- ### Requisição

Sem parâmetros de rota e sem corpo

O parâmetro de consulta, responsável pelo envio do comprovante de login, deve ser enviado com a seguinte propriedade (respeitando estes nome):

- comprovante: campo **obrigatório** do tipo string

- ### Resposta

  - Em caso de **sucesso**: retornar as compras do usuário logado. Caso o usuário logado consiga ver alguma compra que não esteja relacionada a ele, teremos um erro muito grave de segurança e privacidade

- ### REQUISITOS OBRIGATÓRIOS

```
- O usuário logado só pode ver as compras ligadas a ele
```

- ### Exemplo de requisição

```json
// GET /compras?comprovante=COMPROVANTE_LOGIN
```

- ### Exemplo de resposta

```json
// HTTP Status 200 / 201 / 204

[
  {
    "idCompra": "6e516af8-9cc9-410c-a40a-08611f62eb1b",
    "idEvento": "2a75af28-11ba-4a39-8265-4e9d8323f9c4",
    "nome": "dui",
    "endereco": "975-7891 Enim Avenue",
    "data": "07/06/2024",
    "preco": 20800
  },
  {
    "idCompra": "",
    "idEvento": "2a75af28-11ba-4a39-8265-4e9d8323f9c4",
    "nome": "dui",
    "endereco": "975-7891 Enim Avenue",
    "data": "07/06/2024",
    "preco": 20800
  }
]
```

### Cancelar uma compra

#### `DELETE` `/compras/:id?comprovante=COMPROVANTE_LOGIN`

Essa rota será responsável por cancelar uma compras de um usuário

- ### Requisição

Sem corpo

O parâmetro de rota é responsável por identificar a compra a ser cancelada

O parâmetro de consulta, responsável pelo envio do comprovante de login, deve ser enviado com a seguinte propriedade (respeitando estes nome):

- comprovante: campo **obrigatório** do tipo string

- ### Resposta

  - Em caso de **sucesso**: sem corpo
  - Em caso de **erro**:
    - caso não exista uma compra do usuário logado com o id passado: status code apropriado e a mensagem "Evento não encontrado"

- ### REQUISITOS OBRIGATÓRIOS

```
- Validar se o id da compra passada existe no banco de dados e se pertence ao usuário logado
```

- ### Exemplo de requisição

```json
// DELETE /compras/6e516af8-9cc9-410c-a40a-08611f62eb1b?comprovante=COMPROVANTE_LOGIN
```

- ### Exemplos de respostas

```json
// HTTP Status 200 / 201 / 204
```

```json
// HTTP Status 400 / 401 / 403 / 404
{
  "mensagem": "Evento não encontrado"
}
```

</details>

<details>
<summary>[Optativa] Parte VI</summary>

Os itens pedidos abaixo são optativos

#### ⚠️ Importante: caso opte por fazer os itens abaixo, faça um commit do seu código antes. Assim, caso tenha algum problema, você pode retornar à versão desejada. Além disso, faça aos poucos e teste regularmente o projeto, não tente fazer tudo de uma única fez

### Tente refatorar o código para torná-lo orientado a objetos

Caso ainda não o tenha feito, tente converter seu código para orientação à objetos, criando classes onde julgar necessário

### Tente refatorar o código para que as validações dos controladores estejam dentro de intermediários

Possivelmente você fez várias validações dentro dos controladores, por exemplo, validações referentes ao envio dos campos obrigatórios. Se for esse o caso, tente passá-las para intermediários

### Tente persistir os dados em arquivos

Repare que ao reiniciar sua aplicação os dados cadastrados em tempo de execução são perdidos. Tente persisti-los usando a leitura e escrita de arquivos

#### ⚠️ Importante: conforme descrito no começo deste documento, você não pode alterar o arquivo src/bancoDeDados.ts. Caso deseje iniciar o arquivo onde vai persistir os dados com os dados do arquivo bancoDeDados.ts, faça uma cópia dos valores. Em resumo, NÃO sobrescreva o arquivo src/bancoDeDados.ts

</details>

---

---

**<h3>Nome: <a style="color: #584289;" href="https://www.linkedin.com/in/antonio-dev-/" target="_blank">**Antônio Carlos Bezerra Cavalcante Junior**</a>.**

</h3>
# Api-Eventos
