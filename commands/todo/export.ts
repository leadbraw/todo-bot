import { MessageFlags, SlashCommandBuilder } from 'discord.js';
import { mkConfig, generateCsv, asString } from "export-to-csv";
import { writeFile } from "node:fs";
import { Buffer } from "node:buffer";
import { Todo } from '../../index.ts';
import * as fs from 'fs';

module.exports = {
	data: new SlashCommandBuilder()
		.setName('export')
		.setDescription('Export all todo items as a .csv file.'),
	async execute(interaction) {
        const csvConfig = mkConfig({ useKeysAsHeaders: true });
		const username = interaction.user.username;

        // Fetches the name and description of all items created by the user.
        const todoList = await Todo.findAll({ attributes: ['name', 'description'],  where: { username: username } });
        const stringified: string = JSON.stringify(todoList);
        const todoJSON = JSON.parse(stringified);
        
        // Make csv file.
        const csv = generateCsv(csvConfig)(todoJSON);
        const filename = `${csvConfig.filename}.csv`;
        const csvBuffer = new Uint8Array(Buffer.from(asString(csv)));

        // Write the csv file to disk.
        writeFile(filename, csvBuffer, (err) => {
            if (err) throw err;
            console.log("file saved: ", filename);
        });

        // Reply with data!
        interaction.reply({ content: 'Here is your data!', files: [`..\\todo-bot\\${filename}`], flags: MessageFlags.Ephemeral })
            .then(
                // Delete file off disk afterwards.
                fs.unlink(`..\\todo-bot\\${filename}`, (err) => {
                    if (err) {
                        console.error(`Error deleting: ${err.message}`);
                    } else {
                        console.log('Deletion successful.');
                    }
                })
            );
    }
}