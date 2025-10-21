declare namespace NodeJS {
  interface ProcessEnv {
    DISCORD_TOKEN: string;
    APPLICATION_ID: string;
    PUBLIC_KEY: string;
    GUILD_ID: string;
    CREATE_CHANNEL_CATEGORY_ID: string;
    CREATE_CHANNEL_VOICE_CHANNEL_ID: string;
    MEMBER_ROLE_ID: string;
  }
}
