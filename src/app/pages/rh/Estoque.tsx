import { useState } from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '../../components/ui/Card';
import { StatCard } from '../../components/ui/StatCard';
import { Button } from '../../components/ui/Button';
import { Input } from '../../components/ui/Input';
import { Select } from '../../components/ui/Select';
import { useData } from '../../contexts/DataContext';
import { formatCurrency } from '../../lib/utils';
import { Package, Edit, AlertTriangle, Plus, Trash2, Fuel } from 'lucide-react';
import { toast } from 'sonner';

export function Estoque() {
  const { products, updateProduct, addProduct, deleteProduct } = useData();
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editStock, setEditStock] = useState('');
  const [activeTab, setActiveTab] = useState<'estoque' | 'produtos'>('estoque');
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    price: '',
    stock: '',
    unit: 'Litros',
    commission: '',
    minStock: '',
  });

  const lowStockProducts = products.filter(p => p.stock <= p.minStock);
  const totalValue = products.reduce((sum, p) => sum + (p.price * p.stock), 0);

  const handleEdit = (productId: string, currentStock: number) => {
    setEditingId(productId);
    setEditStock(currentStock.toString());
  };

  const handleSave = (productId: string) => {
    const newStock = parseFloat(editStock);
    if (isNaN(newStock) || newStock < 0) {
      toast.error('Valor inválido');
      return;
    }

    updateProduct(productId, { stock: newStock });
    setEditingId(null);
    toast.success('Estoque atualizado!');
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.name || !formData.price || !formData.stock || !formData.commission || !formData.minStock) {
      toast.error('Preencha todos os campos');
      return;
    }

    addProduct({
      name: formData.name,
      price: parseFloat(formData.price),
      stock: parseFloat(formData.stock),
      unit: formData.unit,
      commission: parseFloat(formData.commission),
      minStock: parseFloat(formData.minStock),
    });

    setFormData({
      name: '',
      price: '',
      stock: '',
      unit: 'Litros',
      commission: '',
      minStock: '',
    });

    setShowForm(false);
    toast.success('Produto cadastrado com sucesso!');
  };

  const handleDelete = (productId: string, productName: string) => {
    if (window.confirm(`Tem certeza que deseja remover o produto "${productName}"?`)) {
      deleteProduct(productId);
      toast.success('Produto removido com sucesso!');
    }
  };

  return (
    <div className="p-8">
      <div className="mb-6 flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-light text-foreground mb-1">Gestão de Armazém</h1>
          <p className="text-sm" style={{ color: '#C9A546' }}>
            Valor total: {formatCurrency(totalValue)}
          </p>
        </div>
        {activeTab === 'produtos' && (
          <Button
            variant="primary"
            onClick={() => setShowForm(!showForm)}
          >
            + Adicionar
          </Button>
        )}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        <StatCard
          title="Total de Produtos"
          value={products.length}
          subtitle="itens cadastrados"
          icon={Package}
          iconColor="#8B5CF6"
        />

        <StatCard
          title="Valor Total"
          value={formatCurrency(totalValue)}
          subtitle="em estoque"
          icon={Package}
          iconColor="#10B981"
          valueColor="#2D5F47"
        />

        <StatCard
          title="Alertas"
          value={lowStockProducts.length}
          subtitle="produtos baixos"
          icon={AlertTriangle}
          iconColor="#DC3545"
        />
      </div>

      {/* Tabs */}
      <div className="mb-4 flex gap-2 border-b border-border">
        <button
          onClick={() => {
            setActiveTab('estoque');
            setShowForm(false);
          }}
          className={`px-4 py-3 text-sm font-light transition-all ${
            activeTab === 'estoque'
              ? 'border-b-2 border-[#D4AF37] text-foreground'
              : 'text-muted-foreground hover:text-foreground'
          }`}
        >
          Ajuste de Estoque
        </button>
        <button
          onClick={() => {
            setActiveTab('produtos');
            setShowForm(false);
          }}
          className={`px-4 py-3 text-sm font-light transition-all ${
            activeTab === 'produtos'
              ? 'border-b-2 border-[#D4AF37] text-foreground'
              : 'text-muted-foreground hover:text-foreground'
          }`}
        >
          Produtos
        </button>
      </div>

      {/* Form de adicionar produto */}
      {activeTab === 'produtos' && showForm && (
        <Card className="mb-4">
          <CardHeader>
            <CardTitle>Adicionar Novo Produto</CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Input
                label="Nome do Produto"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                placeholder="Ex: Gasolina Premium"
                required
              />

              <Input
                label="Preço Unitário"
                type="number"
                step="0.01"
                value={formData.price}
                onChange={(e) => setFormData({ ...formData, price: e.target.value })}
                placeholder="0.00"
                required
              />

              <Input
                label="Estoque Inicial"
                type="number"
                step="0.01"
                value={formData.stock}
                onChange={(e) => setFormData({ ...formData, stock: e.target.value })}
                placeholder="0"
                required
              />

              <Select
                label="Unidade"
                value={formData.unit}
                onChange={(e) => setFormData({ ...formData, unit: e.target.value })}
                options={[
                  { value: 'Litros', label: 'Litros' },
                  { value: 'Unidades', label: 'Unidades' },
                  { value: 'Kg', label: 'Quilogramas' },
                ]}
              />

              <Input
                label="Comissão"
                type="number"
                step="0.01"
                value={formData.commission}
                onChange={(e) => setFormData({ ...formData, commission: e.target.value })}
                placeholder="0.00"
                required
              />

              <Input
                label="Estoque Mínimo"
                type="number"
                step="0.01"
                value={formData.minStock}
                onChange={(e) => setFormData({ ...formData, minStock: e.target.value })}
                placeholder="0"
                required
              />

              <div className="md:col-span-2 flex gap-3 justify-end">
                <Button
                  type="button"
                  variant="ghost"
                  onClick={() => setShowForm(false)}
                >
                  Cancelar
                </Button>
                <Button type="submit" variant="success">
                  Cadastrar Produto
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
      )}

      {/* Conteúdo da aba Estoque */}
      {activeTab === 'estoque' && (
        <Card>
        <CardHeader>
          <CardTitle>Inventário Completo</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-border">
                  <th className="text-left py-3 px-4 font-normal text-xs uppercase tracking-wider text-muted-foreground">Produto</th>
                  <th className="text-right py-3 px-4 font-normal text-xs uppercase tracking-wider text-muted-foreground">Preço/Un</th>
                  <th className="text-right py-3 px-4 font-normal text-xs uppercase tracking-wider text-muted-foreground">Estoque</th>
                  <th className="text-right py-3 px-4 font-normal text-xs uppercase tracking-wider text-muted-foreground">Comissão</th>
                  <th className="text-right py-3 px-4 font-normal text-xs uppercase tracking-wider text-muted-foreground">Val. Estoque</th>
                  <th className="text-right py-3 px-4 font-normal text-xs uppercase tracking-wider text-muted-foreground">Nível</th>
                  <th className="text-center py-3 px-4 font-normal text-xs uppercase tracking-wider text-muted-foreground">Ações</th>
                </tr>
              </thead>
              <tbody>
                {products.map((product) => {
                  const isLowStock = product.stock <= product.minStock;
                  const isEditing = editingId === product.id;
                  const stockPercentage = Math.min((product.stock / (product.minStock * 2)) * 100, 100);

                  return (
                    <tr key={product.id} className="border-b border-border hover:bg-secondary/30 transition-colors">
                      <td className="py-4 px-4 text-sm font-light">{product.name}</td>
                      <td className="py-4 px-4 text-sm font-light text-right" style={{ color: '#C9A546' }}>
                        {formatCurrency(product.price)}/{product.unit}
                      </td>
                      <td className="py-4 px-4 text-right">
                        {isEditing ? (
                          <Input
                            type="number"
                            value={editStock}
                            onChange={(e) => setEditStock(e.target.value)}
                            className="w-24 text-right text-sm"
                            step="0.01"
                          />
                        ) : (
                          <span className="text-sm font-light">
                            {product.stock.toLocaleString()} {product.unit}
                          </span>
                        )}
                      </td>
                      <td className="py-4 px-4 text-sm font-light text-right">{product.commission}%</td>
                      <td className="py-4 px-4 text-sm font-light text-right" style={{ color: '#2D5F47' }}>
                        {formatCurrency(product.price * product.stock)}
                      </td>
                      <td className="py-4 px-4">
                        <div className="flex items-center gap-2">
                          <div className="flex-1 h-1.5 bg-secondary rounded-full overflow-hidden">
                            <div
                              className="h-full rounded-full transition-all duration-300"
                              style={{
                                width: `${stockPercentage}%`,
                                backgroundColor: '#0A3D2E'
                              }}
                            />
                          </div>
                          <span className="text-xs font-light text-muted-foreground w-10 text-right">
                            {Math.round(stockPercentage)}%
                          </span>
                        </div>
                      </td>
                      <td className="py-4 px-4 text-center">
                        {isEditing ? (
                          <div className="flex items-center justify-center gap-2">
                            <Button
                              size="sm"
                              variant="success"
                              onClick={() => handleSave(product.id)}
                            >
                              Salvar
                            </Button>
                            <Button
                              size="sm"
                              variant="ghost"
                              onClick={() => setEditingId(null)}
                            >
                              Cancelar
                            </Button>
                          </div>
                        ) : (
                          <Button
                            size="sm"
                            variant="ghost"
                            onClick={() => handleEdit(product.id, product.stock)}
                          >
                            <Edit className="w-4 h-4" />
                          </Button>
                        )}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
      )}

      {/* Conteúdo da aba Produtos */}
      {activeTab === 'produtos' && (
        <Card>
          <CardHeader>
            <CardTitle>Inventário Completo</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-border">
                    <th className="text-left py-3 px-4 font-normal text-xs uppercase tracking-wider text-muted-foreground">Produto</th>
                    <th className="text-right py-3 px-4 font-normal text-xs uppercase tracking-wider text-muted-foreground">Preço/Un</th>
                    <th className="text-right py-3 px-4 font-normal text-xs uppercase tracking-wider text-muted-foreground">Estoque</th>
                    <th className="text-right py-3 px-4 font-normal text-xs uppercase tracking-wider text-muted-foreground">Comissão</th>
                    <th className="text-right py-3 px-4 font-normal text-xs uppercase tracking-wider text-muted-foreground">Val. Estoque</th>
                    <th className="text-right py-3 px-4 font-normal text-xs uppercase tracking-wider text-muted-foreground">Nível</th>
                    <th className="text-center py-3 px-4 font-normal text-xs uppercase tracking-wider text-muted-foreground">Ações</th>
                  </tr>
                </thead>
                <tbody>
                  {products.map((product) => {
                    const stockPercentage = Math.min((product.stock / (product.minStock * 2)) * 100, 100);

                    return (
                      <tr key={product.id} className="border-b border-border hover:bg-secondary/30 transition-colors">
                        <td className="py-4 px-4 text-sm font-light">{product.name}</td>
                        <td className="py-4 px-4 text-sm font-light text-right" style={{ color: '#C9A546' }}>
                          {formatCurrency(product.price)}/{product.unit}
                        </td>
                        <td className="py-4 px-4 text-sm font-light text-right">
                          {product.stock.toLocaleString()} {product.unit}
                        </td>
                        <td className="py-4 px-4 text-sm font-light text-right">
                          {product.unit === 'Litros' ? `${product.commission}%` : formatCurrency(product.commission)}
                        </td>
                        <td className="py-4 px-4 text-sm font-light text-right" style={{ color: '#2D5F47' }}>
                          {formatCurrency(product.price * product.stock)}
                        </td>
                        <td className="py-4 px-4">
                          <div className="flex items-center gap-2">
                            <div className="flex-1 h-1.5 bg-secondary rounded-full overflow-hidden">
                              <div
                                className="h-full rounded-full transition-all duration-300"
                                style={{
                                  width: `${stockPercentage}%`,
                                  backgroundColor: '#0A3D2E'
                                }}
                              />
                            </div>
                            <span className="text-xs font-light text-muted-foreground w-10 text-right">
                              {Math.round(stockPercentage)}%
                            </span>
                          </div>
                        </td>
                        <td className="py-4 px-4 text-center">
                          <Button
                            size="sm"
                            variant="ghost"
                            onClick={() => handleDelete(product.id, product.name)}
                            className="text-red-600 hover:bg-red-50"
                          >
                            <Trash2 className="w-4 h-4" />
                          </Button>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
