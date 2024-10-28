import React, { createContext, useContext, useState, useEffect } from 'react';
import axios from 'axios';
import { Cliente } from '../types/Cliente';

interface ClienteContextType {
  clientes: Cliente[];
  loading: boolean;
  error: string | null;
  addCliente: (cliente: Cliente) => Promise<void>;
  fetchClientes: () => Promise<void>;
  editCliente: (id: number, cliente: Cliente) => Promise<void>;
  deleteCliente: (id: number) => Promise<void>;
}

export const ClienteContext = createContext<ClienteContextType | undefined>(undefined);

export const ClienteProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [clientes, setClientes] = useState<Cliente[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchClientes = async () => {
    setLoading(true);
    try {
      const response = await axios.get('http://localhost:3000/clientes');
      setClientes(response.data);
    } catch (error) {
      setError('Falha ao buscar clientes.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchClientes();
  }, []);

  const addCliente = async (cliente: Cliente) => {
    setLoading(true);
    console.log(cliente)
    try {
      const response = await axios.post('http://localhost:3000/clientes', cliente);
      setClientes((prevClientes) => [...prevClientes, response.data]);
    } catch (err: any) {
      setError(err.response?.data?.error || 'Erro ao adicionar cliente');
    } finally {
      setLoading(false);
    }
  };

  const editCliente = async (id: number, cliente: Cliente) => {
    setLoading(true);
    try {
      await axios.put(`http://localhost:3000/clientes/${id}`, cliente);
      fetchClientes();
    } catch (error) {
      setError('Falha ao editar o cliente.');
    } finally {
      setLoading(false);
    }
  };

  const deleteCliente = async (id: number) => {
    setLoading(true);
    try {
      await axios.delete(`http://localhost:3000/clientes/find/${id}`);
      setClientes(clientes.filter(cliente => cliente.id !== id));
    } catch (error) {
      setError('Falha ao excluir o cliente.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <ClienteContext.Provider value={{ clientes, loading, error, addCliente, fetchClientes, editCliente, deleteCliente }}>
      {children}
    </ClienteContext.Provider>
  );
};

export const useCliente = () => {
  const context = useContext(ClienteContext);
  if (!context) {
    throw new Error('useCliente must be used within a ClienteProvider');
  }
  return context;
};
