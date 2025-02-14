interface Configuration {
  app: AppConfig;
  postgresDatabase: PostgresConfig;
}

interface AppConfig {
  env: string;
  port: number;
}

interface PostgresConfig {
  host: string;
  port: number;
  username: string;
  password: string;
  database: string;
}

export type { Configuration };
