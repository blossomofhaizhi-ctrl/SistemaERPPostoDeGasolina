import { useState } from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '../../components/ui/Card';
import { StatCard } from '../../components/ui/StatCard';
import { Select } from '../../components/ui/Select';
import { useLog, getActionLabel, getActionColor } from '../../contexts/LogContext';
import { formatDate } from '../../lib/utils';
import { History, Filter, Users, Package, Activity } from 'lucide-react';

export function Logs() {
  const { logs } = useLog();
  const [filterAction, setFilterAction] = useState<string>('all');

  const filteredLogs = filterAction === 'all'
    ? logs
    : logs.filter(log => log.action === filterAction);

  const employeeLogs = logs.filter(l => l.action.startsWith('employee_'));
  const productLogs = logs.filter(l => l.action.startsWith('product_') || l.action === 'stock_updated');
  const stockLogs = logs.filter(l => l.action === 'stock_updated');

  return (
    <div className="p-8">
      <div className="mb-6">
        <h1 className="text-2xl font-light text-foreground">Histórico de Ações</h1>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
        <StatCard
          title="Total de Logs"
          value={logs.length}
          subtitle="registros"
          icon={History}
          iconColor="#8B5CF6"
        />

        <StatCard
          title="Funcionários"
          value={employeeLogs.length}
          subtitle="ações"
          icon={Users}
          iconColor="#EF4444"
        />

        <StatCard
          title="Produtos"
          value={productLogs.length}
          subtitle="ações"
          icon={Package}
          iconColor="#10B981"
        />

        <StatCard
          title="Ajustes Estoque"
          value={stockLogs.length}
          subtitle="alterações"
          icon={Activity}
          iconColor="#3B82F6"
        />
      </div>

      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <History className="w-5 h-5 text-[#8B5CF6]" />
              <CardTitle>Registro de Atividades</CardTitle>
            </div>
            <div className="flex items-center gap-2">
              <Filter className="w-4 h-4 text-muted-foreground" />
              <Select
                value={filterAction}
                onChange={(e) => setFilterAction(e.target.value)}
                options={[
                  { value: 'all', label: 'Todas as ações' },
                  { value: 'employee_added', label: 'Funcionário Adicionado' },
                  { value: 'employee_removed', label: 'Funcionário Removido' },
                  { value: 'employee_activated', label: 'Funcionário Ativado' },
                  { value: 'employee_deactivated', label: 'Funcionário Inativado' },
                  { value: 'product_added', label: 'Produto Adicionado' },
                  { value: 'product_removed', label: 'Produto Removido' },
                  { value: 'stock_updated', label: 'Estoque Atualizado' },
                ]}
              />
            </div>
          </div>
        </CardHeader>
        <CardContent>
          {filteredLogs.length === 0 ? (
            <p className="text-center text-muted-foreground py-8">
              Nenhum registro encontrado
            </p>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-border">
                    <th className="text-left py-3 px-4 font-normal text-xs uppercase tracking-wider text-muted-foreground">
                      Data/Hora
                    </th>
                    <th className="text-left py-3 px-4 font-normal text-xs uppercase tracking-wider text-muted-foreground">
                      Ação
                    </th>
                    <th className="text-left py-3 px-4 font-normal text-xs uppercase tracking-wider text-muted-foreground">
                      Usuário
                    </th>
                    <th className="text-left py-3 px-4 font-normal text-xs uppercase tracking-wider text-muted-foreground">
                      Item
                    </th>
                    <th className="text-left py-3 px-4 font-normal text-xs uppercase tracking-wider text-muted-foreground">
                      Detalhes
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {filteredLogs.map((log) => (
                    <tr key={log.id} className="border-b border-border hover:bg-secondary/30 transition-colors">
                      <td className="py-4 px-4 text-sm font-light text-muted-foreground">
                        {formatDate(log.timestamp)}
                      </td>
                      <td className="py-4 px-4">
                        <span
                          className="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-light"
                          style={{
                            backgroundColor: `${getActionColor(log.action)}15`,
                            color: getActionColor(log.action),
                          }}
                        >
                          {getActionLabel(log.action)}
                        </span>
                      </td>
                      <td className="py-4 px-4 text-sm font-light">
                        {log.userName}
                      </td>
                      <td className="py-4 px-4 text-sm font-light">
                        {log.details.itemName || '-'}
                      </td>
                      <td className="py-4 px-4 text-sm font-light text-muted-foreground">
                        {log.action === 'stock_updated' && log.details.oldValue !== undefined && log.details.newValue !== undefined ? (
                          <span>
                            {log.details.oldValue} → {log.details.newValue} {log.details.additionalInfo}
                          </span>
                        ) : (
                          log.details.additionalInfo || '-'
                        )}
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
