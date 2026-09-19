import { ReactNode } from 'react';
import { LucideIcon } from 'lucide-react';
import { Card } from './Card';

interface StatCardProps {
  title: string;
  value: string | number;
  subtitle?: string;
  icon: LucideIcon;
  iconColor?: string;
  valueColor?: string;
}

export function StatCard({ title, value, subtitle, icon: Icon, iconColor = '#D4AF37', valueColor }: StatCardProps) {
  return (
    <Card className="hover:shadow-md transition-shadow duration-200">
      <div className="flex items-start justify-between mb-4">
        <p className="text-xs uppercase tracking-wider text-muted-foreground font-normal">{title}</p>
        <div className="w-8 h-8 rounded-lg bg-secondary flex items-center justify-center">
          <Icon className="w-4 h-4" style={{ color: iconColor }} />
        </div>
      </div>
      <p className={`text-2xl font-light mb-1 ${valueColor ? '' : 'text-foreground'}`} style={valueColor ? { color: valueColor } : {}}>
        {value}
      </p>
      {subtitle && (
        <p className="text-xs text-muted-foreground">{subtitle}</p>
      )}
    </Card>
  );
}
