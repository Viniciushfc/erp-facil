import React, { useState } from 'react';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { useCliente } from '../../context/ClienteContext';

const ClienteForm: React.FC = () => {
  const [nome, setNome] = useState('');
  const [cpf_cnpj, setCpfCnpj] = useState('');
  const [contato, setContato] = useState('');
  const [endereco, setEndereco] = useState('');
  const [erro, setErro] = useState('');

  const { addCliente } = useCliente();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErro('');

    if (!cpf_cnpj || !nome || !contato) {
      setErro('Todos os campos obrigatórios devem ser preenchidos.');
      return;
    }

    try {
      await addCliente({ nome, cpf_cnpj, contato, endereco, status: 'ativo' });
      setNome('');
      setCpfCnpj('');
      setContato('');
      setEndereco('');
    } catch (error) {
      setErro('Falha ao criar o cliente. Tente novamente.');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="max-w-md mx-auto p-6 bg-white rounded-lg shadow-md space-y-4">
      {erro && <p className="text-red-500 text-sm">{erro}</p>}
      <h2 className="text-2xl font-semibold text-center mb-4">Cadastro de Cliente</h2>
      <Input type="text" placeholder="Nome" value={nome} onChange={(e) => setNome(e.target.value)} required />
      <Input type="text" placeholder="CPF/CNPJ" value={cpf_cnpj} onChange={(e) => setCpfCnpj(e.target.value)} required />
      <Input type="text" placeholder="Contato" value={contato} onChange={(e) => setContato(e.target.value)} required />
      <Input type="text" placeholder="Endereço" value={endereco} onChange={(e) => setEndereco(e.target.value)} />
      <Button type="submit" className="w-full py-2">Criar Cliente</Button>
    </form>
  );
};

export default ClienteForm;
