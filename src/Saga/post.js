import { all, delay, fork, put, take, takeLatest } from 'redux-saga/effects';
import shortid from 'shortid';
import { ADD_POST_SUCCESS, ADD_POST_FAILURE, ADD_POST_REQUEST, ADD_POST_TO_ME, REMOVE_POST_REQUEST, REMOVE_POST_SUCCESS, REMOVE_POST_FAILURE, REMOVE_POST_OF_ME, ADD_COMMENT_REQUEST, ADD_COMMENT_SUCCESS, ADD_COMMENT_FAILURE, ADD_COMMENT_TO_ME, LOAD_POST_REQUEST, LOAD_POST_SUCCESS, LOAD_POST_FAILURE, generateDummyPost} from "../Reducer/post";

function* addPost(action) {
  try {
    yield delay(1000);
    const id = shortid.generate();
    yield put({
      type: ADD_POST_SUCCESS,
      data: {
        id,
        content: action.data.text,
        userId: action.data.userId,
        userNick: action.data.nickname,
      }
    });
    yield put({
      type: ADD_POST_TO_ME,
      data: id,
    });
  } catch (error) {
    console.error(error);
    yield put({
      type: ADD_POST_FAILURE,
      data: error.response.data,
    });
  }
}

function* loadPost(action) {
  try {
    yield delay(1000);
    yield put({
      type: LOAD_POST_SUCCESS,
      data: generateDummyPost(10),
    });
  } catch (error) {
    yield put({
      type: LOAD_POST_FAILURE,
      data: error.response.data,
    });
  }
}

function* addComment(action) {
  try {
    yield delay(1000);
    const id = shortid.generate();
    yield put({
      type: ADD_COMMENT_SUCCESS,
      data: action.data,
    });
    yield put({
      type: ADD_COMMENT_TO_ME,
      data: id,
    });
  } catch (error) {
    console.error(error);
    yield put({
      type: ADD_COMMENT_FAILURE,
      data: error.response.data,
    });
  }
}

function* removePost(action) {
  try {
    yield delay(1000);
    yield put({
      type: REMOVE_POST_SUCCESS,
      data: action.data,
    });
    yield put({
      type: REMOVE_POST_OF_ME,
      data: action.data,
    });
  } catch (error) {
    yield put({
      type: REMOVE_POST_FAILURE,
      data: error.response.data,
    });
  }
}

function* watchAddPost() {
  yield takeLatest(ADD_POST_REQUEST, addPost);
}

function* watchLoadPost() {
  yield takeLatest(LOAD_POST_REQUEST, loadPost);
}

function* watchRemovePost() {
  yield takeLatest(REMOVE_POST_REQUEST, removePost);
}

function* watchaddComment() {
  yield takeLatest(ADD_COMMENT_REQUEST, addComment);
}

export default function* postSaga() {
  yield all([
    fork(watchAddPost),
    fork(watchLoadPost),
    fork(watchRemovePost),
    fork(watchaddComment),
  ]); 
}