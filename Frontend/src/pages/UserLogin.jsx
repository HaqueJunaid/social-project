import "../styles/auth.css";
import axios from "axios";
import { useNavigate, NavLink } from "react-router-dom";
import { useForm } from "react-hook-form";
import Logo from "../components/Logo";

export default function UserLogin() {
  const navigator = useNavigate();
  const { register, handleSubmit } = useForm();
  const onSubmit = (data) => {
    axios
      .post(
        "http://localhost:3000/api/auth/user/login",
        {
          email: data.email,
          password: data.password,
        },
        { withCredentials: true }
      )
      .then((result) => {
        if (result.status === 200) {
          alert("Login successful");
          navigator("/foodmato");
        }
      })
      .catch((err) => {
        if (err.response && err.response.status === 401) {
          alert(err.response.data.message);
        } else {
          alert("Something went wrong. Try again.");
        }
      });
  };

  return (
    <main className="auth-root">
  <div style={{position:'absolute', left:20, top:20}}><Logo size={28} /></div>
      <form
        className="card auth-card"
        onSubmit={handleSubmit(onSubmit)}
        aria-label="User login form"
      >
        <h2 className="title">Welcome back</h2>
        <p className="muted">Sign in to continue to your account.</p>

        <label className="field">
          <span>Email</span>
          <input
            type="email"
            {...register("email", { required: true, minLength: 12 })}
            name="email"
            placeholder="you@example.com"
          />
        </label>

        <label className="field">
          <span>Password</span>
          <input
            type="password"
            {...register("password", { required: true, minLength: 6 })}
            name="password"
            placeholder="Your password"
          />
        </label>

        <div className="actions">
          <input type="submit" className="btn primary" value={"Sign In"} />
          <NavLink className="link muted" to="/foodmato/user/registration">
            Create an account
          </NavLink>
          <div style={{display: 'flex', gap: 10}}>
            <NavLink className="link" to="/foodmato/partner/login">Partner login</NavLink>
            <NavLink className="link" to="/foodmato/partner/registration">Partner register</NavLink>
          </div>
        </div>
      </form>
    </main>
  );
}
