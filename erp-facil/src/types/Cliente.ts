export interface Cliente {
    id?: number;
    nome: string;
    cpf_cnpj: string;
    contato: string;
    endereco: string;
    status: 'ativo' | 'desativado';
  }