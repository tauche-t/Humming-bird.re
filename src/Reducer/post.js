import shortid from 'shortid';
import faker from '@withshepherd/faker';

export const initialState = {
  mainPosts: [
    // {
    //   id: 1,
    //   User: {
    //     id: 1,
    //     nickname: '사용자',
    //   },
    //   content: '첫 번째 게시글',
    //   Images: [{
    //     id: shortid.generate(),
    //     src: '',
    //   }, {
    //     id: shortid.generate(),
    //     src: '',
    //   }],
    //   Comment: [{
    //     id: shortid.generate(),
    //     User: {
    //       id: shortid.generate(),
    //       nickname: 'nero',
    //     },
    //     content: '우와 개정판이 나왔군요!',
    //   }, {
    //     id: shortid.generate(),
    //     User: {
    //       id: shortid.generate(),
    //       nickname: 'nero',
    //     },
    //     content: '오우',
    //   }],
    // }
  ],
  imagePaths: [],
  addPostLoading: false,
  addPostDone: false,
  addPostError: null,
  removePostLoading: false,
  removePostDone: false,
  removePostError: null,
  addCommentLoading: false,
  addCommentDone: false,
  addCommentError: null,
  loadPostLoading: false,
  loadPostDone: false,
  loadPostError: null,
  hasMorePost: true,
  savePosts: [],
  searchPostLoading: false,
  searchPostDone: false,
  searchPostError: null,
}

export const ADD_POST_REQUEST = 'ADD_POST_REQUEST';
export const ADD_POST_SUCCESS = 'ADD_POST_SUCCESS';
export const ADD_POST_FAILURE = 'ADD_POST_FAILURE';

export const ADD_POST_TO_ME = 'ADD_POST_TO_ME';
export const REMOVE_POST_OF_ME = 'REMOVE_POST_OF_ME';

export const REMOVE_POST_REQUEST = 'REMOVE_POST_REQUEST';
export const REMOVE_POST_SUCCESS = 'REMOVE_POST_SUCCESS';
export const REMOVE_POST_FAILURE = 'REMOVE_POST_FAILURE';

export const ADD_COMMENT_REQUEST = 'ADD_COMMENT_REQUEST';
export const ADD_COMMENT_SUCCESS = 'ADD_COMMENT_SUCCESS';
export const ADD_COMMENT_FAILURE = 'ADD_COMMENT_FAILURE';

export const ADD_COMMENT_TO_ME = 'ADD_COMMENT_TO_ME';

export const LOAD_POST_REQUEST = 'LOAD_POST_REQUEST';
export const LOAD_POST_SUCCESS = 'LOAD_POST_SUCCESS';
export const LOAD_POST_FAILURE = 'LOAD_POST_FAILURE';

export const SEARCH_POST_REQUEST = 'SEARCH_POST_REQUEST';
export const SEARCH_POST_SUCCESS = 'SEARCH_POST_SUCCESS';
export const SEARCH_POST_FAILURE = 'SEARCH_POST_FAILURE';

export const addPost = (data) => ({
  type: ADD_POST_REQUEST,
  data,
});

const dummyPost = (data) => ({
  id: data.id,
  content: data.content,
  User: {
    id: data.userId,
    nickname: data.userNick,
  },
  Images: [],
  Comments: [],
});

const dummyComment = (data) => ({
  id: shortid.generate(),
  content: data,
  User: {
    id: 1,
    nickname: '사용자',
  },
});



export const generateDummyPost = (number) => Array(number).fill().map((v, i) => ({
  id: shortid.generate(),
  User: {
    id: shortid.generate(),
    nickname: faker.name.findName(),
  },
  content: faker.lorem.paragraph(),
  Images: [{
    src: faker.image.image(),
  }],
  Comments: [{
    User: {
      id: shortid.generate(),
      nickname: faker.name.findName(),
    },
    content: faker.lorem.sentences(),
  }]
}));

export const searchPostAction = (data) => ({
  type: SEARCH_POST_REQUEST,
  data,
});


const reducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD_POST_REQUEST:
      return {
        ...state,
        addPostLoading: true,
        addPostDone: false,
        addPostError: null,
      }
    case ADD_POST_SUCCESS: 
      const posts = [dummyPost(action.data), ...state.mainPosts];
      localStorage.setItem("post", JSON.stringify(posts));
      const getPosts = localStorage.getItem("post");
      const paresPosts = JSON.parse(getPosts);
      // const savedPosts = paresPosts.concat([dummyPost(action.data), ...state.mainPosts])
      return {
        ...state,
        addPostLoading: false,
        addPostDone: true,
        mainPosts: paresPosts,
      }
    
    case ADD_POST_FAILURE:
      return {
        ...state,
        addPostLoading: false,
        addPostError: action.error,
      }
    case REMOVE_POST_REQUEST:
      return {
        ...state,
        removePostLoading: true,
        removePostDone: false,
        removePostError: null,
      }
    case REMOVE_POST_SUCCESS:
      const removePost = state.mainPosts.filter((v) => v.id !== action.data);
      localStorage.setItem("post", JSON.stringify(removePost));
      const getRemovePost = localStorage.getItem("post");
      const paresRemovePost = JSON.parse(getRemovePost);
      return {
        ...state,
        removePostLoading: false,
        removePostDone: true,
        mainPosts: paresRemovePost,
      }
    case REMOVE_POST_FAILURE:
      return {
        ...state,
        removePostLoading: false,
        removePostError: action.error,
      }
    case ADD_COMMENT_REQUEST:
      return {
        ...state,
        addCommentLoading: true,
        addCommentDone: false,
        addCommentError: null,
      }
    case ADD_COMMENT_SUCCESS:{
      const postIndex = state.mainPosts.findIndex((v) => v.id === action.data.postId);
      const post = { ...state.mainPosts[postIndex] };
      post.Comments = [dummyComment(action.data.content), ...post.Comments];
      const mainPosts = [...state.mainPosts];
      mainPosts[postIndex] = post;

      return {
        ...state,
        mainPosts,
        addCommentLoading: false,
        addCommentDone: true,
      } 
    }
    case ADD_COMMENT_FAILURE:
      return {
        ...state,
        addCommentLoading: false,
        addCommentError: action.error,
      }
    case LOAD_POST_REQUEST: {
      return {
        ...state,
        loadPostLoading: true,
        loadPostDone: false,
        loadPostError: null,
      }
    }
    case LOAD_POST_SUCCESS:
      // localStorage.setItem("post", JSON.stringify(paresPosts));
      const savedLoadPosts = localStorage.getItem("post");
      const paresLoadPosts = JSON.parse(savedLoadPosts) || [];
      return {
        ...state,
        loadPostLoading: false,
        loadPostDone: true,
        // mainPosts: state.mainPosts.concat(action.data),
        mainPosts: paresLoadPosts.concat(action.data),
        hasMorePost: state.mainPosts.length < 50,
      }
    
    case LOAD_POST_FAILURE:
      return {
        ...state,
        loadPostLoading: false,
        loadPostError: action.error,
      }
    case SEARCH_POST_REQUEST: {
      return {
        ...state,
        searchPostLoading: true,
        searchPostDone: false,
        searchPostError: null,
      }
    }
    case SEARCH_POST_SUCCESS:
      return {
        ...state,
        searchPostLoading: false,
        searchPostDone: true,
        mainPosts: state.mainPosts.filter((v) => v.content === action.data),
      }
    
    case SEARCH_POST_FAILURE:
      return {
        ...state,
        searchPostLoading: false,
        searchPostError: action.error,
      }
    default:
      return state;
  }
}

export default reducer;