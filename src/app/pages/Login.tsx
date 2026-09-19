import { useState } from 'react';
import { useNavigate } from 'react-router';
import { User, Briefcase, AlertCircle } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import { Button } from '../components/ui/Button';
import { Input } from '../components/ui/Input';
import { Logo } from '../components/ui/Logo';
import { cn } from '../lib/utils';
import { toast } from 'sonner';

export function Login() {
  const [selectedRole, setSelectedRole] = useState<'frentista' | 'rh'>('frentista');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const { login } = useAuth();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    const result = login(email, password, selectedRole);

    if (result.success) {
      toast.success('Login realizado com sucesso!');
      navigate('/dashboard');
    } else {
      setError(result.error || 'Erro ao fazer login');
      toast.error(result.error || 'Erro ao fazer login');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-[#0A3D2E] via-[#0F4A39] to-[#0A3D2E] p-4">
      <div className="w-full max-w-md">
        <div className="bg-card rounded-2xl shadow-2xl border border-border/10 p-8">
          <div className="flex flex-col items-center mb-8">
            <div className="mb-6">
              <Logo size="lg" showText={true} />
            </div>
          </div>

          <div className="mb-6">
            <p className="text-xs text-muted-foreground mb-3 text-center">Selecione seu perfil</p>
            <div className="grid grid-cols-2 gap-3">
              <button
                type="button"
                onClick={() => setSelectedRole('frentista')}
                className={cn(
                  'flex flex-col items-center gap-2 p-4 rounded-lg border-2 transition-all duration-200',
                  selectedRole === 'frentista'
                    ? 'border-[#D4AF37] bg-[#D4AF37]/5'
                    : 'border-border hover:border-[#D4AF37]/30'
                )}
              >
                <User className={cn(
                  'w-6 h-6',
                  selectedRole === 'frentista' ? 'text-[#D4AF37]' : 'text-muted-foreground'
                )} />
                <span className={cn(
                  'text-sm font-light',
                  selectedRole === 'frentista' ? 'text-[#D4AF37]' : 'text-foreground'
                )}>
                  Frentista
                </span>
              </button>

              <button
                type="button"
                onClick={() => setSelectedRole('rh')}
                className={cn(
                  'flex flex-col items-center gap-2 p-4 rounded-lg border-2 transition-all duration-200',
                  selectedRole === 'rh'
                    ? 'border-[#D4AF37] bg-[#D4AF37]/5'
                    : 'border-border hover:border-[#D4AF37]/30'
                )}
              >
                <Briefcase className={cn(
                  'w-6 h-6',
                  selectedRole === 'rh' ? 'text-[#D4AF37]' : 'text-muted-foreground'
                )} />
                <span className={cn(
                  'text-sm font-light',
                  selectedRole === 'rh' ? 'text-[#D4AF37]' : 'text-foreground'
                )}>
                  RH / Admin
                </span>
              </button>
            </div>
          </div>

          {error && (
            <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-lg flex items-center gap-2">
              <AlertCircle className="w-4 h-4 text-red-600 flex-shrink-0" />
              <p className="text-sm text-red-600">{error}</p>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            <Input
              type="email"
              placeholder="seu@email.com"
              label="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />

            <Input
              type="password"
              placeholder="••••••••"
              label="Senha"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />

            <Button type="submit" variant="primary" className="w-full mt-6">
              Entrar
            </Button>
          </form>

        </div>
      </div>
    </div>
  );
}
