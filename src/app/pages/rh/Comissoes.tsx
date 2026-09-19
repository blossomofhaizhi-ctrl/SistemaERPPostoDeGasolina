import { Card, CardHeader, CardTitle, CardContent } from '../../components/ui/Card';
import { useData } from '../../contexts/DataContext';
import { formatCurrency } from '../../lib/utils';
import { DollarSign, TrendingUp } from 'lucide-react';

export function Comissoes() {
  const { employees, sales } = useData();

  const totalCommissions = sales.reduce((sum, sale) => sum + sale.commission, 0);
  const avgCommission = sales.length > 0 ? totalCommissions / sales.length : 0;

  const employeesWithCommissions = employees
    .filter(e => e.totalCommission > 0)
    .sort((a, b) => b.totalCommission - a.totalCommission);

  return (
    <div className="p-8">
      <div className="mb-8">
        <h1 className="text-3xl font-light text-foreground mb-2">Comissões</h1>
        <p className="text-sm text-muted-foreground">
          Controle de comissões por funcionário
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle>Total Pago</CardTitle>
              <div className="w-10 h-10 rounded-lg bg-[#B8860B]/10 flex items-center justify-center">
                <DollarSign className="w-5 h-5 text-[#B8860B]" />
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <p className="text-3xl font-light text-foreground">{formatCurrency(totalCommissions)}</p>
            <p className="text-xs text-muted-foreground mt-1">em comissões</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle>Média por Venda</CardTitle>
              <div className="w-10 h-10 rounded-lg bg-[#1B4332]/10 flex items-center justify-center">
                <TrendingUp className="w-5 h-5 text-[#1B4332]" />
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <p className="text-3xl font-light text-foreground">{formatCurrency(avgCommission)}</p>
            <p className="text-xs text-muted-foreground mt-1">por transação</p>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Comissões por Funcionário</CardTitle>
        </CardHeader>
        <CardContent>
          {employeesWithCommissions.length === 0 ? (
            <p className="text-center text-muted-foreground py-8">
              Nenhuma comissão registrada
            </p>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-border">
                    <th className="text-left py-3 px-4 font-light text-sm text-muted-foreground">Funcionário</th>
                    <th className="text-left py-3 px-4 font-light text-sm text-muted-foreground">Cargo</th>
                    <th className="text-right py-3 px-4 font-light text-sm text-muted-foreground">Total Vendas</th>
                    <th className="text-right py-3 px-4 font-light text-sm text-muted-foreground">Comissão</th>
                    <th className="text-right py-3 px-4 font-light text-sm text-muted-foreground">% Comissão</th>
                  </tr>
                </thead>
                <tbody>
                  {employeesWithCommissions.map((employee) => {
                    const commissionPercentage = employee.totalSales > 0
                      ? (employee.totalCommission / employee.totalSales) * 100
                      : 0;

                    return (
                      <tr key={employee.id} className="border-b border-border hover:bg-secondary/50 transition-colors">
                        <td className="py-3 px-4 text-sm font-light">{employee.name}</td>
                        <td className="py-3 px-4 text-sm font-light text-muted-foreground">{employee.role}</td>
                        <td className="py-3 px-4 text-sm font-light text-right">
                          {formatCurrency(employee.totalSales)}
                        </td>
                        <td className="py-3 px-4 text-sm font-light text-right text-[#1B4332]">
                          {formatCurrency(employee.totalCommission)}
                        </td>
                        <td className="py-3 px-4 text-sm font-light text-right">
                          {commissionPercentage.toFixed(2)}%
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
