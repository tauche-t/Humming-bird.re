import { all, delay, fork, put, take, takeLatest } from 'redux-saga/effects';
import { LOAD_MY_INFO_FAILURE, LOAD_MY_INFO_REQUEST, LOAD_MY_INFO_SUCCESS, LOG_IN_FAILURE, LOG_IN_REQUEST, LOG_IN_SUCCESS, SIGN_UP_FAILURE, SIGN_UP_REQUEST, SIGN_UP_SUCCESS } from "../Reducer/user";

function* signUp(action) {
  try {
    yield delay(1000);
    yield put({
      type: SIGN_UP_SUCCESS,
      data: action.data,
    });
  } catch (error) {
    yield put({
      type: SIGN_UP_FAILURE,
      data: error.response.data,
    });
  }
}

function* watchSignup() {
  yield takeLatest(SIGN_UP_REQUEST, signUp);
}

function* logIn(action) {
  try {
    yield delay(1000);
    yield put({
      type: LOG_IN_SUCCESS,
      data: action.data,
    });
  } catch (error) {
    yield put({
      type: LOG_IN_FAILURE,
      data: error.response.data,
    });
  }
}

function* watchLogin() {
  yield takeLatest(LOG_IN_REQUEST, logIn);
}

function* loadInfo(action) {
  try {
    yield delay(1000);
    yield put({
      type: LOAD_MY_INFO_SUCCESS,
      data: action.data,
    });
  } catch (error) {
    yield put({
      type: LOAD_MY_INFO_FAILURE,
      data: error.response.data,
    });
  }
}

function* watchLoadInfo() {
  yield takeLatest(LOAD_MY_INFO_REQUEST, loadInfo);
}

export default function* userSaga() {
  yield all([
    fork(watchLogin),
    fork(watchSignup),
    fork(watchLoadInfo),
  ]); 
}