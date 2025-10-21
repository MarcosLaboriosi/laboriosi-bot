import { EmbedBuilder } from "discord.js";

export default new EmbedBuilder()
  .setTitle("📜 Regras de Convivência")
  .setColor("#2ECC71")
  .setDescription(
    [
      "1. **Respeito sempre.** Brincadeiras são bem-vindas, falta de respeito não. Evite ofensas, preconceitos ou provocações pessoais.",
      "2. **Sem flood ou spam.** Use os canais de texto e voz com moderação. Evite repetir mensagens ou fazer barulho desnecessário nas salas.",
      "3. **Evite discussões tóxicas.** Se um assunto começar a gerar conflito (política, religião, etc.), mude de canal ou de tema. Prefere evitar? Crie sua própria sala e mute quem te incomodar.",
      "4. **Nada de conteúdo impróprio.** Inclui pornografia, gore e qualquer coisa ilegal.",
      "5. **Divirta-se e colabore.** Ajude quem está começando, compartilhe experiências e mantenha o clima de comunidade.",
    ].join("\n\n")
  )
  .setTimestamp();
