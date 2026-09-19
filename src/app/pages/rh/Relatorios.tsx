import { useState, useRef } from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '../../components/ui/Card';
import { useData } from '../../contexts/DataContext';
import { formatCurrency, formatDate } from '../../lib/utils';
import { FileText, Download, FileSpreadsheet, HelpCircle, CheckCircle2, Upload, X } from 'lucide-react';
import { Button } from '../../components/ui/Button';
import { toast } from 'sonner';

export function Relatorios() {
  const { sales, employees, products, addProduct, addEmployee } = useData();
  const [showInstructions, setShowInstructions] = useState(false);
  const [showImportModal, setShowImportModal] = useState(false);
  const [importType, setImportType] = useState<'products' | 'employees' | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const totalRevenue = sales.reduce((sum, sale) => sum + sale.total, 0);
  const totalCommissions = sales.reduce((sum, sale) => sum + sale.commission, 0);

  const productSales = products.map(product => {
    const productSalesList = sales.filter(s => s.productId === product.id);
    const totalSold = productSalesList.reduce((sum, s) => sum + s.quantity, 0);
    const revenue = productSalesList.reduce((sum, s) => sum + s.total, 0);

    return {
      name: product.name,
      quantity: totalSold,
      revenue,
    };
  }).filter(p => p.quantity > 0)
    .sort((a, b) => b.revenue - a.revenue);

  const convertToCSV = (data: any[], headers: string[]) => {
    const csvRows = [];
    csvRows.push(headers.join(','));

    for (const row of data) {
      csvRows.push(Object.values(row).join(','));
    }

    return csvRows.join('\n');
  };

  const downloadCSV = (csvContent: string, filename: string) => {
    const blob = new Blob(['﻿' + csvContent], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    const url = URL.createObjectURL(blob);
    link.setAttribute('href', url);
    link.setAttribute('download', filename);
    link.style.visibility = 'hidden';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const handleExportSummary = () => {
    const data = [
      {
        'Total de Vendas': sales.length,
        'Faturamento Total': totalRevenue.toFixed(2),
        'Comissões Pagas': totalCommissions.toFixed(2),
        'Funcionários Ativos': employees.filter(e => e.active).length,
        'Produtos Cadastrados': products.length,
      }
    ];

    const csv = convertToCSV(data, [
      'Total de Vendas',
      'Faturamento Total',
      'Comissões Pagas',
      'Funcionários Ativos',
      'Produtos Cadastrados'
    ]);

    downloadCSV(csv, `resumo_geral_${new Date().toISOString().split('T')[0]}.csv`);
    toast.success('Resumo exportado com sucesso!');
  };

  const handleExportProducts = () => {
    const data = productSales.map(p => ({
      'Produto': p.name,
      'Quantidade Vendida': p.quantity,
      'Faturamento': p.revenue.toFixed(2),
    }));

    const csv = convertToCSV(data, ['Produto', 'Quantidade Vendida', 'Faturamento']);
    downloadCSV(csv, `vendas_por_produto_${new Date().toISOString().split('T')[0]}.csv`);
    toast.success('Relatório de produtos exportado!');
  };

  const handleExportTransactions = () => {
    const data = sales.slice().reverse().map(sale => ({
      'Data': new Date(sale.date).toLocaleString('pt-BR'),
      'Produto': sale.productName,
      'Funcionário': sale.employeeName,
      'Quantidade': sale.quantity,
      'Valor': sale.total.toFixed(2),
      'Comissão': sale.commission.toFixed(2),
    }));

    const csv = convertToCSV(data, ['Data', 'Produto', 'Funcionário', 'Quantidade', 'Valor', 'Comissão']);
    downloadCSV(csv, `transacoes_${new Date().toISOString().split('T')[0]}.csv`);
    toast.success('Transações exportadas com sucesso!');
  };

  const handleImportClick = (type: 'products' | 'employees') => {
    setImportType(type);
    setShowImportModal(true);
  };

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (event) => {
      const text = event.target?.result as string;
      parseCSV(text);
    };
    reader.readAsText(file);
  };

  const parseCSV = (text: string) => {
    const lines = text.split('\n').filter(line => line.trim());
    if (lines.length < 2) {
      toast.error('Arquivo CSV vazio ou inválido');
      return;
    }

    const headers = lines[0].split(',').map(h => h.trim().replace(/['"]/g, ''));
    let successCount = 0;
    let errorCount = 0;

    if (importType === 'products') {
      for (let i = 1; i < lines.length; i++) {
        try {
          const values = lines[i].split(',').map(v => v.trim().replace(/['"]/g, ''));
          const product = {
            name: values[0],
            price: parseFloat(values[1]),
            stock: parseFloat(values[2]),
            unit: values[3] || 'Unidades',
            commission: parseFloat(values[4]),
            minStock: parseFloat(values[5]),
          };

          if (product.name && !isNaN(product.price) && !isNaN(product.stock)) {
            addProduct(product);
            successCount++;
          } else {
            errorCount++;
          }
        } catch (error) {
          errorCount++;
        }
      }
    } else if (importType === 'employees') {
      for (let i = 1; i < lines.length; i++) {
        try {
          const values = lines[i].split(',').map(v => v.trim().replace(/['"]/g, ''));
          const employee = {
            name: values[0],
            email: values[1],
            role: values[2],
            active: values[3]?.toLowerCase() === 'true' || values[3] === '1',
          };

          if (employee.name && employee.email) {
            addEmployee(employee);
            successCount++;
          } else {
            errorCount++;
          }
        } catch (error) {
          errorCount++;
        }
      }
    }

    setShowImportModal(false);
    if (successCount > 0) {
      toast.success(`${successCount} item(ns) importado(s) com sucesso!`);
    }
    if (errorCount > 0) {
      toast.error(`${errorCount} item(ns) com erro foram ignorados`);
    }

    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const downloadTemplate = (type: 'products' | 'employees') => {
    let csv = '';
    let filename = '';

    if (type === 'products') {
      csv = 'Nome,Preço,Estoque,Unidade,Comissão,Estoque Mínimo\nGasolina Premium,6.50,1000,Litros,0.08,500\nÓleo Motor,45.90,50,Unidades,2.50,20';
      filename = 'modelo_produtos.csv';
    } else {
      csv = 'Nome,Email,Cargo,Ativo\nJoão Silva,joao@posto.com,Frentista,true\nMaria Santos,maria@posto.com,Gerente,true';
      filename = 'modelo_funcionarios.csv';
    }

    downloadCSV(csv, filename);
    toast.success('Modelo baixado! Use-o como referência.');
  };

  return (
    <div className="p-8">
      <div className="mb-6 flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-light text-foreground">Relatórios</h1>
        </div>
        <Button
          variant="outline"
          size="sm"
          onClick={() => setShowInstructions(!showInstructions)}
        >
          <HelpCircle className="w-4 h-4 mr-2" />
          Como usar
        </Button>
      </div>

      {/* Instruções de Exportação */}
      {showInstructions && (
        <Card className="mb-6 bg-[#D4AF37]/5 border-[#D4AF37]/20">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <FileSpreadsheet className="w-5 h-5 text-[#D4AF37]" />
              Guia de Exportação de Dados
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div>
                <h4 className="text-sm font-light mb-2 flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-[#10B981]" />
                  Passo 1: Escolha o relatório
                </h4>
                <p className="text-sm text-muted-foreground ml-6">
                  Clique no botão "Exportar" do relatório desejado (Resumo Geral, Vendas por Produto ou Transações)
                </p>
              </div>

              <div>
                <h4 className="text-sm font-light mb-2 flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-[#10B981]" />
                  Passo 2: Arquivo será baixado
                </h4>
                <p className="text-sm text-muted-foreground ml-6">
                  O arquivo CSV será automaticamente baixado para sua pasta de Downloads
                </p>
              </div>

              <div>
                <h4 className="text-sm font-light mb-2 flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-[#10B981]" />
                  Passo 3: Abrir no Excel/Google Sheets
                </h4>
                <p className="text-sm text-muted-foreground ml-6 mb-2">
                  <strong>Excel:</strong> Clique com botão direito no arquivo → Abrir com → Microsoft Excel
                </p>
                <p className="text-sm text-muted-foreground ml-6 mb-2">
                  <strong>Google Sheets:</strong> Acesse sheets.google.com → Arquivo → Importar → Upload → Selecione o CSV
                </p>
              </div>

              <div>
                <h4 className="text-sm font-light mb-2 flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-[#10B981]" />
                  Passo 4: Configurar formatação (se necessário)
                </h4>
                <p className="text-sm text-muted-foreground ml-6">
                  Ao abrir no Excel, vá em "Dados" → "Texto para Colunas" → Delimitado → Vírgula → Concluir
                </p>
              </div>

              <div className="pt-3 border-t border-border">
                <p className="text-xs text-muted-foreground">
                  💡 <strong>Dica:</strong> Os valores monetários já vêm formatados. Para análises avançadas, você pode criar tabelas dinâmicas e gráficos diretamente no Excel ou Google Sheets.
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Modal de Importação */}
      {showImportModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <Card className="max-w-2xl w-full">
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle>Importar {importType === 'products' ? 'Produtos' : 'Funcionários'}</CardTitle>
                <button
                  onClick={() => setShowImportModal(false)}
                  className="p-1 rounded-lg hover:bg-secondary transition-colors"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="p-4 bg-[#D4AF37]/10 border border-[#D4AF37]/20 rounded-lg">
                  <h4 className="text-sm font-light mb-2 flex items-center gap-2">
                    <HelpCircle className="w-4 h-4 text-[#D4AF37]" />
                    Formato do Arquivo CSV
                  </h4>
                  {importType === 'products' ? (
                    <div className="text-sm text-muted-foreground space-y-1 ml-6">
                      <p>Colunas necessárias (nesta ordem):</p>
                      <p>1. Nome do produto</p>
                      <p>2. Preço (use ponto para decimal, ex: 5.90)</p>
                      <p>3. Estoque inicial</p>
                      <p>4. Unidade (Litros, Unidades, Kg, etc.)</p>
                      <p>5. Comissão (valor ou percentual)</p>
                      <p>6. Estoque mínimo</p>
                    </div>
                  ) : (
                    <div className="text-sm text-muted-foreground space-y-1 ml-6">
                      <p>Colunas necessárias (nesta ordem):</p>
                      <p>1. Nome completo</p>
                      <p>2. Email</p>
                      <p>3. Cargo</p>
                      <p>4. Ativo (true ou false)</p>
                    </div>
                  )}
                </div>

                <div className="flex gap-3">
                  <Button
                    variant="outline"
                    className="flex-1"
                    onClick={() => downloadTemplate(importType!)}
                  >
                    <Download className="w-4 h-4 mr-2" />
                    Baixar Modelo
                  </Button>
                  <Button
                    variant="primary"
                    className="flex-1"
                    onClick={() => fileInputRef.current?.click()}
                  >
                    <Upload className="w-4 h-4 mr-2" />
                    Selecionar Arquivo
                  </Button>
                </div>

                <input
                  ref={fileInputRef}
                  type="file"
                  accept=".csv"
                  onChange={handleFileSelect}
                  className="hidden"
                />

                <div className="pt-3 border-t border-border">
                  <p className="text-xs text-muted-foreground">
                    💡 <strong>Dica:</strong> Baixe o modelo, preencha com seus dados no Excel/Sheets e depois importe o arquivo.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      )}

      {/* Seção de Exportação e Importação */}
      <div className="mb-6">
        <h2 className="text-lg font-light text-foreground mb-4">Exportar Dados</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card className="hover:shadow-md transition-shadow">
          <CardContent className="p-6">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-12 h-12 rounded-lg bg-[#10B981]/10 flex items-center justify-center">
                <FileSpreadsheet className="w-6 h-6 text-[#10B981]" />
              </div>
              <div>
                <h3 className="text-sm font-light text-foreground">Resumo Geral</h3>
                <p className="text-xs text-muted-foreground">Dados consolidados</p>
              </div>
            </div>
            <Button
              variant="primary"
              size="sm"
              className="w-full"
              onClick={handleExportSummary}
            >
              <Download className="w-4 h-4 mr-2" />
              Exportar CSV
            </Button>
          </CardContent>
        </Card>

        <Card className="hover:shadow-md transition-shadow">
          <CardContent className="p-6">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-12 h-12 rounded-lg bg-[#3B82F6]/10 flex items-center justify-center">
                <FileSpreadsheet className="w-6 h-6 text-[#3B82F6]" />
              </div>
              <div>
                <h3 className="text-sm font-light text-foreground">Vendas por Produto</h3>
                <p className="text-xs text-muted-foreground">Análise de produtos</p>
              </div>
            </div>
            <Button
              variant="primary"
              size="sm"
              className="w-full"
              onClick={handleExportProducts}
            >
              <Download className="w-4 h-4 mr-2" />
              Exportar CSV
            </Button>
          </CardContent>
        </Card>

        <Card className="hover:shadow-md transition-shadow">
          <CardContent className="p-6">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-12 h-12 rounded-lg bg-[#8B5CF6]/10 flex items-center justify-center">
                <FileSpreadsheet className="w-6 h-6 text-[#8B5CF6]" />
              </div>
              <div>
                <h3 className="text-sm font-light text-foreground">Todas Transações</h3>
                <p className="text-xs text-muted-foreground">Histórico completo</p>
              </div>
            </div>
            <Button
              variant="primary"
              size="sm"
              className="w-full"
              onClick={handleExportTransactions}
            >
              <Download className="w-4 h-4 mr-2" />
              Exportar CSV
            </Button>
          </CardContent>
        </Card>
        </div>
      </div>

      {/* Seção de Importação */}
      <div className="mb-6">
        <h2 className="text-lg font-light text-foreground mb-4">Importar Dados</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Card className="hover:shadow-md transition-shadow">
            <CardContent className="p-6">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-12 h-12 rounded-lg bg-[#8B5CF6]/10 flex items-center justify-center">
                  <Upload className="w-6 h-6 text-[#8B5CF6]" />
                </div>
                <div>
                  <h3 className="text-sm font-light text-foreground">Importar Produtos</h3>
                  <p className="text-xs text-muted-foreground">Adicionar via CSV</p>
                </div>
              </div>
              <Button
                variant="primary"
                size="sm"
                className="w-full"
                onClick={() => handleImportClick('products')}
              >
                <Upload className="w-4 h-4 mr-2" />
                Importar CSV
              </Button>
            </CardContent>
          </Card>

          <Card className="hover:shadow-md transition-shadow">
            <CardContent className="p-6">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-12 h-12 rounded-lg bg-[#EF4444]/10 flex items-center justify-center">
                  <Upload className="w-6 h-6 text-[#EF4444]" />
                </div>
                <div>
                  <h3 className="text-sm font-light text-foreground">Importar Funcionários</h3>
                  <p className="text-xs text-muted-foreground">Adicionar via CSV</p>
                </div>
              </div>
              <Button
                variant="primary"
                size="sm"
                className="w-full"
                onClick={() => handleImportClick('employees')}
              >
                <Upload className="w-4 h-4 mr-2" />
                Importar CSV
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
        <Card>
          <CardHeader>
            <CardTitle>Resumo Geral</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex justify-between items-center p-3 bg-secondary rounded-lg">
                <span className="text-sm text-muted-foreground">Total de Vendas</span>
                <span className="text-sm font-light">{sales.length}</span>
              </div>
              <div className="flex justify-between items-center p-3 bg-secondary rounded-lg">
                <span className="text-sm text-muted-foreground">Faturamento Total</span>
                <span className="text-sm font-light text-[#1B4332]">{formatCurrency(totalRevenue)}</span>
              </div>
              <div className="flex justify-between items-center p-3 bg-secondary rounded-lg">
                <span className="text-sm text-muted-foreground">Comissões Pagas</span>
                <span className="text-sm font-light">{formatCurrency(totalCommissions)}</span>
              </div>
              <div className="flex justify-between items-center p-3 bg-secondary rounded-lg">
                <span className="text-sm text-muted-foreground">Funcionários Ativos</span>
                <span className="text-sm font-light">{employees.filter(e => e.active).length}</span>
              </div>
              <div className="flex justify-between items-center p-3 bg-secondary rounded-lg">
                <span className="text-sm text-muted-foreground">Produtos Cadastrados</span>
                <span className="text-sm font-light">{products.length}</span>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Vendas por Produto</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3 max-h-80 overflow-y-auto">
              {productSales.map((product) => (
                <div key={product.name} className="p-3 bg-secondary rounded-lg">
                  <div className="flex justify-between items-center mb-1">
                    <span className="text-sm font-light">{product.name}</span>
                    <span className="text-sm font-light text-[#1B4332]">
                      {formatCurrency(product.revenue)}
                    </span>
                  </div>
                  <p className="text-xs text-muted-foreground">
                    {product.quantity} unidades vendidas
                  </p>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <div className="flex items-center gap-2">
            <FileText className="w-5 h-5 text-[#8B5CF6]" />
            <CardTitle>Últimas Transações</CardTitle>
          </div>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-border">
                  <th className="text-left py-3 px-4 font-light text-sm text-muted-foreground">Data</th>
                  <th className="text-left py-3 px-4 font-light text-sm text-muted-foreground">Produto</th>
                  <th className="text-left py-3 px-4 font-light text-sm text-muted-foreground">Funcionário</th>
                  <th className="text-right py-3 px-4 font-light text-sm text-muted-foreground">Quantidade</th>
                  <th className="text-right py-3 px-4 font-light text-sm text-muted-foreground">Valor</th>
                  <th className="text-right py-3 px-4 font-light text-sm text-muted-foreground">Comissão</th>
                </tr>
              </thead>
              <tbody>
                {sales.slice().reverse().slice(0, 20).map((sale) => (
                  <tr key={sale.id} className="border-b border-border hover:bg-secondary/50 transition-colors">
                    <td className="py-3 px-4 text-sm font-light">{formatDate(sale.date)}</td>
                    <td className="py-3 px-4 text-sm font-light">{sale.productName}</td>
                    <td className="py-3 px-4 text-sm font-light">{sale.employeeName}</td>
                    <td className="py-3 px-4 text-sm font-light text-right">{sale.quantity}</td>
                    <td className="py-3 px-4 text-sm font-light text-right">
                      {formatCurrency(sale.total)}
                    </td>
                    <td className="py-3 px-4 text-sm font-light text-right text-[#1B4332]">
                      {formatCurrency(sale.commission)}
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
