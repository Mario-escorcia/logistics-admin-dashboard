import "./login.css";
import googleIcon from "../../assets/icons/google-color-svgrepo-com.svg"
import { useState } from "react";
import { login, saveUserDataInLocal } from "../../services/authService";
import { useNavigate } from "react-router-dom";

export const Login = () => {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    email: "",
    password: ""
  })
  const handleLogin = () => {
    if (!form.email || !form.password) {
      alert("some inputs cannot be empty");
    }else{
      let request = login(form);
      if(request?.responseCode === 200){
        if (saveUserDataInLocal(request.user) == 200) {
          navigate('/home');
        }
      }
    }

  }
  return (
    <section className="login" style={{
      padding: "0"
    }}>
      <h2>
        Welcome To Our Management Tool.
        <br />
        <span>Manage the logistics of your business how and when you want.</span>
      </h2>
      <section className="login-form">
        <h3>Sign In</h3>
        <div className="login-form-inp-cont">
          <input
            type="email"
            placeholder="Email"
            name="email"
            value={form.email}
            onChange={(e) => {
              setForm((prev) => ({
                ...prev,
                email: e.target.value
              }));
            }}
          />

          <input type="password" name="password" placeholder="Password" value={form.password}
            onChange={(e) => {
              setForm((prev) => ({
                ...prev,
                password: e.target.value
              }));
            }}
          />
        </div>

        <button className="login-lg-btn" onClick={handleLogin}>
          Log in
        </button>
        <div className="login-label-separator-cont">
          <span></span>
          or login with google
          <span></span>
        </div>
        <button className="login-google-btn">
          <img src={googleIcon} alt="" />
          Continue With Google
        </button>
      </section>
    </section>
  )
}
