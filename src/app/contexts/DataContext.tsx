import { createContext, useContext, useState, ReactNode, useEffect } from 'react';
import { storage } from '../lib/storage';

interface Product {
  id: string;
  name: string;
  price: number;
  stock: number;
  unit: string;
  commission: number;
  minStock: number;
}

interface Sale {
  id: string;
  productId: string;
  productName: string;
  quantity: number;
  total: number;
  commission: number;
  employeeId: string;
  employeeName: string;
  date: Date;
}

interface Employee {
  id: string;
  name: string;
  email: string;
  password: string;
  role: string;
  active: boolean;
  totalSales: number;
  totalCommission: number;
}

interface DataContextType {
  products: Product[];
  sales: Sale[];
  employees: Employee[];
  addProduct: (product: Omit<Product, 'id'>) => void;
  updateProduct: (id: string, product: Partial<Product>) => void;
  deleteProduct: (id: string) => void;
  addEmployee: (employee: Omit<Employee, 'id' | 'totalSales' | 'totalCommission'>) => void;
  updateEmployee: (id: string, employee: Partial<Employee>) => void;
  addSale: (sale: Omit<Sale, 'id' | 'date'>) => void;
  getSalesByEmployee: (employeeId: string) => Sale[];
  getEmployeeCommission: (employeeId: string) => number;
}

export type { Employee };

const DataContext = createContext<DataContextType | undefined>(undefined);

const initialProducts: Product[] = [
  { id: '1', name: 'Gasolina Comum', price: 5.89, stock: 15000, unit: 'Litros', commission: 0.05, minStock: 5000 },
  { id: '2', name: 'Gasolina Aditivada', price: 6.29, stock: 8000, unit: 'Litros', commission: 0.07, minStock: 3000 },
  { id: '3', name: 'Etanol', price: 4.19, stock: 10000, unit: 'Litros', commission: 0.04, minStock: 4000 },
  { id: '4', name: 'Diesel S10', price: 5.99, stock: 12000, unit: 'Litros', commission: 0.06, minStock: 5000 },
  { id: '5', name: 'Óleo Lubrificante', price: 45.90, stock: 150, unit: 'Unidades', commission: 2.50, minStock: 50 },
];

const initialEmployees: Employee[] = [
  { id: '1', name: 'João Silva', email: 'joao@posto.com', password: 'joao123', role: 'Frentista', active: true, totalSales: 0, totalCommission: 0 },
  { id: '2', name: 'Maria Santos', email: 'maria@posto.com', password: 'maria123', role: 'Frentista', active: true, totalSales: 0, totalCommission: 0 },
  { id: '3', name: 'Pedro Costa', email: 'pedro@posto.com', password: 'pedro123', role: 'Frentista', active: true, totalSales: 0, totalCommission: 0 },
  { id: '4', name: 'Ana Paula', email: 'ana@posto.com', password: 'ana123', role: 'Gerente', active: true, totalSales: 0, totalCommission: 0 },
];

interface DataProviderProps {
  children: ReactNode;
  userId?: string;
}

export function DataProvider({ children, userId = 'default' }: DataProviderProps) {
  const [products, setProducts] = useState<Product[]>(() => {
    if (!userId) return initialProducts;
    const saved = storage.loadProducts(userId);
    return saved || initialProducts;
  });

  const [sales, setSales] = useState<Sale[]>(() => {
    if (!userId) return [];
    const saved = storage.loadSales(userId);
    return saved || [];
  });

  const [employees, setEmployees] = useState<Employee[]>(() => {
    if (!userId) return initialEmployees;
    const saved = storage.loadEmployees(userId);
    return saved || initialEmployees;
  });

  // Recarregar dados quando o userId mudar
  useEffect(() => {
    if (!userId) return;

    const savedProducts = storage.loadProducts(userId);
    const savedSales = storage.loadSales(userId);
    const savedEmployees = storage.loadEmployees(userId);

    setProducts(savedProducts || initialProducts);
    setSales(savedSales || []);
    setEmployees(savedEmployees || initialEmployees);
  }, [userId]);

  useEffect(() => {
    if (!userId) return;
    storage.saveProducts(products, userId);
  }, [products, userId]);

  useEffect(() => {
    if (!userId) return;
    storage.saveSales(sales, userId);
  }, [sales, userId]);

  useEffect(() => {
    if (!userId) return;
    storage.saveEmployees(employees, userId);
  }, [employees, userId]);

  const addProduct = (product: Omit<Product, 'id'>) => {
    const newProduct = {
      ...product,
      id: Date.now().toString(),
    };
    setProducts([...products, newProduct]);
  };

  const updateProduct = (id: string, updatedProduct: Partial<Product>) => {
    setProducts(products.map(p => p.id === id ? { ...p, ...updatedProduct } : p));
  };

  const deleteProduct = (id: string) => {
    setProducts(products.filter(p => p.id !== id));
  };

  const addEmployee = (employee: Omit<Employee, 'id' | 'totalSales' | 'totalCommission'>) => {
    const newEmployee = {
      ...employee,
      id: Date.now().toString(),
      totalSales: 0,
      totalCommission: 0,
    };
    setEmployees([...employees, newEmployee]);
  };

  const updateEmployee = (id: string, updatedEmployee: Partial<Employee>) => {
    setEmployees(employees.map(e => e.id === id ? { ...e, ...updatedEmployee } : e));
  };

  const addSale = (sale: Omit<Sale, 'id' | 'date'>) => {
    const newSale = {
      ...sale,
      id: Date.now().toString(),
      date: new Date(),
    };
    setSales([...sales, newSale]);

    setProducts(products.map(p =>
      p.id === sale.productId
        ? { ...p, stock: p.stock - sale.quantity }
        : p
    ));

    setEmployees(employees.map(e =>
      e.id === sale.employeeId
        ? {
            ...e,
            totalSales: e.totalSales + sale.total,
            totalCommission: e.totalCommission + sale.commission
          }
        : e
    ));
  };

  const getSalesByEmployee = (employeeId: string) => {
    return sales.filter(s => s.employeeId === employeeId);
  };

  const getEmployeeCommission = (employeeId: string) => {
    return sales
      .filter(s => s.employeeId === employeeId)
      .reduce((total, sale) => total + sale.commission, 0);
  };

  return (
    <DataContext.Provider value={{
      products,
      sales,
      employees,
      addProduct,
      updateProduct,
      deleteProduct,
      addEmployee,
      updateEmployee,
      addSale,
      getSalesByEmployee,
      getEmployeeCommission,
    }}>
      {children}
    </DataContext.Provider>
  );
}

export function useData() {
  const context = useContext(DataContext);
  if (context === undefined) {
    throw new Error('useData must be used within a DataProvider');
  }
  return context;
}
