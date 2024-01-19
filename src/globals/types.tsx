
type diciplinas =  {
  name: string;
  descricao: string;
  image: string;
  preço: string;
  uuid: string;
}

type UserProps = {

createdAt:Date;
email:string;
endereco: string;
nome: string;
password:string;
telefone:number;
}



type aulasProps = {
  disciplinaid: string;
  licao: string;
  moduloId: string;
  tema: string;
  youtubeid: string;
}

type pagamentoProps = {
  estado: string;
expiraEm: Date;
modulo:string;
pagoEm: Date;
userId: string;
}

type FileProps = {
  size: string;
  name: string;
  uri: string;
  mimeType: string;
}

export  {FileProps, pagamentoProps, aulasProps, UserProps, diciplinas }