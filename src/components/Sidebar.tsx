import React from 'react';
import { 
  LayoutDashboard, 
  ShoppingCart, 
  Package, 
  ClipboardList, 
  Settings,
  LogOut
} from 'lucide-react';

const Sidebar = () => {
  return (
    <div className="h-screen w-64 bg-gray-900 text-white p-4 fixed left-0 top-0">
      <div className="flex items-center gap-2 mb-8">
        <ShoppingCart size={24} className="text-blue-400" />
        <h1 className="text-xl font-bold">RestaurantePRO</h1>
      </div>
      
      <nav className="space-y-2">
        <a href="/" className="flex items-center gap-2 p-3 rounded hover:bg-gray-800 transition-colors">
          <LayoutDashboard size={20} />
          <span>Painel</span>
        </a>
        
        <a href="/pdv" className="flex items-center gap-2 p-3 rounded hover:bg-gray-800 transition-colors">
          <ShoppingCart size={20} />
          <span>PDV</span>
        </a>
        
        <a href="/estoque" className="flex items-center gap-2 p-3 rounded hover:bg-gray-800 transition-colors">
          <Package size={20} />
          <span>Estoque</span>
        </a>
        
        <a href="/pedidos" className="flex items-center gap-2 p-3 rounded hover:bg-gray-800 transition-colors">
          <ClipboardList size={20} />
          <span>Pedidos</span>
        </a>
        
        <a href="/configuracoes" className="flex items-center gap-2 p-3 rounded hover:bg-gray-800 transition-colors">
          <Settings size={20} />
          <span>Configurações</span>
        </a>
      </nav>
      
      <div className="absolute bottom-4 w-full left-0 px-4">
        <button className="flex items-center gap-2 p-3 rounded hover:bg-gray-800 transition-colors w-full text-red-400">
          <LogOut size={20} />
          <span>Sair</span>
        </button>
      </div>
    </div>
  );
};

export default Sidebar;