import commonConfigs from './configs.common';

export default {
  production: false,
  ...commonConfigs,
  port: '3000',
  dbConnection: {
    host: '127.0.0.1', // 数据库IP
    port: 8889, // 数据库端口
    database: 'ghchat', // 数据库名称
    user: 'root', // 数据库Username
    password: 'root', // 数据库password
  },
  client_secret: '',
  jwt_secret: 'chat-sec',
  qiniu: {
    accessKey: '',
    secretKey: '',
    bucket: '',
  },
  robot_key: '', // Bot chat用到的key => 请自己申请http://www.tuling123.com/
};
