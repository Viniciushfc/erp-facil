import ClienteList from '../components/clientes/ClienteList';
import ClienteForm from '../components/clientes/ClienteForm';

export default function ClientePage() {
    return (
        <div className="container mx-auto p-6">
            <h1 className="text-4xl font-bold text-center text-gray-800 mb-6">Gerenciamento de Clientes</h1>
            <div className="bg-white shadow-md rounded-lg p-4 mb-8">
                <ClienteForm />
            </div>
            <div className="bg-white shadow-md rounded-lg p-4">
                <ClienteList />
            </div>
        </div>
    );
}
