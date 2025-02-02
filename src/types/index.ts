export interface Product {
  id: string;
  name: string;
  price: number;
  category: string;
  stock: number;
  unit: string;
  description?: string;
}

export interface Order {
  id: string;
  items: OrderItem[];
  total: number;
  status: 'pending' | 'preparing' | 'ready' | 'delivered';
  createdAt: Date;
  table?: number;
  isDelivery: boolean;
}

export interface OrderItem {
  productId: string;
  quantity: number;
  price: number;
  notes?: string;
}

export interface StockMovement {
  id: string;
  productId: string;
  quantity: number;
  type: 'in' | 'out';
  reason: string;
  date: Date;
}