# 🧮 Calculadora Python

Calculadora desenvolvida em Python com versão em terminal e **versão web interativa**, criada como projeto de estudo para praticar lógica de programação, tratamento de erros e boas práticas de código.

## 🚀 Acesse a versão web

👉 **[Clique aqui para usar a calculadora online](https://pycalc-did-tica-simulador-e-guia-de-calculadora-e.ai.studio/)**

> 💡 A versão web funciona direto no navegador, sem instalar nada — inclusive no celular!

---

## ✨ Funcionalidades

- ✅ **Operações básicas:** soma, subtração, multiplicação e divisão
- ✅ **Operações extras:** potência, raiz quadrada e porcentagem
- ✅ **Tratamento de erros:** divisão por zero e entradas inválidas
- ✅ **Histórico de operações** exibido na tela
- ✅ **Suporte a teclado** na versão web (`0-9`, `+ - * /`, `^`, `%`, `Enter`, `Esc`)
- ✅ **Layout responsivo** (desktop e mobile)
- ✅ Código comentado e seguindo boas práticas (PEP 8)

---

## 🖥️ Versões do projeto

| Versão | Tecnologia | Como usar |
|--------|------------|-----------|
| **Terminal** | Python 3 | `python calculadora.py` |
| **Web** | HTML / CSS / JavaScript | Abra o `index.html` ou use [a versão online](https://pycalc-did-tica-simulador-e-guia-de-calculadora-e.ai.studio/) |

---

## 📁 Estrutura do repositório

Calculadora-Python/
├── calculadora.py # Versão em Python (terminal)
├── index.html # Versão web
├── src/ # Código-fonte da versão web
├── package.json # Dependências da versão web
├── vite.config.ts # Configuração do Vite
├── tsconfig.json # Configuração do TypeScript
├── metadata.json # Metadados do projeto
├── .env.example # Exemplo de variáveis de ambiente
└── .gitignore

---

## 🐍 Como rodar a versão Python (terminal)

### Pré-requisitos
- Python 3.8 ou superior instalado

### Passos

bash
# 1. Clone o repositório
git clone https://github.com/luirton/Calculadora-Python.git

# 2. Entre na pasta
cd Calculadora-Python

# 3. Execute a calculadora
python calculadora.py


O menu interativo aparecerá no terminal com as opções de operação, histórico e saída.

🌐 Como rodar a versão web localmente
Opção 1 — Abrir direto
Basta abrir o arquivo index.html no navegador.

Opção 2 — Usar um servidor local (recomendado)
bash
# Com Node.js instalado
npm install
npm run dev
Ou com Python:

bash
python -m http.server 8000
Depois acesse: http://localhost:8000

⌨️ Atalhos de teclado (versão web)
Tecla	Ação
0-9 e ,	Digitar números
+ - * /	Operações básicas
^ e %	Potência e porcentagem
Enter	Calcular
Esc	Limpar
📸 Preview
A versão web possui interface gráfica com display, botões clicáveis, histórico de operações em tempo real e suporte a teclado.

🔗 Testar agora

🎯 Objetivo do projeto
Este projeto foi desenvolvido como parte de um curso de programação, com o objetivo de praticar:

Lógica de programação e estruturas de controle

Funções e modularização

Tratamento de exceções (try/except)

Manipulação de listas (histórico)

Migração de projeto de terminal para web

Boas práticas de código (PEP 8, comentários)

🛠️ Tecnologias utilizadas
Python 3 — versão terminal

HTML5 / CSS3 / JavaScript — versão web

TypeScript — tipagem da versão web

Vite — build e dev server

🤝 Contribuições
Contribuições são bem-vindas! Sinta-se à vontade para:

Fazer um fork do projeto

Criar uma branch (git checkout -b feature/minha-melhoria)

Commit suas mudanças (git commit -m 'feat: adiciona nova funcionalidade')

Push para a branch (git push origin feature/minha-melhoria)

Abrir um Pull Request

📄 Licença
Este projeto está sob a licença MIT. Veja o arquivo LICENSE para mais detalhes.

👨‍💻 Autor
Luirton
🔗 GitHub

⭐ Se este projeto te ajudou de alguma forma, deixa uma estrela no repositório!

text

---

## 💡 Como adicionar no GitHub

1. Vá até o repositório: https://github.com/luirton/Calculadora-Python/
2. Clique em **"Add file" → "Create new file"**
3. Nomeie como `README.md`
4. Cole o conteúdo acima
5. Clique em **"Commit changes"**

> 💡 Se já existir um README, clique no ícone de lápis ✏️ para editar e substituir o conteúdo.

---

Quer que eu ajuste algo? Por exemplo:
- Adicionar **badges** (shields.io) de Python, licença, etc.
- Versão **em inglês**
- Incluir **screenshot** da versão web (você precisaria subir a imagem primeiro)
- Deixar mais **curto** ou mais **detalhado**

É só falar! 😄

