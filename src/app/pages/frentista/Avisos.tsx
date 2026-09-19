import { Card, CardHeader, CardTitle, CardContent } from '../../components/ui/Card';
import { Bell, AlertCircle, Info, CheckCircle } from 'lucide-react';

const avisos = [
  {
    id: 1,
    tipo: 'info',
    titulo: 'Reunião de equipe',
    mensagem: 'Reunião de alinhamento amanhã às 9h na sala de reuniões',
    data: new Date('2026-05-20T09:00:00'),
    remetente: 'Administração',
  },
  {
    id: 2,
    tipo: 'success',
    titulo: 'Meta batida',
    mensagem: 'Parabéns! Você atingiu a meta mensal de vendas',
    data: new Date('2026-05-18T14:30:00'),
    remetente: 'RH',
  },
  {
    id: 3,
    tipo: 'warning',
    titulo: 'Atualização de procedimentos',
    mensagem: 'Novos procedimentos de segurança em vigor a partir de segunda-feira',
    data: new Date('2026-05-17T11:00:00'),
    remetente: 'Segurança',
  },
  {
    id: 4,
    tipo: 'info',
    titulo: 'Manutenção programada',
    mensagem: 'Sistema ficará offline no domingo das 2h às 6h para manutenção',
    data: new Date('2026-05-15T08:00:00'),
    remetente: 'TI',
  },
];

export function Avisos() {
  const getIcon = (tipo: string) => {
    switch (tipo) {
      case 'success':
        return <CheckCircle className="w-5 h-5 text-[#1B4332]" />;
      case 'warning':
        return <AlertCircle className="w-5 h-5 text-[#B8860B]" />;
      default:
        return <Info className="w-5 h-5 text-blue-600" />;
    }
  };

  const getBackgroundColor = (tipo: string) => {
    switch (tipo) {
      case 'success':
        return 'bg-[#1B4332]/10 border-[#1B4332]/20';
      case 'warning':
        return 'bg-[#B8860B]/10 border-[#B8860B]/20';
      default:
        return 'bg-blue-50 border-blue-200';
    }
  };

  return (
    <div className="p-8">
      <div className="mb-8">
        <h1 className="text-3xl font-light text-foreground mb-2">Avisos</h1>
        <p className="text-sm text-muted-foreground">
          Comunicados e notificações importantes
        </p>
      </div>

      <Card>
        <CardHeader>
          <div className="flex items-center gap-2">
            <Bell className="w-5 h-5 text-[#B8860B]" />
            <CardTitle>Avisos Recentes</CardTitle>
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {avisos.map((aviso) => (
              <div
                key={aviso.id}
                className={`p-4 rounded-lg border ${getBackgroundColor(aviso.tipo)}`}
              >
                <div className="flex items-start gap-3">
                  <div className="mt-0.5">{getIcon(aviso.tipo)}</div>
                  <div className="flex-1">
                    <div className="flex items-start justify-between mb-1">
                      <h3 className="font-light text-foreground">{aviso.titulo}</h3>
                      <span className="text-xs text-muted-foreground">
                        {aviso.data.toLocaleDateString('pt-BR')}
                      </span>
                    </div>
                    <p className="text-sm text-foreground/80 mb-2">{aviso.mensagem}</p>
                    <span className="text-xs text-muted-foreground">{aviso.remetente}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
