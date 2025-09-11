import "../styles/auth.css";
import Logo from "../components/Logo";
import axios from "axios";
import { useForm } from "react-hook-form";
import { useNavigate, NavLink } from "react-router-dom";


export default function UserRegister() {
  const navigator = useNavigate();
  const { register, handleSubmit } = useForm();
  const onSubmit = (data) => {
    axios
      .post(
        "http://localhost:3000/api/auth/user/register",
        {
          username: data.username,
          email: data.email,
          password: data.password,
        },
        { withCredentials: true }
      )
      .then((result) => {
        if (result.status === 201) {
          alert("Registration successful!");
          navigator("/foodmato");
        }
      })
      .catch((err) => {
        if (err.response && err.response.status === 409) {
          alert("User already exists. Please log in.");
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
        aria-label="User registration form"
        onSubmit={handleSubmit(onSubmit)}
      >
        <h2 className="title">Create account</h2>
        <p className="muted">Register as a user to order delicious meals.</p>

        <div className="grid">
          <label className="field">
            <span>Full name</span>
            <input
              type="text"
              placeholder="Jane Doe"
              {...register("username", { required: true })}
            />
          </label>
          <label className="field">
            <span>Email</span>
            <input
              type="email"
              placeholder="you@example.com"
              {...register("email", { required: true, minLength: 12 })}
            />
          </label>
          <label className="field">
            <span>Password</span>
            <input
              type="password"
              placeholder="Choose a strong password"
              {...register("password", { required: true, minLength: 6 })}
            />
          </label>
        </div>

        <div className="actions">
          <input
            type="submit"
            className="btn primary"
            value={"Create account"}
          />
          <NavLink className="link muted" to="/foodmato/user/login">
            Already have an account?
          </NavLink>
          <NavLink className="link" to="/foodmato/partner/registration">
            Register as Food Partner
          </NavLink>
        </div>
      </form>
    </main>
  );
}
