import { createContext, useContext, useState, ReactNode } from 'react';
import { storage } from '../lib/storage';

interface User {
  id: string;
  name: string;
  email: string;
  role: 'frentista' | 'rh';
  storageUserId?: string; // ID do admin dono dos dados (para funcionários)
}

interface AuthContextType {
  user: User | null;
  login: (email: string, password: string, role: 'frentista' | 'rh') => { success: boolean; error?: string };
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Usuários pré-cadastrados no sistema
const REGISTERED_USERS = [
  {
    id: '1',
    name: 'João Silva',
    email: 'frentista@posto.com',
    password: 'frentista123',
    role: 'frentista' as const,
  },
  {
    id: '2',
    name: 'Maria Santos',
    email: 'rh@posto.com',
    password: 'rh123',
    role: 'rh' as const,
  },
];

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);

  // Função para buscar todos os funcionários cadastrados em todos os usuários
  const getAllEmployees = () => {
    const result: Array<{ employee: any; adminId: string }> = [];

    for (let i = 0; i < localStorage.length; i++) {
      const key = localStorage.key(i);
      if (key && key.startsWith('charlotte_user_') && key.endsWith('_employees')) {
        try {
          const data = localStorage.getItem(key);
          if (data) {
            const employees = JSON.parse(data);
            if (Array.isArray(employees)) {
              // Extrair o adminId da chave: charlotte_user_{adminId}_employees
              const adminId = key.replace('charlotte_user_', '').replace('_employees', '');
              employees.forEach(emp => result.push({ employee: emp, adminId }));
            }
          }
        } catch (error) {
          console.error('Erro ao carregar funcionários:', error);
        }
      }
    }

    return result;
  };

  const login = (email: string, password: string, role: 'frentista' | 'rh') => {
    // Buscar primeiro nos usuários padrão
    let foundUser = REGISTERED_USERS.find(u => u.email === email);
    let isEmployee = false;

    let storageUserId: string | undefined;

    // Se não encontrou, buscar nos funcionários cadastrados
    if (!foundUser) {
      const allEmployees = getAllEmployees();
      const found = allEmployees.find(({ employee }) => employee.email === email);

      if (found) {
        const { employee, adminId } = found;
        // Verificar se o funcionário está ativo
        if (!employee.active) {
          return {
            success: false,
            error: 'Funcionário inativo. Entre em contato com o RH.',
          };
        }
        // Determinar o role baseado no cargo do funcionário
        const employeeRole = employee.role.toLowerCase() === 'frentista' ? 'frentista' : 'rh';
        foundUser = {
          id: employee.id,
          name: employee.name,
          email: employee.email,
          password: employee.password,
          role: employeeRole as 'frentista' | 'rh',
        };
        storageUserId = adminId; // funcionário compartilha dados do admin que o cadastrou
        isEmployee = true;
      }
    }

    // Se não encontrou o email
    if (!foundUser) {
      return {
        success: false,
        error: 'Email não cadastrado no sistema',
      };
    }

    // Se a senha estiver incorreta
    if (foundUser.password !== password) {
      return {
        success: false,
        error: 'Senha incorreta',
      };
    }

    // Se o perfil selecionado não corresponde ao perfil do usuário
    if (foundUser.role !== role) {
      return {
        success: false,
        error: `Este usuário não tem perfil de ${role === 'frentista' ? 'Frentista' : 'RH/Admin'}`,
      };
    }

    // Login bem-sucedido
    setUser({
      id: foundUser.id,
      name: foundUser.name,
      email: foundUser.email,
      role: foundUser.role,
      storageUserId,
    });

    return { success: true };
  };

  const logout = () => {
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}
