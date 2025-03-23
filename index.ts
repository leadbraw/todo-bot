// The below code is from discord.js' guide

import fs from 'node:fs';
import path from 'node:path';
import { Sequelize, DataTypes } from 'sequelize';
import { Client, Collection, Events, GatewayIntentBits, MessageFlags } from 'discord.js';
import { token } from './config.json';

// Create a new client instance
const client = new Client({ intents: [GatewayIntentBits.Guilds] });

// Define connection info
const sequelize = new Sequelize('bott', 'root', '', {
    host: 'localhost',
    port: 3307,
    dialect: 'mariadb',
    logging: false
});

// Make todo item table. TODO: move this out.
const Todo = sequelize.define('todo', {
    name: {
        type: DataTypes.STRING,
        unique: true,
    },
    description: DataTypes.TEXT,
    username: DataTypes.STRING
});

client.commands = new Collection();

const foldersPath: string = path.join(__dirname, 'commands');
const commandFolders: string[] = fs.readdirSync(foldersPath);

// Load all commands
for (const folder of commandFolders) {
	const commandsPath: string = path.join(foldersPath, folder);
	const commandFiles: string[] = fs.readdirSync(commandsPath).filter(file => file.endsWith('.ts'));
	for (const file of commandFiles) {
		const filePath: string = path.join(commandsPath, file);
		const command = require(filePath);
		// Set a new item in the Collection with the key as the command name and the value as the exported module
		if ('data' in command && 'execute' in command) {
			client.commands.set(command.data.name, command);
		} else {
			console.log(`[WARNING] The command at ${filePath} is missing a required "data" or "execute" property.`);
		}
	}
}

//  Load all event handlers
const eventsPath: string = path.join(__dirname, 'events');
const eventFiles: string[] = fs.readdirSync(eventsPath).filter(file => file.endsWith('.ts'));

for (const file of eventFiles) {
	const filePath: string = path.join(eventsPath, file);
	const event = require(filePath);
	if (event.once) {
		client.once(event.name, (...args) => event.execute(...args));
	} else {
		client.on(event.name, (...args) => event.execute(...args));
	}
}

// Sync Todo table on startup. It's possible this should go in ./events/ready.ts, but whatever.
Todo.sync()
// Log in to Discord with your client's token
client.login(token);

export { sequelize, Todo };