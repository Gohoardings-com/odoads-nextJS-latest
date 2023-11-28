const initialState = {
  userData: null,
  userPermissions: [],
  userPermissions: {}, 
};
const userReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'SET_USER':
      return { ...state, userData: action.payload };
    case 'SET_USER_PERMISSION':
      return { ...state, userPermissions: action.payload };
    default:
      return state;
  }
};

export default userReducer;
