import { Card, CardHeader, CardTitle, CardContent } from '../../components/ui/Card';
import { useAuth } from '../../contexts/AuthContext';
import { useData } from '../../contexts/DataContext';
import { formatCurrency } from '../../lib/utils';
import { ShoppingCart, DollarSign, TrendingUp, Bell } from 'lucide-react';

export function FrentistaDashboard() {
  const { user } = useAuth();
  const { getSalesByEmployee, getEmployeeCommission } = useData();

  const mySales = getSalesByEmployee(user?.id || '');
  const todaySales = mySales.filter(sale => {
    const today = new Date();
    const saleDate = new Date(sale.date);
    return saleDate.toDateString() === today.toDateString();
  });

  const todayTotal = todaySales.reduce((sum, sale) => sum + sale.total, 0);
  const todayCommission = todaySales.reduce((sum, sale) => sum + sale.commission, 0);
  const myTotalCommission = getEmployeeCommission(user?.id || '');

  return (
    <div className="p-8">
      <div className="mb-8">
        <h1 className="text-3xl font-light text-foreground mb-2">
          Olá, {user?.name}
        </h1>
        <p className="text-sm text-muted-foreground">
          Acompanhe suas vendas e comissões
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle>Vendas Hoje</CardTitle>
              <div className="w-10 h-10 rounded-lg bg-[#B8860B]/10 flex items-center justify-center">
                <ShoppingCart className="w-5 h-5 text-[#B8860B]" />
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <p className="text-2xl font-light text-foreground">{todaySales.length}</p>
            <p className="text-xs text-muted-foreground mt-1">transações</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle>Valor Hoje</CardTitle>
              <div className="w-10 h-10 rounded-lg bg-[#1B4332]/10 flex items-center justify-center">
                <TrendingUp className="w-5 h-5 text-[#1B4332]" />
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <p className="text-2xl font-light text-foreground">{formatCurrency(todayTotal)}</p>
            <p className="text-xs text-muted-foreground mt-1">faturado</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle>Comissão Hoje</CardTitle>
              <div className="w-10 h-10 rounded-lg bg-[#1B4332]/10 flex items-center justify-center">
                <DollarSign className="w-5 h-5 text-[#1B4332]" />
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <p className="text-2xl font-light text-foreground">{formatCurrency(todayCommission)}</p>
            <p className="text-xs text-muted-foreground mt-1">ganhos</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle>Comissão Total</CardTitle>
              <div className="w-10 h-10 rounded-lg bg-[#B8860B]/10 flex items-center justify-center">
                <DollarSign className="w-5 h-5 text-[#B8860B]" />
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <p className="text-2xl font-light text-foreground">{formatCurrency(myTotalCommission)}</p>
            <p className="text-xs text-muted-foreground mt-1">acumulado</p>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <div className="flex items-center gap-2">
              <Bell className="w-5 h-5 text-[#B8860B]" />
              <CardTitle>Avisos Recentes</CardTitle>
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              <div className="p-3 bg-secondary rounded-lg">
                <p className="text-sm font-light">Reunião de equipe amanhã às 9h</p>
                <p className="text-xs text-muted-foreground mt-1">Administração</p>
              </div>
              <div className="p-3 bg-secondary rounded-lg">
                <p className="text-sm font-light">Meta de vendas atualizada</p>
                <p className="text-xs text-muted-foreground mt-1">RH</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Últimas Vendas</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {todaySales.slice(0, 3).map(sale => (
                <div key={sale.id} className="flex items-center justify-between p-3 bg-secondary rounded-lg">
                  <div>
                    <p className="text-sm font-light">{sale.productName}</p>
                    <p className="text-xs text-muted-foreground">{sale.quantity} {sale.quantity > 1 ? 'unidades' : 'unidade'}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-sm font-light text-[#1B4332]">{formatCurrency(sale.total)}</p>
                    <p className="text-xs text-muted-foreground">+{formatCurrency(sale.commission)}</p>
                  </div>
                </div>
              ))}
              {todaySales.length === 0 && (
                <p className="text-sm text-muted-foreground text-center py-4">
                  Nenhuma venda hoje
                </p>
              )}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
