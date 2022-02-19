import shortid from "shortid";
import { ADD_COMMENT_TO_ME, ADD_POST_TO_ME, REMOVE_POST_OF_ME } from "./post";

const initialState = {
  loginLoading: false,
  loginDone: false,
  loginError: null,
  user: null,
  logOutLoading: false,
  logOutDone: false,
  logOutError: null,
  signUpLoading: false,
  signUpDone: false,
  signUpError: null,
  parsedUser: [],
  loadMyInfoLoading: false,
  loadMyInfoDone: false,
  loadMyInfoError: null,
  nameModifyLoading: false,
  nameModifyDone: false,
  nameModifyError: false,
}

export const LOG_IN_REQUEST = 'LOG_IN_REQUEST';
export const LOG_IN_SUCCESS = 'LOG_IN_SUCCESS';
export const LOG_IN_FAILURE = 'LOG_IN_FAILURE';

export const LOG_OUT_REQUEST = 'LOG_OUT_REQUEST';
export const LOG_OUT_SUCCESS = 'LOG_OUT_SUCCESS';
export const LOG_OUT_FAILURE = 'LOG_OUT_FAILURE';

export const SIGN_UP_REQUEST = 'SIGN_UP_REQUEST';
export const SIGN_UP_SUCCESS = 'SIGN_UP_SUCCESS';
export const SIGN_UP_FAILURE = 'SIGN_UP_FAILURE';

export const LOAD_MY_INFO_REQUEST = 'LOAD_MY_INFO_REQUEST';
export const LOAD_MY_INFO_SUCCESS = 'LOAD_MY_INFO_SUCCESS';
export const LOAD_MY_INFO_FAILURE = 'LOAD_MY_INFO_FAILURE';

export const NAME_MODIFY_REQUEST = 'NAME_MODIFY_REQUEST';
export const NAME_MODIFY_SUCCESS = 'NAME_MODIFY_SUCCESS';
export const NAME_MODIFY_FAILURE = 'NAME_MODIFY_FAILURE';

export const ADD_LIKED_TO_ME = 'ADD_LIKED_TO_ME';
export const REMOVE_LIKED_OF_ME = 'REMOVE_LIKED_OF_ME';

export const loginAction = (data) => ({
  type: LOG_IN_REQUEST,
  data,
});

const dummyUser = (data) => ({
  ...data,
  nickname: data.nickname,
  id: shortid.generate(),
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
      console.log(action.data);
      localStorage.setItem("me", JSON.stringify(dummyUser(action.data)));
      const savedMe = localStorage.getItem("me");
      const parsedMe = JSON.parse(savedMe);
      return {
        ...state,
        loginLoading: false,
        loginDone: true,
        user: parsedMe,
      }
    case LOG_IN_FAILURE:
      return {
        ...state,
        loginLoading: false,
        loginError: action.error,
      }
    case LOG_OUT_REQUEST:
      return {
        ...state,
        logOutLoading: true,
        logOutDone: false,
        logOutError: null,
      }
    case LOG_OUT_SUCCESS:
      localStorage.setItem("me", JSON.stringify(""));
      return {
        ...state,
        logOutLoading: false,
        logOutDone: true,
        user: null,
      }
    case LOG_OUT_FAILURE:
      return {
        ...state,
        logOutLoading: false,
        logOutError: action.error,
        }
    case NAME_MODIFY_REQUEST:
      return {
        ...state,
        nameModifyLoading: true,
        nameModifyDone: false,
        nameModifyError: null,
      }
    case NAME_MODIFY_SUCCESS:
      console.log(action.data);
      return {
        ...state,
        nameModifyLoading: false,
        nameModifyDone: true,
        user: {
          ...state.user,
          nickname: action.data,
        },
      }
    case NAME_MODIFY_FAILURE:
      return {
        ...state,
        nameModifyLoading: false,
        nameModifyError: action.error,
      }
    case LOAD_MY_INFO_REQUEST:
      return {
        ...state,
        loadMyInfoLoading: true,
        loadMyInfoDone: false,
        loadMyInfoError: null,
      }
    case LOAD_MY_INFO_SUCCESS:
      const loadMe = JSON.parse(localStorage.getItem("me"));
      return {
        ...state,
        loadMyInfoLoading: false,
        loadMyInfoDone: true,
        user: loadMe,
      }
    case LOAD_MY_INFO_FAILURE:
      return {
        ...state,
        loadMyInfoLoading: false,
        loadMyInfoError: action.error,
      }
    case SIGN_UP_REQUEST:
      return {
        ...state,
        signUpLoading: true,
        signUpDone: false,
        signUpError: null,
      }
    case SIGN_UP_SUCCESS:
      const signUpUser = [action.data, ...state.parsedUser];
      localStorage.setItem("signUpUser", JSON.stringify(signUpUser));
      const savedUser = localStorage.getItem("signUpUser");
      const parsedUser = JSON.parse(savedUser);
      return {
        ...state,
        signUpLoading: false,
        signUpDone: true,
        parsedUser,
      }
    case SIGN_UP_FAILURE:
      return {
        ...state,
        signUpLoading: false,
        signUpError: action.error,
      }
    case ADD_POST_TO_ME:
      return {
        ...state,
        user: {
          ...state.user,
          Posts: [{ id: action.data }, ...state.user.Posts],
        }
      }
    case REMOVE_POST_OF_ME:
      return {
        ...state,
        user: {
          ...state.user,
          Posts: state.user.Posts.filter((v) => v.id !== action.data),
        }
      }
    case ADD_COMMENT_TO_ME:
      return {
        ...state,
        user: {
          ...state.user,
          Comments: [{ id: action.data }, ...state.user.Comments],
        }
      }
    case ADD_LIKED_TO_ME:
      return {
        ...state,
        user: {
          ...state.user,
          Liked: [{ id: action.data }, ...state.user.Liked],
        }
      }
    case REMOVE_LIKED_OF_ME:
      return {
        ...state,
        user: {
          ...state.user,
          Liked: state.user.Liked.filter((v) => v.id !== action.data),
        }
      }
    default:
      return state;
  }
}

export default reducer;