export default {
  apps: {
    name: 'shalotts-boilerplate',
    script: './dist/server/index.mjs',
    env: {
      NODE_ENV: "development",
    },
    env_production: {
      NODE_ENV: "production",
    },
    error_file: './app/log/error.log',
    out_file: './app/log/out.log',
    log_date_format: 'YYYY-MM-DD HH:mm:ss',
    log_type: 'json',
  }
}