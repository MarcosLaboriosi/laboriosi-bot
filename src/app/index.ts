import "dotenv/config";
import client from "@core/client";
import { voiceStateUpdate, guildMemberAdd } from "@events";

client.once("ready", () => {
  console.log(`✅ Logado como ${client.user?.tag}`);
});

client.on("guildMemberAdd", guildMemberAdd);
client.on("voiceStateUpdate", voiceStateUpdate);

client.login(process.env.CLIENT_TOKEN);
