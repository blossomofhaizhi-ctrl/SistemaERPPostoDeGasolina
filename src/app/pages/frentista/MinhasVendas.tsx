import { Card, CardHeader, CardTitle, CardContent } from '../../components/ui/Card';
import { useAuth } from '../../contexts/AuthContext';
import { useData } from '../../contexts/DataContext';
import { formatCurrency, formatDate } from '../../lib/utils';
import { Receipt } from 'lucide-react';

export function MinhasVendas() {
  const { user } = useAuth();
  const { getSalesByEmployee } = useData();

  const mySales = getSalesByEmployee(user?.id || '').sort(
    (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
  );

  return (
    <div className="p-8">
      <div className="mb-8">
        <h1 className="text-3xl font-light text-foreground mb-2">Minhas Vendas</h1>
        <p className="text-sm text-muted-foreground">
          Histórico completo de transações
        </p>
      </div>

      <Card>
        <CardHeader>
          <div className="flex items-center gap-2">
            <Receipt className="w-5 h-5 text-[#B8860B]" />
            <CardTitle>Histórico de Vendas</CardTitle>
          </div>
        </CardHeader>
        <CardContent>
          {mySales.length === 0 ? (
            <p className="text-center text-muted-foreground py-8">
              Nenhuma venda registrada
            </p>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-border">
                    <th className="text-left py-3 px-4 font-light text-sm text-muted-foreground">Data</th>
                    <th className="text-left py-3 px-4 font-light text-sm text-muted-foreground">Produto</th>
                    <th className="text-right py-3 px-4 font-light text-sm text-muted-foreground">Quantidade</th>
                    <th className="text-right py-3 px-4 font-light text-sm text-muted-foreground">Valor</th>
                    <th className="text-right py-3 px-4 font-light text-sm text-muted-foreground">Comissão</th>
                  </tr>
                </thead>
                <tbody>
                  {mySales.map((sale) => (
                    <tr key={sale.id} className="border-b border-border hover:bg-secondary/50 transition-colors">
                      <td className="py-3 px-4 text-sm font-light">{formatDate(sale.date)}</td>
                      <td className="py-3 px-4 text-sm font-light">{sale.productName}</td>
                      <td className="py-3 px-4 text-sm font-light text-right">{sale.quantity}</td>
                      <td className="py-3 px-4 text-sm font-light text-right">{formatCurrency(sale.total)}</td>
                      <td className="py-3 px-4 text-sm font-light text-right text-[#1B4332]">
                        {formatCurrency(sale.commission)}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
