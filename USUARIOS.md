# 👥 Usuários do Sistema Charlotte ERP

## 🔐 Usuários Administrativos (Pré-cadastrados)

### 👤 Frentista Admin
- **Email:** `frentista@posto.com`
- **Senha:** `frentista123`
- **Nome:** João Silva
- **Perfil:** Frentista
- **Descrição:** Usuário administrativo com acesso ao painel de frentista

### 👔 RH / Admin
- **Email:** `rh@posto.com`
- **Senha:** `rh123`
- **Nome:** Maria Santos
- **Perfil:** RH/Admin
- **Descrição:** Usuário administrativo com acesso total ao sistema

---

## 👷 Funcionários Iniciais (Cadastrados no Sistema)

### Frentista 1
- **Email:** `joao@posto.com`
- **Senha:** `joao123`
- **Nome:** João Silva
- **Cargo:** Frentista
- **Perfil de Login:** Frentista

### Frentista 2
- **Email:** `maria@posto.com`
- **Senha:** `maria123`
- **Nome:** Maria Santos
- **Cargo:** Frentista
- **Perfil de Login:** Frentista

### Frentista 3
- **Email:** `pedro@posto.com`
- **Senha:** `pedro123`
- **Nome:** Pedro Costa
- **Cargo:** Frentista
- **Perfil de Login:** Frentista

### Gerente
- **Email:** `ana@posto.com`
- **Senha:** `ana123`
- **Nome:** Ana Paula
- **Cargo:** Gerente
- **Perfil de Login:** RH/Admin (cargos não-frentista = RH)

---

## ✨ Como Funciona

### Regras de Login
1. **Email deve estar cadastrado** - Sistema ou funcionário ativo
2. **Senha deve estar correta** - Mínimo 6 caracteres
3. **Perfil deve corresponder** - Selecione o perfil correto:
   - **Frentista**: Para funcionários com cargo "Frentista"
   - **RH/Admin**: Para cargos como Gerente, Supervisor, Operador

### Validações
- ❌ Email não cadastrado → "Email não cadastrado no sistema"
- ❌ Senha incorreta → "Senha incorreta"
- ❌ Perfil errado → "Este usuário não tem perfil de X"
- ❌ Funcionário inativo → "Funcionário inativo. Entre em contato com o RH."

---

## 📝 Cadastrando Novos Funcionários

### Via RH/Admin:
1. Faça login com `rh@posto.com` / `rh123`
2. Acesse **Funcionários** no menu
3. Clique em **+ Adicionar**
4. Preencha:
   - Nome completo
   - Email (será usado para login)
   - Senha (mínimo 6 caracteres)
   - Cargo (define o perfil de acesso)
5. O funcionário já pode fazer login!

### Perfis de Acesso por Cargo:
- **Frentista** → Login como "Frentista" (vendas, comissões, avisos, chat)
- **Gerente, Supervisor, Operador** → Login como "RH/Admin" (acesso total)

---

## 🔄 Isolamento de Dados

Cada usuário tem seus próprios dados completamente separados:
- **Vendas** são salvas por usuário
- **Produtos** são específicos de cada conta
- **Funcionários** gerenciados por conta
- **Logs** separados por usuário

Ao fazer login com usuários diferentes, você verá dados completamente diferentes!

---

## 🧪 Testando o Sistema

### Teste 1: Login de Frentista
1. Selecione perfil: **Frentista**
2. Email: `joao@posto.com`
3. Senha: `joao123`
4. ✅ Deve entrar no dashboard de frentista

### Teste 2: Login de RH
1. Selecione perfil: **RH/Admin**
2. Email: `ana@posto.com`
3. Senha: `ana123`
4. ✅ Deve entrar no dashboard de RH

### Teste 3: Perfil Errado
1. Selecione perfil: **RH/Admin**
2. Email: `joao@posto.com` (é frentista)
3. Senha: `joao123`
4. ❌ "Este usuário não tem perfil de RH/Admin"

### Teste 4: Cadastrar Novo Funcionário
1. Login como RH: `rh@posto.com` / `rh123`
2. Menu **Funcionários** → **+ Adicionar**
3. Preencha dados + senha
4. Faça logout
5. Tente login com o novo funcionário!

---

## 🔒 Segurança

- Senhas são validadas no login
- Funcionários inativos não podem fazer login
- Dados isolados por usuário
- Cada conta tem seu próprio banco de dados no LocalStorage
