import React, { useEffect, useState } from 'react';
import { getAllProdutos, editProduto, deleteProduto } from '../../api/produtoCRUD';
import { Produto } from '../../types/Produto';
import Modal from '../Modal';
import { Input } from '../ui/input';
import { Button } from '../ui/button';

const ProdutoList: React.FC = () => {
  const [produtos, setProdutos] = useState<Produto[]>([]);
  const [erro, setErro] = useState<string | null>(null);
  const [produtoEditando, setProdutoEditando] = useState<Produto | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [nomeFiltro, setNomeFiltro] = useState('');
  const [fornecedorFiltro, setFornecedorFiltro] = useState('');
  const [ordemPreco, setOrdemPreco] = useState<'asc' | 'desc' | null>(null);

  const fetchProdutos = async () => {
    try {
      const data = await getAllProdutos();
      setProdutos(data);
      
    } catch (error) {
      setErro('Falha ao carregar os produtos. Tente novamente.');
    }
  };

  useEffect(() => {
    fetchProdutos();
  }, []);

  const handleEdit = (produto: Produto) => {
    setProdutoEditando(produto);
    setIsModalOpen(true);
  };

  const handleDelete = async (id?: number) => {
    if (!id) {
      setErro('ID do produto não encontrado.');
      return;
    }
    try {
      await deleteProduto(id);
      setProdutos(produtos.filter(produto => produto.id !== id));
    } catch (error) {
      setErro('Falha ao excluir o produto. Tente novamente.');
    }
  };

  const handleSave = async () => {
    if (!produtoEditando || !produtoEditando.id) {
      setErro('Produto ou ID do produto não encontrado.');
      return;
    }

    if (produtoEditando.preco <= 0 || produtoEditando.quantidade <= 0) {
      setErro('Preço e quantidade devem ser maiores que zero.');
      return;
    }

    setErro(null);
    try {
      await editProduto(produtoEditando.id, produtoEditando);
      fetchProdutos();
      setIsModalOpen(false);
      setProdutoEditando(null);
    } catch (error) {
      setErro('Falha ao editar o produto. Tente novamente.');
    }
  };

  const getFilteredAndSortedProdutos = () => {
    let filtered = produtos;
    if (nomeFiltro) {
      filtered = filtered.filter(produto =>
        produto.nome.toLowerCase().includes(nomeFiltro.toLowerCase())
      );
    }

    if (fornecedorFiltro) {
      filtered = filtered.filter(produto =>
        produto.fornecedorId.toString().includes(fornecedorFiltro)
      );
    }

    if (ordemPreco === 'asc') {
      filtered.sort((a, b) => a.preco - b.preco);
    } else if (ordemPreco === 'desc') {
      filtered.sort((a, b) => b.preco - a.preco);
    }

    return filtered;
  };

  const filteredAndSortedProdutos = getFilteredAndSortedProdutos();

  return (
    <div className="max-w-full mx-auto p-6 bg-white rounded-lg shadow-md">
      <h2 className="text-2xl font-semibold text-center mb-4">Lista de Produtos</h2>
      {erro && <p className="text-red-500 text-sm text-center">{erro}</p>}

      <div className="mb-4 flex flex-col sm:flex-row justify-between items-center">
        <Input
          type="text"
          placeholder="Filtrar por Nome"
          value={nomeFiltro}
          onChange={(e) => setNomeFiltro(e.target.value)}
          className="mb-2 sm:mb-0 sm:mr-2"
        />
        <Input
          type="text"
          placeholder="Filtrar por Fornecedor"
          value={fornecedorFiltro}
          onChange={(e) => setFornecedorFiltro(e.target.value)}
          className="mb-2 sm:mb-0 sm:mr-2"
        />
        <div className="flex">
          <Button
            onClick={() => setOrdemPreco('asc')}
            className={`mr-2 ${ordemPreco === 'asc' ? 'bg-gray-300 font-bold' : ''}`}
          >
            Preço Crescente
          </Button>
          <Button
            onClick={() => setOrdemPreco('desc')}
            className={`${ordemPreco === 'desc' ? 'bg-gray-300 font-bold' : ''}`}
          >
            Preço Decrescente
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredAndSortedProdutos.map((produto) => (
          <div key={produto.id} className="p-4 border border-gray-300 rounded-md">
            <h3 className="text-lg font-semibold">{produto.nome}</h3>
            <p className="text-gray-700">{produto.descricao}</p>
            <p className="text-gray-900">Preço: R$ {produto.preco.toFixed(2)}</p>
            <p className="text-gray-900">Quantidade: {produto.quantidade}</p>
            <p className="text-gray-900">Codigo de Fornecedor: {produto.fornecedorId}</p>
            {produto.imagem && (
              <img src={produto.imagem} alt={produto.nome} className="w-42 h-42 object-contain mt-2 rounded-md border"  />
            )}
            <div className="flex justify-between mt-4">
              <Button onClick={() => handleEdit(produto)} className="text-blue-500">Editar</Button>
              <Button onClick={() => handleDelete(produto.id!)} className="text-red-500">Excluir</Button>
            </div>
          </div>
        ))}
      </div>

      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
        {produtoEditando && (
          <div>
            <h3 className="text-xl font-semibold mb-2">Editar Produto</h3>
            <Input
              type="text"
              value={produtoEditando.nome}
              onChange={(e) => setProdutoEditando({ ...produtoEditando, nome: e.target.value })}
              placeholder="Nome"
              className="w-full p-2 border border-gray-300 rounded mb-2"
            />
            <Input
              type="text"
              value={produtoEditando.descricao}
              onChange={(e) => setProdutoEditando({ ...produtoEditando, descricao: e.target.value })}
              placeholder="Descrição"
              className="w-full p-2 border border-gray-300 rounded mb-2"
            />
            <Input
              type="number"
              value={produtoEditando.preco}
              onChange={(e) => setProdutoEditando({ ...produtoEditando, preco: Number(e.target.valueAsNumber) })}
              placeholder="Preço"
              className="w-full p-2 border border-gray-300 rounded mb-2"
            />
            <Input
              type="number"
              value={produtoEditando.quantidade}
              onChange={(e) => setProdutoEditando({ ...produtoEditando, quantidade: Number(e.target.valueAsNumber) })}
              placeholder="Quantidade"
              className="w-full p-2 border border-gray-300 rounded mb-2"
            />
            <Input
              type="text"
              value={produtoEditando.imagem}
              onChange={(e) => setProdutoEditando({ ...produtoEditando, imagem: e.target.value })}
              placeholder="URL da Imagem"
              className="w-full p-2 border border-gray-300 rounded mb-2"
            />
            <Input
              type="text"
              value={produtoEditando.fornecedorId.toString()}
              onChange={(e) => setProdutoEditando({ ...produtoEditando, fornecedorId: Number(e.target.value) })}
              placeholder="ID do Fornecedor"
              className="w-full p-2 border border-gray-300 rounded mb-2"
            />
            <Button onClick={handleSave} className="text-white p-2 rounded bg-blue-500">
              Salvar
            </Button>
          </div>
        )}
      </Modal>
    </div>
  );
};

export default ProdutoList;
