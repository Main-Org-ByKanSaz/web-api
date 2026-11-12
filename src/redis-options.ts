import { ConfigService } from '@nestjs/config';

import { DEFAULT_REDIS_HOST, DEFAULT_REDIS_PORT } from './constant';

/**
 * Where to reach Redis. On Render this is REDIS_URL, the Key Value
 * connection string such as redis://red-xxxx:6379. Locally you can use
 * REDIS_HOST and REDIS_PORT instead. rediss:// turns on TLS.
 */
export function redisOptions(config: ConfigService) {
  const url = config.get<string>('REDIS_URL');
  if (!url) {
    return {
      host: config.get<string>('REDIS_HOST') || DEFAULT_REDIS_HOST,
      port: Number(config.get('REDIS_PORT')) || DEFAULT_REDIS_PORT,
    };
  }

  const { protocol, hostname, port, username, password } = new URL(url);
  return {
    host: hostname,
    port: Number(port) || DEFAULT_REDIS_PORT,
    username: username ? decodeURIComponent(username) : undefined,
    password: password ? decodeURIComponent(password) : undefined,
    tls: protocol === 'rediss:' ? {} : undefined,
  };
}
