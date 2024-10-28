// src/components/FornecedorForm.tsx
import React, { useState } from 'react';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { useFornecedor } from '../../context/FornecedorContext';
import { Fornecedor } from '../../types/Fornecedor'; 

const FornecedorForm: React.FC = () => {
  const [nome, setNome] = useState('');
  const [cnpj, setCnpj] = useState('');
  const [contato, setContato] = useState('');
  const [endereco, setEndereco] = useState('');
  const { addFornecedor } = useFornecedor();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const novoFornecedor: Fornecedor = { nome, cnpj, contato, endereco };
    await addFornecedor(novoFornecedor);
    setNome('');
    setCnpj('');
    setContato('');
    setEndereco('');
  };

  return (
    <form onSubmit={handleSubmit} className="max-w-md mx-auto p-6 bg-white rounded-lg shadow-md space-y-4">
      <h2 className="text-2xl font-semibold text-center mb-4">Cadastro de Fornecedor</h2>
      <Input type="text" placeholder="Nome" value={nome} onChange={(e) => setNome(e.target.value)} required />
      <Input type="text" placeholder="CNPJ" value={cnpj} onChange={(e) => setCnpj(e.target.value)} required />
      <Input type="text" placeholder="Contato" value={contato} onChange={(e) => setContato(e.target.value)} required />
      <Input type="text" placeholder="Endereço" value={endereco} onChange={(e) => setEndereco(e.target.value)} required />
      <Button type="submit">Cadastrar Fornecedor</Button>
    </form>
  );
};

export default FornecedorForm;
