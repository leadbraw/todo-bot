import { Collection } from "discord.js";

// Now Client has a 'commands' property! Woohoo!
declare module "discord.js" {
    export interface Client {
        commands: Collection<unknown, any>
    }
}