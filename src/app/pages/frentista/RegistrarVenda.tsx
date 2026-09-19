import { useState } from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '../../components/ui/Card';
import { Button } from '../../components/ui/Button';
import { Input } from '../../components/ui/Input';
import { Select } from '../../components/ui/Select';
import { useAuth } from '../../contexts/AuthContext';
import { useData } from '../../contexts/DataContext';
import { formatCurrency } from '../../lib/utils';
import { ShoppingCart, CheckCircle } from 'lucide-react';
import { toast } from 'sonner';

export function RegistrarVenda() {
  const { user } = useAuth();
  const { products, addSale } = useData();
  const [selectedProductId, setSelectedProductId] = useState(products[0]?.id || '');
  const [quantity, setQuantity] = useState('');
  const [showSuccess, setShowSuccess] = useState(false);

  const selectedProduct = products.find(p => p.id === selectedProductId);
  const total = selectedProduct && quantity ? selectedProduct.price * parseFloat(quantity) : 0;
  const commission = selectedProduct && quantity
    ? selectedProduct.unit === 'Litros'
      ? selectedProduct.commission * parseFloat(quantity)
      : selectedProduct.commission
    : 0;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!selectedProduct || !quantity) {
      toast.error('Preencha todos os campos');
      return;
    }

    const qty = parseFloat(quantity);
    if (qty <= 0) {
      toast.error('Quantidade deve ser maior que zero');
      return;
    }

    if (qty > selectedProduct.stock) {
      toast.error('Estoque insuficiente');
      return;
    }

    addSale({
      productId: selectedProduct.id,
      productName: selectedProduct.name,
      quantity: qty,
      total,
      commission,
      employeeId: user?.id || '',
      employeeName: user?.name || '',
    });

    setShowSuccess(true);
    setQuantity('');
    toast.success('Venda registrada com sucesso!');

    setTimeout(() => {
      setShowSuccess(false);
    }, 3000);
  };

  return (
    <div className="p-8">
      <div className="mb-8">
        <h1 className="text-3xl font-light text-foreground mb-2">Registrar Venda</h1>
        <p className="text-sm text-muted-foreground">
          Cadastre uma nova transação
        </p>
      </div>

      <div className="max-w-2xl mx-auto">
        <Card>
          <CardHeader>
            <div className="flex items-center gap-2">
              <ShoppingCart className="w-5 h-5 text-[#B8860B]" />
              <CardTitle>Nova Venda</CardTitle>
            </div>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-6">
              <Select
                label="Produto"
                value={selectedProductId}
                onChange={(e) => setSelectedProductId(e.target.value)}
                options={products.map(p => ({
                  value: p.id,
                  label: `${p.name} - ${formatCurrency(p.price)}/${p.unit}`,
                }))}
              />

              {selectedProduct && (
                <div className="p-4 bg-secondary rounded-lg space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Estoque disponível:</span>
                    <span className="font-light">{selectedProduct.stock} {selectedProduct.unit}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Preço unitário:</span>
                    <span className="font-light">{formatCurrency(selectedProduct.price)}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Comissão:</span>
                    <span className="font-light text-[#1B4332]">
                      {selectedProduct.unit === 'Litros'
                        ? `${formatCurrency(selectedProduct.commission)}/litro`
                        : formatCurrency(selectedProduct.commission)
                      }
                    </span>
                  </div>
                </div>
              )}

              <Input
                type="number"
                label="Quantidade"
                placeholder="0"
                value={quantity}
                onChange={(e) => setQuantity(e.target.value)}
                step="0.01"
                min="0.01"
                required
              />

              {quantity && selectedProduct && (
                <div className="p-6 bg-gradient-to-br from-[#1B4332]/10 to-[#2D5F47]/10 rounded-xl border border-[#1B4332]/20">
                  <div className="space-y-3">
                    <div className="flex justify-between items-center">
                      <span className="text-muted-foreground">Valor Total:</span>
                      <span className="text-2xl font-light text-foreground">{formatCurrency(total)}</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-muted-foreground">Sua Comissão:</span>
                      <span className="text-xl font-light text-[#1B4332]">{formatCurrency(commission)}</span>
                    </div>
                  </div>
                </div>
              )}

              <Button type="submit" variant="success" className="w-full">
                Registrar Venda
              </Button>
            </form>

            {showSuccess && (
              <div className="mt-4 p-4 bg-[#1B4332]/10 border border-[#1B4332]/20 rounded-lg flex items-center gap-3">
                <CheckCircle className="w-5 h-5 text-[#1B4332]" />
                <span className="text-sm font-light text-[#1B4332]">
                  Venda registrada com sucesso!
                </span>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
