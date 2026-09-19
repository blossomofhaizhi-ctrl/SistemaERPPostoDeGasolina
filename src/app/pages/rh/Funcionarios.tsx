import { useState } from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '../../components/ui/Card';
import { Button } from '../../components/ui/Button';
import { Input } from '../../components/ui/Input';
import { Select } from '../../components/ui/Select';
import { useData } from '../../contexts/DataContext';
import { formatCurrency } from '../../lib/utils';
import { Users, UserCheck, UserX, Plus, UserMinus } from 'lucide-react';
import { toast } from 'sonner';

export function Funcionarios() {
  const { employees, addEmployee, updateEmployee } = useData();
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    role: 'Frentista',
    active: true,
  });

  const activeCount = employees.filter(e => e.active).length;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.name || !formData.email || !formData.password || !formData.role) {
      toast.error('Preencha todos os campos');
      return;
    }

    if (formData.password.length < 6) {
      toast.error('A senha deve ter no mínimo 6 caracteres');
      return;
    }

    addEmployee(formData);

    setFormData({
      name: '',
      email: '',
      password: '',
      role: 'Frentista',
      active: true,
    });

    setShowForm(false);
    toast.success('Funcionário cadastrado com sucesso!');
  };

  const handleToggleActive = (employeeId: string, currentStatus: boolean) => {
    updateEmployee(employeeId, { active: !currentStatus });
    toast.success(currentStatus ? 'Funcionário inativado' : 'Funcionário ativado');
  };

  return (
    <div className="p-8">
      <div className="mb-6 flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-light text-foreground">Funcionários</h1>
        </div>
        <Button
          variant="primary"
          onClick={() => setShowForm(!showForm)}
        >
          + Adicionar
        </Button>
      </div>

      {showForm && (
        <Card className="mb-6">
          <CardHeader>
            <CardTitle>Cadastrar Novo Funcionário</CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Input
                label="Nome Completo"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                placeholder="Ex: João Silva"
                required
              />

              <Input
                label="Email"
                type="email"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                placeholder="joao@posto.com"
                required
              />

              <Input
                label="Senha"
                type="password"
                value={formData.password}
                onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                placeholder="Mínimo 6 caracteres"
                required
              />

              <Select
                label="Cargo"
                value={formData.role}
                onChange={(e) => setFormData({ ...formData, role: e.target.value })}
                options={[
                  { value: 'Frentista', label: 'Frentista' },
                  { value: 'Gerente', label: 'Gerente' },
                  { value: 'Supervisor', label: 'Supervisor' },
                  { value: 'Operador', label: 'Operador' },
                ]}
              />

              <div className="flex items-end">
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={formData.active}
                    onChange={(e) => setFormData({ ...formData, active: e.target.checked })}
                    className="w-4 h-4 rounded border-border text-[#1B4332] focus:ring-[#B8860B]"
                  />
                  <span className="text-sm font-light">Funcionário ativo</span>
                </label>
              </div>

              <div className="md:col-span-2 flex gap-3 justify-end">
                <Button
                  type="button"
                  variant="ghost"
                  onClick={() => setShowForm(false)}
                >
                  Cancelar
                </Button>
                <Button type="submit" variant="success">
                  Cadastrar Funcionário
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
      )}

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle>Total</CardTitle>
              <div className="w-10 h-10 rounded-lg bg-[#B8860B]/10 flex items-center justify-center">
                <Users className="w-5 h-5 text-[#B8860B]" />
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <p className="text-3xl font-light text-foreground">{employees.length}</p>
            <p className="text-xs text-muted-foreground mt-1">funcionários</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle>Ativos</CardTitle>
              <div className="w-10 h-10 rounded-lg bg-[#1B4332]/10 flex items-center justify-center">
                <UserCheck className="w-5 h-5 text-[#1B4332]" />
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <p className="text-3xl font-light text-foreground">{activeCount}</p>
            <p className="text-xs text-muted-foreground mt-1">trabalhando</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle>Inativos</CardTitle>
              <div className="w-10 h-10 rounded-lg bg-red-50 flex items-center justify-center">
                <UserX className="w-5 h-5 text-red-600" />
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <p className="text-3xl font-light text-foreground">{employees.length - activeCount}</p>
            <p className="text-xs text-muted-foreground mt-1">desligados</p>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Lista de Funcionários</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-border">
                  <th className="text-left py-3 px-4 font-light text-sm text-muted-foreground">Nome</th>
                  <th className="text-left py-3 px-4 font-light text-sm text-muted-foreground">Email</th>
                  <th className="text-left py-3 px-4 font-light text-sm text-muted-foreground">Cargo</th>
                  <th className="text-right py-3 px-4 font-light text-sm text-muted-foreground">Vendas</th>
                  <th className="text-right py-3 px-4 font-light text-sm text-muted-foreground">Comissão</th>
                  <th className="text-center py-3 px-4 font-light text-sm text-muted-foreground">Status</th>
                  <th className="text-center py-3 px-4 font-light text-sm text-muted-foreground">Ações</th>
                </tr>
              </thead>
              <tbody>
                {employees.map((employee) => (
                  <tr key={employee.id} className="border-b border-border hover:bg-secondary/50 transition-colors">
                    <td className="py-3 px-4 text-sm font-light">{employee.name}</td>
                    <td className="py-3 px-4 text-sm font-light text-muted-foreground">{employee.email}</td>
                    <td className="py-3 px-4 text-sm font-light">{employee.role}</td>
                    <td className="py-3 px-4 text-sm font-light text-right">
                      {formatCurrency(employee.totalSales)}
                    </td>
                    <td className="py-3 px-4 text-sm font-light text-right text-[#1B4332]">
                      {formatCurrency(employee.totalCommission)}
                    </td>
                    <td className="py-3 px-4 text-center">
                      <span className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-light ${
                        employee.active
                          ? 'bg-[#1B4332]/10 text-[#1B4332]'
                          : 'bg-red-50 text-red-600'
                      }`}>
                        {employee.active ? 'Ativo' : 'Inativo'}
                      </span>
                    </td>
                    <td className="py-3 px-4 text-center">
                      <Button
                        size="sm"
                        variant={employee.active ? 'outline' : 'success'}
                        onClick={() => handleToggleActive(employee.id, employee.active)}
                      >
                        {employee.active ? (
                          <>
                            <UserMinus className="w-4 h-4 mr-1" />
                            Inativar
                          </>
                        ) : (
                          <>
                            <UserCheck className="w-4 h-4 mr-1" />
                            Ativar
                          </>
                        )}
                      </Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
