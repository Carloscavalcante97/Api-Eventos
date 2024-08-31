import TEvento from "../src/tipos/Evento";
import TCompra from "./tipos/Compra";
import TUsuario from "./tipos/Usuario";

type TBancoDeDados = {
  eventos: TEvento[];
  usuarios: TUsuario[];
  compras: TCompra[];
};

const bancoDeDados: TBancoDeDados = {
  eventos: [
    {
      id: "c8d28b3f-87fb-469f-9372-24c92dfc3970",
      nome: "sit amet metus. Aliquam erat",
      endereco: "5797 Dolor Ave",
      data: "09/03/2023",
      preco: 9900,
    },
    {
      id: "e85a4735-51db-4d24-aa7d-67cda7b6dbf9",
      nome: "odio a",
      endereco: "663-1966 Semper Street",
      data: "01/02/2024",
      preco: 33300,
    },
    {
      id: "0730a90f-f8f6-4ddb-af0f-185c0abaae96",
      nome: "ante. Maecenas mi felis, adipiscing fringilla,",
      endereco: "477-6055 Curabitur Rd.",
      data: "06/23/2024",
      preco: 31200,
    },
    {
      id: "79d89c53-7934-4459-a432-839655f4d104",
      nome: "laoreet lectus",
      endereco: "858-226 Ornare St.",
      data: "08/28/2024",
      preco: 4400,
    },
    {
      id: "0150b979-9c12-4f2a-b357-c4f3ee89e10e",
      nome: "ut, nulla. Cras eu tellus eu augue",
      endereco: "4871 Lectus. St.",
      data: "11/21/2023",
      preco: 3800,
    },
    {
      id: "8a8f13a2-0eb9-4bcf-a0db-45edc46163b7",
      nome: "amet risus. Donec egestas.",
      endereco: "479-901 Semper, St.",
      data: "08/22/2023",
      preco: 22300,
    },
    {
      id: "7132a1f2-6a16-4382-a9e7-f9581bb3c996",
      nome: "tincidunt. Donec vitae erat vel pede blandit",
      endereco: "Ap #348-8950 Nostra, Road",
      data: "07/03/2023",
      preco: 14000,
    },
    {
      id: "5e47d5c1-8a71-4d58-8d76-63e3a20ede67",
      nome: "adipiscing, enim mi tempor lorem,",
      endereco: "550-902 Natoque Avenue",
      data: "05/16/2023",
      preco: 7200,
    },
    {
      id: "f6bf5dc4-80f3-47b6-85af-7db9e7e29700",
      nome: "arcu. Sed et libero. Proin mi. Aliquam gravida",
      endereco: "Ap #512-7285 Amet Street",
      data: "08/20/2023",
      preco: 39100,
    },
    {
      id: "7b966195-41a4-4d66-af12-8e5e086af1b2",
      nome: "eget, dictum placerat, augue. Sed molestie. Sed id risus quis",
      endereco: "P.O. Box 739, 5220 Auctor, Av.",
      data: "10/07/2023",
      preco: 399400,
    },
    {
      id: "e1dcca50-7961-46c8-852a-2ef844b01423",
      nome: "pharetra. Quisque ac libero nec ligula consectetuer rhoncus.",
      endereco: "509-6897 Tristique St.",
      data: "09/20/2023",
      preco: 36900,
    },
    {
      id: "b8a34947-5432-4a49-9fca-e36b73165967",
      nome: "Phasellus",
      endereco: "279-8556 Mattis. Rd.",
      data: "04/08/2024",
      preco: 35700,
    },
    {
      id: "faff3612-7138-45cc-9e41-e42e2506d87e",
      nome: "augue ac ipsum. Phasellus",
      endereco: "724-2105 Ad Street",
      data: "05/06/2023",
      preco: 11100,
    },
    {
      id: "ff3ccd80-9ec6-47c6-9534-0997bb3f9df1",
      nome: "augue. Sed molestie. Sed",
      endereco: "P.O. Box 397, 1033 Elementum, St.",
      data: "05/27/2024",
      preco: 18200,
    },
    {
      id: "881a23df-1e72-42f7-8643-dc714cbecb56",
      nome: "tellus id",
      endereco: "3334 Mauris Av.",
      data: "03/25/2024",
      preco: 29600,
    },
    {
      id: "34734b90-6505-414f-88a4-7fda65c6fda2",
      nome: "sagittis felis. Donec tempor, est ac mattis semper, dui",
      endereco: "P.O. Box 138, 8624 Nisl. Road",
      data: "09/14/2023",
      preco: 9200,
    },
    {
      id: "91d654b6-6fe8-41de-955b-09de359b308b",
      nome: "tempor bibendum. Donec felis orci, adipiscing",
      endereco: "545-910 Tincidunt Rd.",
      data: "07/31/2024",
      preco: 31400,
    },
    {
      id: "50e51c97-2bce-4355-8e53-7134ce31e828",
      nome: "Donec",
      endereco: "259-6626 Tristique Rd.",
      data: "06/06/2024",
      preco: 17700,
    },
    {
      id: "22eaab9d-be32-44e2-bc5d-5f71556e9b29",
      nome: "consectetuer",
      endereco: "9351 Molestie. Rd.",
      data: "11/03/2024",
      preco: 9600,
    },
    {
      id: "2a75af28-11ba-4a39-8265-4e9d8323f9c4",
      nome: "dui",
      endereco: "975-7891 Enim Avenue",
      data: "07/06/2024",
      preco: 20800,
    },
  ],
  usuarios: [
    {
      id: "9f220726-9de6-4cbd-977f-c4a9631ed393",
      nome: "Dominique E. Prince",
      email: "eu.dui.cum@google.edu",
      senha: "zz123yy",
    },
    {
      id: "0d72930e-5f88-4ad7-9253-56a7264d9800",
      nome: "Chantale Y. Mathews",
      email: "imperdiet@hotmail.ca",
      senha: "zzLMW51AFD3UCyy",
    },
    {
      id: "493a5847-e05f-452d-8747-ca5b3fe4068f",
      nome: "Acton K. Soto",
      email: "in.tempus.eu@protonmail.edu",
      senha: "zzIGX35PVS6WZyy",
    },
    {
      id: "4fb288d5-9cd7-4b62-b4aa-f18bd767573c",
      nome: "Marcia S. Guerra",
      email: "cum.sociis@aol.com",
      senha: "zzTOG84WYL3LGyy",
    },
    {
      id: "9a75669d-1adc-45c4-8406-3d6b92e219ad",
      nome: "Tana H. Clayton",
      email: "ornare.lectus.ante@outlook.couk",
      senha: "zzTOT24WQR6OSyy",
    },
  ],
  compras: [
    {
      id: "6e516af8-9cc9-410c-a40a-08611f62eb1b",
      id_usuario: "0d72930e-5f88-4ad7-9253-56a7264d9800",
      id_evento: "0150b979-9c12-4f2a-b357-c4f3ee89e10e",
    },
    {
      id: "e27ee29b-aa5d-4c80-84a2-eff485c61292",
      id_usuario: "493a5847-e05f-452d-8747-ca5b3fe4068f",
      id_evento: "c8d28b3f-87fb-469f-9372-24c92dfc3970",
    },
    {
      id: "b05e00c5-55f5-4d4e-b453-531f9afcd252",
      id_usuario: "0d72930e-5f88-4ad7-9253-56a7264d9800",
      id_evento: "0150b979-9c12-4f2a-b357-c4f3ee89e10e",
    },
    {
      id: "87ee4b29-64ba-4543-a5e8-d19f02db2db4",
      id_usuario: "9f220726-9de6-4cbd-977f-c4a9631ed393",
      id_evento: "2a75af28-11ba-4a39-8265-4e9d8323f9c4",
    },
    {
      id: "fffe3aad-598d-4b7f-98ec-263e436e223d",
      id_usuario: "493a5847-e05f-452d-8747-ca5b3fe4068f",
      id_evento: "9a75669d-1adc-45c4-8406-3d6b92e219ad",
    },
  ],
};

export default bancoDeDados;
