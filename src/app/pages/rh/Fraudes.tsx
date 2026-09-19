import { useState } from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '../../components/ui/Card';
import { useData } from '../../contexts/DataContext';
import { formatCurrency, formatDate } from '../../lib/utils';
import { ShieldAlert, AlertTriangle, TrendingUp, User, ChevronDown, ChevronUp } from 'lucide-react';

function getRiskLevel(count: number, total: number) {
  if (total === 0) return { label: 'Sem vendas', color: 'text-muted-foreground', bg: 'bg-secondary' };
  const rate = count / total;
  if (rate >= 0.3) return { label: 'Alto risco', color: 'text-red-600', bg: 'bg-red-50' };
  if (rate >= 0.1) return { label: 'Médio risco', color: 'text-orange-600', bg: 'bg-orange-50' };
  if (count > 0) return { label: 'Baixo risco', color: 'text-yellow-600', bg: 'bg-yellow-50' };
  return { label: 'Normal', color: 'text-green-600', bg: 'bg-green-50' };
}

export function Fraudes() {
  const { sales, employees } = useData();
  const [expandedEmployee, setExpandedEmployee] = useState<string | null>(null);

  const frentistas = employees.filter(e => e.active);

  const employeeAnalysis = frentistas.map(emp => {
    const empSales = sales.filter(s => s.employeeId === emp.id);

    const avgSale = empSales.length > 0
      ? empSales.reduce((sum, s) => sum + s.total, 0) / empSales.length
      : 0;

    const suspicious = empSales.filter(sale => {
      const isHighValue = avgSale > 0 && sale.total > avgSale * 3;
      const isHighCommission = avgSale > 0 && sale.commission > avgSale * 0.15;
      const saleHour = new Date(sale.date).getHours();
      const isUnusualTime = saleHour < 6 || saleHour > 22;
      return isHighValue || isHighCommission || isUnusualTime;
    });

    return {
      ...emp,
      empSales,
      avgSale,
      suspicious,
      alertRate: empSales.length > 0 ? (suspicious.length / empSales.length) * 100 : 0,
    };
  });

  const totalSuspicious = employeeAnalysis.reduce((sum, e) => sum + e.suspicious.length, 0);
  const totalSales = sales.length;

  return (
    <div className="p-8">
      <div className="mb-8">
        <h1 className="text-3xl font-light text-foreground mb-2">Detecção de Fraudes</h1>
        <p className="text-sm text-muted-foreground">
          Análise individual por frentista
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle>Total de Alertas</CardTitle>
              <div className="w-10 h-10 rounded-lg bg-red-50 flex items-center justify-center">
                <ShieldAlert className="w-5 h-5 text-red-600" />
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <p className="text-3xl font-light text-foreground">{totalSuspicious}</p>
            <p className="text-xs text-muted-foreground mt-1">transações suspeitas</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle>Funcionários em Alerta</CardTitle>
              <div className="w-10 h-10 rounded-lg bg-orange-50 flex items-center justify-center">
                <AlertTriangle className="w-5 h-5 text-orange-500" />
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <p className="text-3xl font-light text-foreground">
              {employeeAnalysis.filter(e => e.suspicious.length > 0).length}
            </p>
            <p className="text-xs text-muted-foreground mt-1">de {frentistas.length} funcionários</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle>Taxa Geral de Alerta</CardTitle>
              <div className="w-10 h-10 rounded-lg bg-[#B8860B]/10 flex items-center justify-center">
                <TrendingUp className="w-5 h-5 text-[#B8860B]" />
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <p className="text-3xl font-light text-foreground">
              {totalSales > 0 ? ((totalSuspicious / totalSales) * 100).toFixed(1) : 0}%
            </p>
            <p className="text-xs text-muted-foreground mt-1">do total de vendas</p>
          </CardContent>
        </Card>
      </div>

      <div className="space-y-4">
        {employeeAnalysis.length === 0 && (
          <Card>
            <CardContent>
              <p className="text-center text-muted-foreground py-12">
                Nenhum funcionário cadastrado
              </p>
            </CardContent>
          </Card>
        )}

        {employeeAnalysis.map(emp => {
          const risk = getRiskLevel(emp.suspicious.length, emp.empSales.length);
          const isExpanded = expandedEmployee === emp.id;

          return (
            <Card key={emp.id}>
              <button
                className="w-full text-left"
                onClick={() => setExpandedEmployee(isExpanded ? null : emp.id)}
              >
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full bg-secondary flex items-center justify-center">
                        <User className="w-5 h-5 text-muted-foreground" />
                      </div>
                      <div>
                        <p className="text-sm font-light text-foreground">{emp.name}</p>
                        <p className="text-xs text-muted-foreground">{emp.role}</p>
                      </div>
                    </div>

                    <div className="flex items-center gap-6">
                      <div className="text-right">
                        <p className="text-xs text-muted-foreground">Vendas totais</p>
                        <p className="text-sm font-light">{emp.empSales.length}</p>
                      </div>
                      <div className="text-right">
                        <p className="text-xs text-muted-foreground">Valor médio</p>
                        <p className="text-sm font-light">{formatCurrency(emp.avgSale)}</p>
                      </div>
                      <div className="text-right">
                        <p className="text-xs text-muted-foreground">Taxa alerta</p>
                        <p className="text-sm font-light">{emp.alertRate.toFixed(1)}%</p>
                      </div>
                      <div className={`px-3 py-1 rounded-full ${risk.bg}`}>
                        <span className={`text-xs ${risk.color}`}>{risk.label}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className={`text-lg font-light ${emp.suspicious.length > 0 ? 'text-red-600' : 'text-green-600'}`}>
                          {emp.suspicious.length}
                        </span>
                        {isExpanded
                          ? <ChevronUp className="w-4 h-4 text-muted-foreground" />
                          : <ChevronDown className="w-4 h-4 text-muted-foreground" />
                        }
                      </div>
                    </div>
                  </div>
                </CardHeader>
              </button>

              {isExpanded && (
                <CardContent>
                  {emp.empSales.length === 0 ? (
                    <p className="text-center text-muted-foreground py-6">
                      Nenhuma venda registrada para este funcionário
                    </p>
                  ) : emp.suspicious.length === 0 ? (
                    <div className="flex items-center justify-center gap-2 py-6 text-green-600">
                      <ShieldAlert className="w-5 h-5" />
                      <p className="text-sm">Nenhuma venda suspeita detectada</p>
                    </div>
                  ) : (
                    <div className="space-y-3">
                      <p className="text-xs text-muted-foreground mb-4">
                        Média de vendas deste funcionário: <span className="text-foreground">{formatCurrency(emp.avgSale)}</span> — alertas disparados quando venda supera 3× essa média, comissão &gt; 15% da média, ou horário fora do padrão (antes das 6h ou após 22h).
                      </p>
                      {emp.suspicious.map(sale => {
                        const isHighValue = emp.avgSale > 0 && sale.total > emp.avgSale * 3;
                        const isHighCommission = emp.avgSale > 0 && sale.commission > emp.avgSale * 0.15;
                        const saleHour = new Date(sale.date).getHours();
                        const isUnusualTime = saleHour < 6 || saleHour > 22;

                        return (
                          <div key={sale.id} className="p-3 bg-red-50 border border-red-200 rounded-lg">
                            <div className="flex items-start justify-between mb-2">
                              <div>
                                <p className="text-sm font-light text-foreground">{sale.productName}</p>
                                <p className="text-xs text-muted-foreground">{formatDate(sale.date)}</p>
                              </div>
                              <div className="text-right">
                                <p className="text-sm font-light text-red-600">{formatCurrency(sale.total)}</p>
                                <p className="text-xs text-muted-foreground">comissão: {formatCurrency(sale.commission)}</p>
                              </div>
                            </div>
                            <div className="flex flex-wrap gap-1">
                              {isHighValue && (
                                <span className="text-xs px-2 py-0.5 bg-red-100 text-red-700 rounded">
                                  Valor alto ({(sale.total / emp.avgSale).toFixed(1)}× a média)
                                </span>
                              )}
                              {isHighCommission && (
                                <span className="text-xs px-2 py-0.5 bg-red-100 text-red-700 rounded">
                                  Comissão suspeita
                                </span>
                              )}
                              {isUnusualTime && (
                                <span className="text-xs px-2 py-0.5 bg-orange-100 text-orange-700 rounded">
                                  Horário incomum ({saleHour}h)
                                </span>
                              )}
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  )}
                </CardContent>
              )}
            </Card>
          );
        })}
      </div>
    </div>
  );
}
