import React, { useState } from 'react';
import Sidebar from '../components/Sidebar';
import { Search, Plus, Minus, Trash2 } from 'lucide-react';

interface CartItem {
  id: string;
  name: string;
  price: number;
  quantity: number;
}

const mockProducts = [
  { id: '1', name: 'Pizza Margherita', price: 45.90, category: 'Pizzas' },
  { id: '2', name: 'Pizza Calabresa', price: 42.90, category: 'Pizzas' },
  { id: '3', name: 'Refrigerante 2L', price: 12.00, category: 'Bebidas' },
  { id: '4', name: 'Cerveja 600ml', price: 8.90, category: 'Bebidas' },
];

const PDV = () => {
  const [cart, setCart] = useState<CartItem[]>([]);
  const [tableNumber, setTableNumber] = useState('');
  const [searchTerm, setSearchTerm] = useState('');

  const addToCart = (product: typeof mockProducts[0]) => {
    setCart(currentCart => {
      const existingItem = currentCart.find(item => item.id === product.id);
      if (existingItem) {
        return currentCart.map(item =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }
      return [...currentCart, { ...product, quantity: 1 }];
    });
  };

  const updateQuantity = (id: string, change: number) => {
    setCart(currentCart =>
      currentCart.map(item =>
        item.id === id
          ? { ...item, quantity: Math.max(0, item.quantity + change) }
          : item
      ).filter(item => item.quantity > 0)
    );
  };

  const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

  const filteredProducts = mockProducts.filter(product =>
    product.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="flex">
      <Sidebar />
      <main className="ml-64 flex-1 min-h-screen bg-gray-100">
        <div className="flex h-screen">
          {/* Produtos */}
          <div className="w-2/3 p-6">
            <div className="mb-6">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
                <input
                  type="text"
                  placeholder="Buscar produtos..."
                  className="w-full pl-10 pr-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
              {filteredProducts.map(product => (
                <button
                  key={product.id}
                  onClick={() => addToCart(product)}
                  className="bg-white p-4 rounded-lg shadow hover:shadow-md transition-shadow"
                >
                  <h3 className="font-semibold">{product.name}</h3>
                  <p className="text-gray-600">{product.category}</p>
                  <p className="text-lg font-bold text-blue-600">
                    R$ {product.price.toFixed(2)}
                  </p>
                </button>
              ))}
            </div>
          </div>

          {/* Carrinho */}
          <div className="w-1/3 bg-white border-l">
            <div className="p-6 h-full flex flex-col">
              <div className="mb-4">
                <input
                  type="number"
                  placeholder="Número da Mesa"
                  className="w-full p-2 border rounded"
                  value={tableNumber}
                  onChange={(e) => setTableNumber(e.target.value)}
                />
              </div>

              <div className="flex-1 overflow-auto">
                {cart.map(item => (
                  <div key={item.id} className="flex items-center justify-between py-2 border-b">
                    <div className="flex-1">
                      <p className="font-medium">{item.name}</p>
                      <p className="text-gray-600">
                        R$ {item.price.toFixed(2)} x {item.quantity}
                      </p>
                    </div>
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => updateQuantity(item.id, -1)}
                        className="p-1 rounded-full hover:bg-gray-100"
                      >
                        <Minus size={16} />
                      </button>
                      <span className="w-8 text-center">{item.quantity}</span>
                      <button
                        onClick={() => updateQuantity(item.id, 1)}
                        className="p-1 rounded-full hover:bg-gray-100"
                      >
                        <Plus size={16} />
                      </button>
                      <button
                        onClick={() => updateQuantity(item.id, -item.quantity)}
                        className="p-1 rounded-full hover:bg-gray-100 text-red-500"
                      >
                        <Trash2 size={16} />
                      </button>
                    </div>
                  </div>
                ))}
              </div>

              <div className="border-t pt-4 mt-4">
                <div className="flex justify-between mb-4">
                  <span className="text-lg font-semibold">Total:</span>
                  <span className="text-lg font-bold">R$ {total.toFixed(2)}</span>
                </div>
                <button
                  className="w-full bg-blue-600 text-white py-3 rounded-lg font-semibold hover:bg-blue-700"
                  onClick={() => {
                    // Implementar finalização do pedido
                    alert('Pedido finalizado!');
                    setCart([]);
                    setTableNumber('');
                  }}
                >
                  Finalizar Pedido
                </button>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

export default PDV;