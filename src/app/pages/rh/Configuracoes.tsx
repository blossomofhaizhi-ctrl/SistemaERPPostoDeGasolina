import { Card, CardHeader, CardTitle, CardContent } from '../../components/ui/Card';
import { Button } from '../../components/ui/Button';
import { storage } from '../../lib/storage';
import { Settings, Database, Trash2, Download, AlertTriangle } from 'lucide-react';
import { toast } from 'sonner';
import { useState } from 'react';
import { useAuth } from '../../contexts/AuthContext';
import { useData } from '../../contexts/DataContext';
import { useLog } from '../../contexts/LogContext';

export function Configuracoes() {
  const [showConfirm, setShowConfirm] = useState(false);
  const { user } = useAuth();
  const { products, sales, employees } = useData();
  const { logs } = useLog();

  const handleExportBackup = () => {
    const backup = {
      userId: user?.id,
      userName: user?.name,
      products,
      sales,
      employees,
      logs,
      exportDate: new Date().toISOString(),
    };

    const dataStr = JSON.stringify(backup, null, 2);
    const blob = new Blob([dataStr], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `backup_charlotte_${user?.name}_${new Date().toISOString().split('T')[0]}.json`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);

    toast.success('Backup criado com sucesso!');
  };

  const handleClearData = () => {
    if (!user?.id) return;

    storage.clearUserData(user.id);
    toast.success('Dados limpos! Recarregue a página.');
    setTimeout(() => {
      window.location.reload();
    }, 2000);
  };

  const getStorageSize = () => {
    let total = 0;
    for (let key in localStorage) {
      if (localStorage.hasOwnProperty(key) && key.startsWith(`charlotte_user_${user?.id}_`)) {
        total += localStorage[key].length + key.length;
      }
    }
    return (total / 1024).toFixed(2); // KB
  };

  return (
    <div className="p-8">
      <div className="mb-6">
        <h1 className="text-2xl font-light text-foreground mb-1">Configurações</h1>
        <p className="text-sm text-muted-foreground">
          Gerenciamento do banco de dados
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Informações do Banco */}
        <Card>
          <CardHeader>
            <div className="flex items-center gap-2">
              <Database className="w-5 h-5 text-[#3B82F6]" />
              <CardTitle>Banco de Dados</CardTitle>
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex justify-between items-center p-3 bg-secondary rounded-lg">
                <span className="text-sm text-muted-foreground">Tipo de armazenamento</span>
                <span className="text-sm font-light">LocalStorage</span>
              </div>
              <div className="flex justify-between items-center p-3 bg-secondary rounded-lg">
                <span className="text-sm text-muted-foreground">Espaço utilizado</span>
                <span className="text-sm font-light">{getStorageSize()} KB</span>
              </div>
              <div className="flex justify-between items-center p-3 bg-secondary rounded-lg">
                <span className="text-sm text-muted-foreground">Usuário</span>
                <span className="text-sm font-light">{user?.name}</span>
              </div>
              <div className="flex justify-between items-center p-3 bg-secondary rounded-lg">
                <span className="text-sm text-muted-foreground">Produtos cadastrados</span>
                <span className="text-sm font-light">{products?.length || 0}</span>
              </div>
              <div className="flex justify-between items-center p-3 bg-secondary rounded-lg">
                <span className="text-sm text-muted-foreground">Vendas registradas</span>
                <span className="text-sm font-light">{sales?.length || 0}</span>
              </div>
              <div className="flex justify-between items-center p-3 bg-secondary rounded-lg">
                <span className="text-sm text-muted-foreground">Funcionários</span>
                <span className="text-sm font-light">{employees?.length || 0}</span>
              </div>
              <div className="flex justify-between items-center p-3 bg-secondary rounded-lg">
                <span className="text-sm text-muted-foreground">Logs de auditoria</span>
                <span className="text-sm font-light">{logs?.length || 0}</span>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Ações */}
        <Card>
          <CardHeader>
            <div className="flex items-center gap-2">
              <Settings className="w-5 h-5 text-[#D4AF37]" />
              <CardTitle>Ações</CardTitle>
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              <div className="p-4 bg-[#3B82F6]/10 border border-[#3B82F6]/20 rounded-lg">
                <div className="flex items-start gap-3 mb-3">
                  <Download className="w-5 h-5 text-[#3B82F6] mt-0.5" />
                  <div className="flex-1">
                    <h4 className="text-sm font-light text-foreground mb-1">Fazer Backup</h4>
                    <p className="text-xs text-muted-foreground mb-3">
                      Exporta todos os dados do sistema em formato JSON
                    </p>
                  </div>
                </div>
                <Button
                  variant="primary"
                  size="sm"
                  className="w-full"
                  onClick={handleExportBackup}
                >
                  <Download className="w-4 h-4 mr-2" />
                  Criar Backup
                </Button>
              </div>

              <div className="p-4 bg-red-50 border border-red-200 rounded-lg">
                <div className="flex items-start gap-3 mb-3">
                  <AlertTriangle className="w-5 h-5 text-red-600 mt-0.5" />
                  <div className="flex-1">
                    <h4 className="text-sm font-light text-foreground mb-1">Limpar Dados</h4>
                    <p className="text-xs text-muted-foreground mb-3">
                      Remove todos os dados do sistema. Esta ação não pode ser desfeita!
                    </p>
                  </div>
                </div>
                {!showConfirm ? (
                  <Button
                    variant="outline"
                    size="sm"
                    className="w-full text-red-600 border-red-600 hover:bg-red-50"
                    onClick={() => setShowConfirm(true)}
                  >
                    <Trash2 className="w-4 h-4 mr-2" />
                    Limpar Todos os Dados
                  </Button>
                ) : (
                  <div className="space-y-2">
                    <p className="text-xs text-red-600 font-light">Tem certeza? Esta ação é irreversível!</p>
                    <div className="flex gap-2">
                      <Button
                        variant="ghost"
                        size="sm"
                        className="flex-1"
                        onClick={() => setShowConfirm(false)}
                      >
                        Cancelar
                      </Button>
                      <Button
                        size="sm"
                        className="flex-1 bg-red-600 hover:bg-red-700 text-white"
                        onClick={handleClearData}
                      >
                        Confirmar
                      </Button>
                    </div>
                  </div>
                )}
              </div>

              <div className="p-4 bg-secondary rounded-lg">
                <div className="flex items-start gap-3">
                  <Database className="w-5 h-5 text-muted-foreground mt-0.5" />
                  <div className="flex-1">
                    <h4 className="text-sm font-light text-foreground mb-1">Sobre o Armazenamento</h4>
                    <p className="text-xs text-muted-foreground">
                      Os dados são salvos localmente no seu navegador (LocalStorage).
                      Eles persistem entre sessões, mas são específicos deste navegador e dispositivo.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
