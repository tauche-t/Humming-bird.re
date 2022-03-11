# HUMMING BIRD

React와 Redux, Redux-saga를 통해 간단한 회원가입 및 로그인, 게시글 작성, 삭제 기능이 들어간 웹/앱입니다.
<br />
백엔드 API가 없다는 가정하에 LocalStorage로 작업하였고,
<br />
Faker라이브러리를 통해 더미데이터를 생성한 뒤 무한 스크롤링 기능을 입혔습니다.


### Page
```
1) Home
2) Login
3) SignUp
```

### 디렉토리 설정
```
1) src
  - Components
    - grid
      - Col.jsx
      - Row.jsx
    - AppLayout.jsx
    - CommentForm.jsx
    - Comments.jsx
    - Loading.jsx
    - PostCard.jsx
    - PostForm.jsx
    - PostProfile.jsx
    - Profile.jsx
  - hooks
    - useInput.js
  - Reducer
    - index.js
    - post.js
    - user.js
  - Routes
    - Home.jsx
    - Login.jsx
    - SingUp.jsx
  - Saga
    - index.js
    - post.js
    - user.js
  - Store
    - configuerStore.js
  - App.js
  - index.js
```
