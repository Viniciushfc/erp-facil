import React, { createContext, useContext, useState, useEffect } from 'react';
import axios from 'axios';
import { Fornecedor } from '../types/Fornecedor';

interface FornecedorContextType {
    fornecedores: Fornecedor[];
    loading: boolean;
    error: string | null;
    addFornecedor: (fornecedor: Fornecedor) => Promise<void>;
    fetchFornecedores: () => Promise<void>;
    updateFornecedor: (id: string, updatedFornecedor: Fornecedor) => Promise<void>;
    deleteFornecedor: (id: string) => Promise<void>;
    addFornecedorToList: (fornecedor: Fornecedor) => void;
}

const FornecedorContext = createContext<FornecedorContextType | undefined>(undefined);

export const FornecedorProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [fornecedores, setFornecedores] = useState<Fornecedor[]>([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const fetchFornecedores = async () => {
        setLoading(true);
        try {
            const response = await axios.get('http://localhost:3000/fornecedores');
            setFornecedores(response.data);
        } catch (error) {
            setError('Falha ao buscar fornecedores.');
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchFornecedores();
    }, []);

    const addFornecedor = async (fornecedor: Fornecedor) => {
        setLoading(true);
        try {
            const response = await axios.post('http://localhost:3000/fornecedores', fornecedor);
            addFornecedorToList(response.data);
        } catch (err: any) {
            setError(err.response?.data?.error || 'Erro ao adicionar fornecedor');
        } finally {
            setLoading(false);
        }
    };

    const updateFornecedor = async (id: string, updatedFornecedor: Fornecedor) => {
        setLoading(true);
        try {
            const response = await axios.put(`http://localhost:3000/fornecedores/${id}`, updatedFornecedor);
            setFornecedores((prevFornecedores) =>
                prevFornecedores.map((fornecedor) =>
                    fornecedor.id === Number(id) ? response.data : fornecedor
                )
            );
        } catch (err: any) {
            setError(err.response?.data?.error || 'Erro ao atualizar fornecedor');
        } finally {
            setLoading(false);
        }
    };

    const deleteFornecedor = async (id: string) => {
        setLoading(true);
        try {
            await axios.delete(`http://localhost:3000/fornecedores/find/${id}`);
            setFornecedores((prevFornecedores) =>
                prevFornecedores.filter((fornecedor) => fornecedor.id !== Number(id))
            );
        } catch (err: any) {
            setError(err.response?.data?.error || 'Erro ao excluir fornecedor');
        } finally {
            setLoading(false);
        }
    };


    const addFornecedorToList = (fornecedor: Fornecedor) => {
        setFornecedores((prevFornecedores) => [...prevFornecedores, fornecedor]);
    };

    return (
        <FornecedorContext.Provider value={{ fornecedores, loading, error, addFornecedor, fetchFornecedores, updateFornecedor, deleteFornecedor, addFornecedorToList }}>
            {children}
        </FornecedorContext.Provider>
    );
};

export const useFornecedor = () => {
    const context = useContext(FornecedorContext);
    if (!context) {
        throw new Error('useFornecedor must be used within a FornecedorProvider');
    }
    return context;
};