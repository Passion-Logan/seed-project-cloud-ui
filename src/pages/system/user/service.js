import request from '@/utils/request';

export async function queryUser(params) {
  return request('/api/system/sys/user/getPageList', {
    method: 'POST',
    data: { ...params },
  });
}
export async function removeUser(params) {
  return request('/api/system/sys/user/removeUser', {
    method: 'DELETE',
    data: { ...params },
  });
}
export async function addUser(params) {
  return request('/api/system/sys/user/addUser', {
    method: 'POST',
    data: { ...params },
  });
}
export async function updateUser(params) {
  return request('/api/system/sys/user/updateUser', {
    method: 'PUT',
    data: { ...params },
  });
}
export async function updatePassword(params) {
  return request('/api/system/sys/user/updatePassword', {
    params,
  });
}
export async function getAllRole() {
  return request('/api/system/sys/role/getAllList');
}
export async function queryUserRole(userId) {
  return request(`/api/system/sys/user/getUserRole?userId=${userId}`);
}
