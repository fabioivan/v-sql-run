![enter image description here](https://grupovoalle.com.br/site/assets/images/logo-1.png)
# # SynGwBasicStruct

Módulo criado para agilizar a criação dos arquivos básicos  que se sucedem a criação de uma nova Entidade no projeto SynGw.

## Como instalar:

Clonar o repositório dentro da pasta `home/voalle/projects`

Acessar a pasta do repositório e instalar as dependências, pelo comando:

    npm install
    
Após atualizado as dependências, basta fazer o build do projeto

    yarn build

Para que se possa utilizar o módulo de qualquer lugar, basta rodar o comando:

    npm link

Pronto, está tudo configurado!

## Como utilizar:

Para saber as opções(argumentos) que podem ser passados para o módulo, basta digitar no terminal:

       createGwFiles -h
Será exibido as opções que podem ser inseridas para a correta configuração, para criar os arquivos:

    Usage: createGwFiles [options]
    Options:
      -m, --module <module name>  Nome do módulo que será usado
      -e, --entity <entity name>  Nome da entidade a ser criada
      -s, --isSoft                Define se a entidade será do tipo EntitySoft ou EntityBase
      -h, --help                  display help for command


Dentre as opções, são obrigatórias as opções `-m <module name>` e `-e <entity name>`, caso elas fiquem em branco, será solicitado para inseri-las posteriormente.
Tanto o nome do módulo quanto o nome da entidade, devem ser inseridos com a primeira letra maiúscula, mas caso não seja inserido desta forma, o módulo irá corrigir automaticamente.

Caso o módulo não for encontrado, será solicitado para selecionar o módulo correto, dentre uma lista, que é alimentada automaticamente, conforme a própria estrutura do SynGw.

Caso o nome da Entidade não seja inserida no plural, ou seja, terminando com a letra "s", o módulo irá solicitar que o usuário insira novamente o nome da Entidade, com a formatação correta.

Caso o nome da Entidade seja composta, pode-se inserir um "_" entre as palavras ou colocar as palavras entre aspas duplas ("exemplo de Entidade") que o nome será convertido para a padrão PascalCase.

Caso não seja inserido a opção `-s`, que indica a utilização da EntitySoft na herança da Entidade e de suas adjacentes, a estrutura será criada usando a EntityBase.

Se tudo estiver ok, após as validações necessárias, é apresentado uma lista de arquivos a serem criados, com seus respectivos caminhos relativos, para que o usuário possa conferir, e é apresentado uma mensagem solicitando que o usuário confirme a criação dos arquivos:

>  ? Deseja criar os arquivos acima? (y/N) ‣ false

Basta digitar a letra "y" no teclado que será criado os arquivos.
Caso haja algum problema na criação dos arquivos, será exibido uma lista com os arquivos que não foram criados, e o respectivo erro.

Ao final será exibido uma mensagem notificando o usuário a não esquecer de configurar alguns arquivos:

✔ Arquivos criados com sucesso.

   ┌───────────────────────────────────────────────────────────────────────────────────────────────────────────────────────┐
   │                                                                                                                       │
   │   Não esqueça de:                                                                                                     |
   |                                                                                                                       │
   │   Ajustar o Mapping no Context em: src/Syntesis.SynGW.Infra.Data.Context/Modules/Suite/Context.Suite.cs               │
   │   Adiconar o Map das entidades em: src/Syntesis.SynGW.AutoMapper/Profiles/Modules/Suite/ViewModelToDomain.Suite.cs    │
   │   Adicionar o Map das entidades em: src/Syntesis.SynGW.AutoMapper/Profiles/Modules/Suite/DomainToViewModel.Suite.cs   │
   │                                                                                                                       │
   └───────────────────────────────────────────────────────────────────────────────────────────────────────────────────────┘

Tudo pronto, basta acessar seu projeto do SynGw e conferir os arquivos, e fazer as modificações necessárias.

