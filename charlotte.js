// ── DATA ────────────────────────────────────────────────────────────────────
const ADMIN_USERS = [
  { id: 'admin1', name: 'Maria Santos',  email: 'admin@posto.com',  password: '123456', role: 'rh' },
  { id: 'admin2', name: 'Carlos Ferreira', email: 'carlos@posto.com', password: '123456', role: 'rh' },
];

let employees = [
  { id: 'emp1', name: 'João Silva',   email: 'joao@posto.com',   password: '123456', role: 'Frentista', active: true  },
  { id: 'emp2', name: 'Pedro Costa',  email: 'pedro@posto.com',  password: '123456', role: 'Frentista', active: true  },
  { id: 'emp3', name: 'Ana Paula',    email: 'ana@posto.com',    password: '123456', role: 'Frentista', active: true  },
  { id: 'emp4', name: 'Lucas Mendes', email: 'lucas@posto.com',  password: '123456', role: 'Operador',  active: false },
];

const salesData = [
  { id: 's1',  employeeId: 'emp1', date: '2026-09-13T08:30:00', product: 'Gasolina Comum',    qty: 40,   total: 280,   commission: 14    },
  { id: 's2',  employeeId: 'emp1', date: '2026-09-13T10:15:00', product: 'Diesel S10',         qty: 60,   total: 390,   commission: 19.5  },
  { id: 's3',  employeeId: 'emp1', date: '2026-09-12T09:00:00', product: 'Gasolina Aditivada', qty: 30,   total: 225,   commission: 11.25 },
  { id: 's4',  employeeId: 'emp1', date: '2026-09-12T14:00:00', product: 'Gasolina Comum',    qty: 45,   total: 315,   commission: 15.75 },
  { id: 's5',  employeeId: 'emp1', date: '2026-09-11T11:00:00', product: 'Gasolina Comum',    qty: 3200, total: 22400, commission: 1120  },
  { id: 's6',  employeeId: 'emp1', date: '2026-09-10T04:00:00', product: 'Diesel S10',         qty: 50,   total: 325,   commission: 16.25 },
  { id: 's7',  employeeId: 'emp2', date: '2026-09-13T09:00:00', product: 'Gasolina Comum',    qty: 35,   total: 245,   commission: 12.25 },
  { id: 's8',  employeeId: 'emp2', date: '2026-09-13T11:30:00', product: 'Etanol',             qty: 28,   total: 140,   commission: 7     },
  { id: 's9',  employeeId: 'emp2', date: '2026-09-12T10:00:00', product: 'Gasolina Comum',    qty: 42,   total: 294,   commission: 14.7  },
  { id: 's10', employeeId: 'emp2', date: '2026-09-11T14:30:00', product: 'Diesel S10',         qty: 55,   total: 357.5, commission: 17.88 },
  { id: 's11', employeeId: 'emp3', date: '2026-09-13T08:00:00', product: 'Gasolina Aditivada', qty: 25,   total: 187.5, commission: 9.38  },
  { id: 's12', employeeId: 'emp3', date: '2026-09-13T13:00:00', product: 'Gasolina Comum',    qty: 38,   total: 266,   commission: 13.3  },
  { id: 's13', employeeId: 'emp3', date: '2026-09-12T08:30:00', product: 'Etanol',             qty: 20,   total: 100,   commission: 5     },
  { id: 's14', employeeId: 'emp1', date: '2026-09-09T10:00:00', product: 'Gasolina Comum',    qty: 40,   total: 280,   commission: 14    },
  { id: 's15', employeeId: 'emp2', date: '2026-09-09T11:00:00', product: 'Diesel S10',         qty: 60,   total: 390,   commission: 19.5  },
  { id: 's16', employeeId: 'emp1', date: '2026-09-08T09:00:00', product: 'Gasolina Comum',    qty: 50,   total: 350,   commission: 17.5  },
  { id: 's17', employeeId: 'emp2', date: '2026-09-08T10:00:00', product: 'Gasolina Aditivada', qty: 30,   total: 225,   commission: 11.25 },
  { id: 's18', employeeId: 'emp3', date: '2026-09-07T09:00:00', product: 'Gasolina Comum',    qty: 45,   total: 315,   commission: 15.75 },
];

const logsData = [
  { time: '13/09 10:15', msg: 'Venda registrada — Diesel S10 · R$ 390,00', user: 'João Silva',   color: '#1B4332' },
  { time: '13/09 09:00', msg: 'Venda registrada — Gasolina Comum · R$ 245,00', user: 'Pedro Costa', color: '#1B4332' },
  { time: '13/09 08:00', msg: 'Funcionário ativado: Ana Paula',                 user: 'Maria Santos', color: '#D4AF37' },
  { time: '12/09 14:00', msg: 'Venda registrada — Gasolina Comum · R$ 315,00', user: 'João Silva',   color: '#1B4332' },
  { time: '12/09 09:30', msg: 'Login realizado',                                 user: 'Pedro Costa', color: '#3B82F6' },
  { time: '11/09 11:00', msg: 'Alerta de fraude — Venda suspeita detectada',    user: 'Sistema',      color: '#DC3545' },
  { time: '11/09 08:00', msg: 'Funcionário cadastrado: Lucas Mendes',            user: 'Maria Santos', color: '#D4AF37' },
  { time: '10/09 17:30', msg: 'Relatório mensal gerado',                         user: 'Maria Santos', color: '#8B5CF6' },
];

