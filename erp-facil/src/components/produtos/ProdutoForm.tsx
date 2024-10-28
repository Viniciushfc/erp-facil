import React, { useState } from 'react';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { useProduto } from '../../context/ProdutoContext';

const ProdutoForm: React.FC = () => {
  const [nome, setNome] = useState('');
  const [descricao, setDescricao] = useState('');
  const [preco, setPreco] = useState(0);
  const [quantidade, setQuantidade] = useState(0);
  const [imagem, setImagem] = useState('');
  const [fornecedorId, setFornecedorId] = useState(0);
  const [erro, setErro] = useState('');
  const [erroPreco, setErroPreco] = useState('');
  const [erroQuantidade, setErroQuantidade] = useState('');
  const [erroImagem, setErroImagem] = useState('');

  const { addProduto, validarPreco, validarQuantidade, validarImagemUrl } = useProduto();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErro('');

    if (!validarPreco(preco)) {
      setErroPreco('Preço inválido.');
      return;
    }
    if (!validarQuantidade(quantidade)) {
      setErroQuantidade('Quantidade deve ser um número inteiro e maior que zero.');
      return;
    }
    if (!validarImagemUrl(imagem)) {
      setErroImagem('URL de imagem inválida.');
      return;
    }

    try {
      await addProduto({ nome, descricao, preco, quantidade, imagem, fornecedorId });
      setNome('');
      setDescricao('');
      setPreco(0);
      setQuantidade(0);
      setImagem('');
      setFornecedorId(0);
    } catch (error) {
      setErro('Falha ao criar o produto. Tente novamente.');
    }
  };

  return (

    <form onSubmit={handleSubmit} className="max-w-md mx-auto p-6 bg-white rounded-lg shadow-md space-y-4">
      {erro && <p className="text-red-500 text-sm">{erro}</p>}
      <h2 className="text-2xl font-semibold text-center mb-4">Cadastro de Produto</h2>
      <Input
        type="text"
        placeholder="Nome"
        value={nome}
        onChange={(e) => setNome(e.target.value)}
        required
        className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-blue-500"
      />
      <Input
        type="text"
        placeholder="Descrição"
        value={descricao}
        onChange={(e) => setDescricao(e.target.value)}
        required
        className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-blue-500"
      />
      <Input
        type="text"
        placeholder="Preço"
        value={preco === 0 ? '' : preco.toString()}
        onChange={(e) => {
          const value = e.target.value;
          if (!isNaN(Number(value))) {
            setPreco(Number(value));
            setErroPreco(validarPreco(Number(value)) ? '' : 'Preço inválido.');
          }
        }}
        required
        className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-blue-500"
      />
      {erroPreco && <p className="text-red-500 text-sm">{erroPreco}</p>}
      <Input
        type="number"
        placeholder="Quantidade"
        value={quantidade === 0 ? '' : quantidade.toString()}
        onChange={(e) => {
          const value = Number(e.target.value);
          setQuantidade(value);
          setErroQuantidade(validarQuantidade(value) ? '' : 'Quantidade inválida.');
        }}
        required
        className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-blue-500"
      />
      {erroQuantidade && <p className="text-red-500 text-sm">{erroQuantidade}</p>}
      <Input
        type="text"
        placeholder="URL da Imagem"
        value={imagem}
        onChange={(e) => {
          const value = e.target.value;
          setImagem(value);
          setErroImagem(validarImagemUrl(value) ? '' : 'URL de imagem inválida.');
        }}
        required
        className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-blue-500"
      />
      {erroImagem && <p className="text-red-500 text-sm">{erroImagem}</p>}
      <Input
        type="number"
        placeholder="Codigo de Fornecedor"
        value={fornecedorId === 0 ? '' : fornecedorId.toString()}
        onChange={(e) => setFornecedorId(Number(e.target.value))}
        required
        className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-blue-500"
      />
      <Button
        type="submit"
        className="w-full py-2 rounded-md transition duration-200"
      >
        Criar Produto
      </Button>
    </form>


  );
};

export default ProdutoForm;
