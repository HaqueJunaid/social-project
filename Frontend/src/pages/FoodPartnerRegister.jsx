import "../styles/auth.css";
import { NavLink, useNavigate } from "react-router-dom";
import axios from "axios";
import { useForm } from "react-hook-form";

export default function FoodPartnerRegister() {
  const navigator = useNavigate();
  const { register, handleSubmit } = useForm();
  const onSubmit = (data) => {
    axios
      .post(
        "http://localhost:3000/api/auth/foodPartner/register",
        {
          kitchenName: data.kitchenName,
          phone: data.phone,
          email: data.email,
          password: data.password,
        },
        { withCredentials: true }
      )
      .then((result) => {
        if (result.status === 201) {
          alert("Registration successful!");
          navigator("/");
        }
      })
      .catch((err) => {
        if (err.response && err.response.status === 409) {
          alert("User already exists. Please log in.");
          navigator("/user/login");
        } else {
          alert("Something went wrong. Try again.");
        }
      });
  };

  return (
    <main className="auth-root">
      <form
        className="card auth-card"
        onSubmit={handleSubmit(onSubmit)}
        aria-label="Food partner registration form"
      >
        <h2 className="title">Partner sign up</h2>
        <p className="muted">Register your kitchen to reach more customers.</p>

        <div className="grid">
          <label className="field">
            <span>Kitchen name</span>
            <input
              type="text"
              name="kitchen"
              {...register("kitchenName", { required: true, minLength: 6 })}
              placeholder="Ex: Sunny Bites"
            />
          </label>
          <label className="field">
            <span>Contact email</span>
            <input
              type="email"
              name="email"
              {...register("email", { required: true, minLength: 12 })}
              placeholder="kitchen@example.com"
            />
          </label>
          <label className="field">
            <span>Phone</span>
            <input
              type="tel"
              name="phone"
              {...register("phone", { required: true, minLength: 10 })}
              placeholder="+91 98x xxx xxxx"
            />
          </label>
          <label className="field">
            <span>Password</span>
            <input
              type="password"
              name="password"
              {...register("password", { required: true, minLength: 6 })}
              placeholder="Create a password"
            />
          </label>
        </div>

        <div className="actions">
          <input
            type="submit"
            className="btn primary"
            value={"Start onboarding"}
          />
          <NavLink className="link muted" to="/foodpartner/login">
            Already registered?
          </NavLink>
        </div>
      </form>
    </main>
  );
}
