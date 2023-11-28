export const setUsers = (userData) => ({
  type: 'SET_USER',
  payload: userData,
});

export const setUserPermission = (permissions) => ({
  type: 'SET_USER_PERMISSION',
  payload: permissions,
}); 

export const showOffcanvas = () => ({
  type: 'SHOW_OFFCANVAS',
});

export const hideOffcanvas = () => ({
  type: 'HIDE_OFFCANVAS',
});