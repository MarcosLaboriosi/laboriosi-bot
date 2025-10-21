import "dotenv/config";
import client from "@core/client";
import voiceStateUpdate from "@events/voiceStateUpdate";

client.once("ready", () => {
  console.log(`✅ Logado como ${client.user?.tag}`);
});

client.on("voiceStateUpdate", voiceStateUpdate);

client.login(process.env.CLIENT_TOKEN);