let chatMessages = [
  { from: 'Pedro Costa',  text: 'Pessoal, o bico 3 tá com problema de pressão', time: '09:15' },
  { from: 'Ana Paula',    text: 'Já avisei o técnico, deve chegar às 11h',        time: '09:18' },
  { from: 'João Silva',   text: 'Ok, vou desviar os clientes pro bico 4',          time: '09:20' },
  { from: 'Maria Santos', text: 'Obrigada pela comunicação. Vamos monitorar.',     time: '09:22' },
];

let currentUser = null;
let selectedRole = 'frentista';
let showFuncForm = false;
let selectedProduct = null;
const products = [
  { id: 'p1', name: 'Gasolina Comum',     price: 7.00 },
  { id: 'p2', name: 'Gasolina Aditivada', price: 7.50 },
  { id: 'p3', name: 'Etanol',             price: 5.00 },
  { id: 'p4', name: 'Diesel S10',         price: 6.50 },
];

// ── HELPERS ──────────────────────────────────────────────────────────────────
function fmt(v) { return v.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' }); }
function fmtDT(s) {
  const d = new Date(s);
  return d.toLocaleString('pt-BR', { day: '2-digit', month: '2-digit', hour: '2-digit', minute: '2-digit' });
}

// ── LOGIN / LOGOUT ────────────────────────────────────────────────────────────
function selectRole(role) {
  selectedRole = role;
  document.getElementById('role-frentista').classList.toggle('active', role === 'frentista');
  document.getElementById('role-rh').classList.toggle('active', role === 'rh');
}

function handleLogin(e) {
  e.preventDefault();
  const email = document.getElementById('login-email').value.trim();
  const pass   = document.getElementById('login-password').value;
  const errBox = document.getElementById('login-error');
  errBox.style.display = 'none';

  if (selectedRole === 'rh') {
    const admin = ADMIN_USERS.find(u => u.email === email && u.password === pass);
    if (admin) { currentUser = { ...admin }; showApp('rh'); return; }
    errBox.querySelector('span').textContent = 'Credenciais inválidas para RH / Admin';
    errBox.style.display = 'flex'; return;
  }

  const emp = employees.find(u => u.email === email && u.password === pass && u.active);
  if (emp) { currentUser = { ...emp }; showApp('frentista'); return; }
  errBox.querySelector('span').textContent = 'Email ou senha inválidos';
  errBox.style.display = 'flex';
}

function showApp(role) {
  document.getElementById('login-screen').style.display = 'none';
  document.getElementById('app').style.display = 'flex';
  document.getElementById('sidebar-user-name').textContent = currentUser.name;
  document.getElementById('sidebar-user-role').textContent = role === 'rh' ? 'RH / Admin' : 'Frentista';
  document.getElementById('nav-rh').style.display        = role === 'rh' ? 'block' : 'none';
  document.getElementById('nav-frentista').style.display = role === 'frentista' ? 'block' : 'none';
  renderLogs();
  navigate('dashboard');
}

function handleLogout() {
  currentUser = null;
  document.getElementById('app').style.display = 'none';
  document.getElementById('login-screen').style.display = 'flex';
  document.getElementById('login-email').value = '';
  document.getElementById('login-password').value = '';
  document.querySelectorAll('.view').forEach(v => v.classList.remove('active'));
}

// ── NAVIGATION ────────────────────────────────────────────────────────────────
function navigate(route) {
  document.querySelectorAll('.view').forEach(v => v.classList.remove('active'));
  document.querySelectorAll('.nav-item[data-route]').forEach(btn => {
    btn.classList.toggle('active', btn.dataset.route === route);
  });
  const view = document.getElementById('view-' + route);
  if (!view) return;
  view.classList.add('active');

  const renders = {
    'dashboard':       renderDashboard,
    'funcionarios':    renderFuncionarios,
    'comissoes':       renderComissoes,
    'fraudes':         renderFraudes,
    'estatisticas':    renderEstatisticas,
    'minhas-vendas':   renderMinhasVendas,
    'comissao':        renderMinhaComissao,
    'chat':            () => setTimeout(renderChatMessages, 0),
  };
  if (renders[route]) renders[route]();
}

// ── DASHBOARD ─────────────────────────────────────────────────────────────────
function renderDashboard() {
  currentUser && currentUser.role !== 'rh' ? renderFrentistaDashboard() : renderRHDashboard();
}

function renderRHDashboard() {
  const today = new Date();
  const todaySales = salesData.filter(s => new Date(s.date).toDateString() === today.toDateString());
  const monthSales = salesData.filter(s => { const d = new Date(s.date); return d.getMonth() === today.getMonth() && d.getFullYear() === today.getFullYear(); });
  const todayRev   = todaySales.reduce((a, s) => a + s.total, 0);
  const monthRev   = monthSales.reduce((a, s) => a + s.total, 0);
  const activeEmps = employees.filter(e => e.active).length;

  const last7 = Array.from({ length: 7 }, (_, i) => { const d = new Date(); d.setDate(d.getDate() - (6 - i)); return d; });
  const byDay = last7.map(date => ({
    name: date.toLocaleDateString('pt-BR', { day: '2-digit', month: '2-digit' }),
    val: salesData.filter(s => new Date(s.date).toDateString() === date.toDateString()).reduce((a, s) => a + s.total, 0),
  }));
  const maxDay = Math.max(...byDay.map(d => d.val), 1);

  const topEmps = employees.filter(e => e.active).map(emp => ({
    name: emp.name.split(' ')[0],
    total: salesData.filter(s => s.employeeId === emp.id).reduce((a, s) => a + s.total, 0),
  })).filter(e => e.total > 0).sort((a, b) => b.total - a.total).slice(0, 5);
  const maxEmp = topEmps[0]?.total || 1;

  document.getElementById('view-dashboard').innerHTML = `
    <div class="page-header">
      <div>
        <h1 class="page-title">Dashboard</h1>
        <p class="page-subtitle">Faturamento do mês: ${fmt(monthRev)}</p>
      </div>
    </div>
    <div class="stat-grid g4">
      <div class="stat-card"><div class="stat-card-header"><span class="stat-label">Vendas Hoje</span><div class="stat-icon" style="background:rgba(245,158,11,0.1);">${ico('cart','#F59E0B')}</div></div><p class="stat-value">${todaySales.length}</p><p class="stat-sub">${fmt(todayRev)}</p></div>
      <div class="stat-card"><div class="stat-card-header"><span class="stat-label">Faturamento Mês</span><div class="stat-icon" style="background:rgba(212,175,55,0.1);">${ico('dollar','#D4AF37')}</div></div><p class="stat-value" style="color:#2D5F47;">${fmt(monthRev)}</p><p class="stat-sub">${monthSales.length} vendas</p></div>
      <div class="stat-card"><div class="stat-card-header"><span class="stat-label">Funcionários Ativos</span><div class="stat-icon" style="background:rgba(239,68,68,0.1);">${ico('users','#EF4444')}</div></div><p class="stat-value">${activeEmps}</p><p class="stat-sub">de ${employees.length} total</p></div>
      <div class="stat-card"><div class="stat-card-header"><span class="stat-label">Alertas Estoque</span><div class="stat-icon" style="background:rgba(220,53,69,0.1);">${ico('alert','#DC3545')}</div></div><p class="stat-value">2</p><p class="stat-sub">produtos em falta</p></div>
    </div>
    <div class="chart-grid">
      <div class="card">
        <div class="card-header">${ico('trend','#B8860B')}<span class="card-title">Vendas — Últimos 7 Dias</span></div>
        <div class="card-body">
          <div class="bar-chart-area">
            ${byDay.map(day => `
              <div class="bar-col">
                <span class="bar-val-lbl">${day.val > 0 ? fmt(day.val).replace('R$ ','') : ''}</span>
                <div class="bar-inner"><div class="bar-fill" style="height:${Math.max((day.val/maxDay)*100, day.val>0?4:0)}%;"></div></div>
                <span class="bar-day-lbl">${day.name}</span>
              </div>`).join('')}
          </div>
        </div>
      </div>
      <div class="card">
        <div class="card-header">${ico('users','#B8860B')}<span class="card-title">Top 5 Vendedores</span></div>
        <div class="card-body">
          ${topEmps.length === 0
            ? '<p style="text-align:center;color:var(--muted);padding:3rem 0;font-size:0.875rem;">Nenhuma venda registrada</p>'
            : topEmps.map(e => `
              <div class="prog-wrap">
                <div class="prog-header"><span>${e.name}</span><span style="color:var(--muted);">${fmt(e.total)}</span></div>
                <div class="prog-track"><div class="prog-fill" style="width:${(e.total/maxEmp)*100}%;"></div></div>
              </div>`).join('')}
        </div>
      </div>
    </div>`;
}

function renderFrentistaDashboard() {
  const me = salesData.filter(s => s.employeeId === currentUser.id);
  const today = new Date();
  const todayMe = me.filter(s => new Date(s.date).toDateString() === today.toDateString());
  const monthMe = me.filter(s => { const d = new Date(s.date); return d.getMonth() === today.getMonth() && d.getFullYear() === today.getFullYear(); });
  const totalComm = monthMe.reduce((a,s) => a + s.commission, 0);

  document.getElementById('view-dashboard').innerHTML = `
    <div class="page-header">
      <div>
        <h1 class="page-title">Olá, ${currentUser.name.split(' ')[0]} 👋</h1>
        <p class="page-subtitle">Suas vendas de hoje</p>
      </div>
      <button class="btn btn-primary" onclick="navigate('registrar-venda')">+ Registrar Venda</button>
    </div>
    <div class="stat-grid g3">
      <div class="stat-card"><div class="stat-card-header"><span class="stat-label">Vendas Hoje</span><div class="stat-icon" style="background:rgba(245,158,11,0.1);">${ico('cart','#F59E0B')}</div></div><p class="stat-value">${todayMe.length}</p><p class="stat-sub">${fmt(todayMe.reduce((a,s)=>a+s.total,0))}</p></div>
      <div class="stat-card"><div class="stat-card-header"><span class="stat-label">Vendas no Mês</span><div class="stat-icon" style="background:rgba(212,175,55,0.1);">${ico('dollar','#D4AF37')}</div></div><p class="stat-value">${monthMe.length}</p><p class="stat-sub">${fmt(monthMe.reduce((a,s)=>a+s.total,0))}</p></div>
      <div class="stat-card"><div class="stat-card-header"><span class="stat-label">Comissão do Mês</span><div class="stat-icon" style="background:rgba(27,67,50,0.1);">${ico('trend','#1B4332')}</div></div><p class="stat-value" style="color:#1B4332;">${fmt(totalComm)}</p><p class="stat-sub">${monthMe.length} vendas</p></div>
    </div>
    <div class="card">
      <div class="card-header"><span class="card-title">Últimas Vendas</span></div>
      <div class="tbl-wrap"><table>
        <thead><tr><th>Produto</th><th class="tr">Volume</th><th class="tr">Total</th><th class="tr">Comissão</th><th>Data/Hora</th></tr></thead>
        <tbody>
          ${me.length === 0
            ? '<tr><td colspan="5" style="text-align:center;color:var(--muted);padding:2rem;">Nenhuma venda registrada</td></tr>'
            : me.slice(0,10).map(s => `<tr><td>${s.product}</td><td class="tr">${s.qty}L</td><td class="tr">${fmt(s.total)}</td><td class="tr tg">${fmt(s.commission)}</td><td class="tm">${fmtDT(s.date)}</td></tr>`).join('')}
        </tbody>
      </table></div>
    </div>`;
}

// ── FUNCIONÁRIOS ──────────────────────────────────────────────────────────────
function renderFuncionarios() {
  const active = employees.filter(e => e.active).length;
  document.getElementById('view-funcionarios').innerHTML = `
    <div class="page-header">
      <h1 class="page-title">Funcionários</h1>
      <button class="btn btn-primary" onclick="toggleFuncForm()">+ Adicionar</button>
    </div>
    <div id="func-form-container" style="display:${showFuncForm?'block':'none'}; margin-bottom:1.5rem;">
      <div class="card">
        <div class="card-header"><span class="card-title">Cadastrar Novo Funcionário</span></div>
        <div class="card-body">
          <form class="form-grid" onsubmit="handleAddEmployee(event)">
            <div class="field"><label>Nome Completo</label><input id="f-name" placeholder="Ex: João Silva" required /></div>
            <div class="field"><label>Email</label><input id="f-email" type="email" placeholder="joao@posto.com" required /></div>
            <div class="field"><label>Senha</label><input id="f-pass" type="password" placeholder="Mínimo 6 caracteres" required /></div>
            <div class="field"><label>Cargo</label><select id="f-role"><option>Frentista</option><option>Gerente</option><option>Supervisor</option><option>Operador</option></select></div>
            <div class="field-check"><label class="chk-label"><input type="checkbox" id="f-active" checked /> Funcionário ativo</label></div>
            <div class="form-actions">
              <button type="button" class="btn btn-ghost" onclick="toggleFuncForm()">Cancelar</button>
              <button type="submit" class="btn btn-success">Cadastrar Funcionário</button>
            </div>
          </form>
        </div>
      </div>
    </div>
    <div class="stat-grid g3">
      <div class="stat-card"><div class="stat-card-header"><span class="stat-label">Total</span><div class="stat-icon" style="background:rgba(184,134,11,0.1);">${ico('users','#B8860B')}</div></div><p class="stat-value">${employees.length}</p><p class="stat-sub">funcionários</p></div>
      <div class="stat-card"><div class="stat-card-header"><span class="stat-label">Ativos</span><div class="stat-icon" style="background:rgba(27,67,50,0.1);">${ico('usercheck','#1B4332')}</div></div><p class="stat-value">${active}</p><p class="stat-sub">trabalhando</p></div>
      <div class="stat-card"><div class="stat-card-header"><span class="stat-label">Inativos</span><div class="stat-icon" style="background:rgba(220,53,69,0.06);">${ico('userx','#DC3545')}</div></div><p class="stat-value">${employees.length - active}</p><p class="stat-sub">desligados</p></div>
    </div>
    <div class="card">
      <div class="card-header"><span class="card-title">Lista de Funcionários</span></div>
      <div class="tbl-wrap"><table>
        <thead><tr><th>Nome</th><th>Email</th><th>Cargo</th><th class="tr">Vendas</th><th class="tr">Comissão</th><th class="tc">Status</th><th class="tc">Ações</th></tr></thead>
        <tbody>
          ${employees.map(emp => {
            const es = salesData.filter(s => s.employeeId === emp.id);
            const ts = es.reduce((a,s)=>a+s.total,0);
            const tc = es.reduce((a,s)=>a+s.commission,0);
            return `<tr>
              <td>${emp.name}</td><td class="tm">${emp.email}</td><td>${emp.role}</td>
              <td class="tr">${fmt(ts)}</td><td class="tr tg">${fmt(tc)}</td>
              <td class="tc"><span class="badge ${emp.active?'b-active':'b-inactive'}">${emp.active?'Ativo':'Inativo'}</span></td>
              <td class="tc"><button class="btn btn-sm ${emp.active?'btn-outline':'btn-success'}" onclick="toggleEmpActive('${emp.id}')">${emp.active?'Inativar':'Ativar'}</button></td>
            </tr>`;
          }).join('')}
        </tbody>
      </table></div>
    </div>`;
}

function toggleFuncForm() {
  showFuncForm = !showFuncForm;
  const c = document.getElementById('func-form-container');
  if (c) c.style.display = showFuncForm ? 'block' : 'none';
}

function handleAddEmployee(e) {
  e.preventDefault();
  const pass = document.getElementById('f-pass').value;
  if (pass.length < 6) { alert('Senha deve ter mínimo 6 caracteres'); return; }
  employees.push({
    id: 'emp' + Date.now(),
    name: document.getElementById('f-name').value,
    email: document.getElementById('f-email').value,
    password: pass,
    role: document.getElementById('f-role').value,
    active: document.getElementById('f-active').checked,
  });
  showFuncForm = false;
  renderFuncionarios();
}

function toggleEmpActive(id) {
  const emp = employees.find(e => e.id === id);
  if (emp) { emp.active = !emp.active; renderFuncionarios(); }
}

// ── COMISSÕES (RH) ────────────────────────────────────────────────────────────
function renderComissoes() {
  const today = new Date();
  const ms = salesData.filter(s => { const d=new Date(s.date); return d.getMonth()===today.getMonth()&&d.getFullYear()===today.getFullYear(); });
  const ec = employees.map(emp => {
    const es = ms.filter(s => s.employeeId === emp.id);
    return { ...emp, cnt: es.length, ts: es.reduce((a,s)=>a+s.total,0), tc: es.reduce((a,s)=>a+s.commission,0) };
  }).sort((a,b) => b.tc - a.tc);
  const tot = ec.reduce((a,e)=>a+e.tc,0);

  document.getElementById('view-comissoes').innerHTML = `
    <div class="page-header"><div><h1 class="page-title">Comissões</h1><p class="page-subtitle">Total pago no mês: ${fmt(tot)}</p></div></div>
    <div class="card">
      <div class="card-header"><span class="card-title">Comissões do Mês</span></div>
      <div class="tbl-wrap"><table>
        <thead><tr><th>Funcionário</th><th>Cargo</th><th class="tr">Nº Vendas</th><th class="tr">Total Vendido</th><th class="tr">Comissão</th><th class="tc">Status</th></tr></thead>
        <tbody>
          ${ec.map(e => `<tr><td>${e.name}</td><td class="tm">${e.role}</td><td class="tr">${e.cnt}</td><td class="tr">${fmt(e.ts)}</td><td class="tr tg">${fmt(e.tc)}</td><td class="tc"><span class="badge ${e.active?'b-active':'b-inactive'}">${e.active?'Ativo':'Inativo'}</span></td></tr>`).join('')}
        </tbody>
      </table></div>
    </div>`;
}

// ── FRAUDES ────────────────────────────────────────────────────────────────────
function renderFraudes() {
  const analysis = employees.filter(e => e.active).map(emp => {
    const es = salesData.filter(s => s.employeeId === emp.id);
    const avg = es.length > 0 ? es.reduce((a,s)=>a+s.total,0)/es.length : 0;
    const suspicious = es.filter(sale => {
      const h = new Date(sale.date).getHours();
      return sale.total > avg*3 || sale.commission > avg*0.15 || h<6 || h>=22;
    });
    return { emp, es, avg, suspicious };
  });

  const totalAlerts = analysis.reduce((a,f)=>a+f.suspicious.length,0);
  const withAlerts  = analysis.filter(f=>f.suspicious.length>0).length;
  const totalSales  = analysis.reduce((a,f)=>a+f.es.length,0);
  const rate        = totalSales>0 ? Math.round((totalAlerts/totalSales)*100) : 0;

  function riskBadge(f) {
    if (!f.suspicious.length) return {label:'Normal', cls:'b-normal'};
    const p = (f.suspicious.length/f.es.length)*100;
    if (p<10) return {label:'Baixo risco', cls:'b-low'};
    if (p<30) return {label:'Médio risco', cls:'b-medium'};
    return {label:'Alto risco', cls:'b-high'};
  }
  function fraudTags(sale, avg) {
    const t=[]; const h=new Date(sale.date).getHours();
    if (sale.total>avg*3)         t.push(`Valor alto (${(sale.total/avg).toFixed(1)}× a média)`);
    if (sale.commission>avg*0.15) t.push('Comissão suspeita');
    if (h<6||h>=22)               t.push(`Horário incomum (${h}h)`);
    return t;
  }

  document.getElementById('view-fraudes').innerHTML = `
    <div class="page-header"><h1 class="page-title">Detecção de Fraudes</h1></div>
    <div class="stat-grid g3">
      <div class="stat-card"><div class="stat-card-header"><span class="stat-label">Total de Alertas</span><div class="stat-icon" style="background:rgba(220,53,69,0.1);">${ico('shield','#DC3545')}</div></div><p class="stat-value" style="color:#DC3545;">${totalAlerts}</p><p class="stat-sub">transações suspeitas</p></div>
      <div class="stat-card"><div class="stat-card-header"><span class="stat-label">Funcionários com Alertas</span><div class="stat-icon" style="background:rgba(245,158,11,0.1);">${ico('users','#F59E0B')}</div></div><p class="stat-value">${withAlerts}</p><p class="stat-sub">de ${analysis.length} analisados</p></div>
      <div class="stat-card"><div class="stat-card-header"><span class="stat-label">Taxa de Alertas</span><div class="stat-icon" style="background:rgba(212,175,55,0.1);">${ico('trend','#D4AF37')}</div></div><p class="stat-value">${rate}%</p><p class="stat-sub">das transações</p></div>
    </div>
    ${analysis.map((f,i) => {
      const rb = riskBadge(f);
      return `
        <div class="fraud-card">
          <div class="fraud-header" onclick="toggleFraud(${i})">
            <div style="display:flex;align-items:center;gap:0.75rem;">
              ${ico('user', f.suspicious.length>0?'#DC3545':'#6C757D')}
              <div>
                <p style="font-size:0.875rem;">${f.emp.name}</p>
                <p style="font-size:0.75rem;color:var(--muted);">${f.es.length} vendas · Média: ${fmt(f.avg)}</p>
              </div>
            </div>
            <div style="display:flex;align-items:center;gap:0.5rem;">
              <span class="badge ${rb.cls}">${rb.label}</span>
              ${f.suspicious.length>0?`<span style="font-size:0.75rem;color:#DC3545;">${f.suspicious.length} alerta${f.suspicious.length>1?'s':''}</span>`:''}
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="var(--muted)" stroke-width="1.5"><polyline points="6 9 12 15 18 9"/></svg>
            </div>
          </div>
          <div class="fraud-body" id="fb-${i}">
            ${f.suspicious.length===0
              ? '<div style="padding:1.25rem;font-size:0.875rem;color:var(--muted);">Nenhuma transação suspeita.</div>'
              : f.suspicious.map(sale => {
                  const tags = fraudTags(sale, f.avg);
                  return `<div class="fraud-sale-row">
                    <div>
                      <p style="font-size:0.875rem;">${sale.product}</p>
                      <p style="font-size:0.75rem;color:var(--muted);">${fmtDT(sale.date)}</p>
                      <div style="margin-top:0.375rem;">${tags.map(t=>`<span class="fraud-tag">${t}</span>`).join('')}</div>
                    </div>
                    <div style="text-align:right;">
                      <p style="font-size:0.875rem;">${fmt(sale.total)}</p>
                      <p style="font-size:0.75rem;color:var(--muted);">Comissão: ${fmt(sale.commission)}</p>
                    </div>
                  </div>`;
                }).join('')}
          </div>
        </div>`;
    }).join('')}`;
}
function toggleFraud(i) { const b=document.getElementById('fb-'+i); if(b) b.classList.toggle('open'); }

// ── ESTATÍSTICAS ──────────────────────────────────────────────────────────────
function renderEstatisticas() {
  const COLORS = ['#B8860B','#1B4332','#DAA520','#2D5F47','#6B6B6B'];
  const prodMap = {};
  salesData.forEach(s => { prodMap[s.product] = (prodMap[s.product]||0) + s.total; });
  const prods   = Object.entries(prodMap).sort((a,b)=>b[1]-a[1]);
  const maxProd = prods[0]?.[1]||1;
  const total   = prods.reduce((a,[,v])=>a+v,0);
  const circ    = 2*Math.PI*45;
  let offset = 0;
  const donut = prods.map(([,v],i)=>{
    const dash = (v/total)*circ;
    const el = `<circle cx="60" cy="60" r="45" fill="none" stroke="${COLORS[i%COLORS.length]}" stroke-width="20" stroke-dasharray="${dash} ${circ-dash}" stroke-dashoffset="${-offset}" transform="rotate(-90 60 60)"/>`;
    offset += dash; return el;
  }).join('');

  document.getElementById('view-estatisticas').innerHTML = `
    <div class="page-header"><h1 class="page-title">Estatísticas</h1></div>
    <div class="chart-grid mb-3">
      <div class="card">
        <div class="card-header"><span class="card-title">Faturamento por Produto</span></div>
        <div class="card-body">
          ${prods.map(([name,val],i)=>`
            <div style="margin-bottom:0.875rem;">
              <div class="prog-header"><span style="font-size:0.8rem;">${name}</span><span style="font-size:0.75rem;color:var(--muted);">${fmt(val)}</span></div>
              <div class="prog-track"><div style="height:100%;width:${(val/maxProd)*100}%;background:${COLORS[i%COLORS.length]};border-radius:9999px;transition:width 0.4s;"></div></div>
            </div>`).join('')}
        </div>
      </div>
      <div class="card">
        <div class="card-header"><span class="card-title">Distribuição de Vendas</span></div>
        <div class="card-body" style="display:flex;align-items:center;gap:1.5rem;flex-wrap:wrap;">
          <svg viewBox="0 0 120 120" width="120" height="120">${donut}</svg>
          <div>
            ${prods.map(([name,val],i)=>`
              <div style="display:flex;align-items:center;gap:0.5rem;margin-bottom:0.5rem;font-size:0.75rem;">
                <div style="width:10px;height:10px;border-radius:50%;background:${COLORS[i%COLORS.length]};flex-shrink:0;"></div>
                <span>${name}</span>
                <span style="color:var(--muted);margin-left:0.5rem;">${Math.round((val/total)*100)}%</span>
              </div>`).join('')}
          </div>
        </div>
      </div>
    </div>`;
}

// ── FRENTISTA VIEWS ───────────────────────────────────────────────────────────
function selectProduct(id) {
  selectedProduct = products.find(p=>p.id===id);
  document.querySelectorAll('.fuel-btn').forEach(b=>b.classList.toggle('selected',b.dataset.pid===id));
  updateSaleCalc();
}
function updateSaleCalc() {
  const qty = parseFloat(document.getElementById('s-qty')?.value||0);
  const total = selectedProduct&&qty>0 ? qty*selectedProduct.price : 0;
  const el1 = document.getElementById('s-total');
  const el2 = document.getElementById('s-comm');
  if(el1) el1.textContent = fmt(total);
  if(el2) el2.textContent = fmt(total*0.05);
}
function handleSaleSubmit(e) {
  e.preventDefault();
  const qty = parseFloat(document.getElementById('s-qty').value);
  if (!selectedProduct) { alert('Selecione um combustível'); return; }
  if (!qty||qty<=0) { alert('Informe a quantidade'); return; }
  const total = qty*selectedProduct.price;
  salesData.push({ id:'s'+Date.now(), employeeId:currentUser.id, date:new Date().toISOString(), product:selectedProduct.name, qty, total, commission:total*0.05 });
  alert('Venda registrada com sucesso!');
  e.target.reset();
  selectedProduct=null;
  document.querySelectorAll('.fuel-btn').forEach(b=>b.classList.remove('selected'));
  updateSaleCalc();
}

function renderMinhasVendas() {
  const me = salesData.filter(s=>s.employeeId===currentUser?.id);
  document.getElementById('view-minhas-vendas').innerHTML = `
    <div class="page-header"><h1 class="page-title">Minhas Vendas</h1></div>
    <div class="card">
      <div class="tbl-wrap"><table>
        <thead><tr><th>Produto</th><th class="tr">Volume</th><th class="tr">Total</th><th class="tr">Comissão</th><th>Data/Hora</th></tr></thead>
        <tbody>
          ${me.length===0
            ?'<tr><td colspan="5" style="text-align:center;color:var(--muted);padding:2rem;">Nenhuma venda registrada</td></tr>'
            :me.map(s=>`<tr><td>${s.product}</td><td class="tr">${s.qty}L</td><td class="tr">${fmt(s.total)}</td><td class="tr tg">${fmt(s.commission)}</td><td class="tm">${fmtDT(s.date)}</td></tr>`).join('')}
        </tbody>
      </table></div>
    </div>`;
}

function renderMinhaComissao() {
  const today=new Date();
  const me=salesData.filter(s=>s.employeeId===currentUser?.id);
  const month=me.filter(s=>{const d=new Date(s.date);return d.getMonth()===today.getMonth()&&d.getFullYear()===today.getFullYear();});
  const tc=month.reduce((a,s)=>a+s.commission,0);
  const ts=month.reduce((a,s)=>a+s.total,0);
  document.getElementById('view-comissao').innerHTML = `
    <div class="page-header"><h1 class="page-title">Minha Comissão</h1></div>
    <div class="stat-grid g3">
      <div class="stat-card"><div class="stat-card-header"><span class="stat-label">Comissão do Mês</span><div class="stat-icon" style="background:rgba(212,175,55,0.1);">${ico('dollar','#D4AF37')}</div></div><p class="stat-value" style="color:#1B4332;">${fmt(tc)}</p><p class="stat-sub">a receber</p></div>
      <div class="stat-card"><div class="stat-card-header"><span class="stat-label">Total Vendido</span><div class="stat-icon" style="background:rgba(245,158,11,0.1);">${ico('cart','#F59E0B')}</div></div><p class="stat-value">${fmt(ts)}</p><p class="stat-sub">${month.length} vendas</p></div>
      <div class="stat-card"><div class="stat-card-header"><span class="stat-label">Taxa de Comissão</span><div class="stat-icon" style="background:rgba(27,67,50,0.1);">${ico('trend','#1B4332')}</div></div><p class="stat-value">5%</p><p class="stat-sub">por venda</p></div>
    </div>
    <div class="card">
      <div class="card-header"><span class="card-title">Histórico de Comissões</span></div>
      <div class="tbl-wrap"><table>
        <thead><tr><th>Produto</th><th class="tr">Total da Venda</th><th class="tr">Comissão (5%)</th><th>Data/Hora</th></tr></thead>
        <tbody>
          ${month.map(s=>`<tr><td>${s.product}</td><td class="tr">${fmt(s.total)}</td><td class="tr tg">${fmt(s.commission)}</td><td class="tm">${fmtDT(s.date)}</td></tr>`).join('')}
          ${month.length===0?'<tr><td colspan="4" style="text-align:center;color:var(--muted);padding:2rem;">Nenhuma comissão no mês</td></tr>':''}
        </tbody>
      </table></div>
    </div>`;
}

// ── LOGS ──────────────────────────────────────────────────────────────────────
function renderLogs() {
  const el = document.getElementById('logs-list');
  if (!el) return;
  el.innerHTML = logsData.map(l=>`
    <div class="log-row">
      <div class="log-dot" style="background:${l.color};"></div>
      <div style="flex:1;"><p class="log-msg">${l.msg}</p><p class="log-user">${l.user}</p></div>
      <span class="log-time">${l.time}</span>
    </div>`).join('');
}

// ── CHAT ──────────────────────────────────────────────────────────────────────
function renderChatMessages() {
  const el = document.getElementById('chat-messages');
  if (!el) return;
  el.innerHTML = chatMessages.map(m => {
    const out = m.from === currentUser?.name;
    return `<div class="chat-msg ${out?'chat-msg-out':'chat-msg-in'}">
      <div class="chat-name">${m.from}</div>
      ${m.text}
      <div class="chat-time">${m.time}</div>
    </div>`;
  }).join('');
  el.scrollTop = el.scrollHeight;
}
function sendChatMessage(e) {
  e.preventDefault();
  const inp = document.getElementById('chat-input');
  const txt = inp.value.trim();
  if (!txt) return;
  const now = new Date();
  chatMessages.push({ from: currentUser?.name||'Você', text: txt, time: now.toLocaleTimeString('pt-BR',{hour:'2-digit',minute:'2-digit'}) });
  inp.value='';
  renderChatMessages();
}

// ── ICONS ─────────────────────────────────────────────────────────────────────
function ico(name, color) {
  const s = `width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="${color}" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"`;
  const paths = {
    cart:      `<svg ${s}><circle cx="9" cy="21" r="1"/><circle cx="20" cy="21" r="1"/><path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"/></svg>`,
    dollar:    `<svg ${s}><line x1="12" y1="1" x2="12" y2="23"/><path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"/></svg>`,
    users:     `<svg ${s}><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg>`,
    alert:     `<svg ${s}><path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"/><line x1="12" y1="9" x2="12" y2="13"/><line x1="12" y1="17" x2="12.01" y2="17"/></svg>`,
    trend:     `<svg ${s}><polyline points="23 6 13.5 15.5 8.5 10.5 1 18"/><polyline points="17 6 23 6 23 12"/></svg>`,
    shield:    `<svg ${s}><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>`,
    user:      `<svg ${s}><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>`,
    usercheck: `<svg ${s}><path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><polyline points="16 11 18 13 22 9"/></svg>`,
    userx:     `<svg ${s}><path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><line x1="17" y1="11" x2="23" y2="17"/><line x1="23" y1="11" x2="17" y2="17"/></svg>`,
  };
  return paths[name] || paths.user;
}

// ── BOOT ──────────────────────────────────────────────────────────────────────
// Mostrar tela de login por padrão
document.getElementById('app').style.display = 'none';
selectRole('frentista');
</script>
