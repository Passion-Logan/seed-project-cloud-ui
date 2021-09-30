import request from '@/utils/request';

export async function getUserInfo() {
  return request('/api/system/auth/user/getInfo');
}

export async function updateUserInfo(params) {
  return request('/api/system/auth/user/updateUser', {
    method: 'POST',
    data: params,
  });
}

export async function uploadAvatar(params) {
  return request('/api/system/auth/user/uploadAvatar', {
    method: 'POST',
    body: params,
  });
}

export async function updatePwd(params) {
  return request('/api/system/auth/user/updatePwd', {
    method: 'POST',
    body: params,
  });
}