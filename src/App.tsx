import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import PDV from './pages/PDV';
import Estoque from './pages/Estoque';
import Relatorios from './pages/Relatorios';
import Mesas from './pages/Mesas';
import Pedidos from './pages/Pedidos';
import Sidebar from './components/Sidebar';
import { TrendingUp, Users, ShoppingBag, AlertTriangle, Clock } from 'lucide-react';

interface RecentOrder {
  id: string;
  table: number;
  items: string[];
  total: number;
  status: 'pending' | 'preparing' | 'ready';
  time: string;
}

const recentOrders: RecentOrder[] = [
  {
    id: '1',
    table: 5,
    items: ['1x Pizza Margherita', '2x Refrigerante'],
    total: 89.90,
    status: 'preparing',
    time: '5 min atrás'
  },
  {
    id: '2',
    table: 3,
    items: ['1x Pizza Calabresa', '1x Cerveja'],
    total: 62.90,
    status: 'ready',
    time: '12 min atrás'
  },
  {
    id: '3',
    table: 8,
    items: ['2x Pizza Frango', '3x Refrigerante'],
    total: 127.80,
    status: 'pending',
    time: '2 min atrás'
  }
];

const lowStockItems = [
  { name: 'Mussarela', current: 2, min: 5, unit: 'kg' },
  { name: 'Molho de Tomate', current: 3, min: 10, unit: 'L' },
];

function Dashboard() {
  return (
    <div className="flex min-h-screen bg-gray-100">
      <Sidebar />
      <main className="flex-1 p-8 ml-64">
        <div className="mb-8">
          <h1 className="text-2xl font-bold mb-2">Bem-vindo ao RestaurantePRO</h1>
          <p className="text-gray-600">Visão geral do seu restaurante</p>
        </div>

        {/* KPI Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-gray-500">Vendas Hoje</h3>
              <TrendingUp className="text-green-500" size={24} />
            </div>
            <p className="text-2xl font-bold">R$ 3.590,00</p>
            <p className="text-sm text-green-500">+12% em relação a ontem</p>
          </div>

          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-gray-500">Clientes Hoje</h3>
              <Users className="text-blue-500" size={24} />
            </div>
            <p className="text-2xl font-bold">45</p>
            <p className="text-sm text-blue-500">+8% em relação a ontem</p>
          </div>

          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-gray-500">Pedidos Pendentes</h3>
              <ShoppingBag className="text-orange-500" size={24} />
            </div>
            <p className="text-2xl font-bold">7</p>
            <p className="text-sm text-gray-500">Tempo médio: 18 min</p>
          </div>

          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-gray-500">Mesas Ocupadas</h3>
              <Users className="text-purple-500" size={24} />
            </div>
            <p className="text-2xl font-bold">8/20</p>
            <p className="text-sm text-purple-500">40% de ocupação</p>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Recent Orders */}
          <div className="bg-white rounded-lg shadow">
            <div className="p-6 border-b">
              <h2 className="text-lg font-semibold">Pedidos Recentes</h2>
            </div>
            <div className="p-6">
              <div className="space-y-4">
                {recentOrders.map((order) => (
                  <div key={order.id} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                    <div>
                      <p className="font-medium">Mesa {order.table}</p>
                      <div className="text-sm text-gray-500">
                        {order.items.map((item, index) => (
                          <p key={index}>{item}</p>
                        ))}
                      </div>
                      <div className="flex items-center gap-2 mt-2">
                        <Clock size={14} />
                        <span className="text-sm text-gray-500">{order.time}</span>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="font-medium">R$ {order.total.toFixed(2)}</p>
                      <span className={`inline-block px-2 py-1 rounded-full text-xs mt-2 ${
                        order.status === 'ready' ? 'bg-green-100 text-green-800' :
                        order.status === 'preparing' ? 'bg-yellow-100 text-yellow-800' :
                        'bg-blue-100 text-blue-800'
                      }`}>
                        {order.status === 'ready' ? 'Pronto' :
                         order.status === 'preparing' ? 'Preparando' :
                         'Pendente'}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
              <Link to="/pdv" className="block text-center text-blue-600 hover:text-blue-800 mt-4">
                Ver todos os pedidos
              </Link>
            </div>
          </div>

          {/* Quick Actions and Alerts */}
          <div className="space-y-6">
            {/* Quick Actions */}
            <div className="bg-white rounded-lg shadow p-6">
              <h2 className="text-lg font-semibold mb-4">Ações Rápidas</h2>
              <div className="grid grid-cols-2 gap-4">
                <Link to="/pdv" className="flex items-center justify-center gap-2 p-4 bg-blue-50 rounded-lg hover:bg-blue-100 transition-colors">
                  <ShoppingBag size={20} className="text-blue-600" />
                  <span className="font-medium text-blue-600">Novo Pedido</span>
                </Link>
                <Link to="/mesas" className="flex items-center justify-center gap-2 p-4 bg-purple-50 rounded-lg hover:bg-purple-100 transition-colors">
                  <Users size={20} className="text-purple-600" />
                  <span className="font-medium text-purple-600">Gerenciar Mesas</span>
                </Link>
              </div>
            </div>

            {/* Low Stock Alerts */}
            <div className="bg-white rounded-lg shadow p-6">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-lg font-semibold">Alertas de Estoque</h2>
                <AlertTriangle className="text-yellow-500" size={20} />
              </div>
              <div className="space-y-4">
                {lowStockItems.map((item, index) => (
                  <div key={index} className="flex items-center justify-between p-4 bg-red-50 rounded-lg">
                    <div>
                      <p className="font-medium text-red-700">{item.name}</p>
                      <p className="text-sm text-red-600">
                        Estoque: {item.current} {item.unit} (Mín: {item.min} {item.unit})
                      </p>
                    </div>
                    <Link to="/estoque" className="text-red-600 hover:text-red-800 text-sm font-medium">
                      Repor estoque
                    </Link>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/pdv" element={<PDV />} />
        <Route path="/estoque" element={<Estoque />} />
        <Route path="/relatorios" element={<Relatorios />} />
        <Route path="/mesas" element={<Mesas />} />
        <Route path="/pedidos" element={<Pedidos />} />
        {/* Rota de fallback para páginas não encontradas */}
        <Route path="*" element={<div>Página não encontrada</div>} />
      </Routes>
    </Router>
  );
}

export default App;