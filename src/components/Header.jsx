import { useState } from "react"
import { Link, useLocation } from "react-router-dom"
import "./Header.css"

import logo from '../assets/logo.png';

function Header() {
  const location = useLocation()
  const [open, setOpen] = useState(false)

  const navLinks = [
    { path: "/", label: "Home" },
    { path: "/reviews", label: "Reviews & Produtos" },
    { path: "/about", label: "Sobre" },
    { path: "/contact", label: "Contato" }
  ]

  const isActive = (path) => location.pathname === path

  return (
    <header className="header">

      <div className="header-container">

        <Link to="/" className="logo" translate="no">
          <img src={logo} alt="RW Brothers Reviews" className="logo-image" />
          <span>RW Brothers Reviews</span>
        </Link>

        {/* DESKTOP */}
        <nav className="nav-desktop">
          {navLinks.map((link) => (
            <Link
              key={link.path}
              to={link.path}
              className={isActive(link.path) ? "active" : ""}
            >
              {link.label}
            </Link>
          ))}
        </nav>

        {/* MOBILE BUTTON */}
        <button
          className="menu-btn"
          onClick={() => setOpen(!open)}
        >
          ☰
        </button>
      </div>

      {/* MOBILE MENU */}
      {open && (
        <div className="nav-mobile">
          {navLinks.map((link) => (
            <Link
              key={link.path}
              to={link.path}
              onClick={() => setOpen(false)}
              className={isActive(link.path) ? "active" : ""}
            >
              {link.label}
            </Link>
          ))}
        </div>
      )}

    </header>
  )
}

export default Header