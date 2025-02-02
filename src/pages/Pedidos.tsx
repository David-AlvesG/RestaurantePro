import React, { useState } from 'react';
import Sidebar from '../components/Sidebar';
import { ClipboardList, CheckCircle, XCircle, Clock } from 'lucide-react';

interface Order {
  id: string;
  tableNumber: number;
  status: 'pending' | 'completed' | 'cancelled';
  total: number;
  items: { name: string; quantity: number; price: number }[];
  createdAt: string;
}

const mockOrders: Order[] = [
  {
    id: '1',
    tableNumber: 5,
    status: 'pending',
    total: 120.5,
    items: [
      { name: 'Pizza Margherita', quantity: 2, price: 45.9 },
      { name: 'Refrigerante 2L', quantity: 1, price: 12.0 },
    ],
    createdAt: '2024-03-15 19:30',
  },
  // Outros pedidos...
];

const Pedidos = () => {
  const [orders, setOrders] = useState<Order[]>(mockOrders);

  const getStatusIcon = (status: Order['status']) => {
    switch (status) {
      case 'pending':
        return <Clock className="text-yellow-500" size={20} />;
      case 'completed':
        return <CheckCircle className="text-green-500" size={20} />;
      case 'cancelled':
        return <XCircle className="text-red-500" size={20} />;
      default:
        return null;
    }
  };

  const getStatusText = (status: Order['status']) => {
    switch (status) {
      case 'pending':
        return 'Pendente';
      case 'completed':
        return 'Concluído';
      case 'cancelled':
        return 'Cancelado';
      default:
        return status;
    }
  };

  const handleCompleteOrder = (orderId: string) => {
    setOrders((prevOrders) =>
      prevOrders.map((order) =>
        order.id === orderId ? { ...order, status: 'completed' } : order
      )
    );
  };

  const handleCancelOrder = (orderId: string) => {
    setOrders((prevOrders) =>
      prevOrders.map((order) =>
        order.id === orderId ? { ...order, status: 'cancelled' } : order
      )
    );
  };

  console.log('Pedidos:', orders); // Debugging

  return (
    <div className="flex">
      <Sidebar />
      <main className="ml-64 flex-1 p-8 bg-gray-100 min-h-screen">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold">Pedidos</h1>
        </div>

        <div className="bg-white rounded-lg shadow-sm p-6">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Número do Pedido
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Mesa
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Itens
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Total
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Status
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Criado em
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Ações
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {orders.length > 0 ? (
                  orders.map((order) => (
                    <tr key={order.id}>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm font-medium text-gray-900">#{order.id}</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-500">Mesa {order.tableNumber}</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-500">
                          {order.items.map((item, index) => (
                            <div key={index}>
                              {item.name} (x{item.quantity})
                            </div>
                          ))}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm font-medium text-gray-900">
                          R$ {order.total.toFixed(2)}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center gap-2">
                          {getStatusIcon(order.status)}
                          <span className="text-sm">{getStatusText(order.status)}</span>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-500">{order.createdAt}</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm">
                        {order.status === 'pending' && (
                          <>
                            <button
                              className="text-green-600 hover:text-green-800 mr-3"
                              onClick={() => handleCompleteOrder(order.id)}
                            >
                              Concluir
                            </button>
                            <button
                              className="text-red-600 hover:text-red-800"
                              onClick={() => handleCancelOrder(order.id)}
                            >
                              Cancelar
                            </button>
                          </>
                        )}
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan={7} className="text-center py-4 text-gray-500">
                      Nenhum pedido encontrado.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Pedidos;