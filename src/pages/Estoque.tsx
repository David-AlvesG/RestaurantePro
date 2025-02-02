import React, { useState } from 'react';
import Sidebar from '../components/Sidebar';
import { Plus, Search, AlertTriangle } from 'lucide-react';

interface Product {
  id: string;
  name: string;
  stock: number;
  minStock: number;
  unit: string;
  category: string;
  lastUpdated: string;
}

const mockProducts: Product[] = [
  {
    id: '1',
    name: 'Mussarela',
    stock: 15,
    minStock: 20,
    unit: 'kg',
    category: 'Queijos',
    lastUpdated: '2024-03-10'
  },
  {
    id: '2',
    name: 'Molho de Tomate',
    stock: 8,
    minStock: 10,
    unit: 'L',
    category: 'Molhos',
    lastUpdated: '2024-03-09'
  },
  {
    id: '3',
    name: 'Refrigerante Cola',
    stock: 45,
    minStock: 30,
    unit: 'un',
    category: 'Bebidas',
    lastUpdated: '2024-03-11'
  }
];

const Estoque = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [newProduct, setNewProduct] = useState<Partial<Product>>({});
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);

  const categories = ['all', ...new Set(mockProducts.map(p => p.category))];

  const filteredProducts = mockProducts
    .filter(product => 
      product.name.toLowerCase().includes(searchTerm.toLowerCase()) &&
      (selectedCategory === 'all' || product.category === selectedCategory)
    );

  const handleAddProduct = () => {
    if (newProduct.name && newProduct.stock && newProduct.minStock && newProduct.unit && newProduct.category) {
      const product: Product = {
        id: String(mockProducts.length + 1),
        name: newProduct.name,
        stock: newProduct.stock,
        minStock: newProduct.minStock,
        unit: newProduct.unit,
        category: newProduct.category,
        lastUpdated: new Date().toISOString().split('T')[0],
      };
      mockProducts.push(product);
      setIsAddModalOpen(false);
      setNewProduct({});
    }
  };

  const handleEditProduct = (product: Product) => {
    setEditingProduct(product);
  };

  const handleSaveEdit = () => {
    if (editingProduct) {
      const index = mockProducts.findIndex(p => p.id === editingProduct.id);
      if (index !== -1) {
        mockProducts[index] = editingProduct;
        setEditingProduct(null);
      }
    }
  };

  const handleDeleteProduct = (id: string) => {
    const index = mockProducts.findIndex(p => p.id === id);
    if (index !== -1) {
      mockProducts.splice(index, 1);
    }
  };

  return (
    <div className="flex">
      <Sidebar />
      <main className="ml-64 flex-1 p-8 bg-gray-100 min-h-screen">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold">Controle de Estoque</h1>
          <button
            className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700"
            onClick={() => setIsAddModalOpen(true)}
          >
            <Plus size={20} />
            Novo Produto
          </button>
        </div>

        {/* Modal de Adição de Produto */}
        {isAddModalOpen && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
            <div className="bg-white rounded-lg p-6 max-w-md w-full">
              <h2 className="text-xl font-bold mb-4">Adicionar Produto</h2>
              <div className="space-y-4">
                <input
                  type="text"
                  placeholder="Nome do Produto"
                  className="w-full p-2 border rounded"
                  value={newProduct.name || ''}
                  onChange={(e) => setNewProduct({ ...newProduct, name: e.target.value })}
                />
                <input
                  type="number"
                  placeholder="Estoque Atual"
                  className="w-full p-2 border rounded"
                  value={newProduct.stock || ''}
                  onChange={(e) => setNewProduct({ ...newProduct, stock: parseInt(e.target.value) })}
                />
                <input
                  type="number"
                  placeholder="Estoque Mínimo"
                  className="w-full p-2 border rounded"
                  value={newProduct.minStock || ''}
                  onChange={(e) => setNewProduct({ ...newProduct, minStock: parseInt(e.target.value) })}
                />
                <input
                  type="text"
                  placeholder="Unidade"
                  className="w-full p-2 border rounded"
                  value={newProduct.unit || ''}
                  onChange={(e) => setNewProduct({ ...newProduct, unit: e.target.value })}
                />
                <input
                  type="text"
                  placeholder="Categoria"
                  className="w-full p-2 border rounded"
                  value={newProduct.category || ''}
                  onChange={(e) => setNewProduct({ ...newProduct, category: e.target.value })}
                />
                <div className="flex gap-2">
                  <button
                    className="flex-1 px-4 py-2 bg-gray-200 text-gray-800 rounded hover:bg-gray-300"
                    onClick={() => setIsAddModalOpen(false)}
                  >
                    Cancelar
                  </button>
                  <button
                    className="flex-1 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
                    onClick={handleAddProduct}
                  >
                    Adicionar
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Modal de Edição de Produto */}
        {editingProduct && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
            <div className="bg-white rounded-lg p-6 max-w-md w-full">
              <h2 className="text-xl font-bold mb-4">Editar Produto</h2>
              <div className="space-y-4">
                <input
                  type="text"
                  placeholder="Nome do Produto"
                  className="w-full p-2 border rounded"
                  value={editingProduct.name}
                  onChange={(e) => setEditingProduct({ ...editingProduct, name: e.target.value })}
                />
                <input
                  type="number"
                  placeholder="Estoque Atual"
                  className="w-full p-2 border rounded"
                  value={editingProduct.stock}
                  onChange={(e) => setEditingProduct({ ...editingProduct, stock: parseInt(e.target.value) })}
                />
                <input
                  type="number"
                  placeholder="Estoque Mínimo"
                  className="w-full p-2 border rounded"
                  value={editingProduct.minStock}
                  onChange={(e) => setEditingProduct({ ...editingProduct, minStock: parseInt(e.target.value) })}
                />
                <input
                  type="text"
                  placeholder="Unidade"
                  className="w-full p-2 border rounded"
                  value={editingProduct.unit}
                  onChange={(e) => setEditingProduct({ ...editingProduct, unit: e.target.value })}
                />
                <input
                  type="text"
                  placeholder="Categoria"
                  className="w-full p-2 border rounded"
                  value={editingProduct.category}
                  onChange={(e) => setEditingProduct({ ...editingProduct, category: e.target.value })}
                />
                <div className="flex gap-2">
                  <button
                    className="flex-1 px-4 py-2 bg-gray-200 text-gray-800 rounded hover:bg-gray-300"
                    onClick={() => setEditingProduct(null)}
                  >
                    Cancelar
                  </button>
                  <button
                    className="flex-1 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
                    onClick={handleSaveEdit}
                  >
                    Salvar
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        <div className="bg-white rounded-lg shadow-sm p-6">
          <div className="flex gap-4 mb-6">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
              <input
                type="text"
                placeholder="Buscar produtos..."
                className="w-full pl-10 pr-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <select
              className="px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
            >
              {categories.map(category => (
                <option key={category} value={category}>
                  {category === 'all' ? 'Todas Categorias' : category}
                </option>
              ))}
            </select>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Produto
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Categoria
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Estoque Atual
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Estoque Mínimo
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Última Atualização
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Ações
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {filteredProducts.map((product) => (
                  <tr key={product.id}>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm font-medium text-gray-900">{product.name}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-500">{product.category}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className={`text-sm font-medium ${
                        product.stock < product.minStock ? 'text-red-600' : 'text-green-600'
                      }`}>
                        {product.stock} {product.unit}
                        {product.stock < product.minStock && (
                          <AlertTriangle size={16} className="inline ml-2 text-red-600" />
                        )}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-500">{product.minStock} {product.unit}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-500">{product.lastUpdated}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm">
                      <button
                        className="text-blue-600 hover:text-blue-800 mr-3"
                        onClick={() => handleEditProduct(product)}
                      >
                        Editar
                      </button>
                      <button
                        className="text-red-600 hover:text-red-800"
                        onClick={() => handleDeleteProduct(product.id)}
                      >
                        Excluir
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </main>
    </div>
  );
}

export default Estoque;