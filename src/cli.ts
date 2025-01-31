#!/usr/bin/env node

import { Command } from "commander";
import * as fs from "fs";
import { getDatabases, executeScriptInDatabase } from "./database";
import { ConfigManager } from './configurationManager'

async function main() {
    const configManager = new ConfigManager();
    const program = new Command();
    let config = configManager.getConfig();

    program
        .version("1.0.0")
        .description(
            "CLI para executar scripts SQL em várias bases PostgreSQL no mesmo servidor",
        );

        program
        .command('config')
        .description('Gerenciar configurações de conexão')
        .option('-r, --reset', 'Resetar configurações')
        .option('-s, --show', 'Mostrar configurações atuais')
        .action(async (options) => {
        if (options.reset) {
            config = await configManager.setupInitialConfig();
            console.log('Configurações resetadas com sucesso!');
            process.exit(0);
        }
        if (options.show) {
            const currentConfig = configManager.getConfig();
            if (!currentConfig) {
                console.log('Não há configuração.');
            } else {
                console.log('Configurações atuais:', {
                    ...currentConfig,
                    password: '********' // Oculta a senha
                });
            }
            process.exit(0);
        }
        })

        program
            .command('run')
            .description('Executar script SQL nas bases de dados')
            .requiredOption("-s, --script <script>", "Arquivo SQL a ser executado")
            .option(
                "-d, --databases <databases>",
                "Lista de bancos de dados, separados por vírgula"
            )
            .action(async (options) => {
                // Verifica se existe configuração
                if (!config) {
                    console.log('Nenhuma configuração encontrada.');
                    config = await configManager.setupInitialConfig();
                }

                // Lê o script SQL do arquivo informado
                const script = fs.readFileSync(options.script, "utf8");
                const databases = options.databases
                    ? options.databases.split(",")
                    : await getDatabases(); // Se não for fornecida a lista, busca todas as bases

                if (databases.length === 0) {
                    console.error('Erro: Nenhuma base de dados especificada.');
                    process.exit(1);
                }

                for (const database of databases) {
                    await executeScriptInDatabase(database, script);
                }
            });

      program.parse(process.argv);
}

main().catch((error) => {
	console.error("Erro:", error);
	process.exit(1);
});
