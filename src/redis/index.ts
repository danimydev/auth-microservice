import envConfig from '../config';
import { createClient } from '@redis/client';

const client = createClient({
	url: envConfig.redis.url,
});

client.on('error', error => {
	console.log('Redis Client Error', error);
});

(async () => {
	try {
		await client.connect();
		console.log('Redis Client connected');
	} catch (error) {
		throw error;
	}
})();

export default client;