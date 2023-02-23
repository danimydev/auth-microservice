import envConfig from '../config';
import { createClient } from '@redis/client';

const client = createClient({
    url: envConfig.redis.url,
});

client.on('error', error => {
    console.log('Redis Client Error', error);
});

export default client;