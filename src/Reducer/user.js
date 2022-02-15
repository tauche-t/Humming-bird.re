import { ADD_POST_TO_ME, REMOVE_POST_OF_ME } from "./post";

const initialState = {
  loginLoading: false,
  loginDone: false,
  loginError: null,
  user: null,
}

export const LOG_IN_REQUEST = 'LOG_IN_REQUEST';
export const LOG_IN_SUCCESS = 'LOG_IN_SUCCESS';
export const LOG_IN_FAILURE = 'LOG_IN_FAILURE';

export const loginAction = (data) => ({
  type: LOG_IN_REQUEST,
  data,
});

const dummyUser = (data) => ({
  ...data,
  nickname: '사용자',
  id: 1,
  Liked: [],
  Posts: [],
  Comments: [],
});

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case LOG_IN_REQUEST:
      return {
        ...state,
        loginLoading: true,
        loginDone: false,
        loginError: null,
      }
    case LOG_IN_SUCCESS:
      return {
        ...state,
        loginLoading: false,
        loginDone: true,
        user: dummyUser(action.data),
      }
    case LOG_IN_FAILURE:
      return {
        ...state,
        loginLoading: false,
        loginError: action.error,
      }
    // case ADD_POST_TO_ME:
    //   return {
    //     ...state,
    //     user: {
    //       ...state.user,
    //       Posts: [{ id: action.data }, ...state.user.Posts],
    //     }
    //   }
    // case REMOVE_POST_OF_ME:
    //   return {
    //     ...state,
    //     user: {
    //       ...state.user,
    //       Posts: state.user.Posts.filter((v) => v.id !== action.data),
    //     }
    //   }
    default:
      return state;
  }
}

export default reducer;