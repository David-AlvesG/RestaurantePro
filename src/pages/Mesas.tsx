import React, { useState } from 'react';
import Sidebar from '../components/Sidebar';
import { Clock, Users, Utensils } from 'lucide-react';

interface Table {
  id: number;
  status: 'available' | 'occupied' | 'reserved';
  customers?: number;
  startTime?: string;
  orderTotal?: number;
}

const initialTables: Table[] = Array.from({ length: 20 }, (_, i) => ({
  id: i + 1,
  status: Math.random() > 0.6 ? 'available' : Math.random() > 0.5 ? 'occupied' : 'reserved',
  customers: Math.random() > 0.6 ? Math.floor(Math.random() * 6) + 1 : undefined,
  startTime: Math.random() > 0.6 ? '19:30' : undefined,
  orderTotal: Math.random() > 0.6 ? Math.floor(Math.random() * 200) + 50 : undefined,
}));

const Mesas = () => {
  const [tables, setTables] = useState<Table[]>(initialTables);
  const [selectedTable, setSelectedTable] = useState<Table | null>(null);

  const getStatusColor = (status: Table['status']) => {
    switch (status) {
      case 'available':
        return 'bg-green-100 text-green-800';
      case 'occupied':
        return 'bg-red-100 text-red-800';
      case 'reserved':
        return 'bg-yellow-100 text-yellow-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusText = (status: Table['status']) => {
    switch (status) {
      case 'available':
        return 'Disponível';
      case 'occupied':
        return 'Ocupada';
      case 'reserved':
        return 'Reservada';
      default:
        return status;
    }
  };

  return (
    <div className="flex">
      <Sidebar />
      <main className="ml-64 flex-1 p-8 bg-gray-100 min-h-screen">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold">Gestão de Mesas</h1>
          <div className="flex gap-4">
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-green-500"></div>
              <span className="text-sm">Disponível</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-red-500"></div>
              <span className="text-sm">Ocupada</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
              <span className="text-sm">Reservada</span>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
          {tables.map((table) => (
            <button
              key={table.id}
              onClick={() => setSelectedTable(table)}
              className={`bg-white rounded-lg shadow p-4 hover:shadow-md transition-shadow ${
                selectedTable?.id === table.id ? 'ring-2 ring-blue-500' : ''
              }`}
            >
              <div className="flex justify-between items-start mb-2">
                <h3 className="font-semibold">Mesa {table.id}</h3>
                <span className={`px-2 py-1 rounded-full text-xs ${getStatusColor(table.status)}`}>
                  {getStatusText(table.status)}
                </span>
              </div>
              {table.status === 'occupied' && (
                <div className="space-y-2">
                  <div className="flex items-center text-sm text-gray-600">
                    <Users size={16} className="mr-2" />
                    <span>{table.customers} pessoas</span>
                  </div>
                  <div className="flex items-center text-sm text-gray-600">
                    <Clock size={16} className="mr-2" />
                    <span>Desde {table.startTime}</span>
                  </div>
                  {table.orderTotal && (
                    <div className="flex items-center text-sm font-medium text-green-600">
                      <span>R$ {table.orderTotal.toFixed(2)}</span>
                    </div>
                  )}
                </div>
              )}
            </button>
          ))}
        </div>

        {selectedTable && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
            <div className="bg-white rounded-lg p-6 max-w-md w-full">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl font-bold">Mesa {selectedTable.id}</h2>
                <button
                  onClick={() => setSelectedTable(null)}
                  className="text-gray-500 hover:text-gray-700"
                >
                  ✕
                </button>
              </div>

              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <span>Status:</span>
                  <select
                    className="px-3 py-1 border rounded"
                    value={selectedTable.status}
                    onChange={(e) => {
                      const newStatus = e.target.value as Table['status'];
                      setTables(tables.map(t =>
                        t.id === selectedTable.id ? { ...t, status: newStatus } : t
                      ));
                    }}
                  >
                    <option value="available">Disponível</option>
                    <option value="occupied">Ocupada</option>
                    <option value="reserved">Reservada</option>
                  </select>
                </div>

                {selectedTable.status === 'occupied' && (
                  <>
                    <div className="flex justify-between items-center">
                      <span>Número de Pessoas:</span>
                      <input
                        type="number"
                        className="px-3 py-1 border rounded w-20"
                        value={selectedTable.customers}
                        onChange={(e) => {
                          const customers = parseInt(e.target.value);
                          setTables(tables.map(t =>
                            t.id === selectedTable.id ? { ...t, customers } : t
                          ));
                        }}
                      />
                    </div>

                    <div className="flex justify-between items-center">
                      <span>Hora de Início:</span>
                      <input
                        type="time"
                        className="px-3 py-1 border rounded"
                        value={selectedTable.startTime}
                        onChange={(e) => {
                          setTables(tables.map(t =>
                            t.id === selectedTable.id ? { ...t, startTime: e.target.value } : t
                          ));
                        }}
                      />
                    </div>
                  </>
                )}

                <div className="flex gap-2 mt-6">
                  <button
                    onClick={() => setSelectedTable(null)}
                    className="flex-1 px-4 py-2 bg-gray-200 text-gray-800 rounded hover:bg-gray-300"
                  >
                    Cancelar
                  </button>
                  <button
                    onClick={() => {
                      // Implementar ações específicas baseadas no status
                      if (selectedTable.status === 'occupied') {
                        // Abrir PDV para esta mesa
                      } else if (selectedTable.status === 'reserved') {
                        // Gerenciar reserva
                      }
                      setSelectedTable(null);
                    }}
                    className="flex-1 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
                  >
                    {selectedTable.status === 'occupied' ? 'Ver Pedido' : 'Confirmar'}
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}

export default Mesas;