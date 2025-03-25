import { Collection } from "discord.js";

// Made to satisfy my IDE. Now client has a commands property.
declare module "discord.js" {
    export interface Client {
        commands: Collection<unknown, any>
    }
}