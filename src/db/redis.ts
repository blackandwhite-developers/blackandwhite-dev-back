import Redis from 'ioredis';

const redis = new Redis({
  host: process.env.REDIS_HOST || 'localhost',
  port: process.env.REDIS_PORT ? parseInt(process.env.REDIS_PORT) : 6379,
  commandTimeout: process.env.REDIS_TIMEOUT ? parseInt(process.env.REDIS_TIMEOUT) : 5000,
});

(async () => {
  redis.on('connect', () => {
    console.log('Redis is connected ^-^');
  });

  redis.on('error', error => {
    console.error('Redis error', error);
  });

  redis.on('close', () => {
    console.log('Redis is closed');
  });

  redis.on('reconnecting', () => {
    console.log('Redis is reconnecting');
  });

  redis.on('end', () => {
    console.log('Redis is ended');
  });

  redis.on('ready', () => {
    console.log('Redis is ready ^-^');
  });
})();

async function getData(key: string) {
  try {
    const data = await redis.get(key);
    return data;
  } catch (error) {
    console.error(error);
    return null;
  }
}

async function setData(key: string, value: string, expire: number) {
  try {
    await redis.set(key, value, 'EX', expire);
    return true;
  } catch (error) {
    console.error(error);
    return false;
  }
}

async function deleteData(key: string) {
  try {
    await redis.unlink(key);
    return true;
  } catch (error) {
    console.error(error);
    return false;
  }
}

export default {
  getData,
  setData,
  deleteData,
};
