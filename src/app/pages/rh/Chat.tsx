import { useState, useRef, useEffect } from 'react';
import { Card } from '../../components/ui/Card';
import { useAuth } from '../../contexts/AuthContext';
import { MessageSquare, Send, Users, Image, Paperclip, Smile } from 'lucide-react';

interface Message {
  id: string;
  author: string;
  content: string;
  timestamp: Date;
}

const initialMessages: Message[] = [
  {
    id: '1',
    author: 'Maria Santos',
    content: 'Bom dia, equipe! Lembrete da reunião às 9h amanhã.',
    timestamp: new Date('2026-05-19T08:30:00'),
  },
  {
    id: '2',
    author: 'Pedro Costa',
    content: 'Alguém pode cobrir meu turno na sexta? Preciso sair mais cedo.',
    timestamp: new Date('2026-05-19T10:15:00'),
  },
  {
    id: '3',
    author: 'João Silva',
    content: 'Eu posso cobrir, Pedro!',
    timestamp: new Date('2026-05-19T10:20:00'),
  },
];

const onlineUsers = [
  { name: 'Maria Santos', status: 'online' },
  { name: 'Pedro Costa', status: 'online' },
  { name: 'João Silva', status: 'away' },
  { name: 'Ana Paula', status: 'offline' },
];

export function Chat() {
  const { user } = useAuth();
  const [messages, setMessages] = useState<Message[]>(initialMessages);
  const [newMessage, setNewMessage] = useState('');
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSend = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newMessage.trim()) return;

    const message: Message = {
      id: Date.now().toString(),
      author: user?.name || 'Você',
      content: newMessage,
      timestamp: new Date(),
    };

    setMessages([...messages, message]);
    setNewMessage('');
  };

  const getInitials = (name: string) => {
    return name
      .split(' ')
      .map(n => n[0])
      .slice(0, 2)
      .join('')
      .toUpperCase();
  };

  return (
    <div className="p-8 h-screen flex flex-col">
      <div className="mb-6">
        <h1 className="text-2xl font-light text-foreground">Chat da Equipe</h1>
      </div>

      <div className="flex-1 flex gap-4 overflow-hidden">
        {/* Chat Principal */}
        <Card className="flex-1 flex flex-col overflow-hidden">
          {/* Header do Chat */}
          <div className="p-4 border-b border-border flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-[#0A3D2E] flex items-center justify-center">
                <MessageSquare className="w-5 h-5 text-[#D4AF37]" />
              </div>
              <div>
                <h3 className="text-sm font-light text-foreground">Equipe Geral</h3>
                <p className="text-xs text-muted-foreground">{onlineUsers.filter(u => u.status === 'online').length} online</p>
              </div>
            </div>
          </div>

          {/* Mensagens */}
          <div className="flex-1 overflow-y-auto p-4 space-y-4">
            {messages.map((message, index) => {
              const isCurrentUser = message.author === user?.name;
              const showAvatar = index === 0 || messages[index - 1].author !== message.author;

              return (
                <div
                  key={message.id}
                  className={`flex gap-3 ${isCurrentUser ? 'flex-row-reverse' : ''}`}
                >
                  {showAvatar ? (
                    <div
                      className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-light flex-shrink-0 ${
                        isCurrentUser
                          ? 'bg-[#D4AF37] text-[#0A3D2E]'
                          : 'bg-[#0A3D2E] text-[#A8E6CF]'
                      }`}
                    >
                      {getInitials(message.author)}
                    </div>
                  ) : (
                    <div className="w-8" />
                  )}

                  <div className={`flex flex-col ${isCurrentUser ? 'items-end' : 'items-start'} max-w-[70%]`}>
                    {showAvatar && !isCurrentUser && (
                      <span className="text-xs font-light text-foreground mb-1">{message.author}</span>
                    )}
                    <div
                      className={`px-4 py-2 rounded-2xl ${
                        isCurrentUser
                          ? 'bg-[#D4AF37] text-[#0A3D2E]'
                          : 'bg-secondary text-foreground'
                      }`}
                    >
                      <p className="text-sm font-light">{message.content}</p>
                    </div>
                    <span className="text-xs text-muted-foreground mt-1">
                      {message.timestamp.toLocaleTimeString('pt-BR', {
                        hour: '2-digit',
                        minute: '2-digit',
                      })}
                    </span>
                  </div>
                </div>
              );
            })}
            <div ref={messagesEndRef} />
          </div>

          {/* Input de Mensagem */}
          <div className="p-4 border-t border-border">
            <form onSubmit={handleSend} className="flex items-center gap-2">
              <button
                type="button"
                className="p-2 rounded-lg hover:bg-secondary transition-colors"
              >
                <Paperclip className="w-5 h-5 text-muted-foreground" />
              </button>
              <button
                type="button"
                className="p-2 rounded-lg hover:bg-secondary transition-colors"
              >
                <Image className="w-5 h-5 text-muted-foreground" />
              </button>
              <input
                type="text"
                placeholder="Escreva uma mensagem..."
                value={newMessage}
                onChange={(e) => setNewMessage(e.target.value)}
                className="flex-1 px-4 py-2.5 rounded-full bg-secondary border-0 focus:outline-none focus:ring-1 focus:ring-[#D4AF37] font-light text-sm"
              />
              <button
                type="button"
                className="p-2 rounded-lg hover:bg-secondary transition-colors"
              >
                <Smile className="w-5 h-5 text-muted-foreground" />
              </button>
              <button
                type="submit"
                disabled={!newMessage.trim()}
                className="p-2.5 rounded-full bg-[#D4AF37] hover:bg-[#C9A546] disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
              >
                <Send className="w-5 h-5 text-[#0A3D2E]" />
              </button>
            </form>
          </div>
        </Card>

        {/* Sidebar de Usuários */}
        <Card className="w-64 p-4">
          <div className="flex items-center gap-2 mb-4">
            <Users className="w-5 h-5 text-[#D4AF37]" />
            <h3 className="text-sm font-light text-foreground">Membros</h3>
          </div>
          <div className="space-y-3">
            {onlineUsers.map((user) => (
              <div key={user.name} className="flex items-center gap-3">
                <div className="relative">
                  <div className="w-9 h-9 rounded-full bg-[#0A3D2E] flex items-center justify-center text-xs font-light text-[#A8E6CF]">
                    {getInitials(user.name)}
                  </div>
                  <div
                    className={`absolute bottom-0 right-0 w-3 h-3 rounded-full border-2 border-card ${
                      user.status === 'online'
                        ? 'bg-[#10B981]'
                        : user.status === 'away'
                        ? 'bg-[#F59E0B]'
                        : 'bg-[#6C757D]'
                    }`}
                  />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-light text-foreground truncate">{user.name}</p>
                  <p className="text-xs text-muted-foreground">
                    {user.status === 'online' ? 'Online' : user.status === 'away' ? 'Ausente' : 'Offline'}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </Card>
      </div>
    </div>
  );
}
