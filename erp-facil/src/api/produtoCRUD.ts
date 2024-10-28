import { Produto } from '@/types/Produto';
import axios from 'axios';


const API_URL = 'http://localhost:3000/produtos';

export const createProduto = async (
  nome: string,
  descricao: string,
  preco: number,
  quantidade: number,
  imagem: string,
  fornecedorId: number
) => {
  try {
    const response = await axios.post(API_URL, {
      nome,
      descricao,
      preco,
      quantidade,
      imagem,
      fornecedorId,
    });
    return response.data;
  } catch (error) {
    console.error('Erro ao criar produto:', error);
    throw error;
  }
};

export const getAllProdutos = async () => {
  const response = await axios.get(API_URL);
  return response.data;
};

export const editProduto = async (id: number, updatedProduto: Produto) => {
  const response = await axios.put(API_URL + `/${id}`, updatedProduto);
  return response.data;
};

export const deleteProduto = async (id: number) => {
  await axios.delete(API_URL + `/find/${id}`);
};