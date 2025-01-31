# 🌟 V-SQL-Run

## 🎯 Descrição

`vsqlrun` é uma ferramenta de linha de comando (CLI) desenvolvida em Node.js para executar scripts SQL em múltiplas bases de dados dentro de um mesmo banco.

---

## 📥 Instalação

### 1️⃣ Clonar o repositório
```sh
git clone git@github.com:fabioivan/v-sql-run.git
cd v-sql-run
```

### 2️⃣ Instalar dependências
```sh
yarn install
```
🛠️ *Instalando pacotes necessários...*

### 3️⃣ Configuração do Projeto
Quando iniciado pela primeira vez, `vsqlrun` irá detectar o arquivo de configuração inicial. Caso não encontre, ele iniciará um comando pedindo os dados de acesso ao banco.

- Para resetar esses dados, utilize o comando:
  ```sh
  vsqlrun config -r
  ```
- Para verificar a configuração ativa no momento, execute:
  ```sh
  vsqlrun config -s
  ```

### 4️⃣ Construir o projeto
```sh
yarn build
```
⚙️ *Gerando os arquivos do executável...*

### 5️⃣ Configurar a CLI localmente
```sh
npm link
```
🔗 *Configurando vsqlrun no sistema...*

---

## 🚀 Uso

Para executar um script SQL em todas as bases de dados:
```sh
vsqlrun run -s <arquivo.sql>
```

Para especificar bases de dados:
```sh
vsqlrun run -s <arquivo.sql> -d "base1,base2,base3"
```

### 🔧 Parâmetros

| Parâmetro | Alias | Descrição |
|------------|-------|-------------|
| `--script` | `-s`  | 📜 Caminho do arquivo SQL a ser executado |
| `--databases` | `-d`  | 🗄️ Lista de nomes das bases de dados separadas por `,` |

---

## 🎬 Exemplo de Uso

Executando `script.sql` em todas as bases:
```sh
vsqlrun run -s script.sql
```

Executando `script.sql` em bases específicas:
```sh
vsqlrun run -s script.sql -d "base1,base2"
```

📌 *Dica: Certifique-se de que as bases existem antes de executar!* ✅


---


## 📦 Pacote NPM

O `vsqlrun` também está disponível no NPM! Você pode instalá-lo globalmente através do seguinte comando:

```sh
npm install -g @fabioivan/v-sqlrun
```

Para mais detalhes, acesse a página oficial no NPM:
🔗 [@fabioivan/v-sqlrun](https://www.npmjs.com/package/@fabioivan/v-sqlrun)

---

## 📝 Licença

Este projeto é distribuído sob a licença MIT.
