import React, { createContext, useContext, useState, useEffect } from 'react';
import axios from 'axios';
import { Produto } from '../types/Produto';

interface ProdutoContextType {
  produtos: Produto[];
  loading: boolean;
  error: string | null;
  addProduto: (produto: Produto) => Promise<void>;
  fetchProdutos: () => Promise<void>;
  addProdutoToList: (produto: Produto) => void;
  validarPreco: (price: number) => boolean;
  validarQuantidade: (quantity: number) => boolean;
  validarImagemUrl: (imageUrl: string) => boolean;
}

const ProdutoContext = createContext<ProdutoContextType | undefined>(undefined);

export const ProdutoProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [produtos, setProdutos] = useState<Produto[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchProdutos = async () => {
    setLoading(true);
    try {
      const response = await axios.get('http://localhost:3000/produtos');
      setProdutos(response.data);
    } catch (error) {
      setError('Falha ao buscar produtos.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProdutos();
  }, []);

  const addProduto = async (produto: Produto) => {
    setLoading(true);
    try {
      const response = await axios.post('http://localhost:3000/produtos', produto);
      addProdutoToList(response.data);
    } catch (err: any) {
      setError(err.response?.data?.error || 'Erro ao adicionar produto');
    } finally {
      setLoading(false);
    }
  };

  const addProdutoToList = (produto: Produto) => {
    setProdutos((prevProdutos) => [...prevProdutos, produto]);
  };

  const validarPreco = (price: number) => price > 0;
  const validarQuantidade = (quantity: number) => Number.isInteger(quantity) && quantity > 0;
  const validarImagemUrl = (imageUrl: string) => /^(https?:\/\/.*\.(?:png|jpg|jpeg|gif|svg))$/i.test(imageUrl);

  return (
    <ProdutoContext.Provider value={{ produtos, loading, error, addProduto, fetchProdutos, addProdutoToList, validarPreco, validarQuantidade, validarImagemUrl }}>
      {children}
    </ProdutoContext.Provider>
  );
};

export const useProduto = () => {
  const context = useContext(ProdutoContext);
  if (!context) {
    throw new Error('useProduto must be used within a ProdutoProvider');
  }
  return context;
};
