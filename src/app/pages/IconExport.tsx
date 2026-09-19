import { useRef } from 'react';
import {
  Activity, AlertCircle, AlertTriangle, ArrowLeft, ArrowRight,
  BarChart3, Bell, Briefcase, Calendar, CheckCircle, CheckCircle2,
  Check, ChevronDown, ChevronLeft, ChevronRight, ChevronUp,
  Circle, Database, DollarSign, Download, Edit, FileSpreadsheet,
  FileText, Filter, Fuel, GripVertical, HelpCircle, History,
  Image, Info, MessageSquare, Minus, MoreHorizontal, Package,
  PanelLeft, Paperclip, Plus, Receipt, Search, Send, Settings,
  ShieldAlert, ShoppingCart, Smile, Trash2, TrendingUp, Upload,
  User, UserCheck, UserMinus, UserX, Users, X,
} from 'lucide-react';

const ICONS: { name: string; component: React.ElementType }[] = [
  { name: 'Activity', component: Activity },
  { name: 'AlertCircle', component: AlertCircle },
  { name: 'AlertTriangle', component: AlertTriangle },
  { name: 'ArrowLeft', component: ArrowLeft },
  { name: 'ArrowRight', component: ArrowRight },
  { name: 'BarChart3', component: BarChart3 },
  { name: 'Bell', component: Bell },
  { name: 'Briefcase', component: Briefcase },
  { name: 'Calendar', component: Calendar },
  { name: 'Check', component: Check },
  { name: 'CheckCircle', component: CheckCircle },
  { name: 'CheckCircle2', component: CheckCircle2 },
  { name: 'ChevronDown', component: ChevronDown },
  { name: 'ChevronLeft', component: ChevronLeft },
  { name: 'ChevronRight', component: ChevronRight },
  { name: 'ChevronUp', component: ChevronUp },
  { name: 'Circle', component: Circle },
  { name: 'Database', component: Database },
  { name: 'DollarSign', component: DollarSign },
  { name: 'Download', component: Download },
  { name: 'Edit', component: Edit },
  { name: 'FileSpreadsheet', component: FileSpreadsheet },
  { name: 'FileText', component: FileText },
  { name: 'Filter', component: Filter },
  { name: 'Fuel', component: Fuel },
  { name: 'GripVertical', component: GripVertical },
  { name: 'HelpCircle', component: HelpCircle },
  { name: 'History', component: History },
  { name: 'Image', component: Image },
  { name: 'Info', component: Info },
  { name: 'MessageSquare', component: MessageSquare },
  { name: 'Minus', component: Minus },
  { name: 'MoreHorizontal', component: MoreHorizontal },
  { name: 'Package', component: Package },
  { name: 'PanelLeft', component: PanelLeft },
  { name: 'Paperclip', component: Paperclip },
  { name: 'Plus', component: Plus },
  { name: 'Receipt', component: Receipt },
  { name: 'Search', component: Search },
  { name: 'Send', component: Send },
  { name: 'Settings', component: Settings },
  { name: 'ShieldAlert', component: ShieldAlert },
  { name: 'ShoppingCart', component: ShoppingCart },
  { name: 'Smile', component: Smile },
  { name: 'Trash2', component: Trash2 },
  { name: 'TrendingUp', component: TrendingUp },
  { name: 'Upload', component: Upload },
  { name: 'User', component: User },
  { name: 'UserCheck', component: UserCheck },
  { name: 'UserMinus', component: UserMinus },
  { name: 'UserX', component: UserX },
  { name: 'Users', component: Users },
  { name: 'X', component: X },
];

function downloadSVG(name: string, svgElement: SVGSVGElement | null) {
  if (!svgElement) return;
  const clone = svgElement.cloneNode(true) as SVGSVGElement;
  clone.setAttribute('xmlns', 'http://www.w3.org/2000/svg');
  clone.setAttribute('width', '24');
  clone.setAttribute('height', '24');
  const serializer = new XMLSerializer();
  const svgStr = serializer.serializeToString(clone);
  const blob = new Blob([svgStr], { type: 'image/svg+xml' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = `${name}.svg`;
  a.click();
  URL.revokeObjectURL(url);
}

function downloadAll() {
  ICONS.forEach(({ name }, i) => {
    setTimeout(() => {
      const el = document.getElementById(`icon-svg-${name}`)?.querySelector('svg') as SVGSVGElement | null;
      downloadSVG(name, el);
    }, i * 80);
  });
}

function IconCard({ name, component: Icon }: { name: string; component: React.ElementType }) {
  const ref = useRef<HTMLDivElement>(null);

  const handleDownload = () => {
    const svg = ref.current?.querySelector('svg') as SVGSVGElement | null;
    downloadSVG(name, svg);
  };

  return (
    <div className="flex flex-col items-center gap-2 p-4 rounded-xl border border-border bg-card hover:border-[#D4AF37]/50 transition-colors group">
      <div id={`icon-svg-${name}`} ref={ref} className="w-10 h-10 flex items-center justify-center">
        <Icon size={28} strokeWidth={1.5} className="text-foreground" />
      </div>
      <p className="text-xs text-muted-foreground text-center leading-tight">{name}</p>
      <button
        onClick={handleDownload}
        className="text-xs px-2 py-1 rounded bg-[#D4AF37]/10 text-[#B8860B] opacity-0 group-hover:opacity-100 transition-opacity hover:bg-[#D4AF37]/20"
      >
        .svg
      </button>
    </div>
  );
}

export function IconExport() {
  return (
    <div className="min-h-screen bg-background p-8">
      <div className="max-w-5xl mx-auto">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-light text-foreground mb-1">Ícones do Projeto</h1>
            <p className="text-sm text-muted-foreground">{ICONS.length} ícones · lucide-react · passe o mouse para baixar individualmente</p>
          </div>
          <button
            onClick={downloadAll}
            className="flex items-center gap-2 px-5 py-2.5 rounded-lg bg-[#D4AF37] text-black text-sm font-light hover:bg-[#B8860B] transition-colors"
          >
            <Download size={16} />
            Baixar todos
          </button>
        </div>

        <div className="grid grid-cols-4 sm:grid-cols-6 md:grid-cols-8 lg:grid-cols-10 gap-3">
          {ICONS.map(({ name, component }) => (
            <IconCard key={name} name={name} component={component} />
          ))}
        </div>
      </div>
    </div>
  );
}
