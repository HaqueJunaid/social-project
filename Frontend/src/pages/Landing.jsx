import { NavLink } from 'react-router-dom'
import '../styles/landing.css'
import Logo from '../components/Logo'
import { DotLottieReact } from '@lottiefiles/dotlottie-react';

export default function Landing() {
  return (
    <div className="landing-root">
      <header className="lm-header">
        <div className="container">
          <div className="brand">
            <Logo />
          </div>

          <nav className="nav">
            <NavLink className="nav-link" to="/user/login">Login</NavLink>
            <NavLink className="btn nav-cta" to="/user/registration">Sign up</NavLink>
          </nav>
        </div>
      </header>

      <main className="lm-hero">
        <div className="container hero-grid">
          <section className="hero-copy">
            <h1 className="hero-title">Taste the city, one reel at a time</h1>
            <p className="lead">Short food reels. Fast orders. Local flavours.</p>
            <div className="hero-ctas">
              <NavLink className="btn primary large" to="/user/registration">Get started</NavLink>
              <NavLink className="btn ghost" to="/foodmato/reels">Explore reels</NavLink>
            </div>
          </section>

          <aside className="hero-preview" aria-hidden>
            <div className="preview-card">
            </div>
          </aside>
        </div>
      </main>

      <div className="image-strip" aria-hidden>
        <div className="strip-track">
          <div className="strip-item" />
          <div className="strip-item" />
          <div className="strip-item" />
          <div className="strip-item" />
          <div className="strip-item" />
        </div>
      </div>

      <div className="text-carousel" aria-hidden>
        <div className="carousel-track">
          <div className="carousel-item">Freshly made</div>
          <div className="carousel-item">Local favourites</div>
          <div className="carousel-item">Chef specials</div>
          <div className="carousel-item">Quick delivery</div>
        </div>
      </div>

      <section className="lm-about">
        <div className="container about-inner">
          <div className="about-cards">
            <div className="card-small">
              <h3>About InstaMato</h3>
            </div>
            <div className="card-text">
              <p>We connect passionate kitchens with hungry customers through short, snackable videos. Discover, watch and order with ease.</p>
            </div>
          </div>
        </div>
      </section>

      <footer className="lm-footer">
        <div className="container footer-inner">
          <div className="left">© {new Date().getFullYear()} InstaMato</div>
          <div className="right">
            <nav className="footer-links">
              <a href="#">Terms</a>
              <a href="#">Privacy</a>
              <a href="#">Contact</a>
            </nav>
            <div className="social">
              <a href="#" aria-label="Instagram" className="social-icon">📸</a>
              <a href="#" aria-label="X" className="social-icon">✦</a>
              <a href="#" aria-label="YouTube" className="social-icon">▶</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}
