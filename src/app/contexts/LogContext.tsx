import { createContext, useContext, useState, ReactNode, useEffect } from 'react';
import { storage } from '../lib/storage';

export type LogAction =
  | 'employee_added'
  | 'employee_removed'
  | 'employee_activated'
  | 'employee_deactivated'
  | 'product_added'
  | 'product_removed'
  | 'stock_updated';

export interface LogEntry {
  id: string;
  action: LogAction;
  userName: string;
  userId: string;
  timestamp: Date;
  details: {
    itemName?: string;
    itemId?: string;
    oldValue?: number;
    newValue?: number;
    additionalInfo?: string;
  };
}

interface LogContextType {
  logs: LogEntry[];
  addLog: (log: Omit<LogEntry, 'id' | 'timestamp'>) => void;
}

const LogContext = createContext<LogContextType | undefined>(undefined);

interface LogProviderProps {
  children: ReactNode;
  userId?: string;
}

export function LogProvider({ children, userId = 'default' }: LogProviderProps) {
  // Carregar logs do localStorage
  const [logs, setLogs] = useState<LogEntry[]>(() => {
    if (!userId) return [];
    const saved = storage.loadLogs(userId);
    return saved || [];
  });

  // Recarregar logs quando o userId mudar
  useEffect(() => {
    if (!userId) return;
    const saved = storage.loadLogs(userId);
    setLogs(saved || []);
  }, [userId]);

  // Salvar logs no localStorage quando mudam
  useEffect(() => {
    if (!userId) return;
    storage.saveLogs(logs, userId);
  }, [logs, userId]);

  const addLog = (log: Omit<LogEntry, 'id' | 'timestamp'>) => {
    const newLog: LogEntry = {
      ...log,
      id: Date.now().toString(),
      timestamp: new Date(),
    };
    setLogs([newLog, ...logs]);
  };

  return (
    <LogContext.Provider value={{ logs, addLog }}>
      {children}
    </LogContext.Provider>
  );
}

export function useLog() {
  const context = useContext(LogContext);
  if (context === undefined) {
    throw new Error('useLog must be used within a LogProvider');
  }
  return context;
}

export function getActionLabel(action: LogAction): string {
  const labels: Record<LogAction, string> = {
    employee_added: 'Funcionário Adicionado',
    employee_removed: 'Funcionário Removido',
    employee_activated: 'Funcionário Ativado',
    employee_deactivated: 'Funcionário Inativado',
    product_added: 'Produto Adicionado',
    product_removed: 'Produto Removido',
    stock_updated: 'Estoque Atualizado',
  };
  return labels[action];
}

export function getActionColor(action: LogAction): string {
  const colors: Record<LogAction, string> = {
    employee_added: '#10B981',
    employee_removed: '#EF4444',
    employee_activated: '#10B981',
    employee_deactivated: '#F59E0B',
    product_added: '#10B981',
    product_removed: '#EF4444',
    stock_updated: '#3B82F6',
  };
  return colors[action];
}
