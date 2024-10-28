import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';
import HomePage from './pages/HomePage';
import ProdutoPage from './pages/ProdutoPage';
import FornecedorPage from './pages/FornecedorPage';
import NavBar from './components/NavBar';
import { ProdutoProvider } from './context/ProdutoContext';
import { FornecedorProvider } from './context/FornecedorContext';
import { ClienteProvider } from './context/ClienteContext';
import ClientePage from './pages/ClientePage';

function App() {
  return (
    <>
    <ClienteProvider>
      <ProdutoProvider>
        <FornecedorProvider>
          <Router>
            <NavBar />
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/produtos" element={<ProdutoPage />} />
              <Route path="/fornecedores" element={<FornecedorPage />} />
              <Route path="/clientes" element={<ClientePage />} />
            </Routes>
          </Router>
        </FornecedorProvider>
      </ProdutoProvider>
      </ClienteProvider>
    </>
  );
}

export default App;
