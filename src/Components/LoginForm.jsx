import { useCallback, useState } from "react";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { loginAction } from "../Reducer/user";

const LoginForm = () => {
  const dispatch = useDispatch();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const onChange = useCallback((e) => {
    const { target: { name, value } } = e;

    if(name === "email") {
      setEmail(value);
    }else{
      setPassword(value);
    }
  }, [email, password]);

  const onSubmit = useCallback((e) => {
    e.preventDefault();

    dispatch(loginAction(email, password));
  }, [email, password]);
  
  return (
    <form onSubmit={onSubmit}>
      <div>
        <label htmlFor="email">이메일</label>
        <input name="email" value={email} onChange={onChange}  />
      </div>
      <div>
        <label htmlFor="password">비밀번호</label>
        <input name="password" value={password} onChange={onChange}  />
      </div>
      <div>
        <button type="submit">로그인</button>
        <Link to="signUp">회원가입</Link>
      </div>
    </form>
  );
}

export default LoginForm;