/**
 * request 网络请求工具
 * 更详细的 api 文档: https://github.com/umijs/umi-request
 */
import { extend } from 'umi-request';
import { Redirect } from 'umi';
import { notification } from 'antd';
import { getToken, clearToken } from '@/utils/token';

const codeMessage = {
  200: '服务器成功返回请求的数据。',
  201: '新建或修改数据成功。',
  202: '一个请求已经进入后台排队（异步任务）。',
  204: '删除数据成功。',
  400: '发出的请求有错误，服务器没有进行新建或修改数据的操作。',
  401: '用户没有权限（令牌、用户名、密码错误）。',
  403: '用户得到授权，但是访问是被禁止的。',
  404: '发出的请求针对的是不存在的记录，服务器没有进行操作。',
  406: '请求的格式不可得。',
  410: '请求的资源被永久删除，且不会再得到的。',
  422: '当创建一个对象时，发生一个验证错误。',
  500: '服务器发生错误，请检查服务器。',
  502: '网关错误。',
  503: '服务不可用，服务器暂时过载或维护。',
  504: '网关超时。',
};
/**
 * 异常处理程序
 */

const errorHandler = (error) => {
  const { response } = error;
  // const errorText = codeMessage[response.status] || response.statusText;
  // const { status, url, data } = response;

  // if (status === 401) {
  //   notification.error({
  //     message: '未登录或登录已过期，请重新登录。',
  //   });
  //   clearToken();
  //   return <Redirect to="/user/login" />;
  // }
  // notification.error({
  //   message: `请求错误 ${status}: ${url}`,
  //   description: errorText,
  // });
  // // environment should not be used
  // if (status === 403) {
  //   // router.push('/exception/403');
  //   return;
  // }
  // if (status <= 504 && status >= 500) {
  //   // router.push('/exception/500');
  //   return;
  // }
  // if (status >= 404 && status < 422) {
  //   // router.push('/exception/404');
  // }

  if (response && response.status) {
    const errorText = codeMessage[response.status] || response.statusText;
    const { status, url } = response;
    notification.error({
      message: `请求错误 ${status}: ${url}`,
      description: errorText,
    });
  } else if (!response) {
    notification.error({
      description: '您的网络发生异常，无法连接服务器',
      message: '网络异常',
    });
  }

  return response;
};

/**
 * 配置request请求时的默认参数
 */
const request = extend({
  // 默认错误处理
  // errorHandler,
  credentials: 'include', // 默认请求是否带上cookie
});

request.interceptors.request.use(async (url, options) => {
  const token = getToken();

  let headers = {
    'Content-Type': 'application/json',
    // 'Content-Type': 'application/x-www-form-urlencoded',
    Accept: 'application/json',
  };

  if (url.indexOf('/oauth/token') !== -1) {
    headers = {
      ...headers,
      'Authorization': 'Basic YWRtaW46MTIzNDU2'
    }
  }

  if (token) {
    const userToken = `Bearer ${token}`
    headers = {
      ...headers,
      'Authorization': userToken
    }
  }

  return {
    url,
    options: { ...options, headers },
  };
});

// response 拦截器，处理respons
request.interceptors.response.use(async (response) => {
  const data = await response.clone().json();

  if (data.code !== 200 && data.code !== undefined) {
    if (data.code === 401) {
      clearToken();
      notification.destroy()
      notification.error({
        message: data.message,
      });
      // eslint-disable-next-line react/react-in-jsx-scope
      return <Redirect to="/user/login" />;
    }
    notification.destroy()
    notification.error({
      message: data.message,
    });
  }

  return data;
});

export default request;
