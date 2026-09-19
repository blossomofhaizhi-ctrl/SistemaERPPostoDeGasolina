// Sistema de armazenamento local por usuário
const getStorageKey = (userId: string, type: string) => `charlotte_user_${userId}_${type}`;

export const storage = {
  // Produtos
  saveProducts: (products: any[], userId: string) => {
    try {
      localStorage.setItem(getStorageKey(userId, 'products'), JSON.stringify(products));
    } catch (error) {
      console.error('Erro ao salvar produtos:', error);
    }
  },

  loadProducts: (userId: string) => {
    try {
      const data = localStorage.getItem(getStorageKey(userId, 'products'));
      return data ? JSON.parse(data) : null;
    } catch (error) {
      console.error('Erro ao carregar produtos:', error);
      return null;
    }
  },

  // Vendas
  saveSales: (sales: any[], userId: string) => {
    try {
      localStorage.setItem(getStorageKey(userId, 'sales'), JSON.stringify(sales));
    } catch (error) {
      console.error('Erro ao salvar vendas:', error);
    }
  },

  loadSales: (userId: string) => {
    try {
      const data = localStorage.getItem(getStorageKey(userId, 'sales'));
      if (!data) return null;

      const sales = JSON.parse(data);
      // Converter strings de data de volta para objetos Date
      return sales.map((sale: any) => ({
        ...sale,
        date: new Date(sale.date),
      }));
    } catch (error) {
      console.error('Erro ao carregar vendas:', error);
      return null;
    }
  },

  // Funcionários
  saveEmployees: (employees: any[], userId: string) => {
    try {
      localStorage.setItem(getStorageKey(userId, 'employees'), JSON.stringify(employees));
    } catch (error) {
      console.error('Erro ao salvar funcionários:', error);
    }
  },

  loadEmployees: (userId: string) => {
    try {
      const data = localStorage.getItem(getStorageKey(userId, 'employees'));
      return data ? JSON.parse(data) : null;
    } catch (error) {
      console.error('Erro ao carregar funcionários:', error);
      return null;
    }
  },

  // Logs
  saveLogs: (logs: any[], userId: string) => {
    try {
      localStorage.setItem(getStorageKey(userId, 'logs'), JSON.stringify(logs));
    } catch (error) {
      console.error('Erro ao salvar logs:', error);
    }
  },

  loadLogs: (userId: string) => {
    try {
      const data = localStorage.getItem(getStorageKey(userId, 'logs'));
      if (!data) return null;

      const logs = JSON.parse(data);
      // Converter strings de data de volta para objetos Date
      return logs.map((log: any) => ({
        ...log,
        timestamp: new Date(log.timestamp),
      }));
    } catch (error) {
      console.error('Erro ao carregar logs:', error);
      return null;
    }
  },

  // Limpar dados de um usuário específico
  clearUserData: (userId: string) => {
    try {
      const types = ['products', 'sales', 'employees', 'logs'];
      types.forEach(type => {
        localStorage.removeItem(getStorageKey(userId, type));
      });
    } catch (error) {
      console.error('Erro ao limpar dados do usuário:', error);
    }
  },

  // Limpar todos os dados de todos os usuários
  clearAll: () => {
    try {
      const keys = Object.keys(localStorage);
      keys.forEach(key => {
        if (key.startsWith('charlotte_user_')) {
          localStorage.removeItem(key);
        }
      });
    } catch (error) {
      console.error('Erro ao limpar dados:', error);
    }
  },
};
