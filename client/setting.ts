import Env from './next.config';
const isProd = process.env.NODE_ENV === 'production';

const setting = {
  isProd,
  basePath: Env.basePath,
  apiPath: isProd ? '' : 'http://localhost:8000',
  title: '🙀 simple-rsa-chat-room 🙀',
  waitingTime: 1000,
};

export default setting;
