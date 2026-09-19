import { Card, CardHeader, CardTitle, CardContent } from '../../components/ui/Card';
import { useData } from '../../contexts/DataContext';
import { formatCurrency } from '../../lib/utils';
import { BarChart3, TrendingUp, Users, Package } from 'lucide-react';

const COLORS = ['#B8860B', '#1B4332', '#DAA520', '#2D5F47', '#6B6B6B'];

export function Estatisticas() {
  const { sales, products, employees } = useData();

  const productSalesData = products.map(product => {
    const productSales = sales.filter(s => s.productId === product.id);
    const totalRevenue = productSales.reduce((sum, s) => sum + s.total, 0);
    return { id: product.id, name: product.name, valor: totalRevenue };
  }).filter(p => p.valor > 0).sort((a, b) => b.valor - a.valor).slice(0, 5);

  const employeeSalesData = employees.map(emp => ({
    id: emp.id,
    name: emp.name.split(' ')[0],
    vendas: emp.totalSales,
  })).filter(e => e.vendas > 0).sort((a, b) => b.vendas - a.vendas).slice(0, 6);

  const totalRevenue = sales.reduce((sum, sale) => sum + sale.total, 0);
  const avgTicket = sales.length > 0 ? totalRevenue / sales.length : 0;

  const maxProduct = Math.max(...productSalesData.map(p => p.valor), 1);
  const maxEmployee = Math.max(...employeeSalesData.map(e => e.vendas), 1);
  const totalPie = productSalesData.reduce((s, p) => s + p.valor, 0);

  return (
    <div className="p-8">
      <div className="mb-8">
        <h1 className="text-3xl font-light text-foreground mb-2">Estatísticas</h1>
        <p className="text-sm text-muted-foreground">Análises e métricas de desempenho</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle>Faturamento</CardTitle>
              <div className="w-10 h-10 rounded-lg bg-[#B8860B]/10 flex items-center justify-center">
                <TrendingUp className="w-5 h-5 text-[#B8860B]" />
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <p className="text-2xl font-light text-foreground">{formatCurrency(totalRevenue)}</p>
            <p className="text-xs text-muted-foreground mt-1">total</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle>Ticket Médio</CardTitle>
              <div className="w-10 h-10 rounded-lg bg-[#1B4332]/10 flex items-center justify-center">
                <BarChart3 className="w-5 h-5 text-[#1B4332]" />
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <p className="text-2xl font-light text-foreground">{formatCurrency(avgTicket)}</p>
            <p className="text-xs text-muted-foreground mt-1">por venda</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle>Total Vendas</CardTitle>
              <div className="w-10 h-10 rounded-lg bg-[#B8860B]/10 flex items-center justify-center">
                <Package className="w-5 h-5 text-[#B8860B]" />
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <p className="text-2xl font-light text-foreground">{sales.length}</p>
            <p className="text-xs text-muted-foreground mt-1">transações</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle>Vendedores</CardTitle>
              <div className="w-10 h-10 rounded-lg bg-[#1B4332]/10 flex items-center justify-center">
                <Users className="w-5 h-5 text-[#1B4332]" />
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <p className="text-2xl font-light text-foreground">
              {employees.filter(e => e.totalSales > 0).length}
            </p>
            <p className="text-xs text-muted-foreground mt-1">ativos</p>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Faturamento por Produto — barras horizontais */}
        <Card>
          <CardHeader>
            <div className="flex items-center gap-2">
              <Package className="w-5 h-5 text-[#B8860B]" />
              <CardTitle>Faturamento por Produto</CardTitle>
            </div>
          </CardHeader>
          <CardContent>
            {productSalesData.length === 0 ? (
              <p className="text-sm text-muted-foreground text-center py-12">Sem dados</p>
            ) : (
              <div className="space-y-4 pt-2">
                {productSalesData.map((p, i) => (
                  <div key={p.id} className="space-y-1">
                    <div className="flex justify-between items-center">
                      <span className="text-xs text-foreground font-light truncate max-w-[60%]">{p.name}</span>
                      <span className="text-xs text-muted-foreground">{formatCurrency(p.valor)}</span>
                    </div>
                    <div className="h-2.5 bg-secondary rounded-full overflow-hidden">
                      <div
                        className="h-full rounded-full transition-all duration-500"
                        style={{ width: `${(p.valor / maxProduct) * 100}%`, backgroundColor: COLORS[i % COLORS.length] }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>

        {/* Distribuição — pseudo-pizza com legenda */}
        <Card>
          <CardHeader>
            <div className="flex items-center gap-2">
              <TrendingUp className="w-5 h-5 text-[#B8860B]" />
              <CardTitle>Distribuição de Vendas</CardTitle>
            </div>
          </CardHeader>
          <CardContent>
            {productSalesData.length === 0 ? (
              <p className="text-sm text-muted-foreground text-center py-12">Sem dados</p>
            ) : (
              <div className="flex items-center gap-6 pt-2">
                <div className="relative w-32 h-32 flex-shrink-0">
                  <svg viewBox="0 0 36 36" className="w-full h-full -rotate-90">
                    {(() => {
                      let offset = 0;
                      return productSalesData.map((p, i) => {
                        const pct = totalPie > 0 ? (p.valor / totalPie) * 100 : 0;
                        const dash = `${pct} ${100 - pct}`;
                        const el = (
                          <circle
                            key={p.id}
                            cx="18" cy="18" r="15.915"
                            fill="none"
                            stroke={COLORS[i % COLORS.length]}
                            strokeWidth="3.5"
                            strokeDasharray={dash}
                            strokeDashoffset={-offset}
                          />
                        );
                        offset += pct;
                        return el;
                      });
                    })()}
                  </svg>
                </div>
                <div className="space-y-2 flex-1 min-w-0">
                  {productSalesData.map((p, i) => (
                    <div key={p.id} className="flex items-center gap-2">
                      <div className="w-2.5 h-2.5 rounded-full flex-shrink-0" style={{ backgroundColor: COLORS[i % COLORS.length] }} />
                      <span className="text-xs text-foreground truncate">{p.name}</span>
                      <span className="text-xs text-muted-foreground ml-auto flex-shrink-0">
                        {totalPie > 0 ? ((p.valor / totalPie) * 100).toFixed(0) : 0}%
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Desempenho de Vendedores */}
        <Card className="lg:col-span-2">
          <CardHeader>
            <div className="flex items-center gap-2">
              <Users className="w-5 h-5 text-[#B8860B]" />
              <CardTitle>Desempenho de Vendedores</CardTitle>
            </div>
          </CardHeader>
          <CardContent>
            {employeeSalesData.length === 0 ? (
              <p className="text-sm text-muted-foreground text-center py-12">Nenhuma venda registrada</p>
            ) : (
              <div className="flex items-end gap-3 h-48 pt-4">
                {employeeSalesData.map((emp, i) => (
                  <div key={emp.id} className="flex-1 flex flex-col items-center gap-1">
                    <span className="text-[9px] text-muted-foreground leading-none">
                      {formatCurrency(emp.vendas).replace('R$ ', '')}
                    </span>
                    <div className="w-full flex items-end" style={{ height: '140px' }}>
                      <div
                        className="w-full rounded-t-md transition-all duration-500"
                        style={{
                          height: `${Math.max((emp.vendas / maxEmployee) * 100, 4)}%`,
                          backgroundColor: COLORS[i % COLORS.length],
                        }}
                      />
                    </div>
                    <span className="text-[10px] text-muted-foreground text-center leading-tight">{emp.name}</span>
                  </div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
