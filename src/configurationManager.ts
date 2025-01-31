import inquirer from 'inquirer';
import fs from 'fs';
import path from 'node:path';
import os from 'node:os';

export interface Config {
    host: string;
    username: string;
    password: string;
  }

  export class ConfigManager {
    private configPath: string;

    constructor() {
      // Salva o arquivo de configuração na pasta home do usuário
      const configDir = path.join(os.homedir(), '.config/vsqlrun');
      this.configPath = path.join(configDir, 'config.json');

      // Cria o diretório se não existir
      if (!fs.existsSync(configDir)) {
        fs.mkdirSync(configDir, { recursive: true });
      }
    }

    getConfig():Config | null {
      try {
        const configFile = fs.readFileSync(this.configPath, 'utf8');
        return JSON.parse(configFile);
      } catch {
        return null;
      }
    }

    saveConfig(config: Config): void {
      fs.writeFileSync(this.configPath, JSON.stringify(config, null, 2));
    }

    async setupInitialConfig(): Promise<Config> {
      console.log('Configuração inicial');

      const answers = await inquirer.prompt([
        {
          type: 'input',
          name: 'host',
          message: 'Host do banco de dados (IP):',
          default: 'localhost'
        },
        {
          type: 'input',
          name: 'username',
          message: 'Usuário do banco de dados:'
        },
        {
          type: 'password',
          name: 'password',
          message: 'Senha do banco de dados:'
        },
      ]);

      this.saveConfig(answers);
      return answers;
    }
  }
