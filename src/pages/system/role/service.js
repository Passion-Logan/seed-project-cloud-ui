import request from '@/utils/request';

export async function queryRole(params) {
  return request('/api/system/sys/role/getPageList', {
    method: 'POST',
    data: { ...params },
  });
}
export async function removeRole(params) {
  return request('/api/system/sys/role/removeRole', {
    method: 'DELETE',
    data: { ...params },
  });
}
export async function addRole(params) {
  return request('/api/system/sys/role/addRole', {
    method: 'POST',
    data: { ...params },
  });
}
export async function updateRole(params) {
  return request('/api/system/sys/role/updateRole', {
    method: 'PUT',
    data: { ...params },
  });
}
export async function getTreeList() {
  return request('/api/system/sys/menu/queryTreeList');
}
export async function getRolePermission(params) {
  return request('/api/system/sys/menu/queryRolePermission', {
    params,
  });
}
export async function updateRolePermission(params) {
  return request('/api/system/sys/role/saveRolePermission', {
    method: 'PUT',
    data: { ...params },
  });
}

