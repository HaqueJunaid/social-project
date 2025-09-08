import '../styles/auth.css';
import { NavLink, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useForm } from 'react-hook-form';

export default function FoodPartnerLogin() {
  const navigator = useNavigate();
  const { register, handleSubmit } = useForm();
  const onSubmit = (data) => {
    axios.post(
      "http://localhost:3000/api/auth/foodPartner/login",
      {
        email: data.email,
        password: data.password,
      },
      {withCredentials: true})
      .then((result) => {
        if (result.status === 200) {
          alert("Login successful");
          navigator("/");
        }
      })
      .catch((err) => {
        if (err.response && err.response.status === 401) {
          alert(err.response.data.message);
        } else {
          alert(err.response.data.message);
        }
      });
  }

  return (
    <main className="auth-root">
      <form className="card auth-card" onSubmit={handleSubmit(onSubmit)} aria-label="Food partner login form">
        <h2 className="title">Partner sign in</h2>
        <p className="muted">Access your partner dashboard.</p>

        <label className="field">
          <span>Email</span>
          <input type="email" name="email" {...register("email", {required: true, minLength: 12})} placeholder="kitchen@example.com" />
        </label>

        <label className="field">
          <span>Password</span>
          <input type="password" name="password" {...register("password", {required: true, minLength: 6})} placeholder="Your password" />
        </label>

        <div className="actions">
          <input type="submit" className="btn primary" value={"Sign in"} />
          <NavLink className="link muted" to="/foodpartner/registration">Create partner account</NavLink>
        </div>
      </form>
    </main>
  )
}
