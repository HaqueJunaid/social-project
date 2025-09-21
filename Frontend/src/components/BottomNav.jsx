import React from "react";
import { NavLink, useLocation } from "react-router-dom";
import "../styles/bottomnav.css";

function getCookie(name) {
  const cookies = document.cookie.split("; ");
  
  for (let cookie of cookies) {
    const [key, value] = cookie.split("=");
    if (key === name) return value;
  }

  return null;
}

export default function BottomNav() {
  const location = useLocation();
  const pathname = location.pathname;

  // exact paths to hide and path prefixes to hide
  const excludedExact = ["/foodmato", "/dashboard"];
  const excludedStarts = ["/foodmato/user", "/foodmato/partner"];
  
  const isLogged = Boolean(getCookie("sessionId"));

  if (!isLogged) return null;
  // hide if exact match or starts with any excluded prefix
  if (excludedExact.includes(pathname)) return null;
  if (
    excludedStarts.some((p) => pathname === p || pathname.startsWith(p + "/"))
  )
    return null;

  return (
    <nav className="bottom-nav" aria-label="Bottom navigation">
      <NavLink
        to="/"
        aria-label="Home"
        className={({ isActive }) => (isActive ? "bn-item active" : "bn-item")}
      >
        {({ isActive }) => (
          <i
            className={`${
              isActive ? "ri-home-5-line" : "ri-home-5-line"
            } bn-icon`}
            aria-hidden
          ></i>
        )}
      </NavLink>

      <NavLink
        to="/foodmato/reels"
        aria-label="Reels"
        className={({ isActive }) => (isActive ? "bn-item active" : "bn-item")}
      >
        {({ isActive }) => (
          <i
            className={`${
              isActive ? "ri-movie-2-line" : "ri-movie-2-line"
            } bn-icon`}
            aria-hidden
          ></i>
        )}
      </NavLink>

      <NavLink
        to={`/foodmato/profile/`}
        aria-label="Profile"
        className={({ isActive }) => (isActive ? "bn-item active" : "bn-item")}
      >
        {({ isActive }) => (
          <i
            className={`${
              isActive ? "ri-user-3-fill" : "ri-user-3-line"
            } bn-icon`}
            aria-hidden
          ></i>
        )}
      </NavLink>
    </nav>
  );
}
