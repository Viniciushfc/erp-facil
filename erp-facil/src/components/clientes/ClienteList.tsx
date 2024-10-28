import { useState } from 'react';
import { useCliente } from '../../context/ClienteContext';
import Modal from '../Modal';
import { Cliente } from '../../types/Cliente';
import { Input } from '../ui/input';
import { Button } from '../ui/button';

export default function ClienteList() {
    const { clientes, deleteCliente, editCliente } = useCliente();
    const [search, setSearch] = useState("");
    const [isModalOpen, setModalOpen] = useState(false);
    const [selectedCliente, setSelectedCliente] = useState<Cliente | null>(null);
    const [detailsVisible, setDetailsVisible] = useState<number | null>(null); // Estado para controlar detalhes visíveis

    const filteredClientes = clientes.filter(cliente =>
        cliente.nome?.toLowerCase().includes(search.toLowerCase()) ||
        cliente.cpf_cnpj?.toLowerCase().includes(search.toLowerCase())
    );

    const handleEditClick = (cliente: Cliente) => {
        setSelectedCliente(cliente);
        setModalOpen(true);
    };

    const handleModalClose = () => {
        setModalOpen(false);
        setSelectedCliente(null);
    };

    const handleEditSubmit = async (updatedCliente: Cliente) => {
        if (selectedCliente) {
            await editCliente(Number(selectedCliente.id), updatedCliente);
            handleModalClose();
        }
    };

    const toggleDetails = (id: number) => {
        setDetailsVisible(detailsVisible === id ? null : id); // Alterna a visibilidade
    };

    return (
        <div className="p-4">
            <Input
                type="text"
                placeholder="Buscar cliente..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="border p-2 rounded w-full mb-4"
            />
            <ul>
                {filteredClientes.length > 0 ? (
                    filteredClientes.map(cliente => (
                        <li key={cliente.id} className="flex flex-col p-2 border-b">
                            <div className="flex justify-between items-center">
                                <span>{cliente.nome}</span>
                                <Button
                                    onClick={() => toggleDetails(Number(cliente.id))}
                                    className="text-sm mt-1"
                                >
                                    {detailsVisible === cliente.id ? 'Menos Detalhes' : 'Mais Detalhes'}
                                </Button>
                            </div>
                            {detailsVisible === cliente.id && (
                                <div className="mt-2 p-2 border border-gray-300 rounded bg-gray-100">
                                    <p><strong>Contato:</strong> {cliente.cpf_cnpj}</p>
                                    <p><strong>Contato:</strong> {cliente.contato}</p>
                                    <p><strong>Endereço:</strong> {cliente.endereco}</p>
                                    <div className="mt-2 flex justify-between">
                                        <Button
                                            onClick={() => handleEditClick(cliente)}
                                            className="text-blue-500 hover:text-blue-700"
                                        >
                                            Editar
                                        </Button>
                                        <Button
                                            onClick={() => deleteCliente(Number(cliente.id))}
                                            className="text-red-500 hover:text-red-700"
                                        >
                                            Excluir
                                        </Button>
                                    </div>
                                </div>
                            )}
                        </li>
                    ))
                ) : (
                    <li className="p-2 text-gray-500">Nenhum cliente encontrado.</li>
                )}
            </ul>
            {selectedCliente && (
                <Modal isOpen={isModalOpen} onClose={handleModalClose}>
                    <h2 className="text-lg font-bold mb-4">Editar Cliente</h2>
                    <form
                        onSubmit={(e) => {
                            e.preventDefault();
                            const formData = new FormData(e.target as HTMLFormElement);
                            const updatedCliente: Cliente = {
                                ...selectedCliente,
                                nome: formData.get('nome') as string,
                                cpf_cnpj: formData.get('cpf_cnpj') as string,
                                contato: formData.get('contato') as string,
                                endereco: formData.get('endereco') as string,
                            };
                            handleEditSubmit(updatedCliente);
                        }}
                    >
                        <div className="mb-4">
                            <label className="block mb-1">Nome</label>
                            <Input
                                type="text"
                                name="nome"
                                defaultValue={selectedCliente.nome}
                                className="border p-2 rounded w-full"
                                required
                            />
                        </div>
                        <div className="mb-4">
                            <label className="block mb-1">CPF/CNPJ</label>
                            <Input
                                type="text"
                                name="cpf_cnpj"
                                defaultValue={selectedCliente.cpf_cnpj}
                                className="border p-2 rounded w-full"
                                required
                            />
                        </div>
                        <div className="mb-4">
                            <label className="block mb-1">Contato</label>
                            <Input
                                type="text"
                                name="contato"
                                defaultValue={selectedCliente.contato}
                                className="border p-2 rounded w-full"
                                required
                            />
                        </div>
                        <div className="mb-4">
                            <label className="block mb-1">Endereço</label>
                            <Input
                                type="text"
                                name="endereco"
                                defaultValue={selectedCliente.endereco}
                                className="border p-2 rounded w-full"
                                required
                            />
                        </div>
                        <Button
                            type="submit"
                            className="bg-blue-500 text-white p-2 rounded"
                        >
                            Salvar
                        </Button>
                    </form>
                </Modal>
            )}
        </div>
    );
}
