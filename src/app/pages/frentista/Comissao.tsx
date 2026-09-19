import { Card, CardHeader, CardTitle, CardContent } from '../../components/ui/Card';
import { useAuth } from '../../contexts/AuthContext';
import { useData } from '../../contexts/DataContext';
import { formatCurrency } from '../../lib/utils';
import { DollarSign, TrendingUp, Calendar } from 'lucide-react';

export function Comissao() {
  const { user } = useAuth();
  const { getSalesByEmployee } = useData();

  const mySales = getSalesByEmployee(user?.id || '');

  const today = new Date();
  const thisMonth = mySales.filter(sale => {
    const saleDate = new Date(sale.date);
    return saleDate.getMonth() === today.getMonth() &&
           saleDate.getFullYear() === today.getFullYear();
  });

  const totalCommission = mySales.reduce((sum, sale) => sum + sale.commission, 0);
  const monthCommission = thisMonth.reduce((sum, sale) => sum + sale.commission, 0);

  const productCommissions = mySales.reduce((acc, sale) => {
    if (!acc[sale.productName]) {
      acc[sale.productName] = 0;
    }
    acc[sale.productName] += sale.commission;
    return acc;
  }, {} as Record<string, number>);

  const topProducts = Object.entries(productCommissions)
    .sort(([, a], [, b]) => b - a)
    .slice(0, 5);

  return (
    <div className="p-8">
      <div className="mb-8">
        <h1 className="text-3xl font-light text-foreground mb-2">Comissões</h1>
        <p className="text-sm text-muted-foreground">
          Acompanhe seus ganhos
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle>Total Acumulado</CardTitle>
              <div className="w-10 h-10 rounded-lg bg-[#B8860B]/10 flex items-center justify-center">
                <DollarSign className="w-5 h-5 text-[#B8860B]" />
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <p className="text-3xl font-light text-foreground">{formatCurrency(totalCommission)}</p>
            <p className="text-xs text-muted-foreground mt-1">desde o início</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle>Este Mês</CardTitle>
              <div className="w-10 h-10 rounded-lg bg-[#1B4332]/10 flex items-center justify-center">
                <Calendar className="w-5 h-5 text-[#1B4332]" />
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <p className="text-3xl font-light text-foreground">{formatCurrency(monthCommission)}</p>
            <p className="text-xs text-muted-foreground mt-1">{thisMonth.length} vendas</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle>Média por Venda</CardTitle>
              <div className="w-10 h-10 rounded-lg bg-[#B8860B]/10 flex items-center justify-center">
                <TrendingUp className="w-5 h-5 text-[#B8860B]" />
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <p className="text-3xl font-light text-foreground">
              {formatCurrency(mySales.length > 0 ? totalCommission / mySales.length : 0)}
            </p>
            <p className="text-xs text-muted-foreground mt-1">por transação</p>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Comissão por Produto</CardTitle>
        </CardHeader>
        <CardContent>
          {topProducts.length === 0 ? (
            <p className="text-center text-muted-foreground py-8">
              Nenhuma comissão registrada
            </p>
          ) : (
            <div className="space-y-4">
              {topProducts.map(([product, commission]) => {
                const percentage = (commission / totalCommission) * 100;
                return (
                  <div key={product}>
                    <div className="flex justify-between items-center mb-2">
                      <span className="text-sm font-light">{product}</span>
                      <span className="text-sm font-light text-[#1B4332]">
                        {formatCurrency(commission)}
                      </span>
                    </div>
                    <div className="h-2 bg-secondary rounded-full overflow-hidden">
                      <div
                        className="h-full bg-gradient-to-r from-[#B8860B] to-[#DAA520] rounded-full transition-all duration-500"
                        style={{ width: `${percentage}%` }}
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
  );
}
