import { useNavigate, useLocation } from 'react-router';
import {
  LayoutDashboard,
  ShoppingCart,
  Receipt,
  DollarSign,
  Bell,
  MessageSquare,
  Users,
  ShieldAlert,
  Package,
  BarChart3,
  FileText,
  LogOut,
  Fuel,
  History,
  Settings
} from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';
import { cn } from '../../lib/utils';
import { Logo } from '../ui/Logo';

interface SidebarProps {
  role: 'frentista' | 'rh';
}

export function Sidebar({ role }: SidebarProps) {
  const navigate = useNavigate();
  const location = useLocation();
  const { logout, user } = useAuth();

  const frentistaItems = [
    { icon: LayoutDashboard, label: 'Dashboard', path: '/dashboard', color: '#F59E0B' },
    { icon: ShoppingCart, label: 'Registrar Venda', path: '/registrar-venda', color: '#10B981' },
    { icon: Receipt, label: 'Minhas Vendas', path: '/minhas-vendas', color: '#3B82F6' },
    { icon: DollarSign, label: 'Comissão', path: '/comissao', color: '#D4AF37' },
    { icon: Bell, label: 'Avisos', path: '/avisos', color: '#EC4899' },
    { icon: MessageSquare, label: 'Chat da Equipe', path: '/chat', color: '#A8E6CF' },
  ];

  const rhItems = [
    { icon: LayoutDashboard, label: 'Dashboard', path: '/dashboard', color: '#F59E0B' },
    { icon: Users, label: 'Funcionários', path: '/funcionarios', color: '#EF4444' },
    { icon: DollarSign, label: 'Comissões', path: '/comissoes', color: '#D4AF37' },
    { icon: ShieldAlert, label: 'Fraudes', path: '/fraudes', color: '#3B82F6' },
    { icon: Package, label: 'Armazém', path: '/estoque', color: '#10B981' },
    { icon: FileText, label: 'Relatórios', path: '/relatorios', color: '#EC4899' },
    { icon: BarChart3, label: 'Estatísticas', path: '/estatisticas', color: '#06B6D4' },
    { icon: History, label: 'Logs', path: '/logs', color: '#8B5CF6' },
    { icon: MessageSquare, label: 'Chat', path: '/chat', color: '#A8E6CF' },
    { icon: Settings, label: 'Configurações', path: '/configuracoes', color: '#6C757D' },
  ];

  const items = role === 'frentista' ? frentistaItems : rhItems;

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <div className="w-64 h-screen bg-sidebar flex flex-col">
      <div className="p-6">
        <Logo size="md" showText={true} />
        <p className="text-xs font-light mt-3 ml-1" style={{ color: '#D4AF37' }}>{user?.name}</p>
        <p className="text-xs mt-1 ml-1" style={{ color: '#6B8F7A' }}>{user?.role === 'frentista' ? 'Frentista' : 'RH / Admin'}</p>
      </div>

      <nav className="flex-1 px-4 pt-2">
        <p className="text-xs uppercase tracking-wider px-3 mb-3" style={{ color: '#6B8F7A' }}>Gestão</p>
        <ul className="space-y-0.5">
          {items.map((item) => {
            const Icon = item.icon;
            const isActive = location.pathname === item.path;

            return (
              <li key={item.path}>
                <button
                  onClick={() => navigate(item.path)}
                  className={cn(
                    'w-full flex items-center gap-3 px-3 py-2.5 rounded-lg transition-all duration-200 font-light',
                    isActive
                      ? 'bg-sidebar-accent'
                      : 'hover:bg-sidebar-accent/50'
                  )}
                >
                  <Icon className="w-5 h-5" style={{ color: item.color }} />
                  <span className="text-sm text-sidebar-foreground">{item.label}</span>
                </button>
              </li>
            );
          })}
        </ul>
      </nav>

      <div className="p-4">
        <button
          onClick={handleLogout}
          className="w-full flex items-center gap-3 px-3 py-2.5 rounded-lg hover:bg-sidebar-accent/50 transition-all duration-200 font-light"
        >
          <LogOut className="w-5 h-5 text-sidebar-foreground" />
          <span className="text-sm text-sidebar-foreground">Sair</span>
        </button>
      </div>
    </div>
  );
}
