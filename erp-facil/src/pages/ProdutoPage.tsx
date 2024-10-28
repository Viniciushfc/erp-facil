import ProdutoList from '@/components/produtos/ProdutoList';
import ProdutoForm from '../components/produtos/ProdutoForm';


export default function ProdutoPage() {
    return (
        <div className="container mx-auto p-6">
            <h1 className="text-4xl font-bold text-center text-gray-800 mb-6">Gerenciamento de Produtos</h1>
            <div className="bg-white shadow-md rounded-lg p-4 mb-8">
                <ProdutoForm />
            </div>
            <div className="bg-white shadow-md rounded-lg p-4">
                <ProdutoList />
            </div>
        </div>
    );
};
