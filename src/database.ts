import { Client } from "pg";
import chalk from "chalk";
import { ConfigManager } from "./configurationManager";

// Função para obter a lista de bases de dados
export async function getDatabases(): Promise<string[]> {
	const client = await getDatabaseConnection("postgres");

	try {
		await client.connect();
		const res = await client.query(
			`SELECT
        datname AS name
      FROM pg_database
      WHERE
        datistemplate = false
        AND datname LIKE 'hemp%'
        AND oid NOT IN (
          SELECT oid FROM pg_database WHERE datname LIKE '%vdi%'
        )AND oid NOT IN (
          SELECT oid FROM pg_database WHERE datname LIKE '%paygw%'
        );`,
		);
		return res.rows.map((row) => row.name);
	} catch (error) {
		console.error(
			chalk.red("Erro ao buscar a lista de bancos de dados:"),
			error,
		);
		process.exit(1);
	} finally {
		await client.end();
	}
}

// Função para executar script SQL em um banco de dados específico
export async function executeScriptInDatabase(
	database: string,
	script: string,
): Promise<void> {
	const client = await getDatabaseConnection(database);

	try {
		await client.connect();
		await client.query(script);
		console.log(
			chalk.green(`✔️ Script executado com sucesso no banco ${database}`),
		);
	} catch (error: any) {
		parseDatabaseErros(error, database);
	} finally {
		await client.end();
	}
}

async function getDatabaseConnection(database: string): Promise<Client> {
    var configManager = new ConfigManager();
    var config = configManager.getConfig();

	return new Client({
		host: config?.host,
		user: config?.username,
		password: config?.password,
		database,
	});
}

function parseDatabaseErros(error: any, database: string) {
	if (error.code === "42703") {
		const regex = /column\s"([^"]+)"\s.*relation\s"([^"]+)"/;
		const column = error.message.match(regex);
		if (column?.[1]) {
			console.error(
				chalk.red(
					`Erro: Coluna "${column[1]}" não encontrada na tabela "${column[2]}" no banco "${database}".`,
				),
			);
		}
	} else if (error.code === "42P01") {
		const regex = /relation\s"([^"]+)"/;

		const table = error.message.match(regex);
		if (table?.[1]) {
			console.error(
				chalk.red(
					`Erro: Tabela "${table[1]}" não encontrada no banco "${database}".`,
				),
			);
		}
	} else if (error.code === "42P07") {
		const regex = /relation\s"([^"]+)"/;

		const table = error.message.match(regex);
		if (table?.[1]) {
			console.error(
				chalk.red(
					`Erro: Tabela "${table[1]}" já existe no banco "${database}".`,
				),
			);
		}
	} else {
		console.error(
			chalk.red(`Erro ao executar script no banco ${database}:`),
			error.message,
		);
	}
}
