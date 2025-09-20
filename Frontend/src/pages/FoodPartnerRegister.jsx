import "../styles/auth.css";
import { NavLink, useNavigate } from "react-router-dom";
import axios from "axios";
import { useForm } from "react-hook-form";
import Logo from "../components/Logo";

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
          navigator("/foodmato");
        }
      })
      .catch((err) => {
        console.error("Registration error:", err);
        const serverMessage =
          err?.response?.data?.message ||
          err.message ||
          "Something went wrong. Try again.";

        // If server returned a 409, show server-provided message (more accurate)
        if (err.response && err.response.status === 409) {
          alert(serverMessage);
        } else {
          alert(serverMessage);
        }
      });
  };

  return (
    <main className="auth-root">
      <div style={{ position: "absolute", left: 20, top: 20 }}>
        <Logo size={28} />
      </div>
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
              name="kitchenName"
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
          <NavLink className="link muted" to="/foodmato/partner/login">
            Already registered?
          </NavLink>
          <NavLink className="link" to="/foodmato/user/registration">
            Register as User
          </NavLink>
        </div>
      </form>
    </main>
  );
}
