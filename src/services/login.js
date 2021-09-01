import request from '@/utils/request';

export async function fakeAccountLogin(params) {
  // return request('/api/login/account', {
  return request('/api/auth/oauth/login', {
    method: 'POST',
    data: params,
  });
}

export async function getFakeCaptcha(mobile) {
  return request(`/api/login/captcha?mobile=${mobile}`);
}

export async function getCaptcha() {
  return request(`/api/system/auth/captcha`);
}
