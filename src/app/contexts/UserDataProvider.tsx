import { ReactNode } from 'react';
import { useAuth } from './AuthContext';
import { LogProvider } from './LogContext';
import { DataProvider } from './DataContext';

export function UserDataProvider({ children }: { children: ReactNode }) {
  const { user } = useAuth();

  // Funcionários compartilham o namespace de storage do admin que os cadastrou
  const userId = user?.storageUserId || user?.id || 'guest';

  return (
    <LogProvider userId={userId}>
      <DataProvider userId={userId}>
        {children}
      </DataProvider>
    </LogProvider>
  );
}
