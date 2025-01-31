export const EnvConfig = {
  port: process.env.PORT || 3000,
  databaseUrl: process.env.DATABASE_URL,
  redisUrl: process.env.REDIS_URL,
  mail: {
    host: process.env.MAIL_HOST,
    port: process.env.MAIL_PORT,
    user: process.env.MAIL_USER,
    pass: process.env.MAIL_PASS,
    from: process.env.MAIL_FROM,
  },
  jwt: {
    JWT_ACCESS_SECRET: process.env.JWT_ACCESS_SECRET,
    JWT_REFRESH_SECRET:process.env.JWT_REFRESH_SECRET,
  },
};


export enum EnvsKeys {
  port = 'port',
  databaseUrl = 'databaseUrl',
  redisUrl = 'redisUrl'
}

export enum MailKeys {
  host = 'mail.host',
  port = 'mail.port',
  user = 'mail.user',
  pass = 'mail.pass',
  from = 'mail.from',
}