import { Card, CardHeader, CardTitle, CardContent } from '../../components/ui/Card';
import { StatCard } from '../../components/ui/StatCard';
import { useData } from '../../contexts/DataContext';
import { formatCurrency } from '../../lib/utils';
import { Users, ShoppingCart, DollarSign, TrendingUp, AlertTriangle, Package } from 'lucide-react';

export function RHDashboard() {
  const { sales, employees, products } = useData();

  const today = new Date();
  const todaySales = sales.filter(sale => {
    const saleDate = new Date(sale.date);
    return saleDate.toDateString() === today.toDateString();
  });

  const thisMonth = sales.filter(sale => {
    const saleDate = new Date(sale.date);
    return saleDate.getMonth() === today.getMonth() &&
           saleDate.getFullYear() === today.getFullYear();
  });

  const todayRevenue = todaySales.reduce((sum, sale) => sum + sale.total, 0);
  const monthRevenue = thisMonth.reduce((sum, sale) => sum + sale.total, 0);
  const activeEmployees = employees.filter(e => e.active).length;
  const lowStockProducts = products.filter(p => p.stock <= p.minStock);

  const last7Days = Array.from({ length: 7 }, (_, i) => {
    const date = new Date();
    date.setDate(date.getDate() - (6 - i));
    return date;
  });

  const salesByDay = last7Days.map((date, index) => {
    const daySales = sales.filter(sale => {
      const saleDate = new Date(sale.date);
      return saleDate.toDateString() === date.toDateString();
    });
    const total = daySales.reduce((sum, sale) => sum + sale.total, 0);
    return {
      id: `day-${date.getTime()}-${index}`,
      name: date.toLocaleDateString('pt-BR', { day: '2-digit', month: '2-digit' }),
      valor: total,
    };
  });

  const topEmployees = employees
    .filter(e => e.totalSales > 0)
    .sort((a, b) => b.totalSales - a.totalSales)
    .slice(0, 5)
    .map((e, index) => ({
      id: `emp-${e.id}-${Date.now()}-${index}`,
      name: e.name.split(' ')[0],
      vendas: e.totalSales,
    }));

  return (
    <div className="p-8">
      <div className="mb-6">
        <h1 className="text-2xl font-light text-foreground mb-1">Gestão de Armazém</h1>
        <p className="text-sm" style={{ color: '#C9A546' }}>
          Valor total: {formatCurrency(monthRevenue)}
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        <StatCard
          title="Vendas Hoje"
          value={todaySales.length}
          subtitle={formatCurrency(todayRevenue)}
          icon={ShoppingCart}
          iconColor="#F59E0B"
        />

        <StatCard
          title="Faturamento Mês"
          value={formatCurrency(monthRevenue)}
          subtitle={`${thisMonth.length} vendas`}
          icon={DollarSign}
          iconColor="#D4AF37"
          valueColor="#2D5F47"
        />

        <StatCard
          title="Funcionários Ativos"
          value={activeEmployees}
          subtitle={`de ${employees.length} total`}
          icon={Users}
          iconColor="#EF4444"
        />

        <StatCard
          title="Alertas Estoque"
          value={lowStockProducts.length}
          subtitle="produtos em falta"
          icon={AlertTriangle}
          iconColor="#DC3545"
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 mb-4">
        <Card>
          <CardHeader>
            <div className="flex items-center gap-2">
              <TrendingUp className="w-5 h-5 text-[#B8860B]" />
              <CardTitle>Vendas - Últimos 7 Dias</CardTitle>
            </div>
          </CardHeader>
          <CardContent>
            {(() => {
              const max = Math.max(...salesByDay.map(d => d.valor), 1);
              return (
                <div className="flex items-end gap-2 h-48 pt-4">
                  {salesByDay.map((day, i) => (
                    <div key={i} className="flex-1 flex flex-col items-center gap-1">
                      <span className="text-[9px] text-muted-foreground leading-none">
                        {day.valor > 0 ? formatCurrency(day.valor).replace('R$ ', '') : ''}
                      </span>
                      <div className="w-full flex items-end" style={{ height: '140px' }}>
                        <div
                          className="w-full rounded-t-sm bg-[#D4AF37] transition-all duration-500"
                          style={{ height: `${Math.max((day.valor / max) * 100, day.valor > 0 ? 4 : 0)}%` }}
                        />
                      </div>
                      <span className="text-[10px] text-muted-foreground">{day.name}</span>
                    </div>
                  ))}
                </div>
              );
            })()}
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <div className="flex items-center gap-2">
              <Users className="w-5 h-5 text-[#B8860B]" />
              <CardTitle>Top 5 Vendedores</CardTitle>
            </div>
          </CardHeader>
          <CardContent>
            {topEmployees.length === 0 ? (
              <p className="text-sm text-muted-foreground text-center py-12">Nenhuma venda registrada</p>
            ) : (
              <div className="space-y-3 pt-2">
                {topEmployees.map((emp, i) => {
                  const max = topEmployees[0].vendas;
                  const pct = (emp.vendas / max) * 100;
                  return (
                    <div key={i} className="space-y-1">
                      <div className="flex justify-between items-center">
                        <span className="text-xs text-foreground font-light">{emp.name}</span>
                        <span className="text-xs text-muted-foreground">{formatCurrency(emp.vendas)}</span>
                      </div>
                      <div className="h-2 bg-secondary rounded-full overflow-hidden">
                        <div
                          className="h-full bg-[#0A3D2E] rounded-full transition-all duration-500"
                          style={{ width: `${pct}%` }}
                        />
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </CardContent>
        </Card>
      </div>

      {lowStockProducts.length > 0 && (
        <Card>
          <CardHeader>
            <div className="flex items-center gap-2">
              <Package className="w-5 h-5 text-red-600" />
              <CardTitle>Produtos com Estoque Baixo</CardTitle>
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              {lowStockProducts.map(product => (
                <div key={product.id} className="flex items-center justify-between p-3 bg-red-50 border border-red-200 rounded-lg">
                  <div>
                    <p className="text-sm font-light text-foreground">{product.name}</p>
                    <p className="text-xs text-muted-foreground">
                      Mínimo: {product.minStock} {product.unit}
                    </p>
                  </div>
                  <div className="text-right">
                    <p className="text-sm font-light text-red-600">
                      {product.stock} {product.unit}
                    </p>
                    <p className="text-xs text-muted-foreground">disponível</p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
