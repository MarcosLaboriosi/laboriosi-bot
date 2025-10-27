declare namespace NodeJS {
  interface ProcessEnv {
    DISCORD_TOKEN: string;
    APPLICATION_ID: string;
    PUBLIC_KEY: string;
    GUILD_ID: string;
    CREATE_CHANNEL_CATEGORY_ID: string;
    CREATE_CHANNEL_VOICE_CHANNEL_ID: string;
    MEMBER_ROLE_ID: string;
    ROLES_CHANNEL_ID: string;
    HEALER_ROLE_ID: string;
    TANK_ROLE_ID: string;
    DPS_ROLE_ID: string;
    RULES_CHANNEL_ID: string;
    WELCOME_CHANNEL_ID: string;
    WHATSAPP_CHANNEL_ID: string;
  }
}
