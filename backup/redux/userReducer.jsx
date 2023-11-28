const initialState = {
  userData: null,
  userPermissions: [],
  userPermissions: {},
  show: false,
};

const userReducer = (state = initialState, action) => {
  switch (action.type) {
    case "SET_USER":
      return { ...state, userData: action.payload };
    case "SET_USER_PERMISSION":
      return { ...state, userPermissions: action.payload };
    case "SHOW_OFFCANVAS":
      return {
        ...state,
        show: true,
      };
    case "HIDE_OFFCANVAS":
      return {
        ...state,
        show: false,
      };
    default:
      return state;
  }
};

export default userReducer;
