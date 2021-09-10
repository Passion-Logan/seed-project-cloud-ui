import request from '@/utils/request';

export async function fakeAccountLogin(params) {
  return request('/api/auth/oauth/token', {
    method: 'POST',
    params: {
      ...params,
      grant_type: 'password',
      scope: 'all'
    },
    requestType: 'form'
  });
}

export async function getFakeCaptcha(mobile) {
  return request(`/api/login/captcha?mobile=${mobile}`);
}

export async function getCaptcha() {
  return request(`/api/system/auth/captcha`);
}
