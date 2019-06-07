const initialState = {
    userInfo: {
        user_id: '',
        first_name: '',
        last_name: '',
        pic_id: '',
        institution: '', 
        email: '',
        password: '',
    },
  };
  
  function reducers(state = initialState, action) {
    switch (action.type) {
      case 'SET_USER_INFO':
        action.userInfo = Object.assign({}, state.userInfo, action.userInfo);
        return Object.assign({}, state, { userInfo: action.userInfo });
      case 'CLEAR_REDUX_STORE':
        return { userInfo:{} };
      default:
        return state;
    }
  }
  
  export default reducers;