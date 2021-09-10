import { stringify } from 'querystring';
import { history } from 'umi';
import { fakeAccountLogin } from '@/services/login';
import { setAuthority, clearAuthority } from '@/utils/authority';
import { getPageQuery } from '@/utils/utils';
import { setToken, clearToken } from '@/utils/token';

const Model = {
  namespace: 'login',
  state: {
    status: undefined,
  },
  effects: {
    *login({ payload }, { call, put }) {
      const response = yield call(fakeAccountLogin, payload);
      yield put({
        type: 'changeLoginStatus',
        payload: response,
      }); // Login successfully

      // 登录成功以后更新权限，跳转页面
      if (response.code === 200) {
        setToken(response.data.token)
        window.location.href = '/';
      }
    },

    logout() {
      const { redirect } = getPageQuery(); // Note: There may be security issues, please note

      clearAuthority();
      clearToken();

      if (window.location.pathname !== '/user/login' && !redirect) {
        history.replace({
          pathname: '/user/login',
          search: stringify({
            redirect: window.location.href,
          }),
        });
      }
    },
  },
  reducers: {
    // 登录
    changeLoginStatus(state, { payload }) {
      const statusCode = 'ok';
      const user = 'admin';
      // 设置权限
      setAuthority(user);
      return {
        ...state,
        status: statusCode,
        type: 'account',
      };
    },
  },
};
export default Model;
