const initialState = {
    userInfo: {
        user_id: '',
        first_name: '',
        last_name: '',
        pic_id: '',
        institution: '', 
	    reputation: -1,
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
        return { userInfo: initialState };
      default:
        return state;
    }
  }
  
  export default reducers;