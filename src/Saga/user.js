import { all, delay, fork, put, take, takeLatest } from 'redux-saga/effects';
import { LOAD_MY_INFO_FAILURE, LOAD_MY_INFO_REQUEST, LOAD_MY_INFO_SUCCESS, LOG_IN_FAILURE, LOG_IN_REQUEST, LOG_IN_SUCCESS, LOG_OUT_FAILURE, LOG_OUT_REQUEST, LOG_OUT_SUCCESS, NAME_MODIFY_FAILURE, NAME_MODIFY_REQUEST, NAME_MODIFY_SUCCESS, SIGN_UP_FAILURE, SIGN_UP_REQUEST, SIGN_UP_SUCCESS } from "../Reducer/user";

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

function* logOut(action) {
  try {
    yield delay(1000);
    yield put({
      type: LOG_OUT_SUCCESS,
    });
  } catch (error) {
    yield put({
      type: LOG_OUT_FAILURE,
      data: error.response.data,
    });
  }
}

function* watchLogout() {
  yield takeLatest(LOG_OUT_REQUEST, logOut);
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

function* modifyName(action) {
  try {
    yield delay(1000);
    yield put({
      type: NAME_MODIFY_SUCCESS,
      data: action.data,
    });
  } catch (error) {
    yield put({
      type: NAME_MODIFY_FAILURE,
      data: error.response.data,
    });
  }
}

function* watchModifyName() {
  yield takeLatest(NAME_MODIFY_REQUEST, modifyName);
}


export default function* userSaga() {
  yield all([
    fork(watchLogin),
    fork(watchLogout),
    fork(watchSignup),
    fork(watchLoadInfo),
    fork(watchModifyName),
  ]); 
}