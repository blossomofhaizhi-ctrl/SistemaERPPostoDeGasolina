import { BrowserRouter, Routes, Route, Navigate } from 'react-router';
import { AuthProvider, useAuth } from './contexts/AuthContext';
import { UserDataProvider } from './contexts/UserDataProvider';
import { Toaster } from 'sonner';
import { Login } from './pages/Login';
import { Sidebar } from './components/layout/Sidebar';

import { FrentistaDashboard } from './pages/frentista/Dashboard';
import { RegistrarVenda } from './pages/frentista/RegistrarVenda';
import { MinhasVendas } from './pages/frentista/MinhasVendas';
import { Comissao } from './pages/frentista/Comissao';
import { Avisos } from './pages/frentista/Avisos';
import { Chat } from './pages/frentista/Chat';

import { RHDashboard } from './pages/rh/Dashboard';
import { Funcionarios } from './pages/rh/Funcionarios';
import { Comissoes } from './pages/rh/Comissoes';
import { Fraudes } from './pages/rh/Fraudes';
import { Estoque } from './pages/rh/Estoque';
import { Relatorios } from './pages/rh/Relatorios';
import { Estatisticas } from './pages/rh/Estatisticas';
import { Logs } from './pages/rh/Logs';
import { Chat as RHChat } from './pages/rh/Chat';
import { Configuracoes } from './pages/rh/Configuracoes';
import { IconExport } from './pages/IconExport';

function ProtectedRoute({ children }: { children: React.ReactNode }) {
  const { user } = useAuth();

  if (!user) {
    return <Navigate to="/" replace />;
  }

  return <>{children}</>;
}

function AppLayout({ children }: { children: React.ReactNode }) {
  const { user } = useAuth();

  if (!user) {
    return <>{children}</>;
  }

  return (
    <div className="flex h-screen bg-background">
      <Sidebar role={user.role} />
      <main className="flex-1 overflow-y-auto">
        {children}
      </main>
    </div>
  );
}

export default function App() {
  return (
    <AuthProvider>
      <UserDataProvider>
        <BrowserRouter>
          <AppLayout>
            <Routes>
              <Route path="/" element={<Login />} />
              <Route path="/icons" element={<IconExport />} />

              <Route
                path="/dashboard"
                element={
                  <ProtectedRoute>
                    <DashboardRouter />
                  </ProtectedRoute>
                }
              />

              <Route
                path="/registrar-venda"
                element={
                  <ProtectedRoute>
                    <RegistrarVenda />
                  </ProtectedRoute>
                }
              />

              <Route
                path="/minhas-vendas"
                element={
                  <ProtectedRoute>
                    <MinhasVendas />
                  </ProtectedRoute>
                }
              />

              <Route
                path="/comissao"
                element={
                  <ProtectedRoute>
                    <Comissao />
                  </ProtectedRoute>
                }
              />

              <Route
                path="/avisos"
                element={
                  <ProtectedRoute>
                    <Avisos />
                  </ProtectedRoute>
                }
              />

              <Route
                path="/chat"
                element={
                  <ProtectedRoute>
                    <ChatRouter />
                  </ProtectedRoute>
                }
              />

              <Route
                path="/funcionarios"
                element={
                  <ProtectedRoute>
                    <Funcionarios />
                  </ProtectedRoute>
                }
              />

              <Route
                path="/comissoes"
                element={
                  <ProtectedRoute>
                    <Comissoes />
                  </ProtectedRoute>
                }
              />

              <Route
                path="/fraudes"
                element={
                  <ProtectedRoute>
                    <Fraudes />
                  </ProtectedRoute>
                }
              />

              <Route
                path="/estoque"
                element={
                  <ProtectedRoute>
                    <Estoque />
                  </ProtectedRoute>
                }
              />


              <Route
                path="/relatorios"
                element={
                  <ProtectedRoute>
                    <Relatorios />
                  </ProtectedRoute>
                }
              />

              <Route
                path="/estatisticas"
                element={
                  <ProtectedRoute>
                    <Estatisticas />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/logs"
                element={
                  <ProtectedRoute>
                    <Logs />
                  </ProtectedRoute>
                }
              />

              <Route
                path="/configuracoes"
                element={
                  <ProtectedRoute>
                    <Configuracoes />
                  </ProtectedRoute>
                }
              />
            </Routes>
          </AppLayout>
        </BrowserRouter>
        <Toaster position="top-right" richColors />
      </UserDataProvider>
    </AuthProvider>
  );
}

function DashboardRouter() {
  const { user } = useAuth();

  if (user?.role === 'frentista') {
    return <FrentistaDashboard />;
  }

  return <RHDashboard />;
}

function ChatRouter() {
  const { user } = useAuth();

  if (user?.role === 'frentista') {
    return <Chat />;
  }

  return <RHChat />;
}