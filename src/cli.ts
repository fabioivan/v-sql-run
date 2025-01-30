#!/usr/bin/env node

import { Command } from "commander";
import * as fs from "fs";
import { getDatabases, executeScriptInDatabase } from "./database";

const program = new Command();

program
	.version("1.0.0")
	.description(
		"CLI para executar scripts SQL em várias bases PostgreSQL no mesmo servidor",
	);

program
	.requiredOption("-s, --script <script>", "Arquivo SQL a ser executado")
	.option(
		"-d, --databases <databases>",
		"Lista de bancos de dados, separados por vírgula",
	);

program.parse(process.argv);

const options = program.opts();

// Lê o script SQL do arquivo informado
const script = fs.readFileSync(options.script, "utf8");

async function main() {
	const databases = options.databases
		? options.databases.split(",")
		: await getDatabases(); // Se não for fornecida a lista, busca todas as bases

	for (const database of databases) {
		await executeScriptInDatabase(database, script);
	}
}

main().catch((error) => {
	console.error("Erro:", error);
	process.exit(1);
});
