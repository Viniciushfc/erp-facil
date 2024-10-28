import { Fornecedor } from '@/types/Fornecedor'; 
import axios from 'axios';

const API_URL = 'http://localhost:3000/fornecedores'; 

export const createFornecedor = async (
  nome: string,
  cnpj: string,
  contato: string,
  endereco: string
) => {
  try {
    const response = await axios.post(API_URL, {
      nome,
      cnpj,
      contato,
      endereco,
    });
    return response.data;
  } catch (error) {
    console.error('Erro ao criar fornecedor:', error);
    throw error;
  }
};

export const getAllFornecedores = async () => {
  try {
    const response = await axios.get(API_URL);
    return response.data;
  } catch (error) {
    console.error('Erro ao buscar fornecedores:', error);
    throw error;
  }
};

export const editFornecedor = async (id: number, updatedFornecedor: Fornecedor) => {
  try {
    const response = await axios.put(`${API_URL}/${id}`, updatedFornecedor);
    return response.data;
  } catch (error) {
    console.error('Erro ao editar fornecedor:', error);
    throw error;
  }
};

export const deleteFornecedor = async (id: number) => {
  try {
    await axios.delete(`${API_URL}/find/${id}`);
  } catch (error) {
    console.error('Erro ao excluir fornecedor:', error);
    throw error;
  }
};
