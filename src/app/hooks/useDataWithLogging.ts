import { useData } from '../contexts/DataContext';
import { useLog } from '../contexts/LogContext';
import { useAuth } from '../contexts/AuthContext';

export function useDataWithLogging() {
  const data = useData();
  const { addLog } = useLog();
  const { user } = useAuth();

  const addProductWithLog = (product: Parameters<typeof data.addProduct>[0]) => {
    data.addProduct(product);

    if (user) {
      addLog({
        action: 'product_added',
        userName: user.name,
        userId: user.id,
        details: {
          itemName: product.name,
          itemId: Date.now().toString(),
          additionalInfo: `Preço: R$ ${product.price}, Estoque: ${product.stock} ${product.unit}`,
        },
      });
    }
  };

  const updateProductWithLog = (id: string, updatedProduct: Parameters<typeof data.updateProduct>[1]) => {
    const product = data.products.find(p => p.id === id);
    data.updateProduct(id, updatedProduct);

    if (user && product && updatedProduct.stock !== undefined && updatedProduct.stock !== product.stock) {
      addLog({
        action: 'stock_updated',
        userName: user.name,
        userId: user.id,
        details: {
          itemName: product.name,
          itemId: id,
          oldValue: product.stock,
          newValue: updatedProduct.stock,
          additionalInfo: `${product.unit}`,
        },
      });
    }
  };

  const deleteProductWithLog = (id: string) => {
    const product = data.products.find(p => p.id === id);
    data.deleteProduct(id);

    if (user && product) {
      addLog({
        action: 'product_removed',
        userName: user.name,
        userId: user.id,
        details: {
          itemName: product.name,
          itemId: id,
        },
      });
    }
  };

  const addEmployeeWithLog = (employee: Parameters<typeof data.addEmployee>[0]) => {
    data.addEmployee(employee);

    if (user) {
      addLog({
        action: 'employee_added',
        userName: user.name,
        userId: user.id,
        details: {
          itemName: employee.name,
          itemId: Date.now().toString(),
          additionalInfo: `Cargo: ${employee.role}, Email: ${employee.email}`,
        },
      });
    }
  };

  const updateEmployeeWithLog = (id: string, updatedEmployee: Parameters<typeof data.updateEmployee>[1]) => {
    const employee = data.employees.find(e => e.id === id);
    data.updateEmployee(id, updatedEmployee);

    if (user && employee && updatedEmployee.active !== undefined && updatedEmployee.active !== employee.active) {
      addLog({
        action: updatedEmployee.active ? 'employee_activated' : 'employee_deactivated',
        userName: user.name,
        userId: user.id,
        details: {
          itemName: employee.name,
          itemId: id,
          additionalInfo: `Cargo: ${employee.role}`,
        },
      });
    }
  };

  return {
    ...data,
    addProductWithLog,
    updateProductWithLog,
    deleteProductWithLog,
    addEmployeeWithLog,
    updateEmployeeWithLog,
  };
}
