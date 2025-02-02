import React, { useState } from 'react';
import Sidebar from '../components/Sidebar';
import { BarChart, Calendar, TrendingUp, DollarSign } from 'lucide-react';

const mockSalesData = {
  daily: [
    { date: '10/03', value: 2500 },
    { date: '11/03', value: 3200 },
    { date: '12/03', value: 2800 },
    { date: '13/03', value: 3500 },
    { date: '14/03', value: 4200 },
  ],
  topProducts: [
    { name: 'Pizza Margherita', quantity: 145, revenue: 6525 },
    { name: 'Pizza Calabresa', quantity: 120, revenue: 5400 },
    { name: 'Refrigerante 2L', quantity: 200, revenue: 2400 },
    { name: 'Cerveja 600ml', quantity: 180, revenue: 1620 },
  ],
};

const Relatorios = () => {
  const [dateRange, setDateRange] = useState('week');

  return (
    <div className="flex">
      <Sidebar />
      <main className="ml-64 flex-1 p-8 bg-gray-100 min-h-screen">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold">Relatórios e Análises</h1>
          <select
            className="px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            value={dateRange}
            onChange={(e) => setDateRange(e.target.value)}
          >
            <option value="today">Hoje</option>
            <option value="week">Última Semana</option>
            <option value="month">Último Mês</option>
            <option value="year">Último Ano</option>
          </select>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-gray-500">Vendas Totais</h3>
              <DollarSign className="text-green-500" size={24} />
            </div>
            <p className="text-2xl font-bold">R$ 16.200,00</p>
            <p className="text-sm text-green-500">+12% em relação ao período anterior</p>
          </div>

          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-gray-500">Pedidos</h3>
              <BarChart className="text-blue-500" size={24} />
            </div>
            <p className="text-2xl font-bold">384</p>
            <p className="text-sm text-blue-500">+8% em relação ao período anterior</p>
          </div>

          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-gray-500">Ticket Médio</h3>
              <TrendingUp className="text-purple-500" size={24} />
            </div>
            <p className="text-2xl font-bold">R$ 42,19</p>
            <p className="text-sm text-purple-500">+3% em relação ao período anterior</p>
          </div>

          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-gray-500">Taxa de Ocupação</h3>
              <Calendar className="text-orange-500" size={24} />
            </div>
            <p className="text-2xl font-bold">75%</p>
            <p className="text-sm text-orange-500">+5% em relação ao período anterior</p>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="bg-white rounded-lg shadow p-6">
            <h2 className="text-lg font-semibold mb-4">Vendas Diárias</h2>
            <div className="h-64 flex items-end justify-between">
              {mockSalesData.daily.map((day, index) => (
                <div key={index} className="flex flex-col items-center">
                  <div
                    className="w-12 bg-blue-500 rounded-t"
                    style={{ height: `${(day.value / 5000) * 100}%` }}
                  ></div>
                  <p className="text-sm mt-2">{day.date}</p>
                  <p className="text-xs text-gray-500">R$ {day.value}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-white rounded-lg shadow p-6">
            <h2 className="text-lg font-semibold mb-4">Produtos Mais Vendidos</h2>
            <div className="space-y-4">
              {mockSalesData.topProducts.map((product, index) => (
                <div key={index} className="flex items-center justify-between">
                  <div>
                    <p className="font-medium">{product.name}</p>
                    <p className="text-sm text-gray-500">{product.quantity} unidades</p>
                  </div>
                  <p className="font-semibold">R$ {product.revenue.toFixed(2)}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

export default Relatorios;