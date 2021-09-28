import request from '@/utils/request';

export async function getMenuList() {
  return request('/api/system/sys/menu/list');
}

export async function getTreeList() {
  return request('/api/system/sys/menu/queryTreeList');
}

export async function removeMenu(params) {
  return request('/api/system/sys/menu/removeMenu', {
    method: 'DELETE',
    data: { ...params },
  });
}

export async function deleteMenu(id) {
  return request(`/api/system/sys/menu/deleteMenu?id=${id}`, {
    method: 'DELETE'
  });
}

export async function addMenu(params) {
  return request('/api/system/sys/menu/addMenu', {
    method: 'POST',
    data: { ...params },
  });
}

export async function updateMenu(params) {
  return request('/api/system/sys/menu/updateMenu', {
    method: 'PUT',
    data: { ...params },
  });
}
