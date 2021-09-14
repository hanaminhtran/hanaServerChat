import * as md5 from 'md5';
import { ServicesContext } from '../context';

export const registerController = async (ctx, next) => {
  const { userService } = ServicesContext.getInstance();

  const { name, password } = ctx.request.body;
  const result = await userService.findDataByName(name);
  if (result.length) {
    ctx.body = {
      success: false,
      message: 'Username已存在',
    };
  } else {
    ctx.body = {
      success: true,
      message: 'Register成功！',
    };
    console.log('Register成功');
    userService.insertData([name, md5(password)]);
  }
};
