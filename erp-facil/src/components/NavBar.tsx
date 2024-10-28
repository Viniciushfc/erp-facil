import { Link } from 'react-router-dom';

const NavBar = () => {
  return (
    <nav className="flex justify-between items-center p-4 bg-slate-900 text-slate-100 shadow-md">
      <div className="text-2xl font-semibold tracking-wide">
        <Link to="/" className="hover:text-slate-300 transition duration-300">ERP Fácil</Link>
      </div>
      <ul className="flex gap-8 list-none">
        <li className="text-lg">
          <Link to="/" className="hover:text-slate-300 transition duration-300">Home</Link>
        </li>
        <li className="text-lg">
          <Link to="/produtos" className="hover:text-slate-300 transition duration-300">Produtos</Link>
        </li>
        <li className="text-lg">
          <Link to="/fornecedores" className="hover:text-slate-300 transition duration-300">Fornecedor</Link>
        </li>
        <li className="text-lg">
          <Link to="/clientes" className="hover:text-slate-300 transition duration-300">Clientes</Link>
        </li>
      </ul>
    </nav>
  );
};

export default NavBar;
